import React, { useRef,useEffect, useState } from 'react';
import { getAuth,signOut,onAuthStateChanged } from 'firebase/auth';
import { ref as d_ref,set,push } from 'firebase/database';
import { ref as s_ref,uploadBytes,getDownloadURL } from 'firebase/storage';
import { useNavigate }  from 'react-router-dom';
import PropTypes from 'prop-types';
import { auth,db,storage } from '../firebase-config';

// create a functional component
// the component takes the props as parameter
function Post(props) {

    // get the post
    const post = props.post;

    return <div className='post-container'>
        <h1>{ post.name }</h1>
        { post.image_urls.map((image,i) => <img key={i} src={image} />) }
    </div>
}
// // default values for props if no data is given
// Header.defaultProps = {
//     text: 'DEFAULT'
// };

// // define the type of data for each prop
// Header.propTypes = {
//     text: PropTypes.string.isRequired
// };

export default Post;