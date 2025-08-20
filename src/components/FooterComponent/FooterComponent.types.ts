/**
 * Footer Component Types for Aerophilia 2025
 */

export interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterComponentProps {
  className?: string;
}
