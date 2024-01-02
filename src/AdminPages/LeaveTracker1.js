import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Sidebar from '../components/Sidebar';
import Modal from 'react-modal';
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import  DialogContentText  from '@mui/material/DialogContentText';
import { Button } from '@mui/material';

const localizer = momentLocalizer(moment);

const LeaveTracker1 = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Make a GET request to your API endpoint
    fetch('http://localhost:8080/bytesfarms/leave/get?userId=0')
      .then((response) => response.json())
      .then((data) => {
        // Process the API response data and format it for the calendar
        const formattedEvents = data.map((event) => ({
          id: event.id,
          title: `${event.leaveType} - ${event.user.username}`,
          start: new Date(event.startDate),
          end: new Date(event.endDate),
          description: event.description,
          status: event.status,
        }));

        // Update the events state with the formatted data
        setEvents(formattedEvents);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    setStatus(event.status);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleStatusUpdate = () => {
    fetch(`http://localhost:8080/bytesfarms/leave/updateStatus/${selectedEvent.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    })
      .then((response) => response.json())
      .then((data) => {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === selectedEvent.id ? { ...event, status: data.status } : event
          )
        );
        setIsModalOpen(false);
      })
      .catch((error) => console.error('Error updating status:', error));
  };

  return (
    <>
      <Sidebar />
      <main className='m-5' style={{ backgroundColor: '#F0F5FD' }}>
        <h3 className='mb-3'>Leave Calendar</h3>
        <BigCalendar
          events={events}
          localizer={localizer}
          components={{
            eventWrapper: ({ event, children }) => (
              <div
                onContextMenu={(e) => {
                  alert(`${event.title} is clicked.`);
                  e.preventDefault();
                }}
                onClick={() => handleEventClick(event)}
              >
                {children}
              </div>
            ),
          }}
          style={{ height: 500 }}
        />

        {/* Leave Details Modal */}

        <Dialog  open={isModalOpen}
          onRequestClose={handleModalClose}>
        <DialogTitle style={{ fontSize: "28x", fontWeight: "600" }}>
        {selectedEvent?.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{paddingTop:'10px', fontSize:'20px'}}>Description: {selectedEvent?.description}</DialogContentText>
          <DialogContentText sx={{padding:'10px 0px 10px 0px', fontSize:'20px'}}>Status: {selectedEvent?.setStatus}</DialogContentText>

          
         

         
          <TextField
            id="role"
            select
            label="Role"
            fullWidth
            variant="standard"
            // value={role}
            // onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem >Admin</MenuItem>
            <MenuItem >User</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleModalClose}
            className=" text-white"
            style={{ backgroundColor: "#1B1A47" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleStatusUpdate}
            className=" text-white"
            style={{ backgroundColor: "#1B1A47" }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

{/* <Modal
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          contentLabel='Leave Details'
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor:'gray'
            },
          }}
        >
          <h2>{selectedEvent?.title}</h2>
          <p>Description: {selectedEvent?.description}</p>
          <p>Status: {selectedEvent?.status}</p>
          <div>
            <label htmlFor='status'>Update Status:</label>
            <select
              id='status'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value='Pending'>Pending</option>
              <option value='Approved'>Approved</option>
              <option value='Rejected'>Rejected</option>
            </select>
          </div>
          <button onClick={handleStatusUpdate}>Update Status</button>
          <button onClick={handleModalClose}>Close</button>
        </Modal>         */}
      </main>
    </>
  );
};

export default LeaveTracker1;
