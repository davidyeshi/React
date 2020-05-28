import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import './Courses.css';
import Course from '../Course/Course';

class Courses extends Component {
    state = {
        courses: [
            { id: 1, title: 'Angular - The Complete Guide' },
            { id: 2, title: 'Vue - The Complete Guide' },
            { id: 3, title: 'PWA - The Complete Guide' }
        ],
        courseId : null
    }
    courseSelectedHandler = (id) => {
        // this.props.location.search()
        // this.props.history.push('/courses/'+id);
        this.setState({courseId: id});
    }
    render () {
        console.log('[Courses.js] props = '+this.props);
        return (
            <div>
                <h1>Amazing Udemy Courses</h1>
                <section className="Courses">
                    {
                        this.state.courses.map( course => {
                            return (
                                <Link key={course.id} to={{
                                        pathname: "/courses/"+course.id,
                                        search: '?title='+course.title    
                                    }}>
                                <article className="Course" onClick={() =>this.courseSelectedHandler(course.id)} key={course.id}>{course.title}</article>
                                </Link>
                            );
                        } )
                    }
                </section>
                <Route path={"/courses/:id"} component={Course} />
            </div>
        );
    }
}

export default Courses;