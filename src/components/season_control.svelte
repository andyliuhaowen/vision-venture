<script lang="ts">
	export let numberOfSeasons: number, selectSeason: (season: number) => void;

	let season = numberOfSeasons - 1;
</script>

<div class="season-container">
	{#each Array(numberOfSeasons) as _}
		<button
			class="season-button"
			on:click={() => {
				selectSeason(season);
			}}
		/>
	{/each}
</div>

<style lang="postcss">
	.season-container {
		display: flex;
	}

	.season-button {
		border-radius: 6px;
	}
</style>
