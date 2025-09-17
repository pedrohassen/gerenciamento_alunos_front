import { z, ZodObject, type ZodTypeAny } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("O e-mail é obrigatório")
    .email("E-mail inválido"),

  senha: z
    .string()
    .nonempty("A senha é obrigatória")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      "A senha deve ter no mínimo 8 caracteres e incluir letra maiúscula, minúscula, número e caractere especial"
    ),
});

export const registerSchema = loginSchema.extend({
  nome: z.string().nonempty("O nome é obrigatório"),
  confirmarSenha: z.string().nonempty("Confirmação de senha obrigatória"),
}).refine((data) => data.senha === data.confirmarSenha, {
  path: ["confirmarSenha"],
  message: "As senhas não coincidem",
});

export function makeRule<
  T extends ZodObject<any>, 
  K extends keyof z.infer<T>
>(
  schema: T,
  field: K
) {
  const validator: ZodTypeAny = schema.shape[field as string];

  return (value: z.infer<T>[K]) => {
    const result = validator.safeParse(value);
    return result.success ? true : result.error.issues[0].message;
  };
}

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
