import { Input, Switch, Form, Button } from 'ant-design-vue'
import { ref } from 'vue';
const ComponentMap = {//组件名称映射
  'username': Input,
  'password': Input.Password,
  'confirm': Button
}
enum key { 
  username = 'username',
  password = 'password',
  confirm= 'confirm'
}
interface formValue { 
  username?: string,
  password?: string
}
const formValue = ref<formValue>({})//form表单数据
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
          key: 'formItem',
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
          key: 'formItem',
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
    slots: setSlots(key)
  }
}
function setAttrs(key: key) { 
  // const formValue = modelValue()
  switch (key) { 
    case 'username':
      return () => { 
        return {
          style: 'width:100px',
          value: formValue.value.username,
          onChange: (e:any) => {
            formValue.value.username = e.target.value
          }
        }
      }
    case 'password':
      // const passwordValue = ref('')
      return () => { 
        return {
          value: formValue.value.password,
          onChange: (e:any) => {
            formValue.value.password = e.target.value
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
      return {}
  }
}
function setSlots(key:key) {
  switch (key) { 
    case 'username':
      return;
    case 'password':
      return;
    case 'confirm':
      return {
        default: ()=>key
      }
    default:
      return {}
  }
}