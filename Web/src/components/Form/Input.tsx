import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}



export default function Input(props: InputProps) {
    return(
        <input 
            {...props}
            className='px-4 py-3 rounded bg-[#18181B] text-sm placeholder:text-zinc-500' 
        />
    )
}