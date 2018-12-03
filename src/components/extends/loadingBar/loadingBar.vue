<template>

    <div class="kila-loading-bar" style="height: 2px;" v-show="show">
        <div class="kila-loading-bar-inner kila-loading-bar-inner-color-primary" :style="'width:'+width+'%; height: 2px;'"></div>
    </div>
</template>
<script>
export default {
    props: {
        show: Boolean,
        end:Boolean
    },
    data() {
        return {
            width: 10,
            $hd: null
        };
    },
    created() {
        //console.log("eee");
    },
    mounted() {
        this.width = 0;
        var me = this;
    },
    watch: {
        show(v) {
            var me = this;
            if (v) {
                me.width = 0;
                me.$hd = window.setInterval(function() {
                    if (me.width <= 90) {
                        me.width += 10;
                    } else {
                        if (me.$hd) {
                            window.clearInterval(me.$hd);
                            me.$hd = null;
                        }
                    }
                }, 50);
            } 
        },
        end(v){
            
        }
    }
};
</script>

