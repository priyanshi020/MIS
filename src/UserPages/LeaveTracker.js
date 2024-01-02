import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Sidebar from '../components/Sidebar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/system';
import { TextField } from '@mui/material';

const localizer = momentLocalizer(moment);

// Define custom styles using the styled utility
const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const CustomDialogContent = styled(DialogContent)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const CustomFormControl = styled(FormControl)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: '100%',
}));

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
        <Dialog open={isModalOpen} onClose={handleModalClose}>
        <DialogTitle style={{ fontSize: "30px", fontWeight: "600" }}>
        {selectedEvent?.title}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{fontSize:'20px'}}>
        Description: {selectedEvent?.description}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description" sx={{fontSize:'20px'}}>
        Status: {selectedEvent?.status}
          </DialogContentText>
          
          <TextField
            id="role"
            select
            label="Update Status"
            fullWidth
            variant="standard"
           
          >
            <MenuItem >Pending</MenuItem>
            <MenuItem >Approved</MenuItem>
            <MenuItem >Rejected</MenuItem>

          </TextField>
        </DialogContent>
        <DialogActions>
          <Button
         
            className=" text-white"
            style={{ backgroundColor: "#1B1A47" }}
          >
            Cancel
          </Button>
          <Button
            
            className=" text-white"
            style={{ backgroundColor: "#1B1A47" }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
        {/* <Dialog open={isModalOpen} onClose={handleModalClose}>
          <CustomDialogTitle>{selectedEvent?.title}</CustomDialogTitle>
          <CustomDialogContent>
            <p>Description: {selectedEvent?.description}</p>
            <p>Status: {selectedEvent?.status}</p>
            <CustomFormControl>
              <InputLabel htmlFor='status'>Update Status</InputLabel>
              <Select
                id='status'
                value={status}
                label='Update Status'
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value='Pending'>Pending</MenuItem>
                <MenuItem value='Approved'>Approved</MenuItem>
                <MenuItem value='Rejected'>Rejected</MenuItem>
              </Select>
            </CustomFormControl>
          </CustomDialogContent>
          <DialogActions>
            <Button variant='contained' onClick={handleStatusUpdate} color='primary'>
              Update Status
            </Button>
            <Button variant='contained' onClick={handleModalClose} color='secondary'>
              Close
            </Button>
          </DialogActions>
        </Dialog> */}
      </main>
    </>
  );
};

export default LeaveTracker1;
