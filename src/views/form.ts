import { Input, Switch, Form, Button, Select, } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue'
import { ref, h, shallowRef } from 'vue';
import { componentInstance, slot } from '../components/Hoc';
interface ComponentMapTYPE { 
  [key:string]:any
}
const ComponentMap:ComponentMapTYPE= {//组件名称映射
  'username': Input,
  'password': Input.Password,
  'switch': Switch,
  'show': Input,
  'add': Button,
  'select': Select,
  'confirm': Button,
  'test': Input,
  
}
enum key { 
  username = 'username',
  password = 'password',
  switch = 'switch',
  select = 'select',
  show = 'show',
  add = 'add',
  confirm = 'confirm'
}
interface formValue { 
  username?: string,
  password?: string,
  switch?: boolean,
  select?: string | number,
  show?: string,
  [key:string]:any
}
interface formItemType { 
  key: key | string,
  attrs?: componentInstance['attrs'],
  slots?: componentInstance['slots']
}
const formValue = ref<formValue>({
  switch: false,
  select: 1
})//form表单数据
let addIndex = 0
const formRef = ref(null)//form实例
const showStatus = ref('')
const formItems = ref<formItemType[]>([])
export default () => { //基础form组件
  formItems.value = [
    {
      key: key.username,
      attrs:() => {
        return {
          label: key.username,
          name: key.username,
          rules: [{ required: true, message: 'Please input your username!' }]
        }
      }
    },
    {
      key: key.password,
      attrs:() => {
        return {
          label: key.password,
          name: key.password,
          rules: [{ required: true, message: 'Please input your password!' }]
        }
      }
    },
    {
      key: key.show,
      attrs:() => {
        return {
          label: key.show,
          name: key.show
        }
      }
    },
    {
      key: key.switch,
      attrs:() => {
        return {
          label: key.switch,
          name: key.switch
        }
      }
    },
    {
      key: key.add,
      attrs:() => {
        return {
          label: key.add,
          name: key.add
        }
      }
    },
    {
      key: key.select,
      attrs:() => {
        return {
          label: key.select,
          name: key.select,
          rules: [{ required: true}]
        }
      }
    },
    {
      key: key.confirm
    },
  ]
  const forms =  [
    {
      type: Form,
      key: 'form',
      attrs: () => { 
        return {
          model: formValue.value,
          autocomplete: "off",
          ref: formRef
        }
      },
      children: ()=>setFormItem(formItems.value)//设置响应性
    }
  ]
  return  { 
    formValue,
    forms,
    formRef
  }
}
const setFormItem = (formItems:formItemType[]) => formItems.map((item:formItemType) => Object.assign({}, item, {
    type: Form.Item,
    children:[formItem(item.key)]
  }))

function formItem(key: key | string):componentInstance { 
  return {
    type: ComponentMap[key] || Input,
    key: key,
    attrs: setAttrs(key),
    slots: setSlots(key),
    children: setChildren(key)
  }
}
/**
 * 根据表单key返回组件的属性
 * @param key 
 * @returns 
 */
function setAttrs(key: key| string) { 
  // const formValue = modelValue()
  switch (key) { 
    case 'username':
    case 'password':
    case 'show':
      // const passwordValue = ref('')
      return () => { 
        
        return {
          value: formValue.value[key],
          onChange: (e: any) => {
            formValue.value[key] = e.target.value
            
          }
        }
      }
    case 'switch':
      return () => { 
        return {
          checked: formValue.value.switch,
          onChange: (value:boolean) => { 
            formValue.value.switch = value
            if (formValue.value.switch) {
              showStatus.value = 'display:none';//表单动态变化
              formValue.value.password = ''//switch变为true时清空密码
            } else { 
              showStatus.value = ''
            }
          }
        }
      }
    case 'select':
      return () => { 
        return {
          value: formValue.value.select,
          onSelect: (value:string|number) => { 
            formValue.value.select = value
            if (value === 2) { 
              formValue.value.username = '123'
            }
          }
        }
      }
    case 'add':
      return () => { //动态增加表单
        return {
          type: 'primary',
          onClick: () => { 
            let index = addIndex
            formItems.value.splice(6, 0, {
              key: 'test_'+index,
              attrs:() => {
                return {
                  label: 'test_'+index,
                  name: 'test_'+index,
                  rules: [{ required: true }],
                }
              }
            })
            addIndex++
          }
        }
      }
    case 'confirm':
      return () => { 
        return {
          type: 'primary',
          onClick: () => { 
            console.log('click')
          },
          htmlType: 'submit'
        }
      }
    default:
      if (key.indexOf('test') === -1) { 
        return () => { }
      }
      return () => { 
        return {
          value: formValue.value[key],
          onChange: (e: any) => {
            formValue.value[key] = e.target.value
            
          }
        }
      }
  }
}
/**
 * 根据表单key生成不同插槽
 * @param key 
 * @returns 
 */
function setSlots(key:key | string):slot|undefined {
  switch (key) { 
    case 'confirm':
      return {
        default: ()=>key
      }
    case 'add':
      return {
        default: () => key,
        icon: ()=> h(PlusOutlined)
    }
    default:
      return;
  }
}
/**
 * 根据表单key生成子元素
 * @param key 
 */
function setChildren(key:key | string):componentInstance[] | undefined { 
  switch (key) { 
    case 'select':
      return [
        {
          type: Select.Option,
          attrs: () => { 
            return {
              label: '1-1',
              value: 1
            }
          },
          slots: {
            default:() => '1-1'
          }
        },
        {
          type: Select.Option,
          attrs: () => { 
            return {
              label: '1-2',
              value: 2
            }
          },
          slots: {
            default:() => '1-2'
          }
        }
      ]
    default:
      return;
  }
}