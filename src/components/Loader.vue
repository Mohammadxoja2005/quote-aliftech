<script lang="ts">
import { VisibilityHandler } from '@/utils/VisibilityHandler';

export const actions = new VisibilityHandler();

export default {
    name: "Loader",
    setup() {
        return {
            actions
        }
    }
}
</script> 

<template>
    <div class="modal-container" v-if="actions.isHide.value">
        <h1> Загрузка... </h1>
    </div>
</template> 

<style scoped>
.modal-container {
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
}
</style>