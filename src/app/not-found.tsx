import { MoveLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col gap-2">
      <div className="flex justify-center items-center">
        <p className="text-7xl">4</p>
        <span className="size-14 rounded-full bg-black" />
        <p className="text-7xl">4</p>
      </div>
      <div className="flex gap-2 justify-center items-center">
        <MoveLeft />
        <Link href="/" className="font-bold underline">
          Go Back
        </Link>
      </div>
    </div>
  )
}
