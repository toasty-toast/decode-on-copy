const MAX_DECODE_ATTEMPTS = 5;

/**
 * Returns the text that is currently selected in the window.
 */
function getSelectedText() {
	// Textareas don't work with window.getSelection() and must be handled differently.
	// There may be other elements that need special handling like this.
	if (document.activeElement.tagName.toLocaleLowerCase() === 'textarea') {
		var textArea = document.activeElement;
		return textArea.value.substring(textArea.selectionStart, textArea.selectionEnd);
	}
	if (window.getSelection) {
		return window.getSelection().toString();
	} else if (document.selection && document.selection.type != 'Control') {
		return document.selection.createRange().text;
	}
}

/**
 * Checks whether a string is a valid URL.
 * 
 * @param  {string} str The string to validate as a URL.
 */
function isValidURL(str) {
	return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(str);
}

/**
 * Checks whether a string is a valid base 64 value.
 * 
 * @param  {string} str The string to test for base 64 characters.
 */
function isBase64(str) {
	return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(str);
}

/**
 * Handles the document copy event and attempts to base 64 decode the text selected in the window.
 * 
 * @param  {ClipboardEvent} e The ClipboardEvent associated with the copy event.
 */
function onCopy(e) {
	var data = getSelectedText().trim();
	for (var i = 0; i < MAX_DECODE_ATTEMPTS; i++) {
		if (!isBase64(data)) {
			break;
		}
		data = atob(data);
		if (isValidURL(data)) {
			e.clipboardData.setData('text/plain', data);
			e.preventDefault();
			break;
		}
	}
}

document.addEventListener('copy', onCopy);
