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
import { InOrder } from '../screens/inOrder.jsx';
import { AllVCBook } from '../screens/allvcbook.jsx';
import { AllNotes } from '../screens/allnotes.jsx';
import { States } from './states.js';
import { Buy } from '../screens/buy.jsx';
import { myStyles } from '../global/gbvars.js';
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
        path:'/vcbook',
        render:<AllVCBook/>
    },
    {
        path:'/note',
        render:<AllNotes/>
    },
    {
        path:'/login',
        render:<Login/>
    },
    {
        path:'/profile',
        render:<UserPanel/>
    },
    {
        path:'/order',
        render:<InOrder/>
    },
]
export function Routes(){
    const classes=useStyles();
    const classes1=myStyles();
    const [orders,setOrders]=React.useState(JSON.parse(localStorage['checkout']));
    function HandleRoutes(){
        return(screens.map((i,k)=><Route exact path={i.path} render={(props)=>{
            return(
                
            i.render
            
                
            )
            }}></Route>))
        
    }
    return(
        <Router >
            <div id='route'>
            <TopNav/>
                
                <Divider />
                
                 <HandleRoutes/>
               
                <Route exact path='/:hash/active' render={(props)=><ActiveNewAcc {...props}/>}></Route>
                <Route exact path='/:username/:hash/book' render={(props)=><ProductShow {...props}/>}></Route>
                <Route exact path='/buy/:status' render={(props)=><Buy {...props}/>}></Route>
                <div style={{height:'10vh',width:'100%',backgroundColor:'black'}} id='end'>
                    <p className={classes1.boldFonts}>
                    noteshare copyright
                    </p>
                    
                </div>
            </div>
                   
        </Router>
    )
}