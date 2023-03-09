import Vue from "vue";
import Vuex, { Store } from "vuex";
import { v4 as uuid } from "uuid";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		listItems: [],
		discountedItemsList: [],
	},
	getters: {
		setDiscountedItemsList(state) {},
		listItems(state) {
			return state.listItems;
		},
	},
	mutations: {
		setListItems(state, payload) {
			state.listItems = payload;
		},
		deleteItem(state, payload) {
			state.listItems = state.listItems.filter(
				(element) => element.id !== payload,
			);
		},
		createItem(state, payload) {
			payload.id = uuid();
			state.listItems = [payload, ...state.listItems];
			console.log(state);
		},
		editItem(state, payload) {
			// REALLY not proud of that piece of code, but didn't find another way of doing it properly
			state.listItems = state.listItems.filter(
				(el) => el.id !== payload.id,
			);
			state.listItems = [payload, ...state.listItems];
		},
	},
	actions: {
		async getItems({ commit }) {
			const promise = await fetch("https://dummyjson.com/products");
			const result = await promise.json();
			commit("setListItems", result.products);
		},
	},
	modules: {},
});
