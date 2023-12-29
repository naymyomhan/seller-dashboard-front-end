import React, { useRef, useState, useEffect } from 'react';
// import { FaTimes } from 'react-icons/fa'

export default function EasyOtpInput({
    onChange,
    reset,
    disabled,
    length = 4,
    number = false,
    placeholder = '',
    style = '',
    parentStyle = '',
}) {
    const [code, setCode] = useState('');
    const inputRefs = Array(length).fill(null).map(() => useRef(null));

    const resetCode = () => {
        inputRefs.forEach(ref => {
            ref.current.value = '';
        });
        inputRefs[0].current.focus();
        setCode('');
    };

    useEffect(() => {
        if (code.length === length) {
            document.activeElement.blur();
        }
    }, [code]);

    useEffect(() => {
        resetCode();
    }, [reset]);


    function handleInput(e, index) {
        const input = e.target;
        const numericRegex = /^[0-9]*$/;
        if (!numericRegex.test(input.value) && number) {
            e.target.value = '';
            return;
        }

        const previousInput = inputRefs[index - 1];
        const nextInput = inputRefs[index + 1];

        const newCode = [...code];
        newCode[index] = input.value;

        setCode(newCode.join(''));
        onChange(newCode.join(''));

        input.focus();

        if (input.value === '') {
            if (previousInput) {
                previousInput.current.focus();
            }
        } else if (nextInput) {
            nextInput.current.focus();
        }
    }

    function handleFocus(e) {
        e.target.focus();
    }

    function handleKeyDown(e, index) {
        const input = e.target;
        const previousInput = inputRefs[index - 1];
        const nextInput = inputRefs[index + 1];

        if ((e.keyCode === 8 || e.keyCode === 46) && input.value === '') {
            e.preventDefault();
            setCode((prevCode) => prevCode.slice(0, index) + prevCode.slice(index + 1));
            if (previousInput) {
                previousInput.current.focus();
            }
        }
    }

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedCode = e.clipboardData.getData('text');
        const codeToSet = pastedCode.slice(0, Math.min(pastedCode.length, length));
        setCode(codeToSet);
        onChange(codeToSet);
        for (let index = 0; index < Math.min(pastedCode.length, length); index++) {
            inputRefs[index].current.value = pastedCode[index];
        }
    };

    return (
        <div className={`flex gap-2 relative ${parentStyle}`}>
            {inputRefs.map((ref, index) => (
                <input
                    readOnly={!(code.length == index || code.length == index + 1)}
                    className={`text-2xl bg-white outline-none border rounded-md border-gray-200 w-10 flex p-2 text-center select-none ${style} focus:border-gray-400
                    ${(code.length == index || code.length == index + 1) ? "focus:border-gray-400" : "focus:border-gray-200"}`}
                    key={index}
                    type="text"
                    maxLength={1}
                    onChange={(e) => handleInput(e, index)}
                    ref={inputRefs[index]}
                    autoFocus={index === 0}
                    onFocus={handleFocus}
                    pattern={number ? "[0-9]*" : undefined}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    disabled={disabled}
                    placeholder={placeholder}
                />
            ))}
        </div>
    );
}