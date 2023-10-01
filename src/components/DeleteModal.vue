<script lang="ts">
import { reactive } from "vue"
import { useStore } from "vuex"
import { VisibilityHandler } from "@/utils/VisibilityHandler"
import { emitter } from "@/views/HomeView.vue"
import Loader, { actions as LoaderActions } from "../components/Loader.vue"
import ErrorPage, { actions as ErrorActions, textActions as ErrorText } from "@/components/ErrorPage.vue"
import type { IQuote } from "@/models"

const state = reactive({
    id: ''
});

export const actions = new VisibilityHandler();

export const getData = (object: IQuote) => {
    state.id = object.id
}

export default {
    name: "DeleteModal",
    components: {
        'loader': Loader,
        'error-page': ErrorPage
    },
    setup() {
        const store = useStore();

        const handleSubmit = async () => {
            LoaderActions.open();
            try {
                await store.dispatch('deleteQuote', state.id)
            } catch (error: any) {
                ErrorActions.open()
                ErrorText.setText(error.message);
            } finally {
                emitter.emit('triggerQuote');
                LoaderActions.close();
                actions.close();
            }
        }

        return {
            actions,
            handleSubmit
        }
    }
}
</script> 

<template>
    <div class="modal-container" v-if="actions.isHide.value">
        <loader />
        <error-page />
        <div class="modal">
            <div class="modal-header">
                <h2>Вы уверены что хотите удалить?</h2>
                <button class="button" @click="actions.close()">X</button>
            </div>
            <div class="modal-footer">
                <div class="button" @click="handleSubmit()">Удалить</div>
                <div class="button" @click="actions.close()">Закрыть</div>
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

 .button {
     padding: 0.5rem;
     border-radius: 5px;
     border: none;
     background-color: #007aff;
     color: #fff;
     font-size: 1rem;
     cursor: pointer;
     transition: background-color 0.2s ease-in-out;
     text-align: center;
 }
</style>