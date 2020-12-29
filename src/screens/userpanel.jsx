import React from 'react';
import {StyleRoot} from 'radium'
import { animationStyles,borderRadius, fetchapiWithotToken, fileToBase64, myStyles, uploader } from '../global/gbvars';
import { Box, Button, Grid, MenuItem, Select, TextField, } from '@material-ui/core';
import { AddBox, CheckOutlined, Close, Delete, Email, Home, Money, Publish, Receipt, SendOutlined, SupervisorAccountOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { ProductList } from '../components/listproduct';
import CircularProgress from '@material-ui/core/CircularProgress';
function BookRender(props){
    if(props.books){
        return(props.books.map((item,index)=>{
            console.log(item)
            return(item.name)
        }))
    }else{
        return 'no book'
    }
}
function NewBookImages(props){
    return(
        props.images.map((item,index)=>{
            return(
                <Grid item>
                    <Box
                    borderRadius={borderRadius}
                    boxShadow={3}
                    style={{
                        backgroundImage:`url(${item})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width:'20vmin',
                        height:'30vmin'
                        }}
                    >
                        <Button 
                        style={{width:'100%',minHeight:'100%'}}
                        onClick={()=>props.setImages(state=>{return(state.filter(value=>value!==item))})}
                        color='secondary'>
                            <Delete style={{fontSize:'10vmin'}}/>

                        </Button>
                    </Box>
                </Grid>
            )
        })
    )
}
export function EditBook(props){
    const classes=myStyles();
    console.log(props.book)
    const [data,setData]=React.useState(
            {
                "token":localStorage['usertoken'],
                 "author": "",
                 "description": "",
                 "littledesc": "",
                 "name": "",
                 "pages": 0,
                 "price": 0,
            }
        )
    const [author,setAuthor]=React.useState(props.book.author ? props.book.author:"");
    const [description,setDescription]=React.useState(props.book.description||"");    
    const [littledesc,setLittledesc]=React.useState(props.book.littledesc||"");
    const [name,setName]=React.useState(props.book.name||"");
    const [pages,setPages]=React.useState(props.book.pages||0);
    const [price,setPrice]=React.useState(props.book.price||0)        
    const [type,setType]=React.useState(props.book.type||'نوع محصول')
    const [images,setImages]=React.useState(props.book.images||[]);
    const [url,setUrl]=React.useState(props.book.url||'');
    const [loaded,setLoaded]=React.useState(false)
    console.log(data)
    
    const handleData=(name,text)=>{
        switch(name){
            case 'author':
                
                setData(state=>{
                    state.author=text;
                    setAuthor(text);
                    return(state)
                })
                break;
            case 'description':
                setData(state=>{
                    state.description=text;
                    setDescription(text);
                    return(state)
                })
                break;
            case 'name':
                setData(state=>{
                    state.name=text;
                    setName(text)
                    return(state)
                })
                break;
            case 'pages':
                setData(state=>{
                    state.pages=text;
                    setPages(text)
                    return(state)
                })
                break;
            case 'price':
                setData(state=>{
                    state.price=text;
                    setPrice(text)
                    return(state)
                })
                break;
            case 'type':
                
                setType(text)
                break;
            case 'url':
                setUrl(text)
                break;
            case 'images':
                
                setImages(state=>[...state,text])
                break;
            case 'send':
                setData(data=>{
                    data.littledesc = data.description.slice(0,150)+'...';
                    if(data.price===0||data.price===''){
                        data.price='free';
                        data={...data,url:url,images:images,type:type};
                        return data
                    }else{
                        data.price=parseInt(data.price);
                        data={...data,url:url,images:images,type:type}
                        console.log(data)
                        return(data)
                    }
                   
                })
                fetchapiWithotToken(data,'books-newbook')
                .then(res=>console.log(res))

                break;
        }
        
    }
    async function handleConvert(input){
       return( await fileToBase64(input.files[0])
        .then(response=>response))
    }
    React.useEffect(()=>{setLoaded(true)},[])
    if(loaded){
      return(
             <div  dir='rtl'>
                 <Grid style={{width:'100%'}} container>
                     <Grid style={{width:'40%'}} item>
                     <Box 
                         borderRadius={borderRadius}
                         boxShadow={3}
                         className={classes.innerinnerRoot}>
                        <h3 className={classes.descriptionFonts}>
                            {props.book ? ('تغییر کتاب'):('کتاب جدید')}
                            
                        </h3>
                        <TextField
                        style={{width:'100%'}}
                        variant='filled'
                        value={name}
                        placeholder='نام کتاب'
                        onChange={(e)=>{handleData('name',e.target.value);console.log(data)}}
                        />
                        <br/>
                        <TextField
                        style={{width:'100%'}}
                        variant='filled'
                        value={author}
                        placeholder='نام نویسنده'
                        onChange={(e)=>{handleData('author',e.target.value);console.log(data)}}
                        />
                        <br/>
                        
                        <br/>
                        
                        <TextField
                        style={{width:'100%'}}
                            variant='filled'
                            value={description}
                            placeholder='توضیحات'
                            rows={4}
                            multiline
                            onChange={(e)=>{handleData('description',e.target.value);console.log(data)}}
                            
                            />
                        <TextField
                        style={{width:'100%'}}
                            variant='filled'
                            value={pages}
                            placeholder='تعداد صفحات'
                            onChange={(e)=>{handleData('pages',e.target.value);console.log(data)}}
                            
                            />
                        <TextField
                        style={{width:'100%'}}
                            variant='filled'
                            value={price}
                            placeholder='قیمت یا خالی برای رایگان'
                            onChange={(e)=>{handleData('price',e.target.value);console.log(data)}}
                            
                            />
                        <Select
                            value={type}
                            style={{width:'100%'}}
                            variant='filled'
                            onChange={(e)=>handleData('type',e.target.value)}
                            >
                            <MenuItem value='book'>کتاب</MenuItem>
                            <MenuItem value='vcbook'>کتاب صوتی</MenuItem>
                            <MenuItem value='note'>جزوه</MenuItem>
                            </Select>
                            <br/>
                           
                            
                                {url!=='' ? (
                                    
                                        <Button onClick={()=>window.open(url,'_blank')}>
                                            لینک کتاب 
                                        </Button>
                                    
                                    ):(
                                        <Button 
                                        variant='outlined'
                                        onClick={()=>document.getElementById('pdf').click()}>
                                            <Publish/>
                                            
                                        </Button>
                                    )}
                            <Button 
                            variant='outlined'
                            className={classes.buttonSelected}
                            onClick={()=>handleData('send','nothing')}>
                                <CheckOutlined/>
                            </Button>
                            <Button 
                            variant='outlined'
                            color='secondary'
                            style={{alignSelf:'right'}} onClick={()=>props.setScreen('books')}>
                                <Close/>
                            </Button>
                        <input 
                        onChange={(e)=>{
                            let input= document.getElementById('image')
                            handleConvert(input)
                            .then(response=>{
                                uploader(response)
                                .then(response=>handleData('images',response.url))
                            })
                        }}
                        accept='.jpg'
                        id='image' 
                        name='file'
                        type='file'
                        hidden
                        />
                        <input 
                        onChange={(e)=>{
                            let input= document.getElementById('pdf')
                            handleConvert(input)
                            .then(response=>{
                                uploader(response)
                                .then(response=>handleData('url',response.url))
                            })
                        }}
                        accept='.pdf'
                        id='pdf' 
                        name='file'
                        type='file'
                        hidden
                        />
                        </Box>
                     </Grid>
                     <Grid style={{width:'60%'}} item>
                         <Box 
                         borderRadius={borderRadius}
                         boxShadow={3}
                         className={classes.innerinnerRoot}>
                             
                         
                            <center>
                                <h3 className={classes.descriptionFonts}>
                                    تصاویر
                                </h3>
                            </center>
                            
                            <Grid spacing={3} container>
                                <NewBookImages setImages={setImages} images={images}/>
                                <Grid item>
                                <Box
                        borderRadius={borderRadius}
                        boxShadow={3}
                        className={classes.innerRoot}
                        style={{
                            width:'20vmin',
                            height:'30vmin',
                            padding:0,
                            margin:0
                            }}
                        >
                            
                            <Button style={{width:'100%',minHeight:'100%'}} onClick={()=>document.getElementById('image').click()}>
                                <h1>
                                    <AddBox style={{fontSize:'10vmin'}}/>
                                </h1>
                            </Button>
                                </Box>
                    
                                </Grid>
                            </Grid>
                        </Box>
                        
                     </Grid>
                 </Grid>
                   
                </div>
    )  
    }
    else{
        return 'loading'
    }
}
export function NewBook(props){
    const classes=myStyles();
    console.log(props.book)
    const [data,setData]=React.useState(
            {
                "token":localStorage['usertoken'],
                 "author": "",
                 "description": "",
                 "littledesc": "",
                 "name": "",
                 "pages": 0,
                 "price": 0,
            }
        )
    
    const [images,setImages]=React.useState([]);
    const [type,setType]=React.useState('نوع محصول')
    const [url,setUrl]=React.useState('');
    const [loaded,setLoaded]=React.useState(false)
    console.log(data)
    
    const handleData=(name,text)=>{
        switch(name){
            case 'author':
                
                setData(state=>{
                    state.author=text;
                    return(state)
                })
                break;
            case 'description':
                setData(state=>{
                    state.description=text;
                    return(state)
                })
                break;
            case 'name':
                setData(state=>{
                    state.name=text;
                    return(state)
                })
                break;
            case 'pages':
                setData(state=>{
                    state.pages=text;
                    return(state)
                })
                break;
            case 'price':
                setData(state=>{
                    state.price=text;
                    return(state)
                })
                break;
            case 'type':
                
                setType(text)
                break;
            case 'url':
                setUrl(text)
                break;
            case 'images':
                
                setImages(state=>[...state,text])
                break;
            case 'send':
                setData(data=>{
                    data.littledesc = data.description.slice(0,150)+'...';
                    if(data.price===0||data.price===''){
                        data.price='free';
                        data={...data,url:url,images:images,type:type};
                        return data
                    }else{
                        data.price=parseInt(data.price);
                        data={...data,url:url,images:images,type:type}
                        console.log(data)
                        return(data)
                    }
                   
                })
                fetchapiWithotToken(data,'books-newbook')
                .then(res=>console.log(res))

                break;
        }
        
    }
    async function handleConvert(input){
       return( await fileToBase64(input.files[0])
        .then(response=>response))
    }
    React.useEffect(()=>{setLoaded(true)},[])
    if(loaded){
      return(
             <div  dir='rtl'>
                 <Grid style={{width:'100%'}} container>
                     <Grid style={{width:'40%'}} item>
                     <Box 
                         borderRadius={borderRadius}
                         boxShadow={3}
                         className={classes.innerinnerRoot}>
                        <h3 className={classes.descriptionFonts}>
                            {props.book ? ('تغییر کتاب'):('کتاب جدید')}
                            
                        </h3>
                        <TextField
                        style={{width:'100%'}}
                        variant='filled'
                        placeholder='نام کتاب'
                        onChange={(e)=>{handleData('name',e.target.value);console.log(data)}}
                        />
                        <br/>
                        <TextField
                        style={{width:'100%'}}
                        variant='filled'
                        placeholder='نام نویسنده'
                        onChange={(e)=>{handleData('author',e.target.value);console.log(data)}}
                        />
                        <br/>
                        
                        <br/>
                        
                        <TextField
                        style={{width:'100%'}}
                            variant='filled'
                            placeholder='توضیحات'
                            rows={4}
                            multiline
                            onChange={(e)=>{handleData('description',e.target.value);console.log(data)}}
                            
                            />
                        <TextField
                        style={{width:'100%'}}
                            variant='filled'
                            placeholder='تعداد صفحات'
                            onChange={(e)=>{handleData('pages',e.target.value);console.log(data)}}
                            
                            />
                        <TextField
                        style={{width:'100%'}}
                            variant='filled'
                            placeholder='قیمت یا خالی برای رایگان'
                            onChange={(e)=>{handleData('price',e.target.value);console.log(data)}}
                            
                            />
                        <Select
                            value={type}
                            style={{width:'100%'}}
                            variant='filled'
                            onChange={(e)=>handleData('type',e.target.value)}
                            >
                            <MenuItem value='book'>کتاب</MenuItem>
                            <MenuItem value='vcbook'>کتاب صوتی</MenuItem>
                            <MenuItem value='note'>جزوه</MenuItem>
                            </Select>
                            <br/>
                           
                            
                                {url!=='' ? (
                                    
                                        <Button onClick={()=>window.open(url,'_blank')}>
                                            لینک کتاب 
                                        </Button>
                                    
                                    ):(
                                        <Button 
                                        variant='outlined'
                                        onClick={()=>document.getElementById('pdf').click()}>
                                            <Publish/>
                                            
                                        </Button>
                                    )}
                            <Button 
                            variant='outlined'
                            className={classes.buttonSelected}
                            onClick={()=>handleData('send','nothing')}>
                                <CheckOutlined/>
                            </Button>
                            <Button 
                            variant='outlined'
                            color='secondary'
                            style={{alignSelf:'right'}} onClick={()=>props.setScreen('books')}>
                                <Close/>
                            </Button>
                        <input 
                        onChange={(e)=>{
                            let input= document.getElementById('image')
                            handleConvert(input)
                            .then(response=>{
                                uploader(response)
                                .then(response=>handleData('images',response.url))
                            })
                        }}
                        accept='.jpg'
                        id='image' 
                        name='file'
                        type='file'
                        hidden
                        />
                        <input 
                        onChange={(e)=>{
                            let input= document.getElementById('pdf')
                            handleConvert(input)
                            .then(response=>{
                                uploader(response)
                                .then(response=>handleData('url',response.url))
                            })
                        }}
                        accept='.pdf'
                        id='pdf' 
                        name='file'
                        type='file'
                        hidden
                        />
                        </Box>
                     </Grid>
                     <Grid style={{width:'60%'}} item>
                         <Box 
                         borderRadius={borderRadius}
                         boxShadow={3}
                         className={classes.innerinnerRoot}>
                             
                         
                            <center>
                                <h3 className={classes.descriptionFonts}>
                                    تصاویر
                                </h3>
                            </center>
                            
                            <Grid spacing={3} container>
                                <NewBookImages setImages={setImages} images={images}/>
                                <Grid item>
                                <Box
                        borderRadius={borderRadius}
                        boxShadow={3}
                        className={classes.innerRoot}
                        style={{
                            width:'20vmin',
                            height:'30vmin',
                            padding:0,
                            margin:0
                            }}
                        >
                            
                            <Button style={{width:'100%',minHeight:'100%'}} onClick={()=>document.getElementById('image').click()}>
                                <h1>
                                    <AddBox style={{fontSize:'10vmin'}}/>
                                </h1>
                            </Button>
                                </Box>
                    
                                </Grid>
                            </Grid>
                        </Box>
                        
                     </Grid>
                 </Grid>
                   
                </div>
    )  
    }
    else{
        return 'loading'
    }
    
}
function UserHome(props){
    const classes=myStyles();
    const [sold,setSold]=React.useState(0);
    const [buy,setBuy]=React.useState(0);
    const [load,setLoad]=React.useState(0);
    React.useEffect(() => {
        let s=setInterval(()=>{
            
            setSold(state=>{
                if(state<70){
                    return state+10
                }
                else{
                    clearInterval(s)
                    return state
                }
                
            
            })
            
        },100)
        let b=setInterval(()=>{
            
            setBuy(state=>{
                if(state<60){
                    return state+10
                }
                else{
                    clearInterval(b)
                    return state
                }
                
            
            })
            
        },100)
        let l=setInterval(()=>{
            
            setLoad(state=>{
                if(state<80){
                    return state+10
                }
                else{
                    clearInterval(l)
                    return state
                }
                
            
            })
            
        },100)
        return () => {
            // clearInterval(s)
        }
    }, [])
    return(
           
                <Box 
                boxShadow={3} 
                borderRadius={borderRadius}
                className={classes.innerRoot}>
                    <Box boxShdaow={3}
                            borderRadius={borderRadius}
                            className={classes.innerinnerRoot}>
                    <Grid 
                    spacing={5}
                    style={{justifyContent:'center'}}
                    container
                    >
                        <Grid item
                        style={{width:'30%'}}
                        >
                            <Button>
                            <div>
                                   <Box
                                top={0}
                                left={0}
                                bottom='5vh'
                                right={0}
                                position="absolute"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                fontSize='2.5vmin'
                                >
                                     <p 
                                    style={{fontSize:'0.8rem',width:'60%'}}
                                    className={classes.descriptionFonts}>
                                        37 
                                        <br/>
                                        کتاب خریداری شده                                   
                                        </p>
                                </Box>
                            <CircularProgress 
                                size='25vmin'
                                variant="determinate" 
                                color='secondary'
                                value={buy}/> 
                                </div>
                            </Button>
                                
                                
                            
                        </Grid>
                        <Grid item
                        style={{width:'30%'}}

                        >
                                <Button>
                                <Box
                                top={0}
                                left={0}
                                bottom='5vh'
                                right={0}
                                position="absolute"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                fontSize='2.5vmin'
                                >
                                     <p 
                                    style={{fontSize:'0.8rem',width:'60%'}}
                                    className={classes.descriptionFonts}>
                                        37 
                                        <br/>
                                        کتاب فروخته شده                                    
                                        </p>
                                </Box>
                                <CircularProgress 
                                size='25vmin'
                                variant="determinate" 
                                color='primary'
                                value={sold}/>
                            
                                </Button>

                                
                        </Grid>
                        <Grid item
                        style={{width:'30%'}}

                        >
                            <Button
                            onClick={()=>props.setScreen('mybooks')}
                            >
                            <Box
                                top={0}
                                left={0}
                                bottom='5vh'
                                right={0}
                                position="absolute"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                >
                                    <p 
                                    style={{fontSize:'0.8rem',width:'60%'}}
                                    className={classes.descriptionFonts}>
                                        37 
                                        <br/>
                                        محتوا بازگذاری شده
                                    </p>
                                    
                                </Box>
                            <CircularProgress 
                                size='25vmin'
                                variant="determinate" 
                                color='inherit'
                                value={load}/>
                            </Button>
                            
                                
                        </Grid>

                    </Grid>
                    </Box>
                    
                </Box>
    )
}
export function UserPanel(props){
    const [userInfo,setUserInfo]=React.useState({});
    const [screen,setScreen]=React.useState('home');
    const history=useHistory()
    const classes=myStyles()
    React.useEffect(() => {
        if(localStorage['usertoken']){
            fetchapiWithotToken({token:localStorage['usertoken']},'login-userinfo')
            .then(response=>{
                if(response._id){
                    setUserInfo(response)
                    console.log(response)
                }
                else{
                    alert(response)
                    history.push('/login')
                }
            })
        }
        else{
            history.push('/login')
        }
        return () => {
            
        }
    }, [])
    return(
        <StyleRoot>
            <div >
                <Box 
                className={classes.root}
                >
                    <Grid dir='rtl' container>
                        <Grid style={{width:'30%'}} item>
                            <div style={animationStyles.fadeInRight}>
                                <Box 
                                className={classes.innerRoot} 
                                boxShadow={3} 
                                borderRadius={borderRadius}>
                                    
                                    <div >
                                        <SupervisorAccountOutlined/>
                                        نام کاربری:<p className={classes.boldFonts}>{userInfo.username}</p>
                                        <Email/>
                                        ایمیل:<p className={classes.boldFonts}>{userInfo.email}</p>
                                        <Money/>
                                        موجودی:<p className={classes.boldFonts}>{userInfo.balance}</p>

                                    </div>
                                </Box>
                                <Box 
                                className={classes.innerRoot} 
                                boxShadow={3} 
                                borderRadius={borderRadius}>
                                    <div style={{alignContent:'right'}}>
                                    <Button
                                        onClick={()=>setScreen('home')}
                                        >
                                            <Grid  container>
                                                <Grid item>
                                                    <Home/>
                                                </Grid>
                                                <Grid item>
                                                    خانه
                                                </Grid>
                                            </Grid>
                                             
                                        </Button>
                                        <br/>
                                        <Button
                                        onClick={()=>setScreen('newbook')}
                                        >
                                            <Grid container>
                                                <Grid item>
                                                    <AddBox/>
                                                </Grid>
                                                <Grid item>
                                                    کتاب جدید
                                                </Grid>
                                            </Grid>
                                             
                                        </Button>
                                        <br/>
                                        <Button>
                                            <Grid container>
                                                <Grid item>
                                                    <Receipt/>
                                                </Grid>
                                                <Grid item>
                                                    تراکنش های من
                                                </Grid>
                                            </Grid>
                                        </Button>
                                    </div>
                                </Box>
                            </div>
                        </Grid>
                        <Grid style={{width:'70%'}} item>
                                {/* <Box 
                                boxShadow={3} 
                                borderRadius={borderRadius}
                                className={classes.innerRoot}>
                                    <div>
                                        <ProductList panel list={userInfo.books}/>
                                    </div>
                                </Box> */}
                                {
                                    screen==='home' ? (
                                        <div style={animationStyles.fadeInLeft}>
                                        <UserHome 
                                        setScreen={setScreen}
                                        userInfo={userInfo}/>
                                        </div>
                                    ):('')
                                }
                                {
                                    screen==='mybooks' ? (
                                        <div style={animationStyles.fadeInLeft}>
                                             <Box 
                                        boxShadow={3} 
                                        borderRadius={borderRadius}
                                        className={classes.innerRoot}>
                                        <ProductList 
                                        panel 
                                        list={userInfo.books}/>
                                        </Box>
                                        </div>
                                    ):('')
                                }
                                {
                                    screen==='newbook' ? (
                                    <div style={animationStyles.fadeInLeft}>
                                        
                                        <Box 
                                        boxShadow={3} 
                                        borderRadius={borderRadius}
                                        className={classes.innerRoot}>
                                            <div style={{ width: '100%'}}>
                                            
                                            </div>
                                            
                                            
                                            <NewBook setScreen={setScreen}/>
                                            
                                            
                                            
                                        
                                        </Box>
                                        
                                    </div>
                                    
                                    ):('')
                                }
                                
                                
                        </Grid>
                    </Grid>
                </Box>
                
            </div>
        </StyleRoot>
   
    )
}