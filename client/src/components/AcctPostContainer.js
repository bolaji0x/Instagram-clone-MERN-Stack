import React, { useEffect } from 'react'
import Post from './Post'
import { useAppContext } from '../context/appContext'
import { useParams } from 'react-router-dom'
import { LoadMoreBtn, Loading } from '.'
const AcctPostContainer = () => {
    const {id} = useParams()
    const {isLoading, posts, getAccountPost, page } = useAppContext()

    useEffect(() => {
        getAccountPost({ id })
        // eslint-disable-next-line
    }, [page])
  
    
    if(isLoading) {
      return (<Loading />)
    }
  
    
    return (
      <>
        <div className="picture-container bd-grid">
          {posts.map((post) => {
            return (<Post key={post._id} {...post} />)
          })}
    
          
        </div>
        <LoadMoreBtn />
      </>
    )
}

export default AcctPostContainer