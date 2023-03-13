import { useState } from 'react';
import './App.css';
import { FaCalendarAlt, FaTrashAlt } from 'react-icons/fa';
import appointmentList from './data.json';

function App() {
  let [toggleForm, setToggleForm] = useState(false);
  return (
    <div className="container">
      <div>
        <h2 className='text-center mt-5'><FaCalendarAlt color='blue' />ACMADE Appointment</h2>
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
       {
        appointmentList.map((appt, index) => (
          <li key={index}>
            <div className='apptList'>
              <button><FaTrashAlt color='red' size={25}/></button>
              <h4>Name: {appt.petName}</h4>
              <h6>owner Name: {appt.ownerName}</h6>
              <p>Notes: {appt.aptNotes}</p>
              <span>{appt.aptDate}</span>
            </div>
          </li>
        ))
       }
      </ul>
      </div>
    </div>
  );
}

export default App;
