import React, { useRef,useEffect, useState } from 'react';
import { getAuth,signOut,onAuthStateChanged } from 'firebase/auth';
import { ref as d_ref,set,push } from 'firebase/database';
import { ref as s_ref,uploadBytes,getDownloadURL } from 'firebase/storage';
import { useNavigate }  from 'react-router-dom';
import PropTypes from 'prop-types';
import { auth,db,storage } from '../firebase-config';

// create a functional component
// the component takes the props as parameter
function Upload(props) {

    // function to navigate to another page 
    const navigate = useNavigate();
    // current user state
    const [current_user, setCurrentUser] = useState(null);
    // ref for post name
    const name_ref = useRef();
    // ref for post images/files
    const image_ref = useRef();
    // ref for warning message
    const warning_ref = useRef(null);

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

    // set background color
    document.body.style.background = 'rgb(35,210,20)';
    // set title
    document.title = "Upload Post";

    return <form className='upload-form'>
        <h2>UPLOAD POST</h2>
        <p className='warning-message' ref={warning_ref}></p>
        <input type="text" placeholder='Post Name' ref={name_ref} />
        <input multiple type="file" ref={image_ref} />
        <input value="UPLOAD" type="submit" onClick={(event) => {
            event.preventDefault();

            // get firebase database reference
            const database_ref = push(d_ref(db,`POSTS/${current_user.uid}`));
            // array of image downlad urls
            const urls = [];
            // get the post name
            const post_name = name_ref.current.value;
            
            if (post_name.trim().length === 0) {
                warning_ref.current.innerText = "Empty Post Name";
            }
            else if(image_ref.current.files.length === 0) {
                warning_ref.current.innerText = "No images selected";
            }
            else {
                // iterate through the image files
                Array.from(image_ref.current.files).forEach((file) => {
                    // get firebase storage reference
                    const storage_ref = s_ref(storage,`POSTS/${current_user.uid}/${name_ref.current.value}/${file.name}`);
                    // upload the image file
                    uploadBytes(storage_ref,file).then((snapshot) => {
                        // get the download url
                        getDownloadURL(storage_ref)
                            .then((url) => {
                                urls.push(url);
                                // add post data to database
                                set(database_ref, {
                                    name: post_name,
                                    image_urls: urls
                                });
                                warning_ref.current.innerText = "Upload Success";
                            });
                    });
                });
            }

            // // after upload go to home page
			// navigate('/');
            
        }} />
    </form>
}

// // default values for props if no data is given
// Header.defaultProps = {
//     text: 'DEFAULT'
// };

// // define the type of data for each prop
// Header.propTypes = {
//     text: PropTypes.string.isRequired
// };

export default Upload;