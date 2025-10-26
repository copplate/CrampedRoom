
import { _decorator, Component, Layers, Node, resources, Sprite, SpriteFrame, UITransform } from 'cc';
const { ccclass, property } = _decorator;
import Levels from '../../Levels'

export const TILE_WIDTH = 55
export const TILE_HEIGHT = 55

@ccclass('TileManager')
export class TileManager extends Component {
  init(spriteFrame:SpriteFrame,i:number,j:number){
    const sprite = this.addComponent(Sprite)
    // const imgSrc = `tile (${item.src})`
    sprite.spriteFrame = spriteFrame

    const transform = this.getComponent(UITransform)//拿到组件实例
    transform.setContentSize(TILE_WIDTH,TILE_HEIGHT)

    //每一个元素如果想要被 canvas 渲染，就要设置Layer 为 UI_2D，直接创建的空节点不具备这个属性，所以要设置一下layer
    //node.layer = 1 << Layers.nameToLayer("UI_2D")
    this.node.setPosition(i * TILE_WIDTH, -j * TILE_HEIGHT)


  }





}


