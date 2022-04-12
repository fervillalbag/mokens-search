import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { IoEarthSharp, IoLanguageSharp } from 'react-icons/io5'

interface CountryIprops {
  country: any
}

const Country: React.FC<CountryIprops> = ({ country }) => {
  return (
    <div className="bg-white p-4 rounded-md cursor-pointer mb-4">
      <div className="grid grid-cols-[30px_1fr] gap-2 items-center">
        <span className="block text-3xl text-center">{country.emoji}</span>
        <span className="block uppercase font-bold text-slate-600">
          {country.name}
        </span>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="grid grid-cols-[30px_1fr] gap-1 items-center mt-2">
          <span className="block text-xl text-slate-700 text-center mx-auto">
            <FaMapMarkerAlt />
          </span>
          <span className="block uppercase font-bold text-slate-400 text-sm">
            {country.capital}
          </span>
        </div>

        <div className="grid grid-cols-[30px_1fr] gap-1 items-center mt-3 lg:ml-4">
          <span className="block text-xl text-slate-700 text-center mx-auto">
            <IoEarthSharp />
          </span>
          <span className="block uppercase font-bold text-slate-400 text-sm">
            {country.continent.name}
          </span>
        </div>

        <div className="grid grid-cols-[30px_1fr] gap-1 items-center mt-3 lg:ml-4">
          <span className="block text-xl text-slate-700 text-center mx-auto">
            <IoLanguageSharp />
          </span>
          <div className="flex">
            {country.languages.map((lang, index) => (
              <span
                key={index}
                className="block mr-1 uppercase font-bold text-slate-400 text-sm"
              >
                {lang.name}
                {country.languages.length - 1 === index ? '' : ','}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Country
