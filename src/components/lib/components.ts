import { Button } from 'ant-design-vue'

interface componentMapType { 
  [key:string]: unknown | string
}
const componentMap:componentMapType = {
  antdButton: Button
}
export default (type: string) => {
  return () => componentMap[type]
}