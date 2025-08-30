"use client";

import { ReactTerminal } from "react-terminal";
import { TerminalContextProvider } from "react-terminal";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

type Directory = "home" | "blog";

export default function Terminal() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // detect if dark mode is active from body
        const observer = new MutationObserver(() => {
            setIsDark(document.body.classList.contains("dark"));
        });

        observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    const commands = {
        whoami: "arian",
        ls: "home, blog",
        cd: (directory: Directory) => `changed path to ${directory}`,
    };

    return (
        <Box
            sx={{
                maxWidth: 600,
                boxShadow: 3,
            }}
        >
            <TerminalContextProvider>
                <ReactTerminal
                    commands={commands}
                    theme={isDark ? "light" : "dark"}
                />
            </TerminalContextProvider>
        </Box>
    );
}
