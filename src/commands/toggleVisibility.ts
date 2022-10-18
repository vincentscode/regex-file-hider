import FileHider from "../main";

export class VisibilityToggleCommand {
	constructor(plugin: FileHider) {
		plugin.addCommand({
			id: 'vs-rfh-toggle-visibility',
			name: 'Toggle Visibility',
			callback: () => {
				plugin.toggleVisibility();
			}
		});
	};
}