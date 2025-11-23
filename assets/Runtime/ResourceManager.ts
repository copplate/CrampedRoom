import { resources, SpriteFrame } from "cc"
import Singleton from "../Base/Singleton"
import { ITile } from "../Levels"


export default class ResourceManager extends Singleton{//单例

  static get Instance(){
    return super.GetInstance<ResourceManager>()
  }


  //texture/tile/tile
  loadDir(path:string,type : typeof SpriteFrame = SpriteFrame){//path 路径 ；type 资源加载的类型,默认值SpriteFrame
    return new Promise<SpriteFrame[]>((resolve,reject) =>{
      resources.loadDir(path,type,function(err,assets){
        if(err){//如果有报错
          reject(err)
          return
        }

        resolve(assets)//把资源resolve出去


      })
    })
  }

}

