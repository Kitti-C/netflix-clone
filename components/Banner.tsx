import { Movie } from '@/types/movie'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { tmdbBaseUrl } from '@/constants/movie.const'
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/outline'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '@/atoms/modalAtom'

interface Props {
  netflixOriginals: Movie[]
}
function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    )
  }, [])

  return (
    <div className="flex flex-col  py-16 space-y-2 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12 ">
      <div className="absolute top-0 left-0 -z-10 w-full h-[95vh]">
        <Image
          src={`${tmdbBaseUrl}/original${
            movie?.backdrop_path || movie?.poster_path
          }`}
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h1 className="font-bold text-2xl md:text-4xl lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs md:max-w-lg md-text-lg lg:max-w-2xl lg:text-2xl text-shadow-sm">
        {movie?.overview}
      </p>

      <div className="flex space-x-3 ">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" /> Play
        </button>
        <button
          onClick={() => {
            setCurrentMovie(movie), setShowModal(true)
          }}
          className="bannerButton bg-[gray]/70"
        >
          More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  )
}

export default Banner
