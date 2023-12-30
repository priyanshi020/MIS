import React ,{useState,useEffect} from 'react'
import Sidebar1 from '../components/Sidebar1'
import axios from 'axios';

const Attendance1 = () => {
  const[data,setData]=useState();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Retrieve the user ID from local storage
    const storedUserId = localStorage.getItem("userId");

    if (storedUserId) {
      // Set the user ID in the component state
      setUserId(storedUserId);
    }
  }, []);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get( `http://localhost:8080/bytesfarms/timesheet/totalhours?userId=${userId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  };

  
  return (
    <>
    <Sidebar1/>
    <main className='m-5'>
        <h3 className='mb-3'>ATTENDANCE</h3>
       
        <table class="    rounded-4 table table-responsive-lg  ">
            <thead class="table-secondary text-center">
              <tr className="">
                
                <th className="" style={{padding:'20px'}} >Day</th>
                <th className="" style={{padding:'20px'}}>month </th>
                <th className="" style={{padding:'20px'}}>year </th>
                <th className="" style={{padding:'20px'}}>Check In </th>
                <th className="" style={{padding:'20px'}}>Check Out </th>
               <th>Break Start</th>
                <th className="" style={{padding:'20px'}}>Status </th>
                
               

              </tr>
            </thead>
           {data ? (
  <tbody className="text-center">
    {data.map((item) => (
      <tr key={item.date}>
      
        <td className="text-center">{item.day}</td>
        <td>{item.month}</td>
        <td>{item.year}</td>
        <td>{item.checkInTime}</td>
        <td>{item.checkOutTime}</td>
        {item.breaks.map((breakItem, index) => (
      <React.Fragment key={breakItem.id}>
        <td>{breakItem.breakStartTime}</td>
        <td>{breakItem.breakEndTime || 'N/A'}</td>
        {index === item.breaks.length - 1 && (
          <td>{item.status}</td>
        )}
      </React.Fragment>
    ))}
        <td>{item.status}</td>
        
      </tr>
    ))}
  </tbody>
) : (
  <p>Loading...</p>
)}

          </table>
    </main>
    </>
  )
}

export default Attendance1