import loadingBar from './loadingBar/loadingBar.js'
import loading from './loading/loading.js'
import messageBox from './messageBox/messageBox.js'
import './index.scss';


const components = {
    loadingBar,
    loading,
    messageBox
}

export default function install(Vue) {

    //console.log(Vue);
    Object.keys(components).forEach(key => {

        Vue.use(components[key])
    })

    Vue.directive('loading', {
        bind(el, binding, vnode) {

            if (binding.value) {
                Vue.$loading.show({$el:el});
            } else {
                Vue.$loading.hide();
            }

        },
        update(el, binding) {

            //console.log(binding);
            //=value === oldValue, 避免重复更新
            //if (binding.value !== binding.oldValue) {

                if (binding.value) {
                    Vue.$loading.show({$el:el});
                } else {
                    Vue.$loading.hide({$el:el});
                }

            //}
        },
        componentUpdated:function (el, binding, vnode) { //4-更新完成
            console.log("4-componentUpdated 更新完成");
        },
        
        unbind:function (el, binding, vnode) { //5-解绑
            
                Vue.$loading.hide({$el:el});
            
        }
    })

    
}
