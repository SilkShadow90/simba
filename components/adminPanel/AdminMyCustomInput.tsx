import React from 'react';
import {InputArea} from "./InputArea";
import {WrappedFieldProps} from "redux-form";


type Props = {
  text:string
}


export const AdminMyCustomInput = ({input, text}:Props & WrappedFieldProps) => {
  return (
    <InputArea
      placeholder={text}
      onChange={input?.onChange}
      text={input?.value}
    />
  )
}

export const AdminMyCustomInputHOC = ({text}:Props) => React.memo((props:WrappedFieldProps) => {
  return(
    <AdminMyCustomInput
      text={text}
      {...props}
    />
  )
})