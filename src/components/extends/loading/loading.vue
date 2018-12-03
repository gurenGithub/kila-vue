<template>
    <div class="kila-loading-mask" v-show="show">
        <div class="kila-loading-spinner">
            <svg viewBox="25 25 50 50" class="circular">
                <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
            </svg>
            
            <!---->
        </div>
    </div>
</template>
<script>
export default {
    props: {
        show: Boolean
    },
    data() {
        return {
            
            
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
            
        }
    }
};
</script>

