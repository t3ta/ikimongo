<template>
	<div>
		<span class="observation-date">観察日：{{ date }}</span>
		<div class="map-container">
			<l-map
				:zoom="15"
				:center="[location.x, location.y]"
				:useGlobalLeaflet="false"
			>
				<l-tile-layer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					layerType="base"
					name="OpenStreetMap"
				></l-tile-layer>
				<l-marker :latLng="[location.x, location.y]" />
			</l-map>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { LMap, LMarker, LTileLayer } from "@vue-leaflet/vue-leaflet";
import { DateTime } from "luxon";

import "leaflet/dist/leaflet.css";

const props = defineProps<{
	location: {
		x: number;
		y: number;
	};
	date: string;
}>();

const location = ref(props.location);
const date = ref(DateTime.fromISO(props.date).toFormat("yyyy-MM-dd"));
</script>

<style scoped>
.map-container {
	height: 300px;
	margin: 1rem 0;
}

.observation-date {
	font-size: 1.2rem;
}
</style>
