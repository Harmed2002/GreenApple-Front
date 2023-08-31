<template>
	<div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Green Apple</div>
                        <span class="text-600 font-medium">Bienvenido</span>
                    </div>

                    <div>
						<form @submit="login">
							<label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
							<InputText id="email1" type="text" placeholder="Correo Electrónico" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="usuario.email" />

							<label for="password1" class="block text-900 font-medium text-xl mb-2">Contraseña</label>
							<Password id="password1" v-model="usuario.password" placeholder="Contraseña" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

							<div class="flex align-items-center justify-content-between mb-5 gap-5">
								<div class="flex align-items-center">
									<Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
									<label for="rememberme1">Recordarme</label>
								</div>
								<a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">¿Olvidó su password?</a>
							</div>
							<Button type="submit" label="Ingresar" class="w-full p-3 text-xl"></Button>
						</form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<script setup>
	import { useLayout } from '@/layout/composables/layout';
	import { ref } from 'vue';
	import authService from "./../../service/AuthService";
	import { useRouter } from 'vue-router';
	import AppConfig from '@/layout/AppConfig.vue'; // Es la barra lateral de los colores y entornos
	// Para Pinia
	import { useAuthStore } from "@/stores/auth";
	const auth = useAuthStore();

	const { layoutConfig } = useLayout();
	const checked = ref(false);

	const router = useRouter();
	const usuario = ref({ email: "", password: "" })
	const errores = ref({})

	const login = async (e) => {
		e.preventDefault();
		errores.value = {};

		try {
			const { data } = await authService.login(usuario.value)

			errores.value = {} // Limpiamos el objeto error
			auth.setUsuario(data.user.name); // Tomo el valor de email para Pinia

			// Guardamos el token en el localStorage
			localStorage.setItem("access_token", data.access_token);
			localStorage.setItem("authName", data.user.name);
			localStorage.setItem("authEmail", data.user.email);

			router.push({name: 'admin'}) // El nombre admin está en el archivo router/index.js en la variable name

		} catch (error) {
			console.log("ERROR EN COMPONENTE LOGIN", error.response.data);

			if (error.response.data.errors) {
				errores.value = error.response.data.errors;
			} else {
				alert(error.response.data.message);
			}
		}
	}

</script>

<style scoped>
	.pi-eye {
		transform: scale(1.6);
		margin-right: 1rem;
	}

	.pi-eye-slash {
		transform: scale(1.6);
		margin-right: 1rem;
	}
</style>

