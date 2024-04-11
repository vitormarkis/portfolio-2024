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
  }
`

export interface portfolioProps {
  abouts: {
    title: string
    id: string
    information: string
    description: string[]
  }[]

  blogs: {
    title: string
    content: string
    createdAt: string
    id: string
    tags: string[]
  }[]
}

export const hygraph = async () => {
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

  const { data } = await response.json()
  return data as portfolioProps
}
