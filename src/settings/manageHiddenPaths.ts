import { Setting } from "obsidian";
import FileHider from "../main";
import { HiddenPathsModal } from "../modals/HiddenList";


export class ManageHiddenPaths {
	public static create(plugin: FileHider, container: HTMLElement) {
		return new Setting(container)
		.setName(`Filter RegEx`)
		.setDesc(`Add or remove RegExs from the list that are being hidden`)
		.addButton(b => {
			b.setButtonText(`Manage`)
			.onClick(event => {
				if (!event.isTrusted) { return }

				new HiddenPathsModal(plugin).open()
			});
		});
	};
};