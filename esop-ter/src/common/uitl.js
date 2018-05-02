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
  return 'http://' + this.$route.query.ip + '/esop' + apiUrl
}

//日星看板请求路径
export const kanBanUrl = function (apiUrl) {
  return 'http://' + this.$route.query.ip + apiUrl
}

//终端获取机器信息方法
export const getMacINfo = function () {
  try {
    let ANDROID = window.android;
    let equipNo = ANDROID.getProcess();
    let empNo = ANDROID.getJobNumber();
    let line = ANDROID.getLine();
    let plant = ANDROID.getPlant();
    let ptno = ANDROID.getPartNo();
    return {
      equipNo: equipNo,
      empNo: empNo,
      line: line,
      plant: plant,
      ptno: ptno
    }
  } catch (error) {
    console.log("测试环境")
    return {
      backUp: function () {
        console.log("返回上一页(只能在终端上生效)");
      },
      equipNo: 'P06', //工位
      empNo: 30031, //工号
      line: 'A', //制程
      plant: 'ZSA', //车间
      ptno: '10.100.200', //产品编码
    }
  }
}

//安卓环境下打开预览
export const androidSOP = function(url){
  console.log(url)
  try{
    window.android.openSOP(url);
  }catch(error){
    console.log("测试环境")
  }
}
