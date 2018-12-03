<template>
    <div class="kila-message-box__header" v-if="options.title">
        <div class="kila-message-box__title">
            <span ><slot></slot></span>
            <button v-if="close" @click="hide()" type="button" aria-labkila="Close" class="kila-message-box__headerbtn">
                <i class="kila-message-box__close kila-icon kila-icon_close">
            </i></button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: "",
        close: true,
        value: Boolean
    },
    methods: {
        hide() {
            this.emit("input", false);
        }
    }
};
</script>

