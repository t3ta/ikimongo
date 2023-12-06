<template>
  <div>
    <table>
      <tbody>
        <tr>
          <td>学名</td>
          <td>{{ scientificName }}</td>
        </tr>
        <tr>
          <td>和名</td>
          <td>{{ vernacularName }}</td>
        </tr>
        <tr>
          <td>分類階級</td>
          <td>{{ taxonRank }}</td>
        </tr>
        <tr>
          <td>界</td>
          <td>{{ kingdom }}</td>
        </tr>
        <tr>
          <td>門</td>
          <td>{{ phylum }}</td>
        </tr>
        <tr>
          <td>綱</td>
          <td>{{ iclass }}</td>
        </tr>
        <tr>
          <td>目</td>
          <td>{{ order }}</td>
        </tr>
        <tr>
          <td>科</td>
          <td>{{ family }}</td>
        </tr>
        <tr>
          <td>属</td>
          <td>{{ genus }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IIGIdentification } from 'ikimongo-types';
import 'leaflet/dist/leaflet.css';

const props = defineProps<{
  modelValue: IIGIdentification;
}>();

const scientificName = ref(props.modelValue.scientificName);
const vernacularName = ref(props.modelValue.vernacularName);
const taxonRank = ref(props.modelValue.taxonRank);
const kingdom = ref(props.modelValue.kingdom);
const phylum = ref(props.modelValue.phylum);
const iclass = ref(props.modelValue.class);
const order = ref(props.modelValue.order);
const family = ref(props.modelValue.family);
const genus = ref(props.modelValue.genus);
</script>

<style scoped>
div {
  padding: 16px 0;
}

table {
  border-collapse: collapse;
  border: 1px solid #333;
  width: 100%;
}

tr {
  height: 32px;
}

td {
  border: 1px solid #333;
  padding: 4px;
}

td:first-child {
  width: 100px;
}
</style>
