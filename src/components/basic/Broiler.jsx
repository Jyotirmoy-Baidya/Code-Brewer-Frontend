import React, { useState } from 'react'

const Broiler = () => {

    const fixedText = "Fixed boilerplate text that cannot be changed.\n\n"; // The boilerplate part
    const [editableText, setEditableText] = useState("");

    const handleTextChange = (e) => {
        setEditableText(e.target.value);
    };

    return (
        <div>

            <div style={{ position: 'relative', width: '100%' }}>
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        whiteSpace: 'pre-wrap',
                        pointerEvents: 'none', // Make it unselectable
                        padding: '8px',
                        border: '1px solid #ccc',
                        backgroundColor: 'transparent',
                        zIndex: 1,
                    }}
                >
                    {fixedText}
                </div>
                <textarea
                    value={editableText}
                    onChange={handleTextChange}
                    style={{
                        position: 'relative',
                        top: `${fixedText.split('\n').length * 20}px`, // Offset to align with fixed text height
                        width: '100%',
                        height: '150px',
                        padding: '8px',
                        border: '1px solid #ccc',
                        backgroundColor: 'transparent',
                        zIndex: 2,
                    }}
                    placeholder="Enter your text here..."
                />
            </div>
        </div>
    )
}

export default Broiler