import React, {useState} from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utilities/firebase/firebase.utilities';
import { Button } from '../button/button.component';
import { FormInput } from '../form-input/form-input.component';
import './sign-up-form.styles.scss'
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

export const SignUpForm = () => {
    const [formFields, setFormFields]=useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields
    console.log(formFields);

    const resetFormFields = ()=>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(password !== confirmPassword) return
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        }
        catch(error){
            console.error(error);
        }
        // const {user} = await createAuthUserWithEmailAndPassword(email, password);
        // console.log(user);
        // const userDocRef = await createUserDocumentFromAuth(user);
        // console.log(userDocRef);
        alert(`User ${displayName} succesfully created`);
    }

    const handleChange = e =>{
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value})
    }
  return (
    <div className='sign-up-container'>
        <h2>Don't have an account</h2>
        <span>Sign up with email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput label='Display Name' required type="text" onChange={handleChange} name='displayName' value={displayName} />

            <FormInput label='Email' required type="email" onChange={handleChange} name='email'value={email}/>

            <FormInput label='Password' required type="password" onChange={handleChange} name='password'value={password}/>

            <FormInput label='Confirm Password' required type="password" onChange={handleChange} name='confirmPassword'value={confirmPassword}/>
            <Button type="submit" children={'Sign Up'}/>
        </form>
    </div>
  )
}
