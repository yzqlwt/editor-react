import ReactDOM from 'react-dom';
import React, { FC }from 'react';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import './index.global.css';
import Editor from './editor/index';
interface ReflexStorageDemoProps {

}

type LayoutContainer = {
  LeftContainer: 0.15;
  CenterContainer: 0.75;
  RightContainer: 0.2;
  HierarchyContainer:0.5;
  EditorContainer: 0.7;
}
class ReflexStorageDemo extends React.Component {
  constructor(props:FC<ReflexStorageDemoProps>) {
    super(props);
    this.onResizePane = this.onResizePane.bind(this);
    this.layoutState = this.getLayoutState();
  }

  getLayoutState() {
    const item = window.localStorage.getItem('layout-flex');

    if (item) {
      return JSON.parse(item);
    }
    return {
      left: {
        flex: 0.15,
      },
      center: {
        flex: 0.75,
      },
      hierarchy: {
        flex: 0.5,
      },
      editor: {
        flex: 0.7,
      },
      component: {
        flex: 0.3,
      },
      inspector: {
        flex: 0.2,
      },
    };
  }

  onResizePane(event) {
    const { name, flex } = event.component.props;
    this.layoutState[name].flex = flex;
    window.localStorage.setItem(
      'layout-flex',
      JSON.stringify(this.layoutState)
    );
  }

  render() {
    return (
      <ReflexContainer orientation="vertical">
        <ReflexElement flex={this.layoutState.left.flex}>
          <ReflexContainer orientation="horizontal">
            <ReflexElement
              flex={this.layoutState.hierarchy.flex}
              onResize={this.onResizePane}
              name="hierarchy"
            >
              <div className="pane-content">
                <label>层级管理器</label>
              </div>
            </ReflexElement>

            <ReflexSplitter id="gray" />

            <ReflexElement className="bottom-pane">
              <div className="pane-content">
                <label>资源管理器</label>
              </div>
            </ReflexElement>
          </ReflexContainer>
        </ReflexElement>
        <ReflexSplitter id="gray" />
        <ReflexElement flex={this.layoutState.left.center}>
          <ReflexContainer orientation="horizontal">
            <ReflexElement
              flex={this.layoutState.editor.flex}
              onResize={this.onResizePane}
              name="editor"
              propagateDimensionsRate={200}
              propagateDimensions={true}
            >
              <Editor></Editor>
            </ReflexElement>
            <ReflexSplitter id="gray" />
            <ReflexElement className="bottom-pane">
              <div className="pane-content">
                <label>组件库</label>
              </div>
            </ReflexElement>
          </ReflexContainer>
        </ReflexElement>
        <ReflexSplitter id="gray" />
        <ReflexElement
          flex={this.layoutState.inspector.flex}
          onResize={this.onResizePane}
          className="right-pane"
          name="inspector"
        >
          <div className="pane-content">
            <label>属性面板</label>
          </div>
        </ReflexElement>
      </ReflexContainer>
    );
  }
}

ReactDOM.render(<ReflexStorageDemo />, document.getElementById('root'));
