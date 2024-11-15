import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {

  return (
    <div>
        <section className="bg-gray-50 overflow-y-hidden">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        Capture, Upload
        <strong className="font-extrabold text-red-700 sm:block"> and Save. </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
       You can easily capture and save sceneries, activities or places previously visited and make them be remebered by sharing them with friends and family.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to={"/register"}
          className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          
        >
          Get Started
        </Link>

        <a
          className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
          href="#"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Hero