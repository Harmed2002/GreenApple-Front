<template>
	<div class="grid">
		<div class="col-7">
			<!-- {{ productos }} -->
			<!-- <div class="text-center p-3 border-round-sm bg-primary font-bold">Lista de Productos</div> -->
			<div class="card">
				<TablaProductoComponent :miTitulo="titulo" :data="productos" @mngCart="addCart"/>
			</div>
		</div>

		<div class="col-5">
			<div class="grid">
				<!-- Card Carrito -->
				<div class="col-12">
					<div class="card">
						<h3>Carrito</h3>
						<DataTable :value="carrito">
							<Column field="name" header="Nombre"></Column>
							<Column field="price" header="Precio"></Column>
							<Column field="quantity" header="Cant"></Column>
							<Column headerStyle="min-width:1rem">
								<template #body="slotProps">
									<Button icon="pi pi-minus" class="p-button-rounded p-button-success mr-2" @click="decreaseQty(slotProps.data)"/>
									<strong>{{ slotProps.data.quantity }}</strong>
									<Button icon="pi pi-plus" class="p-button-rounded p-button-success mr-2" @click="increaseQty(slotProps.data)"/>
								</template>
							</Column>
							<Column headerStyle="min-width:1rem">
								<template #body="slotProps">
									<Button icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2" @click="removeItemCart(slotProps.data)"/>
								</template>
							</Column>
						</DataTable>
					</div>
				</div>
				<!-- Card Cliente -->
				<div class="col-12">
					<div class="card">
						<Toast />
						<InputText v-model.trim="buscarClie" placeholder="Buscar..." @keypress.enter="searchClient" />
						<Button label="Crear Cliente" icon="pi pi-user-plus" @click="visibleCliente = true" />
						<div class="card" v-if="cliente_seleccionado.id">
							<h4>Cliente: {{ cliente_seleccionado.fullname }}</h4>
							<h4>CI/Nit: {{ cliente_seleccionado.ci_nit }}</h4>
							<h4>Teléfono: {{ cliente_seleccionado.phone }}</h4>
						</div>
					</div>

					<Dialog v-model:visible="visibleCliente" modal header="Nuevo Cliente" :style="{ width: '30vw' }" class="p-fluid">
						<div class="field">
							<label for="fullname">Nombre Completo</label>
							<InputText id="fullname" v-model.trim="cliente.fullname" required="true" autofocus />
						</div>
						<div class="field">
							<label for="ci_nit">CI/Nit</label>
							<InputText id="ci_nit" v-model.trim="cliente.ci_nit" />
						</div>
						<div class="field">
							<label for="phone">Teléfono</label>
							<InputText id="phone" v-model.trim="cliente.phone" />
						</div>

						<template #footer>
							<Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="visibleCliente=false" />
							<Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveClient" />
						</template>
					</Dialog>
				</div>
				<!-- Card Pedido -->
				<div class="col-12">
					<div class="card">
						<Button label="Registrar Pedido" icon="pi pi-save" @click="confirmSaveOrder" />
					</div>
				</div>
			</div>
		</div>

		<!--Modal confirme grabar pedido-->
		<Dialog v-model:visible="saveOrderDialog" :style="{width: '450px'}" header="Confirme" :modal="true">
			<div class="confirmation-content">
				<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
				<span v-if="carrito.length > 0">¿Está usted seguro de querer grabar este pedido?</span>
			</div>
			<template #footer>
				<Button label="No" icon="pi pi-times" text @click="saveOrderDialog = false"/>
				<Button label="Sí" icon="pi pi-check" text @click="saveOrder" />
			</template>
		</Dialog>
	</div>
</template>

<script setup>
	import productoService from "../../service/productService.js";
	import pedidoService from "../../service/orderService.js";
	import clienteService from "../../service/clientService";
	import TablaProductoComponent from '@/components/admin/TablaProductoComponent.vue';
	import { ref, onMounted } from 'vue';
	import Column from 'primevue/column';
	import { useToast } from 'primevue/usetoast';

	const toast = useToast();
	const titulo = ref("Lista de Productos");
	const productos = ref([]);
	const carrito = ref([]);
	const visibleCliente = ref(false);
	const cliente = ref({});
	const cliente_seleccionado = ref({});
	const buscarClie = ref("");
	const saveOrderDialog = ref(false);

	onMounted(() => {
		listProducts();
	})

	const listProducts = async () => {
		const {data} = await productoService.list();
		
		productos.value = data;

	}

	const addCart = (prod) => {
		const p = {
			product_id: prod.id,
			name: prod.name,
			description: prod.description,
			price: prod.price,
			quantity: 1
		}
		carrito.value.push(p);
	}

	const removeItemCart = (prod) => {
		carrito.value.splice(carrito.value.indexOf(prod), 1);
	}

	const increaseQty = (prod) => {
		prod.quantity++;
	}

	const decreaseQty = (prod) => {
		if (prod.quantity > 1) {
			prod.quantity--;
		}
	}

	const searchClient = async () => {
		const { data } = await clienteService.buscar(buscarClie.value);
		cliente_seleccionado.value = data;
	}

	const confirmSaveOrder = (prod) => {
		if (carrito.value.length > 0)
			saveOrderDialog.value = true;
	};

	const saveClient = async () => {
		console.log(cliente.value)
		const { data } = await clienteService.save(cliente.value);
		cliente_seleccionado.value = data.cliente;

		visibleCliente.value = false;
		cliente.value = {};

		toast.add({
			severity: 'success', 
			summary: 'Cliente Ingresado', 
			detail: 'El cliente fue creado exitosamente', 
			life: 3000 
		});
	}

	const saveOrder = async () => {
		const datos = {
			cliente_id: cliente_seleccionado.value.id,
			productos: carrito.value
		};

		const { data } = await pedidoService.save(datos);

		// Limpio las variables y arreglos
		carrito.value = [];
		cliente.value = {};
		cliente_seleccionado.value = {};
		buscarClie.value = "";
		saveOrderDialog.value = false;

		toast.add({
			severity: 'success', 
			summary: 'Pedido Ingresado', 
			detail: 'El pedido fue creado exitosamente', 
			life: 3000 
		});
	}
</script>