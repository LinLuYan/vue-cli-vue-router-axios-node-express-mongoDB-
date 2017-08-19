<template>
    <div>这是Home
	    <template>
		  <el-radio class="radio" v-model="radio" label="1">备选项</el-radio>
		  <el-radio class="radio" v-model="radio" label="2">备选项</el-radio>
		</template>
    </div>		
</template>

<script>

export default {
    name: 'home',
    data () {
        return {
            radio: '1'
        }
    },
    created:function(){  
    }
}
</script>

<style scoped>

</style>