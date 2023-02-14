import React, { useReducer, useContext, useState, useEffect } from 'react'
import reducer from './reducer'
import axios from 'axios'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_POST_BEGIN,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  FOLLOW_USER_BEGIN,
  FOLLOW_USER_SUCCESS,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UNFOLLOW_USER_BEGIN,
  UNFOLLOW_USER_SUCCESS,
  GET_DISCOVER_BEGIN,
  GET_DISCOVER_SUCCESS,
  LIKE_POST_BEGIN,
  LIKE_POST_SUCCESS,
  UNLIKE_POST_BEGIN,
  UNLIKE_POST_SUCCESS,
  GET_SINGLEPOST_BEGIN,
  GET_SINGLEPOST_SUCCESS,
  GET_SINGLEPOST_ERROR,
  DELETE_POST_BEGIN,
  UPDATE_POST_BEGIN,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_ERROR, 
  GET_SINGLEUSER_ERROR,
  GET_SINGLEUSER_BEGIN,
  GET_SINGLEUSER_SUCCESS,
  CREATE_COMMENT_BEGIN,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_ERROR,
  OPEN_SUBMENU,
  CLOSE_SUBMENU,
  SEARCH_USER_BEGIN,
  SEARCH_USER_ERROR,
  SEARCH_USER_SUCCESS,
  UNLIKE_POST_ERROR,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  CHANGE_PAGE,
  GET_UNAUTHPOSTS_BEGIN,
  GET_UNAUTHPOSTS_SUCCESS,
  GET_UNAUTHPOSTS_ERROR,
  GET_POSTS_BEGIN,
  GET_POSTS_SUCCESS

} from './actions'


const initialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: null,
  userLocation: '',

  image: '',
  description: '',
  likes: [],

  
  posts: [],
  sort: 'latest',
  post: null,

  followers: [],
  following: [],


  comment: [],
  postId: '',
  isSubmenuOpen: false,
  username: '',
  users: [],
  page: 1,
  totalPosts: 0


}
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [position, setPosition] = useState({});

  const openSubmenu = (coordinates) => {
    setPosition(coordinates);
    dispatch({ type: OPEN_SUBMENU })
  }

  const closeSubmenu = () => {
    dispatch({ type: CLOSE_SUBMENU })
  };

  // axios
  const authFetch = axios.create({
    baseURL: '/api/v1',
  });
  // request

  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }


  const setupUser = async ({currentUser, endPoint, alertText}) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser, config)

      const { user, location } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, location, alertText },
      })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const logoutUser = async () => {
    await authFetch.get('/auth/logout');
    dispatch({ type: LOGOUT_USER });
  };

  const updateUser = async (userData) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await authFetch.put(`/auth/updateUser`, userData)

      const { user, location } = data

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location },
      })
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg }
        })
      }
    }
    clearAlert()
  }

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }
  
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };
  
  const getSingleUser = async (id) => {
    dispatch({ type: GET_SINGLEUSER_BEGIN });
    try {  
      const { data } = await axios.get(`/api/v1/auth/${id}`);
      const { user } = data
      dispatch({
        type: GET_SINGLEUSER_SUCCESS,
        payload: { user },
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLEUSER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert() 
  }

  const followUser = async ({currentUser, id}) => {
    dispatch({ type: FOLLOW_USER_BEGIN })
    try {
      const {data} = await authFetch.patch(`/users/follow/${id}`, currentUser)
      const { user, location } = data
      dispatch({ type: FOLLOW_USER_SUCCESS, payload: {user, location } })
    } catch (error) {
      console.log(error)
    }
    clearAlert()
  }

  const unfollowUser = async ({currentUser, id}) => {
    dispatch({ type: UNFOLLOW_USER_BEGIN })
    try {
      const {data} = await authFetch.patch(`/users/unfollow/${id}`, currentUser)
      const { user, location } = data
      dispatch({ type: UNFOLLOW_USER_SUCCESS, payload: {user, location } })
    } catch (error) {
      console.log(error)
    }
    clearAlert()
  }

  const createPost = async (postData) => {
    dispatch({ type: CREATE_POST_BEGIN })
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await authFetch.post('/posts', postData, config)
      const {post} = data
      dispatch({ type: CREATE_POST_SUCCESS, payload: {post}})
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: CREATE_POST_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const getSinglePost = async (id) => {
    dispatch({ type: GET_SINGLEPOST_BEGIN })
    try {
      const { data } = await axios.get(`/api/v1/posts/${id}`)
      const { post } = data
      console.log(post)
      dispatch({
        type: GET_SINGLEPOST_SUCCESS,
        payload: {
          post,
        },
      })
    } catch (error) {
      if (error.response.status === 401) return
        dispatch({
          type: GET_SINGLEPOST_ERROR,
          payload: { msg: error.response.data.msg }
        })
    }
    clearAlert()
  }

  const updatePost = async (id, postData) => {
    dispatch({ type: UPDATE_POST_BEGIN });
    try {
      await authFetch.put(
        `/posts/${id}`,
        postData
      );
  
      dispatch({ type: UPDATE_POST_SUCCESS });
    } catch (error) {
      if (error.response.status !== 401) return;
      dispatch({
        type: UPDATE_POST_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert()
  }

  const getPosts = async () => {
    const {sort, page} = state
    let url = `/posts?limit=${page*6}&sort=${sort}`

    dispatch({ type: GET_POSTS_BEGIN })
  
    try {
      const { data } = await authFetch(url)
      const { posts, totalPosts } = data
      console.log(posts)
      dispatch({
        type: GET_POSTS_SUCCESS,
        payload: {
          posts,
          totalPosts
        },
      })
    } catch (error) {
        logoutUser();
    }
    clearAlert()
  }


  const deletePost = async (postId) => {
    dispatch({ type: DELETE_POST_BEGIN })
    try {
      await authFetch.delete(`/posts/${postId}`)
    } catch (error) {
      console.log(error)
    }
  }

  const getAccountPost = async ({id}) => {

    const {sort, page} = state
    let url = `/api/v1/posts/account/${id}?limit=${page * 6}&sort=${sort}`

    dispatch({ type: GET_UNAUTHPOSTS_BEGIN })
    try {
      const { data } = await axios.get(`${url}`)
      const { posts, totalPosts } = data
      dispatch({
        type: GET_UNAUTHPOSTS_SUCCESS,
        payload: {
          posts,
          totalPosts
        },
      })
      console.log(posts)
    } catch (error) {
      if (error.response.status !== 401) return
        dispatch({
          type: GET_UNAUTHPOSTS_ERROR,
          payload: { msg: error.response.data.msg },
        })
      }
      clearAlert()
  }

  const getDiscoverPosts = async () => {
    let url = `/posts/discover`

    dispatch({ type: GET_DISCOVER_BEGIN })
    try {
      const { data } = await authFetch(url)
      const { posts } = data
      console.log(posts)
      dispatch({
        type: GET_DISCOVER_SUCCESS,
        payload: {
          posts
        }
      })
    } catch (error) {
        logoutUser();
    }
    clearAlert()
  }

  const likePost = async (postId) => {
    dispatch({ type: LIKE_POST_BEGIN })
    try {
      const {data} = await authFetch.patch(`/posts/like/${postId}`)
      const { post } = data
      
      dispatch({
        type: LIKE_POST_SUCCESS,
        payload: {
          post,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  const unlikePost = async (postId) => {
    dispatch({ type: UNLIKE_POST_BEGIN })
    try {
      const {data} = await authFetch.patch(`/posts/unlike/${postId}`)
      const { post } = data
      
      dispatch({
        type: UNLIKE_POST_SUCCESS,
        payload: {
          post,
        },
      })
    } catch (error) {
      if (error.response.status !== 401) return
        dispatch({
          type: UNLIKE_POST_ERROR,
          payload: { msg: error.response.data.msg },
      })
    }
  }

  const createComment = async (commentData) => {
    dispatch({ type: CREATE_COMMENT_BEGIN })
    try {
      const { data } = await authFetch.post(`/comments`, commentData)
      const {comment} = data
      dispatch({ type: CREATE_COMMENT_SUCCESS, payload: { comment } })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status !== 401) return
        dispatch({
          type: CREATE_COMMENT_ERROR,
          payload: { msg: error.response.data.msg }
      })
    }
    clearAlert()
  }

 
  const searchUser = async () => {
    const {username} = state
    let url = `/users/search?`

    if (username) {
      url = url + `username=${username}`
    }
    dispatch({ type: SEARCH_USER_BEGIN })
    try {
      const {data} = await authFetch(url)
      const {users} = data
      console.log(users)
      dispatch({
        type: SEARCH_USER_SUCCESS,
        payload: {
          users,
        }
      })
      console.log(users)
    } catch (error) {
      if (error.response.status !== 401) return
        dispatch({
          type: SEARCH_USER_ERROR,
          payload: { msg: error.response.data.msg }
      })
    }
    clearAlert()
  }
  
  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch('/auth/getCurrentUser');
      const { user, location } = data;

      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: { user, location },
      });
    } catch (error) {
      if (error.response.status === 401) return;
      logoutUser();;
    }
  };

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line
  }, []);
  
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        getSingleUser,
        updateUser,
        followUser,
        unfollowUser,
        logoutUser,
        handleChange,
        clearValues,
        createPost,
        getSinglePost,
        updatePost,
        getPosts,
        deletePost,
        getAccountPost,
        getDiscoverPosts,
        likePost,
        unlikePost,
        createComment,

        openSubmenu,
        closeSubmenu,
        searchUser,
        position,
        changePage
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
