<script setup lang="ts">
import { ref } from 'vue';
const classes = ref<any>(['动物-马', '动物-鹿', '动物-狼', '动物-狐狸']);
const list = ref<any>([
	{
		id: 3,
		imageSrc: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
		labels: {
			shapes: [
				{
					label: '动物-马',
					group_id: '1',
					shape_type: 'polygon',
					points: [
						[341.01876675603216, 182.19168841946117],
						[451.8319928507596, 227.2037526172104],
						[458.26630920464703, 315.08444938424464],
						[458.98123324396784, 435.1166205782426],
						[432.52904378909744, 510.85120478397937],
						[377.4798927613941, 503.70643268909856],
						[346.7381590705988, 390.1045563804933],
						[331.7247542448615, 260.78418146315033],
					],
				},
				{
					label: '动物-鹿',
					group_id: null,
					shape_type: 'polygon',
					points: [
						[596.4788732394367, 358.8584660024504],
						[637.3239436619718, 379.3042332206647],
						[670.4225352112676, 384.9444448670686],
						[691.5492957746479, 382.8293654996671],
						[691.5492957746479, 420.1957676570932],
						[653.5211267605634, 423.7208999360957],
						[616.1971830985916, 421.6058205686942],
						[615.4929577464789, 394.8148152482755],
						[586.6197183098592, 384.2394184112681],
					],
				},
			],
			imageHeight: 533,
			imageWidth: 800,
		},
	},
	{
		id: 4,
		imageSrc: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
		labels: {},
	},
]);
const onEditPolygon = (arg: any) => {
	console.log(arg);
};
const onSave = (node, done) => {
	console.log(node);
	setTimeout(() => {
		done();
	}, 500);
};
</script>

<template>
	<div class="container">
		<NextLabelme :classes="classes" :data="list" @edit-polygon="onEditPolygon" @save="onSave"></NextLabelme>
	</div>
</template>

<style lang="scss" scoped></style>
