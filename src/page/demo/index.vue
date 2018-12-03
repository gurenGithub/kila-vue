<template>
    <div class="demo">
        <span @click="showLoading()">打开loading效果</span>
        <span @click="hideLoading()">关闭loading效果</span>
        <span @click="showLoading2()">打开loading2效果</span>
        <span @click="hideLoading2()">关闭loading2效果</span>
        <span @click="showMessageBox()">打开messagebox效果</span>
        <span @click="hideMessageBox()">关闭打开messagebox效果效果</span>
        <div style="height:500px" v-if="loading" v-loading="loading">
            jfljdsalfkj

        </div>
        <span @click="showMessageBox2()">打开messagebox2效果</span>
        <span @click="hideMessageBox2()">关闭打开messagebox2效果效果</span>

        <kila-message-box v-model="isMessageBox">
            <div>jfljdsalfkj</div>
        </kila-message-box>

    </div>
</template>

<script>
import vuexHelper, { createNamespacedHelpers } from "vuex";

const {
    mapState,
    mapMutations,
    mapGetters,
    mapActions
} = createNamespacedHelpers("common");

export default {
    name: "Content",
    components: {},
    props: {},
    data() {
        return {
            loading: false,
            isMessageBox: false
        };
    },
    computed: {},

    methods: {
        ...mapMutations([
            "openEdit",
            "openAdd",
            "openList",
            "setModule",
            "openPage"
        ]),
        ...mapActions([
            "getList",
            "delete",
            "edit",
            "add",
            "getAjax",
            "postAjax"
        ]),
        showLoading() {
            this.$loading.show();
        },

        hideLoading() {
            this.$loading.hide();
        },
        showLoading2() {
            this.loading = true;
            console.log(this.loading);
        },
        hideLoading2() {
            this.loading = false;
        },
        showMessageBox() {
            this.$messageBox({ title: "测试", content: "聚少离多决定啦" });
        },
        hideMessageBox() {
            this.$messageBox("hide");
        },
        showMessageBox2() {
            this.isMessageBox = true;
            console.log(this.loading);
        },
        hideMessageBox2() {
            this.isMessageBox = false;
        }
    },
    created() {},
    mounted() {
        this.setModule("demo"); //设置demo模块

        //this.$loadingBar.show()

        //this.$loading.show();
    },

    watch: {}
};
</script>

