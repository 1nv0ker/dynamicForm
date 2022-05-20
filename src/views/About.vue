<template>
  <div class="about">
    <div>
      <HocComponent
      v-for="item in forms" 
      v-bind="item"
      :children="item.children()"
      @finish="onFinish"
      :key="item.key">
        
      </HocComponent>
    </div>
    <div>
      <HocComponent
      v-for="item in eForms" 
      v-bind="item"
      :children="item.children()"
      @finish="onFinish"
      :key="item.key">
        
      </HocComponent>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import useForm, { formValue } from '@/components/lib/form'
import HocComponent from '@/components/Hoc';
import type { FormInstance, FormRules } from 'element-plus'
export default defineComponent({
  components: {
    HocComponent
  },
  setup() {
    const formValue = ref<formValue>({
    })
    const eFormValue = ref<formValue>({
    })
    const form = {
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
      formComponent: 'a-form',
      formItemComponent: 'a-form-item'
    }
    const eForm = {
      formItems: [
        {
          attrs: () => {
            return {
              label: 'username'
            }
          },
          formItem: {
            key: 'username',
            type: 'el-input',
            attrs: () => {
              return {
                modelValue: eFormValue.value.username,
                onInput: (value:any) => eFormValue.value.username = value
              }
            }
          }
        },
        {
          formItem: {
            key: 'confirm',
            type: 'el-button',
            attrs: () => {
              return {
                type: 'primary',
                htmlType: 'submit',
                onClick: onSubmit
              }
            },
            slots: {
              default:()=>'确认'
            }
          }
        }
      ],
      formValue: eFormValue,
      formComponent: 'el-form',
      formItemComponent: 'el-form-item'
    }
    const { forms}  = useForm(form)
    const eform  = useForm(eForm)
    const onFinish = () => {
      
    }
    const onSubmit = () => {
      let root:any = eform.formRef.value
      root.validate((prop:any) => {
        console.log(prop)
      })
    }
    return {
      forms,
      eForms: eform.forms,
      onFinish
    }
  },
})
</script>
<style lang="less" scoped>
  .about {
    width:100%;height:100%;
    display:flex;
    // align-items: center;
    justify-content: center;
    &>div {
      margin-top: 200px;
    }
  }
</style>

