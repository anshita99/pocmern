import React, { useContext } from 'react';
import { Link,Redirect,useHistory} from 'react-router-dom';
import {ApiContext} from './ApiContext';

const Navbar=()=>{
    let history=useHistory();
  const { truevalue, settruevalue } = useContext(ApiContext);
    const handleOut=()=>{
        sessionStorage.removeItem('auth-token')
        settruevalue(!truevalue)
        history.push('/')
          }
    return(
        
<nav class="navbar navbar-light bg-dark">
  
  
          <Link to="/admin">Admin</Link>
          <div className="navbar-nav ml-auto">
    <Link to="/login" ><button>Login</button></Link>
    {/* <Link to="/admin" className=" text-danger ml-2">Admin Login</Link> */}
    <Link to="/signup" ><button>Signup</button></Link> 
          {truevalue ? <button onClick={handleOut}>Logout</button> : ''}
          </div> 
  
</nav>
    )
}
export default Navbar;