import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue';
import Login from '../views/auth/Login.vue';
import AppLayout from '../layout/AppLayout.vue';
import Admin from '../views/admin/AdminView.vue';
import Perfil from '../views/admin/PerfilView.vue';
import UserView from '../views/admin/user/UserView.vue';
import Pedido from '../views/admin/pedido/ListaPedido.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'register',
			component: UserView
		},

		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {redirectIfAuth: true}
		},

		{
			path: '/admin',
			component: AppLayout,
			meta: {requireAuth: true},
			children: [
				{
					path: '',
					name: 'newOrder',
					component: Admin,
					meta: {requireAuth: true}
				},
				{
					path: 'order',
					name: 'order',
					component: Pedido,
					meta: {requireAuth: true}
				},
				{
					path: 'perfil',
					name: 'perfil',
					component: Perfil,
					meta: {requireAuth: true}
				},
				{
					path: 'usuario',
					name: 'usuario',
					component: () => import('../views/admin/user/UserView.vue'), // Este tipo de llamada permite carga lazy perezosa
					meta: {requireAuth: true}
				}
			]
		},
	]
})

// Guard (Bloquea el flujo y, si pasa la validación, deja seguir con next)
router.beforeEach((to, from, next) => {
	let token = localStorage.getItem("access_token");

	//console.log(to);

	// Verifico si requiere autorización
	if (to.meta.requireAuth) {
		if (!token)
			return next({name: 'login'});
		
		return next();
	}

	// Si redirectIfAuth es true y existe el token, es decir si está logueado no debe entrar a /login sino a /admin
	if (to.meta.redirectIfAuth && token) {
		return next({name: 'admin'})
	}

	return next();
})

export default router
