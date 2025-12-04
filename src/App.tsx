import React from "react";

import { AppSidebar } from "./components/app-sidebar";
import { SiteHeader } from "./components/site-header";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import DigitalClock from "./components/DigitalClock";
import SearchBar from "./components/SearchBar";
import Aurora from "./components/Aurora";
import ShortcutsGrid from "./components/ShortcutsGrid";
import { Toaster } from "./components/Toaster";

function App() {
  return (
    <>
      {/* Aurora background with overflow clipped */}
      <div style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",       // prevents Aurora from creating scrollbars
        zIndex: -1                // keeps it behind everything
      }}>
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1}
          speed={0.35}
        />
      </div>
      <SidebarProvider
        className="glassmorphic"
        style={{
          // Same CSS variables as Next.js version
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties}
      >
        {/* Sidebar */}
        <AppSidebar className="glassmorphic" variant="floating" />

        {/* Main Content */}
        <SidebarInset className="glassmorphic">
          <SiteHeader />

          {/* Clock */}
          <div className="px-6 mt-6 flex justify-center">
            <DigitalClock timezone="Asia/Kolkata" hour12={true} />
          </div>

          {/* Search Bar */}
          <div className="px-6 mt-4 flex justify-center">
            <SearchBar />
          </div>

          {/* Shortcuts Grid */}
          <div className="px-6 mt-10 flex justify-center">
            <ShortcutsGrid />
          </div>

        </SidebarInset>
      </SidebarProvider>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
