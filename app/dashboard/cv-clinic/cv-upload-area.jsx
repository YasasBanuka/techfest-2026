"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CVUploadArea({ userId }) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | uploading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);
  
  const supabase = createClient();
  const router = useRouter();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    validateAndSetFile(selected);
  };

  const validateAndSetFile = (selected) => {
    if (!selected) return;

    // Check file type
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword"
    ];
    if (!allowedTypes.includes(selected.type)) {
      setErrorMessage("Please upload a PDF or Word document (.pdf, .docx, .doc)");
      return;
    }

    // Check size (5MB)
    if (selected.size > 5 * 1024 * 1024) {
      setErrorMessage("File size must be under 5MB");
      return;
    }

    setErrorMessage("");
    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus("uploading");
    try {
      // 1. Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}_${Date.now()}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      // 2. Upload to Supabase Storage
      // Important: Bucket 'cv-uploads' must exist and have proper RLS
      const { data: storageData, error: storageError } = await supabase.storage
        .from('cv-uploads')
        .upload(filePath, file);

      if (storageError) throw storageError;

      // 3. Save metadata to DB
      const { error: dbError } = await supabase
        .from('cv_submissions')
        .insert({
          user_id: userId,
          file_name: file.name,
          file_path: filePath,
          status: 'pending'
        });

      if (dbError) throw dbError;

      setStatus("success");
      setFile(null);
      setTimeout(() => {
        router.refresh();
        setStatus("idle");
      }, 2000);

    } catch (err) {
      console.error("Upload failed:", err);
      setErrorMessage(err.message || "Failed to upload CV. Please try again.");
      setStatus("idle");
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="py-12 flex flex-col items-center justify-center text-center gap-4 border-2 border-dashed border-green-500/30 rounded-2xl bg-green-500/5"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
               <CheckCircle2 size={32} />
            </div>
            <div>
              <h4 className="text-white font-heading font-black uppercase text-sm tracking-widest">Upload Successful!</h4>
              <p className="text-white-dim text-[11px] mt-1">Our mentors will review your CV shortly.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="form" className="space-y-6">
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-3xl py-14 flex flex-col items-center justify-center text-center transition-all cursor-pointer group px-6 ${
                isDragging ? "border-gold bg-gold/5" : "border-navy-border hover:border-gold/40 hover:bg-gold/5"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />

              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${
                file ? "bg-green-500/10 text-green-400 rotate-0 scale-110" : "bg-gold/10 text-gold rotate-3 group-hover:rotate-0"
              }`}>
                {file ? <FileText size={32} /> : <Upload size={32} />}
              </div>

              {!file ? (
                <>
                  <p className="text-white text-sm font-black uppercase tracking-widest mb-2 italic">Drag & drop your CV</p>
                  <p className="text-white-dim text-[11px] uppercase tracking-[0.2em]">or click to browse files</p>
                </>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <p className="text-white text-sm font-bold truncate max-w-[250px]">{file.name}</p>
                  <p className="text-white-dim text-[11px] uppercase tracking-widest">{(file.size / 1024 / 1024).toFixed(2)} MB • Ready</p>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    className="mt-4 text-[10px] text-red-400 font-bold uppercase tracking-widest hover:text-red-300 transition-colors flex items-center gap-1"
                  >
                    <X size={10} /> Remove File
                  </button>
                </div>
              )}
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 text-red-400 text-xs px-2 animate-in slide-in-from-left-2 duration-300">
                <AlertCircle size={14} />
                {errorMessage}
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!file || status === "uploading"}
              className="w-full bg-gold text-navy-deeper font-heading font-black py-4 rounded-2xl hover:bg-gold-bright hover:shadow-[0_0_35px_rgba(255,203,64,0.35)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg uppercase text-xs tracking-widest"
            >
              {status === "uploading" ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Submit for Review
                  <Upload size={16} />
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
