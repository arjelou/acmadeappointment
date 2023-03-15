import React, { useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup ,signOut } from 'firebase/auth';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // console.log(auth?.currentUser?.photoURL);

// SING WITH EMAIL AND PASSWORD
const singIn = async (e) =>{
    e.preventDefault();
    try{
        await createUserWithEmailAndPassword(auth, email, password)
        alert('Sigin Successfuly!')
    }catch(err){
        console.error(err);
    }
}
//SIGN WITH GOOGLE ACCOUNT
const singInWithGoogle = async (e) =>{
    e.preventDefault();
    try{
        await signInWithPopup(auth,googleProvider)
        alert('Sigin Successfuly!')
    }catch(err){
        console.error(err);
    }
}
//SIGN out
const singInOut = async (e) =>{
    e.preventDefault();
    try{
        await signOut(auth)
        alert('Sginout Successfuly!')
    }catch(err){
        console.error(err);
    }
}

  return (
    <div>
        <form>
            <input type='email' placeholder='...email' name='email'
            onChange={(e) =>setEmail(e.target.value)} />

            <input type='password' placeholder='...password' name='password'
            onChange={(e) =>setPassword(e.target.value)}
            />
            <button onClick={singIn}>Sign in</button>
            <button onClick={singInWithGoogle}>Sign in with Google</button>
            <button onClick={singInOut}>Logout</button>

        </form>
    </div>
  )
}
