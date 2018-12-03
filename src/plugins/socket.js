import { addScript } from '@/commons/utils'
import { requestUrl } from '@/commons/config'

let socketUrl = []

const loaderSocket = () => {
  return new Promise((resolve, reject) => {
    if (typeof io === 'undefined') {
      addScript('//cdn.jin10.com/assets/js/plugins/socket.io.js', () => {
        resolve()
      })
    } else {
      resolve()
    }
  })
}
/**
 * 发起socket连接
 */
export class SocketConnect {
  constructor (options) {
    let events = options ? options.events : {}

    this.instance = null
    this.connection = null
    this.urls = options && options.urls
    // { eventName (data) {} }
    this.events = {}
    Object.keys(events).forEach(name => this.on(name, events[name]))
    // 重连配置
    this.reConnectCount = 0
    this.connectTimeout = 500
    this.failCount = 1
    this.init()
  }
  connect () {
    let serverURL = this.urls || (socketUrl.length ? socketUrl : requestUrl.socket)
    if (Array.isArray(serverURL)) {
      let n = Math.floor(Math.random() * serverURL.length + 1) - 1
      serverURL = serverURL[n]
    }
    let instance = null
    this.instance = io.connect(serverURL, {'force new connection': true, 'reconnection': false})
    instance = this.instance

    instance.on('connect', () => {
      instance.emit('reg')
      // if (this.reConnectCount > 0) {
        // instance.emit('checkLogin')
      // }
    })
    instance.on('error', (reason) => {
      this.reConnect()
    })

    instance.on('connect_error', (reason) => {
      this.reConnect()
    })
    instance.on('repair', (reason) => {
      this.reConnect()
    })
    instance.on('reconnecting', (nextRetry) => {
      if (nextRetry > 5) {
        this.reConnect()
      }
    })
    instance.on('disconnect', (reason) => {
      if (reason !== 'io client disconnect') {
        this.reConnect()
      }
    })
    instance.on('time', (time) => {
    })

    for (let key in this.events) {
      instance.on(key, (data) => {
        const handlers = this.events[key]
        handlers.forEach(handler => handler(data))
      })
    }

    window.FB_SOCKET = instance
    return instance
  }
  emit (name, data, callback) {
    this.instance.emit(name, data, callback)
  }
  on (name, fn) {
    const handlers = this.events[name]
    if (handlers) {
      handlers.push(fn)
    } else {
      this.events[name] = [fn]
    }
    // 如果已经初始化 手动订阅一下
    if (this.instance) {
      this.instance.on(name, fn)
    }
  }
  off (name, fn) {
    const handlers = this.events[name]
    if (handlers) {
      handlers.some((handler, index) => {
        if (handler === fn) {
          return handlers.splice(index, 1)
        }
      })
    }
    if (this.instance) {
      this.instance.off(name, fn)
    }
  }
  reConnect () {
    if (this.reConnectCount >= 6 * this.failCount) {
      this.failCount = 2
      if (this.connectTimeout >= 30000) {
        this.connectTimeout = 30000
      } else {
        this.connectTimeout = this.connectTimeout * this.failCount
      }
    }
    this.reConnectCount++
    setTimeout(() => {
      this.instance.disconnect()
      setTimeout(() => {
        this.connect()
      }, 1)
    }, this.connectTimeout)
  }
  init () {
    this.connection = loaderSocket().then(() => {
      this.connect()
      return this
    })
  }
}
