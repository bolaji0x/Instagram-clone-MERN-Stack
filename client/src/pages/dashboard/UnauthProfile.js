import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/appContext'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const initialState = {
    followers: [],
    following: [],
    followed: false
  }
  

const UnAuthProfile = () => {
    const {id} = useParams()
    const {totalPosts, followUser, unfollowUser, user} = useAppContext()
    const [values, setValues] = useState(null)

    const [items, setItems] = useState(initialState)

    const toggleFollow = () => {
        setItems({ ...items, followed: !items.followed  })
    }

    const handleFollow = (e) => {
        e.preventDefault()
        const {followers, following } = items
       
        const currentUser = { followers, following }
        followUser({ currentUser, id })
        toggleFollow()
        
    }

    const handleunFollow = (e) => {
        e.preventDefault()
        const {followers, following } = items
       
        const currentUser = { followers, following }
        unfollowUser({ currentUser, id })
        toggleFollow()
    }
   

    const getSingleUser = async () => {
        try {
          const {data: {user}} = await axios.get(`/api/v1/auth/${id}`)
          console.log(user)
          setValues(user)
        } catch (error) {
          console.log(error)
        }
    }

    useEffect(() => {
        getSingleUser()
        if(user?.following.includes(id)) {
            setItems({ ...items, followed: !items.followed })
        } else {
            setItems({ ...items, followed: items.followed  })
        }
        // eslint-disable-next-line   
    }, [id])

    if(!values) {
        return (<h1 className='no-profile'>Oops! Profile does not exist....</h1>)
    } else {
        const {fullname, username, followers, following, images} = values
        return (
            <section className="account-section bd-container">
                <div className="account-container">
                    <div className="img-name">
                            <img src={images[0].url} alt={username} className='profile-img' />
                            <h5 className="fullname">{fullname}</h5>
                    </div>
                    <div className="name-settings-edit">
                        <div className="name-settings">
                            <h5 className="username">{username}</h5>
                            <button className="settings-btn"><i className='bx bxs-brightness'></i></button>
                        </div>
                        <button
                            onClick={!items.followed ? handleFollow : handleunFollow}
                            className="follow-btn"
                        >
                                {!items.followed ? 'follow' : 'unfollow'}
                            </button>
                        </div>
            
                        <div className="detail-flex">
                            <div className="each-flex">
                                <h5 className="post-no posts-no">{totalPosts}</h5>
                                <h5 className="post-text">posts</h5>
                            </div>
                            <div className="each-flex">
                                <h5 className="post-no flws-no">{followers.length}</h5>
                                <h5 className="post-text">followers</h5>
                            </div>
                            <div className="each-flex">
                                <h5 className="post-no flwng-no">{following.length}</h5>
                                <h5 className="post-text">following</h5>
                            </div>
                        </div>
                </div>
                    <div className="nos__container">
                        <div className="nos__content">
                            <div className="each-no">
                                <h5 className="number">{totalPosts}</h5>
                                <h5 className="each-name">posts</h5>
                            </div>
                            <div className="each-no">
                                <h5 className="number">{followers.length}</h5>
                                <h5 className="each-name">followers</h5>
                            </div>
                            <div className="each-no">
                                <h5 className="number">{following.length}</h5>
                                <h5 className="each-name">following</h5>
                            </div>
                        </div>
                    </div>
                    <div className="icons__container">
                        <div className="icon__content">
                            <div className="toggle-btn">
                                <button className="icon-btn post-btn"><i className='bx bx-grid'></i></button>
                                <button className="btn-text">POSTS</button>
                            </div>
                            <div className="toggle-btn">
                                <button className="icon-btn save-btn"><i className='bx bx-bookmark'></i></button>
                                <button className="btn-text">SAVED</button>
                            </div>
                            <div className="toggle-btn">
                                <button className="icon-btn tag-btn"><i className='bx bxs-contact'></i></button>
                                <button className="btn-text">TAGGED</button>
                            </div>
                        </div>
                    </div>
            
                    <div className="icons-flex">
                        <div className="each-icon">
                            <button className="icon-btn post-btn"><i className='bx bx-grid'></i></button>
                            <button className="btn-text">POSTS</button>
                        </div>
                        <div className="each-icon">
                            <button className="icon-btn save-btn"><i className='bx bx-bookmark'></i></button>
                            <button className="btn-text">SAVED</button>
                        </div>
                        <div className="each-icon">
                            <button className="icon-btn tag-btn"><i className='bx bxs-contact'></i></button>
                            <button className="btn-text">TAGGED</button>
                        </div>
                    </div>
            </section>
          )
    }
  
}

export default UnAuthProfile