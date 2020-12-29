import { Box, Divider, makeStyles } from '@material-ui/core';
import React from 'react';
import {BrowserRouter as Router ,Route} from 'react-router-dom';
import { AllBook } from '../screens/allbook.jsx';
import { Home } from '../screens/home.jsx';
import { Login } from '../screens/login.jsx';
import {ActiveNewAcc} from '../screens/activeNewAcc.jsx';
import {UserPanel} from '../screens/userpanel.jsx';
import TopNav, { TopNavRight } from './topnav';
import { ProductShow } from '../screens/productShow.jsx';
const useStyles=makeStyles({
    root:{
        width: '50%'
    }
})
const screens=[
    {
        path: '/search',
        render:<h1>sdsa</h1>
    },
    {
        path:'/',
        render:<Home/>
    },
    {
        path:'/book',
        render:<AllBook/>
    },
    {
        path:'/login',
        render:<Login/>
    },
    {
        path:'/profile',
        render:<UserPanel />
    }
]
export function Routes(){
    const classes=useStyles();
    function HandleRoutes(){
        return(screens.map((i,k)=><Route exact path={i.path} render={(props)=>i.render}></Route>))
        
    }
    return(
        <Router >
            <div id='route'>
            <TopNav/>
                
                <Divider />
                <HandleRoutes/>
                <Route exact path='/:hash/active' render={(props)=><ActiveNewAcc {...props}/>}></Route>
                <Route exact path='/:username/:hash/book' render={(props)=><ProductShow {...props}/>}></Route>
                <div style={{height:'10vh',width:'5vw',backgroundColor:'red'}} id='end'/>
                <Box style={{height:'40vh'}}>
    
                </Box>
            </div>
                   
        </Router>
    )
}