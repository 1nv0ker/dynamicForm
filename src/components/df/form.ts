import { VNode } from 'vue';
import { componentInstance } from '@/components/Hoc';
import { defaultComponent } from '@/config'
export interface formValue {
  [key:string]:any
}
interface formItemType { 
  attrs?: componentInstance['attrs'],//表单子项组件属性
  formItem?: componentInstance//表单子项控件
}
interface formIntance { 
  attrs?: formValue,//表单组件属性
  formItems?: formItemType[],
  formValue?: formValue,//表单值
  formComponent?: string | VNode,//表单组件名称
  formItemComponent?: string | VNode,//表单子项组件名称
  formRef?: unknown//表单引用
}
/**
 * 表单函数组件
 * @param formIntance 
 * @returns 
 */
export default function(formIntance:formIntance) { 
  const forms =  [
    {
      type: formIntance.formComponent || defaultComponent.form,
      attrs: () => { 
        return Object.assign({}, formIntance.attrs, {
          model: formIntance.formValue,
          ref: formIntance.formRef
        })
      },
      children: () => formIntance.formItems?.map(item => Object.assign({}, item, {
        type: formIntance.formItemComponent || defaultComponent.formItem,
        formItem: undefined,
        children: [
          {
            ...item.formItem
          }
        ]
      }))//传递函数
    }
  ]
  return  { 
    forms
  }
}