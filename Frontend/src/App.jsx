import React from 'react';
import Editor from './components/Editor/Editor';
import TemplateSelector from './components/TemplateSelector/TemplateSelector';
import MultiPlatformPoster from './components/MultiPlatformPoster/MultiPlatformPoster';
import AIAvatar from './components/AIAvatars/AIAvatar';
import VRAROverlay from './components\VRAROverlay\VRAROverlay';
import './styles/global.css';

function App() {
  return (
    <div className='app'>
      <h1>ForgeAI Video Creator</h1>
      <TemplateSelector />
      <Editor />
      <AIAvatar />
      <VRAROverlay />
      <MultiPlatformPoster />
    </div>
  );
}

export default App;
