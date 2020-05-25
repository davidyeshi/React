import React, { Component } from 'react';

class ErrorBoundary extends Component {

    state = {
        hasError:false,
        errorMessage: ''
    }

    // Will be executed when component wrapped by error boundary throws an error
    componentDidCatch = (error, info) => {
        this.setState({
            hasError: true,
            errorMessage: error
        })
    } 

    render() {
        if(this.state.hasError) {
            return <h1>{this.state.errorMessage}</h1>;
        } else {
            // show component(s) as is
            return this.props.children;
        }
    }
}

export default ErrorBoundary;