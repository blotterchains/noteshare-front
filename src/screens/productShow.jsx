import { Box, Grid } from '@material-ui/core';
import { NearMeSharp } from '@material-ui/icons';
import React from 'react';
import { SlideShow } from '../components/slideshow';
import { fetchapiWithotToken, myStyles,borderRadius } from '../global/gbvars';
export function ProductShow(props){
    const hash=props.match.params.hash;
    const username=props.match.params.username;
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
    React.useEffect(() => {
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
        })
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
                    </Grid>
                    <Grid style={{width:'60%'}} item>
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
                                <Grid item>
                                    <p className={classes.boldFonts}>
                                        توضیحات:
                                    </p>
                                </Grid>
                                <Grid item>
                                    <p className={classes.descriptionFonts}>
                                        {description}
                                    </p>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item>
                                    <p className={classes.boldFonts}>

                                    </p>
                                </Grid>
                                <Grid item>
                                    <p className={classes.descriptionFonts}>

                                    </p>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item>
                                    <p className={classes.boldFonts}>

                                    </p>
                                </Grid>
                                <Grid item>
                                    <p className={classes.descriptionFonts}>

                                    </p>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            
        </div>
    )
}