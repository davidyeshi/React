import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
// import {Link} from 'react-router-dom';

class Posts extends Component {
    
    state = {
        posts: []
    }

    // Making http requests using Axios
    componentDidMount() {
        axios.get('/posts')
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
            console.log(errors);
            // this.setState({error: true});
        });
    }

    postSelectedHandler = (id) => {
        this.props.history.push({pathname: '/'+ id});
        this.setState({selectedPostId: id});
    }

    render() {
        let posts = <p style={{textAlign: "center"}}>Something went wrong!</p>
        if(!this.state.error) {
            posts = this.state.posts.map(post => {
            return ( 
            // <Link key={post.id} to={'/' + post.id}>
                <Post 
                    key={post.id}
                    clicked={()=>this.postSelectedHandler(post.id)}
                    title={post.title} 
                    author={post.author}/>
            // </Link> 
            );
            });
        }

        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }
}

export default Posts;