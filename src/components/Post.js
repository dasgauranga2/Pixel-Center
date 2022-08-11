import React, { useRef,useEffect, useState } from 'react';
import { getAuth,signOut,onAuthStateChanged } from 'firebase/auth';
import { ref as d_ref,set,push,onValue,get } from 'firebase/database';
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
    // all user details
    const [user_details,setUserDetails] = useState(new Map());
    // post current image index
    const [image_index,setImageIndex] = useState(0);
    // post user name
    const [user_name,setUserName] = useState(null);
    // post user image
    const [user_image,setUserImage] = useState("https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png");
    // show/hide comments
    const [toggle_comments,setToggleComments] = useState(false);
    // ref for comment
    const comment_ref = useRef(null);

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

        // get firebase database reference
        const users_ref = d_ref(db,"USERS/");
        // get all users' data
        get(users_ref).then((snapshot) => {
            for(let [user_id,user_detail] of Object.entries(snapshot.val())) {
                //console.log(user_id,user_detail);
                setUserDetails(new Map(user_details.set(user_id,user_detail)));
            }
        });
	},[]);

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
        {/* button to show/hide comments */}
        <button className='toggle-comments' onClick={() => {
            setToggleComments(!toggle_comments);
        }}>{ toggle_comments ? "HIDE COMMENTS" : "SHOW COMMENTS" }</button>
        <div className='comment-row' style={{display: toggle_comments ? 'block' : 'none'}}>
            {/* display comments */}
            <ul>
                { post.hasOwnProperty('comments') &&
                    Object.values(post.comments).map((comment,i) => 
                    <li key={i}>
                        <img src={ user_details.has(comment.user) ? user_details.get(comment.user).image_url : "https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png" } />
                        <div className='user-text-detail'>
                            <p>{ user_details.has(comment.user) ? user_details.get(comment.user).name : "" }</p>
                            <p>{ comment.text }</p>
                        </div>
                    </li>) 
                }
            </ul>
            {/* form to add comment */}
            <form>
                <input type="text" ref={comment_ref} />
                <input type="submit" value="COMMENT" onClick={(event) => {
                    event.preventDefault();

                    // get comment text
                    const comment_text = comment_ref.current.value;

                    // check if comment is empty
                    if (!(comment_text.trim().length===0)) {
                        // get firebase database reference
                        const database_ref = push(d_ref(db,`POSTS/${post.user}/${post.id}/comments`));

                        // add comment to the post
                        set(database_ref, {
                            text: comment_text,
                            user: props.current_user.uid
                        });

                        // clear the input text field
                        comment_ref.current.value = "";
                    }
                }} />
            </form>
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