<template>
  <div class="home" style="width:500px">
      <HocComponent
      v-for="item in testForm" 
      v-bind="item"
      :key="item.key">
        
      </HocComponent>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import HocComponent from '@/components/Hoc'
import { DownloadOutlined } from '@ant-design/icons-vue';
import useForm from './form'
export default defineComponent({
  components: {
    HocComponent,
    DownloadOutlined: DownloadOutlined
  },
  setup() {
    const testForm = useForm()
    return {
      testForm
    }
  },
})
</script>

