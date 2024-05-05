import './App.css';
import TagInput from './TagInput';
import React, { useState, useEffect } from 'react';


function App() {
  const [tags, setTags] = useState([]);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  return (
    <div className="App">
      <header className="App-header">
        <TagInput onTagsChange = {setTags} />
      </header>
    </div>
  );
}

export default App;
