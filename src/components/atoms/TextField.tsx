import { FormControl, FormLabel } from '@mui/material'
import React from 'react'
import { Controller, UseControllerProps } from 'react-hook-form'
import TextFieldMui, {
    TextFieldProps as MuiTextFieldProps,
} from '@mui/material/TextField'

interface ITextField {
    name: string
    control: any
    type: string
    placeholder: string
    label: string,
    className?: string,
}

export type TextField = ITextField &
    UseControllerProps

const TextField: React.FC<TextField> = ({
    name,
    control,
    label,
    type,
    placeholder,
    rules,
    className,
}) => {
    return (
        <FormControl fullWidth>
            <p className='font-primary'>{label}</p>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                    <TextFieldMui
                        variant='outlined'
                        type={type}
                        placeholder={placeholder}
                        error={!!error?.message}
                        value={value}
                        className={className}
                        id={name}
                        onChange={onChange}
                    />
                    {error?.message ? <p className='font-primary text-[12px] text-[#FF2313]'>{error?.message}</p> : null}
                    </>
                )}
            />
        </FormControl>
    )
}

export default TextField