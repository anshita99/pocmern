import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import Navbar from './Navbar';

const Signup = () => {
    const data = { "category": "Actor"}
    const [value, setValue] = useState({"category":"Actor"})
    const [ drop, setDrop ] = useState();

    const handleChange = (key, value) => {
        setValue((prev) => ({ ...prev, [key]: value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(value)
        try {
            const res = await axios.post('http://localhost:5000/signup/', value)
                .then(result => {
                    console.log("Drop value", result.status)
                    if(result.status===201)
                    {
                        window.location.replace("/login");

                    
                    }
                })
        } catch (e) {
            console.log({ e })
            console.log({ emailError: e.response.data.errors.email, passwrodError: e.response.data.errors.password })
        }

    }
      useEffect(async () => {
    try {
        console.log("hello sign")
      const dropval = await axios.get('http://localhost:5000/dropdownvalue')
      const storeddrop = dropval.data
      setDrop(storeddrop)
      console.log("The Value of drop",drop)
    } catch (er) {
      console.log(er)
    }
  }, [])
    return (
        <div>
            <Navbar />
            <div className="container">
            <form onSubmit={handleSubmit} className="form-group ">
                <center><h2>SignUp</h2></center>
                <label for="fullname">Full Name</label>
                <input type="text" name="fullname" required
                    value={value.fullname}
                    onChange={(e) => handleChange("fullname", e.target.value)}
                    className="form-control"
                />
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
                    className="form-control"
                    onChange={(e) => handleChange("password", e.target.value)}
                />
                <div class="password error"></div>
                <select
                className="dropdown mt-2  p-2 bg-secondary"
                    onChange={(e) => {
                        handleChange("category",e.target.value)
                    }} name="category">
                    {drop&&drop.map((val,index)=>{
                        return(
                            <option value={val.category} className="bg-white">{val.category}</option>)
                    })}
                </select>
                <center> <button className="btn btn-primary mt-2 ">Sign Up</button></center>
            </form>
            </div>
        </div>
    )
}

export default Signup