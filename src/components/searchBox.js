import React, { useState, useEffect } from "react";
import "./searchBox.css";
import { fetchData } from "./fetch";

function SearchBox({ searchedData, newSearchData }) {
  const [searchingData, setSearchingData] = useState("");
  const [albumsList, setAlbumsList] = useState([]);
  const [refinedData, setRefinedData] = useState(newSearchData);

  const handleInputText = (e) => {
    if (e) {
      setTimeout(() => {
        if (e.target.value) {
          setSearchingData(e.target.value);
        } else {
          handleSearchedAlbum(e.target.value);
        }
      }, 500);
    }
  };

  const handleSearchedAlbum = (value) => {
    const dataToSearch = refinedData.length > 0 ? refinedData : albumsList;

    const find = dataToSearch.filter((e) => {
      const names = e.name.toLowerCase();
      const emails = e.email.toLowerCase();
      const roles = e.role.toLowerCase();

      return names.includes(value) || emails.includes(value) || roles.includes(value);
    });

    searchedData(find);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchedAlbum(searchingData);
    }
  };

  useEffect(() => {
    const fetching = async () => {
      const data = await fetchData();

      if (data) {
        setAlbumsList(data);
        searchedData(data);
      }
    };
    fetching();
  }, []);

  useEffect(() => {
    setRefinedData(newSearchData);
  }, [newSearchData]);

  useEffect(() => {
    handleSearchedAlbum(searchingData);
  }, [refinedData]);

  return (
    <div>
      <input
        placeholder="Search by name, email, or role"
        onChange={(e) => handleInputText(e)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default SearchBox;
