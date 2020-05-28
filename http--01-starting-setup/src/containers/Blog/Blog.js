import React, { Component } from 'react';
import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import asyncComponent from '../../hoc/asyncComponet';

// import axios from 'axios';
import './Blog.css';

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {

    state = {
        auth:false
    }
    
    render () {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                                to="/" 
                                // custom active class name
                                // activeClassName="my-active"
                                // activeStyle = {{}}
                                exact>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: "/new-post",
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>

                {/* Loads only one route  */}
                <Switch>
                    <Route path="/new-post" component={AsyncNewPost} />
                    <Route path="/posts" component={Posts} />
                    {/* <Route render={()=> <h1>Not found</h1>} /> */}
                    <Redirect from="/" to="/posts" />
                </Switch>
            </div>
        );
    }
}

export default Blog;