class Caption {
  constructor(label, src, src_lang = 'en') {
    this._label = label
    this._src = src
    this._src_lang = src_lang
  }

  get label() {
    return this._label
  }

  get src() {
    return this._src
  }

  get srcLang() {
    return this._src_lang
  }
}

export default Caption
