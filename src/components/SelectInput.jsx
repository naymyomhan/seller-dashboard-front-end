import React from 'react';

const SelectInput = ({ options, onChange, value, name }) => {
    return (
        <select
            onChange={onChange}
            name={name}
            value={value}
            className='w-full py-3 outline-none px-3 border border-gray-200 text-sm bg-white rounded-lg'
        >
            {options.map((option) => (
                <option value={option.id} key={option.id}>
                    {option.name}
                </option>
            ))}
        </select>
    );
};

export default SelectInput;
