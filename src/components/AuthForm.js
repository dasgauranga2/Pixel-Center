import React, { useRef,useState } from 'react';
import PropTypes from 'prop-types';
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import { ref as d_ref,set,push } from 'firebase/database';
import { auth,db } from '../firebase-config';
import { useNavigate,Link }  from 'react-router-dom';

// create a functional component
// the component takes the props as parameter
function AuthForm(props) {
    // create ref for user fields
    const email_ref = useRef(null);
    const password_ref = useRef(null);
    const name_ref = useRef(null);
    // ref for warning message
    const warning_ref = useRef(null);
    // function to navigate to another page 
    const navigate = useNavigate();

    // function to check if email is valid
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    // function for user authentication
	function auth_user(header,email,password,name=null) {
		if(email==="" || !isValidEmail(email)) {
            warning_ref.current.innerText = "Invalid Email";
        }
        else if(password==="") {
            warning_ref.current.innerText = "Invalid Password";
        }
        else if(header==="SIGNUP" && name==="") {
            warning_ref.current.innerText = "Invalid Name";
        }
        else {
            // user signup
            if (header === "SIGNUP") {
                // create a new user using email and password
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // signed in user
                        const user = userCredential.user;
                        console.log(user);
                        // get firebase database reference
                        const database_ref = d_ref(db,`USERS/${user.uid}`);
                        // set user name
                        set(database_ref, {
                            name: name
                        });
                        // navigate to home page
                        navigate('/');
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorMessage);
                    });
            } // user signin
            else if (header === "SIGNIN") {
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // signed in user 
                        const user = userCredential.user;
                        console.log(user);
                        // navigate to home page
                        navigate('/');
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorMessage);
                        warning_ref.current.innerText = "Wrong Username/Password";
                    });
            }
        }
	}

    // set background color
    document.body.style.background = 'rgb(100,140,240)';
    // set title
    document.title = "Pixel Center";

    if (props.header === "SIGNIN") {
        return <div className='auth-container'>
            <Link to='/signup'>SIGNUP</Link>
            <form className='auth-form'>
                <h2>{props.header}</h2>
                <p className='warning-message' ref={warning_ref}></p>
                <input key="signin-email" type="text" placeholder='Email' ref={email_ref} />
                <input key="signin-password" type="password" placeholder='Password' ref={password_ref} />
                {/* submit button */}
                <input key="signin-submit" value="LOGIN USER" type="submit" onClick={(event) => {
                    event.preventDefault();
                    auth_user(props.header,email_ref.current.value,password_ref.current.value);
                }} />
            </form>
        </div> 
    }
    else if (props.header === "SIGNUP") {
        return <div className='auth-container'>
            <Link to='/signin'>SIGNIN</Link>
            <form className='auth-form'>
                <h2>{props.header}</h2>
                <p className='warning-message' ref={warning_ref}></p>
                <input key="signup-email" type="text" placeholder='Email' ref={email_ref} />
                <input key="signup-password" type="password" placeholder='Password' ref={password_ref} />
                <input key="signup-name" type="text" placeholder='Name' ref={name_ref} />
                {/* submit button */}
                <input key="signup-submit" value="CREATE USER" type="submit" onClick={(event) => {
                    event.preventDefault();
                    auth_user(props.header,email_ref.current.value,password_ref.current.value,name_ref.current.value);
                }} />
            </form>
        </div> 
    }
}

// // default values for props if no data is given
// Header.defaultProps = {
//     text: 'DEFAULT'
// };

// // define the type of data for each prop
// Header.propTypes = {
//     text: PropTypes.string.isRequired
// };

export default AuthForm;