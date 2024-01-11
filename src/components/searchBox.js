import React, {useState, useEffect} from "react"
import "./searchBox.css"
import { fetchData } from "./fetch";

function SearchBox({searchedData, newSearchData}){
  const [searchingData, setSearchingData] = useState("")
  const [albumsList, getAlbumList] = useState([]);
  const [searchedAlbum, getSearchedAlbum] = useState([]);
  const [refinedData, setRefinedData] = useState(newSearchData)

    function handleInputText(e){
        if(e){
          setTimeout(() => {
            if(e.target.value){
              setSearchingData(e.target.value)
            }else{
              handleSearchedAlbum(e.target.value)
            }
          }, 500);
        }
    }

    function handleSearchedAlbum(value) {
      if(refinedData.length > 0){
        console.log(refinedData)
        if(value){
          const find = refinedData.filter((e) => {
            let names = e.name.toLowerCase()
            let emails = e.email.toLowerCase()
            let roles = e.role.toLowerCase()
            if(names.includes(value)){
              return e
            }else if(emails.includes(value)){
              return e        
          }else if(roles.includes(value)){
            return e
        }
      }
        );
        searchedData(find);
        }else{
          searchedData(refinedData)
        }
      }else if (albumsList.length > 0) {
        if(value){
          const find = albumsList.filter((e) => {
            let names = e.name.toLowerCase()
            let emails = e.email.toLowerCase()
            let roles = e.role.toLowerCase()
            if(names.includes(value)){
              return e
            }else if(emails.includes(value)){
              return e        
          }else if(roles.includes(value)){
            return e
        }
      }
        );
        searchedData(find);
        }else{
          searchedData(albumsList)
        }
      }
  
    }

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleSearchedAlbum(searchingData)
      }
    };

    useEffect(() => {
      const fetching = async () => {
        const data = await fetchData()
  
        if (data) {
          getAlbumList(data);
          searchedData(data)
        }
      };
      fetching();
    }, []);


    useEffect(() => {
      setRefinedData(newSearchData)
    },[newSearchData])

    useEffect(() => {
      handleSearchedAlbum(searchingData)
    },[refinedData])
  
    return (
     <>
     <div>
        <input placeholder="Search by name, email or role" onChange={(e) => handleInputText(e)} onKeyDown={handleKeyDown}/>
     </div>
     </>
    )
}

export default SearchBox;