import React,{useState,useEffect,useContext} from 'react'
import './App.css';
import Routes from './components/Routes';
import {ApiContext} from './components/ApiContext';
function App() {
  const[out,setOut]=useState()
  
const[inn,setinn]=useState()
const[re,setre]=useState(false)
  const { drop, setDrop } = useContext(ApiContext);

  useEffect(()=>{
    
    var tok= sessionStorage.getItem('auth-token')
    console.log('token',tok)
    if(!tok){
      setOut(true)
    }
    else{setOut(false)}
    
  },[inn])

  
  
  const handleOut=()=>{
    sessionStorage.removeItem('auth-token')
    setinn(false)
    setre(true)
  }
  
  return (
    <div className="App">
      <Routes/>
      
      
    </div>
  );
}

export default App;














// const[inn,setinn]=useState()
// const[re,setre]=useState(false)