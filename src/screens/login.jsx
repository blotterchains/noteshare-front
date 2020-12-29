import { Box, Button, Grid, TextField } from '@material-ui/core';
import { MenuBook } from '@material-ui/icons';
import React, { useEffect, useRef } from 'react';
import { animationStyles, fetchapiWithotToken, myStyles } from '../global/gbvars';
import {StyleRoot} from 'radium'
import { useHistory } from 'react-router-dom';
const style={
    textField:{
        width:'100%'
    }
}
const borderRadius='3vmin';
function Fields(props){
    const classes=myStyles();
    const show=props.show[0];
    const history=useHistory();
    const [data,setData]=React.useState({
        password:'',
        username:'',
        email:''
    })
    const handleChanges=(type,text)=>{
        let s=data;
        switch(type){
            case 'password':
                s=data
                s.password=text;
                setData(s);
                break;
            case 'username':
                s=data;
                s.username=text;
                setData(s);
                break;
            case 'email':
                s=data;
                s.email=text;
                setData(s);
                break;
            default:break;

        }
    }
    const handleSends=(type)=>{
        switch(type){
            case 'login':
                fetchapiWithotToken(data,'login')
                .then(response=>{
                    if(response.usertoken){
                        localStorage.setItem('usertoken',response.usertoken);
                        history.push('/profile')
                    }
                    else{
                        alert(response)
                    }
                })
        }
    }
    switch(props.type){
        case 'login':
            return(
                    <StyleRoot>

                    
                        <div >
                            {show[0] ? (<div style={animationStyles.fadeInUp}>
                                <TextField 
                                    onChange={(e)=>handleChanges('username', e.target.value)}
                                    style={style.textField} variant='filled' dir='rtl' placeholder='نام کاربری'/>
                            </div>):(<div style={{height:'30vh'}}/>)}
                            {show[1] ? (<div style={animationStyles.fadeInUp}>
                                <TextField 
                                    type='password'
                                    onChange={(e)=>handleChanges('password', e.target.value)}
                                    style={style.textField} variant='filled' dir='rtl' placeholder='کلمه عبور'/>
                            </div>):('')}
                            {show[2] ? (<div style={animationStyles.fadeInUp}>
                                <Button 
                                    onClick={()=>handleSends('login')}
                                    className={classes.buttonSelected} color='primary' >
                                    ورود
                                </Button>
                            </div>):('')}
                        </div>
                    </StyleRoot>
            )
        case 'signup':
            return(
                <StyleRoot>

                
                        <div>
                            {show[0] ? (<div style={animationStyles.fadeInUp}>
                                <TextField 
                                    onChange={(e)=>handleChanges('username', e.target.value)} 
                                    style={style.textField} variant='filled' dir='rtl' placeholder='نام کاربری'/>
                            </div>):(<div style={{height:'45vh'}}/>)}
                            {show[1] ? (<div style={animationStyles.fadeInUp}>
                                <TextField 
                                    onChange={(e)=>handleChanges('password', e.target.value)}
                                    type='password' style={style.textField} variant='filled' dir='rtl' placeholder='کلمه عبور'/>
                            </div>):('')}
                            {show[2] ? (<div style={animationStyles.fadeInUp}>
                                <TextField 
                                    onChange={(e)=>handleChanges('email', e.target.value)}
                                    type='email' style={style.textField} variant='filled' dir='rtl' placeholder='ایمیل'/>
                            </div>):('')}
                            {show[3] ? (<div style={animationStyles.fadeInUp}>
                                <Button 
                                    onClick={()=>{
                                        fetchapiWithotToken(data,'signup')
                                    }}
                                    className={classes.buttonSelected} color='primary' >
                                    ثبتنام
                                </Button>
                            </div>):('')}
                        </div>
                </StyleRoot>    
                
            )
        default:
            return 'no state'
    }
}
export function Login(props){
    const classes=myStyles();
    const [type,setType]=React.useState('login');
    const [show,setShow]=React.useState([]);
    const handleTimeToShow=()=>{
        setShow([])
        for(let i=0;i<4;i++){
            setTimeout(()=>{
                setShow(state=>[...state,true]);
            },100)
            
        }
    }
    useEffect(()=>{handleTimeToShow()},[])
    return(
        <Box className={classes.root}>
            
                <Box borderRadius={borderRadius} className={classes.innerRoot}>
                    <Grid container>
                        
                        <Grid style={{width:'50%'}} item>
                            <StyleRoot>
                                <div style={animationStyles.fadeInLeft}>
                                <MenuBook style={{fontSize:'30vmin'}}/>
                                <Grid style={{justifyContent:'center'}} container>
                                    <Grid item>
                                        <h1 className={classes.boldFonts}>
                                            note
                                        </h1>
                                    </Grid>
                                    <Grid item>
                                        <h1 className={classes.warningFonts}>
                                            share
                                        </h1>
                                    </Grid>
                                </Grid>
                                <p className={classes.descriptionFonts}>
                                    پلتفرم خرید و فروش جزوه به صورت آنلاین
                                </p>
                                </div>
                            </StyleRoot>
                        </Grid>
                        <Grid style={{width:'50%'}} item>
                            <StyleRoot>
                            <div style={animationStyles.fadeInRight}>
                                <Box borderRadius={borderRadius} className={classes.innerinnerRoot}>
                                    
                                        <Grid style={{margin:'3vmin',justifyContent:'center'}} spacing={3} container>
                                            <Grid item>
                                            <Button 
                                            variant='outlined'
                                            color={type==='login' ? ('primary'):('')}
                                            onClick={()=>{setType('login');handleTimeToShow()}}
                                            className={type==='login' ? (classes.boldFonts):(classes.descriptionFonts)}>
                                                ورود به حساب کاربری          
                                            </Button>
                                            </Grid>
                                            
                                            <Grid item>
                                            <Button
                                            variant='outlined'
                                            color={type==='signup' ? ('primary'):('')}
                                            onClick={()=>{setType('signup');handleTimeToShow()}}
                                            className={type==='signup' ? (classes.boldFonts):(classes.descriptionFonts)}>
                                                حساب جدید          
                                            </Button>
                                            </Grid>
                                        </Grid>
                                        
                                        <Fields show={[show,setShow]} type={type}/>                                    
                                </Box>
                            </div>

                            </StyleRoot>
                            
                           
                        </Grid>
                    </Grid>
                </Box>
                
            
        </Box>
    )
}