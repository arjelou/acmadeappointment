import './App.css';
import { FaCalendarAlt, FaTrashAlt } from 'react-icons/fa';
import appointmentList from './data.json';

function App() {
  return (
    <div className="container">
      <div>
        <h2><FaCalendarAlt color='blue' />ACMADE Appointment</h2>
      </div>
      <div>
        <form>
          <div class="mb-3 mt-5">
            <label for="exampleInputEmail1" class="form-label">Pet Name</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Owner Name</label>
            <input type="text" class="form-control" id="exampleInputPassword1" />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Appointment Notes</label>
            <textarea typeof='text' class='form-control' />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Appointment Date</label>
            <input type="date" class="form-control" id="exampleInputPassword1" />
          </div>
          <button type="submit" class="btn btn-primary">Save</button>
        </form>
      </div>
      <div>
      <ul class="list-group list-group-flush">
       {
        appointmentList.map((appt) => (
          <> 
            <li class="list-group-item">Name: {appt.petName}
            <p>owner Name: {appt.ownerName}</p>
            <span>Notes: {appt.aptNotes}</span>< br />
            <span>Date: {appt.aptDate}</span>
            <button><FaTrashAlt color='red'/></button>
            </li>
            
          </>
          
        ))
       }
      </ul>
      </div>
    </div>
  );
}

export default App;
