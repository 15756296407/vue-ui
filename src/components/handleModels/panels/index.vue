<template>
  <div id="panels">
  	<div
  	  v-for="(component,ind) in showPanels"
  	  :name="component.name"
  	  :key="component.name"
  	>
  	  <component
  	    :is="component.type"
  	    :data="component"
  	    :value="component.value"
  	    :ind="0"
  	    :ok="(value)=>handle(ind,value)"
  	    style="margin-bottom:15px;"
  	  ></component>
  	</div>
  </div>
</template>
<script>
import Widgets from '@/widgets/index.js';
import { mapState } from 'vuex';
export default {
	components: {
	   ...Widgets
	},
	methods:{
		handle(ind,value){
			this.$store.commit('handleModels/updateNode', {
			    type: 'updateParamters',
			    ind,
			    value
			});
		}
	},
	computed: {//计算属性  根据store的值
	    ...mapState('handleModels', {
	      showPanels: state => {
	      	let showParamters = state.showParamters;
	      	let _node = state.nodes.find(e => e.timer === showParamters);
	      	var params = [];
            if(_node && _node.parameters){
                params = _node.params;
	        }
	        return params;
	      }
	    })
	}
}
</script>

<style lang="less" scoped>
#panels {
  width: 245px;
  border-left: 1px solid gray;
}
</style>
