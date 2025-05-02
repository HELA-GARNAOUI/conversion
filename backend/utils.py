import pytesseract
from PIL import Image
from langdetect import detect
from keybert import KeyBERT
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Load multilingual KeyBERT model
kw_model = KeyBERT(model='distilbert-base-multilingual-cased')

def extract_text(image_path):
    image = Image.open(image_path)
    text = pytesseract.image_to_string(image)
    return text.strip()

def detect_language(text):
    try:
        return detect(text)
    except:
        return "unknown"

def extract_keywords(text, num_keywords=5):
    keywords = kw_model.extract_keywords(text, keyphrase_ngram_range=(1, 1), stop_words=None, top_n=num_keywords)
    return [kw[0] for kw in keywords]
