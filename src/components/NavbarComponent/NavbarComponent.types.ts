/**
 * Navbar Component Types for Aerophilia 2025
 */

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface NavbarComponentProps {
  className?: string;
}
