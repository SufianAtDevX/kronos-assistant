import os
from datetime import datetime, timedelta

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token,
    jwt_required, get_jwt_identity
)
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv

# Load .env
load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///kronos.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "super-secret-key")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)

db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app, resources={r"/api/*": {"origins": os.getenv("FRONTEND_URL", "*")}})

# --- Models ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    social_accounts = db.relationship("SocialAccount", backref="user", lazy=True)
    platforms = db.relationship("ProposalPlatform", backref="user", lazy=True)
    scheduled_posts = db.relationship("ScheduledPost", backref="user", lazy=True)

class SocialAccount(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    platform = db.Column(db.String(50), nullable=False)
    handle = db.Column(db.String(80), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

class ProposalPlatform(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    profile_url = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

class ScheduledPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    hashtags = db.Column(db.String(200), nullable=True)
    image_url = db.Column(db.String(200), nullable=True)
    post_time = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    account_id = db.Column(db.Integer, nullable=False)

# Create tables
with app.app_context():
    db.create_all()

# --- Auth Endpoints ---
@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    usern, pwd = data.get("username"), data.get("password")
    if not usern or not pwd:
        return jsonify({"error": "Username and password required"}), 400
    if User.query.filter_by(username=usern).first():
        return jsonify({"error": "Username already exists"}), 400
    user = User(
        username=usern,
        password_hash=generate_password_hash(pwd)
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User created"}), 201

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    usern, pwd = data.get("username"), data.get("password")
    user = User.query.filter_by(username=usern).first()
    if not user or not check_password_hash(user.password_hash, pwd):
        return jsonify({"error": "Invalid credentials"}), 401
    access_token = create_access_token(identity=str(user.id))
    return jsonify({"access_token": access_token, "username": user.username})

# --- Social Media Endpoints ---
@app.route("/api/social/accounts", methods=["GET"])
@jwt_required()
def get_social_accounts():
    uid = int(get_jwt_identity())
    accounts = SocialAccount.query.filter_by(user_id=uid).all()
    return jsonify([{"id": a.id, "platform": a.platform, "handle": a.handle} for a in accounts])

@app.route("/api/social/connect", methods=["POST"])
@jwt_required()
def connect_social_account():
    data = request.get_json() or {}
    plat, handle = data.get("platform"), data.get("handle")
    if not plat or not handle:
        return jsonify({"error": "Platform and handle required"}), 400
    uid = int(get_jwt_identity())
    acc = SocialAccount(platform=plat, handle=handle, user_id=uid)
    db.session.add(acc)
    db.session.commit()
    return jsonify({"id": acc.id, "platform": plat, "handle": handle}), 201

@app.route("/api/social/generate-content", methods=["POST"])
@jwt_required()
def generate_content():
    topic = (request.get_json() or {}).get("topic", "")
    caption = f"🌟 Check out this AI-powered post about {topic}!"
    hashtags = f"#{topic.replace(' ', '')} #AI"
    image_prompt = topic
    return jsonify({"caption": caption, "hashtags": hashtags, "image_prompt": image_prompt})

@app.route("/api/social/generate-image", methods=["POST"])
@jwt_required()
def generate_image():
    prompt = (request.get_json() or {}).get("prompt", "")
    image_url = "https://placekitten.com/800/400"
    return jsonify({"image_url": image_url})

@app.route("/api/social/schedule", methods=["POST"])
@jwt_required()
def schedule_post():
    data = request.get_json() or {}
    content = data.get("content")
    post_time = data.get("post_time")
    account_id = data.get("account_id")
    if not content or not post_time or not account_id:
        return jsonify({"error": "Missing fields"}), 400
    uid = int(get_jwt_identity())
    dt = datetime.fromisoformat(post_time.replace("Z", ""))
    sp = ScheduledPost(
        content=content,
        hashtags=data.get("hashtags"),
        image_url=data.get("image_url"),
        post_time=dt,
        user_id=uid,
        account_id=account_id
    )
    db.session.add(sp)
    db.session.commit()
    return jsonify({"message": "Post scheduled"}), 201

# --- Proposal Endpoints ---
@app.route("/api/proposals/platforms", methods=["GET"])
@jwt_required()
def get_proposal_platforms():
    uid = int(get_jwt_identity())
    plats = ProposalPlatform.query.filter_by(user_id=uid).all()
    return jsonify([{"id": p.id, "name": p.name, "profile_url": p.profile_url} for p in plats])

@app.route("/api/proposals/connect-platform", methods=["POST"])
@jwt_required()
def connect_proposal_platform():
    data = request.get_json() or {}
    name, url = data.get("name"), data.get("profile_url")
    if not name or not url:
        return jsonify({"error": "Name and profile_url required"}), 400
    uid = int(get_jwt_identity())
    p = ProposalPlatform(name=name, profile_url=url, user_id=uid)
    db.session.add(p)
    db.session.commit()
    return jsonify({"id": p.id, "name": name, "profile_url": url}), 201

@app.route("/api/proposals/find-jobs", methods=["GET"])
@jwt_required()
def find_jobs():
    jobs = [
        {"id": 1, "title": "Build a React Landing Page", "description": "Need a responsive hero section", "platform_name": "Upwork"},
        {"id": 2, "title": "Social Media Strategy", "description": "Monthly content calendar", "platform_name": "Fiverr"}
    ]
    return jsonify(jobs)

@app.route("/api/proposals/generate", methods=["POST"])
@jwt_required()
def generate_proposal():
    title = (request.get_json() or {}).get("job_title", "")
    text = f"Hello! I’d love to help with {title}. Here’s my pitch…"
    return jsonify({"proposal_text": text})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
