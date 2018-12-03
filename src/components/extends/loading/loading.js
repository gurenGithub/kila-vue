import loadingComponent from './loading.vue';
import Vue from 'vue';
import {addClass,removeClass} from './../utils';
let instance;
const loadingConstructor = Vue.extend(loadingComponent);
instance = new loadingConstructor({
    el: document.createElement('div')
});
instance.show = false;

const loading = {

    show(options) {
        instance.show = true;
        instance.$mount();
        if(options && options.$el){
            options.$el.appendChild(instance.$el);
            
            addClass(options.$el,'kila-loading-layout');
        }else{
            document.body.appendChild(instance.$el)
        }
        
    },
    hide(options) {
       
            instance.show = false;
            if(options && options.$el){  
                removeClass(options.$el,'kila-loading-layout');
            }
        
        
    }
}


export default {
    install() {
        if (!Vue.$loading) {
            Vue.$loading = loading;
        }
        Vue.mixin({
            created() {

                this.$loading = Vue.$loading;
            }
        })
    }
}