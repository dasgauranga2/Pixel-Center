import React, { useRef,useEffect,Navigate } from 'react';
import { getAuth,signOut,onAuthStateChanged } from 'firebase/auth';
import { useNavigate }  from 'react-router-dom';
import PropTypes from 'prop-types';
import { auth } from '../firebase-config';

// create a functional component
// the component takes the props as parameter
function Home(props) {

    // function to navigate to another page 
    const navigate = useNavigate();

    // check if user is logged in
	onAuthStateChanged(auth, (user) => {
		if (user) {
            console.log("USER");
		} 
		else {
            console.log("NO USER");
            // if user is not logged in naivigate to sign in page
			navigate('/signin');
		}
	});

    return <div>
        <h1>HOME PAGE</h1>
        <button onClick={() => {
            auth.signOut();
        }}>SIGN OUT</button>
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