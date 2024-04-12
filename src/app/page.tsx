import { marked } from 'marked'
import { cookies } from 'next/headers'
import { Suspense } from 'react'
import { PortfolioProps, hygraph } from '../lib/hygraph'

export default async function Home() {
  cookies() // so pra simular o "no-store" do fetch

  // as vezes você precisa iniciar a promise
  // bem antes de renderizar o resultado dela
  // para evitar waterfalls
  const abouts = hygraph()
  return (
    <Suspense
      fallback={Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="mt-2 h-16 w-full bg-zinc-300 animate-pulse" />
      ))}
    >
      <AboutMeMarkdown dataPromise={abouts} />
    </Suspense>
  )
}

async function AboutMeMarkdown({
  dataPromise,
}: {
  dataPromise: Promise<PortfolioProps>
}) {
  const { abouts } = await dataPromise
  const textFormartMarkdown = marked.parse(abouts[0].information)

  return (
    <div
      className="sm:text-base text-sm prose prose-a:text-violet-600 prose-img:rounded-md min-w-full"
      dangerouslySetInnerHTML={{ __html: textFormartMarkdown }}
    ></div>
  )
}
