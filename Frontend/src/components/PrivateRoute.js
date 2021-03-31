// import React, { Children, useContext } from 'react'
// import { Redirect, Route } from 'react-router'
// import { ApiContext } from './ApiContext'

// const PrivateRoute = ({child,...rest}) => {
//     const { isAuth, setIsAuth}=useContext(ApiContext)
//     // const auth=true;
//     console.log("Priavat Route")
//     return (
        
//       <Route {...rest} render={()=>isAuth?(<Redirect to='/login'/>):(child)}/>
//     )
// }

// export default PrivateRoute
