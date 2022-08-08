import React, { useRef,useEffect, useState } from 'react';
import { getAuth,signOut,onAuthStateChanged } from 'firebase/auth';
import { ref as d_ref,set,push,onValue } from 'firebase/database';
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
    // post user name
    const [user_name,setUserName] = useState(null);
    // post user image
    const [user_image,setUserImage] = useState("https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png");

    // 'useEffect' hook is used to perform side effects in the component
	// such as fetching data, interacting with dom, timers, making http requests
	// by default, the function inside the hook
	// runs after the component jsx renders and then
	// runs every time after the ui is re-rendered(eg.- state changes)
    useEffect(() => {
		// get firebase database reference
        const database_ref = d_ref(db,`USERS/${post.user}`);
        // get user data
        onValue(database_ref, (snapshot) => {
            // check if data exists
            if (!(snapshot.val()===null) && !(snapshot.val()===undefined)) {
                // set user name
                setUserName(snapshot.val().name);
                // check if user profile image exists
                if (snapshot.val().hasOwnProperty('image_url')) {
                    // set user profile image
                    setUserImage(snapshot.val().image_url);
                }
            }
        });
	});

    return <div className='post-container'>
        {/* post title */}
        <h1>{ post.name }</h1>
        <div className='user-row'>
            {/* post user image */}
            <img src={ user_image } />
            {/* post user name */}
            <h2>{ user_name===null ? "" : user_name }</h2>
        </div>
        <div className='image-row'>
            {/* previous image button */}
            <button onClick={() => {
                if (image_index !== 0) {
                    setImageIndex(image_index-1);
                }
            }}>&#10148;</button>
            {/* current image */}
            { image_tags[image_index] }
            {/* next image button */}
            <button onClick={() => {
                if (image_index !== image_tags.length-1) {
                    setImageIndex(image_index+1);
                }
            }}>&#10148;</button>
        </div>
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