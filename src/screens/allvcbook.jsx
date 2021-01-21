import { Box, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { SlideShow } from '../components/slideshow';
import { myStyles,animationStyles, fetchapiWithotToken } from '../global/gbvars';
import {StyleRoot} from 'radium'
import ComboBox from '../components/textbox';
import { ProductList,ProductPlaceHolder } from '../components/listproduct';
const loadingPlaceholder=new Array(3); 
export function AllVCBook(props){
    const classes=myStyles();
    const [background,setBackground]=React.useState([
        {title:'yek matn',url:'https://wallpapergram.ir/wp-img/WallpaperGram.IR_1561844284_z79913.jpg'},
        {title:'do matn',url:'https://www.mizanonline.com/files/fa/news_albums/630650/31717/resized/resized_2635074_518.jpg'},
        {title:'sematn',url:'https://cdn01.zoomit.ir/2019/1/18652e96-8c7d-4f88-a671-767bfe705751.jpg?w=768'}
    ]);
    const [searchText,setSearchText]=React.useState('')
    const [searchList,setSearchList]=React.useState([]);
    const [rowOnelastBooks,setRowOneLastBooks]=React.useState([]);
    const [rowTwolastBooks,setRowTwoLastBooks]=React.useState([]);
    let page=0
    const handleSearch=()=>{
        fetchapiWithotToken({limit:10,name:searchText},'find-books')
        .then(response=>setSearchList(response))
    }
    const handleLast=(page)=>{
        fetchapiWithotToken({limit:10,page:page,type:'vcbook'},'find-books')
        .then(response=>{
            response.map((item,index)=>{
                if(index===0 || index%2===0){
                    setRowOneLastBooks(state=>[...state,item])
                }
                else if(index%2===1){
                    setRowTwoLastBooks(state=>[...state,item])

                }
            })
            page++
        })
    }
    useEffect(() => {
        handleLast(page);
        let scroll=0;
        let timer=null
        const onScroll=()=>{
            const last = document.getElementById("end");
            if(window.scrollY>last.offsetTop-(last.offsetTop-window.scrollMaxY)*2-(last.offsetTop-window.scrollMaxY)/2){
                if(scroll+600<window.scrollY){
                    timer=setTimeout(()=>{
                        // 
                        
                        // alert('aha')
                        handleLast(page+1)
                        page++
                        scroll=window.scrollY
                    
                },1000)
                }
                
            }
        }
        window.addEventListener('scroll',onScroll)
        return () => {
            window.removeEventListener('scroll',onScroll)

        }
    }, [])
   
    return(
        <StyleRoot>
                <Box 
                id='last'
                className={classes.root}>
                    <div  style={animationStyles.fadeIn}>
                    <Grid container>
                        <Grid style={{width:'50%'}} item>
                            <SlideShow disNavButton images={background}/>
                        </Grid>
                        <Grid style={{width:'50%'}} item>
                            <SlideShow disNavButton images={background}/>
                        </Grid>
                    </Grid>
                    <ComboBox
                    list={searchList}
                    kk={(e)=>{setSearchText(e.target.value);handleSearch()}}
                    value={searchText}
                    />
                    <Box 
                    borderRadius='3vmin'
                    boxShadow={3}
                    className={classes.innerRoot}
                   
                    >
                        <h1 className={classes.boldFonts}>
                            آخرین کتابها
                        </h1>
                        <Grid container>
                            <Grid style={{width:'50%'}} item>
                                <ProductList list={rowTwolastBooks}/>
                            </Grid>
                            <Grid item style={{width:'50%'}}>
                                <ProductList list={rowOnelastBooks}/>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid style={{width:'50%'}} item>
                            <ProductPlaceHolder placeholder={['','','','']}/>

                            </Grid>
                            <Grid style={{width:'50%'}} item>
                            <ProductPlaceHolder placeholder={['','','','']}/>

                            </Grid>
                        </Grid>
                    </Box>
                    
                    </div>
                
            </Box>
        </StyleRoot>
        
        
    )
}