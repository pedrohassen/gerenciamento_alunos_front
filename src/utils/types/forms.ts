import type { Ref } from "vue";

export type BaseFormValues = {
  loading: Ref<boolean>;
  onSubmit: () => Promise<void>;
};

export type LoginFormValues = BaseFormValues & {
  email: Ref<string>;
  senha: Ref<string>;
};

export type RegisterFormValues = LoginFormValues & {
  nome: Ref<string>;
  confirmarSenha: Ref<string>;
};
