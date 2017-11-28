// Listener will hook into the page, listen to keypress event on applicable
// elements and put accents to their value/textContent accordingly

// Take raw input string from user, entered keycode and an option object.
// Raw input string could be `HTMLInputElement.value`, `HTMLTextareaElement`
// or `Element.textContent`.
//
export default function listener (doc, win) {
  if (!win.getSelection) { throw new Error('Your browser does not support `window.getSelection` function, which YANIM deeply depends on.') }
}
