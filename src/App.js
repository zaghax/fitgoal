import './App.css';
import UploadVideos from './components/UploadVideos/UploadVideos';
import PlayList from './components/PlayList/PlayList';
import Player from './components/Player/Player';

function App() {
  return (
    <div className="App">
      <Player/>
      <UploadVideos/>
      <PlayList/>
    </div>
  );
}

export default App;
