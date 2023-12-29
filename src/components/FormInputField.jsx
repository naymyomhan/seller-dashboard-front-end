/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'

const FormInputField = ({
    value,
    onChange,
    placeholder,
    type = 'text',
    icon,
    style = 'my-2',
}) => {

    const [hidden, setHidden] = useState(true);

    return (
        <div className={`flex items-center w-full py-3 px-3 border border-gray-200 rounded-lg ${style}`}>
            {icon}
            <input
                onChange={onChange}
                value={value}
                type={hidden ? type : 'text'}
                className='outline-none ml-3 flex-1 bg-transparent text-sm text-gray-700'
                placeholder={placeholder}

            />
            {type === 'password' &&
                <button onClick={() => { setHidden(!hidden) }}>
                    {hidden
                        ? <EyeOff className='text-gray-400' size={20} />
                        : <Eye className='text-gray-400' size={20} />
                    }
                </button>
            }
        </div>
    )
}

export default FormInputField
