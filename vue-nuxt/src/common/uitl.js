//启动全屏
export const launchFullscreen = function (element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

//关闭全屏
export const exitFullscreen = function () {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

//生成平板端接口请求路径
export const api_baseurl = function (apiUrl) {
  if (process.browser) {
    let url = location.search; //获取url中含"?"符后的字串
    let theRequest = new Object();
    if (url.indexOf("?") != -1) {
      let str = url.substr(1);
      let strs = str.split("&");
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return 'http://' + theRequest.ip + '/esop' + apiUrl
  }
}

//终端获取机器信息方法
export const getMacINfo = function () {
  if (process.browser) {
    // let mac = {
    //   equipNo: window.android.getProcess(),
    //   empNo: window.android.getJobNumber(),
    //   line: window.android.getLine(),
    //   plant: window.android.getPlant(),
    //   ptno: window.android.getPartNo(),
    // }
    // return mac
    return {
      backUp: function () {
        console.log("返回上一页(只能在终端上生效)");
      },
      equipNo: 'C01', //工位
      empNo: 30031, //工号
      line: 'BC1', //制程
      plant: '1000', //车间
      ptno: '06873008', //产品编码F
    }
  }
}
