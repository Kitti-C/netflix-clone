import Head from 'next/head'
import React, { useState } from 'react'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'

interface Inputs {
  email: string
  password: string
}

function Login() {
  const [login, setLogin] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      //await singIn(email, password)
    } else {
      //await singUp(email, password)
    }
  }

  return (
    <div className="relative flex flex-col h-screen w-screen bg-black md:justify-center md:items-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <img
        src="https://rb.gy/ulxxee"
        alt="netflix"
        width={150}
        height={150}
        className="absolute left-4 top-4 md:left-10 md:top-6 cursor-pointer object-contain"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sing In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              {...register('email', { required: true })}
              name="email"
              type="email"
              placeholder="Email"
              className="inputSingIn"
            />
          </label>
          <label className="inline-block w-full">
            <input
              {...register('password', { required: true })}
              name="password"
              type="password"
              placeholder="Password"
              className="inputSingIn"
            />
          </label>
          <div className="pl-1 text-orange-500">
            {errors.email && <span>This email is required</span>}
            {!errors.email && errors.password && (
              <span>This password is required</span>
            )}
          </div>
        </div>

        <button
          onClick={() => setLogin(true)}
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
        >
          Sing In
        </button>
        <div className="text-[gray]">
          New to Netflix? {''}
          <button type="submit" className="text-white hover:underline">
            Sing up now
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
