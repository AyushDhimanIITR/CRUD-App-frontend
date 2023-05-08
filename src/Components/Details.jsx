import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from "@mui/icons-material/Work";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationIcon from "@mui/icons-material/LocationOn";
import CreateIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const Details = () => {

    const navigate = useNavigate();

    const {id} = useParams("");

    const [userData, setUserData] = useState([]);

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
            setUserData(response);
        }
    }

    useEffect(() => {
        getUser();
    },[])

    const deleteUser = async(id) => {
        const deletedUser = await fetch(`/delete/${id}`, {
         method: "DELETE",
         headers: {
           "Content-Type": "application/json"
         }
        });
   
        const delResponse = await deletedUser.json();
        console.log(delResponse);   
        
        if(delResponse.status === 422 || !delResponse){
         console.log("Error");
        }else{
         console.log("Successfully Deleted");
         navigate("/");
        }
     }

    return(
        <div className="container mt-3">
            <h1 style={{fontWeight:400}}>Welcome, {userData.name}!</h1>

        <Card sx={{maxWidth:600}} >
            <CardContent>
            <div className="add_btn">
                        <NavLink to={`/edit/${userData._id}`}><button className="btn btn-primary mx-2"><CreateIcon /></button></NavLink>
                        <button onClick={()=> deleteUser(userData._id)} className="btn btn-danger"><DeleteOutlineIcon /> </button>
                    </div>
                <div className="row">
                    <div className="leftView col-lg-6 col-md-6 col-12">
                        <img src="" style={{}} alt="profileImage" />
                        <h3 className="mt-3">Name:  <span>{userData.name}</span></h3>
                        <h3 className="mt-3">Age:  <span>{userData.age}</span></h3>
                        <p className="mt-3"> <MailOutlineIcon/> Email: <span>{userData.email}</span></p>
                        <p className="mt-3"> <WorkIcon/> Job: <span>{userData.job}</span></p>
                    </div>
                    <div className="rightView col-lg-6 col-md-6 col-12">
                    
                        <p className="mt-5"><PhoneAndroidIcon />Mobile: <span>{userData.contact}</span></p>
                        <p className="mt-3"><LocationIcon />Location: <span>{userData.address}</span></p>
                        <p className="mt-3">Description: <span>{userData.desc}</span></p>
                    </div>
                </div>
            </CardContent>    
        </Card>            
        </div>
    )
}

export default Details;