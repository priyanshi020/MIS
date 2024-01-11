import React, {useEffect,useState} from "react";
import Sidebar from "../components/Sidebar";
import ViewTask from "./core/ViewTask";
import axios from "axios";

const TimeTracker1 = () => { 
  const [data, setData] = useState([]);
  const [filteredData,setFilteredData]=useState(data);
  const [searchTerm,setSearchTerm]=useState('');
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();    
    setSearchTerm(term);
  };

  useEffect(() => {
    const filtered = data.filter(
      (item) =>
        item.username.toLowerCase().includes(searchTerm) ||
        item.email.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filtered);
  }, [data, searchTerm]);
  useEffect(() => {
   
    axios
      .get("http://localhost:8080/bytesfarms/user/getEmployees")
      .then((response) => {
        setData(response.data); 
        const taskId=response.data.id;
        console.log("yeh hu userdi h ",taskId)
        localStorage.setItem('userId', taskId.toString());
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }, []); 


  return (
    <>
      <Sidebar />
      <main className="" style={{backgroundColor:'#F0F5FD'}}>
        <div className="p-4">
        <h3 className=" pb-3">Time Tracker</h3>
        <div className="d-flex align-items-center search-container mb-3">
  <input
    type="search"
    className="form-control rounded w-50"
    placeholder="Search"
    aria-label="Search"
    aria-describedby="search-addon"
    value={searchTerm}
    onChange={handleSearch}
  />
  <div className="search-icon-container">
    <img
      src="/assets/ic-search.png"
      alt="icon"
      className="search-icon"
    />
  </div>
</div>
         <table class="table rounded-4 " style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px'}}>
            <thead class="table-secondary p-2">
              <tr>
                <th  className='text-center' scope="col" style={{padding:'20px'}}>S.No</th>
                <th scope="col" style={{padding:'20px'}}>Name</th>
                
                <th scope="col" style={{padding:'20px'}}>Email Id</th>
              <th style={{padding:'20px'}}>Task List</th>

              
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item,index) => (
                <tr key={item.id}>
                  <td className="text-center">{index+1}</td>
                  <td>{item.username}</td>
                
                  <td>{item.email}</td>
                 <td><ViewTask userId={item.id} /></td>
                  
                </tr>
              ))}
            </tbody>
          </table></div>
      </main>
    </>
  );
};

export default TimeTracker1;
