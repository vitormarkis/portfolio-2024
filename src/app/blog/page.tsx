import Link from 'next/link'

import { format } from 'date-fns'
import { hygraph } from '../../lib/hygraph'
import { readingTime } from '../../lib/readingTime'
import { revalidateTag } from 'next/cache'

export default async function Blog() {
  const { blogs } = await hygraph()

  revalidateTag('portfolio')

  if (blogs.length > 0) {
    return (
      <div className="w-full flex flex-col-reverse gap-4">
        {blogs.map((blog, index) => (
          <div key={index} className="w-full space-y-1">
            <Link
              href={`/blog/${blog.title.replace(/ /g, '-') + '-' + blog.id}`}
              className="text-lg font-bold hover:underline"
            >
              {blog.title}
            </Link>
            <div
              className="text-sm text-black/60 line-clamp-4"
              dangerouslySetInnerHTML={{
                __html: blog.content
                  .replace(
                    /\[.*?\]|\*\*.*?\*\*|\*.*?\*|\d\..*?\n|!\[.*?\]\(.*?\)|#+\s?.*?\n/g,
                    '',
                  )
                  .replace(/-/g, '')
                  .replace(/:/g, ''),
              }}
            ></div>
            <p className="text-xs font-medium text-black/40">
              {format(new Date(blog.createdAt), 'MMMM dd, yyyy')} -{' '}
              {readingTime(blog.content)} min read
            </p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col-reverse gap-4">
      <div className="w-full space-y-1">
        <p className="text-lg font-bold">Nenhum blog encontrado</p>
      </div>
    </div>
  )
}
