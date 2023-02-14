import React from 'react'
import { useAppContext } from '../context/appContext'
const LoadMoreBtn = () => {
    const { isLoading, page, totalPosts, changePage } = useAppContext()


  return (
    <div className='refresh-btn'>
      {
        totalPosts < 6 * (page - 1) ? '' :
        
        !isLoading && <button className='refresh-discover' onClick={() => changePage(page + 1)}>Load more</button>

      }
    </div>
  )
}

export default LoadMoreBtn