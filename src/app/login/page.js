"use client";
import Image from 'next/image'
import { useState } from "react";
import Logo from "../assets/logo.png"
import { useCustomContext } from '../Provider/Context';
import { redirect } from 'next/navigation'


export default function AuthPage() {
    const [mode, setMode] = useState("login");
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { loggedIn, setLoggedIn } = useCustomContext()

    const isLogin = mode === "login";

    if (loggedIn) {
        redirect('/')
    }

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let apiPath = mode === "login" ? "/api/auth" : "/api/users";
        let response = await fetch(apiPath, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        if (response.ok) {
            let body = await response.json();
            if (typeof window !== "undefined")
                localStorage.setItem("auth-token", body.loginCookie);
            setLoggedIn(true)
        }

        await new Promise((r) => setTimeout(r, 1200));
        setLoading(false);
    };

    return (
        <div className='h-screen flex items-center justify-center bg-gray-100 root'>
            <div className='blob' aria-hidden="true" />
            <div style={styles.card}>
                <div style={styles.brand}>
                    <div style={styles.logoMark}>
                        <Image src={Logo} alt="logo" height={70} />
                    </div>
                    <span style={styles.brandName}>Tyro Study</span>
                </div>

                {/* Heading */}
                <div style={styles.heading}>
                    <h1 style={styles.title}>
                        {isLogin ? "Welcome back" : "Create account"}
                    </h1>
                    <p style={styles.subtitle}>
                        {isLogin
                            ? "Sign in to continue to your workspace."
                            : "Sign up to get started."}
                    </p>
                </div>

                <div style={styles.tabs}>
                    <button
                        onClick={() => setMode("login")}
                        style={{ ...styles.tab, ...(isLogin ? styles.tabActive : {}) }}
                    >
                        Sign in
                    </button>
                    <button
                        onClick={() => setMode("signup")}
                        style={{ ...styles.tab, ...(!isLogin ? styles.tabActive : {}) }}
                    >
                        Sign up
                    </button>
                </div>

                {/* Form */}
                <div style={styles.form}>
                    {!isLogin && (
                        <div style={styles.field}>
                            <label style={styles.label} htmlFor="name">
                                Full name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                placeholder="Jane Smith"
                                value={form.name}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>
                    )}

                    <div style={styles.field}>
                        <label style={styles.label} htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="jane@example.com"
                            value={form.email}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.field}>
                        <div style={styles.labelRow}>
                            <label style={styles.label} htmlFor="password">
                                Password
                            </label>
                            {isLogin && (
                                <a href="/forgot-password" style={styles.forgotLink}>
                                    Forgot password?
                                </a>
                            )}
                        </div>
                        <div style={styles.passwordWrap}>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete={isLogin ? "current-password" : "new-password"}
                                placeholder={isLogin ? "Enter your password" : "Min. 8 characters"}
                                value={form.password}
                                onChange={handleChange}
                                style={{ ...styles.input, paddingRight: "44px" }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                style={styles.eyeBtn}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={"submitBtn" + (loading ? " submitBtnLoading" : "")}
                    >
                        {loading ? (
                            <span style={styles.spinner} />
                        ) : isLogin ? (
                            "Sign in"
                        ) : (
                            "Create account"
                        )}
                    </button>
                </div>

                {/* Divider */}
                <div style={styles.divider}>
                    <div style={styles.dividerLine} />
                    <span style={styles.dividerText}>or continue with</span>
                    <div style={styles.dividerLine} />
                </div>

                {/* OAuth buttons */}
                <div style={styles.oauthRow}>
                    <OAuthButton icon={<GoogleIcon />} label="Google" />
                    <OAuthButton icon={<GitHubIcon />} label="GitHub" />
                </div>

                {/* Footer switch */}
                <p style={styles.switchText}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => setMode(isLogin ? "signup" : "login")}
                        style={styles.switchLink}
                    >
                        {isLogin ? "Sign up" : "Sign in"}
                    </button>
                </p>
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        input::placeholder { color: #9ca3af; }

        input:focus {
          outline: none;
          border-color: #6366f1 !important;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}

function OAuthButton({ icon, label }) {
    return (
        <button style={styles.oauthBtn}>
            {icon}
            <span style={{ fontSize: "14px", fontWeight: 500, color: "#374151" }}>{label}</span>
        </button>
    );
}

function GoogleIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M17.64 9.2a10.34 10.34 0 0 0-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92a8.78 8.78 0 0 0 2.68-6.62z" fill="#4285F4" />
            <path d="M9 18a8.6 8.6 0 0 0 5.96-2.18l-2.92-2.26a5.43 5.43 0 0 1-8.08-2.85H.98v2.33A9 9 0 0 0 9 18z" fill="#34A853" />
            <path d="M2.96 10.71A5.41 5.41 0 0 1 2.68 9c0-.6.1-1.17.28-1.71V4.96H.98A9.01 9.01 0 0 0 0 9c0 1.45.35 2.82.98 4.04l1.98-2.33z" fill="#FBBC05" />
            <path d="M9 3.58a4.86 4.86 0 0 1 3.44 1.35l2.58-2.58A8.64 8.64 0 0 0 9 0 9 9 0 0 0 .98 4.96l1.98 2.33A5.37 5.37 0 0 1 9 3.58z" fill="#EA4335" />
        </svg>
    );
}

function GitHubIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#1f2937">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
        </svg>
    );
}

