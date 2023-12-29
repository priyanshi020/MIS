import React from 'react'
import Sidebar1 from '../components/Sidebar1'

const Attendance1 = () => {
  return (
    <>
    <Sidebar1/>
    <main className='m-5'>
        <h3 className='mb-3'>ATTENDANCE</h3>
        <div className="mb-3 d-flex ">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                className="rounded-circle text-secondary"
                style={{marginRight:'8px'}}
                height="25"
                alt="Black and White Portrait of a Man"
                loading="lazy"
              />
              <h6 className=''>Shivendra Singh</h6>
            </div>
    <table class="table shadow shadow-lg">
  <thead className="table-secondary ">
    <tr className=''>
      <th scope="col">Date</th>
      <th scope="col">Check In</th>
      <th scope="col">Check Out</th>
      <th scope="col">Break Time</th>
      <th scope="col">Total Hours</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">15/12/2023</th>
      <td>10:23</td>
      <td>07:23</td>
      <td>00:45</td>
      <td>9:30</td>
    </tr>
    <tr>
      <th scope="row">15/12/2023</th>
      <td>10:23</td>
      <td>07:23</td>
      <td>00:45</td>
      <td>9:30</td>
    </tr>
    <tr>
      <th scope="row">15/12/2023</th>
      <td>10:23</td>
      <td>07:23</td>
      <td>00:45</td>
      <td>9:30</td>
    </tr>
  </tbody>
</table>
    </main>
    </>
  )
}

export default Attendance1