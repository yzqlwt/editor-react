import React from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { EditorMargin } from '@common/config';

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.sceneRef = React.createRef();
    this.camera = {};
    this.renderer = {};
    this.scene = {};
  }

  componentDidMount() {
    const { width, height } = this.props;
    const node = this.sceneRef.current;
    const camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      1,
      2000
    );
    camera.position.z = 10;
    this.camera = camera;
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.autoClear = true; // To allow render overlay on top of sprited sphere
    node.appendChild(renderer.domElement);
    this.renderer = renderer;
    this.scene = scene;
  }

  componentDidUpdate() {
    const { width: CanvasWidth, height: CanvasHeight, scale } = this.props;
    const { camera, renderer, scene } = this;
    scene.children.every((child) => scene.remove(child));
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('../.erb/img/js.png', (texture) => {
      const material1 = new THREE.SpriteMaterial({
        map: texture,
        rotation: (90 * Math.PI) / 180,
      });
      const { width, height } = texture.image;
      const sprite = new THREE.Sprite(material1);
      sprite.center.set(0.5, 0.5);
      sprite.scale.set(width * scale, height * scale, 1);
      sprite.position.set(0 - CanvasWidth / 2, 0 - CanvasHeight / 2, 1);
      scene.add(sprite);
      renderer.render(scene, camera);
    });
  }

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
