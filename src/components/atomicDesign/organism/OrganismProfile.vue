<template>
  <div class="organism-profile">
    <MoleculeCardInfo
      :title="title"
      :items="items"
    >
      <template #actions>
        <AtomButton @click="onEditProfile">Editar Perfil</AtomButton>
        <AtomButton @click="onChangePassword">Alterar Senha</AtomButton>
      </template>
    </MoleculeCardInfo>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import MoleculeCardInfo from "../molecule/MoleculeCardInfo.vue";
import AtomButton from "../atom/AtomButton.vue";
import { useProfile } from "../../../composables/useProfile";
import type { InfoItem } from "../../../utils/types/cards";

export default defineComponent({
  name: "OrganismProfile",
  components: { MoleculeCardInfo, AtomButton },
  props: { title: { type: String, default: "User Profile" } },
  setup() {
    const { user, loading } = useProfile(1);

    const items = computed<InfoItem[]>(() =>
      user.value
        ? [
            { label: "Nome", value: user.value.nome },
            { label: "Email", value: user.value.email },
            {
              label: "Perfil",
              value: user.value.perfil === 2 ? "Admin" : "User",
              type: "chip",
              color: user.value.perfil === 2 ? "purple" : "blue",
            },
            { label: "Status", value: user.value.status, type: "boolean" },
            { label: "Criado em", value: user.value.dataCriacao, type: "date" },
          ]
        : []
    );

    const onEditProfile = () => console.log("Abrir modal de edição de perfil");
    const onChangePassword = () => console.log("Abrir modal de alteração de senha");

    return { items, loading, onEditProfile, onChangePassword };
  },
});
</script>


<style scoped>
.organism-profile {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
