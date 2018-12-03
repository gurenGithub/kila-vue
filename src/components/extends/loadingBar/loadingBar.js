import loadingComponent from './loadingBar.vue';
import Vue from 'vue';

let instance;
const loadingConstructor = Vue.extend(loadingComponent);
instance = new loadingConstructor({
    el: document.createElement('div')
});
instance.show = false;

const loadingBar = {

    show(options) {
        //console.log('show');
        instance.show = true;
        instance.end=false;
        instance.$mount();
        document.body.appendChild(instance.$el)
    },
    hide() {
        setTimeout(function(){  
            instance.show = false;
        },1000);
        
    }
}

export default {

    install() {

        if (!Vue.$loadingBar) {
            Vue.$loadingBar = loadingBar;
        }
        //console.log('install $loadingBar');
        Vue.mixin({
            created() {

                this.$loadingBar = Vue.$loadingBar;
            }
        })
    }
}