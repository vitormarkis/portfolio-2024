import { PortfolioProps } from '@/lib/hygraph'

export const portfolio: PortfolioProps = {
  abouts: [
    {
      description: [],
      id: '',
      information: `
      # Um pouco sobre mim.
      Fiz esse site com o intuito de postar coisas que estou estudando e postar meus projetos para mostrar minhas habilidades.
      
      ## Quem sou eu?
      Olá, meu nome é wendeson gomes, tenho 23 anos, sou de Jaboatão Dos Guararapes–PE, atualmente faço engenharia de software na Estacio, comecei a programar com apenas 10 anos com o famoso jogo Minecraft, por curiosidade comecei a mexer com java, mas nunca fui muito a fundo na linguagem, mas já sabia que queria fazer programação, quando cheguei no ensino médio comecei a pesquisar sobre desenvolvimento web mais nunca parei para estudar de fato, quando comecei a faculdade aí sim comecei a estudar desenvolvimento web, e sempre gostei do fato de criar algo que as pessoas pudessem usar e ser útil, comecei com front-end, mas gosto do back-end também, sei que cada um tem suas importâncias e dificuldades.
      `.trim(),
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
