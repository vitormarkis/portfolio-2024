import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { HeaderMenu } from './headerMenu'
import { HeaderTitle } from './headerTitle'
import { hygraph } from '@/lib/hygraph'

export async function Header() {
  const { abouts } = await hygraph()
  return (
    <div className="flex flex-col gap-2 mb-10">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={abouts[0].image.url} />
          <AvatarFallback>WG</AvatarFallback>
        </Avatar>
        <HeaderTitle abouts={abouts} />
      </div>
      <HeaderMenu />
    </div>
  )
}
