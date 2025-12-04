"use client";

import { useEffect, useState } from "react";
import ShortcutModal from "./ShortcutModal";
import type { ShortcutItem } from "./ShortcutModal"; // ✅ type-only import
import { Plus } from "lucide-react";
import { toast } from "sonner";


export default function ShortcutsGrid() {
    const [shortcuts, setShortcuts] = useState<ShortcutItem[]>([]);
    const [open, setOpen] = useState(false);

    // Load from chrome.storage.local
    useEffect(() => {
        // Handle local development where chrome API doesn't exist
        if (typeof chrome === "undefined" || !chrome.storage) {
            console.warn("chrome.storage not available");
            return;
        }

        chrome.storage.local.get(["shortcuts"], (res) => {
            if (Array.isArray(res.shortcuts)) {
                setShortcuts(res.shortcuts);
            }
        });
    }, []);

    const save = (items: ShortcutItem[]) => {
        setShortcuts(items);

        if (typeof chrome !== "undefined" && chrome.storage) {
            chrome.storage.local.set({ shortcuts: items });
        }
    };

    const addShortcut = (shortcut: ShortcutItem) => {
        if (shortcuts.length >= 14) {
            toast.error("Shortcut limit reached. Max 14 allowed.");
            return;
        }

        save([...shortcuts, shortcut]);
        toast.success("Shortcut added!");
    };



    return (
        <div className="px-6 mt-6 flex flex-col items-center w-full">

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">

                {shortcuts.map((s) => (
                    <div
                        key={s.id}
                        className="
    relative group
    flex flex-col items-center gap-2
    p-4 rounded-2xl 
    bg-white/10 border border-white/20
    backdrop-blur-xl 
    hover:bg-white/20 transition text-white
    w-24 h-24
  "
                    >
                        {/* Delete Button */}
                        <button
                            onClick={() => save(shortcuts.filter((x) => x.id !== s.id))}
                            className="
      absolute -top-2 -right-2
      w-6 h-6 flex items-center justify-center
      rounded-full bg-red-500/80 hover:bg-red-500
      text-white text-xs font-bold
      shadow-lg opacity-0 group-hover:opacity-100
      transition
    "
                        >
                            ×
                        </button>

                        {/* Link wrapper */}
                        <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-2"
                        >
                            <img
                                src={s.icon}
                                onError={(e) => (e.currentTarget.src = "/default-icon.png")}
                                className="w-8 h-8 rounded shadow-md bg-white/20 p-1 backdrop-blur"
                                alt=""
                            />

                            <span className="text-xs truncate w-full text-center">
                                {s.title}
                            </span>
                        </a>
                    </div>

                ))}

                {/* Add Button */}
                <button
                    onClick={() => shortcuts.length < 14 && setOpen(true)}
                    disabled={shortcuts.length >= 14}
                    className={`
    flex flex-col items-center justify-center gap-2
    p-4 rounded-2xl
    bg-white/10 border border-white/20
    backdrop-blur-xl text-white
    transition w-24 h-24
    ${shortcuts.length >= 14 ? "opacity-40 cursor-not-allowed" : "hover:bg-white/20"}
  `}
                >
                    <Plus className="h-6 w-6" />
                    <span className="text-xs">{shortcuts.length >= 14 ? "Limit" : "Add"}</span>
                </button>

            </div>

            {/* Modal */}
            <ShortcutModal
                open={open}
                onClose={() => setOpen(false)}
                onAdd={addShortcut}
            />
        </div>
    );
}
