<script lang="ts">
import { reactive } from "vue";
import { useStore } from "vuex";
import { toggleModal } from "@/utils/toggleModal";

const state = reactive({
    id: ''
});

export const actions = new toggleModal();

export const getData = (object: any) => {
    state.id = object.id
}

export default {
    name: "DeleteModal",
    setup() {
        const store = useStore();

        const handleSubmit = () => {

        }

        return {
            actions,
        }
    }
}

</script> 

<template>
    <div class="modal-container" v-if="actions.isHide.value">
        <div class="modal">
            <div class="modal-header">
                <h2>Are you sure about deleting data?</h2>
                <button @click="actions.close()">X</button>
            </div>
            <div class="modal-footer">
                <button>Удалить</button>
                <button @click="actions.close()">Закрыть</button>
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