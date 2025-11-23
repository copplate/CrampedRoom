import Singleton from "../Base/Singleton"

interface IItem{
  func:Function
  ctx:unknown
}


export default class EventManager extends Singleton{//单例,事件中心

  static get Instance(){
    return super.GetInstance<EventManager>()
  }

  private eventDic : Map<string,Array<IItem>> = new Map()         //eventDic 事件字典 ; Map 的key-string  事件名称 ;Array<Function> 是方法的数组

  //另外，js的函数调用是非常诡异的，this指向经常会根据调用的情况指到不一样的对象上，所以需要绑定上下文ctx
  on(eventName:string,func:Function,ctx?: unknown){   //绑定方法
    if(this.eventDic.has(eventName)){   //判断一下字典有没有事件名称
      this.eventDic.get(eventName).push({func,ctx})
    }else{
      this.eventDic.set(eventName,[{func,ctx}])
    }
  }

  off(eventName:string,func:Function){    //解绑方法
    if(this.eventDic.has(eventName)){
      const index = this.eventDic.get(eventName).findIndex(i => i.func === func)
      index > -1 && this.eventDic.get(eventName).splice(index,1)
    }
  }

  emit(eventName:string, ...params : unknown[]){    //触发方法
    if(this.eventDic.has(eventName)){
      this.eventDic.get(eventName).forEach(({func,ctx}) => {
        //如果ctx存在，就要调用func的apply方法来绑定上下文，并把参数传进去；否则的话，用户也不关心上下文，就直接拿到每一个函数，调用每一个函数
        ctx?func.apply(ctx,params): func(...params)
      })
    }
  }

  clear(){    //清空字典（关卡切换时，事件中心所有函数都要删掉）
    this.eventDic.clear()
  }

}
