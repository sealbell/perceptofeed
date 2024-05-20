import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar';
import ChatBox from './components/ChatBox';
import PromptBox from './components/PromptBox';
import ModelSelect from './components/ModelSelect';
import ResultBox from './components/ResultBox';

function App() {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('chatgpt-3.5');
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('prompt', prompt);
    formData.append('model', selectedModel);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="left-panel">
          <ChatBox handleFileChange={handleFileChange} />
          <PromptBox prompt={prompt} handlePromptChange={handlePromptChange} />
          <ModelSelect selectedModel={selectedModel} handleModelChange={handleModelChange} />
          <button onClick={handleUpload}>Submit</button>
        </div>
        <div className="right-panel">
          <ResultBox result={result} />
        </div>
      </div>
    </div>
  );
}

export default App;
