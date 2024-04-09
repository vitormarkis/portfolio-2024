'use client'

import { marked } from 'marked'
import { usePathname } from 'next/navigation'

export function Posts({ content }: { content: string }) {
  const url = usePathname()

  return (
    <div
      className="sm:text-base text-sm prose prose-a:text-violet-600 prose-img:rounded-md pt-2 lg:min-w-[600px] lg:pr-3"
      dangerouslySetInnerHTML={{
        __html: marked.parse(
          content.replace(/##\s*(.*?)\n/g, (_, text) => {
            const id = text.replace(/\s/g, '-').toLowerCase()
            const linkUrl = process.env.NEXT_PUBLIC_URL + url + '#' + id
            return `## <span id="${id}" class="cursor-pointer group hover:text-purple-500" onclick="navigator.clipboard.writeText('${linkUrl}')">${text} <img src="/link.svg" class=" m-0 size-4 group-hover:inline-block hidden" alt="Ícone do Lucid"/></span>\n`
          }),
        ),
      }}
    ></div>
  )
}