const styles = {
    card: {
        width: "100%",
        maxWidth: "420px",
        background: "#ffffff",
        borderRadius: "20px",
        border: "1px solid #e5e7f0",
        boxShadow: "0 4px 6px -1px rgba(99,102,241,0.07), 0 2px 4px -2px rgba(0,0,0,0.04)",
        padding: "36px 40px 32px",
        position: "relative",
        animation: "fadeUp 0.4s ease both",
    },
    brand: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "28px",
    },
    logoMark: {
        width: "36px",
        height: "36px",
        background: "#6366f1",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        flexShrink: 0,
    },
    brandName: {
        fontSize: "18px",
        fontWeight: 600,
        color: "#111827",
        letterSpacing: "-0.02em",
    },
    heading: {
        marginBottom: "24px",
    },
    title: {
        fontSize: "22px",
        fontWeight: 600,
        color: "#111827",
        letterSpacing: "-0.03em",
        marginBottom: "6px",
    },
    subtitle: {
        fontSize: "14px",
        color: "#6b7280",
        lineHeight: 1.5,
    },
    tabs: {
        display: "flex",
        background: "#f3f4f6",
        borderRadius: "10px",
        padding: "3px",
        marginBottom: "24px",
    },
    tab: {
        flex: 1,
        padding: "8px 0",
        border: "none",
        background: "transparent",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: 500,
        color: "#6b7280",
        cursor: "pointer",
        transition: "all 0.18s ease",
        fontFamily: "'DM Sans', sans-serif",
    },
    tabActive: {
        background: "#ffffff",
        color: "#111827",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    },
    field: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },
    labelRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    label: {
        fontSize: "13px",
        fontWeight: 500,
        color: "#374151",
    },
    forgotLink: {
        fontSize: "13px",
        color: "#6366f1",
        textDecoration: "none",
        fontWeight: 500,
    },
    input: {
        width: "100%",
        height: "42px",
        padding: "0 14px",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        fontSize: "14px",
        color: "#111827",
        background: "#ffffff",
        fontFamily: "'DM Sans', sans-serif",
        transition: "border-color 0.15s, box-shadow 0.15s",
    },
    passwordWrap: {
        position: "relative",
    },
    eyeBtn: {
        position: "absolute",
        right: "12px",
        top: "50%",
        transform: "translateY(-50%)",
        background: "none",
        border: "none",
        color: "#9ca3af",
        cursor: "pointer",
        padding: "0",
        display: "flex",
        alignItems: "center",
    },
    spinner: {
        width: "18px",
        height: "18px",
        border: "2px solid rgba(255,255,255,0.4)",
        borderTopColor: "#ffffff",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
        display: "inline-block",
    },
    divider: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        margin: "24px 0 20px",
    },
    dividerLine: {
        flex: 1,
        height: "1px",
        background: "#e5e7eb",
    },
    dividerText: {
        fontSize: "12px",
        color: "#9ca3af",
        whiteSpace: "nowrap",
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
    },
    oauthRow: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "10px",
        marginBottom: "24px",
    },
    oauthBtn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        height: "42px",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        background: "#ffffff",
        cursor: "pointer",
        transition: "background 0.15s, border-color 0.15s",
        fontFamily: "'DM Sans', sans-serif",
    },
    switchText: {
        textAlign: "center",
        fontSize: "13px",
        color: "#6b7280",
    },
    switchLink: {
        background: "none",
        border: "none",
        color: "#6366f1",
        fontWeight: 600,
        cursor: "pointer",
        fontSize: "13px",
        padding: 0,
        fontFamily: "'DM Sans', sans-serif",
    },
};