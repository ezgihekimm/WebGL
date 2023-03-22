var camera;
var scene;
var renderer;
var params = {
	color: 0x00ff00
};

var gui;

function createScene() {

	gui = new dat.GUI();

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
	renderer = new THREE.WebGLRenderer({pyhsicallyCorrectLights: true, antialias: true, powerPreference: 'high-performance'});
	renderer.shadowMap.enabled = true;
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('webgl').appendChild(renderer.domElement);
	
	camera.position.x = 20;
	camera.position.y = 20; 
	camera.position.z = 20;
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	createBox('box1', 1, 1, 1, 0, 0.5, 0, 0xffffff); 
	createBox('floor', 20, 1, 20, 0, -0.5, 0, 0xffffff); 
	createSpotLight();

/* 	var gridHelper = new THREE.GridHelper(5, 10, 0x0000ff, 0x808080);
	scene.add(gridHelper); */

/* 	var axesHelper = new THREE.AxesHelper(1);
	scene.add(axesHelper);

	const dir = new THREE.Vector3(0, 5, 5);
	const ori = new THREE.Vector3(0, 0, 0);

	var arrowHelper = new THREE.ArrowHelper(dir.normalize(), ori, 1, 0xffff00);
	scene.add(arrowHelper); */

/* 	var camera2 = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 5);
	camera2.position.x = -1;
	camera2.position.y =  1;
	camera2.position.z = 2;
	camera2.lookAt(new THREE.Vector3(0, 0, 0));

	var cameraHelper = new THREE.CameraHelper(camera2);
	scene.add(cameraHelper); */

/* 	var fp = gui.addFolder('Position');
	var fr = gui.addFolder('Rotation');
	var fc = gui.addFolder('Color'); */
/* 
	fp.add(scene.getObjectByName('box1').position, 'x', 0, 5);
	fp.add(scene.getObjectByName('box1').position, 'y', 0, 5);
	fp.add(scene.getObjectByName('box1').position, 'z', 0, 5);

	fr.add(scene.getObjectByName('box1').rotation, 'x', 0, 5);
	fr.add(scene.getObjectByName('box1').rotation, 'y', 0, 5);
	fr.add(scene.getObjectByName('box1').rotation, 'z', 0, 5); */
/* 
	fc.addColor(params, 'color').onChange(function () {
			scene.getObjectByName('box1').material.color.set(params.color)}); */

		render();
}

function render() {
	renderer.render(scene, camera);
	// scene.getObjectByName('box1').rotation.x += 0.01;
	//animation loop
	requestAnimationFrame(render);
}

function createBox(name, w, h, d, x, y, z, color) {

	var geometry = new THREE.BoxGeometry(w, h, d);
	var material = new THREE.MeshStandardMaterial({
		color: color
	});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	mesh.name = name;
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	scene.add(mesh);
}

function createSpotLight(){

	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(3, 8, 5);
	spotLight.castShadow = true;
	spotLight.shadow.mapSize.width = 4096;
	spotLight.shadow.mapSize.height = 4096;
	spotLight.intensity = 1;
	spotLight.penumbra = 1;

	spotLight.shadow.camera.near = 2;
	spotLight.shadow.camera.far = 40;
	spotLight.shadow.camera.fov = 30;

	var target = new THREE.Object3D();
	target.position.set(-10, 0, -10);
	spotLight.target = target;


	gui.add(spotLight, 'penumbra', 0, 1).step(0.01);
	gui.add(spotLight, 'intensity', 0, 10).step(1);
	gui.add(spotLight, 'distance', 0, 10).step(1);
	gui.add(spotLight, 'decay', 0, 10).step(1);
	gui.add(spotLight, 'power', 0, 10).step(1);
	gui.add(spotLight.position, 'x', 0, 10).step(1);
	gui.add(spotLight.position, 'y', 0, 10).step(1);
	gui.add(spotLight.position, 'z', 0, 10).step(1);
	gui.add(target.position, 'x', -10, 10).step(1);
	gui.add(target.position, 'y', -10, 10).step(1);
	gui.add(target.position, 'z', -10, 10).step(1);


	var helper = new THREE.SpotLightHelper(spotLight);
	scene.add(helper);

	var chelper = new THREE.CameraHelper(spotLight.shadow.camera);
	scene.add(chelper);
		

	scene.add(spotLight);
	scene.add(target);
}

createScene();