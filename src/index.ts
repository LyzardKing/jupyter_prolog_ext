import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { ICommandPalette } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';
import { NotebookPanel, INotebookTracker } from '@jupyterlab/notebook';

/**
* Initialization data for the button extension.
*/
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_prolog',
  autoStart: true,
  requires: [ICommandPalette, INotebookTracker],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette, notebooks: INotebookTracker) => {
    console.log('JupyterLab extension jupyterlab_prolog is activated!');

    // Check if the button already exists to avoid duplicates
    const buttonId = 'prolog-retry-button';
    if (document.getElementById(buttonId)) {
      console.log('Button already exists, skipping creation.');
      return;
    }
    // Create a button widget
    const button = new Widget();
    button.node.textContent = 'Retry';
    button.id = buttonId;

    // Append to JupyterLab's toolbar
    app.shell.add(button, 'top'); // or 'left', 'right', etc. for other locations

    // Event listener for button click
    button.node.addEventListener('click', async () => {
      console.log('Button clicked! Running custom Prolog code...');

      // Get the current active notebook panel
      const currentWidget = app.shell.currentWidget;
      if (!(currentWidget instanceof NotebookPanel)) {
        console.error('No active notebook found.');
        alert("Please open a notebook to execute code.");
        return;
      }

      // Execute Python code if the notebook has a kernel
      const kernel = currentWidget.sessionContext.session?.kernel;
      if (!kernel) {
        console.error('No kernel available for the current notebook.');
        alert("The notebook has no active kernel.");
        return;
      }      // Execute Prolog code
      const code = `jupyter:retry.`;  // Customize your Prolog code here

      await kernel.requestExecute({ code }).done;
      console.log("Prolog code executed!");
    });
  }
};

export default extension;
