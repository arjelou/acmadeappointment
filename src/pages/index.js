/* eslint-disable no-unused-expressions */
import { useState, useEffect } from 'react';
import '../App.css';
import Navbar from '../component/navmain';
import { FaRegCalendarAlt, FaTrashAlt, FaPencilAlt, FaPlus } from 'react-icons/fa';
import Auth from '../component/Auth';
import { db, auth } from '../config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

function Index() {
//   let [appointmentList, setAppointmentList] = useState([]);
  let [toggleForm, setToggleForm] = useState(false);

  //FIREBASE
  const [scheduleList, setScheduleList] = useState([]);

  //ADD NEW schedule
  const [newTopic, setNewTopic] = useState('');
  const [newDateTime, setDateTime] = useState(0);
  const [newNote, setNote] = useState('');

  //UPDATE MOVIE TITLE
  const [updateTitle, setUpdateTitle] = useState('');

  const movieCollectionRef = collection(db, "movies")

const getMovieList = async () =>{
      try{
        const data = await getDocs(movieCollectionRef);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setScheduleList(filteredData);
        console.log('Filter Data:',filteredData);
        console.log('Current User:', auth?.currentUser?.email);
    }catch(err){
        console.error(err);
    }
};

useEffect(() =>{
    getMovieList();
},[]);

//add new movie function
const addNewMovie = async () =>{
  try{  
    await addDoc(movieCollectionRef,{
          title: newTopic,
          schDate: newDateTime,
          schNote: newNote,
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
    try{
    await deleteDoc(deleteMovieDoc);
    getMovieList();
    }catch(err){
      console.error(err);
    }
}
//UPDATE TITLE MOVIE
const updateTitlename = async (id) =>{
  const updateMovieDoc = doc(db, 'movies', id);
  try{
  await updateDoc(updateMovieDoc, {title: updateTitle});
  getMovieList();
  }catch(err){
    console.error(err);
  }
}
const userAvatar = auth?.currentUser?.photoURL;
const userEmail = auth?.currentUser?.email;

  return (
    <>
      <div className='container'>
        <Navbar />
      </div>
      {/* auth */}
      {/* <div>
        <img src={userAvatar} alt='aaa'/>
        <p>{userEmail}</p>
            < Auth />
      </div> */}
    <div className="container">
   
    {/* form for new movie add */}
    <div className='main-content'>
      <div className='btn_add_search'>
        <input type="search" name="search" className='form-control' placeholder='search...'/>
        <button onClick={() =>{setToggleForm(!toggleForm)}} className='btn btn-primary'>{!toggleForm ? <FaPlus /> : 'close'}</button>
      </div>
      {
          toggleForm && 
        <div className='toggleform'>
            <div className="mb-3">
              <label>Topic</label>
              <input type="text" className="form-control" placeholder="..." 
                  onChange={(e) => setNewTopic(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Date/Time</label>
                <div className='date_time'>
                  <input type="datetime-local" className="form-control" placeholder="..." 
                  onChange={(e) => setDateTime(e.target.value)}
                  />                                             
                </div>
            </div>
            <div className="mb-3">
              <label>Notes</label>
              <textarea type="time" className="form-control" placeholder="Notes..."
                  onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <button onClick={addNewMovie} className='btn btn-primary px-4'>Save</button>
            </div>
        </div>
      }
      <ul className="list-group list-group-flush">
      {/* DISPLAY THE DATA HERE FORM FIREBASE */}
      {
        scheduleList.map((movie, index) => (
            <div key={index} className='listOfSchedule'>
                  <div className='listOfSchedule_icons'>
                    <FaTrashAlt title='Delete Note' onClick={() => deleteMovie(movie.id)} className='icon_delete'/>
                    <FaPencilAlt title='Edit Note' className='icon_edit'/>
                  </div>
                <h3>{movie.title}</h3>
                <p><FaRegCalendarAlt className='icon_calendar'/> {movie.schDate.toString()}</p>
                <span><strong>Note:</strong> {movie.schNote}</span>
                {/* <div>
                  <input type="text" name="updateTitleName" placeholder='Update Titile Name...' onChange={(e) =>setUpdateTitle(e.target.value)}/>
                  <button onClick={() => updateTitlename(movie.id)}>Update</button>
                </div> */}
            </div>
        )  
        )
      }
      </ul>
    </div>
      {/* <div>
        <h2 className='text-center mt-5' inline-flex ><FaCalendarAlt color='gray' size={25}/> Appointment func</h2>
      </div> */}
      {/* <div>
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
      </div> */}
      {/* <div className='search'>
        <input className='form-control' type="search" name="search" placeholder="...search" />
        <button type="submit" className="btn btn-primary">Filter</button>
      </div> */}
      <div>
      
      </div>
    </div>
  </>
  );
}
export default Index;
