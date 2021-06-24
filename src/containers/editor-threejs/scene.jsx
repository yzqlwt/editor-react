import React from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { EditorMargin } from '@common/config';

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.sceneRef = React.createRef();
    this.scene = {};
  }

  componentDidMount() {
    const { width, height, scale } = this.props;
    const node = this.sceneRef.current;
    let camera, scene, renderer;
    let cameraOrtho, sceneOrtho;

    let spriteTL, spriteTR, spriteBL, spriteBR, spriteC;

    let mapC;

    let group;

    init();
    animate();

    function init() {
      // const width2 = window.innerWidth;
      // const height = window.innerHeight;

      camera = new THREE.PerspectiveCamera(60, width / height, 1, 2100);
      camera.position.z = 1500;

      cameraOrtho = new THREE.OrthographicCamera(
        -width / 2,
        width / 2,
        height / 2,
        -height / 2,
        1,
        10
      );
      cameraOrtho.position.z = 10;

      scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x000000, 1500, 2100);

      sceneOrtho = new THREE.Scene();

      // create sprites

      const amount = 200;
      const radius = 500;

      const textureLoader = new THREE.TextureLoader();

      textureLoader.load('../.erb/img/js.png', createHUDSprites);
      const mapB = textureLoader.load('../.erb/img/js.png');
      mapC = textureLoader.load('../.erb/img/js.png');

      group = new THREE.Group();

      const materialC = new THREE.SpriteMaterial({
        map: mapC,
        color: 0xffffff,
        fog: true,
      });
      const materialB = new THREE.SpriteMaterial({
        map: mapB,
        color: 0xffffff,
        fog: true,
      });

      // for (let a = 0; a < amount; a++) {
      //   const x = Math.random() - 0.5;
      //   const y = Math.random() - 0.5;
      //   const z = Math.random() - 0.5;

      //   let material;

      //   if (z < 0) {
      //     material = materialB.clone();
      //   } else {
      //     material = materialC.clone();
      //     material.color.setHSL(0.5 * Math.random(), 0.75, 0.5);
      //     material.map.offset.set(-0.5, -0.5);
      //     material.map.repeat.set(2, 2);
      //   }

      //   const sprite = new THREE.Sprite(material);

      //   sprite.position.set(x, y, z);
      //   sprite.position.normalize();
      //   sprite.position.multiplyScalar(radius);

      //   group.add(sprite);
      // }

      scene.add(group);

      // renderer

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      renderer.autoClear = false; // To allow render overlay on top of sprited sphere

      node.appendChild(renderer.domElement);

      //

    }

    function createHUDSprites(texture) {
      const material = new THREE.SpriteMaterial({ map: texture });

      const width = material.map.image.width;
      const height = material.map.image.height;

      spriteTL = new THREE.Sprite(material);
      spriteTL.center.set(0.0, 1.0);
      spriteTL.scale.set(width, height, 1);
      sceneOrtho.add(spriteTL);

      spriteTR = new THREE.Sprite(material);
      spriteTR.center.set(1.0, 1.0);
      spriteTR.scale.set(width, height, 1);
      sceneOrtho.add(spriteTR);

      spriteBL = new THREE.Sprite(material);
      spriteBL.center.set(0.0, 0.0);
      spriteBL.scale.set(width, height, 1);
      console.log(width, height);
      spriteBL.position.set(-300,-300,1);
      sceneOrtho.add(spriteBL);

      spriteBR = new THREE.Sprite(material);
      spriteBR.center.set(1.0, 0.0);
      spriteBR.scale.set(width, height, 1);
      sceneOrtho.add(spriteBR);

      spriteC = new THREE.Sprite(material);
      spriteC.center.set(0.5, 0.5);
      spriteC.scale.set(width, height, 1);
      sceneOrtho.add(spriteC);

      updateHUDSprites();
    }

    function updateHUDSprites() {
      const width = width / 2;
      const height = window.innerHeight / 2;

      // spriteTL.position.set(0, 0, 1); // top left
      // spriteTR.position.set(width, height, 1); // top right
      // spriteBL.position.set(-width, -height, 1); // bottom left
      // spriteBR.position.set(width, -height, 1); // bottom right
      // spriteC.position.set(0, 0, 1); // center
    }



    function animate() {
      requestAnimationFrame(animate);
      render();
    }

    function render() {
      const time = Date.now() / 1000;

      // for (let i = 0, l = group.children.length; i < l; i++) {
      //   const sprite = group.children[i];
      //   const material = sprite.material;
      //   const scale = Math.sin(time + sprite.position.x * 0.01) * 0.3 + 1.0;

      //   let imageWidth = 1;
      //   let imageHeight = 1;

      //   if (material.map && material.map.image && material.map.image.width) {
      //     imageWidth = material.map.image.width;
      //     imageHeight = material.map.image.height;
      //   }

      //   sprite.material.rotation += 0.1 * (i / l);
      //   sprite.scale.set(scale * imageWidth, scale * imageHeight, 1.0);

      //   if (material.map !== mapC) {
      //     material.opacity =
      //       Math.sin(time + sprite.position.x * 0.01) * 0.4 + 0.6;
      //   }
      // }

      group.rotation.x = time * 0.5;
      group.rotation.y = time * 0.75;
      group.rotation.z = time * 1.0;

      renderer.clear();
      renderer.render(scene, camera);
      renderer.clearDepth();
      renderer.render(sceneOrtho, cameraOrtho);
    }
  }

  // componentDidUpdate() {
  //   // const { width, height, scale } = this.props;
  //   // const canvas = this.canvas.current;
  //   // const context = canvas.getContext('2d');
  //   // context.clearRect(0, 0, width, height);
  //   // this.drawImages();
  // }

  render() {
    const { width, height } = this.props;
    const styles = {
      height: height,
      width: width,
      // pointerEvents: 'none',
      transform: `translate(${EditorMargin}px, ${0}px)`,
    };
    return <div id="Scene" ref={this.sceneRef} style={styles}></div>;
  }
}

Scene.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
};

export default Scene;
