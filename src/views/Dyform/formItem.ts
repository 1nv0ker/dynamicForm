
import { ref, h } from 'vue';
import { formIntance } from '@/components/df/form'
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons-vue'
export interface formValue { 
  [key:string]: string
}
interface emits { 
  [key:string]: Function
}
let itemIndex = 0
export default (emits?:emits) => { 
  const formValue = ref<formValue>({
  })
  const form= ref<formIntance>({//antd
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
                formValue.value.username = e.target.value
              }
            }
          }
        }
      },
      {
        attrs: () => {
          return {
            label: 'add',
          }
        },
        formItem: {
          key: 'add',
          type: 'a-button',
          attrs: () => {
            return {
              type: 'primary',
              onClick: () => { 
                let tempIndex = itemIndex
                form.value.formItems?.splice(3+tempIndex, 0, {
                  attrs: () => {
                    return {
                      label: `test_${tempIndex}`,
                      name: `test_${tempIndex}`
                    }
                  },
                  formItem: {
                    key: `test_${tempIndex}`,
                    type: 'a-input',
                    attrs: () => { 
                      return {
                        value: formValue.value[`test_${tempIndex}`],
                        onChange: (e:any) => formValue.value[`test_${tempIndex}`] = e.target.value
                      }
                    }
                  }
                })
                itemIndex++
              }
            }
          },
          slots: {
            default: () => 'add',
            icon: () => h(PlusCircleOutlined)
          }
        }
      },
      {
        attrs: () => {
          return {
            label: 'reduce',
          }
        },
        formItem: {
          key: 'reduce',
          type: 'a-button',
          attrs: () => {
            return {
              type: 'primary',
              onClick: () => { 
                let tempIndex = itemIndex-1
                let findIndex = form.value.formItems?.findIndex(item => item.formItem?.key === `test_${tempIndex}`)
                if (findIndex && findIndex > -1) { 
                  delete formValue.value[`test_${tempIndex}`]
                  form.value.formItems?.splice(findIndex, 1)
                  itemIndex--
                }
                
              }
            }
          },
          slots: {
            default: () => 'reduce',
            icon: () =>h(MinusCircleOutlined)
          }
        }
      },
      // {
      //   attrs: () => {
      //     return {
      //       label: 'password',
      //       required: true,
      //       name:"password"
      //     }
      //   },
      //   formItem: {
      //     key: 'password',
      //     type: 'a-input-password',
      //     attrs: () => {
      //       return {
      //         value: formValue.value.password,
      //         onChange: (e:any) => formValue.value.password = e.target.value
      //       }
      //     }
      //   }
      // },
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
    attrs: {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    }
  })
  return form.value
}