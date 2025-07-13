# backend/app.py

import os
import datetime
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    get_jwt_identity,
    jwt_required
)
from werkzeug.security import generate_password_hash, check_password_hash

# --- App Initialization & Configuration ---
app = Flask(__name__)

# Secret key for JWT; override in production via env var
app.config["JWT_SECRET_KEY"] = os.environ.get(
    "JWT_SECRET_KEY",
    "a-super-secret-key-that-you-should-change"
)

# Database URI: uses DATABASE_URL if set, else SQLite file
db_path = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "kronos.db"
)
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DATABASE_URL",
    f"sqlite:///{db_path}"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# CORS: allow only your Vercel frontend
CORS(
    app,
    resources={r"/api/*": {
        "origins": os.environ.get(
            "FRONTEND_URL",
            "https://kronos-assistant.vercel.app"
        )
    }},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

# Extensions
db  = SQLAlchemy(app)
jwt = JWTManager(app)

# --- JWT Error Handlers ---
@jwt.unauthorized_loader
def missing_token(error_msg):
    return jsonify({"msg": error_msg}), 401

@jwt.invalid_token_loader
def invalid_token(error_msg):
    return jsonify({"msg": error_msg}), 422

@jwt.expired_token_loader
def expired_token(header, payload):
    return jsonify({"msg": "Token has expired"}), 401

# --- Database Models ---
class User(db.Model):
    id             = db.Column(db.Integer,   primary_key=True)
    username       = db.Column(db.String(80), unique=True, nullable=False)
    password_hash  = db.Column(db.String(256),             nullable=False)

    social_accounts      = db.relationship(
        "SocialAccount", backref="user", lazy=True,
        cascade="all, delete-orphan"
    )
    scheduled_posts      = db.relationship(
        "ScheduledPost", backref="user", lazy=True,
        cascade="all, delete-orphan"
    )
    freelance_platforms  = db.relationship(
        "FreelancePlatform", backref="user", lazy=True,
        cascade="all, delete-orphan"
    )
    proposals            = db.relationship(
        "Proposal", backref="user", lazy=True,
        cascade="all, delete-orphan"
    )

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class SocialAccount(db.Model):
    id        = db.Column(db.Integer, primary_key=True)
    platform  = db.Column(db.String(50),  nullable=False)
    handle    = db.Column(db.String(100), nullable=False)
    user_id   = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

class ScheduledPost(db.Model):
    id         = db.Column(db.Integer, primary_key=True)
    content    = db.Column(db.Text,    nullable=False)
    hashtags   = db.Column(db.String(500), nullable=True)
    image_url  = db.Column(db.String(500), nullable=True)
    post_time  = db.Column(db.DateTime, nullable=False)

    user_id    = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    account_id = db.Column(db.Integer, db.ForeignKey("social_account.id"), nullable=False)
    social_account = db.relationship("SocialAccount", backref="scheduled_posts")

class FreelancePlatform(db.Model):
    id          = db.Column(db.Integer, primary_key=True)
    name        = db.Column(db.String(50),  nullable=False)
    profile_url = db.Column(db.String(200), nullable=False)
    user_id     = db.Column(db.Integer,     db.ForeignKey("user.id"), nullable=False)

class Job(db.Model):
    id            = db.Column(db.Integer, primary_key=True)
    title         = db.Column(db.String(200), nullable=False)
    description   = db.Column(db.Text, nullable=False)
    platform_name = db.Column(db.String(50), nullable=False)

class Proposal(db.Model):
    id       = db.Column(db.Integer, primary_key=True)
    content  = db.Column(db.Text,    nullable=False)
    job_id   = db.Column(db.Integer, db.ForeignKey("job.id"), nullable=False)
    user_id  = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    job      = db.relationship("Job", backref="proposals")

# Ensure tables exist before first request
with app.app_context():
    db.create_all()

# --- API Routes ---
@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    if not data.get("username") or not data.get("password"):
        return jsonify({"msg": "Username and password required"}), 400

    if User.query.filter_by(username=data["username"]).first():
        return jsonify({"msg": "Username already exists"}), 409

    user = User(username=data["username"])
    user.set_password(data["password"])
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "User created successfully"}), 201

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    user = User.query.filter_by(username=data.get("username")).first()

    if not user or not user.check_password(data.get("password", "")):
        return jsonify({"msg": "Bad username or password"}), 401

    token = create_access_token(identity=user.id)
    return jsonify(access_token=token, username=user.username), 200

