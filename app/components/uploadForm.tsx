"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // Update UploadForm.js
  // components/UploadForm.js
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    setLoading(true);
    setProgress(10);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // URL server Flask yang udah jalan
      const response = await fetch("http://localhost:5000/api/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to transcribe");
      }

      setProgress(90);

      const data = await response.json();

      // Simpan hasil transcription ke state global atau local storage
      localStorage.setItem("currentTranscript", JSON.stringify(data));

      setProgress(100);

      // Redirect ke halaman edit
      setTimeout(() => {
        router.push("/transcripts/new-transcript");
      }, 1000);
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
      alert("Gagal melakukan transkripsi: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <input type="file" accept="audio/*" onChange={handleFileChange} className="hidden" id="audio-file" />
        <label htmlFor="audio-file" className="flex flex-col items-center justify-center cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span className="text-lg font-medium text-blue-600">Klik untuk pilih file rekaman</span>
          <span className="text-sm text-gray-500 mt-1">Format yang didukung: MP3, WAV, M4A (maks. 2 GB)</span>
        </label>
      </div>

      {file && (
        <div className="mt-4">
          <p className="text-sm text-gray-700">
            File terpilih: <span className="font-medium">{file.name}</span>
          </p>
          <p className="text-xs text-gray-500">Ukuran: {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
        </div>
      )}

      {loading && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{progress < 100 ? "Memproses transkripsi..." : "Transkripsi selesai!"}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!file || loading}
        className={`w-full py-3 px-4 rounded-md text-white font-medium 
                  ${!file || loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {loading ? "Memproses..." : "Mulai Transkripsi"}
      </button>
    </form>
  );
}
