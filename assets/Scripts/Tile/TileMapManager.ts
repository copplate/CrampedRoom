
import { _decorator, Component, Layers, Node, random, resources, Sprite, SpriteFrame, UITransform } from 'cc';
const { ccclass, property } = _decorator;
import { TileManager } from './TileManager';
import { createUINode, randomByRange } from '../../Utils';
import DataManager from '../../Runtime/DataManager';
import ResourceManager from '../../Runtime/ResourceManager';


@ccclass('TileMapManager')
export class TileMapManager extends Component {
  async init(){ //真正的生成瓦片
      //const {mapInfo} = Levels[`level${1}`]
      const spriteFrames = await ResourceManager.Instance.loadDir('texture/tile/tile')
      const {mapInfo} = DataManager.Instance


      for (let i = 0;i < mapInfo.length;i++) {
          const column = mapInfo[i];
          for (let j = 0;j < column.length;j++){
            const item = column[j];
            if(item.src === null || item.type === null){
              continue;
            }


            // const sprite = node.addComponent(Sprite)
            //获取路径时进行一定量的随机
            let number = item.src
            if((number === 1 || number === 5 || number === 9) && i % 2 === 0 && j % 2 === 0){  //只有偶数的瓦片才进行随机
              number += randomByRange(0,4)
            }
            const imgSrc = `tile (${number})`
            const node = createUINode()
            const spriteFrame = spriteFrames.find(v=>v.name === imgSrc) || spriteFrames[0]

            const tileManager = node.addComponent(TileManager) //拿到组件实例
            tileManager.init(spriteFrame,i,j)

            //const transform = node.addComponent(UITransform)//拿到组件实例
            //transform.setContentSize(TILE_WIDTH,TILE_HEIGHT)

            //每一个元素如果想要被 canvas 渲染，就要设置Layer 为 UI_2D，直接创建的空节点不具备这个属性，所以要设置一下layer
            //node.layer = 1 << Layers.nameToLayer("UI_2D")
            //node.setPosition(i * TILE_WIDTH, -j * TILE_HEIGHT)


            node.setParent(this.node)

          }

      }
  }

  // loadRes(){//回调函数不太好写，封装成Promise的形式
  //   return new Promise<SpriteFrame[]>((resolve,reject) =>{
  //     resources.loadDir("texture/tile/tile",SpriteFrame,function(err,assets){
  //       if(err){//如果有报错
  //         reject(err)
  //         return
  //       }

  //       resolve(assets)//把资源resolve出去


  //     })
  //   })
  // }



}


