import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  CREATE_POST_BEGIN,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  GET_POSTS_BEGIN,
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  CLEAR_VALUES,
  FOLLOW_USER_BEGIN,
  FOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_BEGIN,
  UNFOLLOW_USER_SUCCESS,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  GET_DISCOVER_BEGIN,
  GET_DISCOVER_SUCCESS,
  HANDLE_CHANGE,
  LIKE_POST_BEGIN,
  LIKE_POST_SUCCESS,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_BEGIN,
  GET_SINGLEPOST_BEGIN,
  GET_SINGLEPOST_SUCCESS,
  GET_SINGLEPOST_ERROR,
  DELETE_POST_BEGIN,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_BEGIN,
  UPDATE_POST_ERROR,
  GET_SINGLEUSER_SUCCESS,
  GET_SINGLEUSER_BEGIN,
  GET_SINGLEUSER_ERROR,
  CREATE_COMMENT_BEGIN,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_ERROR,
  SET_ADD_COMMENT,
  OPEN_SUBMENU,
  CLOSE_SUBMENU,
  SEARCH_USER_BEGIN,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_ERROR,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  CHANGE_PAGE,
  GET_UNAUTHPOSTS_BEGIN,
  GET_UNAUTHPOSTS_SUCCESS,
  GET_UNAUTHPOSTS_ERROR,
  
} from './actions'

import { initialState } from './appContext'

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    }
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    }
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      userLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    }
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      userLoading: false,
    };
  }

  if (action.type === GET_SINGLEUSER_BEGIN) {
    return { ...state, isLoading: true }
  }

  if (action.type === GET_SINGLEUSER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      user: action.payload.user,
    }
  }
  if (action.type === GET_SINGLEUSER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  
  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true }
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      userLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Profile Updated!',
    }
  }

  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if (action.type === CREATE_POST_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === CREATE_POST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      post: action.payload.post,
      alertType: 'success',
      alertText: 'Post created',
    }
  }
  if (action.type === CREATE_POST_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if (action.type === UPDATE_POST_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === UPDATE_POST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Post Updated!',
    }
  }
  if (action.type === UPDATE_POST_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }


  if(action.type === CLEAR_VALUES) {
    const initialState = {
      isLoading: false,
      image: '',
      description: '',
      likes: 0,
      comment: [],
    }

    return {
      ...state, 
      ...initialState
    }
  }
  
  if (action.type === GET_POSTS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false }
  }
  if (action.type === GET_POSTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      posts: action.payload.posts,
      totalPosts: action.payload.totalPosts
    }
  }

  if (action.type === GET_POSTS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if (action.type === GET_UNAUTHPOSTS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false }
  }
  if (action.type === GET_UNAUTHPOSTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      posts: action.payload.posts,
      totalPosts: action.payload.totalPosts
    }
  }

  if (action.type === GET_UNAUTHPOSTS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if (action.type === DELETE_POST_BEGIN) {
    return { 
      ...state, 
      isLoading: true,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Post Deleted!', 
    }
  }

  if (action.type === GET_SINGLEPOST_BEGIN) {
    return { ...state, isLoading: true, showAlert: false }
  }
  if (action.type === GET_SINGLEPOST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      post: action.payload.post
    }
  }

  if (action.type === GET_SINGLEPOST_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }


  if (action.type === GET_DISCOVER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === GET_DISCOVER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      posts: action.payload.posts
    }
  }

  if (action.type === FOLLOW_USER_BEGIN) {
    return { ...state, isLoading: true}
  }
  if (action.type === FOLLOW_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      userLocation: action.payload.location,
    }
  }

  if (action.type === UNFOLLOW_USER_BEGIN) {
    return { ...state, isLoading: true}
  }
  if (action.type ===   UNFOLLOW_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      userLocation: action.payload.location,
    }
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    }
  }

  if(action.type === LIKE_POST_BEGIN) {
    return {...state, isLoading: false}
  }

  if (action.type === LIKE_POST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      post: action.payload.post
    }
  }

  if(action.type === UNLIKE_POST_BEGIN) {
    return {...state, isLoading: false}
  }

  if (action.type === UNLIKE_POST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      post: action.payload.post
    }
  }


  if (action.type === SET_ADD_COMMENT) {
    const item = state.posts.find((post) => post._id === action.payload.id)
    const {_id, content, postId} = item
    return {
      ...state,
      commentPostId: _id,
      content,
      postId
    }
  }
  if (action.type === CREATE_COMMENT_BEGIN) {
    return { ...state, isLoading: true }
  }

  if (action.type === CREATE_COMMENT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      comment: action.payload.comment,
      alertText: 'New Comment Created!',
    }
  }
  if (action.type === CREATE_COMMENT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }


  if (action.type === OPEN_SUBMENU) {
    return {
      ...state,
      isSubmenuOpen: !state.isSubmenuOpen,
    }
  }
  if (action.type === CLOSE_SUBMENU) {
    return {
      ...state,
      isSubmenuOpen: state.isSubmenuOpen,
    }
  
  }

  if (action.type === SEARCH_USER_BEGIN) {
    return { ...state, isLoading: true, showAlert: false }
  }
  if (action.type === SEARCH_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      users: action.payload.users
    }
  }

  if (action.type === SEARCH_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  
  }

  if (action.type === GET_CURRENT_USER_BEGIN) {
    return { ...state, userLoading: true, showAlert: false };
  }
  if (action.type === GET_CURRENT_USER_SUCCESS) {
    return {
      ...state,
      userLoading: false,
      user: action.payload.user,
      userLocation: action.payload.location
    };
  }


  

  throw new Error(`no such action : ${action.type}`)
}

export default reducer
