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
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import useForm, { formValue } from '@/components/lib/form'
import HocComponent from '@/components/Hoc';
import '@/components/lib/components'
export default defineComponent({
  components: {
    HocComponent
  },
  setup() {
    const formValue = ref<formValue>({
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
      formValue
    }
    const { forms}  = useForm(form)
    const onFinish = () => {
      console.log(formValue.value)
    }
    return {
      forms,
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

