import React from 'react';
import '../App.css';
import PopupModal from './popupModal';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';


export default function navbar() {

  const Avatar = auth?.currentUser?.photoURL;

  const singInOut = async (e) =>{
    e.preventDefault();
    try{
        await signOut(auth)
        alert('Sginout Successfuly!')
        window.location = '/';
    }catch(err){
        console.error(err);
    }
}

  return (
    <div><nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">ACMADE Scheduler</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Privacy Policy</a>
          </li>
        </ul>
        <form className="d-flex gap-3" role="search">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src={Avatar} className='userProfile'/>
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Profile</a></li>
              <li><a className="dropdown-item" href="#">Settings</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#" onClick={singInOut}>Sign out</a></li>
            </ul>
          </li>
        </ul>
          {/* <button className="btn btn-success"type="submit">Sign up</button> */}
          {/* <PopupModal /> */}
        </form>
      </div>
    </div>
  </nav>
  </div>
  )
}
