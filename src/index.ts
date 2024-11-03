import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { ICommandPalette } from '@jupyterlab/apputils';
import { NotebookPanel, INotebookTracker } from '@jupyterlab/notebook';

/**
* Initialization data for the button extension.
*/
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-prolog',
  autoStart: true,
  requires: [ICommandPalette, INotebookTracker],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette, notebooks: INotebookTracker) => {
    console.log('JupyterLab extension jupyterlab-prolog is activated!');

    // Define the command to be triggered by the button
    const command = 'jupyterlab-prolog:retry';
    app.commands.addCommand(command, {
      label: 'Run Custom Code',
      execute: async () => {
        console.log('Button clicked! Running custom Prolog code...');

        // Get the current active notebook panel
        const currentWidget = app.shell.currentWidget;
        if (!(currentWidget instanceof NotebookPanel)) {
          console.error('No active notebook found.');
          alert("Please open a notebook to execute code.");
          return;
        }

        // Execute Prolog code if the notebook has a kernel
        const kernel = currentWidget.sessionContext.session?.kernel;
        if (!kernel) {
          console.error('No kernel available for the current notebook.');
          alert("The notebook has no active kernel.");
          return;
        }
        // Execute Prolog code
        const code = `jupyter:retry.`;  // Customize your Prolog code here

        await kernel.requestExecute({ code }).done;
        console.log("Prolog code executed!");
      }
    });
  }
};

export default extension;
