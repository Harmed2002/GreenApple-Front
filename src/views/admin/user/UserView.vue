<template>
	<h1>Registro</h1>

	<!-- <label for="">Ingresar Nombre:</label>
	<input type="text" v-model="usuario.name">
	<br>
	<label for="">Ingresar Correo:</label>
	<input type="email" v-model="usuario.email">
	<br>
	<label for="">Ingresar Clave:</label>
	<input type="password" v-model="usuario.password">
	<br>
	<button type="button" @click="guardarUsuario()">Guardar</button> -->

	<div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Green Apple</div>
                        <span class="text-600 font-medium">Ingrese los datos de registro</span>
                    </div>

                    <div>
						<form @submit="register">
							<label for="name" class="block text-900 text-xl font-medium mb-2">Nombre</label>
							<InputText id="name" type="text" placeholder="Nombre de usuario" autocomplete="off" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="usuario.name" />

							<label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
							<InputText id="email1" type="text" placeholder="Correo Electrónico" autocomplete="off" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="usuario.email" />

							<label for="password1" class="block text-900 font-medium text-xl mb-2">Contraseña</label>
							<Password id="password1" v-model="usuario.password" placeholder="Contraseña" autocomplete="off" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

							<Button type="submit" label="Registrar" class="w-full p-3 text-xl"></Button>
						</form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />

</template>

<script setup>
	// import { useLayout } from '@/layout/composables/layout';
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';
	import AppConfig from '@/layout/AppConfig.vue'; // Es la barra lateral de los colores y entornos

	import authService from '../../../service/AuthService';
	
	const router = useRouter();
	const usuario = ref({name: '', email: '', password: ''});
	const errores = ref({})

	const register = async (e) => {
		e.preventDefault();
		errores.value = {};

		// console.log(usuario.value)

		try {
			await authService.register(usuario.value);
			
			usuario.value = {name: '', email: '', password: ''};
			router.push({name: 'login'});
			
		} catch (error) {
			console.log("ERROR EN COMPONENTE REGISTER", error.response.data);

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
