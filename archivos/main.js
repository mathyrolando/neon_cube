import * as THREE from "three";
//import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
import {TrackballControls} from 'three/addons/controls/TrackballControls.js';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';

let camara, escena, controls;
let compositor, renderizador;
const objects = [];

const params = {
    threshold: 0,
    strength: 0.8,
    radius: 0,
    exposure: 1
};


init()
animar();

function init() {
    const ancho = window.innerWidth;
    const alto = window.innerHeight;
    //Render **********************************************************************
    renderizador = new THREE.WebGLRenderer({antialias: true});
    renderizador.capabilities.maxAnisotropy = 16; // Puedes ajustar este valor según tus necesidades
    //renderizador.setPixelRatio(window.devicePixelRatio);
    renderizador.setSize(ancho, alto);
    //renderizador.toneMapping = THREE.ReinhardToneMapping;
    document.body.appendChild(renderizador.domElement);

    //Escena **********************************************************************
    escena = new THREE.Scene();
    escena.background = new THREE.Color( 0x111111 );
    //escena.fog = new THREE.Fog( 0x000000, 15, 20);

    //Camara **************************************************
    camara = new THREE.PerspectiveCamera(
        70, ancho/alto, 0.1, 1000);
    camara.position.z = 15;
    escena.add(camara);
    controls = new TrackballControls(camara, renderizador.domElement);
    // Configura los controles según tus necesidades. Por ejemplo:
    controls.rotateSpeed = 2.0; // Velocidad de rotación al arrastrar
    controls.zoomSpeed = 1.2; // Velocidad de zoom
    controls.panSpeed = 0; // Velocidad de desplazamiento
    controls.staticMoving = false; // Movimiento estático del trackball
    controls.dynamicDampingFactor = 0.1; // Valores más bajos generan un desplazamiento más prolongado
    controls.dampingFactor = 0.1; // También puedes ajustar este valor según tus necesidades

    //Linea **************************************************************
    const cubo = teseracto();
    const material2 = new THREE.LineBasicMaterial( { color: 0x9BF8FF, linewidth: 2});
    const linea = new THREE.Line(cubo, material2);
    escena.add(linea);
    objects.push(linea);


    //Efecto de neón **********************************************************************
    escena.add(new THREE.AmbientLight(0xcccccc));

    const luzPunto = new THREE.PointLight(0xffffff, 100);
    camara.add(luzPunto);

    const renderizarEscena = new RenderPass(escena, camara);

    const bloomPass = new UnrealBloomPass(new THREE.Vector2(ancho, alto), 1.5, 0.4, 0.85);
    bloomPass.threshold = params.threshold;
    bloomPass.strength = params.strength;
    bloomPass.radius = params.radius;

    const outputPass = new OutputPass();

    compositor = new EffectComposer(renderizador);
    compositor.addPass(renderizarEscena);
    compositor.addPass(bloomPass);
    compositor.addPass(outputPass);

    window.addEventListener('resize', onWindowResize);
}

