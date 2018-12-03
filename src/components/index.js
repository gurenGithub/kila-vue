
const components = {
  
}

export default function install (Vue) {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
}
