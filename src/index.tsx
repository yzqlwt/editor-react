import ReactDOM from 'react-dom';
import React, { FC } from 'react';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import './index.global.css';
import Editor from './editor/index';
interface ReflexStorageDemoProps {}

interface LayoutContainer {
  LeftContainer: number;
  CenterContainer: number;
  RightContainer: number;
  HierarchyContainer: number;
  EditorContainer: number;
}
class ReflexStorageDemo extends React.Component {
  layoutState: LayoutContainer;

  constructor(props: FC<ReflexStorageDemoProps>) {
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
      LeftContainer: 0.15,
      CenterContainer: 0.7,
      RightContainer: 0.15,
      HierarchyContainer: 0.5,
      EditorContainer: 0.7,
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
        <ReflexElement flex={this.layoutState.LeftContainer}>
          <ReflexContainer orientation="horizontal">
            <ReflexElement
              flex={this.layoutState.HierarchyContainer}
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
        <ReflexElement flex={this.layoutState.CenterContainer}>
          <ReflexContainer orientation="horizontal">
            <ReflexElement
              flex={this.layoutState.EditorContainer}
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
          flex={this.layoutState.RightContainer}
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
