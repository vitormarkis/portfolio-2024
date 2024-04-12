import Link from 'next/link'

export async function Topics({ titles }: { titles: string[] }) {
  return (
    <>
      {titles && (
        <div className="relative border-l h-auto pl-4 lg:block hidden">
          <nav className="sticky top-4 space-y-2">
            <h2 className="font-bold">Tópicos:</h2>
            {titles?.map((title, index) => (
              <Link
                href={`#${title
                  .replace(/#/g, '')
                  .replace(' ', '')
                  .replace(/ /g, '-')
                  .toLowerCase()}`}
                key={index}
                className="hover:underline cursor-pointer text-sm w-auto inline-block"
              >
                {title.replace(/#/g, '')}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
