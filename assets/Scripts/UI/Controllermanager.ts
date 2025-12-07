
import { _decorator, Component, Node } from 'cc';
import EventManager from '../../Runtime/EventManager';
import { CONTROLLER_ENUM, EVENT_ENUM } from '../../Enums';
const { ccclass, property } = _decorator;



@ccclass('Controllermanager')
export class Controllermanager extends Component {

    handleCtrl(evt:Event,type:string){
        // EventManager.Instance.emit(EVENT_ENUM.NEXT_LEVEL)
        EventManager.Instance.emit(EVENT_ENUM.PLAYER_CONTROL,type as CONTROLLER_ENUM)
    }
}

