const m = require('mithril')
const Processor = require('./processor')
const Engine = require('./engine')
const { isMetaKey } = require('./utils')

const App = function(vnode) {
  const engine = Engine({ inputMethod: 'VNI' })
  const processor = Processor(engine)

  const onkeypress = e => {
    !isMetaKey(e.key) && e.preventDefault()

    const res = processor.process(e.target.value, e.key)
    vnode.state.value = res
  }

  const view = () => {
    return m(
      '.mw8.center.pa3',
      m('h1.f2', 'Textarea'),
      m('textarea.system-sans-serif.w-100.h5', { onkeypress, value: vnode.state.value })
    )
  }

  return { view }
}

m.mount(document.body, App)
