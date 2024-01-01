import React, { useState } from 'react'


import FormInputField from '../../../components/FormInputField'

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');
    const [brandId, setBrancId] = useState('');
    const [tags, setTags] = useState('');

    return (
        <div>
            <div className='flex flex-row items-center justify-between mx-10 my-5'>
                <span>Create Products</span>
                <dir>
                    <a href='#products' className='bg-orange-500 text-white px-4 py-2 rounded-md'>Cancle</a>
                </dir>
            </div>


            <div className='mx-10'>
                <FormInputField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                    placeholder='Password'
                    disable={false}
                />
            </div>
        </div>
    )
}

export default CreateProduct
