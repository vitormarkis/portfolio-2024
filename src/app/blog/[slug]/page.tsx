import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { hygraph } from '@/lib/hygraph'
import { readingTime } from '@/lib/readingTime'
import { format } from 'date-fns'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'
import { Posts } from './components/posts'

export default async function Page({ params }: { params: { slug: string } }) {
  const { blogs } = await hygraph()
  const blog = blogs.find(
    ({ id }) => id === params.slug.split('-').slice(-1).toString(),
  )

  if (blog) {
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
          <h2 className="text-3xl font-bold">{blog.title}</h2>
          <p className="text-xs font-medium text-black/40">
            {format(new Date(blog.createdAt), 'MMMM dd, yyyy')} -{' '}
            {readingTime(blog.content)} min read
          </p>
        </div>
        <div className="flex lg:flex-row flex-col">
          {titles && (
            <Carousel className="w-full bg-white sticky top-0 lg:text-sm text-xs mt-2 lg:hidden block p-2">
              <CarouselContent>
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

  return (
    <div className="flex justify-center items-center flex-col gap-2">
      <div className="flex justify-center items-center">
        <p className="text-7xl">4</p>
        <span className="size-14 rounded-full bg-black" />
        <p className="text-7xl">4</p>
      </div>
      <div className="flex gap-2 justify-center items-center">
        <MoveLeft />
        <Link href="/blog" className="font-bold underline">
          Go Back
        </Link>
      </div>
    </div>
  )
}
