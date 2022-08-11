import React, { useRef,useEffect, useState } from 'react';
import { getAuth,signOut,onAuthStateChanged } from 'firebase/auth';
import { ref as d_ref,set,push,onValue } from 'firebase/database';
import { useNavigate,Link }  from 'react-router-dom';
import PropTypes from 'prop-types';
import { auth,db,storage } from '../firebase-config';

// create a functional component
// the component takes the props as parameter
function Navbar() {

    // function to navigate to another page 
    const navigate = useNavigate();
    // current user state
    const [current_user, setCurrentUser] = useState(null);

    useEffect(() => {
        // check if user is logged in
        onAuthStateChanged(auth, (user) => {
        	if (user) {
                // set the current user
                setCurrentUser(user);
                console.log("USER");
        	} 
        	else {
                // set current user to null
                setCurrentUser(null);
        	}
        });
    },[]);

    return <div className='navbar-container'>
        <div></div>
        <Link to='/' className='nav-header' >Pixel Center</Link>
        <div className='nav-links'>
            <Link to='/profile' style={{display: current_user===null ? 'none' : 'flex'}}>PROFILE</Link>
            <Link to='/upload' style={{display: current_user===null ? 'none' : 'flex'}}>UPLOAD</Link>
            <button style={{display: current_user===null ? 'none' : 'flex'}} onClick={() => {
                auth.signOut();
            }}>LOGOUT</button>
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

export default Navbar;