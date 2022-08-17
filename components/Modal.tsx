import { modalState, movieState } from '@/atoms/modalAtom'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  XIcon,
} from '@heroicons/react/outline'
import { Genre, Movie, Element } from '@/types/movie'
import ReactPlayer from 'react-player'
import { FaPlay, FaStop } from 'react-icons/fa'
function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const movie = useRecoilValue(movieState)
  const [trailer, setTrailer] = useState('')
  const [genres, setGenres] = useState<Genre[]>([])
  const [muted, setMuted] = useState<boolean>(false)
  const [playing, setPlaying] = useState<boolean>(false)

  useEffect(() => {
    if (!movie) return

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_TMDB_API_KEY
        }&language=en-US&append_to_response=videos`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((response) => response.json())
        .catch((error) => console.log(error))

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        )

        setTrailer(data.videos?.results[index]?.key)
      }
      if (data?.genres) {
        setGenres(data.genres)
      }
    }

    fetchMovie()
  }, [movie])

  const handleClose = () => {
    setShowModal(false)
  }
  return (
    <div
      className="absolute top-0 left-0 w-full h-full z-50 bg-black/70"
      //   onClick={handleClose}
    >
      <>
        <div className="fixed  top-2 md:top-16 left-0 right-0   mx-auto w-full h-full max-w-[880px] overflow-hidden  rounded-md ">
          <button
            className="modal-btn absolute right-5 top-5 !z-40 border-none bg-[#181818]"
            onClick={handleClose}
          >
            <XIcon className="h-6 w-6" />
          </button>
          <div className="relative  w-full h-full ">
            <div className="relative flex h-96">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailer}`}
                width="100%"
                height="100%"
                style={{ position: 'relative', top: '0', left: '0' }}
                playing={playing}
                muted={muted}
              />
              <div className="absolute bottom-4  flex w-full items-center justify-between px-10">
                <div className="flex space-x-3">
                  <button className="modal-btn">
                    <PlusIcon className="h-7 w-7" />
                  </button>
                  <button className="modal-btn">
                    <ThumbUpIcon className="h-7 w-7" />
                  </button>
                </div>
                <button onClick={() => setMuted(!muted)} className="modal-btn">
                  {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                </button>
              </div>
            </div>

            <div className="flex px-10 py-8 space-x-16 rounded-b-md bg-[#181818]">
              <div className="space-y-6 text-sm md:text-lg">
                <div className="flex space-x-4 items-center text-sm">
                  <p className="font-semibold text-green-400">
                    {(movie?.vote_average * 10).toString().substring(0, 2)}%
                    Match
                  </p>
                  <p className="font-light">
                    {movie?.release_date || movie?.first_air_date}
                  </p>
                  <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                    HD
                  </div>
                </div>
                <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row ">
                  <p className="w-5/6">{movie?.overview}</p>
                  <div className="flex flex-col space-y-3 text-sm">
                    <div className="pt-1">
                      <span className="text-[gray] ">Genres : </span>
                      {genres.map((genre) => genre.name).join(', ')}
                    </div>
                    <div>
                      <span className="text-[gray]">Original language : </span>
                      {movie?.original_language}
                    </div>
                    <div>
                      <span className="text-[gray]">Total votes : </span>
                      {movie?.vote_count}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  )
}

export default Modal
