<!-- 
	Scrolling gallery to display videos in the vision venture roadmap.

	Created by Haowen Liu in 2022.
 -->
<script lang="ts">
	import { beforeUpdate, onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	import ForwardCaret from '../images/forward-caret.svg';
	import type { Episode } from '../utils/episode';

	export let episodes: Episode[], play: (link: string) => void;

	const margin = 48;

	// Scroll
	let scrollPosition = 0;
	let maxScroll = 0;
	let translate = spring(0);
	let translateFinal = 0;

	let imageWidths = new Array<number>(episodes.length);
	let containerWidth = 0;

	$: maxScroll = episodes.length - Math.floor(containerWidth / (imageWidths[0] + margin));
</script>

<div class="outer" bind:clientWidth={containerWidth}>
	<div class="inner" style={`transform: translateX(-${$translate}px)`}>
		{#each episodes as episode, i}
			<div bind:clientWidth={imageWidths[i]} class="image">
				<img
					src={episode.image}
					alt={episode.description}
					on:click={() => {
						play(episode.youtubeLink);
					}}
				/>
			</div>
		{/each}
	</div>
	<div class="caret backward-caret">
		<img
			src={ForwardCaret}
			alt="Forward caret"
			on:click={() => {
				if (scrollPosition <= 0) return;
				translateFinal -= margin + imageWidths[0];
				translate.set(translateFinal);
				scrollPosition -= 1;
			}}
			class:hide={scrollPosition === 0}
		/>
	</div>
	<div class="caret">
		<img
			src={ForwardCaret}
			alt="Forward caret"
			on:click={() => {
				if (scrollPosition >= maxScroll) return;
				translateFinal += margin + imageWidths[0];
				translate.set(translateFinal);
				scrollPosition += 1;
			}}
			class:hide={scrollPosition >= maxScroll}
		/>
	</div>
</div>

<style lang="postcss">
	.outer {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.inner {
		display: flex;
		flex-direction: row;
		height: 100%;
		margin: 0 16px 0 16px;
		width: fit-content;
	}

	.caret {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		width: 50px;
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 0.6) 20%,
			rgba(255, 255, 255, 1) 100%
		);

		& img {
			position: absolute;
			top: 50%;
			right: 0;
			transform: translateY(-50%);
			cursor: pointer;
		}
	}

	.backward-caret {
		left: 0;
		transform: scaleX(-1);
	}

	.image {
		margin: 12px 24px 36px 24px;
		width: 480px;
		cursor: pointer;
		& img {
			border-radius: 16px;
			box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
		}
	}

	.hide {
		display: none;
	}
</style>
