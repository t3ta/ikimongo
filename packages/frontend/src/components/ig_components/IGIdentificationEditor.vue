<template>
  <div class="igidentificationeditor">
    <ul>
      <li>
        <MkInput v-model="scientificName" small type="text" class="input">
          <template #label>学名</template>
        </MkInput>
      </li>
      <li>
        <MkInput v-model="vernacularName" small type="text" class="input">
          <template #label>和名</template>
        </MkInput>
      </li>
      <li>
        <MkInput v-model="taxonRank" small type="text" class="input">
          <template #label>分類階級</template>
        </MkInput>
      </li>
      <li>
        <MkInput v-model="kingdom" small type="text" class="input">
          <template #label>界</template>
        </MkInput>
      </li>
      <li>
        <MkInput v-model="phylum" small type="text" class="input">
          <template #label>門</template>
        </MkInput>
      </li>
      <li>
        <MkInput v-model="iclass" small type="text" class="input">
          <template #label>綱</template>
        </MkInput>
      </li>
      <li>
        <MkInput v-model="order" small type="text" class="input">
          <template #label>目</template>
        </MkInput>
      </li>
      <li>
        <MkInput v-model="family" small type="text" class="input">
          <template #label>科</template>
        </MkInput>
      </li>
      <li>
        <MkInput v-model="genus" small type="text" class="input">
          <template #label>属</template>
        </MkInput>
      </li>
      <li>
        <MkInput v-model="description" small type="text" class="input">
          <template #label>コメント</template>
        </MkInput>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import MkInput from '../..//components/mk_components/MkInput.vue';
import { IIGIdentificationRequest } from '../../../../ikimongo-types/index.js';

const props = defineProps<{
  modelValue: IIGIdentificationRequest;
}>();

const emit = defineEmits<{
  (ev: 'update:modelValue', v: IIGIdentificationRequest): void;
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
const description = ref(props.modelValue.description);

watch(
  [scientificName],
  () =>
    emit('update:modelValue', {
      scientificName: scientificName.value,
      vernacularName: vernacularName.value,
      taxonId: '',
      taxonRank: taxonRank.value,
      kingdom: kingdom.value,
      phylum: phylum.value,
      class: iclass.value,
      order: order.value,
      family: family.value,
      genus: genus.value,
      language: 'ja',
      description: description.value,
    }),
  { deep: true },
);
</script>

<style lang="scss" scoped>
.igidentificationeditor {
  padding: 8px 16px;

  > .caution {
    margin: 0 0 8px 0;
    font-size: 0.8em;
    color: #f00;

    > i {
      margin-right: 4px;
    }
  }

  > ul {
    display: block;
    margin: 0;
    padding: 0;
    list-style: none;

    > li {
      display: flex;
      gap: 8px;
      margin: 8px 0;
      padding: 0;
      width: 100%;

      > .input {
        flex: 1;
      }

      > button {
        width: 32px;
        padding: 4px 0;
      }
    }
  }

  > .add {
    margin: 8px 0;
    z-index: 1;
  }

  > section {
    margin: 16px 0 0 0;

    > div {
      margin: 0 8px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 12px;

      &:last-child {
        flex: 1 0 auto;

        > div {
          flex-grow: 1;
        }

        > section {
          // MAGIC: Prevent div above from growing unless wrapped to its own line
          flex-grow: 9999;
          align-items: end;
          display: flex;
          gap: 4px;

          > .input {
            flex: 1 1 auto;
          }
        }
      }
    }
  }
}
</style>
