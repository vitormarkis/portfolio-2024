import axios from 'axios'

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
      description
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
    description: string
  }[]
}

export const hygraph = async () => {
  const response = await axios.post(
    process.env.HYGRAPH_URL!,
    JSON.stringify({ query }),
    {
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
      },
    },
  )
  const { data } = await response.data
  return data as portfolioProps
}
