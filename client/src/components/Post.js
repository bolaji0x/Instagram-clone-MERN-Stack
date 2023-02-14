import React from 'react'
const Post = ({images, description }) => {

  return (
      <img src={images[0].url} className='post-img' alt={description} />
      )
}

export default Post