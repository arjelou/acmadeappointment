import React from 'react';
import { FaCalendarAlt, FaTrashAlt } from 'react-icons/fa';
import AddAppointmentForm from './component/addAppointmentForm';


export default class home extends React.Component {
constructor(props) {
    super(props);
    this.state = {
    data: [],
    }
}

componentDidMount() {
    fetch('./data.json')
    .then((res) => res.json())
    .then((respnse) => {
        this.setState({
            data: [...respnse]
        })
    })
}


render() {
    return (
        
    <div className="container">
    <div>
    <h2 className='text-center mt-5' inline-flex ><FaCalendarAlt color='gray' size={25}/> Appointment</h2>
    </div>
    <div>
    <AddAppointmentForm />
        {/* This is functional component Hooks */}
    </div>
    <div className='search'>
    <input className='form-control' type="search" name="search" placeholder="...search" />
    <button type="submit" className="btn btn-primary">Filter</button>
    </div>
    <div>
    <ul className="list-group list-group-flush">
    {
    this.state.data.map((appt) => (
        <li key={appt.id}>
        <div className='apptList'>
            <button onClick={(e) => this.deleteRow(appt.id)}>
            <FaTrashAlt color='red' size={25}/></button>
            <h4>{appt.petName}</h4>
            <h6>Owner: {appt.ownerName}</h6>
            <p>Notes: {appt.aptNotes}</p>
            <span>{appt.aptDate}</span>
        </div>
        </li>
    ))
}
    </ul>
    </div>
</div>
        )
}
 
}
