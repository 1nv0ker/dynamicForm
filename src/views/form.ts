import { Button, Input, Select, Switch, Form } from 'ant-design-vue'
import { ref, VNode } from 'vue';
export default () => { 
  const checked = ref(false)
  const inputValue = ref('')
  const forms = [
    {
      type: Form,
      key: 'form',
      children: [
        {
          type: Form.Item,
          key: 'formItem',
          attrs:() => {
            return {
              label: 'username',
              name: 'username'
            }
          },
          children: [formItem(key.input)]
        },
        {
          type: Form.Item,
          key: 'formItem',
          attrs:() => {
            return {
              label: 'test',
              name: 'test'
            }
          },
          children:[formItem(key.switch)]
        }
      ]
    }
  ]
  return forms
}
const ComponentMap = {
  'input': Input,
  'switch': Switch
}
enum key { 
  input = 'input',
  switch = 'switch'
}
function formItem(key: key) { 
  return {
    type: ComponentMap[key],
    key: key,
    attrs: attrs(key),
  }
}
function attrs(key:key) { 
  switch (key) { 
    case 'input':
      const inputValue = ref('')
      return () => { 
        return {
          style: 'width:100px',
          value: inputValue.value,
          onChange: (e:any) => {
            inputValue.value = e.target.value
          }
        }
      }
    case 'switch':
      const checked = ref(false)
      return () => { 
        return {
          checked: checked.value,
          onChange: (value:boolean) => {
            checked.value = value
          }
        }
      }
    default:
      return {}
  }
}