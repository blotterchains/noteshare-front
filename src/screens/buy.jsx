import React from 'react';
import { Box } from '@material-ui/core';
import { borderRadius, myStyles } from '../global/gbvars';
import { useHistory } from 'react-router-dom';
export function Buy(props){
    const classes=myStyles();
    const status=props.match.params.status;
    const history=useHistory();
    React.useEffect(()=>{

        setTimeout(()=>{
            history.push("/profile")
        },2000)
    },[])
    return(
        <div
        className={classes.root}
        >
            
            <Box
            borderRadius={borderRadius}
            boxShadow={3}
            className={classes.innerRoot}
            >
             {
                 status==="1" ? (
                     'پرداخت انجام شد'
                 ):(
                     'پرداخت ناموفق'
                 )
             }   
            </Box>
        </div>
    )
}