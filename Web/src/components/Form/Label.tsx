import { LabelHTMLAttributes } from 'react'



interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement>{
    children: React.ReactNode;
}


export default function Label(props: LabelProps) {
    return (
        <label 
            {...props}
            className='font-semibold tracking-tighter'
        >
            {props.children}
        </label>
    )
}