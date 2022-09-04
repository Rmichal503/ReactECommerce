import React, {useState,useContext} from 'react'
import { Button } from '../button/button.component'
import { FormInput } from '../form-input/form-input.component'
import {signInWithGooglePopup, createUserDocumentFromAuth, signInWithEmail} from '../../utilities/firebase/firebase.utilities';
import './sign-in-form.styles.scss'
import { UserContext } from '../../contexts/user.context';
const defaultFormFields = {
    email:'',
    password:''
}

export const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const {setCurrentUser}=useContext(UserContext)

    const resetFormFields = ()=>{
        setFormFields(defaultFormFields);
    }

    const handleChange = e =>{
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value})
    }

    const logGoogleUser = async ()=>{
        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
        setCurrentUser(user);
    }
    const logWithEmail = async()=>{
        try{
            const {user} = await signInWithEmail(email,password);
            resetFormFields();
            setCurrentUser(user)
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
    <div className='sign-in-container'>
        <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>
        <FormInput required label={'Email'} type='text' name='email' onChange={handleChange} value={email}/>
        <FormInput required label={'Password'} type='password' name='password' onChange={handleChange} value={password}/>
        <div className="buttons-container">
            <Button onClick={logWithEmail}>
                Sign in
            </Button>
            <Button type='button' buttonType={'google'} onClick={logGoogleUser}>
                Google sign in
            </Button>
        </div>
    </div>
  )
}
