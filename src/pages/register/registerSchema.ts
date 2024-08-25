import { z } from 'zod'


export const registerSchema: z.ZodSchema<any> = z.object({
    email: z
        .string()
        .email("Digite corretamente! Ex.: fulano@gmail.com").default(''),
    firstName: z
        .string()
        .min(3, "Campo obrigatório (Mínimo 3 carecteres)")
        .default(''),
    lastName: z
        .string()
        .min(3, "Campo obrigatório (Mínimo 3 carecteres)")
        .default(''),
    password: z
        .string()
        .min(6, "Digite uma senha maior que 5 caracteres!").default('')
})

export type RegisterSchema = z.infer<typeof registerSchema>
