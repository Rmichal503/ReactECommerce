import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDh0q0KCNpr6NZLgQJu55akZy_vN3NuBTg",
    authDomain: "react-ecommerce-aa6de.firebaseapp.com",
    projectId: "react-ecommerce-aa6de",
    storageBucket: "react-ecommerce-aa6de.appspot.com",
    messagingSenderId: "15211828823",
    appId: "1:15211828823:web:d63306c57bbef335c27512"
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth= getAuth();
export const signInWithGooglePopup = ()=> signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) =>{
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot)

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName, email, createdAt
            })
        }catch(error){
            console.error('error creating the user', error);
        }
    }
    return userDocRef;
}