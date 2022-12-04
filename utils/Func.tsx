import {ChangeEvent} from "react";

export const onChangeInput = (func: (text: string) => void) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    func(e.target.value)
}