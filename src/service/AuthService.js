import Api from "./Api"

export default {
	login(credenciales) {
		return Api().post("/login", credenciales);
	},

	register: function (datos) {
		return Api().post("/register", datos);
	},
	
	logout: () => {
		return Api().post("/logout");
	}
}