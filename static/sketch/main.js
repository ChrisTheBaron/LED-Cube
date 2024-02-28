import * as THREE from 'three';
import { OrbitControls } from './OrbitControls.js';

const container = document.getElementById('putCanvasHere');

console.log(container);

const scene = new THREE.Scene();

scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(75, container.clientWidth / (container.clientHeight - 50), 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);
renderer.setSize(container.clientWidth, container.scrollHeight - 80);

container.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry();

let m = new THREE.MeshBasicMaterial({
    onBeforeCompile: shader => {
        shader.fragmentShader = `${shader.fragmentShader}`
            .replace(
                `vec4 diffuseColor = vec4( diffuse, opacity );`,
                `
      	float chCount = 7.;
        float checker = (1. / chCount);
        float actualCheckers = 1. - checker;
        float halfChecker = checker * 0.5;
      	vec2 bUv = (vUv * actualCheckers) - halfChecker;
      	vec2 cUv = fract((bUv) * (chCount * 0.5)) - 0.5;
        float checkerVal = clamp(step(cUv.x * cUv.y, 0.), 0.5, 1.);
      	vec3 col = vec3(checkerVal);
      	vec4 diffuseColor = vec4( col, opacity );
      `
            );
    }
});
m.defines = { "USE_UV": "" };

let cube = new THREE.Mesh(geometry, m);

cube.position.x = 0;
cube.position.y = 0;
cube.position.z = 0;
cube.scale.x = 1;
cube.scale.y = 1;
cube.scale.z = 1;
//cube.rotation.y = THREE.Math.degToRad(-45);
//cube.rotation.x = THREE.Math.degToRad(54.7);
scene.add(cube);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};

animate();

$(async function () {

    await API.connectAsync();

    setInterval(() => API.sendHeartbeat(), 1000);

    API.changeApplication('games/sketch');

    API.sendInput({ polar: controls.getPolarAngle(), azimuthal: controls.getAzimuthalAngle() });

    controls.addEventListener('change', _.throttle(() => {
        API.sendInput({ polar: controls.getPolarAngle(), azimuthal: controls.getAzimuthalAngle() });
    }), 1000 / 60);

    $('#selectedColour').on('change', () => {
        API.sendInput({ colour: hexToRgb($('#selectedColour').val()) });
    })

    $('#brushSize').on('change', () => {
        API.sendInput({ size: $('#brushSize').val() });
    })

    $('#selectedColour').trigger('change');
    $('#brushSize').trigger('change');

});

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ];
}