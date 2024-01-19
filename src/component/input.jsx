import React,{useId} from 'react'

const Input = React.forwardRef (function Input({
    label,
    type='text',
    className="",
    placeholder="",
    ...props

},ref){
    const id=useId();
    return(
        <div className='w-full'>
           {label&& <label className='inline-block text-2xl mb-1 pl-1 text-white' 
          htmlFor={id}>
            {label}
          </label>
        }
        <input type={type} className={`
         px-3 py-2 rounded-lg bg-black 
         text-white outline-none focus:border-sky-400
         duration-200 border border-gray-200 w-full
        ${className}`}
        ref={ref}
        {...props}
        id={id}
        /> 
        </div>
    )
}) 

export default Input