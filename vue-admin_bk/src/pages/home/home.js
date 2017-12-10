import './home.scss'

export default {
    data() {
      return {
        isCollapse: true
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      leftMenuCrl(){
        if(this.isCollapse){
                this.isCollapse = false;
        }else{
                this.isCollapse = true;
        }
      }
    }
}