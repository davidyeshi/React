import React, { Component } from 'react';

class Course extends Component {
    render () {
        let title = '__COURSE_TITLE_'
        const queries = new URLSearchParams(this.props.location.search);

        for (let param of queries.entries()) {
            if(param[0] === 'title')
            {
                title = param[1];
            }
        }
        console.log(title);
        return (
            <div>
                <h1>{title}</h1>
                <p>You selected the Course with ID: {this.props.match.params.id}</p>
            </div>
        );
    }
}

export default Course;