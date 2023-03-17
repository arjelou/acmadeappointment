import React from 'react';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup} from 'firebase/auth';


export default function popupModal() {

    const singInWithGoogle = async (e) =>{
        e.preventDefault();
        try{
            await signInWithPopup(auth,googleProvider)
            alert('Sigin Successfuly!')
        }catch(err){
            console.error(err);
        }
    }

return (
<div>
    <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Log in</button>           
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Log in</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <label>Email</label>
            <input type="email" class="form-control mb-3" />
            <label>Password</label>
            <input type="password" class="form-control" />
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-success px-5">Login</button>
        </div>
        <div class="modal-footer">
            <button onClick={singInWithGoogle} type="button" class="btn btn-outline-success form-control" data-bs-dismiss="modal">Login with Google</button>
        </div>
        </div>
    </div>
    </div>
</div>
)
}
