<template>
    <transition name="fade">
        <div v-if="isShow" tabindex="-1" role="dialog" aria-modal="true" aria-labkila="标题名称" class="kila-message-box__wrapper" style="z-index: 2001;">

            <div class="kila-message-box">
               
                <div class="kila-message-box__header" v-if="options.title">
                    <div class="kila-message-box__title">
                        <span v-html="options.title"></span>
                         <button @click="hide()" type="button" aria-labkila="Close" class="kila-message-box__headerbtn">
                    <i class="kila-message-box__close kila-icon kila-icon_close">
                    </i></button></div>
                        <slot name="title"></slot>
                </div>
                <div class="kila-message-box__content">
                    <!---->
                    <div class="kila-message-box__message" v-html="options.content">
                    </div>
                    <slot></slot>
                    <div class="kila-message-box__input" style="display: none;">
                        <div class="kila-input">
                            <!----><input type="text" autocomplete="off" placeholder="" class="kila-input__inner">
                            <!---->
                            <!---->
                            <!---->
                        </div>
                        <div class="kila-message-box__errormsg" style="visibility: hidden;"></div>
                    </div>
                </div>
                <div class="kila-message-box__btns" v-if="options.buttons && options.buttons.length>0">
                    <button v-for="(item,index) in options.buttons" :key="index" type="button" @click="item.click()" :class="'kila-button kila-button--default kila-button--small kila-button--'+(item.class || 'primary') ">

                        <span>
                            {{item.title}}
                        </span>
                    </button>

                </div>
            </div>

            <div class="v-modal"  ></div>

        </div>
    </transition>
</template>
<script>
export default {
    props: {
        onHide:{
            type:Function,
            default:()=>{

            }
        },
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
    onModelHide(){
        
    },
    created() {
        //console.log("eee");
    },
    methods: {
        show(options) {
            this.isShow = true;
            Object.assign(this.options, options);
        },
        hide() {
            this.isShow = false;
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

