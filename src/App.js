import React, { useState } from 'react';
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter,Routes,Route,Link }  from 'react-router-dom';
// import the components
import AuthForm from './components/AuthForm';
import Home from './components/Home';
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

    return <BrowserRouter>
	
		<Routes>
			{/* route for user signup */}
			<Route exact path='/signup' element={<AuthForm header="SIGNUP" auth={auth_user} />} />

			{/* route for user signin */}
			<Route exact path='/signin' element={<AuthForm header="SIGNIN" auth={auth_user} />} />

			{/* route for home page */}
			<Route exact path='/' element={<Home />} />
		</Routes>
		
	</BrowserRouter>
}

export default App;
