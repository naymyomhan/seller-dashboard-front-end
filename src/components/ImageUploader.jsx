import React, { useRef, useState } from 'react';

const ImageUploader = ({ setImage }) => {
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (selectedImage) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const imageUrl = event.target.result;
            setImagePreview(imageUrl);
            setImage(imageUrl);
        };
        reader.readAsDataURL(selectedImage);
    };

    const clearImage = () => {
        setImagePreview(null);
        setImage(null);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const selectedImage = e.dataTransfer.files[0];
        if (selectedImage) {
            handleImageChange(selectedImage);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSelectButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div
            className='w-full bg-gray-200 min-h-40 p-4 flex flex-col items-center justify-center'
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files[0])}
                style={{ display: 'none' }}
                ref={fileInputRef}
            />
            <p>Drag & Drop images here or click to select</p>
            <button onClick={handleSelectButtonClick}>Select Image</button>
            {imagePreview && (
                <div>
                    <img src={imagePreview} alt="Uploaded" style={{ maxWidth: '200px' }} />
                    <button onClick={clearImage}>Clear Image</button>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
