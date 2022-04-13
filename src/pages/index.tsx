import React, { useRef, useState } from 'react'
import useSWR from 'swr'
import toast from 'react-hot-toast'

import Outline from '../components/Button/Outline'
import Country from '../components/Country'
import Error from '../components/Error'
import Loader from '../components/Loader'
import client from '../config/apollo'
import { GET_ALL_COUNTRIES } from '../graphql/queries/countries'
import { CountryType } from '../interfaces'

interface HomeIprops {
  countries: CountryType[]
}

const fetcher = async (): Promise<CountryType[]> => {
  const { data: dataCountries } = await client.query({
    query: GET_ALL_COUNTRIES
  })
  const countries = dataCountries?.countries || []
  return countries
}

const Home: React.FC<HomeIprops> = () => {
  const inputRef = useRef(null)
  const [valueInput, setValueInput] = useState<string>('')

  const { data: countries, error } = useSWR<CountryType[]>('/data', fetcher)

  const handleResetInput = () => {
    setValueInput('')
    inputRef.current.focus()

    if (valueInput.trim() === '') {
      return toast('Input is empty', {
        icon: '🤨',
        style: {
          borderRadius: '10px',
          background: '#fff',
          color: '#333'
        }
      })
    } else {
      return toast.success("You've reset the input")
    }
  }

  const countriesFiltered: CountryType[] = countries?.filter(country => {
    if (country.name.toLowerCase().includes(valueInput.toLowerCase())) {
      return country
    } else {
      return null
    }
  })

  if (error) return <Error text="There was a problem on the page" />

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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValueInput(e.target.value)
              }
            />
            <Outline type="button" onClick={handleResetInput}>
              clear
            </Outline>
          </div>
        </form>

        <div className="border bg-slate-200 border-slate-300 rounded-md mt-3">
          <div className="pt-6 pb-2 px-6 h-[400px] lg:h-[600px] overflow-y-scroll">
            {!countriesFiltered ? (
              <Loader />
            ) : countriesFiltered.length === 0 ? (
              <div>There is no country with that name</div>
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

export default Home
