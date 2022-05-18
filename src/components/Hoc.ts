import { h, resolveDynamicComponent, Component, VNode } from 'vue'
interface fun<T> { 
  ():T
}
interface slot { 
  [key:string]:fun<VNode>
}
interface componentInstance { 
  type: string | Component,
  attrs?: fun<any>,//数据驱动的模式设置组件属性
  slots?: slot,
  children?:componentInstance[]
}
const HocComponent = (props: componentInstance) =>renderChild(props)

export default HocComponent
const renderChild = (item: componentInstance) =>
  h(resolveDynamicComponent(item.type) as Component,
    item.attrs && item.attrs(),
    item.children ? {
      ...item.slots,
      default: () => item.children?.map(item => renderChild(item))
    }:{ 
      ...item.slots
    })
