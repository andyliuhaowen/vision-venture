/// <reference types="@sveltejs/kit" />
/// <reference types="vite/client" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

declare module '*.png?webp' {
	const src: string;
	export default src;
}

declare module '*.jpg?webp' {
	const src: string;
	export default src;
}

declare module '*.png?webp&w=200' {
	const src: string;
	export default src;
}

declare module '*.jpg?webp&w=200' {
	const src: string;
	export default src;
}
