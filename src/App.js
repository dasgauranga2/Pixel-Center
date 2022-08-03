import React from 'react';
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
// import the components
import AuthForm from './components/AuthForm';
import { auth } from './firebase-config';

function App() {

	// function for user authentication
	function auth_user(header,email,password) {
		// user signup
		if (header === "SIGNUP") {
			// create a new user using email and password
			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					// signed in user
					const user = userCredential.user;
					console.log(user);
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
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					console.log(errorMessage);
				});
		}
	}

    return <React.Fragment>
		{/* component for user signup */}
		<AuthForm header="SIGNUP" auth={auth_user} />

		{/* component for user signin */}
		<AuthForm header="SIGNIN" auth={auth_user} />
	</React.Fragment>
}

export default App;
