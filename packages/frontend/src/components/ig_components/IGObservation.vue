<template>
  <div class="root">
    <span class="observation-date">観察日：{{ date }}</span>
    <div class="map-container">
      <l-map
        :zoom="10"
        :center="[decimalLatitude ?? 0, decimalLongitude ?? 0]"
        :useGlobalLeaflet="false"
        :maxBounds="[
          [decimalLatitude, decimalLongitude],
          [decimalLatitude, decimalLongitude],
        ]"
        :maxBoundsViscosity="1.0"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layerType="base"
          name="OpenStreetMap"
        ></l-tile-layer>
        <l-marker :latLng="[decimalLatitude ?? 0, decimalLongitude ?? 0]" />
      </l-map>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IIGObservation } from 'ikimongo-types';
import { ref } from 'vue';
import { LMap, LMarker, LTileLayer } from '@vue-leaflet/vue-leaflet';

import 'leaflet/dist/leaflet.css';

const props = defineProps<{
  modelValue: IIGObservation;
}>();

const decimalLatitude = ref(props.modelValue.decimalLatitude);
const decimalLongitude = ref(props.modelValue.decimalLongitude);
const date = ref(props.modelValue.date);
console.log(typeof props.modelValue.date);
console.log('hoge');
</script>

<style scoped>
.root {
  padding: 16px 0;
}

.map-container {
  height: 300px;
  margin: 1rem 0;
}

.observation-date {
  font-size: 1.2rem;
}
</style>
