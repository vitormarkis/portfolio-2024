import { marked } from 'marked'
import { hygraph } from '../lib/hygraph'

export default async function Home() {
  const { abouts } = await hygraph()
  const textFormartMarkdown = marked.parse(abouts[0].information)

  return (
    <div
      id="content"
      className="sm:text-base text-sm prose prose-a:text-violet-600 prose-img:rounded-md"
      dangerouslySetInnerHTML={{ __html: textFormartMarkdown }}
    ></div>
  )
}
