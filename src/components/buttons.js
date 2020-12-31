import { Button } from '@material-ui/core';
import { AddShoppingCartOutlined } from '@material-ui/icons';
import React from 'react';
import { myStyles } from '../global/gbvars';
export function BuyButton(props){
    const bookInfo=props.book;
    console.log(bookInfo)
    const classes=myStyles();
    return(
        <Button
        color='secondary'
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
        </Button>
    )
}