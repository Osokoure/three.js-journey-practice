import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'
import { Wireframe } from 'three/examples/jsm/Addons.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

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
const matcapTexture = textureLoader.load('/textures/matcaps/5.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

/**
 * Environment map
 */
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) =>
    {
        environmentMap.mapping = THREE.EquirectangularReflectionMapping
    
        scene.background = environmentMap
        scene.environment = environmentMap
    })

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
//const material = new THREE.MeshNormalMaterial()
//material.flatShading = true

// MeshMatcapMaterial
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial()

// MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial()

//MeshPhongMaterial
//const material = new THREE.MeshPhongMaterial()

//MeshStandardMaterial()
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 1
// material.roughness = 1

// material.map = doorColorTexture

// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1.1

// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1

// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)

// material.transparent = true
// material.alphaMap = doorAlphaTexture

/**
 * MeshPhysicalMaterial
 */
// Base material
const material = new THREE.MeshPhysicalMaterial()
material.metalness = 1
material.roughness = 1
material.map = doorColorTexture
material.aoMap = doorAmbientOcclusionTexture
material.aoMapIntensity = 1
material.displacementMap = doorHeightTexture
material.displacementScale = 0.1
material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorRoughnessTexture
material.normalMap = doorNormalTexture
material.normalScale.set(0.5, 0.5)
// Clearcoat
// material.clearcoat = 1
// material.clearcoatRoughness = 0

// gui.add(material, 'clearcoat').min(0).max(1).step(0.0001)
// gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.0001)

// Sheen
// material.sheen = 1
// material.sheenRoughness = 0.25
// material.sheenColor.set(1, 1, 1)

// gui.add(material, 'sheen').min(0).max(1).step(0.0001)
// gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001)
// gui.addColor(material, 'sheenColor')

// Iridescence
// material.iridescence = 1
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [ 100, 800 ]

// gui.add(material, 'iridescence').min(0).max(1).step(0.0001)
// gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.0001)
// gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1)
// gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1)

// Transmission
// material.transmission = 1
// material.ior = 1.5
// material.thickness = 0.5

// gui.add(material, 'transmission').min(0).max(1).step(0.0001)
// gui.add(material, 'ior').min(1).max(10).step(0.0001)
// gui.add(material, 'thickness').min(0).max(1).step(0.0001)

//Geometry
const sphereGeo = new THREE.SphereGeometry(0.5, 64, 64)

const sphere = new THREE.Mesh(sphereGeo, material)
scene.add(sphere)
sphere.position.set(-3,0,0)

const planeGeo = new THREE.PlaneGeometry(1, 1, 100, 100)
const plane = new THREE.Mesh(planeGeo, material)
scene.add(plane)

const torusGeo = new THREE.TorusGeometry(0.3, 0.2, 64, 128)
const torus = new THREE.Mesh(torusGeo, material)
scene.add(torus)
torus.position.set(3,0,0)

//Lights
// const lumiereAmbiante = new THREE.AmbientLight(0xffffff, 1)
// scene.add(lumiereAmbiante)

// const pointLight = new THREE.PointLight("White", 30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

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
geoTweaks.add(material, 'metalness').min(0).max(1).step(0.0001)
geoTweaks.add(material, 'roughness').min(0).max(1).step(0.0001)
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