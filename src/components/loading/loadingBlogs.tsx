import { Skeleton } from '../ui/skeleton'

export function LoadingBlogs() {
  return (
    <div className="w-full space-y-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="w-full flex flex-col-reverse gap-4">
          <div className="space-y-1">
            <Skeleton className="w-full h-14" />
            <Skeleton className="w-full h-40" />
            <div className="flex gap-1">
              <Skeleton className="w-20 h-5" />
              <Skeleton className="w-20 h-5" />
              <Skeleton className="w-20 h-5" />
              <Skeleton className="w-20 h-5" />
            </div>
            <Skeleton className="w-32 h-5" />
          </div>
        </div>
      ))}
    </div>
  )
}
