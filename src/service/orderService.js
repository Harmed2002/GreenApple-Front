// Los services conectan el frontend con los endpoints del backend Laravel
import Api from "./Api";

export default {
	// list(page = 1, limit = 10, q = '') {
	// 	return Api().get(`/order?page=${page}&limit=${limit}&q=${q}`);
	// },

	list() {
		return Api().get(`/order`);
	},

	save(datos) {
		return Api().post("/order", datos);
	},

	show(id) {
		return Api().get(`/order/${id}`);
	},

	update(datos, id) {
		return Api().put(`/order/${id}`, datos);
	},

	delete(id) {
		return Api().delete(`/order/${id}`);
	}
}