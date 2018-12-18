class Data{
  constructor() {

    this.startDown=false;
  }

  static setData(x){
    this.startDown=x;
  }
  static getData(){
    return this.startDown;
  }
}