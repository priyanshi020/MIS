import React, { useState, useEffect } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Sidebar from "../components/Sidebar";
import Modal from "react-modal";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import DialogContentText from "@mui/material/DialogContentText";
import { Button } from "@mui/material";

const localizer = momentLocalizer(moment);

const LeaveTracker1 = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const approved = "Approved";
  const rejected = "Rejected";

  useEffect(() => {
    fetch("http://localhost:8080/bytesfarms/leave/get?userId=0")
      .then((response) => response.json())
      .then((data) => {
        const formattedEvents = data.map((event) => ({
          id: event.id,
          title: `${event.leaveType} - ${event.user.username}`,
          username: `${event.user.username}`,
          leaveType: `${event.leaveType}`,
          start: new Date(event.startDate),
          end: new Date(event.endDate),
          description: event.description,
          status: event.status,
        }));

        setEvents(formattedEvents);
      })
      .catch((error) => console.error("Error fetching data:", error));
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
    fetch(
      `http://localhost:8080/bytesfarms/leave/update?leaveRequestId=${selectedEvent.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === selectedEvent.id
              ? { ...event, status: data.status }
              : event
          )
        );
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        setIsModalOpen(false);
      });
  };

  return (
    <>
      <Sidebar />
      <main className="" style={{ backgroundColor: "#F0F5FD" }}>
        <div className="p-4">
          <h3 className=" pb-3">Leave Calendar</h3>
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

          <Dialog
            open={isModalOpen}
            onRequestClose={handleModalClose}
            fullWidth
            maxWidth="sm"
            onExited={handleModalClose}
          >
            <DialogTitle style={{ fontSize: "30x", fontWeight: "600" }}>
              {selectedEvent?.username}
            </DialogTitle>
            <div className="col-md-3  ml-2  ">
              <Button
                style={{
                  padding: "8px",
                  fontSize: "15px",
                  color: "black",
                  backgroundColor: "#FEDEED",
                  borderRadius: "21px",
                  fontWeight: "bold",
                }}
              >
                {selectedEvent?.leaveType}
              </Button>
            </div>
            <DialogContent>
              <DialogContentText sx={{ fontSize: "20px" }}>
                Description:{" "}
              </DialogContentText>
              <DialogContentText
                sx={{
                  paddingTop: "3px",
                  paddingBottom: "15px",
                  fontSize: "18px",
                  color: "black",
                }}
              >
                {selectedEvent?.description}
              </DialogContentText>

              <TextField
                id="role"
                select
                label="Status"
                fullWidth
                variant="standard"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={approved}>Approved</MenuItem>
                <MenuItem value={rejected}>Rejected</MenuItem>
              </TextField>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleStatusUpdate}
                className=" text-white"
                style={{ backgroundColor: "#1B1A47" }}
              >
                Update
              </Button>
              <Button
                onClick={handleModalClose}
                className=" "
                style={{
                  color: "#1B1A47",
                  backgroundColor: "white",
                  borderColor: "#1B1A47",
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </main>
    </>
  );
};

export default LeaveTracker1;
