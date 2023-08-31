<template>
	<div class="card">
		<h1>Lista de Pedidos</h1>
		<!-- {{ pedidos }} -->
		<DataTable :value="pedidos">
			<Column field="id" header="Id"></Column>
			<Column field="date" header="Fecha"></Column>
			<Column field="observation" header="Observacion"></Column>
			<!-- <Column field="cliente.fullname" header="Cliente"></Column> -->
			<Column field="client_id" header="Cliente"></Column>
			<Column field="user.email" header="Usuario"></Column>
			<Column headerStyle="min-width:3rem;" header="Detalle">
				<template #body="slotProps">
					<Button class="p-button-rounded p-button-info mr-2" icon="pi pi-eye" @click="verProductos(slotProps.data)" />
				</template>
			</Column>
		</DataTable>

		<Dialog v-model:visible="visibleProductos" modal header="Detalle de Pedido" :style="{ width: '30vw' }" class="p-fluid">
			<h6>Fecha: {{ pedido.date }}</h6>

			<DataTable :value="pedido.productos">
				<Column field="id" header="Id"></Column>
				<Column field="name" header="Nombre"></Column>
				<Column field="price" header="Precio"></Column>
				<Column field="pivot.quantity" header="Cant"></Column>
				<Column headerStyle="min-width:3rem;" header="Subtotal">
					<template #body="slotProps">
						{{ parseFloat(slotProps.data.pivot.quantity * slotProps.data.price).toFixed(2) }}
					</template>
				</Column>
			</DataTable>
		</Dialog>
	</div>
</template>

<!-- CompositionApi -->
<script setup>
	import { onMounted, ref } from 'vue';
	import pedidoService from "../../../service/orderService.js";

	const pedidos = ref([]);
	const visibleProductos = ref(false);
	const pedido = ref([]);

	onMounted(() => {
		listarPedidos();
	});

	const listarPedidos = async () => {
		const { data } = await pedidoService.list();
		pedidos.value = data.data;
	};

	const verProductos = (datos) => {
		pedido.value = datos;ñ

		visibleProductos.value = true;
	};

</script>