<template>
    <div class="interact">
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
import useFormIntance, {formValue } from './formItem'
import  useForm from '@/components/df/form'
import HocComponent from '@/components/Hoc'
export default defineComponent({
    components: {
        HocComponent
    },
    name: 'interact',
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
    .interact {
       width: 100%;
       height: 50%;
       display: flex;
       align-items: center;
       justify-content: center;
    }
</style>