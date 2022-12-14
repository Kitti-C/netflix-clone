import { Movie } from '@/types/movie'
import React, { useRef, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import Thumbnail from './Thumbnail'

interface Props {
  title: string
  // movie: Movie | DocumentData[]
  movies: Movie[]
}
function Movies({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState<boolean>(false)

  const handleClick = (direction: string) => {
    setIsMoved(true)

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth

      rowRef.current.scroll({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <div className="h-40  space-y-0.5 md:space-y-2 ">
      <h1 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h1>
      <div className="relative group md:-ml-2 ">
        <ChevronLeftIcon
          onClick={() => handleClick('left')}
          className={`absolute top-0 bottom-0 left-2  z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100`}
        />
        <div
          ref={rowRef}
          className="flex h-32 md:h-40  items-center space-x-1 overflow-x-scroll scrollbar-hide md:space-x-2 md:p-2"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <ChevronRightIcon
          onClick={() => handleClick('right')}
          className={`absolute top-0 bottom-0 right-2  z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100`}
        />
      </div>
    </div>
  )
}

export default Movies
