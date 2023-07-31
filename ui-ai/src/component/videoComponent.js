import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const VideoComponent = (props) =>{
    const [videoSrc,setVideoSrc] = React.useState(null);
    const videoRef = React.useRef(null); 
        

    React.useEffect(()=>{
    videoRef.element = document.getElementById('video');
      setVideoSrc("firstTime.mp4")
      videoRef.element.src = "firstTime.mp4";
//      videoRef.element.load();
    },[])
    React.useEffect(()=>{
      videoRef.element.load();
    },[videoSrc])

   const sendVideoResponse = async()=>{
    const inputData = props.getSpeech();
    console.log(inputData);
    await sendToServerHandler(inputData);
   }

   const sendToServerHandler = async(inputData) =>{
    const params = {
        question:inputData,
        promptType:'chatGPT'
    }
        const url  = "http://127.0.0.1:8000/aiResponse/chatgpt/prompt"
        console.log(params);
        const res = await axios.post(url,params);
        console.log(res.data.reply.output.output_video);
        await lipSync(res.data.reply.output.output_video);
        

        
  }


  let lipSync = async(data)=>{
   // const videoBlob = new Blob([data], { type: 'video/mp4' });

    //const videoUrl = URL.createObjectURL(data);
    videoRef.element.src = data
    setVideoSrc(data);
    videoRef.element.load();
  } 


    return(
      <>
      {/* <video width="320" height="240" autoPlay controls>
                    <source src={videoSrc} type="video/mp4"></source>
      </video> */}
        <Card variant="outlined" sx={{ width: 1000}}>
        <CardOverflow>
          <AspectRatio ratio="2">

          <video id="video" autoPlay>
            <source src={videoSrc} type="video/mp4"/>
          </video>
          </AspectRatio>
          <IconButton
            aria-label="Like minimal photography"
            size="md"
            variant="solid"
            color="danger"
            onClick={()=>props.click}
            sx={{
              position: 'absolute',
              zIndex: 2,
              borderRadius: '50%',
              right: '4rem',
              bottom: 0,
              transform: 'translateY(50%)',
            }}
          >
            <MicIcon onClick={props.click} />
          </IconButton>
          <IconButton
            aria-label="Like minimal photography"
            size="md"
            variant="solid"
            color="primary"
            onClick={()=>props.sendResponse}
            sx={{
              position: 'absolute',
              zIndex: 2,
              borderRadius: '50%',
              right: '1rem',
              bottom: 0,
              transform: 'translateY(50%)',
            }}
          >
            <SendIcon onClick={sendVideoResponse} />
          </IconButton>
        </CardOverflow>
        <CardContent>
          <Typography level="h2" fontSize="md">
                {props.query}
          </Typography>
        </CardContent>
      </Card>
      </> 
    );
}

export default VideoComponent;