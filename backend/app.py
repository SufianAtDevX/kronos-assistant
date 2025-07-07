# backend/app.py
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from werkzeug.security import generate_password_hash, check_password_hash
import os
import datetime

# --- App Initialization & Configuration ---
app = Flask(__name__)

# This explicitly allows your Vercel frontend to make requests to your backend.
CORS(app, resources={r"/api/*": {"origins": "https://kronos-assistant.vercel.app"}})

# Use an environment variable for the secret key in production
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY", "a-super-secret-key-that-you-should-change")
# Use an absolute path for the database on PythonAnywhere
db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'kronos.db')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL", f'sqlite:///{db_path}')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
jwt = JWTManager(app)
db = SQLAlchemy(app)

# --- Database Models ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    social_accounts = db.relationship('SocialAccount', backref='user', lazy=True, cascade="all, delete-orphan")
    scheduled_posts = db.relationship('ScheduledPost', backref='user', lazy=True, cascade="all, delete-orphan")
    freelance_platforms = db.relationship('FreelancePlatform', backref='user', lazy=True, cascade="all, delete-orphan")
    proposals = db.relationship('Proposal', backref='user', lazy=True, cascade="all, delete-orphan")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class SocialAccount(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    platform = db.Column(db.String(50), nullable=False)
    handle = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class ScheduledPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    hashtags = db.Column(db.String(500), nullable=True)
    image_url = db.Column(db.String(500), nullable=True)
    post_time = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    account_id = db.Column(db.Integer, db.ForeignKey('social_account.id'), nullable=False)
    social_account = db.relationship('SocialAccount', backref='scheduled_posts')

class FreelancePlatform(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    profile_url = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    platform_name = db.Column(db.String(50), nullable=False)

class Proposal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('job.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    job = db.relationship('Job', backref='proposals')

# Create tables within the app context to ensure they exist before first request
with app.app_context():
    db.create_all()

# --- API Routes ---
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({"msg": "Username and password are required"}), 400
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"msg": "Username already exists"}), 409
    new_user = User(username=data['username'])
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User created successfully"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({"msg": "Bad username or password"}), 401
    user = User.query.filter_by(username=data['username']).first()
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token, username=user.username)
    return jsonify({"msg": "Bad username or password"}), 401
    
@app.route('/api/social/accounts', methods=['GET'])
@jwt_required()
def get_social_accounts():
    current_user_id = get_jwt_identity()
    accounts = SocialAccount.query.filter_by(user_id=current_user_id).all()
    return jsonify([{"id": acc.id, "platform": acc.platform, "handle": acc.handle} for acc in accounts])

@app.route('/api/social/connect', methods=['POST'])
@jwt_required()
def connect_social_account():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    new_account = SocialAccount(platform=data.get('platform'), handle=data.get('handle'), user_id=current_user_id)
    db.session.add(new_account)
    db.session.commit()
    return jsonify({"id": new_account.id, "platform": new_account.platform, "handle": new_account.handle}), 201

@app.route('/api/social/generate-content', methods=['POST'])
@jwt_required()
def generate_content():
    topic = request.json.get('topic', 'an exciting new venture')
    mock_caption = f"Excited to announce our latest project focusing on {topic}. We're pushing the boundaries of innovation. #Innovation #{topic.replace(' ', '')} #FutureTech"
    mock_hashtags = f"#business #{topic.replace(' ', '')} #startup"
    return jsonify({"caption": mock_caption, "hashtags": mock_hashtags, "image_prompt": f"A futuristic, abstract image representing '{topic}'"})

@app.route('/api/social/generate-image', methods=['POST'])
@jwt_required()
def generate_image():
    prompt = request.json.get('prompt', 'promotional image')
    image_url = f"https://placehold.co/1080x1080/000000/FFFFFF/png?text={prompt.replace(' ', '+')}"
    return jsonify({"image_url": image_url})

@app.route('/api/social/schedule', methods=['POST'])
@jwt_required()
def schedule_post():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    new_post = ScheduledPost(content=data['content'], hashtags=data.get('hashtags'), image_url=data.get('image_url'), post_time=datetime.datetime.fromisoformat(data['post_time']), user_id=current_user_id, account_id=data['account_id'])
    db.session.add(new_post)
    db.session.commit()
    return jsonify({"msg": "Post scheduled successfully", "post_id": new_post.id}), 201

@app.route('/api/proposals/platforms', methods=['GET'])
@jwt_required()
def get_freelance_platforms():
    current_user_id = get_jwt_identity()
    platforms = FreelancePlatform.query.filter_by(user_id=current_user_id).all()
    return jsonify([{"id": p.id, "name": p.name, "profile_url": p.profile_url} for p in platforms])

@app.route('/api/proposals/connect-platform', methods=['POST'])
@jwt_required()
def connect_freelance_platform():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    new_platform = FreelancePlatform(name=data.get('name'), profile_url=data.get('profile_url'), user_id=current_user_id)
    db.session.add(new_platform)
    db.session.commit()
    return jsonify({"id": new_platform.id, "name": new_platform.name, "profile_url": new_platform.profile_url}), 201

@app.route('/api/proposals/find-jobs', methods=['GET'])
@jwt_required()
def find_jobs():
    mock_jobs = [{"id": 1, "title": "Build a React Native E-commerce App", "platform_name": "Upwork", "description": "Seeking an expert developer..."}, {"id": 2, "title": "Flask Backend Developer for Data API", "platform_name": "Guru", "description": "We need a Python/Flask developer..."}, {"id": 3, "title": "UI/UX Designer for SaaS Dashboard", "platform_name": "Upwork", "description": "Looking for a talented designer..."}]
    return jsonify(mock_jobs)

@app.route('/api/proposals/generate', methods=['POST'])
@jwt_required()
def generate_proposal():
    user = User.query.get(get_jwt_identity())
    job_title = request.json.get('job_title', 'the specified project')
    mock_proposal = (f"Dear Hiring Manager,\n\nI am writing to express my keen interest in the '{job_title}' position. With a proven track record in developing high-quality, scalable applications, I am confident I possess the skills and experience necessary to deliver exceptional results for your project.\n\nSincerely,\n{user.username}")
    return jsonify({"proposal_text": mock_proposal})

# This block is essential for running the app on your local machine
if __name__ == '__main__':
    app.run(debug=True, port=5001)
