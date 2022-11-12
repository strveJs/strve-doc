<template>
	<div class="started_main">
		<button @click="useClick" class="strve_btn" v-show="!view">
			View Results
		</button>
		<div id="started_view" v-show="view"></div>
	</div>
</template>
<script setup>
	import { nextTick, ref } from "vue";
	import { h, createApp, setData } from "strvejs";
	const view = ref(false);

	function useStrve() {
		const state = {
			count: 0,
		};
		function App() {
			console.log(1);
			return h`<h1 $key>${state.count}</h1><button onClick=${add} class="btn">Add</button>`;
		}

		function add() {
			setData(() => {
				state.count++;
			});
		}
		const app = createApp(App);
		app.mount("#started_view");
	}

	function useClick() {
		view.value = true;
		nextTick(() => {
			useStrve();
		});
	}
</script>
<style scoped>
	.started_main {
		display: flex;
		justify-content: flex-start;
		padding: 20px;
		border-radius: 10px;
		border: 1px solid #c6715b;
	}
	.strve_btn {
		color: #fff;
		border-radius: 6px;
		padding: 2px 10px;
		background-color: #c6715b;
	}
	:deep(.btn) {
		border-radius: 6px;
		padding: 2px 10px;
		background-color: #c6715b;
		color: #fff;
		margin-top: 10px;
	}
	:deep(.btn:active) {
		filter: brightness(90%);
	}
</style>