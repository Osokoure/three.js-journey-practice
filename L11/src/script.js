import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'
import { Wireframe } from 'three/examples/jsm/Addons.js'

/**
 * Debug
 */
const gui = new GUI()
const debugObject = {}
debugObject.color = '#3a6ea6'
debugObject.PleinEcran =()=>
    {
                const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
            
                if(!fullscreenElement)
                {
                    if(canvas.requestFullscreen)
                    {
                        canvas.requestFullscreen()
                    }
                    else if(canvas.webkitRequestFullscreen)
                    {
                        canvas.webkitRequestFullscreen()
                    }
                }
                else
                {
                    if(document.exitFullscreen)
                    {
                        document.exitFullscreen()
                    }
                    else if(document.webkitExitFullscreen)
                    {
                        document.webkitExitFullscreen()
                    }
                }
            }
debugObject.subdivision = 2
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Texture 
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () =>
    {
        console.log('Début du chargement')
    }
    loadingManager.onLoad = () =>
    {
        console.log('Chargement fini')
    }
    loadingManager.onProgress = () =>
    {
        console.log('Chargement en cours')
    }
    loadingManager.onError = () =>
    {
        console.log('Erreur de chargement')
    }
const textureLoader = new THREE.TextureLoader(loadingManager)
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/3.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

/**
 * Objects
 */
//MeshBasicMaterial
//const material = new THREE.MeshBasicMaterial()
// material.map=doorColorTexture
// material.color=new THREE.Color("Red")
// material.wireframe=true
// material.transparent = true
// material.opacity = 0.5
// material.alphaMap=doorAlphaTexture
//material.side = THREE.DoubleSide

//MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial()
//material.flatShading = true

// MeshMatcapMaterial
const material = new THREE.MeshMatcapMaterial()
material.matcap = matcapTexture


const sphereGeo = new THREE.SphereGeometry()

const sphere = new THREE.Mesh(sphereGeo, material)
scene.add(sphere)
sphere.position.set(-3,0,0)

const planeGeo = new THREE.PlaneGeometry()
const plane = new THREE.Mesh(planeGeo, material)
scene.add(plane)

const torusGeo = new THREE.TorusGeometry()
const torus = new THREE.Mesh(torusGeo, material)
scene.add(torus)
torus.position.set(3,0,0)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
//GUI
gui.add(debugObject, "PleinEcran")
const geoTweaks = gui.addFolder('Cool Gui')

geoTweaks.add(material, "wireframe")
geoTweaks
    .addColor(debugObject, 'color')
    .onChange(() =>
    {
        material.color.set(debugObject.color)
    })
geoTweaks.add(debugObject, 'spin')

geoTweaks.close()

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    //update objects
    sphere.rotation.y =0.1 * elapsedTime
    plane.rotation.y =0.1 * elapsedTime
    torus.rotation.y =0.1 * elapsedTime

    sphere.rotation.x = -0.15 * elapsedTime
    plane.rotation.x = -0.15 * elapsedTime
    torus.rotation.x = -0.15 * elapsedTime
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()