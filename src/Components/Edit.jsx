import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { updateData } from "./Context/ContextProvider";

const Edit = () => {
  // const {updata, setUPdata} = useContext(updatedata)

  const {updata, setUpData} = useContext(updateData);
  const navigate = useNavigate();

  const {id} = useParams("");

  // const [userData, setUserData] = useState([]);
  const [data, setData] = useState({
    name: "",
    email: "",
    age: "",
    job:"",
    contact: "",
    desc: "",
    address: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((data) => {
      return {
        ...data,
        [name]: value,
      };
    });
  };


  const getUser = async() => {
      const res = await fetch(`/getuser/${id}`, {
          method: "GET",
          headers:{
              "Content-Type": "application/json"
          },
      })
      const response = await res.json();
      if(res.status === 422 || !response){
          console.log("error");
      }else{
          setData(response);
      }
  }

  useEffect(() => {
      getUser();
  },[])

  const handleClick =async(e)=> {
    e.preventDefault();

    const {name, email, age, contact, address, desc, job} = data;

    const updatedData = await fetch(`/updateuser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name, email, age, contact, address, desc, job})
    });

    const data2 = await updatedData.json();
    console.log(data2);
    if(data2.status === 422 || !data2){
      alert("fill the data")
    }else{
      navigate("/");
      setUpData(data2);
    }
  }

  return (
    <div className="container">
      <NavLink to="/">Go to Home</NavLink>
      <form className="mt-5">
        <div className="row">
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">
              Name
            </label>
            <input
              value={data.name}
              onChange={onChange}
              name="name"
              type="text"
              class="form-control"
              id="exampleInputName"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">
              Age
            </label>
            <input
              value={data.age}
              onChange={onChange}
              name="age"
              type="number"
              class="form-control"
              id="exampleInputAge"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">
              Email
            </label>
            <input
              value={data.email}
              onChange={onChange}
              name="email"
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">
              Contact
            </label>
            <input
              value={data.contact}
              onChange={onChange}
              name="contact"
              type="number"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="contactHelp"
            />
            <div id="contactHelp" class="form-text">
              We'll never share your number with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputAdd1" class="form-label">
              Address
            </label>
            <input
              value={data.address}
              onChange={onChange}
              name="address"
              type="text"
              class="form-control"
              id="InputAdd"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputAdd1" class="form-label">
              Job
            </label>
            <input
              value={data.job}
              onChange={onChange}
              name="job"
              type="text"
              class="form-control"
              id="InputJob"
            />
          </div>
          <div class="mb-3 ">
            <label for="exampleInputEmail1" class="form-label">
              Description
            </label>
            <textarea
              value={data.desc}
              onChange={onChange}
              name="desc"
              className="form-control"
              cols="30"
              rows="5"
            ></textarea>
          </div>
          
          <button onClick={handleClick} type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
