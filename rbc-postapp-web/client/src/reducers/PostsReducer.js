import { FETCH_ALL_POSTS_REQUEST, FETCH_ALL_POSTS_SUCCESS, FETCH_ALL_POSTS_ERROR } from "../constants/PostsConstants";

export const postReducer = (state = { posts: []}, action) => {

    switch(action.type) {
        case FETCH_ALL_POSTS_REQUEST:
            return {...state, loading: true };

        case FETCH_ALL_POSTS_SUCCESS:
            return {...state, posts: action.payload, success: true, loading: false };

        case FETCH_ALL_POSTS_ERROR:
            return {...state, error: action.payload, loading: false};
        
        default:
            return state;

    }
}