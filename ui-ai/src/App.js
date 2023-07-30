import './App.css';
import Recorder from './component/Recorder';
import SpeechToText from './component/SpeechToText';
import CharacterComponent from './component/characterComponent';
import VideoComponent from './component/videoComponent';
function App() {
    
  return (
    <div className="App">
      <header className="App-header">
      <VideoComponent/>
       <SpeechToText/>
       <CharacterComponent/>
      </header>
    </div>
  );
}

export default App;
