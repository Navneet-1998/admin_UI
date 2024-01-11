import React, { useEffect, useState } from "react";
import "./adminUi.css";
import SearchBox from "./components/searchBox";
import Cards from "./components/card";

const AdminUI = () => {
  // State for the main data
  const [data, setData] = useState([]);
  // State for the filtered search data
  const [filteredSearch, setFilteredSearch] = useState([]);

  // Callback to update the main data when searched
  const handleSearchedData = (searchResult) => {
    setData(searchResult);
  };

  // Callback to update the filtered search data
  const handleFilterSearch = (filteredResult) => {
    setFilteredSearch(filteredResult);
  };

  return (
    <>
      {/* SearchBox component for searching */}
      <SearchBox searchedData={handleSearchedData} newSearchData={filteredSearch} />
      {/* Cards component for displaying the data */}
      <Cards searchData={data} filteringSearch={handleFilterSearch} />
    </>
  );
};

export default AdminUI;
