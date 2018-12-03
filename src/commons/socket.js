class Socket {




    constructor(options, onConnected, onFirstConnect) {

        var url = options.url;
        this.io = null;
        this.url = url;
        this.isAutoConnect = options.isAutoConnect;
        this.options = options;
        this.isAllReload=options.isAllReload;
        this.listens = [];
        this.reconnectCount = 0;
        var me = this;
        if (url) {

            this.addJs(function() {

                me.connnect(onConnected, onFirstConnect);

            });
        }



        //if(typeof )
    }
    addScript(url, callback) {

        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        // script.charset = 'GBK';
        script.onload = script.onreadystatechange = function() {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                callback();
                script.onload = script.onreadystatechange = null;
            }
        };
        script.src = url;
        head.appendChild(script);
    }
    addJs(callback) {


        if (typeof io === 'undefined') {
            this.addScript('//cdn.jin10.com/assets/js/plugins/socket.io.js', callback);

        } else {

            callback();
        }

    }
    send(name, value, callback) {

        this.io.emit(name, value, callback);

        console.log('emit:' + name);
    }
    listen(name, callback) {

        this.io.on(name, callback);
        this.listens.push(name);

        console.log('on:' + name);
    }
    removeListener(name) {

        this.io.removeListener(name);
    }
    dispose() {

        var me = this;
        this.isAutoConnect = false;
        me.listens.map((item) => {

            console.log('removeListener:' + item);
            me.removeListener(item);

        });
        me.listen = [];
        this.io.disconnect();
    }

    connnect(onConnected, onFirstConnect) {

        var me = this;
        this.io = io(this.url, {
            'force new connection': true,
            'reconnection': false
        });


        var autoConnect = function() {


            setTimeout(function() {
                if (me.reconnectCount > 20 && !me.isAllReload) {

                    var result = confirm('socket连接已断开，请联系管理员, 是否重新刷新页面。 ');
                    if (result) {

                        window.location.reload();
                    }

                    return;
                }
                if (me.isAutoConnect) {

                    me.listens.map((item) => {

                        console.log('removeListener:' + item);
                        me.removeListener(item);

                    });
                    me.listens = [];
                    setTimeout(function() {

                        me.connnect(onConnected);
                        me.reconnectCount++;
                    }, 1000);

                }
            }, 200);
        }

        this.listen('connect', function() {


            /*klineSocket.emit('setKlineSubscription', {
                symbol: category.code || "XAUUSD",
                timeType: category.timeType || 1
            }, function(data) {

                //console.log('setKlineSubscription');
                // console.log(data);

            });*/
            me.reconnectCount = 0;
            if (onConnected) {
                onConnected(me, me.reconnectCount);
            }


        });




        this.listen('disconnect', function() {
            /*if (window.console && window.console.log) {
                window.console.log('reconnect');
            }

            if (category.isAutoConnection === false) {
                oncallbak(category, onUpdate, klineSocket)
            } else {
                if (category.onDisconnect) {

                }
            }*/
            console.log('disconnect', me.options.onDisconnect);
            if (me.options.onDisconnect) {


                me.options.onDisconnect();
            }
            autoConnect();
        });

        this.listen('error', function() {
            /*if (window.console && window.console.log) {
                window.console.log('reconnect');
            }

            if (category.isAutoConnection === false) {
                oncallbak(category, onUpdate, klineSocket)
            } else {
                if (category.onDisconnect) {

                }
            }*/

            console.log('error', me.options.onDisconnect);
            if (me.options.onDisconnect) {

                me.options.onDisconnect();
            }
            autoConnect();
        });


        this.listen('connect_error', function(reason) {
            /*if (window.console && window.console.log) {
                window.console.log('reconnect');
            }

            if (category.isAutoConnection === false) {
                oncallbak(category, onUpdate, klineSocket)
            } else {
                if (category.onDisconnect) {

                }
            }*/
            console.log('connect_error', me.options.onDisconnect);
            if (me.options.onDisconnect) {

                me.options.onDisconnect();
            }
            autoConnect();
        });
        this.listen('repair', function(reason) {
            /*if (window.console && window.console.log) {
                window.console.log('reconnect');
            }

            if (category.isAutoConnection === false) {
                oncallbak(category, onUpdate, klineSocket)
            } else {
                if (category.onDisconnect) {

                }
            }*/
            // autoConnect();
        });
    }





}

export default Socket;