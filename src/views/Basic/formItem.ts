
import { ref } from 'vue'
import { formValue  } from '@/components/df/form'
export default () => { 
  const formValue = ref<formValue>({
  })
  const form = {//antd
    formItems: [
      {
        attrs: () => {
          return {
            label: 'username'
          }
        },
        formItem: {
          key: 'username',
          type: 'a-input',
          attrs: () => {
            return {
              value: formValue.value.username,
              onChange: (e:any) => formValue.value.username = e.target.value
            }
          }
        }
      },
      {
        formItem: {
          key: 'confirm',
          type: 'a-button',
          attrs: () => {
            return {
              type: 'primary',
              htmlType: 'submit'
            }
          },
          slots: {
            default:()=>'确认'
          }
        }
      }
    ],
    formValue,
  }
  return form
}