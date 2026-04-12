import { useEffect, useState } from "react";

export default function AutoInstall() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        console.clear()
        const handler = (e) => {
            console.log(e)
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    useEffect(() => {
        const triggerInstall = async () => {
            if (!deferredPrompt) return;

            deferredPrompt.prompt();
            await deferredPrompt.userChoice;
            setDeferredPrompt(null);
        };

        const onFirstInteraction = () => {
            triggerInstall();
            window.removeEventListener("click", onFirstInteraction);
        };

        window.addEventListener("click", onFirstInteraction);

        return () => window.removeEventListener("click", onFirstInteraction);
    }, [deferredPrompt]);

    return null;
}