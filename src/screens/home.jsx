import { Box, Button, Divider, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { SlideShow } from '../components/slideshow';
import { Tabs } from '../components/tab';
import { fetchapiWithotToken, myStyles } from '../global/gbvars';

const useStyle=makeStyles({
    root:{
        padding:'3vmin',
        borderRadius:'3vmin',
        margin:'3vmin'
    }
})
const style={
    boxShadow:3
}

export function Home(props){
    const classes=myStyles();
    const [background,setBackground]=React.useState([
        {title:'yek matn',url:'https://wallpapergram.ir/wp-img/WallpaperGram.IR_1561844284_z79913.jpg'},
        {title:'do matn',url:'https://www.mizanonline.com/files/fa/news_albums/630650/31717/resized/resized_2635074_518.jpg'},
        {title:'sematn',url:'https://cdn01.zoomit.ir/2019/1/18652e96-8c7d-4f88-a671-767bfe705751.jpg?w=768'}
    ]);
    const [books,setBooks]=React.useState([
        {"_id" : 1, "0" : "", "author" : "", "pages" : 0, "" : "", "rank" : "", "littledesc" : "", "owner" : { "_id" : "1", "username" : "wizif" }, "price" : 0, "type" : "", "pic" : "" },
        {"_id" : 1, "0" : "", "author" : "", "pages" : 0, "" : "", "rank" : "", "littledesc" : "", "owner" : { "_id" : "1", "username" : "wizif" }, "price" : 0, "type" : "", "pic" : "" },
        {"_id" : 1, "0" : "", "author" : "", "pages" : 0, "" : "", "rank" : "", "littledesc" : "", "owner" : { "_id" : "1", "username" : "wizif" }, "price" : 0, "type" : "", "pic" : "" },

    ])
    const [type,setType]=React.useState('book')
    const handleShowBooks=(type)=>{
        switch (type) {
            case 'book':
                fetchapiWithotToken({limit:8,page:0,type:type},'find-books')
                .then(response=>{setType('book');setBooks(response);})
                break;
            case 'vcbook':
                fetchapiWithotToken({limit:8,page:0,type:type},'find-books')
                .then(response=>{setType('vcbook');setBooks(response);});
                break;
            case 'note':
                fetchapiWithotToken({limit:8,page:0,type:type},'find-books')
                .then(response=>{setType('note');setBooks(response);});
                break;
            default:
                break;
        }
        
    }
    React.useEffect(() => {
        handleShowBooks('book')
        return () => {
            
        }
    }, [])
    const history=useHistory()
    return(
        <Box 
        className={classes.root}
        boxShadow={3}
        >
            <Box boxShadow={3} className={classes.innerRoot} style={{padding:'2vmin',borderRadius:'3vmin',overflowX:'hidden'}}>
                <SlideShow images={background}/>
                <Grid style={{justifyContent:'center'}} container>
                    
                    <Grid style={{width:'45%'}} item>
                        <h4 className={classes.boldFonts}>
                            پیشنهاد های ویژه
                        </h4>
                        <SlideShow disNavButton images={background}/>
                    </Grid>
                    <Grid style={{width:'45%'}} item>
                        <Grid style={{justifyContent:'center'}} container>
                            <Grid item>
                            <h4 className={classes.boldFonts}>
                                notes
                            </h4>
                            </Grid>
                            <Grid item>
                            <h4 className={classes.warningFonts}>
                                share
                            </h4>
                            </Grid>
                        </Grid>
                        
                        <SlideShow disNavButton images={background}/>

                    </Grid>
                </Grid>
            </Box>
            
            <Button className={type==='book' ? (classes.buttonSelected):(classes.buttonUnSelected)} onClick={()=>handleShowBooks('book')}>کتاب</Button>
            <Button className={type==='note' ? (classes.buttonSelected):(classes.buttonUnSelected)} onClick={()=>handleShowBooks('note')}>جزوه</Button>
            <Button className={type==='vcbook' ? (classes.buttonSelected):(classes.buttonUnSelected)} onClick={()=>handleShowBooks('vcbook')}>کتاب صوتی</Button>
            <Divider/>
            <Tabs title={type} books={books}/>
        </Box>
    )
}