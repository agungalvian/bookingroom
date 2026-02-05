"use client";

import { useEffect } from "react";

export default function DevToolsBlocker() {
    useEffect(() => {
        // Disable right-click
        const handleContextMenu = (e) => {
            e.preventDefault();
        };

        // Disable keyboard shortcuts
        const handleKeyDown = (e) => {
            // F12
            if (e.key === "F12") {
                e.preventDefault();
            }

            // Ctrl+Shift+I (Inspector)
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "I") {
                e.preventDefault();
            }

            // Ctrl+Shift+J (Console)
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "J") {
                e.preventDefault();
            }

            // Ctrl+Shift+C (Element Selector)
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "C") {
                e.preventDefault();
            }

            // Ctrl+U (View Source)
            if ((e.ctrlKey || e.metaKey) && e.key === "u") {
                e.preventDefault();
            }
        };

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return null; // This component doesn't render anything
}
