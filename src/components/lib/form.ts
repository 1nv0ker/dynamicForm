import { ref } from 'vue';
import { Form } from 'ant-design-vue';
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
  formValue?:formValue
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
      type: Form,
      key: 'form',
      attrs: () => { 
        return Object.assign({}, formIntance.attrs, {
          model: formIntance.formValue,
          ref: formRef
        })
      },
      children: () => formIntance.formItems?.map(item => Object.assign({}, item, {
        type: Form.Item,
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