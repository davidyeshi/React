import React, { Component } from 'react';

import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: []
    }
    // Making http requests using Axios
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((response)=>{
                // storing only four post
                const posts = response.data.slice(0, 4);
                // Adding an author key since our dummy data doesn't have it
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'David'
                    }
                })
                console.log(updatedPosts);
                this.setState({posts: updatedPosts});
                console.log(response);
        });
    }

    render () {
        const posts = this.state.posts.map(post => {
            return <Post key={post.id} title={post.title} author={post.author}/>
        });

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;