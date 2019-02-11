import {
  CylinderBufferGeometry,
  Mesh,
  MeshStandardMaterial,
  SphereBufferGeometry,
  TorusKnotBufferGeometry,
} from './vendor/three/three.module.js';


function createPlinth() {

  const geometry = new CylinderBufferGeometry( 18, 18, 1, 64, 1 );

  const material = new MeshStandardMaterial( {
    metalness: 0.1,
    roughness: 0.8,
  } );

  const plinth = new Mesh( geometry, material );

  plinth.receiveShadow = true;

  return plinth;

}

function createShapes() {

  const torusKnotGeo = new TorusKnotBufferGeometry( 3, 0.375, 64, 32, 1, 1 );
  const torusKnotMat = new MeshStandardMaterial( {
    color: 0x000000,
  } );

  const torusKnot = new Mesh( torusKnotGeo, torusKnotMat );
  torusKnot.position.set( 0, 6, 0 );

  const sphereGeo = new SphereBufferGeometry( 1.875, 32, 32 );
  const sphereMat = new MeshStandardMaterial();

  const sphere = new Mesh( sphereGeo, sphereMat );
  sphere.position.set( 1.125, 0, 0 );

  torusKnot.add( sphere );

  torusKnot.userData.onUpdate = ( delta ) => {

    torusKnot.rotation.y += delta / 2;
    torusKnot.rotation.z -= delta / 4;

  };

  sphere.castShadow = true;
  sphere.receiveShadow = true;

  torusKnot.castShadow = true;
  torusKnot.receiveShadow = true;

  return torusKnot;

}

export default function createMeshes() {

  return {

    plinth: createPlinth(),
    shapes: createShapes(),

  };

}
