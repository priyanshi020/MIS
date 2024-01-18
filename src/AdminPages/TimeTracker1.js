import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ViewTask from "./core/ViewTask";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const TimeTracker1 = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
    setCurrentPage(1); // Reset current page when filters change
  }, [data, searchTerm]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/bytesfarms/user/getEmployees")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Sidebar />
      <main className="" style={{ backgroundColor: '#F0F5FD' }}>
        <div className="p-4">
          <h3 className="pb-3">Time Tracker</h3>
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
          <table
            className="table rounded-4 "
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px',
            }}
          >
            <thead className="table-secondary p-2">
              <tr>
                <th className='text-center' scope="col" style={{ padding: '20px' }}>S.No</th>
                <th scope="col" style={{ padding: '20px' }}>Name</th>
                <th scope="col" style={{ padding: '20px' }}>Email Id</th>
                <th style={{ padding: '20px' }}>Task List</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td className="text-center">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td><ViewTask userId={item.id} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData && (
            <Stack spacing={2} style={{ marginTop: '20px' }}>
              <Pagination
                count={Math.ceil(filteredData.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
              />
            </Stack>
          )}
        </div>
      </main>
    </>
  );
};

export default TimeTracker1;
