"use client";

import { useState } from "react";
import Link from "next/link";
import UploadForm from "../app/components/uploadForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24 bg-gray-50">
      <div className="w-full max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Transkripsi Persidangan Digital</h1>
        <p className="text-lg text-gray-600 mb-8">Ubah rekaman persidangan menjadi teks dengan mudah dan cepat.</p>

        <div className="mb-12 bg-white p-6 rounded-lg shadow-md">
          <UploadForm />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <Link href="/transcripts">
            <div className="p-6 bg-blue-100 rounded-lg shadow hover:shadow-md transition cursor-pointer">
              <h2 className="text-xl font-semibold text-blue-700 mb-2">Transkripsi Saya</h2>
              <p className="text-gray-600">Lihat semua transkripsi yang sudah dibuat sebelumnya</p>
            </div>
          </Link>
          <Link href="/profile">
            <div className="p-6 bg-blue-100 rounded-lg shadow hover:shadow-md transition cursor-pointer">
              <h2 className="text-xl font-semibold text-blue-700 mb-2">Profil Saya</h2>
              <p className="text-gray-600">Atur pengaturan akun dan preferensi</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
