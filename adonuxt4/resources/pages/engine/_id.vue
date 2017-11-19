<template>
    <div>
        {{message}} {{$route.params.id}} {{ title}}
    </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
    props: ['id','params'],
    validate : ({params}) => {
        console.log('validate params', params)
        return /^\d+$/.test(params.id) || !params.id
    },
    // The fetch method is used to fill the store before rendering the page,
    // it's like the asyncData method except it doesn't set the component data.
    // async fetch ({ params }) {
    //   let { data } = await axios.get()
    //   console.log('got data', data)
    //   return { title: data.title }
    // },
    async asyncData ({ params }) {
      let { data } = await axios.get(`engine/${params.id}`)
      return { title: data }
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
