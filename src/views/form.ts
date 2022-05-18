import { Input, Switch, Form, Button, Select } from 'ant-design-vue';
import { ref } from 'vue';
const ComponentMap = {//组件名称映射
  'username': Input,
  'password': Input.Password,
  'switch': Switch,
  'select': Select,
  'confirm': Button
}
enum key { 
  username = 'username',
  password = 'password',
  switch = 'switch',
  select = 'select',
  confirm= 'confirm'
}
interface formValue { 
  username?: string,
  password?: string,
  switch?: boolean,
  select?:string | number
}
const formValue = ref<formValue>({
  switch: false,
  select: 1
})//form表单数据
const formRef = ref(null)//form实例
export default () => { //基础form组件
  const forms = [
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
      children: [//form item结构
        {
          type: Form.Item,
          key: 'username',
          attrs: () => {
            return {
              label: 'username',
              name: 'username',
              rules: [{ required: true, message: 'Please input your username!' }]
            }
          },
          children: [formItem(key.username)]
        },
        {
          type: Form.Item,
          key: 'password',
          attrs:() => {
            return {
              label: 'password',
              name: 'password',
              rules: [{ required: true, message: 'Please input your password!' }]
            }
          },
          children:[formItem(key.password)]
        },
        {
          type: Form.Item,
          key: 'switch',
          attrs:() => {
            return {
              label: 'switch',
              name: 'switch',
              rules: [{ required: true}]
            }
          },
          children:[formItem(key.switch)]
        },
        {
          type: Form.Item,
          key: 'select',
          attrs:() => {
            return {
              label: 'select',
              name: 'select',
              rules: [{ required: true}]
            }
          },
          children:[formItem(key.select)]
        },
        {
          type: Form.Item,
          key: 'confirm',
          children:[formItem(key.confirm)]
        }
      ]
    }
  ]
  return  { 
    formValue,
    forms,
    formRef
  }
}

function formItem(key: key) { 
  return {
    type: ComponentMap[key],
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
function setAttrs(key: key) { 
  // const formValue = modelValue()
  switch (key) { 
    case 'username':
    case 'password':
      // const passwordValue = ref('')
      return () => { 
        return {
          value: formValue.value[key],
          onChange: (e:any) => {
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
          }
        }
      }
    case 'select':
      return () => { 
        return {
          value: formValue.value.select,
          onSelect: (value:string|number) => { 
            formValue.value.select = value
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
      return () => { }
  }
}
/**
 * 根据表单key生成不同插槽
 * @param key 
 * @returns 
 */
function setSlots(key:key) {
  switch (key) { 
    case 'username':
    case 'password':
    case 'switch':
    case 'select':
      return;
    case 'confirm':
      return {
        default: ()=>key
      }
    default:
      return;
  }
}
/**
 * 根据表单key生成子元素
 * @param key 
 */
function setChildren(key:key) { 
  switch (key) { 
    case 'select':
      return [
        {
          type: Select.Option,
          label: '1-1',
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