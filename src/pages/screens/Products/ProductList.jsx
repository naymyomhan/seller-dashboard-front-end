import React from 'react'

const ProductList = () => {
    return (
        <div>
            <div className='flex flex-row items-center justify-between mx-10 my-5'>
                <span>Products</span>
                <dir>
                    <a href='#products/create' className='bg-blue-500 text-white px-4 py-2 rounded-md'>Create Product</a>
                </dir>
            </div>


            <div className='mx-10'>
                listview here
            </div>
        </div>
    )
}

export default ProductList
