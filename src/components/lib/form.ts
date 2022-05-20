import { ref, VNode } from 'vue';
import { componentInstance } from '@/components/Hoc';
export interface formValue { //表单值
  [key:string]:any
}
interface formItemType { 
  attrs?: componentInstance['attrs'],
  formItem?: componentInstance
}
interface formIntance { 
  attrs?: formValue,
  formItems?: formItemType[],
  formValue?: formValue,
  formComponent?: string | VNode,
  formItemComponent?: string |VNode
}
/**
 * 表单函数组件
 * @param formIntance 
 * @returns 
 */
export default function(formIntance:formIntance) { 
  const formRef = ref(null)
  const forms =  [
    {
      type: formIntance.formComponent,
      attrs: () => { 
        return Object.assign({}, formIntance.attrs, {
          model: formIntance.formValue,
          ref: formRef
        })
      },
      children: () => formIntance.formItems?.map(item => Object.assign({}, item, {
        type: formIntance.formItemComponent,
        formItem: undefined,
        children: [
          {
            ...item.formItem
          }
        ]
      }))//设置响应性
    }
  ]
  return  { 
    forms,
    formRef
  }
}