import React from 'react';

const TableComponent = ({ data }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            {/* Add other headers as needed */}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              {/* Add other data fields as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
