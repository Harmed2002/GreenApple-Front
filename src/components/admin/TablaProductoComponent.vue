<template>
	<h1>Menú</h1>

	<DataTable :value="props.data">
		<Column field="id" header="Id"></Column>
		<Column field="name" header="Nombre"></Column>
		<Column field="description" header="Descripción"></Column>
		<Column field="price" header="Precio"></Column>
		<Column field="image" header="Foto"></Column>
		<Column headerStyle="min-width:2rem;">
			<template #body="slotProps">
				<Button icon="pi pi-cart-plus" class="p-button-rounded p-button-info mr-2" @click="addItem(slotProps.data)" />
			</template>
		</Column>
	</DataTable>

	<!-- <p>{{ props.data }}</p> -->
</template>

<script setup>
	// import DataTable from 'primevue/datatable';
	// import Column from 'primevue/column';

	const props = defineProps(['miTitulo', 'data']); // Obtiene los props enviados desde el Padre
	const emit = defineEmits(['mngCart']); // Define la función que emite o pasa props desde el componente hijo al padre

	function addItem(prod) {
		emit('mngCart', prod);
	}
</script>