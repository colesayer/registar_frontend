import React, { Component } from 'react';
import * as THREE from 'three';
import TrackballControls from '../ref/trackball.js'

class ThreeGallery extends Component{


  componentDidMount(){
    console.log("we're in")


  //CREATE CANVAS
  this.canvas = document.createElement('div')
  this.canvas.setAttribute("id", "Canvas")

  this.canvasContainer = document.getElementById('CanvasContainer')
  this.canvasContainer.appendChild(this.canvas)

  this.canvasArea = this.canvas.getBoundingClientRect()


  //FOR USER DIMS
  const dimX = 450
  const dimY = 873
  const dimZ = 1000


  //RENDERER
  const renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setClearColor(0xffffff, 1)
    renderer.setSize(this.canvasArea.width, this.canvasArea.height);
    renderer.domElement.style.zIndex = 5;
    this.canvas.appendChild(renderer.domElement);

  //CAMERA
  const camera = new THREE.PerspectiveCamera(50, this.canvasArea.width / this.canvasArea.height, 1, 100000);
    camera.position.set(0, 0, 300)
    // camera.up = new THREE.Vector3(0,0,0)
    // camera.lookAt(new THREE.Vector3(0, 0, 0))


  //CONTROLS
  const controls = new TrackballControls(camera, this.canvas);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.0;
    controls.panSpeed = 1.0;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.3;

  //SCENE
  const scene = new THREE.Scene();

  //LIGHT1
  const keyLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(keyLight);

  //LIGHT2
  const pointLight = new THREE.PointLight(0xffffff, 0.5)
    pointLight.position.set(0, 0, 500)
    scene.add(pointLight);

  //CUBE OBJECT
  const cubeGeometry = new THREE.BoxGeometry(100, 100, 100) //maybe CubeGeometry
  const cubeMaterial = new THREE.MeshLambertMaterial({color: "#9eb8e2"});
  const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
      cubeMesh.position.set(0, 250, 0)
      scene.add(cubeMesh)

  //GALLERY OBJECT
  // const galleryGeometry = new THREE.BoxGeometry(750, 750, 750)
  // const galleryMaterial = new THREE.MeshLambertMaterial({color: "#9eb8e2"})
  // const galleryMesh = new THREE.Mesh(galleryGeometry, galleryMaterial)
  //   galleryMesh.position.set(0, 0, 0)
  //   scene.add(galleryMesh)

  // instantiate a loader
  var loader = new THREE.ImageLoader();
    loader.setCrossOrigin('use-credentials');

  // load a image resource
  loader.load(
  	// resource URL
  	'textures/skyboxsun25degtest.png',
  	// Function when resource is loaded
  	function ( image ) {
  		// do something with it
      console.log("heeeelp")
  		// like drawing a part of it on a canvas
  		var canvas = document.createElement( 'canvas' );
  		var context = canvas.getContext( '2d' );
  		context.drawImage( image, 100, 100 );
  	},
  	// Function called when download progresses
  	function ( xhr ) {
  		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
  	},
  	// Function called when download errors
  	function ( xhr ) {
  		console.log( 'An error happened' );
  	}
  );




  // Floor
  // const floorMaterial = new THREE.MeshPhongMaterial()
  // floorMaterial.map = THREE.ImageUtils.loadTexture
  //             ("http://images.all-free-download.com/images/graphicthumb/grain_hd_photo_1_169151.jpg")
  const theFloor = new THREE.Mesh( new THREE.PlaneGeometry( dimX, dimY), new THREE.MeshBasicMaterial({color: "#42f45f" }) );
      theFloor.position.y = 0;
      theFloor.rotation.x = - Math.PI / 2;
      //theFloor.side = THREE.DoubleSide;
      scene.add( theFloor );

  const wallMaterial = new THREE.MeshLambertMaterial({color: "#42f45f" })

  var degra = (degree) => {
    return degree*(Math.PI/180);
  }


  //LEFT WALL
  const leftWall = new THREE.Mesh( new THREE.PlaneGeometry( dimY, dimZ ), wallMaterial );
         leftWall.side = THREE.DoubleSide;
         leftWall.position.y =  (dimZ/2);
         leftWall.position.x = -(dimX/2);
         leftWall.rotation.y = degra(90);
         scene.add( leftWall );

   //RIGHT WALL
   const rightWall = new THREE.Mesh( new THREE.PlaneGeometry( dimY, dimZ), wallMaterial );
       rightWall.side = THREE.DoubleSide;
       rightWall.position.y =  (dimZ/2);
       rightWall.position.x =  (dimX/2);
       rightWall.rotation.y =  - Math.PI / 2;
       scene.add( rightWall );

    //FAR WALL
    const farWall = new THREE.Mesh( new THREE.PlaneGeometry( dimX, dimZ ), wallMaterial );
         farWall.side = THREE.DoubleSide;
         farWall.position.y =   (dimZ/2);
         farWall.position.x =   0;
         farWall.position.z =  -(dimY/2);
         farWall.rotation.x = - degra(0);
         scene.add( farWall );

    //NEAR WALL
    // const nearWall = new THREE.Mesh( new THREE.PlaneGeometry( dimX, dimZ), wallMaterial );
    //      nearWall.side = THREE.DoubleSide;
    //      nearWall.position.y =   (dimZ/2);
    //      nearWall.position.x =   0;
    //      nearWall.position.z =   (dimY/2);
    //      nearWall.rotation.x = - degra(0);
    //      scene.add( nearWall );


  //RENDER LOOP
  requestAnimationFrame(render);

  function render(){
    // cubeMesh.rotation.y += 0.01;
    // cubeMesh.rotation.x += 0.01;
    controls.update()
    renderer.render(scene, camera);
    requestAnimationFrame(render);

    }


    //IMAGE UPLOAD TO USE LATER
  //   <input name="file" type="file"
  //  class="file-upload" data-cloudinary-field="image_id"
  //  data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"/>

  }

  render(){
    return(
      <div></div>
    )
  }
}

export default ThreeGallery
