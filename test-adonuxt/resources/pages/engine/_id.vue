<template>
    <div>
        {{message}} {{$route.params.id}}
    </div>
</template>

<script>
export default {
    props: ['id','params'],   
    validate : ({params}) => {
        console.log('validate params', params)
        return /^\d+$/.test(params.id) || !params.id 
    },
    data : () => {
        return {
            message : 'hello engine'
        }
    }
}
</script>

<style scoped>

</style>