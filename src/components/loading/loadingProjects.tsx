import { Skeleton } from '../ui/skeleton'

export function LoadingProjects() {
  return (
    <div className="w-full grid md:grid-cols-2 grid-cols-1 grid-flow-row gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="space-y-1">
          <Skeleton className="w-full h-48" />
          <Skeleton className="w-40 h-6" />
          <div className="flex gap-1">
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
          </div>
          <Skeleton className="w-full h-28" />
          <Skeleton className="w-32 h-3" />
          <div className="flex gap-1">
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
          </div>
        </div>
      ))}
    </div>
  )
}
