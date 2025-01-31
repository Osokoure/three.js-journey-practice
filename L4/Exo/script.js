import * as THREE from "three"

//Canvas
const canvas = document.querySelector('canvas.webgl')

//Scene
const scene = new THREE.Scene()

//Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: "red" })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

mesh.position.set(0,0,0)

//Scale


console.log("Position par rapport au centre:",mesh.position.length())

//Axes helper

const axesHelper = new THREE.AxesHelper(1)
scene.add(axesHelper)
axesHelper.position.set(1,1,1)

// Sizes
const sizes ={
    width: 800,
    height: 600
}

//Camera

const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
scene.add(camera)
camera.position.z = 4
console.log("Distance de la caméra:",mesh.position.distanceTo(camera.position))

// Renderer 
const renderer = new THREE.WebGLRenderer({
    canvas: canvas

})

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)