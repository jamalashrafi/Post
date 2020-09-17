import axios from 'axios';
import { FETCH_ALL_POSTS_REQUEST, FETCH_ALL_POSTS_SUCCESS, FETCH_ALL_POSTS_ERROR } from '../constants/PostsConstants';


export const fetchAllPosts = () => async (dispatch) => {
    dispatch({type: FETCH_ALL_POSTS_REQUEST});

    try {
        const { data } = await axios.get('http://localhost:5000/posts');
        dispatch({type: FETCH_ALL_POSTS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: FETCH_ALL_POSTS_ERROR, payload: error});
    }
}