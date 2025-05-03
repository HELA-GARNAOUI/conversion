from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from utils import extract_text, detect_language, extract_keywords
from flask import send_file

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/convert', methods=['POST'])
def convert():
    file = request.files['file']
    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    # OCR
    text = extract_text(filepath)

    # Language detection
    language = detect_language(text)

    # Keyword extraction
    keywords = extract_keywords(text)

    return jsonify({
        'text': text,
        'language': language,
        'keywords': keywords
    })

if __name__ == '__main__':
    app.run(debug=True)
