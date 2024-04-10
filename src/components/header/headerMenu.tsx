'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function HeaderMenu() {
  const path = usePathname()
  return (
    <div className="space-x-4 divide-x">
      <Link
        href="/"
        className={`${path === '/' ? 'text-black' : 'text-black/20'} font-semibold hover:underline`}
      >
        About
      </Link>
      <Link
        href="/blog"
        className={`${path.includes('/blog') ? 'text-black' : 'text-black/20'} pl-4 font-semibold hover:underline hover:text-black`}
      >
        Blog
      </Link>
      <Link
        href="/projects"
        className={`${path.includes('/projects') ? 'text-black' : 'text-black/20'} pl-4 font-semibold hover:underline hover:text-black`}
      >
        Projects
      </Link>
    </div>
  )
}
