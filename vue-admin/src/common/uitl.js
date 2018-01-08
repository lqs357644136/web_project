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

//终端获取机器信息方法
export const getMacINfo = function () {
  // let equipNo = Window.android.getProcess();
  // let empNo = Window.android.getJobNumber();
  // let line = Window.android.getLine();
  // let plant = Window.android.getPlant();
  // let backUp = Window.android.finish();
  // return {
  //   backUp:backUp,
  //   equipNo: equipNo,
  //   empNo: empNo,
  //   line: line,
  //   plant: line,
  // }
  return {
    backUp:function(){
      console.log("返回上一页(只能在终端上生效)");
    },
    equipNo: 'C01',
    empNo: 30031,
    line:'BC1',
    plant:'1000',
  }
}
