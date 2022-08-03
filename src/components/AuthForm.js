import React, { useRef } from 'react';
import PropTypes from 'prop-types';

// create a functional component
// the component takes the props as parameter
function AuthForm(props) {
    // create ref for email and password
    const email_ref = useRef(null);
    const password_ref = useRef(null);

    return <form className='auth-form'>
        <h2>{props.header}</h2>
        <p>Email</p>
        <input type="text" ref={email_ref} />
        <p>Password</p>
        <input type="text" ref={password_ref} />
        {/* submit button */}
        <input value="SUBMIT" type="submit" onClick={(event) => {
            event.preventDefault();
            props.auth(props.header,email_ref.current.value,password_ref.current.value);
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

export default AuthForm;