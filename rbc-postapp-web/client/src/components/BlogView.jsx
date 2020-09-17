import React from 'react'

const BlogView = ({post}) => {
    return (
        <>
            <div className="blogViewContainer__blogPost">
                <h5>Authored by : {post.ownerEmail}</h5>
                <div>{post.description}</div>
            </div>
        </>
    )
}

export default BlogView
