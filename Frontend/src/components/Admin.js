import React, { useState } from 'react'
import { useLocation, useHistory, Link } from 'react-router-dom'
import axios from 'axios';
import Navbar from './Navbar';
const Admin = () => {
    const [value, setValue] = useState({ role: 0 })
    let history = useHistory();
    const handleChange = (key, value) => {
        setValue((prev) => ({ ...prev, [key]: value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(value)
        try {
            const portvalue = `http://localhost:5000/${value.email}`
            console.log(portvalue)
            const resp = await axios.get(`http://localhost:5000/${value.email}`)
            .then(res=>{sessionStorage.setItem("auth-token",res.headers['auth-token'])
        console.log(res)

            
            if (res.data[0].role === 1) {
                    console.log("pushing")
                history.push({
                    pathname: '/all-details'
                })

            }
        })
        }
        catch (err) {
            console.log(err)
        }

    }
    return (
        <div>
        <Navbar/>
            <form onSubmit={handleSubmit} className="form-group form-width">
              <center><h2>Admin Log in</h2></center>  
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
               <center><button className="btn btn-primary mt-2 ">Login</button></center> 
            </form>
           
        </div>
    )
}


export default Admin

