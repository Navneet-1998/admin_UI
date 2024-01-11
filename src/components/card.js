import React, {useState, useEffect} from "react"
import "./card.css"
import Column from "./row";
function Cards({ searchData, filteringSearch }) {
  const [datas, setDatas] = useState([]);
  let filteredData = []

  const handleNewEdited = (e) => {
    if (e) {
      setDatas((prevDatas) => {
        const updatedDatas = prevDatas.map((data) =>
          data.id === e.id
            ? {
                ...data,
                role: e.role ? e.role : data.role,
                name: e.name ? e.name : data.name,
                email: e.email ? e.email : data.email,
              }
            : data
        );
        return updatedDatas;
      });
    }
  };

  const handleDeletedList = (e) => {
    const filteredData = datas.filter((data) => {
      // Assuming 'e' is an array of items with 'id' property
      return !e.some((item) => item.id === data.id);
    });
    

    // setDatas(filteredData)
    filteringSearch(filteredData)
   console.log(filteredData)
  };

  useEffect(() => {
    console.log(searchData.length)
      setDatas(searchData);
  }, [searchData]);


  return (
    <>
      <div className="Centers">
        <div className="card">
          <Column data={datas} editedCollection={handleNewEdited} newDeletedList={handleDeletedList} />
        </div>
      </div>
    </>
  );
}


export default Cards;