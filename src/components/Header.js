import React from 'react';
import PropTypes from 'prop-types';

// create a functional component
// the component takes the props as parameter
function Header(props) {
    return <header>
        {/* access data passed to the component using props */}
        {/* add css styling using the 'style' attribute */}
        <h2 style={{color:'red'}}>{ props.text }</h2>
    </header>
}

// default values for props if no data is given
Header.defaultProps = {
    text: 'DEFAULT'
};

// define the type of data for each prop
Header.propTypes = {
    text: PropTypes.string.isRequired
};

export default Header;