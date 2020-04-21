<template>
    <div class="container">
        <button type="button" class="btn btn-primary">{{msg}}</button>
    </div>
</template>

<script>
export default {
    name:'Ping',
    data(){
        return {
            msg:'hello!'
        }
    },
    methods:{
        getMessage(){
            this.axios.get('ping').then((res)=>{
                this.msg=res.data;
            }).catch(err=>{
                console.error(err)
            })
        }
    },
    created(){
        this.getMessage()
    }
}
</script>