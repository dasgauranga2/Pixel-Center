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
    // array of post image tags
    const image_tags = props.post.image_urls.map((url) => <img src={url} />);
    // post current image index
    const [image_index,setImageIndex] = useState(0);

    return <div className='post-container'>
        {/* post title */}
        <h1>{ post.name }</h1>
        {/* previous image button */}
        <button onClick={() => {
            if (image_index !== 0) {
                setImageIndex(image_index-1);
            }
        }}>&#10148;</button>
        {/* next image button */}
        <button onClick={() => {
            if (image_index !== image_tags.length-1) {
                setImageIndex(image_index+1);
            }
        }}>&#10148;</button>
        {/* current image */}
        { image_tags[image_index] }
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