@app.route("/api/social/accounts", methods=["GET"])
@jwt_required()
def get_social_accounts():
    uid      = get_jwt_identity()
    accounts = SocialAccount.query.filter_by(user_id=uid).all()
    return jsonify([
        {"id": a.id, "platform": a.platform, "handle": a.handle}
        for a in accounts
    ])

@app.route("/api/social/connect", methods=["POST"])
@jwt_required()
def connect_social_account():
    uid  = get_jwt_identity()
    data = request.get_json() or {}
    acct = SocialAccount(
        platform=data.get("platform"),
        handle=data.get("handle"),
        user_id=uid
    )
    db.session.add(acct)
    db.session.commit()
    return jsonify({
        "id": acct.id,
        "platform": acct.platform,
        "handle": acct.handle
    }), 201

@app.route("/api/social/generate-content", methods=["POST"])
@jwt_required()
def generate_content():
    topic = request.json.get("topic", "an exciting new venture")
    caption = (
        f"Excited to announce a project on {topic}. "
        "#Innovation #FutureTech"
    )
    hashtags = f"#business #{topic.replace(' ', '')} #startup"

    return jsonify({
        "caption": caption,
        "hashtags": hashtags,
        "image_prompt": f"Abstract image of '{topic}'"
    })

@app.route("/api/social/generate-image", methods=["POST"])
@jwt_required()
def generate_image():
    prompt = request.json.get("prompt", "promo image")
    url = (
        "https://placehold.co/1080x1080/000000/FFFFFF/png?"
        f"text={prompt.replace(' ', '+')}"
    )
    return jsonify({"image_url": url})

@app.route("/api/social/schedule", methods=["POST"])
@jwt_required()
def schedule_post():
    uid  = get_jwt_identity()
    data = request.get_json() or {}

    post = ScheduledPost(
        content=data.get("content"),
        hashtags=data.get("hashtags"),
        image_url=data.get("image_url"),
        post_time=datetime.datetime.fromisoformat(data.get("post_time")),
        user_id=uid,
        account_id=data.get("account_id")
    )
    db.session.add(post)
    db.session.commit()
    return jsonify({
        "msg": "Post scheduled successfully",
        "post_id": post.id
    }), 201

@app.route("/api/proposals/platforms", methods=["GET"])
@jwt_required()
def get_freelance_platforms():
    uid = get_jwt_identity()
    plats = FreelancePlatform.query.filter_by(user_id=uid).all()
    return jsonify([
        {"id": p.id, "name": p.name, "profile_url": p.profile_url}
        for p in plats
    ])

@app.route("/api/proposals/connect-platform", methods=["POST"])
@jwt_required()
def connect_freelance_platform():
    uid  = get_jwt_identity()
    data = request.get_json() or {}

    plat = FreelancePlatform(
        name=data.get("name"),
        profile_url=data.get("profile_url"),
        user_id=uid
    )
    db.session.add(plat)
    db.session.commit()
    return jsonify({
        "id": plat.id,
        "name": plat.name,
        "profile_url": plat.profile_url
    }), 201

@app.route("/api/proposals/find-jobs", methods=["GET"])
@jwt_required()
def find_jobs():
    mock_jobs = [
        {
            "id": 1,
            "title": "Build a React Native E-commerce App",
            "platform_name": "Upwork",
            "description": "Seeking an expert developer..."
        },
        {
            "id": 2,
            "title": "Flask Backend Developer for Data API",
            "platform_name": "Guru",
            "description": "We need a Python/Flask developer..."
        },
        {
            "id": 3,
            "title": "UI/UX Designer for SaaS Dashboard",
            "platform_name": "Upwork",
            "description": "Looking for a talented designer..."
        }
    ]
    return jsonify(mock_jobs)

@app.route("/api/proposals/generate", methods=["POST"])
@jwt_required()
def generate_proposal():
    user      = User.query.get(get_jwt_identity())
    job_title = request.json.get("job_title", "the specified project")

    proposal = (
        f"Dear Hiring Manager,\n\n"
        f"I am writing to express my interest in '{job_title}'. "
        "With extensive experience building scalable apps, "
        "I’m confident I can deliver outstanding results.\n\n"
        f"Sincerely,\n{user.username}"
    )
    return jsonify({"proposal_text": proposal})

# Run locally
if __name__ == "__main__":
    app.run(debug=True, port=5001)