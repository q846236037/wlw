<template>
	<span class="tree-expand">
		<span class="tree-label" v-show="DATA.isEdit">
			<el-input class="edit" size="mini" autofocus
			v-model="DATA.name"
			:ref="'treeInput'+DATA.id"
			@click.stop.native="nodeEditFocus"
			@blur.stop="nodeEditPass(STORE,DATA,NODE)"
			@keyup.enter.stop.native="nodeEditPass(STORE,DATA,NODE)"></el-input>
		</span>
		<!-- <span v-show="!DATA.isEdit" 
		:class="[DATA.id > maxexpandId ? 'tree-new tree-label' : 'tree-label']">
			<span>{{DATA.name}}</span>
		</span> -->
		<span v-show="!DATA.isEdit" class="tree-label">
			<span>{{DATA.name}}</span>
		</span>
		<span class="tree-btn" v-show="!DATA.isEdit">
			<i class="el-icon-plus" @click.stop="nodeAdd(STORE,DATA,NODE)"></i>
			<i class="el-icon-edit" @click.stop="nodeEdit(STORE,DATA,NODE)"></i>
			<i class="el-icon-delete" @click.stop="nodeDel(STORE,DATA,NODE)"></i>
		</span>
		<span class="tree-btn1" v-show="!DATA.isEdit">
			<i class="el-icon-plus" @click.stop="nodeAdd(STORE,DATA,NODE)"></i>
			<i class="el-icon-circle-plus-outline" @click.stop="nodeAddTop(STORE,DATA,NODE)"></i>
		</span>
	</span>
</template>

<script>
	export default{
		name: 'treeExpand',
		props: ['NODE', 'DATA', 'STORE'],
		methods: {
			nodeAdd(s,d,n){//新增
				this.$emit('nodeAdd',s,d,n)
			},
			nodeAddTop(s,d,n){//新增顶级节点
				this.$emit('nodeAddTop')
			},
			nodeEdit(s,d,n){//编辑
				d.isEdit = true;
				this.$nextTick(() => {
					this.$refs['treeInput'+d.id].$refs.input.focus()
				})
				this.$emit('nodeEdit',s,d,n)
			},
			nodeDel(s,d,n){//删除
				this.$emit('nodeDel',s,d,n)
			},
			nodeEditPass(s,d,n){//编辑完成
				d.isEdit = false;
				this.$emit('nodeEditPass',s,d,n)
			},
			nodeEditFocus(){
				//阻止点击节点的事件冒泡
			},
		}
	}
</script>

<style>
	.tree-expand{
		overflow:hidden;
	}
	.tree-expand .tree-label.tree-new{
		/* font-weight:600; */
	}
	.tree-expand .tree-label{
		font-size:16px;
	}
	.tree-expand .tree-label .edit{
		width:80%;
	}
	.tree-expand .tree-btn,.tree-expand .tree-btn1{
		display:none;
		float:right;
		margin-right:20px;
	}
	.tree-expand .tree-btn i,.tree-expand .tree-btn i{
		color:#8492a6;
		font-size:16px;
		margin-right:3px;
	}
</style>