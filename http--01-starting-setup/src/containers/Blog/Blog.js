import React, { Component } from 'react';

import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: false,
        error: false
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
                this.setState({posts: updatedPosts});
        })
        .catch(errors => {
            // console.log(errors);
            this.setState({error: true});
        });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render () {
        let posts = <p style={{textAlign: "center"}}>Something went wrong!</p>
        
        if(!this.state.error) {
            posts = this.state.posts.map(post => {
            return <Post 
                    clicked={()=>this.postSelectedHandler(post.id)}
                    key={post.id} 
                    title={post.title} 
                    author={post.author}/>
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id = {this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;