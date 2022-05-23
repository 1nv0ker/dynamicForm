
import { ref } from 'vue'
// import { formValue } from '@/components/df/form'
export interface formValue { 
  username?: string,
  password?:string
}
interface emits { 
  [key:string]: Function
}
export default (emits?:emits) => { 
  const formValue = ref<formValue>({
  })
  const form = {//antd
    formItems: [
      {
        attrs: () => {
          return {
            label: 'username',
            required: true,
            name: 'username'
          }
        },
        formItem: {
          key: 'username',
          type: 'a-input',
          attrs: () => {
            return {
              value: formValue.value.username,
              onChange: (e: any) => { 
                formValue.value.password = ''
                formValue.value.username = e.target.value
              }
            }
          }
        }
      },
      {
        attrs: () => {
          return {
            label: 'password',
            required: true,
            name:"password"
          }
        },
        formItem: {
          key: 'password',
          type: 'a-input-password',
          attrs: () => {
            return {
              value: formValue.value.password,
              onChange: (e:any) => formValue.value.password = e.target.value
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
    formValue: formValue.value,
  }
  return form
}