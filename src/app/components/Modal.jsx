"use client";
import { useEffect, useState, useCallback } from "react";

export default function Modal({ isOpen, onClose, children, defaultFullscreen = false }) {
    const [isFullscreen, setIsFullscreen] = useState(defaultFullscreen);

    const handleEsc = useCallback((e) => {
        if (e.key === "Escape") onClose();
        if (e.key === "F11") {
            e.preventDefault();
            setIsFullscreen((prev) => !prev);
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
        }
        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, handleEsc]);

    // Reset fullscreen state when modal closes
    useEffect(() => {
        if (!isOpen) setIsFullscreen(defaultFullscreen);
    }, [isOpen, defaultFullscreen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop — hidden in fullscreen */}
            {!isFullscreen && (
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            {/* Modal Content */}
            <div
                className={[
                    "relative z-10 bg-white shadow-xl animate-[fadeIn_0.2s_ease-out]",
                    "transition-all duration-300 ease-in-out",
                    isFullscreen
                        ? "w-screen h-screen rounded-none p-0 flex flex-col"
                        : "w-full max-w-lg rounded-2xl p-6",
                ].join(" ")}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Fullscreen toggle button */}
                <button
                    onClick={() => setIsFullscreen((prev) => !prev)}
                    className={[
                        "absolute z-20 flex items-center justify-center",
                        "w-8 h-8 rounded-lg text-gray-400 hover:text-gray-700",
                        "hover:bg-gray-100 transition-colors duration-150",
                        isFullscreen ? "top-3 right-12" : "top-3 right-3",
                    ].join(" ")}
                    title={isFullscreen ? "Exit fullscreen (F11)" : "Fullscreen (F11)"}
                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                    {isFullscreen ? <ExitFullscreenIcon /> : <EnterFullscreenIcon />}
                </button>

                {/* Close button — always visible in fullscreen */}
                {isFullscreen && (
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 z-20 flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                        title="Close (Esc)"
                        aria-label="Close modal"
                    >
                        <CloseIcon />
                    </button>
                )}

                {/* Scrollable content area in fullscreen */}
                <div className={isFullscreen ? "flex-1 overflow-auto p-6" : ""}>
                    {children}
                </div>
            </div>
        </div>
    );
}

function EnterFullscreenIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 6V1h5M10 1h5v5M15 10v5h-5M6 15H1v-5" />
        </svg>
    );
}

function ExitFullscreenIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 1v5H1M10 1v5h5M10 15v-5h5M6 15v-5H1" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M3 3l10 10M13 3L3 13" />
        </svg>
    );
}