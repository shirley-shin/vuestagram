<template>
    <div @click="fire" :class="onfilter + ` filter-item`" :style="`background-image:url(${myimage})`">
    <slot> </slot>
    </div> 
</template>

<script>
export default {
    name : 'filterbox',

    methods : {
        fire(){
           this.emitter.emit('BoxSelected',this.onfilter)
        }
    },
    props : {
        myimage : String,
        onfilter : String,
    }
}
</script>


<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color : white;
  background-size: cover;
  background-position : center;
}
</style>