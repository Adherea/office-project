"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function TranscriptEditor() {
  const params = useParams();
  const { id } = params;

  const [transcript, setTranscript] = useState("");
  const [saving, setSaving] = useState(false);

  // Simulasi data transkripsi
  // app/transcripts/[id]/page.js
  useEffect(() => {
    if (id === "new-transcript") {
      // Ambil data dari localStorage
      const savedTranscript = localStorage.getItem("currentTranscript");
      if (savedTranscript) {
        const parsedData = JSON.parse(savedTranscript);
        setTranscript(parsedData.text || "");
      }
    } else {
      // Di sini nanti kode untuk ambil data dari database kalo perlu
    }
  }, [id]);

  const handleSave = () => {
    setSaving(true);

    // Simulasi simpan ke database
    setTimeout(() => {
      setSaving(false);
      alert("Transkripsi berhasil disimpan!");
    }, 1500);
  };

  const handleExport = (format) => {
    // Nanti di sini untuk export ke Word/PDF
    alert(`Mengekspor transkripsi ke format ${format}`);
  };

  return (
    <main className="p-6 md:p-12 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Edit Transkripsi {id === "new-transcript" ? "Baru" : `#${id}`}</h1>
          <div className="flex space-x-3">
            <button onClick={() => handleExport("docx")} className="px-4 py-2 bg-blue-50 text-blue-700 rounded border border-blue-200 hover:bg-blue-100">
              Export ke Word
            </button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <textarea value={transcript} onChange={(e) => setTranscript(e.target.value)} className="w-full h-96 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-sm" />

          <div className="mt-4 text-sm text-gray-500">* Hasil transkripsi otomatis mungkin tidak 100% akurat. Silakan edit sesuai kebutuhan.</div>
        </div>
      </div>
    </main>
  );
}
