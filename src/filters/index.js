import dateFormat from './dateFormat'

const filters = {
  dateFormat
}

export default function (Vue) {
  Object.keys(filters).forEach(name => {
    Vue.filter(name, filters[name])
  })
}
