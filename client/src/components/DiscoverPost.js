import React, {useEffect, useState} from 'react'
import { useAppContext } from '../context/appContext'
const DiscoverPost = ({ _id, createdBy, images, description, likes}) => {
  const { user, likePost, unlikePost, createComment} = useAppContext()
  const [readMore, setReadMore] = useState(false)
  const [liked, setLiked] = useState(false)
  
  const [content, setContent] = useState('')
  const [postId, setPostId] = useState(_id)
  const [showModal, setShowModal] = useState(true)
 
    const handleLike = () => {
      likePost(_id)
      setLiked(!liked)
    }

    const handleUnlike = () => {
      unlikePost(_id)
      setLiked(!liked)
    }

    const handleCommentSubmit = (e) => {
      e.preventDefault();
      
      const myForm = new FormData();
      
      myForm.set("content", content);
      myForm.set("postId", postId);
      createComment(myForm);
      setPostId(_id)
      setContent('')
  }

  const toggleShowModal = () => {
    setShowModal(!showModal)
  }

    useEffect(() => {
      if(likes.includes(user?._id)) {
          setLiked(true)
      } else {
          setLiked(false)
      }
      // eslint-disable-next-line   
    }, [])

  return (
    <div>
      <section className='posts-section'>
        <main className='each-post'>
          <div className='discover-card'>
                <div className='name-btn'>
                  <h3 className='discover-name'>{createdBy.username}</h3>
                  <button className='card-btn'><i className='bx bx-dots-horizontal-rounded'></i></button>
                </div>
                <img src={images[0].url} className='discover-img' alt={description} />
                <p className='likes-count'>{likes.length} like{likes.length > 1 && 's'}</p>
                <div className='card-btns'>
                  <div className='btns-flex'>
                      <button 
                        className='card-btn'
                        onClick={!liked ? handleLike : handleUnlike}
                      >
                        <i className={!liked ? 'cbtn cbtnx bx bx-heart' : 'cbtn cbtnx bx bx-heart red-like'}></i>
                      </button>
                      <button onClick={toggleShowModal} className='card-btn'><i className='cbtn cbtnx bx bx-comment'></i></button>
                      <button className='card-btn'><i className='cbtn cbtnx bx bxl-telegram'></i></button>
                  </div>
                  <button className='card-btn'><i className='cbtn bx bx-save'></i></button>
                </div> 
              <div className='name-desc'>
                  <h5 className='card-name'>{createdBy.username}</h5>
                  <p className='discover-caption'>
                  {readMore ? description : `${description.substring(0, 50)}`}
                  {description.length > 200 && <button className='read-btn' onClick={() => setReadMore(!readMore)}>
                    {readMore ? 'show less' : '  read more...'}
                  </button>}
                </p>
              </div>
          </div>    
        </main>
      </section>
      
      <section className={showModal ? 'popup' : 'show-popup popup'}>
        <main className='popup-section'>
          <div className='img-section'>
            <img src={images[0].url} alt={createdBy.username} className='cmt-img' />
          </div>
          <div className='text-section'>
              <div className='header-section'>
              <header className='cmt-header'>
                  <div className='cmth-flex'>
                    <button onClick={toggleShowModal} className='cmt-head-btn'><i className='bx bx-arrow-back'></i></button>
                    <button className='cmt-name'>Comments</button>
                  </div>
                </header>
              </div>
              <div className='captions-section'>
                <div className='cmt-caption-flex'>
                   
                  <h4 className='cmt-head-name'>{createdBy.username}</h4>
                  <p className='cmt-caption-text'>{description}</p>
                </div>
                
              </div>
              <div className='bottom-section'>
                <div className='cmt-bottom'>
                  <div className='cmt-btns-flex'>
                    <div className='cmt-btns'>
                      <button className='cmt-btn'><i className='ecbtn bx bx-heart'></i></button>
                      <button className='cmt-btn'><i className='ecbtn bx bx-comment'></i></button>
                      <button className='cmt-btn'><i className='ecbtn bx bxl-telegram'></i></button>
                    </div>
                    <button className='cmt-btn'><i className='ecbtn bx bx-save'></i></button>
                  </div>
                  <form onSubmit={handleCommentSubmit}      className='cmt-input-tab'>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} className='cmt-input' placeholder='Add a comment'></textarea>
                    <button type='submit' className='submit-cmt'>post</button>
                  </form>
                </div>
              </div>
              
          </div>
        </main>
        <button onClick={toggleShowModal} className='close-btn'>X</button>
      </section>
    </div>
    
      
  )
}

export default DiscoverPost

