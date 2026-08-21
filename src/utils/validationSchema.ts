import { z, ZodObject, type ZodTypeAny } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("O e-mail é obrigatório")
    .email("E-mail inválido"),

  password: z
    .string()
    .nonempty("A senha é obrigatória")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      "A senha deve ter no mínimo 8 caracteres e incluir letra maiúscula, minúscula, número e caractere especial"
    ),
});

export const registerSchema = loginSchema.extend({
  name: z.string().nonempty("O nome é obrigatório"),
  confirmPassword: z.string().nonempty("Confirmação de senha obrigatória"),
}).refine((data) => data.password === data.confirmPassword, {
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

export const editProfileSchema = z.object({
  name: z.string().nonempty("O nome é obrigatório"),
  email: z.string().nonempty("O e-mail é obrigatório").email("E-mail inválido"),
  currentPassword: z.string().nonempty("Confirme sua senha atual para salvar"),
});

export const changePasswordBaseSchema = z.object({
  newPassword: loginSchema.shape.password,
  confirmNewPassword: z.string().nonempty("Confirmação de senha obrigatória"),
});

export const changePasswordSchema = changePasswordBaseSchema.refine(
  (data) => data.newPassword === data.confirmNewPassword,
  { path: ["confirmNewPassword"], message: "As senhas não coincidem" }
);

export const alunoSchema = z.object({
  nome: z.string().nonempty("O nome é obrigatório"),
  email: z.string().nonempty("O e-mail é obrigatório").email("E-mail inválido"),
  curso: z.string().nonempty("O curso é obrigatório"),
  dataNascimento: z
    .string()
    .nonempty("A data de nascimento é obrigatória")
    .refine((val) => new Date(val) <= new Date(), "A data de nascimento não pode ser futura"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type EditProfileSchema = z.infer<typeof editProfileSchema>;
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
export type AlunoSchema = z.infer<typeof alunoSchema>;
