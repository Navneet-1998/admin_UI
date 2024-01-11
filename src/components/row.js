import React, { useState, useEffect } from "react";
import "./row.css";
import {useSnackbar } from 'notistack'
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete, AiOutlineDoubleRight } from "react-icons/ai";
import {
  AiOutlineDoubleLeft,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";

// Modal Component
const Modal = ({ show, onClose, onConfirm }) => {
  return show ? (
    <div className="modal">
      <div className="modal_box">
        <p>You sure you wanna delete?</p>
        <button className="modal_buttonCancel" onClick={onClose}>
          Cancel
        </button>
        <button onClick={onConfirm} className="modal_buttoDelete">
          Confirm
        </button>
      </div>
    </div>
  ) : null;
};


const Tabs = ({ tabs, tabSelected, dataSize }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleForward = (index) => {

    if (activeTab >= 0 && activeTab < dataSize) {
      if (index === 0) {
        setActiveTab(activeTab + 1);
      } else {
        setActiveTab(dataSize);
      }
    }
  };

  const handleBackward = (index) => {
    if (activeTab > 0 && activeTab <= dataSize) {
      if (index === 0) {
        setActiveTab(0);
      } else {
        setActiveTab(activeTab - 1);
      }
    }
  };

  useEffect(() => {
    tabSelected(activeTab);
  }, [activeTab]);


  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
    <div>
      <div
        className="tab-headers"
        style={{ display: "flex", flexDirection: "row" }}
      >
        {tabs[0].map((tab, index) => (
          <div
            key={index}
            className={`tab-header ${index === activeTab ? "active" : ""}`}
            onClick={() => handleBackward(index)}
            class="startingTab"
            style={{
              margin: "5px 5px",
              padding: "16px 16px",
              borderRadius: "50%",
              border: "100% solid #e0e0e0",
              backgroundColor: "#e0e0e0",
              cursor: "pointer",
            }}
          >
            {tab.label}
            {/* <span style={{padding: "5px",borderRadius: "50%",border:"2px solid white" }} >{tab.label}</span> */}
          </div>
        ))}
      </div>
    </div>

    <div
      className="tab-headers"
      style={{ display: "flex", flexDirection: "row" }}
    >
      {tabs[1].map((tab, index) => (
        <div
          key={index}
          className={`tab-header ${index === activeTab ? "active" : ""}`}
          onClick={() => handleTabClick(index)}
          style={{
            border:
              index === activeTab ? "2px solid #e0e0e0" : "80% solid #e0e0e0",
            backgroundColor: index === activeTab ? "white" : "#e0e0e0",
            cursor: "pointer",
          }}
        >
          {tab.label}
          {/* <span style={{padding: "5px",borderRadius: "50%",border:"2px solid white" }} >{tab.label}</span> */}
        </div>
      ))}
    </div>
    <div>
      <div
        className="tab-headers"
        style={{ display: "flex", flexDirection: "row" }}
      >
        {tabs[2].map((tab, index) => (
          <div
            key={index}
            className={`tab-header ${index === activeTab ? "active" : ""}`}
            onClick={() => handleForward(index)}
            style={{
              margin: "5px 5px",
              padding: "16px 16px",
              borderRadius: "50%",
              border: "100% solid #e0e0e0",
              backgroundColor: "#e0e0e0",
              cursor: "pointer",
            }}
          >
            {tab.label}
            {/* <span style={{padding: "5px",borderRadius: "50%",border:"2px solid white" }} >{tab.label}</span> */}
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};


// All The Rows 
function Rows({
  name,
  email,
  role,
  checked,
  ids,
  collected,
  deleted,
  gotSelectedList,
  deleteAllChecked
}) {
  const [isEdited, setEdited] = useState({
    id: -1,
    name: "",
    email: "",
    role: "",
  });

  const [isClicked, setIsClicked] = useState(false);
  const [isDeleted, setIsDeleted] = useState(deleted);
  const [isChecked, setIsChecked] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    gotSelectedList({ id: ids });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsClicked(false);
    }
    collected(isEdited);
  };

  const handleButtonClick = () => {
    setIsClicked(!isClicked);
  };

  const handleNameEdit = (e) => {
    setEdited((prevEdited) => ({
      ...prevEdited,
      id: ids,
      name: e.target.value,
    }));
  };

  const handleEmailEdit = (e) => {
    setEdited((prevEdited) => ({
      ...prevEdited,
      id: ids,
      email: e.target.value,
    }));
  };

  const handleRoleEdit = (e) => {
    setEdited((prevEdited) => ({
      ...prevEdited,
      id: ids,
      role: e.target.value.toString(),
    }));
  };

  const handleDeleteButton = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmed = () => {
    setEdited({
      id: 0,
      name: "",
      email: "",
      role: "",
    });
    collected(isEdited);
    setIsDeleted(false);
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);




  return (
    <>
      {(isDeleted && deleteAllChecked === false) ? (
      <div className="pad checkRow container"
        style={{ backgroundColor: isChecked ? "#ECF0F1" : "initial" }}>
          {isClicked ? (
            <>
              <div className="Starts">
                <input
                  type="checkbox"
                  className="Inputs"
                  checked={isChecked}
                  onClick={handleCheckboxChange}
                />
              </div>
              <div className="newStay" onKeyDown={handleKeyDown}>
                <div className="gotYou">
                  <input
                    type="text"
                    placeholder={name}
                    className="correctSize"
                    onChange={handleNameEdit}
                  />
                </div>
                <div className="gotYou">
                  <input
                    type="text"
                    placeholder={email}
                    style={{ width: "70%" }}
                    onChange={handleEmailEdit}
                  />
                </div>
                <div className="gotYou roles">
                  <input
                    type="text"
                    placeholder={role.charAt(0).toUpperCase() + role.slice(1)}
                    className="correctSize"
                    onChange={handleRoleEdit}
                  />
                </div>
                <div className="rowing">
                  <span
                    className="btns"
                    style={{
                      fontSize: "20px",
                      marginRight: "10px",
                      color: isClicked ? "#f2efeb" : "initial",
                      cursor: isClicked ? "default" : "pointer",
                    }}
                    aria-disabled={isClicked}
                    onClick={isClicked ? null : handleButtonClick}
                  >
                    <FiEdit />
                  </span>
                  <span
                    className="btns icons"
                    style={{
                      color: "red",
                      fontSize: "21px",
                      marginLeft: "10px",
                    }}
                    onClick={handleDeleteButton}
                  >
                    <AiOutlineDelete />
                  </span>
                </div>
              </div>
              <div style={{ width: "18%" }}></div>
              </>
          ) : (
            <>
              <div className="Starts">
                <input
                  type="checkbox"
                  className="Inputs"
                  checked={isChecked ? isChecked : checked}
                  onClick={handleCheckboxChange}
                />
              </div>
              <div className="newStay">
                <p className="gotYou">{name}</p>
                <p className="email " >{email}</p>
                <p className="role " >{role}</p>
                <div className="rowing">
                  <span
                    className="btns"
                    style={{
                      fontSize: "20px",
                      marginRight: "10px",
                      color: isClicked ? "#f2efeb" : "initial",
                      cursor: isClicked ? "default" : "pointer",
                    }}
                    onClick={handleButtonClick}
                  >
                    <FiEdit />
                  </span>
                  <span
                    className="btns icons"
                    style={{
                      color: "red",
                      fontSize: "21px",
                      marginLeft: "10px",
                    }}
                    onClick={handleDeleteButton}
                  >
                    <AiOutlineDelete />
                  </span>
                </div>
              </div>
              <div class="space"></div>
            </>
          )}
        </div>
      ) : (
        <></>
      )}
      {/* Use Modal component */}
      <Modal
        show={showDeleteConfirmation}
        onClose={handleCancelDelete}
        onConfirm={handleDeleteConfirmed}
      />
    </>
  );
}

// Message to confirm 
const ErrorMessage = ({ message, onClose, onConfirm }) => {
  return (
    <div className="error-message-container">
      <div className="error-message">
        <p>{message}</p>
        <button onClick={onClose} style={{ margin: "0px 2%" }}>
          Cancel
        </button>
        <button onClick={onConfirm} style={{ margin: "0px 2%" }}>
          OK
        </button>
      </div>
    </div>
  );
};

// create columns for every single tab
function Column({ data, editedCollection, newDeletedList }) {
  const {enqueueSnackbar} = useSnackbar()
  let checkingInitialData = data.slice(0, 10);
  const [removedData, setRemovedData] = useState([])
  const [initialData, setInitialData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isDeleteAlert, setIsDeleteAlert] = useState(false);
  const [checkSelectedlist, setCheckSelectedList] = useState([]);
  const [tabsData, setTabsData] = useState([]);
  const [showError, setShowError] = useState(false);
  const [deletedFullRow, setDeletedFullRow] = useState(false);
  const [selectTab, setSelectedTab] = useState(0);
  const [editedRow, setEditedRow] = useState({});
  const [allChecked, setAllChecked] =useState(false)

  const handleShowError = () => {
    if(checkSelectedlist.length > 0 || isChecked === true){
      setShowError(true);
    }else{
      enqueueSnackbar("Please Select Rows To Delete Selected Rows.", {
          variant: "error",
        });
      setShowError(false);
    }
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  const handleConfirmError = () => {
    // Add logic for OK button action
    setShowError(false);
    // Remove selected ids from initialData
  if(checkSelectedlist.length === 10 || isChecked){
    setRemovedData(checkSelectedlist);
    setAllChecked(true)
  }else{
    if (initialData.length === 0) {
      setRemovedData(checkSelectedlist);
      setInitialData(
        checkingInitialData.filter((e) => {
          return !checkSelectedlist.some((selected) => selected.id === e.id);
        })
      );
    } else {
      setRemovedData(checkSelectedlist);

      setInitialData(
        initialData.filter((e) => {
          return !checkSelectedlist.some((selected) => selected.id === e.id);
        })
      );
      setDeletedFullRow(true);
    }
    setRemovedData(checkSelectedlist);

    // Remove selected ids from tabsData
    setTabsData(
      tabsData.filter((e) => {
        return !checkSelectedlist.some((selected) => selected.id === e.id);
      })
    );

  }
    setCheckSelectedList([]);
    setIsChecked(false)

  };

  function checkedListUpdates(){
    if(isChecked === false){
      setCheckSelectedList([]);
    }else if(isChecked === true){
      setCheckSelectedList(tabsData);
    }
  }

  const handleButtonClick = () => {
    setIsChecked(!isChecked);
    
  };

  const handleEditedRow = (event) => {
    editedCollection(event);
    setEditedRow(event)
  };

  const handleCancelDelete = () => {
    setIsDeleteAlert(false);
  };

  const handleDeleteConfirmation = () => {
    setIsDeleteAlert(true);
  };



  const tabsGetData = (selectedTab) => {
    let gotData = [];
   if(data.length > 0){
    if (selectedTab) {
      const check = selectedTab * 10;
      if (check < data.length) {
        for (let i = check - 10; i < check; i++) {
            gotData.push(data[i]);
        }
      } else {
        let reminder = Math.floor(data.length / 10);
        for (let i = reminder * 10; i < data.length; i++) {
          gotData.push(data[i]);
        }
      }
    }
    setTabsData(gotData);
   }else{
    setTabsData([])
   }
  };

  const nextTabs = [
    { label: <AiOutlineRight /> },
    { label: <AiOutlineDoubleRight /> },
  ];

  const prevTabs = [
    { label: <AiOutlineDoubleLeft /> },
    { label: <AiOutlineLeft /> },
  ];

  const tabs = () => {
    let sizing = Math.ceil(data.length / 10);
    const tabing = new Array(sizing);

    let arr = [];

    for (let i = 0; i < sizing; i++) {
      tabing[i] = { label: i + 1 };
    }
    return [prevTabs, tabing, nextTabs];
  };

  function handleTabSelected(e) {
    setSelectedTab(e + 1);
  }


  function handleSelectedList(value) {
    setCheckSelectedList((prevCheckSelectedList) => {
      const existingIndex = prevCheckSelectedList.findIndex(
        (item) => item.id === value.id
      );

      // If the item is already selected, remove it; otherwise, add it
      if (existingIndex !== -1) {
        // Item exists, so remove it
        const updatedList = [...prevCheckSelectedList];
        updatedList.splice(existingIndex, 1);
        return updatedList;
      } else {
        // Item doesn't exist, so add it
        return [...prevCheckSelectedList, { id: value.id }];
      }
    });
  }

  useEffect(() => {
    tabsGetData(selectTab);
  }, [editedRow]);

  useEffect(() => {
    setAllChecked(false)
  },[tabsData])

  useEffect(() => {
    tabsGetData(selectTab);
    setIsChecked(false)
  },[selectTab])

  useEffect(() => {
    checkedListUpdates()
  },[isChecked])

  useEffect(() => {
 newDeletedList(removedData)
  }, [removedData])

  useEffect(() => {
    console.log(data)
    tabsGetData(selectTab)
  },[data])

  return (
    <>
      <div>
        {showError && (
          <ErrorMessage
            message="Do you want to delete?"
            onClose={handleCloseError}
            onConfirm={handleConfirmError}
          />
        )}
      </div>
      <div className="pad rows container">
        <div className="Starts">
          <input
            type="checkbox"
            className="Inputs"
            checked={isChecked}
            onClick={handleButtonClick}
          />
        </div>
        <div className="news">
          <p>Name</p>
          <p>Email</p>
          <p>Role</p>
          <p>Actions</p>
        </div>
        <div class="space"></div>
      </div>
      {data.length > 0 ? tabsData.length > 0
        ? tabsData.map((e) => (
            <Rows
              key={e.id}
              name={e.name.charAt(0).toUpperCase() + e.name.slice(1)}
              email={e.email}
              role={e.role.charAt(0).toUpperCase() + e.role.slice(1)}
              checked={isChecked}
              ids={e.id}
              deleted={true}
              collected={handleEditedRow}
              gotSelectedList={handleSelectedList}
              confirmingSelectedList={checkSelectedlist}
              comfirmedDeletedSelected={checkSelectedlist}
              deleteAllChecked={allChecked}
            />
          ))
        : !deletedFullRow
        ? initialData.length > 0
          ? initialData.map((e) => (
              <Rows
                key={e.id}
                name={e.name.charAt(0).toUpperCase() + e.name.slice(1)}
                email={e.email}
                role={e.role.charAt(0).toUpperCase() + e.role.slice(1)}
                checked={isChecked}
                ids={e.id}
                deleted={true}
                collected={handleEditedRow}
                gotSelectedList={handleSelectedList}
                confirmingSelectedList={checkSelectedlist}
                comfirmedDeletedSelected={checkSelectedlist}
              deleteAllChecked={allChecked}

              />
            ))
          : checkingInitialData.map((e) => (
              <Rows
                key={e.id}
                name={e.name.charAt(0).toUpperCase() + e.name.slice(1)}
                email={e.email}
                role={e.role.charAt(0).toUpperCase() + e.role.slice(1)}
                checked={isChecked}
                ids={e.id}
                deleted={true}
                collected={handleEditedRow}
                gotSelectedList={handleSelectedList}
                confirmingSelectedList={checkSelectedlist}
                comfirmedDeletedSelected={checkSelectedlist}
              deleteAllChecked={allChecked}

              />
            ))
        : initialData.length > 0
        ? initialData.map((e) => (
            <Rows
              key={e.id}
              name={e.name.charAt(0).toUpperCase() + e.name.slice(1)}
              email={e.email}
              role={e.role.charAt(0).toUpperCase() + e.role.slice(1)}
              checked={isChecked}
              ids={e.id}
              deleted={true}
              collected={handleEditedRow}
              gotSelectedList={handleSelectedList}
              confirmingSelectedList={checkSelectedlist}
              comfirmedDeletedSelected={checkSelectedlist}
              deleteAllChecked={allChecked}

            />
          ))
        : initialData.map((e) => (
            <Rows
              key={e.id}
              name={e.name.charAt(0).toUpperCase() + e.name.slice(1)}
              email={e.email}
              role={e.role.charAt(0).toUpperCase() + e.role.slice(1)}
              checked={isChecked}
              ids={e.id}
              deleted={true}
              collected={handleEditedRow}
              gotSelectedList={handleSelectedList}
              confirmingSelectedList={checkSelectedlist}
              comfirmedDeletedSelected={checkSelectedlist}
              deleteAllChecked={allChecked}

            />
          )) : <div></div>}

      <Modal
        show={isDeleteAlert}
        onClose={handleCancelDelete}
        onConfirm={handleDeleteConfirmation}
      />

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{ display: "flex", justifyContent: "center", width: "12%" }}
        >
          <button
            type="button"
            onClick={handleShowError}
            style={{
              borderRadius: "60px",
              padding: "2px 20px",
              margin: "10px 2px",
              cursor: "pointer",
              border: "0px",
              background: "#f54073",
              color: "white",
            }}
          >
            Delete Selected
          </button>
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", }}
          class="tab-controller" 
        >
          <Tabs
            tabs={tabs()}
            tabSelected={handleTabSelected}
            dataSize={Math.floor(data.length / 10)}
          />
        </div>
      </div>
    </>
  );
}

export default Column;
