import Link from 'next/link'

import { LoadingBlogs } from '@/components/loading/loadingBlogs'
import { format } from 'date-fns'
import { cookies } from 'next/headers'
import { Suspense } from 'react'
import { hygraph } from '../../lib/hygraph'
import { readingTime } from '../../lib/readingTime'

export default async function Blog() {
  return (
    <Suspense fallback={<LoadingBlogs />}>
      <BlogList />
    </Suspense>
  )
}

async function BlogList() {
  cookies() // so pra simular o "no-store" do fetch
  const { blogs } = await hygraph()

  if (blogs.length === 0) {
    return (
      <div className="w-full flex flex-col-reverse gap-4">
        <div className="w-full space-y-1">
          <p className="text-lg font-bold">Nenhum post encontrado.</p>
        </div>
      </div>
    )
  }

  return (
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
  )
}
