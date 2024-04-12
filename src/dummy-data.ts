import { PortfolioProps } from '@/lib/hygraph'

export const portfolio: PortfolioProps = {
  abouts: [
    {
      description: [],
      id: '',
      information: '',
      title: '',
      image: {
        url: 'https://sa-east-1.graphassets.com/clukbfljm09bu07lw35opdd7j/clulb51ll0tgr07luwh8vcb70',
      },
    },
  ],
  blogs: [
    {
      title: 'Como fiz meu site e por que utilizei um design minimalista',
      content:
        'Aqui vou mostrar, como fiz meu site e o porque escolhi algumas bibliotecas, tentei ser o mais coeso possível, mostrei algumas parte de código de como usar umas bibliotecas mas se caso ficar alguma duvida pode entrar em contato comigo que ficarei feliz em tirar sua duvida, se caso tem uma critica construtiva pode me chamar para conversar que ficarei feliz em conversa com você. Meu',
      tags: ['Nextjs', 'Tailwindcss', 'Hygraph CMS'],
      id: '1',
      createdAt: new Date('April 10, 2024').toISOString(),
    },
  ],
  projects: [],
}
