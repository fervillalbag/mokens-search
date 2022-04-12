import React, { useRef, useState } from 'react'
import { GetStaticProps } from 'next'

import Country from '../components/Country'
import client from '../config/apollo'
import { GET_ALL_COUNTRIES } from '../graphql/queries/countries'

interface HomeIprops {
  countries: any
}

const Home: React.FC<HomeIprops> = ({ countries }) => {
  const inputRef = useRef(null)
  const [valueInput, setValueInput] = useState<string>('')

  const handleResetInput = () => {
    setValueInput('')
    inputRef.current.focus()
  }

  const countriesFiltered = countries?.filter(item => {
    if (item.name.toLowerCase().includes(valueInput.toLowerCase())) {
      return item
    } else {
      return null
    }
  })

  return (
    <div className="pt-10 min-h-screen bg-slate-100">
      <div className="max-w-3xl mx-auto w-11/12">
        <form>
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={valueInput}
              className="border border-slate-300 pl-6 py-4 rounded-md block w-full focus:outline-none pr-14"
              onChange={e => setValueInput(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-4 top-[50%] translate-y-[-50%] text-sm text-slate-500"
              onClick={handleResetInput}
            >
              clear
            </button>
          </div>
        </form>

        <div className="border bg-slate-200 border-slate-300 rounded-md mt-3">
          <div className="pt-6 pb-2 px-6 h-[600px] overflow-y-scroll">
            {!countriesFiltered || countriesFiltered.length === 0 ? (
              <div className="p-10 bg-slate-100 rounded-md"></div>
            ) : (
              countriesFiltered.map(country => (
                <Country key={country.code} country={country} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: dataCountries } = await client.query({
    query: GET_ALL_COUNTRIES
  })
  const countries = dataCountries?.countries || []

  return {
    props: {
      countries
    }
  }
}

export default Home
