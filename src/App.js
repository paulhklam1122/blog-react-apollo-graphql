import React, { Component } from 'react'

import ApolloClient from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'
import gql from 'graphql-tag'

import './App.css'

const client = new ApolloClient({
  uri: 'https://api-uswest.graphcms.com/v1/cjmzbbe151f2801ijmamp46p4/master'
})

const POSTS_QUERY = gql`
  {
    posts {
      id
      title
      body
    }
  }
`

//  Running our query outside of React
// client
//   .query({
//     query: testQuery
//   })
//   .then(res => console.log(res))

class App extends Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <div className='App'>
          <Query query={POSTS_QUERY}>
            {({ loading, data }) => {
              if (loading) return 'Loading...'
              const { posts } = data
              return posts.map(post => (
                <div>
                  <h1 key={post.id}>{post.title}</h1>
                  <p>{post.body}</p>
                </div>
                ))
              }}
           </Query>
         </div>
      </ApolloProvider>
    )
  }
}

export default App
