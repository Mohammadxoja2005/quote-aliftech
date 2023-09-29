<script lang="ts">
import { ref } from "vue";

const isShow = ref<boolean>(false);
const id = ref<number>();

export const getData = (object: any) => {
    id.value = object.id
}

export const actions = (type: string) => {
    if (type === 'open') {
        isShow.value = true;
        return;
    }

    if (type === 'close') {
        isShow.value = false;
        return;
    }

    if (type === 'delete') {
        return;
    }
}

export default {
    name: "DeleteModal",
    setup() {
        return {
            actions,
            isShow
        }
    }
}

</script> 

<template>
    <div class="modal-container" v-if="isShow">
        <div class="modal">
            <div class="modal-header">
                <h2>Are you sure about deleting data?</h2>
                <button @click="actions('close')">X</button>
            </div>
            <div class="modal-footer">
                <button @click="actions('delete')">Удалить</button>
                <button @click="actions('close')">Закрыть</button>
            </div>
        </div>
    </div>
</template> 

<style scoped> .modal-container {
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background-color: rgba(0, 0, 0, 0.5);
     display: flex;
     justify-content: center;
     align-items: center;
 }

 .modal {
     background-color: #fff;
     padding: 1rem;
     border-radius: 5px;
     box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
     max-width: 90%;
     max-height: 90%;
     overflow: auto;
 }

 .modal-header {
     display: flex;
     justify-content: space-between;
     align-items: center;
     margin-bottom: 1rem;
 }

 .modal-footer {
     display: flex;
     justify-content: flex-end;
     gap: 10px;
 }
</style>