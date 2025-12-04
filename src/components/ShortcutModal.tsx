// src/components/ShortcutModal.tsx
"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Props = {
    open: boolean;
    onClose: () => void;
    onAdd: (item: ShortcutItem) => void;
};

export type ShortcutItem = {
    id: string;
    title: string;
    url: string;
    icon: string; // favicon URL
};

import { HOST_ICONS } from "@/lib/icons";




export default function ShortcutModal({ open, onClose, onAdd }: Props) {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    if (!open) return null;

    // Extract favicon automatically
    const getFavicon = (link: string) => {
        try {
            const urlObj = new URL(link);
            const host = urlObj.hostname;

            // 1) Check if we have a known icon
            if (HOST_ICONS[host]) return HOST_ICONS[host];

            // 2) Try Google Favicon API (works 90% cases)
            return `https://www.google.com/s2/favicons?sz=64&domain=${urlObj}`;
        } catch {
            return "/default-icon.png";
        }
    };

    const normalizeUrl = (url: string) => {
        if (!/^https?:\/\//i.test(url)) {
            return `https://${url}`;
        }
        return url;
    };

    const submit = () => {
        if (!title.trim() || !url.trim()) return;

        const finalURL = normalizeUrl(url);
        const shortcut: ShortcutItem = {
            id: crypto.randomUUID(),
            title,
            url: finalURL,
            icon: getFavicon(finalURL),
        };

        onAdd(shortcut);
        onClose();
        setTitle("");
        setUrl("");
    };


    return (
        <div
            className="
    fixed inset-0 
    bg-black/60 
    backdrop-blur-xl 
    flex items-center justify-center 
    z-50
    transition-all duration-200
  "
        >

            <div
                className="
    w-full max-w-sm p-6
    rounded-2xl
    bg-white/20 
    backdrop-blur-2xl 
    border border-white/30 
    shadow-[0_8px_32px_rgba(0,0,0,0.3)]
    text-white
  "
            >

                <h2 className="text-xl font-semibold mb-4">Add Shortcut</h2>

                <div className="flex flex-col gap-4">
                    <Input
                        className="bg-white/20 text-white placeholder:text-gray-300"
                        placeholder="Title (e.g. YouTube)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <Input
                        className="bg-white/20 text-white placeholder:text-gray-300"
                        placeholder="URL (https://...)"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />

                    <div className="flex justify-end gap-2 mt-2">
                        <Button
                            onClick={onClose}
                            className="bg-white/10 hover:bg-white/20 text-white rounded-full px-4"
                        >
                            Cancel
                        </Button>

                        <Button
                            onClick={submit}
                            className="bg-white/20 hover:bg-white/30 text-white rounded-full px-4"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
