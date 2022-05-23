<template>
    <div class="customiz">
        <HocComponent
            v-for="item in forms" 
            v-bind="item"
            :children="item.children()"
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
    name: 'customiz',
    setup() {
        const formIntance = useFormIntance({
            onConfirm: (props:formValue) => {
                console.log(props)
            }
        })
        const { forms } = useForm(formIntance)
        return {
            forms
        }
    },
})
</script>

<style lang="less" scoped>
    .customiz {
       width: 100%;
       height: 50%;
       display: flex;
       align-items: center;
       justify-content: center;
    }
</style>