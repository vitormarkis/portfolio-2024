import { hygraph } from '@/lib/hygraph'
import Link from 'next/link'

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
  )
}
