import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { hygraph } from '@/lib/hygraph'
import { readingTime } from '@/lib/readingTime'
import { format } from 'date-fns'
import { MoveLeft } from 'lucide-react'
import { marked } from 'marked'
import Link from 'next/link'

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
        <meta name="description" content={blog.description} />
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
          <div
            className="sm:text-base text-sm prose prose-a:text-violet-600 prose-img:rounded-md pt-2 lg:min-w-[600px] lg:pr-3"
            dangerouslySetInnerHTML={{
              __html: marked.parse(
                content.replace(/##\s*(.*?)\n/g, (match, p1) => {
                  const id = p1.replace(/\s/g, '-').toLowerCase()
                  return `## <span id="${id}">${p1}</span>\n`
                }),
              ),
            }}
          ></div>
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
