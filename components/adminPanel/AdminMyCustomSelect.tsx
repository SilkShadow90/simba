import React, {useEffect} from 'react';
import Select from "react-select";
import classNames from "classnames";
import styles from "../../styles/Footer.module.css";
import {WrappedFieldProps} from "redux-form";

type Props<T> = {
  name:string,
  options: T[],
}

export const AdminMyCustomSelect = function<T>({input, options, name}: Props<T> & WrappedFieldProps) {
  useEffect(() => {
     if(!input.value) {
       input?.onChange(options[0])
      }
   },[options, input])


  return (
    <Select
      defaultValue={options[0]}
      className={classNames("basic-single", styles.groupStyles)}
      classNamePrefix="select"
      value={input?.value}
      name={name}
      onChange={input?.onChange}
      options={options}
    />
  )
}


export const AdminMyCustomSelectHOC = function<T>({options, name}: Props<T>) {
  return React.memo((props: WrappedFieldProps) => {
    return (
      <AdminMyCustomSelect
        options={options}
        name={name}
        {...props}
      />
    )
  })
}