import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { SearchIcon, BellIcon } from '@heroicons/react/solid'
function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="https://rb.gy/ulxxee"
          alt="netflix"
          width={120}
          height={120}
          className="object-contain cursor-pointer"
        />
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My Lists</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <BellIcon className="cursor-pointer h-8 w-8 hover:opacity-70 transition" />

        <p className="hidden lg:inline ">Kids</p>

        <Link href="">
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
        <SearchIcon className="hidden md:inline cursor-pointer h-8 w-8 hover:opacity-70 transition" />
      </div>
    </header>
  )
}

export default Header
