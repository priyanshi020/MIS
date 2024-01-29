import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const TaskList = () => {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);
  const storedUserId = localStorage.getItem("userId");
  const userId = storedUserId ? parseInt(storedUserId, 10) : null;
  React.useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get(`http://localhost:8080/bytesfarms/tasks/get?userId=${userId}&date=Today`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  const handleDelete = (taskId) => {
    // Make API call to delete the task with taskId
    axios.delete(`http://localhost:8080/bytesfarms/tasks/delete?taskId=${taskId}`)
      .then(response => {
        // Remove the deleted task from the state
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container maxWidth='382px'>
        <Grid item xs={6} md={12}>
          <Demo sx={{borderRadius:'10px'}}>
            <h5 className='pt-3 text-bold text-center'>
              Task List
            </h5>
            {tasks.length>0 ? (
            <List dense={dense} sx={{ height: '250px',
            overflowY: 'auto'}}>
              {tasks.map(task => (
                <ListItem key={task.id} >
                  {/* <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar> */}
                  <ListItemText
                    primary={task.taskDescription}
                    secondary={secondary ? task.taskDescription : null}
                    sx={{
                      borderLeft: "4px solid red", 
                      paddingLeft: 2, 
                     
                    }}
                  />
                   <button
                  type="button"
                  className={`btn ${
                    task.status === "in progress"
                      ? "btn-outline-success"
                      : task.status === "Started"
                      ? "btn-outline-warning"
                      : "btn-outline-danger"
                  }`}
                  style={{ minWidth: "100px" }}
                >
                  {task.status}
                </button>
                </ListItem>
              ))}
            </List>
            ):(
            <div className='d-flex justify-content-center align-items-center   ' style={{padding:'95px'}}>
              <img src="/assets/task-icon.png" alt="task"/>
            </div>
          )}
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskList;
