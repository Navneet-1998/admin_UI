import React, {useEffect, useState} from "react"
import "./adminUi.css"
import SearchBox from "./components/searchBox";
import Cards from "./components/card";

function AdminUI(){
    const [data, setData] = useState([])
    const [filteredSearch, setFilteredSearch] = useState([])

    const handleSearchedData = (value) => {
        console.log(value)
        setData(value)
    }


    const handleFilterSearch = (value) => {
        console.log(value)
        setFilteredSearch(value)
    }

    return (
     <>
     <SearchBox searchedData={handleSearchedData} newSearchData={filteredSearch}/>
     <Cards searchData={data} filteringSearch={handleFilterSearch}/>
     </>
    )
}

export default AdminUI;