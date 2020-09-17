import React from 'react';
import { useSelector } from 'react-redux';
import HeaderContainer from './HeaderContainer'
import BlogView from './BlogView'

const HomeScreen = (props) => {
    const postState = useSelector(state => state.postReducer);
    const { loading, posts, error } = postState;

    return (
        <>
            <HeaderContainer {...props} />
            {loading && <div>Loading...</div>}
            {error && <div>error</div>}
            <div className='blogViewContainer'>
                { posts.length > 0 ? posts.map(post => (
                    <BlogView key={post._id} post={post}/>
                )) : ""}
            </div>
           
           
        </>
    )
}

export default HomeScreen
