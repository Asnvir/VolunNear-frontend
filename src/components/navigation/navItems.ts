export interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Main Page',
    href: '/',
  },
  {
    label: 'About Us',
    href: '/about_us',
  },
  {
    label: 'How It Works?',
    href: '#',
  },
]
