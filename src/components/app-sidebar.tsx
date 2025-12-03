"use client"

import * as React from "react"
import {
  IconBrandGoogleDrive,
  IconBrandGoogleMaps,
  IconBrandGoogleOne,
  IconBrandGooglePhotos,
  IconBrandYoutube,
  IconCalendar,
  IconFileDescription,
  IconFileSpreadsheet,
  IconLanguage,
  IconMail,
  IconPresentation,
  IconReport,
  IconVideo,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Layout, SparkleIcon } from "lucide-react"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
  // 🔥 Most-used Google apps
  {
    title: "Gmail",
    url: "https://mail.google.com",
    icon: IconMail,
  },
  {
    title: "YouTube",
    url: "https://www.youtube.com",
    icon: IconBrandYoutube,
  },
  {
    title: "Drive",
    url: "https://drive.google.com",
    icon: IconBrandGoogleDrive,
  },
  {
    title: "Photos",
    url: "https://photos.google.com",
    icon: IconBrandGooglePhotos,
  },
  {
    title: "Maps",
    url: "https://maps.google.com",
    icon: IconBrandGoogleMaps,
  },
  {
    title: "Calendar",
    url: "https://calendar.google.com",
    icon: IconCalendar,
  },

  // 🧑‍💻 Productivity apps
  {
    title: "Docs",
    url: "https://docs.google.com/document",
    icon: IconFileDescription,
  },
  {
    title: "Sheets",
    url: "https://docs.google.com/spreadsheets",
    icon: IconFileSpreadsheet,
  },
  {
    title: "Slides",
    url: "https://docs.google.com/presentation",
    icon: IconPresentation, // lucide
  },
  {
    title: "Meet",
    url: "https://meet.google.com",
    icon: IconVideo, // lucide
  },

  // 🔍 Utility & AI
  {
    title: "Gemini",
    url: "https://gemini.google.com",
    icon: SparkleIcon, // lucide
  },
  {
    title: "Translate",
    url: "https://translate.google.com",
    icon: IconLanguage,
  },

  // 📢 Media & Services
  {
    title: "News",
    url: "https://news.google.com",
    icon: IconReport,
  },
  {
    title: "Google One",
    url: "https://one.google.com",
    icon: IconBrandGoogleOne,
  },
]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Layout className="!size-5" />
                <span className="text-base font-semibold">DWUI</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
    </Sidebar>
  )
}
