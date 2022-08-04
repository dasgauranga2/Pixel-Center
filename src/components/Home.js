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
        // get firebase database reference
        const database_ref = d_ref(db,"POSTS/");
        // get posts data
        onValue(database_ref, (snapshot) => {
            // array of posts
            const posts_array = [];
            // get each user's posts
            Object.values(snapshot.val()).forEach((user_post) => {
                // get each post
                Object.values(user_post).forEach((post) => {
                    posts_array.push(post);
                    console.log(posts_array);
                    setPosts(posts_array);
                });
            });
        });
    },[]);

    return <div>
        <h1>HOME PAGE</h1>
        <button onClick={() => {
            auth.signOut();
        }}>SIGN OUT</button>
        <div className='all-posts'>
            { posts.map((post) => <Post key={post.name} post={post} />) }
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