import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileCheck2,
  Award,
  ShieldCheck,
  Search,
  Printer,
  Download,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  QrCode,
  Share2
} from 'lucide-react';

export const CertificatesPage: React.FC = () => {
  const { certificate, currentUser, verifyCertificateCode, addToast } = useApp();

  const [recipientName, setRecipientName] = useState<string>(currentUser.name);
  const [achievement, setAchievement] = useState<string>('Grand Champion & Best AI Architecture');
  const [verifyInput, setVerifyInput] = useState<string>('');
  const [verificationResult, setVerificationResult] = useState<{
    tested: boolean;
    valid?: boolean;
    cert?: any;
  }>({ tested: false });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyInput.trim()) return;
    const res = verifyCertificateCode(verifyInput);
    setVerificationResult({ tested: true, valid: res.valid, cert: res.cert });
    if (res.valid) {
      addToast('Certificate code verified against public cryptographic registry!', 'success');
    } else {
      addToast('Invalid verification identifier', 'error');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 no-print">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">
              Verifiable Credentials
            </span>
            <span className="text-xs font-mono text-slate-400">
              Protocol: <strong className="text-white">Dogfood Attestation v1.0</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Digital Certificates &amp; Verification
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Cryptographically sealed participation and award certificates with tamper-proof verification IDs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Verification ID Search Box */}
      <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3 no-print">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Verify Credential Authenticity</span>
        </h3>
        <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={verifyInput}
              onChange={(e) => setVerifyInput(e.target.value)}
              placeholder="Enter verification code (e.g. DOGFOOD-2026-RAPTOR-8921-VERIFIED)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/10 transition-colors"
          >
            Verify Certificate
          </button>
        </form>

        {verificationResult.tested && (
          <div
            className={`p-3 rounded-xl border text-xs flex items-center gap-2 animate-in fade-in ${
              verificationResult.valid
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}
          >
            {verificationResult.valid ? (
              <>
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>
                  <strong>AUTHENTIC CERTIFICATE:</strong> Issued to{' '}
                  <strong className="text-white">{verificationResult.cert?.recipientName}</strong> for{' '}
                  <em>{verificationResult.cert?.achievement}</em>.
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>Verification Failed: Invalid or revoked certificate code.</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Modern High-End Certificate Preview */}
      <div className="relative mx-auto max-w-4xl p-8 sm:p-12 rounded-3xl bg-slate-950 border-2 border-indigo-500/40 shadow-2xl text-slate-100 overflow-hidden print:border-black print:p-6 print:shadow-none">
        {/* Decorative corner borders */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-indigo-400" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-indigo-400" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-indigo-400" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-indigo-400" />

        {/* Inner Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <span className="text-9xl font-black font-mono">DOGFOOD</span>
        </div>

        {/* Certificate Content */}
        <div className="relative z-10 text-center space-y-6">
          {/* Logo & Hackathon Badge */}
          <div className="space-y-1">
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-mono uppercase tracking-widest font-bold">
              Official Hackathon Attestation
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-2">
              DOGFOOD 2026
            </h2>
            <p className="text-xs font-mono text-slate-400">
              OPEN INFRASTRUCTURE FOR FAIR, SELF-HOSTED HACKATHONS
            </p>
          </div>

          <div className="text-xs font-serif uppercase tracking-widest text-slate-400 pt-2">
            This Certificate is Proudly Awarded to
          </div>

          {/* Recipient */}
          <div className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-slate-200 tracking-wide font-sans py-1">
            {recipientName}
          </div>

          <div className="max-w-xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed">
            In recognition of outstanding technical excellence, verified open-source engineering, and distinguished achievement as:
          </div>

          {/* Achievement Badge */}
          <div className="inline-block px-6 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-sm sm:text-base shadow-lg shadow-amber-500/5">
            🏆 {achievement}
          </div>

          {/* Footer Metadata & Signature */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-left text-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">
                Verification Identifier
              </span>
              <span className="font-mono text-cyan-400 font-bold text-[11px] block break-all">
                {certificate.verificationCode}
              </span>
              <span className="text-[10px] text-slate-400 block">Status: Cryptographically Verified</span>
            </div>

            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">
                Issued At
              </span>
              <span className="text-slate-300 font-mono text-xs block">
                {certificate.issueDate}
              </span>
              <span className="text-[10px] text-slate-400 block">72-Hour Engineering Sprint</span>
            </div>

            <div className="sm:text-right space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">
                Authorized By
              </span>
              <span className="font-serif italic text-white text-base block">
                Marcus Aurelius Vance
              </span>
              <span className="text-[10px] text-slate-400 block">
                Organizing Committee Chair
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
