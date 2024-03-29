import {initializeApp} from 'firebase/app';
import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth= getAuth();
export const signInWithGooglePopup = ()=> signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) =>{
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot)

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName, email, createdAt,...additionalInformation,
            })
        }catch(error){
            console.error('error creating the user', error);
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async(email, password)=>{
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInWithEmail = async(email,password) =>{
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password);
}

export const signOutUser = async ()=>{
    await signOut(auth);
}

export const onAuthStateChangedListener = (callback)=> onAuthStateChanged(auth,callback )