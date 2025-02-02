import * as THREE from "three"
import gsap from 'gsap'

//Canvas
const canvas = document.querySelector('canvas.webgl')

//Scene
const scene = new THREE.Scene()

//Object


const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: "red"}) 
)
scene.add(cube1)

//Scale


//Axes helper

const axesHelper = new THREE.AxesHelper(1)
scene.add(axesHelper)
axesHelper.position.set(3,2,0)

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


//Clock
// const clock = new THREE.Clock()
gsap.to(cube1.position, { duration:7, delay:1, x: 3})
//Animations
function aaa(){

    // //Clock
    // const tempsPasse = clock.getElapsedTime()
    // console.log(tempsPasse)

    // cube1.rotation.y = tempsPasse
    renderer.render(scene, camera)
    window.requestAnimationFrame(aaa)
}

aaa()