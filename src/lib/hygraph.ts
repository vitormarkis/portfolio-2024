import { portfolio } from '@/dummy-data'

const query = `
  query Portfolio {
    abouts {
      title
      id
      information
      description
      image {
        url
      }
    }
    
    blogs {
      title
      content
      createdAt
      id
      tags
    }
    
    projects {
      banner {
        url
      }
      title
      tags
      content
      website
      githubRepo
      id
      createdAt
    } 
  }
`

export interface PortfolioProps {
  abouts: {
    title: string
    id: string
    information: string
    description: string[]
    image: {
      url: string
    }
  }[]

  blogs: {
    title: string
    content: string
    createdAt: string
    id: string
    tags: string[]
  }[]

  projects: {
    banner: {
      url: string
    }
    title: string
    tags: string[]
    content: string
    website: string
    githubRepo: string
    id: string
    createdAt: string
  }[]
}

export const hygraph = async () => {
  try {
    const response = await new Promise<typeof portfolio>((res) => {
      setTimeout(() => {
        res(portfolio)
      }, 2000)
    })

    return response
  } catch (error) {
    console.error('Error ao buscar dados:', error)
    throw error
  }
}
