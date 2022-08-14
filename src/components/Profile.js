import React, { useState,useEffect,useRef } from 'react';
import { getAuth,signOut,onAuthStateChanged } from 'firebase/auth';
import { ref as d_ref,onValue,set,update } from 'firebase/database';
import { ref as s_ref,uploadBytes,getDownloadURL } from 'firebase/storage';
import { useNavigate }  from 'react-router-dom';
import PropTypes from 'prop-types';
import { auth,db,storage } from '../firebase-config';
// import the components
import Post from '../components/Post';

// create a functional component
// the component takes the props as parameter
function Profile(props) {

    // function to navigate to another page 
    const navigate = useNavigate();
    // current user state
    const [current_user, setCurrentUser] = useState(null);
    // user profile image state
    const [profile_image, setProfileImage] = useState("https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png");
    // ref for user name
	const name_ref = useRef(null);
    // ref for file input
	const file_ref = useRef(null);
    // timer to detect when user stops typing
    let timer = null;
    // all posts
    const [posts, setPosts] = useState(null);

    useEffect(() => {

        // check if user is logged in
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // set the current user
                setCurrentUser(user);
                // get the user profile
                get_profile();
                console.log("USER");
                // get the user posts
                get_posts();
            } 
            else {
                // if user is not logged in naivigate to sign in page
                navigate('/signin');
                console.log("NO USER");
            }
        });

        if(name_ref !== null) {
            document.title = `${name_ref.current.value} Profile`;   
        }
	},[current_user]);

    // function to get user profile
    function get_profile() {
        if (!(current_user===null)) {
            // get firebase database reference
            const database_ref = d_ref(db,`USERS/${current_user.uid}`);
            // get user data
            onValue(database_ref, (snapshot) => {
                // check if data exists
                if (!(snapshot.val()===null) && !(snapshot.val()===undefined)) {
                    // set user name
                    name_ref.current.value = snapshot.val().name;
                    // check if user profile image exists
                    if (snapshot.val().hasOwnProperty('image_url')) {
                        // set user profile image
                        setProfileImage(snapshot.val().image_url);
                    }
                }
            });
        }
    }

    // function to get user posts
    function get_posts() {
        if(current_user !== null) {
            // get all the user posts
            // get firebase database reference
            const database_ref = d_ref(db,`POSTS/${current_user.uid}/`);
            // get posts data
            onValue(database_ref, (snapshot) => {
                // check if data exists
                if (!(snapshot.val() === null) && !(snapshot.val() === undefined)) {
                    // array of posts
                    const posts_array = [];
                    // get each user's posts
                    for(let [post_id,user_post] of Object.entries(snapshot.val())) {
                        user_post['user'] = current_user.uid;
                        user_post['id'] = post_id;
                        posts_array.push(user_post);
                        console.log(posts_array);
                        setPosts(posts_array);
                    }
                }
            });
        }
    }

    // set background color
    document.body.style.background = 'rgb(250,100,100)';

    return <React.Fragment>
        <div className='profile-container'>
        <h1>USER PROFILE</h1>
        {/* user profile image */}
        <img src={profile_image} />
        {/* user profile image upload */}
        <input type="file" ref={file_ref} onChange={(event) => {
            // get the image file
            const image_file = event.target.files[0];

            // check for valid image file
            if(!(image_file===null) || !(image_file===undefined)) {
                // get firebase database reference
                const database_ref = d_ref(db,`USERS/${current_user.uid}`);
                // get firebase storage reference
                const storage_ref = s_ref(storage,`PROFILE/${current_user.uid}/${image_file.name}`);
                
                // upload the image file
                uploadBytes(storage_ref,image_file).then((snapshot) => {
                    // get the download url
                    getDownloadURL(storage_ref)
                        .then((url) => {
                            // set user profile image url
                            update(database_ref, {
                                image_url: url
                            });
                        });
                });
            }
            
        }}/>
        {/* button for user profile image upload */}
        <button onClick={() => {
            file_ref.current.click();
        }}>EDIT PROFILE IMAGE</button>
        {/* user profile name */}
        <input type="text" ref={name_ref} onChange={(event) => {
            // use a timer to detect when user stops typing
            clearTimeout(timer);
            timer = setTimeout(() => {
                // get firebase database reference
                const database_ref = d_ref(db,`USERS/${current_user.uid}`);
                // set user profile name
                update(database_ref, {
                    name: name_ref.current.value
                });
            },2000);
        }} />
        {/* user email */}
        <p>{ current_user===null ? "" : current_user.email }</p>
        {/* <div className='all-posts'>
            { posts.map((post) => <Post key={post.name} post={post} />) }
        </div> */}
    </div>
    <h2 className='user-posts-header'>POSTS</h2>
    <div className='all-posts user-posts'>
        { posts===null ? null : posts.map((post) => <Post key={post.name} post={post} current_user={current_user} />) }
    </div>
    </React.Fragment>
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