import React, { useState,useRef, useEffect } from "react";
import axios from 'axios'
import Wav2Lip from "./Wav2lip";
import VideoComponent from "./videoComponent";
const SpeechToText = () =>{
const SpeechRecognition  = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
// const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

recognition.grammars = speechRecognitionList;
recognition.lang = "en-US";
recognition.interimResults = true;
recognition.maxAlternatives = 1;
const [speechText, setSpeechText] = useState();
const [isMicOn, setIsMicOn] = useState(true);
const [audioResponse, setAudioResponse] = useState();
//
const [videoResponse, setVideoResponse] = useState();

const videoRef = useRef(null);
let micVariable = false;
    const speechConverter = (e)=>{
        e.preventDefault()
        if(isMicOn){
            setIsMicOn(false);
        }
        else{
            setIsMicOn(true);
        }
    }
    useEffect(()=>{
        if (isMicOn){
            recognition.continuous = false;
            recognition.stop();
        }
        else{
            recognition.continuous= true;
            recognition.start();
        }
    },[isMicOn])



    recognition.onresult = (event)=>{
        console.log(isMicOn);
        
            const transcript = Array.from(event.results).map(r=> r[0]).map(r=>r.transcript)
            console.log(transcript);
            setSpeechText(transcript);    
        
    }
    recognition.addEventListener('end', () => 
    {   if(isMicOn){
            recognition.start()
        }
        else{
         console.log(speechText);   
        }
    })
    const sendSpeech = ()=>{
        return speechText.join(' ');

    }

    


    return(
        <>
        <VideoComponent query={speechText} getSpeech={sendSpeech}
        click={speechConverter} videoResponse={videoResponse}/>
            

        </>
    )
}

export default SpeechToText;