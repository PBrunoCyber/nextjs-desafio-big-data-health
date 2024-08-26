import { z } from 'zod'


export const loginSchema: z.ZodSchema<any> = z.object({
    username: z
        .string()
        .min(3, "Campo obrigatório (Min: 3 caracteres)").default(''),
    password: z
        .string()
        .min(6, "Digite uma senha maior que 5 caracteres!").default('')
})

export type LoginSchema = z.infer<typeof loginSchema>
