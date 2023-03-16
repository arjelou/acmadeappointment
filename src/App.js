/* eslint-disable no-unused-expressions */
import { useState, useEffect } from 'react';
import './App.css';
import { FaCalendarAlt,FaTrashAlt } from 'react-icons/fa';
import Auth from './component/Auth';
import { db, auth } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

function App() {
//   let [appointmentList, setAppointmentList] = useState([]);
  let [toggleForm, setToggleForm] = useState(false);

  //FIREBASE
  const [movieList, setMovieList] = useState([]);

  //ADD NEW MOVIE
  const [NewMovie, setNewMovie] = useState('');
  const [newreleaseDate, setReleaseDate] = useState(0);
  const [isOscar, setIsOscar] = useState(false);

  //UPDATE MOVIE TITLE
  const [updateTitle, setUpdateTitle] = useState('');

  const movieCollectionRef = collection(db, "movies")

// const fetchData = useCallback( () => {
//   fetch('./data.json')
//   .then((response) =>response.json())
//   .then(data => {
//     setAppointmentList(data)
//   });
// },[])
//TO CREATE A SNAPSHOOT TO THE NEW DATA ADD
const getMovieList = async () =>{

      try{
        const data = await getDocs(movieCollectionRef);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setMovieList(filteredData);
        console.log('Filter Data:',filteredData);
        console.log('Current User:', auth?.currentUser?.email);
    }catch(err){
        console.error(err);
    }
};

useEffect(() =>{
    getMovieList();
},[]);
// useEffect(() =>{
//   fetchData()
// },[fetchData]);

//add new movie function
const addNewMovie = async () =>{
  try{  
    await addDoc(movieCollectionRef,{
          title: NewMovie,
          releaseDate: newreleaseDate,
          haveOscar: isOscar,
          userId: auth?.currentUser?.uid,
      });
  
      getMovieList();
    }catch(err){
      console.error(err);
    }
};

//DELETE MOVIE
const deleteMovie = async (id) =>{
    const deleteMovieDoc = doc(db, 'movies', id);
    await deleteDoc(deleteMovieDoc);
}
//UPDATE TITLE MOVIE
const updateTitlename = async (id) =>{
  const updateMovieDoc = doc(db, 'movies', id);
  await updateDoc(updateMovieDoc, {title: updateTitle});
}
const userAvatar = auth?.currentUser?.photoURL;
const userEmail = auth?.currentUser?.email;

  return (
    <div className="container">
    <div>
    <img src={userAvatar} alt='aaa'/>
    <p>{userEmail}</p>
        < Auth />
    </div>
    {/* form for new movie add */}
    <div>
        <div className="mb-3">
        <input type="text" className="form-control" placeholder="Movie Title" 
            onChange={(e) => setNewMovie(e.target.value)}
        />
        </div>
        <div className="mb-3">
        <input type="number" className="form-control" placeholder="Release Date" 
            onChange={(e) => setReleaseDate(Number(e.target.value))}
        />
        </div>
        <div className="mb-3">
        <label>Have Oscar :</label>
        <input type="checkbox" checked={isOscar}
            onChange={(e) => setIsOscar(e.target.value)}
        />
        </div>
        <div className="mb-3">
        <button onClick={addNewMovie} className='btn btn-primary'>Save</button>
        </div>
    </div>
      <div>
        <h2 className='text-center mt-5' inline-flex ><FaCalendarAlt color='gray' size={25}/> Appointment func</h2>
      </div>
      <div>
        <button onClick={() =>{setToggleForm(!toggleForm)}} className='form-control mb-2 mt-5'>Add New Appointment</button>
        {
          toggleForm && 
          <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Pet Name</label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Owner Name</label>
            <input type="text" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Appointment Notes</label>
            <textarea typeof='text' className='form-control' />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Appointment Date</label>
            <input type="date" className="form-control" id="exampleInputPassword1" />
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
        }
      </div>
      <div className='search'>
        <input className='form-control' type="search" name="search" placeholder="...search" />
        <button type="submit" className="btn btn-primary">Filter</button>
      </div>
      <div>
      <ul className="list-group list-group-flush">
      {/* DISPLAY THE DATA HERE FORM FIREBASE */}
      {
        movieList.map((movie, index) => (
            <div key={index}>
                <button onClick={() => deleteMovie(movie.id)}><FaTrashAlt color='red' size={25}/></button>
                <h3 style={{color: movie.haveOscar ? 'yellow' : 'red'}}>{movie.title}</h3>
                <p>Release Date: {movie.releaseDate}</p>
                <div>
                  <input type="text" name="updateTitleName" placeholder='Update Titile Name...' onChange={(e) =>setUpdateTitle(e.target.value)}/>
                  <button onClick={() => updateTitlename(movie.id)}>Update</button>
                </div>
            </div>

        )  
        )
      }
       {/* {
       appointmentList.map((appt) => (
          <li key={appt.id}>
            <div className='apptList'>
              <button>
              <FaTrashAlt color='red' size={25}/></button>
              <h4>{appt.petName}</h4>
              <h6>Owner: {appt.ownerName}</h6>
              <p>Notes: {appt.aptNotes}</p>
              <span>{appt.aptDate}</span>
            </div>
          </li>
        ))
       } */}
      </ul>
      </div>
    </div>
  );
}
export default App;
