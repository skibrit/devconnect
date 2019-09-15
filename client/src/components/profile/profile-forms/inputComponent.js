import React,{forwardRef} from "react";

const Input = ({className,name,autComplete,placeholder,onChange,required,onFocus,...rest},fref)=>{
    return(
        <input className={className} name={name} autoComplete={autComplete} placeholder={placeholder} onChange={e =>
            onChange(e)} required={required} {...rest} onFocus={onFocus} ref={fref}/>
    )
};

export default forwardRef(Input);