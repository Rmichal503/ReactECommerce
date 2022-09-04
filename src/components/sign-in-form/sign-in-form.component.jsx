import React, {useState} from 'react'
import { Button } from '../button/button.component'
import { FormInput } from '../form-input/form-input.component'
import {signInWithGooglePopup, createUserDocumentFromAuth, signInWithEmail} from '../../utilities/firebase/firebase.utilities';
import './sign-in-form.styles.scss'
const defaultFormFields = {
    email:'',
    password:''
}

export const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = ()=>{
        setFormFields(defaultFormFields);
    }

    const handleChange = e =>{
        console.log(e);
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value})
    }

    const logGoogleUser = async ()=>{
        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
    }
    const logWithEmail = async()=>{
        try{
            await signInWithEmail(email,password);
            resetFormFields();
        }catch(error){
            switch (error) {
                case 'auth/wrong-password':
                    alert('inncorect password!')
                    break;
                case 'auth/user-not-found':
                    alert('there is not such user!')
                    break;
                default:
                    console.log(error);
                    break;
            }
        }
        
    }
  return (
    <div>
        <h1>SignIn</h1>
        <FormInput required label={'Email'} type='text' name='email' onChange={handleChange} value={email}/>
        <FormInput required label={'Password'} type='password' name='password' onChange={handleChange} value={password}/>
        <div className="buttons-container">
            <Button onClick={logWithEmail}>
                Sign in
            </Button>
            <Button buttonType={'google'} onClick={logGoogleUser}>
                Sign in with Google
            </Button>
        </div>
    </div>
  )
}
