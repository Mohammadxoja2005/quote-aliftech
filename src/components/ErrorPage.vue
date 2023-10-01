<script lang="ts">
import { VisibilityHandler } from '@/utils/VisibilityHandler';

export const actions = new VisibilityHandler();

export default {
    name: "ErrorPage",
    setup() {

        return {
            actions
        }
    }
}
</script>

<template>
    <div v-if="actions.isHide.value">
        <h1>Что-то пошло не так... Пожалйуста проверьте интернет</h1>
    </div>
</template> 

<style scoped> div {
     width: 100%;
     height: 100%;
     background-color: white;
     position: fixed;
 }
</style>