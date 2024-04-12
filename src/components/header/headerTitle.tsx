import { HeaderTitleView } from '@/components/header/headerTitleDynamic'
import { hygraph } from '@/lib/hygraph'
import { cookies } from 'next/headers'

export async function HeaderTitle() {
  cookies()
  const { abouts } = await hygraph()
  const { title, description } = abouts[0]

  return <HeaderTitleView description={description} title={title} />
}
