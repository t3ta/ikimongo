<template>
  <div class="igobservationeditor">
    <ul>
      <li>
        <MkInput v-model="date" small type="date" class="input">
          <template #label>日付</template>
        </MkInput>
      </li>
      <li>
        <MkInput v-model="longitude" small type="number" class="input">
          <template #label>緯度</template>
        </MkInput>
        <MkInput v-model="latitude" small type="number" class="input">
          <template #label>経度</template>
        </MkInput>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { IIGObservationRequest } from 'ikimongo-types';
import MkInput from '../..//components/mk_components/MkInput.vue';

const props = defineProps<{
  modelValue: IIGObservationRequest;
}>();
const emit = defineEmits<{
  (ev: 'update:modelValue', v: IIGObservationRequest): void;
}>();

const latitude = ref(props.modelValue.decimalLatitude);
const longitude = ref(props.modelValue.decimalLongitude);
const date = ref(props.modelValue.date);

watch(
  [date, latitude, longitude],
  () =>
    emit('update:modelValue', {
      decimalLatitude: latitude.value,
      decimalLongitude: longitude.value,
      date: date.value,
    }),
  {
    deep: true,
  },
);
</script>

<style lang="scss" scoped>
.igobservationeditor {
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
