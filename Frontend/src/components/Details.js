import React,{useState,useEffect,useContext} from 'react'
import { Link ,useLocation} from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import {ApiContext} from './ApiContext'
const Details = () => {
    let location=useLocation();
    const [check,setCheck]=useState(true);
    const { truevalue, settruevalue }=useContext(ApiContext);
    const userData=location.state;
    const [email,setEmail]=useState(location.state.email);
    const [passsword,setPassword]=useState(location.state.password);
    const[fullname,setFullName]=useState(location.state.fullname);
    const [category,setCategory]=useState(location.state.category)

    
    const Edit=()=>{
        console.log(check)
        setCheck((prev)=>(!prev))
    }
    const upDate=async ()=>{
        setCheck((prev)=>!prev)
        console.log(check)
        const data=JSON.stringify({email,passsword})
        console.log(data)
        try{
            console.log("Working..")
            const port = 'http://localhost:5000/user-details';
            
            const res=await axios.patch(`${port}/${userData._id}`,{"email":email,"password":passsword});
            const data1=await res;
            console.log("The data value",data1)
        }catch(err){
            console.log(err);
        } 
    }
    return (
        <div>
        <Navbar/>
           <center><h1>Welcome Details of User</h1></center> 
               <div >
                {check ?<div>
                    <span><u>Full Name:</u></span>
                    <p className="text-bold ">{fullname && fullname}</p>
                    <span><u>Email:</u></span>
                    <p className="text-bold ">{email&&email}</p>
                    <span><u>Category:</u></span>
                    <p >{category&& category}</p>
                    </div> :
                <div><input
                    value={email&&email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="form-width form-control mb-2"
                /></div>}  
                {check ?<div>
                    <span><u>Password:</u></span>
                    <p>{passsword&&passsword}</p></div>:
                <div><input
                    value={passsword&&passsword}
                    onChange={(e) =>setPassword(e.target.value)}
                    disabled
                    className="form-width form-control"
                /></div>}
                  { check?<center><button onClick={()=>Edit()} className="btn btn-primary mt-2">Edit</button></center>:<center><button onClick={()=>upDate()} className="btn btn-primary mt-2">Update</button></center>}

               </div>
                   
                 
        </div>
    )
}   

export default Details;
