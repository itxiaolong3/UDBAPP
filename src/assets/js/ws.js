var websock = null;
var global_callback = null;
var serverPort = '5000'; //webSocket连接端口
var      timeout = 28 * 100 //30秒一次心跳
var timeoutObj = null//心跳心跳倒计时
var serverTimeoutObj =  null //心跳倒计时
var lockReconnect = false//是否真正建立连接
var timeoutnum = null //断开 重连倒计时
// function getWebIP(){
// 	var curIP = window.location.hostname;
// 	return curIP;
// }

function initWebSocket() { //初始化weosocket
  //ws地址
  var wsuri = "ws://112.74.105.6:8888";
  websock = new WebSocket(wsuri);
  websock.onmessage = function (e) {
    websocketonmessage(e);
  }
  websock.onclose = function (e) {
    websocketclose(e);
  }
  websock.onopen = function () {
    websocketOpen();
  }

  //连接发生错误的回调方法
  websock.onerror = function () {
    console.log("WebSocket连接发生错误");
  }
}

// 实际调用的方法
function sendSock(agentData, callback) {
  global_callback = callback;
  if (websock.readyState === websock.OPEN) {
    //若是ws开启状态
    websocketsend(agentData)
  } else if (websock.readyState === websock.CONNECTING) {
    // 若是 正在开启状态，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData, callback);
    }, 1000);
  } else {
    // 若未开启 ，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData, callback);
    }, 1000);
  }
}

function start() {
  //开启心跳
//   var self = this;

  timeoutObj && clearTimeout(timeoutObj);
  serverTimeoutObj && clearTimeout(serverTimeoutObj);
  timeoutObj = setTimeout(function () {
    //这里发送一个心跳，后端收到后，返回一个心跳消息，
    if (websock.readyState == 1) {
        // console.log('跳');
        
      //如果连接正常
      let str = {
        type: 29
      };
      // console.log(JSON.stringify(str),'iii');

      websock.send(JSON.stringify(str));
    } else {
      //否则重连
      reconnect();
    }
    serverTimeoutObj = setTimeout(function () {
      //超时关闭
      websock.close();
    }, timeout);
  }, timeout);
}
 function reconnect() {
    //重新连接
    if (lockReconnect) {
      return;
    }
    lockReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    timeoutnum && clearTimeout(timeoutnum);
    timeoutnum = setTimeout(function() {
      //新连接
      console.log("新连接");

      initWebSocket();
      lockReconnect = false;
    }, 5000);
  }
  function reset() {
    //重置心跳
    //清除时间
    clearTimeout(timeoutObj);
    clearTimeout(serverTimeoutObj);
    //重启心跳
    start();
  }
//数据接收
function websocketonmessage(e) {
  global_callback(JSON.parse(e.data));

  reset()
  // console.log(e,'跳');
  
}

//数据发送
function websocketsend(agentData) {
  websock.send(JSON.stringify(agentData));
}

//关闭
function websocketclose(e) {
    // return
  // console.log("connection closed (" + e.code + ")");
  websock.close()
}

function websocketOpen(e) {
  console.log("连接成功");
  start()
}

// initWebSocket();

export {
  sendSock,
  websocketclose,
  initWebSocket
}
