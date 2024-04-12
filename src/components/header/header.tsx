import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { hygraph } from '@/lib/hygraph'
import { cookies } from 'next/headers'
import { Suspense } from 'react'
import { HeaderMenu } from './headerMenu'
import { HeaderTitle } from './headerTitle'

export const dynamic = 'force-dynamic'

export function Header() {
  return (
    <div className="flex flex-col gap-2 mb-10">
      <div className="flex items-center gap-2">
        <Suspense
          fallback={
            <span className="h-10 w-10 shrink-0 rounded-full bg-zinc-500 animate-pulse" />
          }
        >
          <HeaderAvatar />
        </Suspense>
        <Suspense
          fallback={
            <strong className="text-lg font-bold">Carregando...</strong>
          }
        >
          <HeaderTitle />
        </Suspense>
      </div>
      <HeaderMenu />
    </div>
  )
}

async function HeaderAvatar() {
  cookies()
  const { abouts } = await hygraph()
  return (
    <Avatar>
      <AvatarImage src={abouts[0].image.url} />
      <AvatarFallback>WG</AvatarFallback>
    </Avatar>
  )
}
