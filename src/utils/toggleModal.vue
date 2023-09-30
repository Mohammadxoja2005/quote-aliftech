<script lang="ts">
import { ref } from "vue";

export class toggleModal {
    isHide = ref(false);

    constructor() {
        this.isHide.value = false;
    }

    open() {
        this.isHide.value = true;
    }

    close() {
        this.isHide.value = false;
    }
}
</script>