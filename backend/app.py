from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from utils import extract_text, detect_language, extract_keywords

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

    # Save result to text file
    result_path = os.path.join(UPLOAD_FOLDER, f"{filename}.txt")
    with open(result_path, "w", encoding="utf-8") as f:
        f.write(f"Language: {language}\n\n")
        f.write("Text:\n")
        f.write(text + "\n\n")
        f.write("Keywords:\n")
        f.write(", ".join(keywords))

    return jsonify({
        'text': text,
        'language': language,
        'keywords': keywords,
        'result_file': result_path  # Optional
    })

if __name__ == '__main__':
    app.run(debug=True)
