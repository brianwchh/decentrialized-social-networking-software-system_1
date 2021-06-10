import WangEditor from 'wangeditor'
import createKityformula from './kityformula'


export default class KityformulaMenu extends WangEditor.PanelMenu {


    // 公式输入插件
    constructor (editors) {
      const $elem = WangEditor.$(
        `<div class="w-e-menu">
            <style>
              .w-e-menu .mathsvgIcon {
                  width: 30px;
                  height: 30px;
                  filter: invert(61%) sepia(12%) saturate(12%) hue-rotate(346deg) brightness(92%) contrast(89%);
              }

              .mathsvgIcon:hover {
                  filter: invert(34%) sepia(77%) saturate(347%) hue-rotate(71deg) brightness(91%) contrast(92%);
              }
            </style>
            <img src="/kityformula/assets/images/ftfunct.svg" class="mathsvgIcon iconfont"/>
        </div>

        `
      )
      super($elem, editors)
    }

    // 菜单点击事件
    clickHandler () {
      // 做任何你想做的事情
      // 可参考【常用 API】文档，来操作编辑器
      const conf = createKityformula(window.editor)
      const panel = new WangEditor.Panel(this, conf)
      panel.create()
    }

    tryChangeActive () {}
  }




