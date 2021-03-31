import React, { useContext, useState } from 'react'
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import Navbar from './Navbar';
import {ApiContext} from './ApiContext';
const Login = () => {
    const [value, setValue] = useState({role:0,active:true})
    const [props,setProps]=useState({})
    const { truevalue, settruevalue, isAuth, setIsAuth}=useContext(ApiContext);
    console.log("isAuth",isAuth)
    var usercheck='';
    var datacheck='';
    var rolecheck='';
    var activeDeactive=''
    let history=useHistory();
    const handleChange = (key, value) => {
        setValue((prev) => ({ ...prev, [key]: value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(value)
        try {
            console.log('okk')
            const res = await axios.post('http://localhost:5000/login/', value)
            .then(res=>{sessionStorage.setItem("auth-token",res.headers['auth-token'])
            usercheck=res.data.user
            rolecheck=res.data.role
            activeDeactive=res.data.active
            console.log("Login response",res.data)
            })
            const data = await res;
            console.log("Check", data)
            console.log("Active user",activeDeactive)
            if(rolecheck===1)
            {
                    settruevalue(!truevalue);
                setIsAuth(!isAuth)
                  return  history.push('/all-details');
                
            }
            else{
            if (usercheck&& activeDeactive===true) {
                try{
                    const port ='http://localhost:5000/user-details';
                    const userdetails = await axios.get(`${port}/${usercheck}`)
                    .then(res=>{
                        datacheck=res.data
                    setProps(()=>{  setProps(res.data)})})
                   await console.log("value form ser",userdetails)
                    const user=await userdetails;
                    console.log("Before history",datacheck)
                   console.log("push")
                        settruevalue(!truevalue);
                        setIsAuth(!isAuth)
                        
                    history.push({
                        pathname:'/detail',
                        state:datacheck
                    })
                }catch(err){
                    console.log(err)
                }
                console.log('all right')
            }else{
                alert("User is Not present")
            }
        }
            
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <div>
        <Navbar/>
        <div className="container">
            <form onSubmit={handleSubmit} className="form-group ">
               <center><h2>SignIn</h2></center> 
                <label for="email">Email</label>
                <input type="text" name="email" required
                    value={value.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="form-control"
                />
                <div class="email error"></div>
                <label for="password">password</label>
                <input type="password" name="password" required
                    value={value.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="form-control"
                />
                
                <div class="password error"></div>
               <center><button className="btn btn-primary mt-2 ">Log In </button></center> 
            </form>
            </div>
        </div>
    )
}

export default Login
