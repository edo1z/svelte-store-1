<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import * as THREE from 'three';

	let canvasElement;

	onMount(() => {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		const renderer = new THREE.WebGLRenderer({ canvas: canvasElement });
		renderer.setSize(window.innerWidth, window.innerHeight);

		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);
		camera.position.z = 5;

		// 線を引く
		const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
		const points = [];
		points.push(new THREE.Vector3(-2, 0, 0));
		points.push(new THREE.Vector3(0, 2, 0));
		points.push(new THREE.Vector3(2, 0, 0));
		points.push(new THREE.Vector3(-2, 0, 0));
		const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
		const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);

		function animate() {
			cube.rotation.x += 0.01;
			cube.rotation.y += 0.01;
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
		}

		animate();
	});
</script>

<button on:click={() => {goto('/')}}>go back home</button>
<canvas bind:this={canvasElement}></canvas>
