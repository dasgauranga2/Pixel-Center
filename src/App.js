import React, { useState } from 'react';
import { BrowserRouter,Routes,Route,Link }  from 'react-router-dom';
// import the components
import AuthForm from './components/AuthForm';
import Home from './components/Home';
import Upload from './components/Upload';
import Profile from './components/Profile';

function App() {

    return <BrowserRouter>
	
		<Routes>
			{/* route for user signup */}
			<Route exact path='/signup' element={<AuthForm header="SIGNUP" />} />

			{/* route for user signin */}
			<Route exact path='/signin' element={<AuthForm header="SIGNIN" />} />

			{/* route for home page */}
			<Route exact path='/' element={<Home />} />

			{/* route for post upload */}
			<Route exact path='/upload' element={<Upload />} />

			{/* route for user profile */}
			<Route exact path='/profile' element={<Profile />} />
		</Routes>
		
	</BrowserRouter>
}

export default App;
