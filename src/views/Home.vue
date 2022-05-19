<template>
  <div class="home" style="width:100%;height:100%;display">
    <div>
      <HocComponent
      v-for="item in forms" 
      v-bind="item"
      :children="item.children()"
      @finish="onFinish"
      @submit="onSubmit"
      :key="item.key">
        
      </HocComponent>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import HocComponent from '@/components/Hoc'
import useForm from './form'
export default defineComponent({
  components: {
    HocComponent
  },
  setup() {
    const {forms, formValue, formRef} = useForm()
    const onFinish = () => {
      console.log(formValue.value)
    }
    const onSubmit = () => {
      
    }
    return {
      forms: forms,
      onFinish,
      formRef,
      onSubmit
    }
  },
})
</script>
<style lang="less" scoped>
  .home {
    width:100%;height:100%;
    display:flex;
    // align-items: center;
    justify-content: center;
    &>div {
      margin-top: 200px;
    }
  }
</style>

