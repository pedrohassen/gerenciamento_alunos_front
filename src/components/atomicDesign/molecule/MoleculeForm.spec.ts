import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { ref } from "vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import MoleculeForm from "./MoleculeForm.vue";

const vuetify = createVuetify({ components, directives });

function mountForm(propsOverrides: Record<string, unknown> = {}) {
  const onSubmit = vi.fn();
  const values = { email: ref(""), password: ref("") };
  const inputs = [
    { name: "email", type: "text", placeholder: "Email", rules: [] },
    { name: "password", type: "password", placeholder: "Senha", rules: [] },
  ];

  const wrapper = mount(MoleculeForm as any, {
    global: { plugins: [vuetify] },
    props: {
      pageTitle: "Gerenciamento de Alunos",
      title: "Login",
      buttonText: "Entrar",
      inputs,
      values,
      loading: false,
      isFormValid: true,
      onSubmit,
      ...propsOverrides,
    },
  });

  return { wrapper, onSubmit, values };
}

describe("MoleculeForm", () => {
  it("renderiza o pageTitle e o título da seção quando informado", () => {
    const { wrapper } = mountForm();
    expect(wrapper.text()).toContain("Gerenciamento de Alunos");
    expect(wrapper.text()).toContain("Login");
  });

  it("não renderiza um segundo título quando title está vazio (usado nos diálogos de perfil/alunos)", () => {
    const { wrapper } = mountForm({ title: "" });
    expect(wrapper.findAll("h2")).toHaveLength(0);
  });

  it("renderiza um input pra cada item de inputs, com o placeholder certo", () => {
    const { wrapper } = mountForm();
    const inputsRendered = wrapper.findAll("input");
    expect(inputsRendered).toHaveLength(2);
    expect(inputsRendered[0].attributes("placeholder")).toBe("Email");
    expect(inputsRendered[1].attributes("placeholder")).toBe("Senha");
  });

  it("desabilita o botão de envio quando isFormValid é false", () => {
    const { wrapper } = mountForm({ isFormValid: false });
    const button = wrapper.find('button[type="submit"]');
    expect((button.element as HTMLButtonElement).disabled).toBe(true);
  });

  it("habilita o botão quando isFormValid é true", () => {
    const { wrapper } = mountForm({ isFormValid: true });
    const button = wrapper.find('button[type="submit"]');
    expect((button.element as HTMLButtonElement).disabled).toBe(false);
  });

  it("chama onSubmit ao submeter o formulário", async () => {
    const { wrapper, onSubmit } = mountForm();
    await wrapper.find("form").trigger("submit");
    expect(onSubmit).toHaveBeenCalled();
  });
});
