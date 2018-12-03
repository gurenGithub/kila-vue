<template>
    <div class="container">
        <div class="header">
        </div>
        <div class="body">
            <transition name="fade">
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
            </transition>
            <transition name="fade">
                <router-view v-if="!$route.meta.keepAlive"></router-view>
            </transition>
        </div>
        <div class="footer">

        </div>
    </div>
</template>

<script>
export default {
    name: "app",
    components: {},
    created() {},
    methods: {}
};
</script>
<style type="text/css" lang="scss">
@import "./styles/index.scss";
</style>
