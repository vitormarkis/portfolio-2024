import { ComponentNotFound } from '@/components/notFound'
import { Posts } from '@/components/posts'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { hygraph } from '@/lib/hygraph'
import { readingTime } from '@/lib/readingTime'
import { format } from 'date-fns'
import Link from 'next/link'

export default async function Page({ params }: { params: { slug: string } }) {
  const { blogs } = await hygraph()
  const blog = blogs.find(
    ({ id }) => id === params.slug.split('-').slice(-1).toString(),
  )

  if (!blog) {
    return <ComponentNotFound url="/blog" />
  }

  const titles = blog.content.match(/##\s*(.*?)\n/g)
  const content = blog.content

  return (
    <div className="space-y-2 divide-y">
      <title>{blog.title}</title>
      <meta
        name="description"
        content={blog.content
          .replace(
            /\[.*?\]|\*\*.*?\*\*|\*.*?\*|\d\..*?\n|!\[.*?\]\(.*?\)|#+\s?.*?\n/g,
            '',
          )
          .replace(/-/g, '')
          .replace(/:/g, '')}
      />
      <div className="space-y-1">
        <h2 className="sm:text-3xl text-xl font-bold">{blog.title}</h2>
        <p className="text-xs font-medium text-black/40">
          {format(new Date(blog.createdAt), 'MMMM dd, yyyy')} -{' '}
          {readingTime(blog.content)} min read
        </p>
      </div>
      <div className="flex lg:flex-row flex-col">
        {titles && (
          <Carousel className="w-full min-w-full bg-white sticky top-0 lg:text-sm text-xs mt-2 lg:hidden block p-2">
            <CarouselContent className="max-w-[200px]">
              {titles.map((title, index) => (
                <CarouselItem
                  key={index}
                  className="hover:underline cursor-pointer pl-4 basis-auto"
                >
                  <Link
                    href={`#${title
                      .replace(/#/g, '')
                      .replace(' ', '')
                      .replace(/ /g, '-')
                      .toLowerCase()}`}
                    key={index}
                    className="hover:underline cursor-pointer basis-auto"
                  >
                    {title.replace(/#/g, ' ')}
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        <Posts content={content} />
      </div>
    </div>
  )
}
