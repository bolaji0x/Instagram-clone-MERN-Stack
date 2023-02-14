import React, {useEffect} from 'react'
import {DiscoverPost} from '../components'
import { useAppContext } from '../context/appContext'
const DiscoverContainer = () => {
    const {posts, getDiscoverPosts, username, comment, post } = useAppContext()

    useEffect(() => {
      getDiscoverPosts()
      // eslint-disable-next-line
    }, [username, comment, post])

    if(posts.length === 0) {
      return (
      <div className='discover-btn'>
        <button className='refresh-discover' onClick={() => getDiscoverPosts()}>Refresh Page</button>
      </div>
      )
    }

    
  return (
    <>
      <div className='bd-container'>
          {posts.map((post) => {
              return (<DiscoverPost key={post._id} {...post} />)
          })}
      </div>
    </>
  )
}

export default DiscoverContainer