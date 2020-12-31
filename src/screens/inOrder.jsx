import { Box, Button, Divider, Grid } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { borderRadius, myStyles } from '../global/gbvars';
function RenderItems(props){
    const classes=myStyles()
    console.log(props)
    const orders=props.orders;
    const setOrders=props.setOrders;
    const handleDelete=(index)=>{
        let order=JSON.parse(localStorage['checkout'])
        order.splice(index,1)
        localStorage['checkout']=JSON.stringify(order)
        setOrders(order)
    }
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
                                
                                        <Button 
                                        variant='outlined'
                                        color='secondary'
                                        onClick={()=>{handleDelete(index)}}
                                        >
                                            <Delete/>
                                        </Button>
                                    
                            </Grid>
                            <Grid item>
                           
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
                                <Grid container>
                                    <Grid item>
                                        <p className={classes.boldFonts}>
                                            قیمت:
                                        </p>
                                    </Grid>
                                    <Grid item>
                                        <p className={classes.descriptionFonts}>
                                            {item.price}
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
function CheckOut(props){
    let price=0;
    let counts=0
    props.orders.map((item,index)=>{
           price+=item.price;
           counts=index
    })
    return(
       <div>
           مبلغ قابل پرداخت:{price}
           <br/>
           تعداد:{counts+1}
       </div>

    )
}
export function InOrder(props){
    const classes = myStyles();
    const history=useHistory();
    const [orders,setOrders]=React.useState(JSON.parse(localStorage['checkout']))

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
                        
                        <Grid dir='rtl' container>
                            <Grid style={{width:'50%'}} item>
                            <div dir='rtl'>
                                <RenderItems
                                setOrders={setOrders} orders={orders}
                                />
                            </div>
                            </Grid>
                            <Grid style={{width:'30%'}} item>
                                <Box
                                borderRadius={borderRadius}
                                boxShadow={3}
                                style={{width:'100%'}}
                                className={classes.innerinnerRoot}
                                >
                                    <CheckOut orders={orders}/>
                                    <Button 
                                    onClick={()=>history.push('/buy')}
                                    color='secondary'>
                                        پرداخت
                                    </Button>
                                </Box>
                                
                            </Grid>
                        </Grid>
                        
                    
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