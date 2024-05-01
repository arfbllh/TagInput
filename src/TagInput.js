import React, { useState, useRef, useEffect } from 'react';
import './TagInput.css';  // Make sure your CSS file is properly linked

const TagInput = () => {
    const [input, setInput] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [matches, setMatches] = useState([]);
    const inputRef = useRef(null);

    const data = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape"];

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.width = `${Math.max(50, inputRef.current.value.length * 8 + 20)}px`;
        }
    }, [input]);

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);
        updateMatches(value);
    };

    const updateMatches = (value) => {
        if (!value.trim()) {
            setMatches([]);
        } else {
            const regex = new RegExp(value.split('').join('.*?'), 'i');
            setMatches(data.filter(item => item.match(regex) && !selectedItems.includes(item)));
        }
    };

    const handleSelect = (item) => {
        setSelectedItems(prevItems => [...prevItems, item]);
        setInput('');
        setMatches([]);
        setTimeout(() => inputRef.current.focus(), 0);  // Refocus on the input after selection
    };

    const handleDeselect = (item) => {
        setSelectedItems(prevItems => prevItems.filter(i => i !== item));
    };

    return (
        <div className="tag-input">
            <div className="tags">
                {selectedItems.map((item, index) => (
                    <span key={index} className="tag">
                        {item} <span className="remove-tag" onClick={() => handleDeselect(item)}>✖</span>
                    </span>
                ))}
                <input 
                    ref={inputRef}
                    className='editable-input'
                    type="text"
                    value={input}
                    onChange={handleChange}
                />
            </div>
            {matches.length > 0 && (
                <ul className="matches">
                    {matches.map((item, index) => (
                        <li key={index} onClick={() => handleSelect(item)}>
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TagInput;
