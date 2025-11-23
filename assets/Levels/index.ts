import level1 from "db://assets/Levels/level1"
import level2 from "db://assets/Levels/level2"
import { TILE_TYPE_ENUM } from "../Enums"

//游戏有很多关卡，统一写一个index.ts的入口文件，导入所有的关卡，再暴露出去
export interface ITile{
  src:number | null,
  type:TILE_TYPE_ENUM | null,
}

export interface ILevel{
  mapInfo:Array<Array<ITile>>
}

const levels:Record<string,ILevel > = {  //ts的Record代表Map
  level1,
  level2,
}

export default levels


