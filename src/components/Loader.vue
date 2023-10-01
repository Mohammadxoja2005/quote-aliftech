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
        Загрузка...
    </div>
</template> 

<style scoped>
.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: white;
}
</style>