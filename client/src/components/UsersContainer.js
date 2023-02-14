import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'
import { Loading } from '../components'
const UsersContainer = () => {
    const {isLoading, users, searchUser, username} = useAppContext()

    useEffect(() => {
        searchUser()
        // eslint-disable-next-line
    }, [username])

    if (isLoading) {
        return <Loading />;
    }

    if (users.length === 0) {
        return (
            <h2 className='no-users'>Oops! Users to display...</h2>
        );
    }

  return (
    <div className='search-container show-search'>
        {users.map((user) => {
            const {_id, username, fullname, images} = user
            return (
                <div  key={_id}>
                    <Link to={`/${_id}/user`} className='search-center'>
                    <div className='search-flex'>
                        <img src={images[0].url} alt={username} className='search-pimg' />
                    </div>
                    <div>
                        <h4 className='search-username'>{username}</h4>
                        <p className='search-name'>{fullname}</p>
                    </div>
                    </Link>
                </div> 
            )
        })}
    </div>
  )
}

export default UsersContainer