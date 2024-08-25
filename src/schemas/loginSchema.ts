import { z } from 'zod'


export const loginSchema: z.ZodSchema<any> = z.object({
    email: z
        .string()
        .email("Digite corretamente! Ex.: fulano@gmail.com").default(''),
    password: z
        .string()
        .min(6, "Digite uma senha maior que 5 caracteres!").default('')
})

export type LoginSchema = z.infer<typeof loginSchema>
