// import Singleton from "db://assets//Base/Singleton"
import Singleton from "../Base/Singleton"
import { ITile } from "../Levels"


export default class DataManager extends Singleton{//单例

  static get Instance(){
    return super.GetInstance<DataManager>()
  }

  mapInfo:Array<Array<ITile>>
  mapRowCount:number = 0
  mapColumnCount:number = 0
  levelIndex:number = 1     //关卡数

  reset(){
    this.mapInfo = []
    this.mapRowCount = 0
    this.mapColumnCount = 0

  }

}

// const haha = DataManager.Instance
// console.log(haha);


//export const DataManagerInstance = new DataManager()
