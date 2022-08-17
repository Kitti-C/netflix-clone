import { modalState } from '@/atoms/modalAtom'
import Banner from '@/components/Banner'
import Header from '@/components/Header'
import Modal from '@/components/Modal'
import Movies from '@/components/Movies'
import useAuth from '@/hooks/useAuth'
import { Movie } from '@/types/movie'
import { tmdbReqs } from '@/utils/requests'
import Head from 'next/head'
import React, { useState } from 'react'
import { OneEightyRing } from 'react-svg-spinners'
import { useRecoilState } from 'recoil'

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
}
const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}: Props) => {
  const { loading } = useAuth()
  const [showModal, setShowModal] = useRecoilState(modalState)
  const loadingUI = () => {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <header>
          <title>Loading...</title>
        </header>

        <main className="flex text-white bg-gradient-to-t from-gray-700 via-gray-900 to-black space-x-2 w-screen h-screen justify-center items-center   ">
          <span>
            <OneEightyRing color="white" />
          </span>
          <h1 className="font-medium">Loading...</h1>
        </main>
      </div>
    )
  }

  return loading ? (
    loadingUI()
  ) : (
    <div className="relative h-full bg-gradient-to-b from-gray-900/10 to-[#010511] ">
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="relative  px-4 pb-24 lg:space-y-24 lg:px-16">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24 ">
          <Movies title="Trending Now" movies={trendingNow} />
          <Movies title="Top Rated" movies={topRated} />
          <Movies title="Action Movies" movies={actionMovies} />
          <Movies title="Comedy Movies" movies={comedyMovies} />
          <Movies title="Horror Movies" movies={horrorMovies} />
          <Movies title="Romance Movies" movies={romanceMovies} />
          <Movies title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(tmdbReqs.fetchNetflixOriginals).then((res) => res.json()),
    fetch(tmdbReqs.fetchTrending).then((res) => res.json()),
    fetch(tmdbReqs.fetchTopRated).then((res) => res.json()),
    fetch(tmdbReqs.fetchActionMovies).then((res) => res.json()),
    fetch(tmdbReqs.fetchComedyMovies).then((res) => res.json()),
    fetch(tmdbReqs.fetchHorrorMovies).then((res) => res.json()),
    fetch(tmdbReqs.fetchRomanceMovies).then((res) => res.json()),
    fetch(tmdbReqs.fetchDocumentaries).then((res) => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  }
}
