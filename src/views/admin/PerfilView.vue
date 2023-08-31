<template>
	<div class="card">
        <h1>Mi Perfil</h1>
		<h3>Nombre: {{ usrName }}</h3>
		<h5>Email: {{ usrEmail }}</h5>
    </div>

</template>

<script setup>
	import { ref, onMounted } from 'vue';

	const usrName = ref(null);
	const usrEmail = ref(null);

	onMounted(() => {
		if (!usrName.value) {
			usrName.value = localStorage.getItem("authName");
			usrEmail.value = localStorage.getItem("authEmail");
		}
	})
</script>