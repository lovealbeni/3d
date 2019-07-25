import * as THREE from 'three';
import { OBJLoader } from './jsm/loaders/OBJLoader'

var texture = THREE.ImageUtils.loadTexture('../tex/biglistone.jpg');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var light = new THREE.AmbientLight( 0xffffff );
scene.add( light );

var light = new THREE.PointLight( 0xffd700, 1);
light.position.set( -50, 25, 0 );
// scene.add( light );


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

var group = new THREE.Group();
var size = {
    height:0,
    width:0,
    depth:0
}
// var loader = new THREE.ObjectLoader();
// loader.load('../source/small.obj', function (_sce) {
//     _sce.children.forEach((value)=>{
//         let material = new THREE.MeshPhongMaterial({
//             map:texture
//         });
//         var mesh = new THREE.Mesh(value.geometry,material);
//         group.add(mesh);
//     })
//     debugger
//     scene.add(group);
//     // group.translateX(10);
//     // console.log(group.position);
//     animate();
// });

function loadModel(){
    group.traverse(function(child){
        if(child.isMesh) child.material.map = texture;
        child.castShadow = true;
    });
    group.castShadow = true;
    scene.add(group);
    group.rotateX(-0.5*Math.PI);
    spotLight.target = group;
    var bbox = new THREE.Box3().setFromObject(group);
    size.height = bbox.min.z;
    size.width = bbox.min.x;
    size.depth = bbox.min.y;
    animate();
}

var manager = new THREE.LoadingManager(loadModel);

var loader = new OBJLoader(manager);
loader.load('../source/small.obj',function(obj){
    group = obj;
})

function animate() {
    requestAnimationFrame( animate );
    let quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle(new THREE.Vector3(0,1,0),Math.PI/200);
    group.applyQuaternion(quaternion);
    camera.lookAt(scene.position);
    renderer.render( scene, camera );
}