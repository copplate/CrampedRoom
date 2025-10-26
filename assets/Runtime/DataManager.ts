import { ITile } from "../Levels"


class DataManager{//单例
  mapInfo:Array<Array<ITile>>
  mapRowCount:number
  mapColumnCount:number


}

export const DataManagerInstance = new DataManager()
