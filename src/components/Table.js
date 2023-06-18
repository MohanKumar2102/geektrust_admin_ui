import React from "react";
import { DeleteOutline, Edit } from "@mui/icons-material";
import "./Table.css";
export default function Table({
  searchItem,
  selectAll,
  userList,
  selectSingleRow,
  removedUsers,

  deleteSingleRow,
}) {
  (() => {
    console.log(userList);
  })();

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                name="selectAll"
                id="selectAll"
                onChange={selectAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList
            .filter((item) => {
              if (searchItem === "" || searchItem === undefined) return item;
              else if (
                item.name.toLowerCase().includes(searchItem.toLowerCase())
              )
                return item;
              else if (
                item.email.toLowerCase().includes(searchItem.toLowerCase())
              )
                return item;
              else if (
                item.role.toLowerCase().includes(searchItem.toLowerCase())
              )
                return item;
            })
            .map((data) => (
              <tr key={data.id}>
                <td>
                  <input
                    id={`checkbox`}
                    type="checkbox"
                    value={data.id}
                    name={data.name}
                    onChange={selectSingleRow}
                    checked={removedUsers.includes(data.id) ? true : false}
                  />
                </td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.role}</td>
                <td>
                  <Edit className="icon-buttons" />
                  <DeleteOutline
                    className="icon-buttons"
                    onClick={() => deleteSingleRow(data.id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
