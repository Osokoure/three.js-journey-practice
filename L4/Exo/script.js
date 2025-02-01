import * as THREE from "three"
import { color } from "three/tsl"

//Canvas
const canvas = document.querySelector('canvas.webgl')

//Scene
const scene = new THREE.Scene()

//Object
const groupe = new THREE.Group()
scene.add(groupe)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: "red"}) 
)
groupe.add(cube1)
cube1.position.set(-3,0,0)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: "green"}) 
)
groupe.add(cube2)
cube2.position.set(0,0,0)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: "blue"}) 
)
groupe.add(cube3)
cube3.position.set(3,0,0)

//Scale


//Axes helper

const axesHelper = new THREE.AxesHelper(1)
scene.add(axesHelper)
axesHelper.position.set(0,0,0)

// Sizes
const sizes ={
    width: 800,
    height: 600
}

//Camera

const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
scene.add(camera)
camera.position.z = 4

//Log

// Renderer 
const renderer = new THREE.WebGLRenderer({
    canvas: canvas

})

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)