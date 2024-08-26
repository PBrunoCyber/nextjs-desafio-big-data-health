import { FormControl, FormLabel, MenuItem } from '@mui/material'
import React from 'react'
import { Controller, UseControllerProps } from 'react-hook-form'
import Select from '@mui/material/Select';

interface ISelectField {
    name: string
    control: any
    values: Array<any>;
    label: string,
    className?: string,
}

export type SelectField = ISelectField &
    UseControllerProps

const SelectField: React.FC<SelectField> = ({
    name,
    control,
    values,
    label,
    rules
}) => {
    return (
        <FormControl fullWidth className='grow-[1]'>
            <FormLabel className='font-primary'>{label}</FormLabel>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Select
                        value={value || ""}
                        size='small'
                        MenuProps={{disableScrollLock: true}}
                        displayEmpty={false}
                        onChange={onChange}
                    >   
                        <MenuItem defaultValue={"Selecione"} value={""} ></MenuItem>
                        {values.map((value)=> {
                            return <MenuItem key={value.value} value={value.value}>{value.label}</MenuItem>
                        })}
                    </Select>
                )}
            />
        </FormControl>
    )
}

export default SelectField