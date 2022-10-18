import { Setting } from "obsidian";
import FileHider from "../main";

export class VisibilityToggleSetting {
	public static create(plugin: FileHider, container: HTMLElement) {
		return new Setting(container)
		.setName(`Matched File Visibility`)
		.setDesc(`Toggle whether or not matched files and folders will be hidden or not.`)
		.addToggle(toggle => {
			toggle
			.setValue(!plugin.settings.hidden)
			.onChange(() => {
				plugin.toggleVisibility();
			});
		});
	};
};