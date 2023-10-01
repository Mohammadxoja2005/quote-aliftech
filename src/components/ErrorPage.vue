<script lang="ts">
import { VisibilityHandler } from '@/utils/VisibilityHandler';
import { TextHandler } from "@/utils/TextHandler";

export const actions = new VisibilityHandler();
export const textActions = new TextHandler('Что-то пошло не так');

export default {
    name: "ErrorPage",
    setup() {

        return {
            actions,
            textActions
        }
    }
}

</script>

<template>
    <div v-if="actions.isHide.value">
        <h1>{{ textActions.text }}</h1>
    </div>
</template> 

<style scoped> div {
     width: 100%;
     height: 100%;
     background-color: white;
     position: fixed;
 }
</style>