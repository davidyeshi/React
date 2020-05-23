import React from 'react';

const validationComponent = (props) => {

    return (props.length < 5 ? <p>Text too short</p> : <p>Text long enough</p>);
}

export default validationComponent;