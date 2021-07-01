import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal } from 'antd';

const { app, dialog } = window.require('electron').remote;

class Index extends React.Component {
  componentDidMount() {
    Modal.destroyAll();
    Modal.info({
      title: '创建Skin',
      content: '选择一个文件夹,并在此创建新的skin',
      okText: '确认',
      onOk: () => {
        this.openDialog();
      },
    });
  }

  async openDialog() {
    const { dispatch, history } = this.props;
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory'],
      defaultPath: app.getPath('documents'),
    });
    const { canceled, filePaths } = result;
    if (canceled) {
      this.openDialog();
    } else {
      // window.localStorage.setItem('workspace', filePaths[0]);
      dispatch({
        type: 'workspace',
        workspace: filePaths[0],
      });
      dispatch({
        type: 'topic',
        topic: null,
      });
      history.push('/app');
    }
  }

  render() {
    return <div />;
  }
}

Index.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

function stateToProps() {
  return {};
}

export default withRouter(connect(stateToProps)(Index));
