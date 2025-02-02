import * as THREE from "three"
import gsap from 'gsap'

//Curseur

const cursor=
{
    x:0,
    y:0
}
window.addEventListener("mousemove", (event) => 
    {
        cursor.x = event.clientX / sizes.width -0.5
        cursor.y = -(event.clientY / sizes.height -0.5)
        console.log("X:",cursor.x)
        console.log("Y:",cursor.y)
    })
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

const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,100)
// const aspectRatio = sizes.width/sizes.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio,
//     1*aspectRatio,
//     1,-1,
//     0.1,100)

camera.position.z=3

scene.add(camera)

//Log

// Renderer 
const renderer = new THREE.WebGLRenderer({
    canvas: canvas

})

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)


//Clock
const clock = new THREE.Clock()

//GreenSocks
// gsap.to(cube1.rotation, {duration:1,delay:1, y: 3})

//Animations
function aaa(){

    //Clock
    const tempsPasse = clock.getElapsedTime()
    //console.log(tempsPasse)

    camera.position.x= Math.sin(cursor.x * Math.PI*2) *2
    camera.position.z= Math.cos(cursor.x * Math.PI*2) *2
    camera.position.y = cursor.y *5
    camera.lookAt(cube1.position)

    // cube1.rotation.y = tempsPasse
    renderer.render(scene, camera)
    window.requestAnimationFrame(aaa)
}

aaa()