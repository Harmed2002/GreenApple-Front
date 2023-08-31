// Los services conectan el frontend con los endpoints del backend Laravel
import Api from "./Api";

export default {
    // listar(page = 1, limit = 10, q = '') {
    //     return Api().get(`/product?page=${page}&limit=${limit}&q=${q}`);
    // },

    list() {
        return Api().get(`/product`);
    },

    save(datos) {
        return Api().post("/product", datos);
    },

    show(id) {
        return Api().get(`/product/${id}`);
    },

    update(datos, id) {
        return Api().put(`/product/${id}`, datos);
    },

    delete(id) {
        return Api().delete(`/product/${id}`);
    },

    actualizarImagen(id, datos) {
        return Api().post(`/product/${id}/actualizar-imagen`, datos);
    }

}