import { _decorator, Component, Node, Sprite, UITransform,Animation, AnimationClip, animation, SpriteFrame } from 'cc';
import EventManager from '../../Runtime/EventManager';
import { CONTROLLER_ENUM, EVENT_ENUM } from '../../Enums';
import { TILE_HEIGHT, TILE_WIDTH } from '../Tile/TileManager';
import ResourceManager from '../../Runtime/ResourceManager';
const { ccclass, property } = _decorator;

const ANIMATION_SPEED = 1/8

@ccclass('PlayerManager')
export class PlayerManager extends Component {

    x:number = 0
    y:number = 0
    targetX:number = 0
    targetY:number = 0
    private readonly speed = 1 / 10

    async init(){
        await this.render()
        EventManager.Instance.on(EVENT_ENUM.PLAYER_CONTROL,this.move,this)//把move方法绑定到事件中心
    }

    update(){ //生命周期函数
        this.updateXY()
        this.node.setPosition(this.x * TILE_WIDTH - TILE_WIDTH * 1.5, -this.y * TILE_HEIGHT + TILE_HEIGHT * 1.5) //把虚拟坐标转换成屏幕渲染的实际坐标
    }

    updateXY(){
        if(this.targetX < this.x){
            this.x -= this.speed
        }else if(this.targetX > this.x){
            this.x += this.speed
        }

        if(this.targetY < this.y){
            this.y -= this.speed
        }else if(this.targetY > this.y){
            this.y += this.speed
        }

        if(Math.abs(this.targetX - this.x) <= 0.1 && Math.abs(this.targetY - this.y) <= 0.1){
            this.x = this.targetX
            this.y = this.targetY
        }
    }

    move(inputDirection:CONTROLLER_ENUM){
        if(inputDirection === CONTROLLER_ENUM.TOP){
            this.targetY -= 1
        }else if(inputDirection === CONTROLLER_ENUM.BOTTOM){
            this.targetY += 1
        }else if(inputDirection === CONTROLLER_ENUM.LEFT){
            this.targetX -= 1
        }else if(inputDirection === CONTROLLER_ENUM.RIGHT){
            this.targetX += 1
        }
    }

    async render(){
        //添加一个Sprite组件
        const sprite = this.addComponent(Sprite)
        sprite.sizeMode = Sprite.SizeMode.CUSTOM

        //设置元素的大小
        const transform = this.getComponent(UITransform)
        transform.setContentSize(TILE_WIDTH * 4,TILE_HEIGHT * 4)

        const spriteFrames = await ResourceManager.Instance.loadDir("texture/player/idle/top")
        const animationComponent = this.addComponent(Animation)

        const animationClip = new AnimationClip();
        animationClip.duration = 1.0; // 整个动画剪辑的周期

        // const track  = new animation.VectorTrack(); // 创建一个向量轨道
        const track  = new animation.ObjectTrack(); // 创建一个对象轨道
        // track.componentsCount = 3; // 使用向量轨道的前三条通道
        // track.path = new animation.TrackPath().toHierarchy('Foo').toProperty('position'); // 指定轨道路径，即指定目标对象为 "Foo" 子节点的 "position" 属性
        track.path = new animation.TrackPath().toComponent(Sprite).toProperty('spriteFrame'); // 指定轨道路径，即指定目标对象为 "Foo" 子节点的 "position" 属性

        const frames : Array<[number,SpriteFrame]> = spriteFrames.map((item,index) => [ANIMATION_SPEED * index,item]) //得到关键帧列表 frames
        //对象轨道只有一个channel
        track.channel.curve.assignSorted(frames)
        // track.channel.curve.assignSorted([ // 为 x 通道的曲线添加关键帧，关键帧第一个参数 0.4 是时间，value: 0.4  是变化的属性
        //     [0.4, ({ value: 0.4 })],
        //     [0.6, ({ value: 0.6 })],
        //     [0.8, ({ value: 0.8 })],
        // ]);

        // 最后将轨道添加到动画剪辑以应用
        animationClip.addTrack(track);

        animationClip.duration = frames.length * ANIMATION_SPEED; // 整个动画剪辑的周期
        animationClip.wrapMode = AnimationClip.WrapMode.Loop
        animationComponent.defaultClip = animationClip
        animationComponent.play()
    }
}
