import type { Ref } from "vue";

export type BaseFormValues = {
  loading: Ref<boolean>;
  onSubmit: () => Promise<void>;
};

export type LoginFormValues = BaseFormValues & {
  email: Ref<string>;
  password: Ref<string>;
};

export type RegisterFormValues = LoginFormValues & {
  name: Ref<string>;
  confirmPassword: Ref<string>;
};
