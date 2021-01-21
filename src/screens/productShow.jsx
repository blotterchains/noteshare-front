import { Box, Button, Divider, Grid, TextField } from '@material-ui/core';
import { AddShoppingCartOutlined, CommentOutlined, NearMeSharp, SendOutlined } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { BuyButton } from '../components/buttons';
import { SlideShow } from '../components/slideshow';
import { fetchapiWithotToken, myStyles,borderRadius } from '../global/gbvars';
function RenderComments(props){
    const classes=myStyles()
    if(props.comments && props.comments.length!==0){
        return(
            props.comments.map((item,index)=>{
                console.log(item)
                return(
                    <div>
                         <Box
                            borderRadius={borderRadius}
                            boxShadow={3}
                            className={classes.innerRoot}
                            >
                                <Grid 
                                spacing={3}
                                dir='rtl' container>
                                    <Grid item>
                                        <p className={classes.boldFonts}>
                                            {item.username}
                                        </p>
                                    </Grid>
                                    <Grid item>
                                        <p className={classes.descriptionFonts}>
                                            {item.date}
                                        </p>
                                    </Grid>
                                </Grid>
                                <div style={{alignItems:'right'}}>
                                    <p className={classes.descriptionFonts}>
                                        {item.text}
                                    </p>
                                </div>
                                
                            </Box>
                    </div>
                )
            })
        )
    }
    else{
        return 'هیچ کامنتی وجود ندارد'
    }
    
}
export function ProductShow(props){
    const hash=props.match.params.hash;
    const username=props.match.params.username;
    const history=useHistory()
    const classes=myStyles();
    const [author,setAuthor]=React.useState("");
    const [description,setDescription]=React.useState("");    
    const [littledesc,setLittledesc]=React.useState("");
    const [name,setName]=React.useState("");
    const [pages,setPages]=React.useState(0);
    const [price,setPrice]=React.useState(0)        
    const [type,setType]=React.useState('نوع محصول')
    const [images,setImages]=React.useState([]);
    const [url,setUrl]=React.useState('');
    const [comments,setComments]=React.useState([]);
    const [bookInfo,setBookInfo]=React.useState({});
    let comText='';
    
    const getBooksInfo=()=>{
        fetchapiWithotToken({hash:hash,username:username},'books-info')
        .then((response)=>{
            setAuthor(response.author);
            setDescription(response.description);
            setName(response.name);
            setPages(response.pages);
            setPrice(response.price);
            setType(response.type);
            setImages(response.images);
            setUrl(response.url);
            setComments(response.comments);
            setBookInfo(response)

        })
    }
    const handleSendComments=()=>{
        if(localStorage['usertoken']){
            fetchapiWithotToken({
                hash:hash,
                username:username,
                text:comText,
                token:localStorage['usertoken']
            },'books-comment')
            .then((response)=>getBooksInfo())
        }else{
            alert('maluciouse activity')
        }
        
    }
    React.useEffect(() => {
        getBooksInfo()
        return () => {
            
        }
    }, [])
    return(
        <div
        className={classes.root}
        >

            <Box 
            
                boxShadow={3}
                borderRadius={borderRadius}
                className={classes.innerRoot}>
                <Grid dir='rtl' container>
                    <Grid style={{width:'20%'}} item>
                        <SlideShow 
                        disNavButton
                        images={images}/>
                        {
                            price==='free' ? (
                                <Button
                                onClick={()=>window.open(url,'_blank')}
                                >
                                    دانلود
                                </Button>
                            ):(
                            <BuyButton
                            book={bookInfo}
                            />
                            
                            )
                        }
                        
                    </Grid>
                    <Grid style={{width:'40%'}} item>
                        <Box 
                        boxShadow={3}
                        borderRadius={borderRadius}
                        className={classes.innerinnerRoot}>
                            <Grid container>
                                <Grid item>
                                    <p className={classes.boldFonts}>
                                        نام کتاب:
                                    </p>
                                </Grid>
                                <Grid item>
                                    <p className={classes.descriptionFonts}>
                                        {name}
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
                                        {author}
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
                                        {pages}
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
                                        {type}
                                    </p>
                                </Grid>
                            </Grid>
                            {price==='free' ?
                            (<Grid container>
                                <Grid item>
                                    <p className={classes.boldFonts}>
                                          <a href={url} target="_blank">لینک دانلود</a>
                                    </p>
                                </Grid>
                                
                            </Grid>):('')}
                            <Grid container>
                                <Grid style={{width:'20%'}} item>
                                    <p className={classes.boldFonts}>
                                        توضیحات:
                                    </p>
                                </Grid>
                                <Grid style={{maxWidth:'80%'}} item>
                                    <p 
                                    style={{width:'70%'}}
                                    className={classes.descriptionFonts}>
                                        {description}
                                    </p>
                                </Grid>
                            </Grid>
                           
                        </Box>
                    </Grid>
                    <Grid 
                    style={{width:'40%'}}
                    item>
                        <Box 
                        borderRadius={borderRadius}
                        boxShadow={3}
                        style={{height: '80%'}}
                        className={classes.innerinnerRoot}>
                            <p className={classes.boldFonts}>
                            comments
                            </p>
                            
                            <Box
                            borderRadius={borderRadius}
                            boxShadow={3}
                            style={{
                                overflowY:'scroll',
                                height:'80%'}}
                            >
                                
                               <RenderComments comments={comments}/>
                               
                                
                            </Box>
                            {
                                 localStorage['usertoken'] ? (
                                         <Grid container>
                                             <Grid style={{width:'70%'}} item>
                                                <TextField 
                                                    variant='filled' 
                                                    placeholder='نظر شما'
                                                    multiline
                                                    row={3}
                                                    onChange={(e)=>comText=e.target.value}
                                                    />
                                                
                                             </Grid>
                                             <Grid style={{width:'30%'}} item>
                                             <Button
                                                onClick={()=>handleSendComments()}
                                                >
                                                    <CommentOutlined/>
                                                </Button>
                                             </Grid>
                                         </Grid>                                    
                                ):(
                                    
                                        <Button
                                        onClick={()=>{
                                            history.push('/login')
                                        }}
                                        >
                                        شما باید وارد شوید
                                    </Button>
                                )
                            }
                            
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            
        </div>
    )
}