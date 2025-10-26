
import { _decorator, Component, Node } from 'cc';
import { TileMapManager } from '../Tile/TileMapManager';
import { createUINode } from '../../Utils';
import Levels, { ILevel } from '../../Levels';
import { DataManagerInstance } from '../../Runtime/DataManager';
import { TILE_HEIGHT, TILE_WIDTH } from '../Tile/TileManager';
const { ccclass, property } = _decorator;



@ccclass('BattleManager')
export class BattleManager extends Component {
    level:ILevel
    stage:Node

    start () {
        this.generateStage()
        this.initLevel()


    }

    initLevel(){
        const level = Levels[`level${1}`]
        if(level){
            this.level = level
            DataManagerInstance.mapInfo = this.level.mapInfo
            DataManagerInstance.mapRowCount = this.level.mapInfo.length || 0
            DataManagerInstance.mapColumnCount = this.level.mapInfo[0].length || 0


            this.generateTileMap()
        }


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
        const {mapRowCount,mapColumnCount} = DataManagerInstance
        const disX = TILE_WIDTH * mapRowCount / 2
        const disY = TILE_HEIGHT * mapColumnCount / 2

        this.stage.setPosition(-disX,disY)


    }


}


