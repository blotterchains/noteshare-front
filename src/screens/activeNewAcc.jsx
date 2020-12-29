import { Box, Button, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { fetchapiWithotToken, myStyles, borderRadius, animationStyles } from '../global/gbvars';
import {StyleRoot} from 'radium';
export function ActiveNewAcc(props){
    const hash=props.match.params.hash;
    const history=useHistory()
    const [userInfo,setUserInfo]=React.useState({
        "_id": "",
        "username": ""
    })
    const classes=myStyles()
    React.useEffect(() => {
        fetchapiWithotToken({hash:hash},'signup-compelete')
        .then((response)=>{
            setUserInfo(response)
        })
        return () => {
            
        }
    }, [])
    return(
        
        <div
        className={classes.root}
        >
            <StyleRoot>
                <div style={animationStyles.fadeIn}>
                    <Box 
                    borderRadius={borderRadius}
                    className={classes.innerRoot}>
                        <Alert 
                        className={classes.innerinnerRoot}
                        dir='rtl'>
                            <h1 className={classes.boldFonts}>
                            کاربری گرامی {userInfo.username},
                            حساب شما با موفقیت فعال شد
                            </h1>
                        </Alert>
                        <Button onClick={()=>history.push('/login')}>
                        <h1>   انتقال به صفحه ورود</h1> 
                        </Button>
                    </Box>
                </div>
            </StyleRoot>
           
            
        </div>
    )
}