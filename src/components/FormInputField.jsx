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
    style = '',
    disable = false,
}) => {

    const [hidden, setHidden] = useState(true);

    return (
        <div className={`flex items-center w-full px-3 border border-gray-200 bg-white rounded-lg ${style}`}>
            {icon}
            <input
                disabled={disable}
                onChange={onChange}
                value={value}
                type={hidden ? type : 'text'}
                className='outline-none ml-3 flex-1 bg-transparent py-3 text-sm text-gray-700'
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
