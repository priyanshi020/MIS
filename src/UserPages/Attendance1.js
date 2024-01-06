import React ,{useState,useEffect} from 'react'
import Sidebar1 from '../components/Sidebar1'
import axios from 'axios';

const Attendance1 = () => {
  const[data,setData]=useState();
  
  const storedUserId = localStorage.getItem('userId');
  const userId = storedUserId ? parseInt(storedUserId, 10) : null;
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data using the user ID from state

        
        const response = await axios.get(
          `http://localhost:8080/bytesfarms/timesheet/totalhours?userId=${userId}`
        );

        // Assuming the API response is an array
        setData(response.data);

       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);






 


  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = () => {
  //   axios
  //     .get( `http://localhost:8080/bytesfarms/timesheet/totalhours?userId=${userId}`)
  //     .then((response) => {
  //       setData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error.message);
  //     });
  // };

  
  return (
    <>
    <Sidebar1/>
    <main className='' style={{backgroundColor:'#F0F5FD'}}>
      <div className='m-5'>
        <h3 className='m-3 pt-3 pb-3'>ATTENDANCE</h3>
        <div style={{borderRadius:'20px'}}>
        <table className="rounded-4 table table-bordered table-striped" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px'}}>
                <thead className="table-secondary text-center">
                  <tr>
                    <th style={{ padding: "20px" }}>Day</th>
                    <th style={{ padding: "20px" }}>Month </th>
                    <th style={{ padding: "20px" }}>Year </th>
                    <th style={{ padding: "20px" }}>Check In </th>
                    <th style={{ padding: "20px" }}>Check Out </th>
                    <th style={{ padding: "20px" }}>Break Start</th>
                    <th style={{ padding: "20px" }}>Break End </th>
                    <th style={{ padding: "20px" }}>Status </th>
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
                        {/* Display all break starts in a separate column */}
                        <td>
                          {item.breaks.map((breakItem, index) => (
                            <React.Fragment key={breakItem.id}>
                              {index > 0 && ", "}
                              {breakItem.breakStartTime}
                            </React.Fragment>
                          ))}
                        </td>
                        {/* Display all break ends in a separate column */}
                        <td>
                          {item.breaks.map((breakItem, index) => (
                            <React.Fragment key={breakItem.id}>
                              {index > 0 && ", "}
                              {breakItem.breakEndTime || "N/A"}
                            </React.Fragment>
                          ))}
                        </td>
                        <td>{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tr>
                    <td colSpan="8">Loading...</td>
                  </tr>
                )}
              </table>
              </div> </div>
    </main>
   
    </>
  )
}

export default Attendance1