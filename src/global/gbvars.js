import { makeStyles } from "@material-ui/core";
import Radium from "radium";
import { fadeIn, fadeInLeft, fadeInRight, fadeInUp } from "react-animations";

export const myStyles=makeStyles({
    root:{
        backgroundColor:'rgb(56,60,74)',
        fontColor:'rgb(82,148,226)',
        padding:'2vmin',
        
    },
    innerRoot:{
        margin:'3vmin',
        backgroundColor:'rgb(64,69,82)',
        padding:'3vmin'
    },
    innerinnerRoot:{
        margin:'3vmin',
        backgroundColor:'rgb(75,81,98)',
        padding:'3vmin'
    },
    buttonSelected:{
        border:'1px solid rgb(82,148,226)',
        margin:'3vmin',
        color:'rgb(82,148,226)'
    },
    buttonUnSelected:{
        border:'1px solid rgb(124,129,140)',
        margin:'3vmin',
        color:'rgb(124,129,140)'
    },
    boldFonts:{
        color:'rgb(82,148,226)'
    },
    descriptionFonts:{
        color:'rgb(124,129,140)'
    },
    warningFonts:{
        color:'rgb(255,111,89)'
    }
})
export const borderRadius='3vmin';
export const animationStyles = {
    fadeIn: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  },
  fadeInRight:{
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeInRight, 'fadeInRight')
  },
  fadeInLeft:{
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeInLeft, 'fadeInLeft')
  },
  fadeInUp:{
      animation:'x 1s',
      animationName:Radium.keyframes(fadeInUp,'fadeInUp')
  },
  fadeInUp2S:{
    animation:'x 2s',
    animationName:Radium.keyframes(fadeInUp,'fadeInUp')
    },
    fadeInUp3S:{
        animation:'x 3s',
        animationName:Radium.keyframes(fadeInUp,'fadeInUp')
    }
}
export const api="http://localhost:5000/api"
const upload='http://localhost:5000/uploader'
export const fetchapiWithotToken=(data,action)=>{
    console.log(JSON.stringify(data))
    return(
        fetch(api,
            {
                headers: {
                    "Content-Type":"application/json",
                    'action':action
                },
                method: "POST",
                mode: "cors",
                body:JSON.stringify(data)
            })
        .then(response => response.json())
        .then(response => response)
       
    )
}
export const fileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
export const uploader=(file)=>{
    return(
        fetch(upload,
            {
                headers: {
                    "Content-Type":"application/json",
                },
                method: "POST",
                mode: "cors",
                body:JSON.stringify({file:file})
            })
            .then(response => response.json())
            .then(response => response)
    )
}