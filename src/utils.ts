export function changePathVisibility(path: string, hide: boolean) {
	let n = document.querySelector(`[data-path="${path}"]`);
	if (!n) {
        console.warn("regex-file-hider: Element not found")
		return;
	};
	let p = n.parentElement
	if (hide) {
		p.style.display = `none`
	} else {
		p.style.display = ``;
	};
};

export function changeElementVisibility(n: HTMLElement, hide: boolean) {
	if (!n) {
        console.warn("regex-file-hider: Element not found")
		return;
	};
	let p: HTMLElement = n; //.parentElement;
	if (hide) {
		p.style.display = `none`
	} else {
		p.style.display = ``;
	};
}

export function waitForElement(selector: string) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}