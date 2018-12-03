import { fetch } from "@/commons/fetch";
import requestConfig from "@/configs/urls.config.js";
/**
 * home模块的store
 */

// state
const state = {

  from: {},
  module: '',
  isSubmit: false
}


// getters
const getters = {
  from: state => state.from,
  module: state => state.module
}

var getUrl = function (name) {

  return requestConfig[state.module][name];
}
var getHeaders = function () {

  return requestConfig[state.module].headers || requestConfig.headers
}

var _openList = () => {
  xVue.$router.push({ path: "/" + state.module });
}
const mutations = {

  setForm(state, options) {

    Object.assign(state.from, options);
  },
  getForm(state, name) {

    return this.state.from[name];
  },
  setModule(state, name) {
    state.module = name;
  },
  openPage(state, path) {

    console.log(path);
    xVue.$router.push({ path: "/" + state.module + '/' + path });
  },
  openAdd() {

    xVue.$router.push({ path: "/" + state.module + '/add' });
  },
  openEdit(state, id) {
    xVue.$router.push({ path: "/" + state.module + '/edit/' + id });
  },
  openList(state) {
    _openList();
  }
}
// actions
const actions = {

  add({ commit }, { onCompleted, form }) {
    let _this = this;
    var url2 = getUrl('add');

    if (state.isSubmit) {
      return;
    }
    state.isSubmit = true;
    return new Promise((resolve, reject) => {
      let url = url2;
      fetch({
        type: "post",
        url,
        data: form,
        headers: getHeaders(),
        callback: () => { },
        success: res => {
          if (res.code == 200 || res.status == 200) {
            xVue.$tips({
              message: res.message,
              type: "success"
            });


            if (onCompleted) {
              if (onCompleted(res) !== true) {
                _openList();
              }
            } else {
              // _openList();
            }




            //_this.getNews();
            //_this.showEditor = false;
          } else {
            xVue.$tips({
              message: res.message,
              type: "error"
            });
          }
          state.isSubmit = false;
        }
      });
    });

  },
  postAjax({ commit }, { onCompleted, params, method, isJson }) {
    let _this = this;

    var url = getUrl(method); //getUrlConfig()[method];
    return new Promise((resolve, reject) => {


      var options = {
        type: "post",
        url,
        data: params,
        headers: getHeaders(),
        useJson: isJson === undefined ? true : isJson,
        callback: () => { },
        success: res => {
          if (res.code == 200 || res.status == 200) {
            xVue.$tips({
              message: res.message || 'ok',
              type: "success"
            });


            onCompleted(res);

          } else {
            xVue.$tips({
              message: res.message || 'error',
              type: "error"
            });
          }
          state.isSubmit = false;
        }
      }
      fetch(options);
    });

  },
  refresh({ commit }) {
    _openList();
  },
  edit({ commit }, { onCompleted, form }) {
    let _this = this;

    if (state.isSubmit) {
      return;
    }
    state.isSubmit = true;
    var url2 = getUrl('update');
    return new Promise((resolve, reject) => {
      let url = url2;
      fetch({
        type: "post",
        url,
        data: form,
        //useJson:true,
        headers: getHeaders(),
        callback: () => { },
        success: res => {
          if (res.code == 200 || res.status == 200) {
            xVue.$tips({
              message: res.message || '更新成功',
              type: "success"
            });

            if (onCompleted) {
              if (onCompleted(res) !== true) {
                _openList();
              }
            } else {
              // _openList();
            }


            //_this.getNews();
            //_this.showEditor = false;
          } else {
            xVue.$tips({
              message: res.message,
              type: "error"
            });
          }
          state.isSubmit = false;
        }
      });
    });


  },
  getAjax({ commit }, { onCompleted, params, url, method }) {
    let _this = this;

    if (method) {
      url = getUrl(method);
    }
    return new Promise((resolve, reject) => {
      //let url = url2;
      fetch({
        type: "post",
        url,
        params: params,
        headers: getHeaders(),
        callback: () => { },
        success: res => {


          onCompleted(res)

          //_this.getNews();
          //_this.showEditor = false;
        }
      });
    });


  },


  delete({ commit }, { onCompleted, id }) {
    let _this = this;

    if (state.isSubmit) {
      return;
    }
    state.isSubmit = true;
    var url2 = getUrl('delete');
    return new Promise((resolve, reject) => {
      let url = url2;
      fetch({
        type: "post",
        url,
        data: {
          id: id
        },
        headers: getHeaders(),
        callback: () => { },
        success: res => {
          if (res.code == 200 || res.status == 200) {
            xVue.$tips({
              message: res.message,
              type: "success"
            });
            if (onCompleted) {
              if (onCompleted(res) !== true) {
                _openList();
              }
            } else {
              // _openList();
            }
            //_this.getNews();
          } else {
            xVue.$tips({
              message: res.message,
              type: "error"
            });
          }
          state.isSubmit = false;
        }
      });
    });
  },
  getData({ commit }, { onCompleted, id }) {
    let _this = this;
    var url2 = getUrl('get');
    return new Promise((resolve, reject) => {
      let url = url2;
      fetch({
        type: "get",
        url,
        params: { id: id },
        headers: getHeaders(),
        callback: () => { },
        success: res => {
          //console.log(res);
          if (res.code == 200 || res.status == 200) {


            var data = res.data[state.module];

            // Object.assign(state.form, data);
            if (onCompleted) {
              onCompleted(res.data);
            }
            // _this.getNews();
            // _this.showEditor = false;
          }
        }
      });
    });
  },
  getList({ commit }, { params, onCompleted }) {
    let _this = this;
    var url2 = getUrl('list');
    fetch({
      type: "get",
      url: url2,
      params: params,
      headers: getHeaders(),
      callback: () => {
        //_this.isLoading = false;
      },
      success: res => {


        if (res.code == 200 || res.status == 200) {
          onCompleted(res.data);
        }
      },
      fail: () => {
        //_this.isLoading = false;
      },
      error: () => {
        // _this.isLoading = false;
      }
    });
  }
}

// mutations


export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
