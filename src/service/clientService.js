// Los services conectan el frontend con los endpoints (Routes) del backend Laravel
import Api from "./Api";

export default {
	list(page = 1, limit = 10, q = '') {
		return Api().get(`/client?page=${page}&limit=${limit}&q=${q}`);
	},

	save(datos) {
		return Api().post("/client", datos);
	},

	show(id) {
		return Api().get(`/client/${id}`);
	},

	update(datos, id) {
		return Api().put(`/client/${id}`, datos);
	},

	delete(id) {
		return Api().delete(`/client/${id}`);
	},

	buscar(q = '') {
        return Api().get(`/client?q=${q}`);
    },

}