import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, Command, Hotkey, MarkdownFileInfo } from 'obsidian';

class AddCheckbox implements Command {
	id: string = "checkbox-button-add";
	name: string = "'Add Checkbox'";
	icon?: string | undefined = "checkbox-glyph";
	editorCallback?: ((editor: Editor, ctx: MarkdownView | MarkdownFileInfo) => any) | undefined = (editor: Editor, view: MarkdownView) => {
		editor.replaceSelection('- [ ] ');
	};
}

export default class AddCheckboxPlugin extends Plugin {
	ribbonIconEl: HTMLElement;

	async onload() {
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand(new AddCheckbox());

		// This creates an icon in the left ribbon.
		this.ribbonIconEl = this.addRibbonIcon('checkbox-glyph', 'Add Checkbox', (evt: MouseEvent) => {
			const view = this.app.workspace.getActiveViewOfType(MarkdownView);
			if (view) {
				view.editor.replaceSelection('- [ ] ');
			}
		});
	}

	onunload() {
		this.removeCommand(new AddCheckbox().id);
		this.ribbonIconEl.remove();
	}
}
