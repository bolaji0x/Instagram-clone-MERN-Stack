import React from 'react'
import { useAppContext } from '../../context/appContext'
import AllPost from './AllPost'
import { Link } from 'react-router-dom'
const AuthProfile = () => {
    const {user, totalPosts} = useAppContext()
    
  return (
    <div className='profile-container'>
        <section className="account-section bd-container">
            <div className="account-container">
                <div className="img-name">
                    <img src={user?.images[0].url} alt={user?.username} className='profile-img' />
                    <h5 className="fullname">{user?.fullname}</h5>
                </div>
                <div            
                    className="name-settings-edit"
                >                       
                    <div className="name-settings">
                        <h5 className="username">{user?.username}</h5>
                        <button className="settings-btn"><i className='bx bxs-brightness'></i></button>
                    </div>
                    <Link to='edit-profile' className="edit-btn">{!user ? 'follow': 'Edit profile'}</Link>
                </div>
                <div className="detail-flex">
                    <div className="each-flex">
                        <h5 className="post-no posts-no">{totalPosts}</h5>
                        <h5 className="post-text">posts</h5>
                    </div>
                    <div className="each-flex">
                        <h5 className="post-no flws-no">{user?.followers.length}</h5>
                        <h5 className="post-text">followers</h5>
                    </div>
                    <div className="each-flex">
                        <h5 className="post-no flwng-no">{user?.following.length}</h5>
                        <h5 className="post-text">following</h5>
                    </div>
                </div>
            </div>

            <div className="nos__container">
                <div className="nos__content">
                    <div className="each-ng">
                        <div className='each-no'>
                            <h5 className="number">{totalPosts}</h5>
                            <h5 className="each-name">posts</h5>
                         </div>
                         <div >
                            <button className="icon-btn post-btn"><i className='bx bx-grid'></i></button>
                         </div>
                    </div>
                    <div className="each-ng">
                        <div className='each-no'>
                            <h5 className="number">{user?.followers.length}</h5>
                            <h5 className="each-name">followers</h5>
                        </div>
                        <div>
                            <button className="icon-btn save-btn"><i className='bx bx-bookmark'></i></button>
                        </div> 
                    </div>
                    <div className='each-ng'>
                        <div className="each-no">
                            <h5 className="number">{user?.following.length}</h5>
                            <h5 className="each-name">following</h5>
                        </div>
                        <div>
                            <button className="icon-btn tag-btn"><i className='bx bxs-contact'></i></button>
                        </div>
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
        <AllPost />
    </div>
  )
}

export default AuthProfile