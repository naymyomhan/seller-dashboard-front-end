import { Image, ImageDown, X } from 'lucide-react';
import React, { useRef, useState } from 'react';

const MultipleImageUploader = ({ setImages }) => {
    const [previewImages, setPreviewImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const fileInputRef = useRef(null);


    const handleImageChange = (selectedImages) => {
        const previewImageUrls = [];
        const uploadedImageFiles = [];

        selectedImages.forEach((image) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = URL.createObjectURL(image);
                previewImageUrls.push(imageUrl);
                uploadedImageFiles.push(image);

                if (previewImageUrls.length === selectedImages.length) {
                    setPreviewImages([...previewImages, ...previewImageUrls]);
                    setImageFiles([...imageFiles, ...uploadedImageFiles]);
                    setImages([...imageFiles, ...uploadedImageFiles]);
                }
            };
            reader.readAsDataURL(image);
        });
    };

    const removeImage = (index) => {
        const updatedPreviewImages = [...previewImages];
        updatedPreviewImages.splice(index, 1);

        const updatedImageFiles = [...imageFiles];
        updatedImageFiles.splice(index, 1);

        setPreviewImages(updatedPreviewImages);
        setImageFiles(updatedImageFiles);
        setImages(updatedImageFiles);
    };

    const clearImages = () => {
        setPreviewImages([]);
        setImageFiles([]);
        setImages([]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const selectedImages = Array.from(e.dataTransfer.files);
        if (selectedImages) {
            handleImageChange(selectedImages);
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
            className='w-full border border-gray-400 rounded-xl p-4 flex flex-row flex-wrap items-center relative'
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageChange(Array.from(e.target.files))}
                style={{ display: 'none' }}
                ref={fileInputRef}
            />

            {previewImages.map((image, index) => (
                <div key={index} className='rounded-md relative overflow-hidden m-2 w-[120px] h-[120px]'>
                    <img src={image} alt={`Uploaded ${index}`} className='absolute top-0 left-0 w-full h-full object-cover' />
                    <button onClick={() => removeImage(index)} className='bg-red-500 hover:bg-red-400 text-white absolute top-0 right-0 rounded-bl-md'><X /></button>
                </div>
            ))}

            {previewImages.length > 0
                ? (<button
                    className='bg-gray-300 py-1 px-4 absolute top-2 right-2 text-sm rounded-full hover:opacity-80' onClick={clearImages}>Clear</button>)
                : <div className='w-full min-h-40 rounded-lg border-dashed border border-gray-300 flex flex-col items-center justify-center'>
                    <ImageDown className='text-gray-300' size={50} strokeWidth={1} />
                    <div className='flex flex-row items-center mt-2'>
                        <span
                            className='text-sm font-bold text-gray-500 cursor-pointer'
                            onClick={handleSelectButtonClick}
                        >
                            Choose a image
                        </span>
                        <span className='text-sm text-gray-500 ml-1'>or drag it here</span>
                    </div>
                </div>
            }
        </div>
    );
};

export default MultipleImageUploader;
