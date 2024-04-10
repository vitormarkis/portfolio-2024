import Link from 'next/link'

import { format } from 'date-fns'
import { hygraph } from '../../lib/hygraph'
import { readingTime } from '../../lib/readingTime'
import { revalidateTag } from 'next/cache'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default async function Blog() {
  const { blogs } = await hygraph()

  revalidateTag('portfolio')

  if (blogs.length > 0) {
    return (
      <Suspense
        fallback={
          <div className="w-full flex flex-col-reverse gap-4">
            <Skeleton className="w-full h-40" />
            <Skeleton className="w-full h-40" />
            <Skeleton className="w-full h-40" />
            <Skeleton className="w-full h-40" />
            <Skeleton className="w-full h-40" />
            <Skeleton className="w-full h-40" />
          </div>
        }
      >
        <div className="w-full flex flex-col-reverse gap-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="w-full space-y-1">
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
              <div className="space-x-2">
                {blog.tags.map((tag) => (
                  <p
                    key={tag}
                    className="text-xs inline-block px-2 py-1 rounded-full bg-muted"
                  >
                    {tag}
                  </p>
                ))}
              </div>
              <p className="text-xs font-medium text-black/40">
                {format(new Date(blog.createdAt), 'MMMM dd, yyyy')} -{' '}
                {readingTime(blog.content)} min read
              </p>
            </div>
          ))}
        </div>
      </Suspense>
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
