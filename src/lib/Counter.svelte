<script lang="ts">
	import { onDestroy } from "svelte";
	import Timer from "./Timer";
	import { writable } from "svelte/store";

	const click = new Audio("/click_hi.wav");
	let beat: number = 0;

	let bpm: number = 80;

	let isPlaying = false;
	let playClick = writable(true);

	let beats: number[] = [1, 2, 3, 4];

	const timer = new Timer(bpm, onTick);

	function togglePlayClick() {
		$playClick = !$playClick;
	}

	function onTick() {
		beat = (beat + 1) % 4;
		if ($playClick) {
			click.play();
		}
	}

	const startMetronome = () => {
		if (playClick) {
			click.play();
		}
		timer.start();
	};

	onDestroy(() => {
		timer.stop();
	});
</script>

<button
	class="btn btn-primary"
	on:click={() => {
		if (isPlaying) {
			timer.stop();
			beat = 0;
			isPlaying = false;
		} else {
			startMetronome();
			isPlaying = true;
		}
	}}
>
	{isPlaying ? "Stop" : "Start"}
</button>

<div class="form-control min-w-max">
	<label class="label cursor-pointer">
		<span class="label-text">Play tick sound</span>
		<input
			type="checkbox"
			class="toggle"
			checked={$playClick}
			on:change={togglePlayClick}
		/>
	</label>
</div>

<span class="text-9xl font-bold">
	{beat + 1}
</span>

<div class="flex flex-row flex-1 w-full justify-between items-center">
	{#each beats as beatn, index (beatn)}
		<span class:text-5xl={beat === index}>
			{beatn}
		</span>
	{/each}
</div>

<span class="text-7xl font-bold">
	{bpm}
</span>
<input
	type="range"
	min="0"
	max="300"
	value={bpm}
	class="range"
	on:change={(event) => {
		if (event.currentTarget) bpm = +event.currentTarget.value;
		timer.setBpm(bpm);
	}}
/>
<div class="w-full flex justify-between text-xs px-2">
	<span>|</span>
	<span>|</span>
	<span>|</span>
	<span>|</span>
	<span>|</span>
</div>
