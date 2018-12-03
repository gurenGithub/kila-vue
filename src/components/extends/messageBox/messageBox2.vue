<template>
    <transition name="fade">
        <div v-if="value" tabindex="-1" role="dialog" aria-modal="true" aria-labkila="标题名称" class="kila-message-box__wrapper" style="z-index: 2001;">

            <slot name="title"></slot>
            <div class="kila-message-box">
                <div class="kila-message-box__content">

                    <slot></slot>

                </div>
                <div class="kila-message-box__btns">
                    <slot name="buttons"></slot>

                </div>
            </div>

            <div class="v-modal" @click="onModelHide()"></div>

        </div>
    </transition>
</template>
<script>
export default {
    props: {
        onHide: {
            type: Function,
            default: () => {}
        },
        value: Boolean
    },
    data() {
        var me = this;
        return {
            isShow: true,
            options: {
                title: "",
                content: "",
                width: 420,
                buttons: []
            }
        };
    },
    created() {
        //console.log("eee");
    },
    methods: {
        show(options) {
            this.isShow = true;
            Object.assign(this.options, options);
        },

        onModelHide() {
            this.$emit("input", false);
        },
        hide() {
            this.onModelHide();
            //console.log(this.isShow);
        }
    },
    mounted() {
        this.width = 0;
        var me = this;
    },
    watch: {
        show(v) {
            var me = this;
        }
    }
};
</script>

