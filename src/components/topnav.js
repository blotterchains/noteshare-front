import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { logo } from '../res/res';
import { useHistory } from 'react-router-dom';
import { PersonOutline, SearchOutlined, ShopOutlined } from '@material-ui/icons';
import {myStyles} from '../global/gbvars';
import { Grid } from '@material-ui/core';
import { States } from './states';

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  button:{
      
      boxShadow:"1px 1px 1px 1px black",
      borderRadius:'3vmin'
  }
});

export default function TopNav() {
  const classes = useStyles();
  const classes1=myStyles();
  const [value, setValue] = React.useState(0);
  const history=useHistory();
  const handleGotoLink=(value)=>{
      history.push('/'+value)
  }
  function Shop(props){
    return(
      <div className={classes1.warningFonts} style={{borderRadius:'100vmin'}}>
        <ShopOutlined/>
            {props.orders}
      </div>
    )
  }
  let state=null;
  return (
    <States.Consumer>
      {(states)=>{
        console.log(states)
        return(
          <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      dir='rtl'
      showLabels
      className={classes1.root}
    >
      {}
        <BottomNavigationAction onClick={()=>handleGotoLink('profile')}  icon={<PersonOutline/>} />
        <BottomNavigationAction onClick={()=>handleGotoLink('order')} icon={<Shop orders={JSON.parse(localStorage['checkout']).length}/>} />
 
        <BottomNavigationAction onClick={()=>handleGotoLink('')} classes={{selected:classes1.buttonSelected}} icon={<img width="200vw" src={logo.default} />} />
    <BottomNavigationAction onClick={()=>handleGotoLink('book')} classes={{selected:classes1.buttonSelected}} label="کتاب"  />
    <BottomNavigationAction onClick={()=>handleGotoLink('note')} classes={{selected:classes1.buttonSelected}} label="جزوه"  />
    <BottomNavigationAction onClick={()=>handleGotoLink('vcbook')} classes={{selected:classes1.buttonSelected}} label="کتاب صوتی"  /> 
    
    
    
        
    
    </BottomNavigation>
        )
        }
      }
    </States.Consumer>
    
  );
}
export function TopNavRight(){
    const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history=useHistory();
  const handleGotoLink=(value)=>{
      history.push('/'+value)
  }
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      dir='rtl'
      showLabels
      className={classes.root}
    >
    <BottomNavigationAction onClick={()=>handleGotoLink('profile')}  icon={<PersonOutline/>} />
    <BottomNavigationAction onClick={()=>handleGotoLink('checkout')} icon={<ShopOutlined/>}  />
    <BottomNavigationAction onClick={()=>handleGotoLink('search')} icon={<SearchOutlined/>}  /> 
    </BottomNavigation>
  );
}