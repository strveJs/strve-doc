import DefaultTheme from 'vitepress/theme';
import startedCom from '../../components/started.vue';
import './index.css';
export default {
	...DefaultTheme,
	enhanceApp({ app }) {
		app.component('startedCom', startedCom);
	},
};
