import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { borderRadius, myStyles } from '../global/gbvars';
function RenderItems(props){
    const orders=JSON.parse(localStorage['checkout'])
    const classes=myStyles()
    if(orders.length===0){
        return('چیزی در سبد خرید موجود نیست')
    }else{
        return(
            orders.map((item,index)=>{
                return(
                    <Box
                    
                    className={classes.innerinnerRoot}
                    borderRadius='3vmin'
                    boxShadow={3}
                    style={{width:'50%'}}
                    >
                        <Grid 
                        spacing={3}
                        dir='rtl' container>
                            <Grid item>
                            <Box 
                                borderRadius='3vmin'
                                boxShadow={3}
                                style={{
                                    backgroundImage:`url(${item.pic})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height:'30vh',
                                    width:'8vw'}} 
                                />
                            </Grid>
                            <Grid style={{width:'40%'}} item>
                           
                                <Grid container>
                                    <Grid item>
                                        <p className={classes.boldFonts}>
                                            نام کتاب:
                                        </p>
                                    </Grid>
                                    <Grid item>
                                        <p className={classes.descriptionFonts}>
                                            {item.name}
                                        </p>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item>
                                        <p className={classes.boldFonts}>
                                            نام نویسنده:
                                        </p>
                                    </Grid>
                                    <Grid item>
                                        <p className={classes.descriptionFonts}>
                                            {item.author}
                                        </p>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item>
                                        <p className={classes.boldFonts}>
                                            تعداد صفحات:
                                        </p>
                                    </Grid>
                                    <Grid item>
                                        <p className={classes.descriptionFonts}>
                                            {item.pages}
                                        </p>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item>
                                        <p className={classes.boldFonts}>
                                            نوع محصول:
                                        </p>
                                    </Grid>
                                    <Grid item>
                                        <p className={classes.descriptionFonts}>
                                            {item.type}
                                        </p>
                                    </Grid>
                                </Grid>
                                
                        </Grid>
                        </Grid>
                    </Box>
                )
            })
        )
    }

}
export function InOrder(props){
    const classes = myStyles();
    const history=useHistory();
    if(localStorage['usertoken']){
        if(localStorage['checkout']){
            return(
                <div
                className={classes.root}
                >
                    <Box
                    boxShadow={3}
                    borderRadius={borderRadius}
                    className={classes.innerRoot}
                    >
        
                        <p className={classes.boldFonts}>
                            سبد خرید شما
                        </p>
                        <div dir='rtl'>
                            <RenderItems/>
                        </div>
                        
                    </Box>
                </div>
            )
        }else{
            localStorage.setItem('checkout',JSON.stringify([]));
            return(
                <div
                className={classes.root}
                >
                    <Box
                    boxShadow={3}
                    borderRadius={borderRadius}
                    className={classes.innerRoot}
                    >
        
                        <p className={classes.boldFonts}>
                            سبد خرید شما
                        </p>
                        <div dir='rtl'>
                            <RenderItems/>
                        </div>
                        
                    </Box>
                </div>
            )
        }
    }else{
        history.push('/login')
        return('nothing')
    }
}