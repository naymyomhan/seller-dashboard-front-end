import React, { useEffect, useState } from 'react'


import FormInputField from '../../../components/FormInputField'
import MultipleImageUploader from '../../../components/MultipleImageUploader';
import ezio from '../../../ezio';
import EasyTag from '../../../components/EasyTag';
import SelectInput from '../../../components/SelectInput';

const CreateProduct = () => {
    const [requestLoading, setRequestLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [images, setImages] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');
    const [brandId, setBrandId] = useState('');
    const [tags, setTags] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await ezio.get('/api/categories');
                const brandsResponse = await ezio.get('/api/brands');
                const { data: categoriesData } = categoriesResponse.data;
                const { data: brandsData } = brandsResponse.data;

                setCategories(categoriesData);
                setBrands(brandsData);

                if (categoriesData.length > 0) {
                    setSubCategories(categoriesData[0].sub_categories);
                    setCategoryId(categoriesData[0].id);
                    setSubCategoryId(categoriesData[0].sub_categories[0].id);
                }
            } catch (error) {
                // TODO: Handle errors
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleCategoryChange = (e) => {
        const categoryId = parseInt(e.target.value);
        const category = categories.find((cat) => cat.id === categoryId);
        setCategoryId(categoryId);

        if (category && category.sub_categories && category.sub_categories.length > 0) {
            setSubCategories(category.sub_categories);
            setSubCategoryId(category.sub_categories[0].id);
        } else {
            setSubCategories([]);
            setSubCategoryId('');
        }
    };

    const handleSubCategoryChange = (e) => {
        const subCategoryId = parseInt(e.target.value);
        setSubCategoryId(subCategoryId);
    };

    const handleBrandChange = (e) => {
        const brandId = parseInt(e.target.value);
        setBrandId(brandId);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        images.forEach((image) => formData.append('images[]', image));

        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('category_id', categoryId);
        formData.append('sub_category_id', subCategoryId);
        formData.append('brand_id', brandId);
        formData.append('tags', tags.join('<tag>'));

        try {
            setRequestLoading(true);
            const response = await ezio.post('/seller/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            //TODO::Handle success
            console.log(response);
        } catch (error) {
            // TODO: Handle errors
            console.error(error);
        } finally {
            setRequestLoading(false);
        }
    };


    return (
        <div className='mb-20'>
            <div className='flex flex-row items-center justify-between mx-10 my-5'>
                <span>Create Products</span>
                <dir className='flex items-center gap-3'>
                    <a href='#products' className='bg-gray-500 hover:bg-gray-400 text-white text-sm px-4 py-2 rounded-md'>Cancle</a>
                    <button
                        disabled={requestLoading}
                        className={`bg-blue-500 text-white py-2 rounded-md text-sm ${!requestLoading && "hover:bg-blue-600 px-6"}`}
                        onClick={handleUpload}>
                        {requestLoading
                            ? "Loading..."
                            : "Upload"}
                    </button>
                </dir>
            </div>

            <div className='mx-10 flex flex-col gap-3'>

                <FormInputField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                    placeholder='Product Name'
                    disable={false}
                />
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Description'
                    value={description}
                    className='px-5 py-5 w-full outline-none border border-gray-200 rounded-lg'
                    rows={3}></textarea>

                <FormInputField
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type='number'
                    placeholder='Price'
                    disable={false}
                />

                <FormInputField
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type='number'
                    placeholder='Instock'
                    disable={false}
                />

                <div className='flex flex-row w-full items-center gap-3'>
                    {categories.length > 0 && (
                        <SelectInput
                            options={categories}
                            onChange={handleCategoryChange}
                            value={categoryId}
                            name="category"
                        />
                    )}

                    {subCategories.length > 0 && (
                        <SelectInput
                            options={subCategories}
                            onChange={handleSubCategoryChange}
                            value={subCategoryId}
                            name="subcategory"
                        />
                    )}
                </div>

                <SelectInput
                    options={brands}
                    onChange={handleBrandChange}
                    value={brandId}
                    name="brand"
                />


                <EasyTag onAddTag={setTags} />

                <MultipleImageUploader setImages={setImages} />

            </div>
        </div>
    )
}

export default CreateProduct
