

export default class Singleton{
  private static _instance :any = null    //私有的静态成员字段，类型是any，默认值是null

  static GetInstance<T>():T{ //公有的静态方法，给外界调用
    if(this._instance === null){
      this._instance = new this()
    }

    return this._instance
  }



}
