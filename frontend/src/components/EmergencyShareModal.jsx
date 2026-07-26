import { useState } from 'react';
import { X, Share2, Copy, Check, MessageCircle, Send, AlertTriangle, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function EmergencyShareModal({ isOpen, onClose, request }) {
    const { lang } = useLanguage();
    const [copied, setCopied] = useState(false);

    if (!isOpen || !request) return null;

    const message = `🚨 URGENT BLOOD NEEDED (${request.blood_group}) 🚨\n\n` +
        `🏥 Hospital: ${request.hospital_name || 'Hospital'}, ${request.district}\n` +
        `🩸 Blood Group Required: ${request.blood_group}\n` +
        `⚡ Urgency Level: ${request.urgency_level || 'High'}\n` +
        `👤 Patient Name: ${request.patient_name || 'Emergency Patient'}\n` +
        `📞 Contact Number: ${request.phone_number || 'N/A'}\n\n` +
        `🙏 Please help save a life or forward this in your groups!\n` +

        `🌐 Verified via Blood Connect Nepal: http://localhost:5173/requests`;

    const handleCopy = () => {
        navigator.clipboard.writeText(message);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('http://localhost:5173/requests')}&quote=${encodeURIComponent(message)}`;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-gray-700 transition-all">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-200 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                    <div className="p-3 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-2xl shrink-0">
                        <Share2 className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white">
                            {lang === 'ne' ? 'आपत्कालीन सन्देश सेयर गर्नुहोस्' : 'Emergency Viral Broadcast'}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {lang === 'ne' ? '१-क्लिकमा व्हाट्सएप र सोसल मिडियामा पठाउनुहोस्' : 'Share 1-click verified alert to WhatsApp & Social Media'}
                        </p>
                    </div>
                </div>

                {/* Alert Badge */}
                <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-semibold mb-5">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600" />
                    <span>
                        {lang === 'ne' 
                            ? 'यो सन्देश सेयर गरेर तपाईंले तुरुन्तै रक्तदाता भेटाउन मद्दत गर्न सक्नुहुन्छ!' 
                            : 'Sharing emergency alerts increases donor response rate by over 400%!'}
                    </span>
                </div>

                {/* Message Preview Box */}
                <div className="mb-6">
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                        {lang === 'ne' ? 'सन्देशको नमुना (Message Preview):' : 'Pre-Formatted Emergency Alert Preview:'}
                    </label>
                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line font-mono max-h-48 overflow-y-auto select-all">
                        {message}
                    </div>
                </div>

                {/* Share Buttons Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {/* WhatsApp */}
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all hover:-translate-y-0.5"
                    >
                        <MessageCircle className="w-5 h-5 fill-current" />
                        WhatsApp
                    </a>

                    {/* Facebook / Twitter X */}
                    <a
                        href={twitterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 rounded-xl bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all hover:-translate-y-0.5"
                    >
                        <Send className="w-4 h-4" />
                        Twitter (X) / Post
                    </a>
                </div>

                {/* Copy Button */}
                <button
                    type="button"
                    onClick={handleCopy}
                    className={`w-full py-4 px-6 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                        copied 
                            ? 'bg-green-600 text-white shadow-green-500/25' 
                            : 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/25'
                    }`}
                >
                    {copied ? (
                        <>
                            <Check className="w-5 h-5 animate-bounce" />
                            {lang === 'ne' ? 'सन्देश कपी भयो!' : 'Copied to Clipboard! (Ready to Paste)'}
                        </>
                    ) : (
                        <>
                            <Copy className="w-5 h-5" />
                            {lang === 'ne' ? 'सन्देश कपी गर्नुहोस् (Copy Message)' : 'Copy Complete Alert Text'}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
