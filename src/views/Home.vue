<template>
  <div class="home">
    <router-link to="/basic">基础用法</router-link>|
    <router-link to="/valueChange">表单值影响</router-link>|
    <router-link to="/dyAdd">动态增加</router-link>|
    <router-link to="/dyReduce">动态减少</router-link>|
    <router-link to="/customiz">自定义</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HocComponent from '@/components/Hoc'
import useForm from './form'
export default defineComponent({
  components: {
    HocComponent
  },
  setup() {
    const {forms, formValue, formRef} =useForm()
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
    width:100%;
    margin-top: 200px;
    display:flex;
    // align-items: center;
    justify-content: center;
    font-size: 2rem;
    
    
  }
</style>

