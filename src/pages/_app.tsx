import React from 'react'
import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { Toaster } from 'react-hot-toast'

import client from '../config/apollo'
import '../styles/index.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Toaster position="top-center" reverseOrder={false} />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