function teseracto(){

    const size = 3;
    const geometria = new THREE.BoxGeometry(2*size,2*size,2*size);
    const material = new THREE.MeshBasicMaterial({color: 0x000000});
    const cubo = new THREE.Mesh(geometria,material);
    //escena.add(cubo);


    const puntos = [];
    const size2 = size/5;

    puntos.push(new THREE.Vector3(-size, size, size)); //1
    puntos.push(new THREE.Vector3(-size2, size2, size2)); //1
    puntos.push(new THREE.Vector3(-size, size, size)); //1

    puntos.push(new THREE.Vector3(size,size,size)); //2
    puntos.push(new THREE.Vector3(size2,size2,size2)); //2
    puntos.push(new THREE.Vector3(size,size,size)); //2

    puntos.push(new THREE.Vector3(size,-size,size)); //3
    puntos.push(new THREE.Vector3(size2,-size2,size2)); //3
    puntos.push(new THREE.Vector3(size,-size,size)); //3

    puntos.push(new THREE.Vector3(-size,-size,size)); //4
    puntos.push(new THREE.Vector3(-size2,-size2,size2)); //4
    puntos.push(new THREE.Vector3(-size,-size,size)); //4

    puntos.push(new THREE.Vector3(-size, size, size)); //1

    puntos.push(new THREE.Vector3(-size, size, -size)); //5
    puntos.push(new THREE.Vector3(-size2, size2, -size2)); //5
    puntos.push(new THREE.Vector3(-size, size, -size)); //5

    puntos.push(new THREE.Vector3(size,size,-size)); // 6
    puntos.push(new THREE.Vector3(size2,size2,-size2)); // 6
    puntos.push(new THREE.Vector3(size,size,-size)); // 6

    puntos.push(new THREE.Vector3(size,-size,-size)); //7
    puntos.push(new THREE.Vector3(size2,-size2,-size2)); //7
    puntos.push(new THREE.Vector3(size,-size,-size)); //7

    puntos.push(new THREE.Vector3(-size,-size,-size)); //8
    puntos.push(new THREE.Vector3(-size2,-size2,-size2)); //8
    puntos.push(new THREE.Vector3(-size,-size,-size)); //8

    puntos.push(new THREE.Vector3(-size, size, -size)); //5
    puntos.push(new THREE.Vector3(-size, size, size)); //1
    puntos.push(new THREE.Vector3(size,size,size)); //2
    puntos.push(new THREE.Vector3(size,size,-size)); // 6
    puntos.push(new THREE.Vector3(size,-size,-size)); //7
    puntos.push(new THREE.Vector3(size,-size,size)); //3
    puntos.push(new THREE.Vector3(-size,-size,size)); //4
    puntos.push(new THREE.Vector3(-size,-size,-size)); //8
    puntos.push(new THREE.Vector3(-size, size, -size)); //5
    puntos.push(new THREE.Vector3(-size, size, size)); //1



    puntos.push(new THREE.Vector3(-size2, size2, size2)); //1
    puntos.push(new THREE.Vector3(size2,size2,size2)); //2
    puntos.push(new THREE.Vector3(size2,-size2,size2)); //3
    puntos.push(new THREE.Vector3(-size2,-size2,size2)); //4

    puntos.push(new THREE.Vector3(-size2, size2, size2)); //1

    puntos.push(new THREE.Vector3(-size2, size2, -size2)); //5
    puntos.push(new THREE.Vector3(size2,size2,-size2)); // 6
    puntos.push(new THREE.Vector3(size2,-size2,-size2)); //7
    puntos.push(new THREE.Vector3(-size2,-size2,-size2)); //8

    puntos.push(new THREE.Vector3(-size2, size2, -size2)); //5
    puntos.push(new THREE.Vector3(-size2, size2, size2)); //1
    puntos.push(new THREE.Vector3(size2,size2,size2)); //2
    puntos.push(new THREE.Vector3(size2,size2,-size2)); // 6
    puntos.push(new THREE.Vector3(size2,-size2,-size2)); //7
    puntos.push(new THREE.Vector3(size2,-size2,size2)); //3
    puntos.push(new THREE.Vector3(-size2,-size2,size2)); //4
    puntos.push(new THREE.Vector3(-size2,-size2,-size2)); //8
    puntos.push(new THREE.Vector3(-size2, size2, -size2)); //5
    puntos.push(new THREE.Vector3(-size2, size2, size2)); //1


    const geometria2 = new THREE.BufferGeometry().setFromPoints(puntos);


    /*
    const linea2 = new MeshLine();
    linea2.setGeometry(geometria2);
    linea2.setPoints(puntos, p => 2);

    const material3 = new MeshLineMaterial({ color: 0x9BF8FF})
    const mesh = new THREE.Mesh(linea2, material);

    //escena.add(mesh);
    */


    return geometria2;
}

function onWindowResize() {
    const ancho = window.innerWidth;
    const alto = window.innerHeight;
    camara.aspect = ancho / alto;
    camara.updateProjectionMatrix();
    renderizador.setSize(ancho, alto);
    compositor.setSize(ancho, alto);
}


function animar(){
    requestAnimationFrame(animar);

    escena.traverse(function(object){
        if (object.isLine) {
            object.rotation.x += 0.007;
            object.rotation.y += 0.007;
        }

    } );
    controls.update();
    compositor.render(escena,camara);
}





