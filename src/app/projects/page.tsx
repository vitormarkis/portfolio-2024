import { LoadingProjects } from '@/components/loading/loadingProjects'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { hygraph } from '@/lib/hygraph'
import { readingTime } from '@/lib/readingTime'
import { format } from 'date-fns'
import { Eye, Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function Projects() {
  // await em default async ❌❌❌
  const { projects } = await hygraph()

  if (projects.length) {
    return (
      <Suspense fallback={<LoadingProjects />}>
        <div className="w-full grid md:grid-cols-2 grid-cols-1 grid-flow-row gap-4">
          {projects.map((project) => (
            <div key={project.id} className="w-full h-auto space-y-2">
              <Link
                href={`/projects/${project.title.replace(/ /g, '-') + '-' + project.id}`}
                className="group"
              >
                <div className="w-full h-48 relative bg-muted rounded-md overflow-hidden">
                  <Image
                    src={project.banner.url}
                    alt=""
                    fill
                    quality={100}
                    className="object-contain mt-4 rounded-full"
                  />
                </div>
                <h2 className="text-lg font-bold group-hover:underline">
                  {project.title}
                </h2>
              </Link>
              <div className="space-x-2">
                <Carousel className="w-full text-sm">
                  <CarouselContent className="space-x-3">
                    {project.tags.map((tag, index) => (
                      <CarouselItem
                        key={index}
                        className="basis-auto cursor-default bg-muted px-2 py-1 ml-5 rounded-full"
                      >
                        <p>{tag}</p>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
              <p className="text-sm text-black/60 line-clamp-4">
                {project.content}
              </p>
              <p className="text-xs font-medium text-black/40">
                {format(new Date(project.createdAt), 'MMMM dd, yyyy')} -{' '}
                {readingTime(project.content)} min read
              </p>
              <div className="w-full space-x-4">
                <Button
                  variant="link"
                  className="text-neutral-400 hover:text-neutral-700"
                >
                  <Link
                    href={project.website}
                    target="_blank"
                    className="flex justify-center items-center text-sm"
                  >
                    <Eye className="size-4 mr-2" />
                    Preview
                  </Link>
                </Button>
                {project.githubRepo && (
                  <Button
                    variant="link"
                    className="text-neutral-400 hover:text-neutral-700"
                  >
                    <Link
                      href={project.githubRepo}
                      target="_blank"
                      className="flex justify-center items-center text-sm"
                    >
                      <Github className="size-4 mr-2" />
                      Github repo
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Suspense>
    )
  }

  return (
    <div className="w-full flex flex-col-reverse gap-4">
      <div className="w-full space-y-1">
        <p className="text-lg font-bold">Nenhum projeto encontrado.</p>
      </div>
    </div>
  )
}
