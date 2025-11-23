
import { _decorator, Component, Node } from 'cc';
import { TileMapManager } from '../Tile/TileMapManager';
import { createUINode } from '../../Utils';
import Levels, { ILevel } from '../../Levels';
import DataManager from '../../Runtime/DataManager';
import { TILE_HEIGHT, TILE_WIDTH } from '../Tile/TileManager';
import EventManager from '../../Runtime/EventManager';
import { EVENT_ENUM } from '../../Enums';
const { ccclass, property } = _decorator;


/** 一个专门放场景的manager */
@ccclass('BattleManager')
export class BattleManager extends Component {
    level:ILevel
    stage:Node

    onLoad(){//生命周期
        EventManager.Instance.on(EVENT_ENUM.NEXT_LEVEL,this.nextLevel,this)   //绑定
    }

    onDestroy(){//生命周期
        EventManager.Instance.off(EVENT_ENUM.NEXT_LEVEL,this.nextLevel)       //解绑
    }

    start () {
        this.generateStage()
        this.initLevel()


    }

    initLevel(){
        const level = Levels[`level${DataManager.Instance.levelIndex}`]
        if(level){
            this.clearlevel()

            this.level = level
            DataManager.Instance.mapInfo = this.level.mapInfo
            DataManager.Instance.mapRowCount = this.level.mapInfo.length || 0
            DataManager.Instance.mapColumnCount = this.level.mapInfo[0].length || 0


            this.generateTileMap()
        }


    }

    nextLevel(){//下一关
        DataManager.Instance.levelIndex++
        this.initLevel()
    }

    clearlevel(){//清空上一关的信息
        this.stage.destroyAllChildren()   //清空舞台上的元素
        DataManager.Instance.reset()      //清空数据中心
    }

    generateStage(){
        // const stage = new Node()  //瓦片 、 角色 和 敌人都要放在一个对象上，这个游戏对象就叫舞台
        this.stage = createUINode()
        this.stage.setParent(this.node)  //舞台设置一下parent， 是当前的canvas
    }

    generateTileMap(){

        const tileMap = createUINode()
        tileMap.setParent(this.stage)

        const tileMapManager = tileMap.addComponent(TileMapManager)
        tileMapManager.init()

        this.adaptPos()
    }

    adaptPos(){
        const {mapRowCount,mapColumnCount} = DataManager.Instance
        const disX = TILE_WIDTH * mapRowCount / 2
        const disY = TILE_HEIGHT * mapColumnCount / 2 + 80

        this.stage.setPosition(-disX,disY)


    }


}


