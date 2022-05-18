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
  confirm = 'confirm',
  test = 'test'
}
interface formValue { 
  username?: string,
  password?: string,
  switch?: boolean,
  select?: string | number,
  show?: string
}
const formValue = ref<formValue>({
  switch: false,
  select: 1
})//form表单数据
const formRef = ref(null)//form实例
const showStatus = ref('')
const forms = ref<componentInstance[]>([])
export default () => { //基础form组件
  forms.value = [
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
          key: key.username,
          attrs: () => {
            return {
              label: key.username,
              name: key.username,
              rules: [{ required: true, message: 'Please input your username!' }]
            }
          },
          children: [formItem(key.username)]
        },
        {
          type: Form.Item,
          key: key.password,
          attrs:() => {
            return {
              label: key.password,
              name: key.password,
              rules: [{ required: true, message: 'Please input your password!' }]
            }
          },
          children:[formItem(key.password)]
        },
        {
          type: Form.Item,
          key: key.show,
          attrs: () => {
            return {
              label: key.show,
              name: key.show,
              rules: [{ required: true, message: 'Please input your show!' }],
              style: showStatus.value
            }
          },
          children: [formItem(key.show)]
        },
        {
          type: Form.Item,
          key: key.switch,
          attrs:() => {
            return {
              label: key.switch,
              name: key.switch,
              rules: [{ required: true}]
            }
          },
          children:[formItem(key.switch)]
        },
        {
          type: Form.Item,
          attrs:() => {
            return {
              label: key.add,
              name: key.add
            }
          },
          children:[formItem(key.add)]
        },
        {
          type: Form.Item,
          key: key.select,
          attrs:() => {
            return {
              label: key.select,
              name: key.select,
              rules: [{ required: true}]
            }
          },
          children:[formItem(key.select)]
        },
        {
          type: Form.Item,
          key: key.confirm,
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

function formItem(key: key | string):componentInstance { 
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
      return () => { //动态增加表单(实验阶段)
        return {
          type: 'primary',
          onClick: () => { 
            forms.value = forms.value.map(item => {
              item.children?.splice(6, 0,
                {
                  type: Form.Item,
                  key: 'test',
                  attrs: () => {
                    return {
                      label: 'test',
                      name: 'test',
                      rules: [{ required: true, message: 'Please input your show!' }],
                      style: showStatus.value
                    }
                  },
                  children: [formItem('test')]
                },
              )
              return Object.assign({}, item)
            })
            console.log('add', forms.value)
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