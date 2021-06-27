import React from 'react';
import PropTypes from 'prop-types';
import { Form, Tooltip } from 'antd';
import Input from './input';
import Checkbox from './checkbox';
import PropComponent from './prop-component';
import Property from './property';
import InspectorStyles from './inspector.css';
import InputStyles from './input.css';

function Position(props) {
  return (
    <Property label="Position" tooltip="相对父节点的位置坐标，以像素为单位">
      <span>X</span>
      <Input value={0} type="float" />
      <span>Y</span>
      <Input value={0} type="float" />
    </Property>
  );
}

function Rotation(props) {
  return (
    <Property
      label="Rotation"
      tooltip="相对父节点的旋转，以度为单位，输入正值时逆时针旋转"
    >
      <span>X</span>
      <Input value={0} type="float" />
      <span>Y</span>
      <Input value={0} type="float" />
    </Property>
  );
}

function Anchor(props) {
  return (
    <Property
      label="Anchor"
      tooltip="节点位置和旋转的基准点，(0,0)表示左下角，(1,1)表示右上角"
    >
      <span>X</span>
      <Input value={0} type="float" />
      <span>Y</span>
      <Input value={0} type="float" />
    </Property>
  );
}

function Scale(props) {
  return (
    <Property label="Scale" tooltip="节点的整体缩放比例，会影响所有子节点">
      <span>X</span>
      <Input value={0} type="float" />
      <span>Y</span>
      <Input value={0} type="float" />
    </Property>
  );
}

function Size(props) {
  return (
    <Property
      label="Size"
      tooltip="节点的内容尺寸，以像素为单位，在排版中至关重要。修改 size 不会影响子节点。"
    >
      <span>W</span>
      <Input value={0} type="float" />
      <span>H</span>
      <Input value={0} type="float" />
    </Property>
  );
}

function Opacity(props) {
  return (
    <Property
      label="Opacity"
      tooltip="节点的不透明度，会影响本节点和所有子节点上渲染组件的不透明度。"
    >
      <Input value={255} type="float" />
    </Property>
  );
}

export { Position, Rotation, Anchor, Scale, Size, Opacity };
