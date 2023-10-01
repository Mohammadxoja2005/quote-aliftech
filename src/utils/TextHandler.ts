import { ref } from "vue";

export class TextHandler {
    text = ref('');

    constructor(text: string) {
        this.text.value = text;

    }

    setText(text: string) {
        this.text.value = text;
    }
}