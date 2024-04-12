import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { hygraph } from '@/lib/hygraph'
import { HeaderMenu } from './headerMenu'
import { HeaderTitle } from './headerTitle'

export function Header() {
  return (
    <div className="flex flex-col gap-2 mb-10">
      <div className="flex items-center gap-2">
        <HeaderAvatar />
        <HeaderTitle />
      </div>
      <HeaderMenu />
    </div>
  )
}

async function HeaderAvatar() {
  const { abouts } = await hygraph()
  return (
    <Avatar>
      <AvatarImage src={abouts[0].image.url} />
      <AvatarFallback>WG</AvatarFallback>
    </Avatar>
  )
}
