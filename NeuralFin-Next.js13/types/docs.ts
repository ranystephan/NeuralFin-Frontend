export interface SidebarNavItem {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  items?: SidebarNavItem[]
}

export interface MainNavItem {
  title: string
  href: string
  external?: boolean
}

export interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: {
    title: string
    items: SidebarNavItem[]
  }[]
}

export interface TableOfContentsItem {
  title: string
  url: string
  items?: TableOfContentsItem[]
}

export interface TableOfContentsType {
  items?: TableOfContentsItem[]
} 