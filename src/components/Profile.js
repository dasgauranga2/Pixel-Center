import React, { useState,useEffect,useRef } from 'react';
import { getAuth,signOut,onAuthStateChanged } from 'firebase/auth';
import { ref as d_ref,onValue } from 'firebase/database';
import { useNavigate }  from 'react-router-dom';
import PropTypes from 'prop-types';
import { auth,db } from '../firebase-config';
// import the components
import Post from '../components/Post';

// create a functional component
// the component takes the props as parameter
function Profile(props) {

    // function to navigate to another page 
    const navigate = useNavigate();
    // current user state
    const [current_user, setCurrentUser] = useState(null);
    // it can be used to access dom elements
	const name_ref = useRef(null);
    // all posts
    const [posts, setPosts] = useState([]);

    // check if user is logged in
	onAuthStateChanged(auth, (user) => {
		if (user) {
            // set the current user
            setCurrentUser(user);
            console.log("USER");
		} 
		else {
            // if user is not logged in naivigate to sign in page
			navigate('/signin');
            console.log("NO USER");
		}
	});

    // 'useEffect' hook is used to perform side effects in the component
    // the function will run after the component jsx renders for the first time and then
    // every time one of the dependencies change
    useEffect(() => {
        if (current_user !== null) {
            // get firebase database reference
            const database_ref = d_ref(db,`USERS/${current_user.uid}`);
            // get user data
            onValue(database_ref, (snapshot) => {
                // check if data exists
                if (!(snapshot.val()===null) && !(snapshot.val()===undefined)) {
                    // set user name
                    name_ref.current.value = snapshot.val().name;
                }
            });
        }
    });

    return <div className='profile-container'>
        <h1>USER PROFILE</h1>
        <img src='https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png' />
        <input type="file" id="upload_file" />
        <input type="text" ref={name_ref} />
        <p>{ current_user===null ? "" : current_user.email }</p>
        {/* <div className='all-posts'>
            { posts.map((post) => <Post key={post.name} post={post} />) }
        </div> */}
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

export default Profile;