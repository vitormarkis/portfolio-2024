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

export interface portfolioProps {
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
    const response = await fetch(process.env.HYGRAPH_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({ query }),
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Error ao buscar a API')
    }

    const { data } = await response.json()
    return data as portfolioProps
  } catch (error) {
    console.error('Error ao buscar dados:', error)
    throw error
  }
}
