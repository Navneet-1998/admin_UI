import React, { useState, useEffect } from "react";
import "./card.css";
import Column from "./row";

function Cards({ searchData, filteringSearch }) {
  const [datas, setDatas] = useState([]);

  // Function to handle updates on edited data
  const handleNewEdited = (editedData) => {
    if (editedData) {
      setDatas((prevDatas) => {
        const updatedDatas = prevDatas.map((data) =>
          data.id === editedData.id
            ? {
                ...data,
                role: editedData.role || data.role,
                name: editedData.name || data.name,
                email: editedData.email || data.email,
              }
            : data
        );
        return updatedDatas;
      });
    }
  };

  // Function to handle updates on deleted data
  const handleDeletedList = (deletedData) => {
    const filteredData = datas.filter((data) => !deletedData.some((item) => item.id === data.id));

    // Call filteringSearch function with updated data
    filteringSearch(filteredData);
  };

  useEffect(() => {
    // Update local state when searchData changes
    setDatas(searchData);
  }, [searchData]);

  return (
    <div className="Centers">
      <div className="card">
        <Column data={datas} editedCollection={handleNewEdited} newDeletedList={handleDeletedList} />
      </div>
    </div>
  );
}

export default Cards;
