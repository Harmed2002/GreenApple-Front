import axios from "axios"

export const urlBase = "http://127.0.0.1:8000/api";

const App = () => {
	let token = localStorage.getItem("access_token");

	const api = axios.create({
		baseURL: urlBase,
		headers: {
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + token
		}
	});

	// error
	api.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			if (error.response.status === 401) {	// Unauthorized: no autenticado
				console.log("INTERCEPTOR:  401 *******")
				localStorage.removeItem("access_token"); // Se borra el token para obligar a autenticarse
				window.location.href = "/login";
			}

			if (error.response.status === 403) {	// Forbidden: no tiene permiso
				console.log("INTERCEPTOR:  403 *******")
			}

			return Promise.reject(error)
		}
	)
	
	return api;
}

export default App;