import { Layers, Node, UITransform, } from 'cc';


export const createUINode = (name:string = '')=>{             //参数传进来一个名字，默认是空 ''
  const node = new Node(name) //创建Node的时候可以传名字，不传也行
  const transform = node.addComponent(UITransform)
  transform.setAnchorPoint(0,1)
  node.layer = 1 << Layers.nameToLayer(`UI_2D`)

  return node

}


export const randomByRange = (start:number,end:number) => {
  return Math.floor(start + (end - start) * Math.random())
}
