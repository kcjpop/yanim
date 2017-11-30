const m = require('mithril')

const App = function(vnode) {
  const view = () => {
    return m('.mw8.center.pa3', m('h1.f2', 'Enter text below'), m('textarea.serif.w-100.h5'))
  }

  return { view }
}

m.mount(document.body, App)
