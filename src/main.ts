import { VisibilityToggleCommand } from './commands/toggleVisibility';
import { VisibilityToggleSetting } from './settings/hiddenToggle';
import { App, Plugin, PluginSettingTab, TFolder } from 'obsidian';
import { ManageHiddenPaths as ManageHidden } from './settings/manageHiddenPaths';
import { changePathVisibility, changeElementVisibility, waitForElement } from './utils';

interface FileHiderSettings {
	hidden: boolean;
	hiddenList: string[];
};


export default class FileHider extends Plugin {
	settings: FileHiderSettings = {
		hidden: true,
		hiddenList: [],
	};

	style: CSSStyleSheet|null = null;

	checkAndApplyVisibility(app: App) {
		console.log("regex-file-hider: checkAndApplyVisibility")
		for (const file of this.app.vault.getAllLoadedFiles()) {
			const path = file.path;
			const name = file.name;
			for (const filterRegex of this.settings.hiddenList) {
				if (name.match(new RegExp(filterRegex))) {
					waitForElement(`[data-path="${path}"]`).then((e: HTMLElement) => {
						changeElementVisibility(e, this.settings.hidden);
					})
					break;
				}
			}
		};
	}

	async onload() {
		await this.loadSettings();

		this.app.workspace.onLayoutReady(() => {
			this.checkAndApplyVisibility(this.app);

			this.app.vault.on('modify', () => this.checkAndApplyVisibility(this.app))
			this.app.vault.on('create', () => this.checkAndApplyVisibility(this.app))
			this.app.vault.on('rename', () => this.checkAndApplyVisibility(this.app))
		});
		new VisibilityToggleCommand(this);
		this.addSettingTab(new FileHiderSettingsTab(this.app, this));
	};

	async loadSettings() {
		this.settings = Object.assign({}, this.settings, await this.loadData());
	};

	async saveSettings() {
		await this.saveData(this.settings);
	};

	toggleVisibility() {
		this.settings.hidden = !this.settings.hidden;
		this.checkAndApplyVisibility(this.app);
		this.saveSettings();
	};
};


class FileHiderSettingsTab extends PluginSettingTab {
	plugin: FileHider;

	constructor(app: App, plugin: FileHider) {
		super(app, plugin);
		this.plugin = plugin;
	};

	display(): void {
		const { containerEl: container } = this;

		container.empty();
		VisibilityToggleSetting.create(this.plugin, container);
		ManageHidden.create(this.plugin, container);
	};
};