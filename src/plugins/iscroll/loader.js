import { addScript } from '@/commons/utils'

const requestUrl = {
  js: '//cdn.jin10.com/assets/js/plugins/iscroll-probe-custom-min.js?20170721'
}

export default function loader () {
  return new Promise((resolve, reject) => {
    addScript(requestUrl.js, () => {
      resolve()
    })
  })
}
