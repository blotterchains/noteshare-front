import { Button } from '@material-ui/core';
import { AddShoppingCartOutlined, ArrowDownward } from '@material-ui/icons';
import React from 'react';
import { myStyles } from '../global/gbvars';
export function BuyButton(props){
    const bookInfo=props.book;
    console.log(bookInfo)
    const classes=myStyles();
    if(props.book.price === 'free'){
        return(
            <Button 
                onClick={()=>window.open(props.book.url,'_blank')}
                className={classes.boldFonts} 
                variant='outlined' 
                color='primary'>
                        <ArrowDownward/>
                </Button>
        )
    }
    else{
        return(
            <Button
            color='secondary'
            variant='outlined'
            className={classes.warningFonts}
            onClick={()=>{
                if(localStorage['checkout']){
                    let newArr=JSON.parse(localStorage['checkout'])
                    newArr.push(bookInfo)
                    localStorage['checkout']=JSON.stringify(newArr)
                    
                }
                else{
                    localStorage.setItem('checkout',JSON.stringify([]))
                    let newArr=JSON.parse(localStorage['checkout'])
                    newArr.push(bookInfo)
                    localStorage['checkout']=JSON.stringify(newArr)
                }
            }}
            >
                <AddShoppingCartOutlined/>
                تومان{props.book.price}
            </Button>
        )
    }
    
}