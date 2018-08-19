import {JupyterLab, JupyterLabPlugin} from '@jupyterlab/application';

import {IFileBrowserFactory} from '@jupyterlab/filebrowser';
import {ILauncher} from '@jupyterlab/launcher';

import * as C from './constants';

const extension: JupyterLabPlugin<void> = {
  id: `@deathbeds/jupyterlab_graphviz:launcher`,
  autoStart: true,
  optional: [ILauncher],
  requires: [IFileBrowserFactory],
  activate: (
    app: JupyterLab,
    browserFactory: IFileBrowserFactory,
    launcher?: ILauncher
  ) => {
    const {commands} = app;

    let opts = {type: 'file', ext: '.dot'};

    // Add a command for creating a new diagram file.
    commands.addCommand(C.CMD.NEW_GV, {
      label: 'Graphviz',
      iconClass: 'jp-MaterialIcon jp-GraphvizIcon',
      caption: 'Create a Graphviz Diagram.',
      execute: async () => {
        let {path} = browserFactory.defaultBrowser.model;
        let model = await commands.execute(C.CMD.NEW_DOC, {path, ...opts});
        model.content = 'graph {}';
        let res = await commands.execute(C.CMD.OPEN_DOC, {path: model.path});
        return res;
      },
    });

    if (launcher) {
      launcher.add({
        command: C.CMD.NEW_GV,
        rank: 1,
        category: 'Other',
      });
    }
  },
};

export default extension;
