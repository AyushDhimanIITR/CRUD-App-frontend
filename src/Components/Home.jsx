import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { addData,updateData, delData } from "./Context/ContextProvider";

const Home = () => {
  const [userData, setUserData] = useState([]);

  const {uData, setUData} = useContext(addData);
  const {updata, setUpdata} = useContext(updateData);
  const {dltData, setDltData} = useContext(delData);


  const getData = async (e) => {
    // e.preventDefault();

    const res = await fetch("/getAllUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();
    console.log(response);
    if (res.status === 422 || !response) {
      console.log("error");
    } else {
      setUserData(response);
      // console.log(response);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteUser = async (id) => {
    const deletedUser = await fetch(`/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const delResponse = await deletedUser.json();
    console.log(delResponse);

    if (delResponse.status === 422 || !delResponse) {
      console.log("Error");
    } else {
      console.log("Successfully Deleted");
      setDltData(delResponse);
      getData();
    }
  };

  return (
    <>
    {
      uData ? <>
       <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>{uData.name}</strong> User added Successfully!
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      </>: 
      ""
    }
    {
      updata ? <>
       <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>{updata.name}</strong> User updated Successfully!
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      </>: 
      ""
    }
    {
      dltData ? <>
       <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>{dltData.name}</strong> User Deleted Successfully!
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      </>: 
      ""
    }
     
      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2 mb-2">
            <NavLink to="/register" className="btn btn-primary">
              Add Data
            </NavLink>
          </div>

          <table class="table">
            <thead>
              <tr className="table-dark">
                <th scope="col">Id</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Number</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {userData.map((element, id) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{id + 1}</th>
                      <td>{element.name}</td>
                      <td>{element.email}</td>
                      <td>{element.contact}</td>
                      <td className="d-flex justify-content-between">
                        <NavLink to={`view/${element._id}`}>
                          <button className="btn btn-success">
                            <i class="fas fa-eye"></i>
                          </button>
                        </NavLink>
                        <NavLink to={`edit/${element._id}`}>
                          <button className="btn btn-primary">
                            <i class="fas fa-pen"></i>
                          </button>
                        </NavLink>
                        <button
                          onClick={() => deleteUser(element._id)}
                          className="btn btn-danger"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
