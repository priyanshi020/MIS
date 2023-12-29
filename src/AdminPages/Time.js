import React,{useEffect,useState} from 'react'
import Sidebar from '../components/Sidebar'
import ViewTask from './core/ViewTask'
import axios from 'axios';

const Time = () => {

    const [data, setData] = useState([]);
    console.log("data",data)

    useEffect(() => {
      // Fetch data from your API endpoint using axios
      axios
        .get("http://localhost:8080/bytesfarms/user/getEmployees") // Replace 'YOUR_API_ENDPOINT' with the actual endpoint URL
        .then((response) => {
          setData(response.data); // Update the state with the fetched data
        })
        .catch((error) => {
          console.error("Error fetching data:", error.message);
        });
    }, []); 
    
  return (
    <>
        <Sidebar/>
        <main className='m-5'>
        <h3 className="mb-3">Time Tracker</h3>
        <table class="   shadow shadow-lg rounded-4 table   ">
          <thead class="table-secondary">
            <tr className="">
             
              <th className='' style={{paddingLeft:'30px'}}>Name</th>
              
              <th className='text-end' style={{paddingRight:'80px'}}>Task List </th>
            </tr>
          </thead>
          <tbody>
          {data.map((item) => (
                <tr key={item.id}>
                  <td className="text-center">{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.designation}</td>
                  <td>{item.email}</td>
                  <td>{item.contactNo}</td>
                  </tr>
                  ))}
          </tbody>
         
        </table>
        </main>
    </>
  )
}

export default Time