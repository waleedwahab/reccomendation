import React, { Component } from 'react';

import { useLocation } from 'react-router-dom';
const  Viewitems = (props)=>
{

const location = useLocation();
const data = location.state.data;
console.log(data);
console.log("hello");
    return(
        <>
            <h1>hello</h1>
        </>
    )
}
export default Viewitems