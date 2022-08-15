import { Movie } from '@/types/movie'
import React from 'react'
import Image from 'next/image'

interface Props {
  // movie: Movie | DocumentData[]
  movie: Movie
}

function Thumbnail({ movie }: Props) {
  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] hover:scale-105">
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        layout="fill"
        className="rounded-sm object-cover "
        alt={movie.name}
      />
    </div>
  )
}

export default Thumbnail
