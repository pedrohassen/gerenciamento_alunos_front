import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { ref } from "vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import OrganismProfile from "./OrganismProfile.vue";

const vuetify = createVuetify({ components, directives });

const mockUser = ref<any>(null);
const mockLoading = ref(false);
const mockError = ref<string | null>(null);
const mockFetchUser = vi.fn();

vi.mock("../../../composables/useProfile", () => ({
  useProfile: () => ({
    user: mockUser,
    loading: mockLoading,
    error: mockError,
    fetchUser: mockFetchUser,
  }),
}));

vi.mock("../../../composables/useEditProfileForm", () => ({
  useEditProfileForm: () => ({
    name: ref(""),
    email: ref(""),
    currentPassword: ref(""),
    loading: ref(false),
    resetForm: vi.fn(),
    onSubmit: vi.fn(),
  }),
}));

vi.mock("../../../composables/useChangePasswordForm", () => ({
  useChangePasswordForm: () => ({
    newPassword: ref(""),
    confirmNewPassword: ref(""),
    loading: ref(false),
    resetForm: vi.fn(),
    onSubmit: vi.fn(),
  }),
}));

function mountProfile() {
  return mount(OrganismProfile as any, {
    global: { plugins: [vuetify] },
    props: { title: "Perfil" },
  });
}

beforeEach(() => {
  mockUser.value = null;
  mockLoading.value = false;
  mockError.value = null;
});

describe("OrganismProfile", () => {
  it("mostra o spinner de carregamento quando loading=true e ainda não há usuário", () => {
    mockLoading.value = true;

    const wrapper = mountProfile();

    expect(wrapper.find(".v-progress-circular").exists()).toBe(true);
  });

  it("mostra o alerta de erro quando error está preenchido", () => {
    mockError.value = "Usuário não autenticado";

    const wrapper = mountProfile();

    expect(wrapper.text()).toContain("Usuário não autenticado");
  });

  it("mostra os dados do usuário carregado, com o chip de perfil correto", () => {
    mockUser.value = {
      nome: "Ana",
      email: "ana@teste.com",
      perfil: 2,
      status: true,
      dataCriacao: "2026-01-01T10:00:00",
    };

    const wrapper = mountProfile();

    expect(wrapper.text()).toContain("Ana");
    expect(wrapper.text()).toContain("ana@teste.com");
    expect(wrapper.text()).toContain("Admin");
  });

  it("mostra os botões de editar perfil e alterar senha", () => {
    mockUser.value = { nome: "Ana", email: "ana@teste.com", perfil: 1, status: true, dataCriacao: "2026-01-01T10:00:00" };

    const wrapper = mountProfile();

    expect(wrapper.text()).toContain("Editar Perfil");
    expect(wrapper.text()).toContain("Alterar Senha");
  });
});
