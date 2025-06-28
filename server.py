# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import whisper
import os
import tempfile
import time

app = Flask(__name__)
CORS(app)  # Supaya bisa diakses dari Next.js

# Load model sekali pas server start biar ga load berulang kali
print("Loading Whisper model...")
model = whisper.load_model("base")  # Bisa ganti "small", "medium", dll
print("Model loaded!")

# Ubah bagian ini di server.py
@app.route('/api/transcribe', methods=['POST'])
def transcribe_audio():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    try:
        # Cara lain: bikin file dengan path lengkap & extension
        import uuid
        # Pastikan ada folder "temp" di directory yang sama dengan server.py
        if not os.path.exists("temp"):
            os.makedirs("temp")
            
        # Buat nama file unik dengan extension asli
        file_extension = os.path.splitext(file.filename)[1]  # Ambil extension (.mp3, .wav dll)
        unique_filename = str(uuid.uuid4()) + file_extension
        file_path = os.path.join(os.path.abspath("temp"), unique_filename)
        
        # Simpan file
        file.save(file_path)
        
        print(f"File saved at: {file_path}")  # Debug log
        print(f"File exists: {os.path.exists(file_path)}")  # Cek file exists
        
        # Transcribe pake Whisper
        result = model.transcribe(file_path)
        
        # Format hasil buat frontend
        response = {
            'text': result["text"],
            'segments': result["segments"] if "segments" in result else [],
            'id': 'transcript-' + str(int(time.time()))
        }
        
        # Coba hapus file
        try:
            os.unlink(file_path)
            print(f"File deleted successfully")
        except Exception as e:
            print(f"Failed to delete file: {e}")
        
        return jsonify(response)
        
    except Exception as e:
        print(f"Error during transcription: {e}")
        import traceback
        traceback.print_exc()  # Print traceback lengkap
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)