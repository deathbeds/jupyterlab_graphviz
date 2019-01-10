import {IRenderMime} from '@jupyterlab/rendermime-interfaces';
import * as C from './constants';
import {rendererFactory} from '.';

const extensions = Object.keys(C.TYPES).map((k) => {
  const name = C.TYPES[k].name;
  return {
    id: `@deathbeds/jupyterlab_graphviz:${name}`,
    name,
    rendererFactory,
    rank: 0,
    dataType: 'string',
    fileTypes: [
      {
        name,
        extensions: C.TYPES[k].extensions,
        mimeTypes: [k],
        iconClass: 'jp-MaterialIcon jp-GraphvizIcon',
      },
    ],
    documentWidgetFactoryOptions: {
      name,
      primaryFileType: name,
      fileTypes: [name],
      defaultFor: [name],
    },
  } as IRenderMime.IExtension;
});

export default extensions;
