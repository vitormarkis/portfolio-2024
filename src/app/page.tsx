import { marked } from 'marked'
import { hygraph } from '../lib/hygraph'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default async function Home() {
  const { abouts } = await hygraph()
  const textFormartMarkdown = marked.parse(abouts[0].information)

  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex gap-2 flex-col">
          <Skeleton className="w-full h-40" />
          <Skeleton className="w-full h-80" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-20" />
          <Skeleton className="w-full h-20" />
        </div>
      }
    >
      <div
        className="sm:text-base text-sm prose prose-a:text-violet-600 prose-img:rounded-md min-w-full"
        dangerouslySetInnerHTML={{ __html: textFormartMarkdown }}
      ></div>
    </Suspense>
  )
}
