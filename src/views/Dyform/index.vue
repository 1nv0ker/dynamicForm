<template>
    <div class="dyform">
        <HocComponent
            v-for="item in forms" 
            v-bind="item"
            :children="item.children()"
            @finish="onFinish"
            :key="item.key">
                
        </HocComponent>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import useFormIntance, { formValue } from './formItem'
import  useForm from '@/components/df/form'
import HocComponent from '@/components/Hoc'
export default defineComponent({
    components: {
        HocComponent
    },
    name: 'dyform',
    setup() {
        const formIntance = useFormIntance()
        const { forms } = useForm(formIntance)
        const onFinish = () => {
            console.log(formIntance.formValue)
        }
        return {
            forms,
            onFinish
        }
    },
})
</script>

<style lang="less" scoped>
    .dyform {
       width: 100%;
        margin-top: 200px;
       display: flex;
       justify-content: center;
    }
</style>