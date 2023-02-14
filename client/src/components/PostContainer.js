import React, { useEffect } from 'react'
import Post from './Post'
import {Loading} from '../components'
import { useAppContext } from '../context/appContext'
import { Link  } from 'react-router-dom'
import LoadMoreBtn from './LoadMoreBtn'
const PostContainer = () => {
  const {isLoading, posts, page, getPosts} = useAppContext()


  useEffect(() => {
    getPosts()
    // eslint-disable-next-line
  }, [page])

  
  if(isLoading) {
    return (<Loading />)
  }

  if(posts.length === 0) {
    return (
    <div className='refresh-btn'>
      <button className='refresh-discover' onClick={() => getPosts()}>Refresh Page</button>
    </div>
    )
  }
  
  return (
    <>
    <div className="picture-container bd-grid">
      {posts.map((post) => {
        return (<Link key={post._id} to={`/post/${post._id}`}><Post key={post._id} {...post} /></Link>)
      })}
    </div>
    <LoadMoreBtn />
    </>
  )
}

export default PostContainer