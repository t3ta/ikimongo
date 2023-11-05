<!--
SPDX-FileCopyrightText: syuilo and other misskey contributors
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
	<MkWindow
		ref="window"
		:initialWidth="300"
		:initialHeight="290"
		:canResize="true"
		:mini="true"
		:front="true"
		@closed="emit('closed')"
	>
		<MkEmojiPicker
			:showPinned="showPinned"
			:asReactionPicker="asReactionPicker"
			asWindow
			:class="$style.picker"
			@chosen="chosen"
		/>
	</MkWindow>
</template>

<script lang="ts" setup>
import {} from "vue";
import MkWindow from "@/components/mk_components/MkWindow.vue";
import MkEmojiPicker from "@/components/mk_components/MkEmojiPicker.vue";

withDefaults(
	defineProps<{
		src?: HTMLElement;
		showPinned?: boolean;
		asReactionPicker?: boolean;
	}>(),
	{
		showPinned: true,
	},
);

const emit = defineEmits<{
	(ev: "chosen", v: any): void;
	(ev: "closed"): void;
}>();

function chosen(emoji: any) {
	emit("chosen", emoji);
}
</script>

<style lang="scss" module>
.picker {
	height: 100%;
}
</style>
