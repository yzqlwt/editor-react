import ReactDOM from 'react-dom';
import React, { FC } from 'react';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import './index.global.css';
import Editor from './containers/editor/index';
import Hierarchy from './containers/hierarchy/index';
import Assets from './containers/assets/index';
import Inspector from './containers/inspector/index';
import NodeLibrary from './containers/library/index';

class ReflexStorageDemo extends React.Component {
  constructor(props) {
    super(props);
    this.layoutState = this.getLayoutState();
  }

  getLayoutState = () => {
    const item = window.localStorage.getItem('layout-flex');
    if (item) {
      return JSON.parse(item);
    }
    return {
      LeftContainer: 0.15,
      CenterContainer: 0.7,
      RightContainer: 0.15,
      HierarchyContainer: 0.5,
      EditorContainer: 0.7,
    };
  };

  onResizePane = (event) => {
    const { name, flex } = event.component.props;
    this.layoutState[name] = flex;
    window.localStorage.setItem(
      'layout-flex',
      JSON.stringify(this.layoutState)
    );
  };

  render() {
    return (
      <ReflexContainer orientation="vertical">
        <ReflexElement flex={this.layoutState.LeftContainer}>
          <ReflexContainer orientation="horizontal">
            <ReflexElement
              flex={this.layoutState.HierarchyContainer}
              onResize={this.onResizePane}
              name="HierarchyContainer"
              className="pane"
            >
              <Hierarchy></Hierarchy>
            </ReflexElement>
            <ReflexSplitter id="gray" />
            <ReflexElement className="pane">
              <Assets></Assets>
            </ReflexElement>
          </ReflexContainer>
        </ReflexElement>
        <ReflexSplitter id="gray" />
        <ReflexElement
          flex={this.layoutState.CenterContainer}
          name="CenterContainer"
        >
          <ReflexContainer orientation="horizontal">
            <ReflexElement
              flex={this.layoutState.EditorContainer}
              onResize={this.onResizePane}
              name="EditorContainer"
              className="pane"
              propagateDimensionsRate={200}
              propagateDimensions={true}
            >
              <Editor></Editor>
            </ReflexElement>
            <ReflexSplitter id="gray" />
            <ReflexElement className="pane">
              <NodeLibrary></NodeLibrary>
            </ReflexElement>
          </ReflexContainer>
        </ReflexElement>
        <ReflexSplitter id="gray" />
        <ReflexElement
          flex={this.layoutState.RightContainer}
          onResize={this.onResizePane}
          className="pane"
          minSize={200}
          name="RightContainer"
        >
          <Inspector></Inspector>
        </ReflexElement>
      </ReflexContainer>
    );
  }
}

ReactDOM.render(<ReflexStorageDemo />, document.getElementById('root'));
