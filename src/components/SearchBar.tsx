"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  function performSearch() {
    if (!query.trim()) return;

    const chromeApi = typeof window !== "undefined" ? (window as any).chrome : null;

    // If chrome extension APIs unavailable (Next.js dev mode)
    if (!chromeApi || !chromeApi.search || !chromeApi.tabs) {
      console.warn("Chrome search API not available — using fallback redirect.");
      // window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      return;
    }

    // Real extension behavior
    chromeApi.tabs.query({ active: true, currentWindow: true }, (tabs: any[]) => {
      if (tabs.length > 0) {
        chromeApi.search.query({
          text: query,
          tabId: tabs[0].id,
        });
      }
    });
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 px-4">
      <div className="
        flex items-center gap-2
        rounded-full 
        bg-white/10 
        backdrop-blur-xl 
        shadow-xl 
        border border-white/20
        p-2
      ">
        
        {/* Icon */}
        <div className="pl-3 text-gray-200">
          <Search className="h-5 w-5" />
        </div>

        {/* Input */}
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && performSearch()}
          placeholder="Search the web..."
          className="
            flex-1 bg-transparent border-0 outline-none text-white
            placeholder:text-gray-300 
            focus-visible:ring-0 
            px-3
          "
        />

        {/* Search Button */}
        <Button
          onClick={performSearch}
          className="
            rounded-full 
            px-6 
            bg-white/20 
            text-white 
            hover:bg-white/30 
            backdrop-blur-xl
          "
        >
          Search
        </Button>
      </div>
    </div>
  );
}
