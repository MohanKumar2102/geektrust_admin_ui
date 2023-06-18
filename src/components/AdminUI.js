import React, { useEffect, useState } from "react";
import "./AdminUI.css";
import Table from "./Table";
import Footer from "./Footer";
import axios from "axios";
import { Search } from "@mui/icons-material";
import { TextField, InputAdornment } from "@mui/material";

export default function AdminUI() {
  const [timerId, setTimerId] = useState(0);
  const [searchItem, setSearchItem] = useState("");
  const [userList, setUserList] = useState([]);
  const [noOfPages, setPages] = useState(0);
  const [jsonData, setData] = useState([]);
  const [balance, setBalance] = useState(0);
  const [removedUsers, setRemovedUsers] = useState([]);
  const [check, setCheck] = useState(false);

  let itemsPerPage = 10;

  let data = [];
  const searchFunction = (e) => {
    setSearchItem(e.target.value);
    console.log(searchItem);
  };

  const debouncedSearch = (e, timer) => {
    clearTimeout(timer);
    let timerId = setTimeout(() => searchFunction(e), 500);
    setTimerId(timerId);
  };

  const fetchData = async () => {
    const res = await axios.get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );

    data = res.data;
    console.log(data);
    // const sortedData = data.sort((a, b) => a.id - b.id);

    setData(data);
    const uData = data.slice(balance, balance + itemsPerPage);
    setUserList(uData);
    console.log(Math.ceil(data.length / itemsPerPage));
    setPages(Math.ceil(data.length / itemsPerPage));
    console.log(userList);
  };

  const deleteRows = () => {
    const remainingUsers = userList.filter(
      (user) => !removedUsers.includes(user.id)
    );
    setUserList(remainingUsers);
  };

  useEffect(() => {
    fetchData();
  }, [balance, itemsPerPage]);

  const deleteSingleRow = (id) => {
    const updatedUsers = [...userList];
    const index = userList.findIndex((ul) => ul.id === id);
    updatedUsers.splice(index, 1);
    console.log(updatedUsers);
    setUserList(updatedUsers);
  };

  let pageChangeHandler = (e) => {
    console.log(e);
    const page = (e.selected * itemsPerPage) % jsonData.length;
    setBalance(page);
  };

  const selectAll = (e) => {
    setCheck(!check);
    console.log(check);
    const data = userList.slice(balance, balance + itemsPerPage);
    const rUsers = data.map((user) => user.id);
    setRemovedUsers(rUsers);
    console.log(removedUsers);
    if (check) {
      setRemovedUsers([]);
    }
  };

  const selectSingleRow = (e) => {
    const selectedId = e.target.value;
    if (removedUsers.includes(selectedId)) {
      let ids = removedUsers.filter((id) => id !== selectedId);
      setRemovedUsers(ids);
    } else {
      let ids = [...removedUsers];
      ids.push(selectedId);
      setRemovedUsers(ids);
    }
  };

  return (
    <div className="container">
      <TextField
        className="searchBar"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        onChange={(e) => {
          debouncedSearch(e, timerId);
        }}
        placeholder="Search by name, email or role"
        name="search"
      />
      <Table
        searchItem={searchItem}
        selectAll={selectAll}
        userList={userList}
        selectSingleRow={selectSingleRow}
        removedUsers={removedUsers}
        deleteSingleRow={deleteSingleRow}
        className="table"
      />
      <Footer
        deleteRows={deleteRows}
        pageChangeHandler={pageChangeHandler}
        noOfPages={noOfPages}
      />
    </div>
  );
}
