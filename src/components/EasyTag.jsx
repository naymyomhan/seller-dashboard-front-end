import { X } from 'lucide-react';
import React, { useState } from 'react';

const EasyTag = ({
    onAddTag
}) => {
    const [tags, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState('');

    const handleInputChange = (e) => {
        const { value } = e.target;
        if (value.length > 19) {
            setTags([...tags, value.trim()]);
            setCurrentTag('');
            onAddTag([...tags, value.trim()]);
            return;
        }

        if (value.endsWith(' ') || value.endsWith('\t')) {
            if (value.trim() !== '') {
                setTags([...tags, value.trim()]);
                setCurrentTag('');
                onAddTag([...tags, value.trim()]);
            }
        } else {
            setCurrentTag(value);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (currentTag.trim() !== '') {
                setTags([...tags, currentTag.trim()]);
                setCurrentTag('');
                onAddTag([...tags, currentTag.trim()]);
            }
        }
    };

    const removeTag = (indexToRemove) => {
        const updatedTags = tags.filter((_, index) => index !== indexToRemove);
        setTags(updatedTags);
        onAddTag(updatedTags);
    };

    return (
        <div className='flex flex-row bg-white rounded-md border border-gray-200 px-6 py-3 gap-2 flex-wrap items-center'>
            {tags.map((tag, index) => (
                <div key={index} className="bg-gray-200 px-2 py-1 rounded-md flex flex-row items-center gap-2">
                    <span>{tag}</span>
                    <button onClick={() => removeTag(index)}>
                        <X size={18} />
                    </button>
                </div>
            ))}
            <input
                type="text"
                value={currentTag}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Add tags..."
                className='outline-none flex-1 text-gray-700 bg-transparent text-sm'
            />
        </div>
    );
};

export default EasyTag;
