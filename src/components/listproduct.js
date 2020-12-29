import { Avatar, Box, Button, Grid } from '@material-ui/core';
import { AddShoppingCartOutlined, Edit, Visibility } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { useHistory } from 'react-router-dom';
import {myStyles} from '../global/gbvars'
import { EditBook } from '../screens/userpanel';
import FullScreenDialog from './dialogs';
export function ProductPlaceHolder(props){
    if(props.placeholder){
        return(
            props.placeholder.map((item,index)=>{
                return(<Skeleton variant="text"/>)
            })
        )
    }else{
        alert('no')
        return('')
    }
}
export function ProductList(props){
    const history=useHistory()
    if(props.list){
        const classes=myStyles();
        return(props.list.map((item,index)=>{
            return(
                <div>
                    <Box borderRadius='3vmin'
                        boxShadow={3} className={classes.innerinnerRoot}>
                        <Grid spacing={3} dir='rtl' container>
                            <Grid item>
                                <Box 
                                borderRadius='3vmin'
                                boxShadow={3}
                                style={{
                                    backgroundImage:`url(${item.pic})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height:'30vh',
                                    width:'8vw'}} src={item.pic}>

                                </Box>
                            </Grid>
                            <Grid item>
                                <Button >
                                <p className={classes.boldFonts}>
                                    {item.name}
                                </p>
                                </Button>
                                <p className={classes.descriptionFonts}>
                                    {item.author}
                                </p>
                                
                                <p className={classes.warningFonts}>
                                    {item.price!=='free' ? (`قیمت:${item.price}تومان`):('قیمت:رایگان!')}
                                </p>
                                <Grid spacing={2} container>
                                    {props.panel ? (''):(
                                         <Grid item>
                                         <Button className={classes.warningFonts} variant='outlined' color='secondary'>
                                                 <AddShoppingCartOutlined/>
                                         </Button>
                                     </Grid>
                                    )}
                                   
                                    <Grid item>
                                        <Button 
                                        onClick={()=>history.push(`/${item.owner.username}/${item.hash}/book`)}
                                        variant='outlined'>
                                                <Visibility/>
                                        </Button>
                                    </Grid>
                                    {props.panel ? (
                                        <Grid item>
                                            <FullScreenDialog label={<Edit/>}>
                                                <EditBook 
                                                book={item}/>
                                            </FullScreenDialog>
                                        </Grid>
                                    ):('')}
                                </Grid>
                               
                            </Grid>
                            <Grid item>
                                <p className={classes.descriptionFonts}>
                                    {item.description}
                                </p>
                            </Grid>
                        </Grid>                        
                    </Box>
                </div>
            )
        }))
    }else{
        return('')
    }
    
}