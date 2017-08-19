<template>
    <div class="index">
        <table class="index-body">
            <tr>
                <td colspan="2" class="tdHead">
                    <index-header></index-header>
                </td>
            </tr>
            <tr>
                <td class="tdNav" :class="{'w180':isSlide,'w50':!isSlide}">
                    <div class="nav">
                        <div class="leftSlide">
                            <i v-if="isSlide" class="el-icon-d-arrow-left cursor" @click="leftSlideHandler"></i>
                            <i v-else class="el-icon-d-arrow-right cursor" @click="leftSlideHandler"></i>
                        </div>
                        <ul v-if="isSlide">
                            <template v-for="(item, index) in nav">
                                <router-link :to=item.router>
                                    <li :class="{'cur':onLi==index}" @click="navLiHandler(index, item)">
                                        <i class="el-icon-date"></i>
                                        {{item.navLi}}
                                    </li>
                                </router-link>
                            </template>
                        </ul>
                    </div>
                </td>
                <td class="tdContent">
                    <div class="content">
                        <router-view :params="params"></router-view>
                    </div>
                </td>
            </tr>
        </table>
    </div>    
</template>

<script>
    import indexHeader from './base/header'
export default {
    name: 'index',
    data () {
        return {
            onLi:0,
            isSlide:true,
            params:'录入试卷',
            nav:[
               {navLi: '录入试卷',router: '/home/index/exame'},
               {navLi: '所有试卷',router: '/home/index/exameList'},
               {navLi: '录入学生分数',router: '/home/index/score'},
            ],
        }
    },
    created:function(){  
    },
    methods:{
        navLiHandler:function(index, item){
            this.onLi = index;
            this.params = item.navLi;
        },
        leftSlideHandler:function(){
            if(this.isSlide){
                this.isSlide = false;
            }
            else{
                this.isSlide = true;
            }
        }
    },
    components:{
        indexHeader,
    }
}
</script>

<style lang='scss' scoped>
.index{
    position:absolute;
    width:100%;
    height:100%;
    .index-body{
        width:100%;
        height:100%;
        bottom:0px;
        position:absolute;
        
        .tdHead{
            height:60px;
        }
        .tdNav{
            border:1px solid #999;
            border-radius:5px;
            overflow:hidden;
            transition:width 0.5s;
            -webkit-transition:width 0.5s; /* Safari */
        }
        .w50{
            width:20px;
        }
        .w180{
            width:180px;
        }
        .tdContent{
            border:1px solid #999;
            border-radius:5px;
        }
    }
    .nav{
        padding:0;
        height:100%;

        .leftSlide{
            height:30px;
            line-height:30px;
            text-align:right;
            margin-left:5px;
            margin-right:5px;

            .cursor{
                cursor:pointer;
            }
        }
        li{
            line-height:30px;
            padding-left:8px;
            font-size:14px;
        }
        li:hover{
            background:#f0f0f0;
            color:#00adef;
            font-weight: 600;
        }
        li.cur{
            background:#f0f0f0;
            color:#00adef;
            font-weight: 600;
            border-right:4px solid #00adef;
        }
    }
    .content{
        padding:0;
        height:100%;
        overflow:auto;
    }
}
</style>