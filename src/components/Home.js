import React, { useState,useEffect } from 'react';
import { getAuth,signOut,onAuthStateChanged } from 'firebase/auth';
import { ref as d_ref,onValue } from 'firebase/database';
import { useNavigate }  from 'react-router-dom';
import PropTypes from 'prop-types';
import { auth,db } from '../firebase-config';
// import the components
import Post from '../components/Post';

// create a functional component
// the component takes the props as parameter
function Home(props) {

    // function to navigate to another page 
    const navigate = useNavigate();
    // current user state
    const [current_user, setCurrentUser] = useState(null);
    // all posts
    const [posts, setPosts] = useState(null);

    // FOLLOWING BLOCK OF CODE CHECKS IF USER IS LOGGED IN
    // RUNNING IT WILL CAUSE AN INFINITE LOOP
    // // check if user is logged in
	// onAuthStateChanged(auth, (user) => {
	// 	if (user) {
    //         // set the current user
    //         setCurrentUser(user);
    //         console.log("USER");
	// 	} 
	// 	else {
    //         // if user is not logged in naivigate to sign in page
	// 		navigate('/signin');
    //         console.log("NO USER");
	// 	}
	// });

    // 'useEffect' hook is used to perform side effects in the component
    // the function will run after the component jsx renders for the first time and then
    // every time one of the dependencies change
    useEffect(() => {
        // get firebase database reference
        const database_ref = d_ref(db,"POSTS/");
        // get posts data
        onValue(database_ref, (snapshot) => {
            // check if data exists
            if (!(snapshot.val() === null) && !(snapshot.val() === undefined)) {
                // array of posts
                const posts_array = [];
                // get each user's posts
                for(let [user,user_posts] of Object.entries(snapshot.val())) {
                    // get each post
                    for(let [post_id,post] of Object.entries(user_posts)) {
                        post['user'] = user;
                        post['id'] = post_id;
                        posts_array.push(post);
                        console.log(posts_array);
                        setPosts(posts_array);
                    }
                }
            }
        });

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
    },[]);

    return <div>
        <h1>HOME PAGE</h1>
        <button onClick={() => {
            auth.signOut();
        }}>SIGN OUT</button>
        <div className='all-posts'>
            { posts===null ? null : posts.map((post) => <Post key={post.name} post={post} current_user={current_user} />) }
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

export default Home;