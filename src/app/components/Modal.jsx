"use client";
import { useEffect } from "react";

export default function Modal({ isOpen, onClose, children }) {
    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl animate-[fadeIn_0.2s_ease-out]"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}