<!--
SPDX-FileCopyrightText: syuilo and other misskey contributors
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<div class="igobservationeditor">
	<ul>
		<li>
			<MkInput v-model="japaneseName" small type="text" class="input">
				<template #label>和名</template>
			</MkInput>
		</li>
		<li>
			<MkInput v-model="scientificName" small type="text" class="input">
				<template #label>学名</template>
			</MkInput>
		</li>
		<li>
			<MkInput v-model="locationName" small type="text" class="input">
				<template #label>場所</template>
			</MkInput>
		</li>
		<li>
			<MkInput v-model="date" small type="text" class="input">
				<template #label>日付</template>
			</MkInput>
		</li>
	</ul>
</div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import MkInput from './MkInput.vue';

const props = defineProps<{
	modelValue: {
		scientificName: string;
		japaneseName: string;
		location: {
			name: string;
			latitude?: number;
			longitude?: number;
		},
		date?: Date;
	};
}>();
const emit = defineEmits<{
	(ev: 'update:modelValue', v: {
		scientificName: string;
		japaneseName: string;
		location: {
			name: string;
			latitude?: number;
			longitude?: number;
		},
		date?: Date;
	}): void;
}>();

const scientificName = ref(props.modelValue.scientificName);
const japaneseName = ref(props.modelValue.japaneseName);
const locationName = ref(props.modelValue.location.name);
const date = ref(props.modelValue.date);

watch([scientificName, japaneseName, locationName], () => emit('update:modelValue', {
	scientificName: scientificName.value,
	japaneseName: japaneseName.value,
	location: {
		name: locationName.value,
	},
	date: date.value,
}), {
	deep: true,
});
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
