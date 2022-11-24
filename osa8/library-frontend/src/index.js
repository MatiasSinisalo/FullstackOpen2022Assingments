import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import {
    ApolloClient,
    ApolloProvider,
    HttpLink,
    InMemoryCache,
  } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'




const authHeaderModification = setContext((_, { headers }) => {
    const token = localStorage.getItem('libaryUserToken')
    let authHeader = null
    if(token){
      authHeader = `bearer ${token}`
    }

    return {
        headers: {...headers, authorization: authHeader}
    }
  })

  const httpLink = new HttpLink({
    uri: 'http://localhost:4000',
  })

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authHeaderModification.concat(httpLink)
  })




ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)
