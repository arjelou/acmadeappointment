import React, {useState} from 'react';

export default function addAppointmentForm() {

// eslint-disable-next-line react-hooks/rules-of-hooks
let [toggleForm, setToggleForm] = useState(false);
return (   
    <>
  

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
</>
  )
}
