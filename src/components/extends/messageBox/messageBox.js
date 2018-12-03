import messageBoxComponent from './messageBox.vue';
import messageBoxComponent2 from './messageBox2.vue';
import messageBoxHeader from './messageBoxHeader.vue';
import Vue from 'vue';
let instance;
const messageBoxConstructor = Vue.extend(messageBoxComponent);
instance = new messageBoxConstructor({
    el: document.createElement('div')
});
Vue.component('kila-message-box',messageBoxComponent2);
Vue.component('kila-message-box-header',messageBoxHeader);
const messageBox = {

    show(options) {
        
        //instance.options=options;
        instance.show(options)
        instance.$mount();
        if(options && options.$el){
            options.$el.appendChild(instance.$el);
            
           // addClass(options.$el,'kila-loading-layout');
        }else{
            document.body.appendChild(instance.$el)
        }
        
    },
    hide(options) {
        instance.hide();        
    }
}

var showMessage=function(opts){
   
    if(opts=="hide"){
        messageBox.hide();
        return;
    }
    messageBox.show(opts);
}

export default {
    install() {
        if (!Vue.$messageBox) {
            Vue.$messageBox =showMessage
        }
        Vue.mixin({
            created() {

                this.$messageBox =showMessage;
            }
        })
    }
}