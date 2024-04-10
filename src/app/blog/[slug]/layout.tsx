import { Skeleton } from '@/components/ui/skeleton'
import { hygraph } from '@/lib/hygraph'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function BlogLayout({
  params,
  children,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const { blogs } = await hygraph()
  const blog = blogs.find(
    ({ id }) => id === params.slug.split('-').slice(-1).toString(),
  )

  const titles = blog?.content.match(/##\s*(.*?)\n/g)

  return (
    <Suspense
      fallback={
        <div className="w-full h-ful flex gap-2">
          <div className="space-y-2 w-full lg:min-w-[650px]">
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-24 h-5" />
            <Skeleton className="w-full h-3 lg:hidden block" />
            <Skeleton className="w-full h-[700px]" />
          </div>

          <Skeleton className="min-w-44 h-60 lg:block hidden " />
        </div>
      }
    >
      <div className="lg:flex justify-end flex-row-reverse lg:min-w-[850px]">
        {titles && (
          <div className="relative border-l h-auto pl-4 lg:block hidden">
            <nav className="sticky top-4 space-y-2">
              <h2 className="font-bold">Tópicos:</h2>
              {titles?.map((title, index) => (
                <Link
                  href={`#${title
                    .replace(/#/g, '')
                    .replace(' ', '')
                    .replace(/ /g, '-')
                    .toLowerCase()}`}
                  key={index}
                  className="hover:underline cursor-pointer text-sm w-auto inline-block"
                >
                  {title.replace(/#/g, '')}
                </Link>
              ))}
            </nav>
          </div>
        )}
        {children}
      </div>
    </Suspense>
  )
}
