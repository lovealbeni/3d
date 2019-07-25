import * as THREE from 'three';
import { OBJLoader } from './jsm/loaders/OBJLoader'

var texture = THREE.ImageUtils.loadTexture('../tex/biglistone.jpg');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var light = new THREE.AmbientLight( 0xffffff );
// scene.add( light );

var light = new THREE.PointLight( 0xffd700, 1);
light.position.set( -50, 25, 0 );
scene.add( light );


var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-50,200,10);
spotLight.angle = 1.05;
spotLight.castShadow = true;
spotLight.onlyShadow = true;
spotLight.shadow.mapSize.width = 2048;
spotLight.shadow.mapSize.height = 2048;
// spotLight.target = group;
scene.add(spotLight);

// var PointLightHelper = new THREE.PointLightHelper(light,1);
// scene.add(PointLightHelper);

var lightHelper = new THREE.SpotLightHelper(spotLight,1);
// scene.add(lightHelper);

var axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);


var color = new THREE.Color(150/255,150/255,150/255);
var plane = new THREE.Mesh(new THREE.PlaneGeometry(600,600,1,1),new THREE.MeshLambertMaterial({color:color}));
plane.receiveShadow = true;
plane.rotateX(-0.5*Math.PI);
plane.translateZ(-10);
plane.translateY(20);
plane.translateX(20);
scene.add(plane);

camera.position.z = 15;
camera.position.x = 15;
camera.position.y = 5;
var renderer = new THREE.WebGLRenderer({
    antialias:true,
    alpha:true
});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio);
renderer.gammaInput = true;
// renderer.gammaOutput = true;
renderer.shadowMapEnabled = true;
renderer.shadowMapType = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );

animate();

function animate() {
    requestAnimationFrame( animate );
    camera.lookAt(scene.position);
    renderer.render( scene, camera );
}