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
export const api_baseurl = function (host) {
  return 'http://' + host + '/esop'
}

//终端获取机器信息方法
export const getMacINfo = function () {
  let ANDROID = window.android;
  let equipNo = ANDROID.getProcess();
  let empNo = ANDROID.getJobNumber();
  let line = ANDROID.getLine();
  let plant = ANDROID.getPlant();
  return {
    equipNo: equipNo,
    empNo: empNo,
    line: line,
    plant: line,
  }
  // return {
  //   backUp:function(){
  //     console.log("返回上一页(只能在终端上生效)");
  //   },
  //   equipNo: 'C01',//工位
  //   empNo: 30031,//工号
  //   line:'BC1',//制程
  //   plant:'1000',//车间
  // }
}

//处理多语言
export const esop_i18nLang_init = function (modArr, data) {
  return new Promise((resolve, reject) => {
    let langObj = {}
    for (let dataItem of data) {
      let data_modNames = dataItem.langKey.split('.');
      modArr.forEach((item, i) => {
        if (data_modNames.indexOf(item) != -1) {
          let modIndex = data_modNames.indexOf(item);
          let keyIndex = data_modNames.indexOf(item) + 2;
          let modName = data_modNames[modIndex];
          let keyName = data_modNames[keyIndex];
          let value = dataItem.langContext;
          if (langObj[modName]) {
            langObj[modName][keyName] = value;
          } else {
            langObj[modName] = {};
            langObj[modName][keyName] = value;
          }
        }
      })
    }
    resolve(langObj);
  })
}
