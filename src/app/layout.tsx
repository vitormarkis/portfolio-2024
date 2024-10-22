import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header/header'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
})

export const metadata: Metadata = {
  title: 'wendeson - dev ',
  description:
    'Olá, meu nome é Wendeson Gomes, tenho 23 anos, atualmente faço engenharia de software, fiz esse site para compartilhar minhas ideias, o que estou estudando e alguns projetos meus, decidir fazer esse blog também como forma de estudo para o inglês, sei que o inglês é muito importante e por isso decidir fazer algumas postagens em inglês, isso é um pouco difícil para mim, mas com dedicação sei que consigo',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${roboto.className} flex justify-center items-center my-20 antialiased`}
      >
        <div className="w-full max-w-[700px] md:px-0 px-10 space-y-4">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
