import React from 'react';
import {signInWithGooglePopup, createUserDocumentFromAuth} from '../../utilities/firebase/firebase.utilities';
import { SignUpForm } from '../../components/sign-up-form/sign-up-form.component';


export const SignIn = () => {
    const logGoogleUser = async ()=>{
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

  return (
    <div>
        <h1>SignIn</h1>
        <button onClick={logGoogleUser}>
            Sign in with Google popup
        </button>
        <SignUpForm/>
    </div>
  )
}
