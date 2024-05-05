import React, { useState, useRef, useEffect } from 'react';
import './TagInput.css';  

const TagInput = ({onTagsChange, canEdit = true}) => {
    const [input, setInput] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [matches, setMatches] = useState([]);
    const inputRef = useRef(null);

    const data = ['Python', 'C++', 'C', 'C/C++', 'Java', 'JavaScript', 'TypeScript', 'Ruby', 'Rust', 'Go', 'Kotlin', 'Swift', 'PHP', 'HTML', 'CSS', 'SQL', 'R', 'Scala', 'Perl', 'Shell', 'Objective-C', 'Assembly', 'Lua', 'VimL', 'Clojure', 'Haskell', 'Elixir', 'Erlang', 'Racket', 'Dart', 'Julia', 'F#', 'Groovy', 'PowerShell', 'Apex', 'ABAP', 'Ada', 'Agda', 'Alloy', 'AMPL', 'AngelScript', 'ANTLR', 'ApacheConf', 'Apex', 'API Blueprint', 'APL', 'AppleScript', 'Arc', 'AsciiDoc', 'ASP', 'AspectJ', 'Assembly', 'ATS', 'Augeas', 'AutoHotkey', 'AutoIt', 'Awk', 'Batchfile', 'Befunge', 'Bison', 'BitBake', 'BlitzBasic', 'BlitzMax', 'Bluespec', 'Boo',]
    
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
    const escapeRegex = (value) => {
        // Escapes special characters for use in a regular expression
        return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };
    
    const updateMatches = (value) => {
        if (!value.trim()) {
            setMatches([]);
        } else {
            const escapedValue = escapeRegex(value);
            const regex = new RegExp(escapedValue, 'i');
            setMatches(data.filter(item => regex.test(item) && !selectedItems.includes(item)));
        }
    };

    const handleSelect = (item) => {
        setSelectedItems(prevItems => {
            const newItems = [...prevItems, item];
            onTagsChange(newItems);  // Invoke the callback function with new tags
            return newItems;
        });
        setInput('');
        setMatches([]);
        setTimeout(() => inputRef.current.focus(), 0);  // Refocus on the input after selection
    };

    const handleDeselect = (item) => {
        setSelectedItems(prevItems => {
            const newItems = prevItems.filter(i => i !== item);
            onTagsChange(newItems);  // Invoke the callback function with new tags
            return newItems;
        });

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
                    disabled={!canEdit}
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
