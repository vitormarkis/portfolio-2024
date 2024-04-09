'use client'

import { usePathname } from 'next/navigation'

interface HeaderTitleProps {
  abouts: {
    title: string
    description: string[]
  }[]
}

export function HeaderTitle({ abouts }: HeaderTitleProps) {
  const path = usePathname()
  const { title, description } = abouts[0]

  return (
    <>
      {path === '/' && (
        <div>
          <h1 className="text-xl font-bold">{title}</h1>

          <div className="flex divide-x gap-2 items-center">
            {description.map((item, index) => (
              <p
                key={index}
                className={`sm:text-sm text-xs ${index > 0 && 'pl-2'} `}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      )}
      {path.includes('/blog') && (
        <div>
          <h1 className="text-xl font-bold">Blog</h1>
          <p className="sm:text-sm text-xs">My ideas and what I study</p>
        </div>
      )}
      {path.includes('/projects') && (
        <div>
          <h1 className="text-xl font-bold">Projects</h1>
          <p className="sm:text-sm text-xs">Some projects</p>
        </div>
      )}
      {!path.includes('/blog') &&
        !path.includes('/projects') &&
        path !== '/' && (
          <div>
            <h1 className="text-xl font-bold">Oooopss</h1>
            <p className="sm:text-sm text-xs">page not found...</p>
          </div>
        )}
    </>
  )
}
