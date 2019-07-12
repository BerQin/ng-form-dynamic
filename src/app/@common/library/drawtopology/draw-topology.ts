import * as DrawType from './draw-interface';
import './drawTopology.css';

let DrawTop = {
  init: () => {
    this.version = '1.0.0-bata';
  },
  error: (str) => {
    // alert(str);
  },
  theme: {
    type: 'rect',
    width: 150,
    height: 30,
    strokeStyle: '#0099cc',
    lineWidth: 1,
    fillStyle: '#fff',
    fillArcStyle: '#fff',
    hoverFillArcStyle: '#fff',
    strokeArcStyle: '#ccc',
    hoverStrokeArcStyle: '#81e874',
    textColor: '#333',
    x: 0,
    y: 0,
    arcWidth: 3,
    arclineWidth: 2,
    hoverArcWidth: 4,
    hoverArclineWidth: 2,
    centerText: '[绘图]',
    centerTextColor: '#333',
    lineStrokeStyle: '#0099cc',
    lineLineWidth: 1,
    hoverLineStrokeStyle: '#21baed',
    hoverLineLineWidth: 2,
  },
  setTheme: (json) => {
    for (const i in this.theme) {
      if (i in this.theme) {
        this.theme[i] = json[i] || this.theme[i];
      }
    }
  },
  Nrepetitive: () => {
    let ary: Array<any>;
    ary = [];
    const len = this.length;
    for (let i = 0; i < len; i++) {
      if (this[i] !== this[i - 1]) {
        ary.push(this[i]);
      }
    }
    return ary;
  },
  Stage: null,
  Link: null,
  Node: null,
};

DrawTop.Stage = function (id, config) {
  function css(obj, json) {
    for (const i in json) {
      if (i in json) {
        obj.style[i] = json[i];
      }
    }
  }

  this.__proto__ = {
    initialize: function (id: any, config: any) {
      const creatStyle: any = document.createElement('style');
      const csstext = `.DrawTop-Menu-box{
        position: fixed;
        top: 0;
        left: 0;
        display: none;
        padding:5px 15px;
        border:1px solid #ccc;
        box-shadow:0 0 5px 0 #ccc;
        z-index:30;
        min-width: 60px;
        background: #fff;
      }
      .DrawTop-Menu-box a{
          display: block;
        color:#333;
        font-size:14px;
        text-align:center;
        text-decoration:none;
          padding:3px 0;
      }
      .DrawTop-Title-box{
          position: fixed;
          top: 0;
          left: 0;
          width: auto;
          display: none;
          padding:3px 6px;
          border:1px solid #ccc;
          box-shadow:0 0 5px 0 #ccc;
          color:#333;
          z-index:25;
          font-size: 12px;
          background: #fff;
      }`;
      if (creatStyle.styleSheet) {// IE
        creatStyle.styleSheet.cssText = csstext;
      } else {// w3c
        const cssText = document.createTextNode(csstext);
        creatStyle.appendChild(cssText);
      }
      document.getElementsByTagName('head')[0].appendChild(creatStyle);
      this.config = config || {};
      if (toString.apply(id) == '[object Object]') {
        this.config = id;
      } else {
        this.config.id = id;
      }
      Object.defineProperty(this, 'id', { value: (new Date).getTime() });
      this.canvasBox = document.getElementById(this.config.id);
      this.canvas = document.createElement('canvas');
      css(this.canvasBox, {
        position: 'relative',
        top: 0,
        left: 0,
        overflow: 'auto',
      });
      css(this.canvas, {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
        backgroundColor: 'rgba(255,255,255,0)',
      });
      this.canvasBox.appendChild(this.canvas);
      this.canvas.width = this.canvasBox.clientWidth;
      this.canvas.height = this.canvasBox.clientHeight;
      this.contextCont = this.canvas.getContext('2d');
      this.childs = [];
      this.scale = { x: 1, y: 1 };
      this.translate = { x: 0, y: 0 };
      this.origin = { x: 0, y: 0 };
      this.offset = this.offSet(this.canvas) || 0;
      this.Event = {};
      this.MenuConfig = this.config.Menu || {};
      this.viewConfig = this.config.view || {};
      this.Menu = this.initMenu();
      this.Title = this.initTitle();
      this.config.icon = this.config.icon || {};
      this.config.nodeEvent = this.config.nodeEvent || {};
      this.hoverEvent = this.config.nodeEvent.hoverEvent;
      this.clickEvent = this.config.nodeEvent.clickEvent;
      this.doLink = this.config.doLink || {};
      this.getImageIcon();
      this.init();
      return this;
    },
    getImageIcon: function () {
      var IconList = ['edit'];
      IconList.push(...Object.keys(this.config.icon));
      var Img = {
        edit: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMHB4IiB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAwIDIwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBmaWxsPSIjMzVBQjUxIiBkPSJNMTc1LDE1NWgtMTVWNzBsLTEwLDEwdjc1SDU3TDE2Niw0MWwtNy03TDUwLDE0Ny41VjU1aDcwbDktMTBINTBWMzBjMC0zLTItNS01LTVzLTUsMi41LTUsNXYxNUgyNQ0KCWMtMywwLTUsMi01LDVzMiw1LDUsNWgxNXYxMTBoMTEwdjE1YzAsMywyLDUsNSw1czUtMiw1LTV2LTE1aDE1YzMsMCw1LTIsNS01QzE4MCwxNTcuNSwxNzgsMTU1LDE3NSwxNTV6Ii8+DQo8L3N2Zz4NCg=='
      };
      Img = Object.assign({}, Img, this.config.icon);
      this.ImageIcon = {};
      for (var i = 0; i < IconList.length; i++) {
        var item = IconList[i];
        this.ImageIcon[item] = new Image();
        this.ImageIcon[item].src = Img[item];
      }
    },
    initMenu: function () {
      let result;
      result = document.createElement('div');
      result.setAttribute('id', 'DrawTopMenuBox');
      result.setAttribute('class', 'DrawTop-Menu-box');
      this.canvasBox.appendChild(result);
      return result;
    },
    initTitle: function () {
      let result;
      result = document.createElement('div');
      result.setAttribute('id', 'DrawTopTitleBox');
      result.setAttribute('class', 'DrawTop-Title-box');
      this.canvasBox.appendChild(result);
      return result;
    },
    HTMLhide: function (obj) {
      obj.innerHTML = '';
      css(obj, {
        display: 'none',
      });
    },
    HTMLshow: function (e, obj) {
      css(obj, {
        display: 'block',
        left: e.x + 10 + 'px',
        top: e.y + 10 + 'px',
      });
    },
    init: function () {
      let tempthis = this;
      let startX = null;
      let startY = null;
      let startWs = null;
      let startHs = null;
      let isInGraphJson = null;
      let isMousDown = false;
      let lastLinkPoints = null;
      let lastLink = null;
      let moveLineobj = null;
      let isClick = false;
      let btn = null;
      let triggerObj = null;
      let startObjX = null;
      let startObjY = null;
      let startTranslate = null;
      let wheelDelta = { x: 0, y: 0 };
      let timmer = null;
      let lastObj = null;
      let idDblclick = false;
      let CanvasIsClick = false;
      let linkPoints: DrawType.DrawLinkPoints = {};
      let clickType = ['dblclick'];
      for (let i = 0; i < clickType.length; i++) {
        addEvent(clickType[i], this.canvas, canvasEvent);
      }

      function canvasEvent(e) {
        e.stopPropagation();
        const json: DrawType.DrawIsInGraph = isInGraph(e);
        if (json.ispass) {
          e.Stage = tempthis;
          e.triggerDrawNode = json.obj;
          json.obj[e.type] && json.obj[e.type](e);
          if (e.type == 'dblclick' && json.obj[e.type]) {
            idDblclick = true;
          }
        }
        e.preventDefault();
      }

      // addEvent('scroll', document, documentScroll);
      addEvent('mousedown', this.canvas, canvasmousedown);
      addEvent('mouseup', this.canvas, canvasmouseup);
      addEvent('mousemove', this.canvas, canvasmousemove);
      addEvent('contextmenu', this.canvas, canvasmenu);
      addEvent('click', this.Menu, menuEvent);
      if (this.detectionBrowser() == 'FIREFOX') {
        addEvent('DOMMouseScroll', this.canvas, canvasmousewheel);
      } else {
        addEvent('mousewheel', this.canvas, canvasmousewheel);
      }
      this.viewConfig.resize = this.viewConfig.resize || true;
      this.viewConfig.resize && addEvent('resize', window, viewResize);

      function menuEvent(e) {
        if (e.target.nodeName == 'A') {
          let id = e.target.getAttribute('data-DrawTopMenuListid');
          if (tempthis.MenuConfig.btn && tempthis.MenuConfig.btn[triggerObj.type]) {
            let btn = tempthis.MenuConfig.btn[triggerObj.type];
            btn.map(function (item, index) {
              if (item.id == id) {
                e.Stage = tempthis;
                e.triggerDrawNode = triggerObj;
                item[e.type] && item[e.type](e);
              }
            });
            tempthis.HTMLhide(tempthis.Menu);
          }
        }
      }

      function viewResize(e) {
        tempthis.reloadsize();
      }

      /**
       * translate node 偏移量
       * origin 原点位置
       * @param e
       */
      function canvasmousewheel(e) {
        e.stopPropagation();
        e.preventDefault();
        let windowscroll = tempthis.scroll(tempthis.canvas);
        let detail = e.wheelDelta ? e.wheelDelta : -(e.detail);
        if (detail < 0) {
          tempthis.scale.x /= 1.1;
          tempthis.scale.y /= 1.1;
          tempthis.scale.x = tempthis.scale.x < 0.3 ? 0.3 : tempthis.scale.x;
          tempthis.scale.y = tempthis.scale.y < 0.3 ? 0.3 : tempthis.scale.y;
        } else {
          tempthis.scale.x *= 1.1;
          tempthis.scale.y *= 1.1;
          tempthis.scale.x = tempthis.scale.x > 5 ? 5 : tempthis.scale.x;
          tempthis.scale.y = tempthis.scale.y > 5 ? 5 : tempthis.scale.y;
        }
        if (e.x != tempthis.origin.x || e.y != tempthis.origin.y) {
          tempthis.translate.x -= (e.x - tempthis.offset.left - tempthis.origin.x + windowscroll.left) / tempthis.scale.x;
          tempthis.translate.y -= (e.y - tempthis.offset.top - tempthis.origin.y + windowscroll.top) / tempthis.scale.y;
          tempthis.origin.x = e.x - tempthis.offset.left + windowscroll.left;
          tempthis.origin.y = e.y - tempthis.offset.top + windowscroll.top;
        }
        tempthis.reloadsize();
      }

      function canvasmenu(e) {
        e.stopPropagation();
        e.preventDefault();
        isInGraphJson = isInGraph(e) || {};
        if (!isInGraphJson.obj) {
          return false;
        }
        triggerObj = isInGraphJson.obj;
        tempthis.Menu.innerHTML = '';
        if (tempthis.MenuConfig.btn && tempthis.MenuConfig.btn[isInGraphJson.type]) {
          let btn = tempthis.MenuConfig.btn[isInGraphJson.type];
          btn.map(function (item, index) {
            if (item.dataKay) {
              if (!(isInGraphJson.obj.dataValue[item.dataKay] == true)) {
                return false;
              }
            }
            let a = document.createElement('a'), id = (new Date).getTime() + '' + Math.floor(Math.random() * 10000);
            a.setAttribute('href', 'javascript:;');
            a.setAttribute('data-DrawTopMenuListid', id);
            a.setAttribute('draggable', 'false');
            item.id = id;
            a.innerHTML = item.name;
            a.className = item.className;
            tempthis.Menu.appendChild(a);
          });
          tempthis.HTMLshow(e, tempthis.Menu);
        }
      }

      function documentScroll(e) {
        isInGraphJson = null;
        tempthis.HTMLhide(tempthis.Menu);
      }

      function canvasmousedown(e) {
        css(tempthis.Menu, {
          top: 0,
          left: 0,
          display: 'none',
        });
        isInGraphJson = isInGraph(e) || {};
        isMousDown = true;
        startX = e.x;
        startY = e.y;
        if (isInGraphJson.type) {
          startObjX = isInGraphJson.obj.x;
          startObjY = isInGraphJson.obj.y;
          isClick = true;
          // if (isInGraphJson.type != 'line' && isInGraphJson.type != 'linkPoints') {
          isInGraphJson.obj.saveLocal = {
            x: isInGraphJson.obj.x,
            y: isInGraphJson.obj.y,
          };
          // }
        } else {
          startTranslate = { x: tempthis.translate.x, y: tempthis.translate.y };
          CanvasIsClick = true;
        }
        btn = e.button;
        if (e.button == 0) {

        } else if (e.button == 2) {

        } else if (e.button == 1) {

        }
      }

      function rectaddLine(json: any, spotA, spotB, spotC, spotD, path2d) {
        if (typeof (isInGraphJson.obj.LinePoint.PointTo[isInGraphJson.Path.type]) == 'string') {
          moveLineobj = json.obj;
          if (typeof (isInGraphJson.obj.LinePoint.place[isInGraphJson.Path.type]) != 'boolean' || (typeof (moveLineobj.LinePoint.RLinkPoint[isInGraphJson.obj.LinePoint.PointTo[isInGraphJson.Path.type]]) == 'object' && moveLineobj.LinePoint.RLinkPoint[isInGraphJson.obj.LinePoint.PointTo[isInGraphJson.Path.type]].length)) {
            linkPoints.frompath = isInGraphJson.Path;
          }
          let examineRLJ = tempthis.examineRLinkPoint(isInGraphJson.obj.linkTo, moveLineobj);
          if (examineRLJ.pass) {
            if (examineRLJ.rPath[examineRLJ.index]) {
              linkPoints.topath = examineRLJ.rPath[examineRLJ.index];
              linkPoints.totype = isInGraphJson.obj.LinePoint.PointTo[isInGraphJson.Path.type];
              switch (isInGraphJson.obj.LinePoint.PointTo[isInGraphJson.Path.type]) {
                case 'left':
                  spotC.x = linkPoints.topath.x - 40;
                  spotD.x = spotC.x + 40;
                  spotD.y = linkPoints.topath.y;
                  spotC.y = spotD.y;
                  break;
                case 'right':
                  spotC.x = linkPoints.topath.x + 40;
                  spotD.x = spotC.x - 40;
                  spotD.y = linkPoints.topath.y;
                  spotC.y = spotD.y;
                  break;
                case 'top':
                  spotC.x = linkPoints.topath.x;
                  spotD.x = spotC.x;
                  spotD.y = linkPoints.topath.y;
                  spotC.y = spotD.y - 40;
                  break;
                case 'bottom':
                  spotC.x = linkPoints.topath.x;
                  spotD.x = spotC.x;
                  spotD.y = linkPoints.topath.y;
                  spotC.y = spotD.y + 40;
                  break;
              }
            } else {
              return false;
            }
          } else {
            switch (isInGraphJson.obj.LinePoint.PointTo[isInGraphJson.Path.type]) {
              case 'left':
                spotC.x = moveLineobj.x - 40;
                spotD.x = spotC.x + 40;
                spotD.y = moveLineobj.y + moveLineobj.lineWidth + moveLineobj.height / 2;
                spotC.y = spotD.y;
                break;
              case 'right':
                spotC.x = moveLineobj.x + moveLineobj.lineWidth * 2 + moveLineobj.width + 40;
                spotD.x = spotC.x - 40;
                spotD.y = moveLineobj.y + moveLineobj.lineWidth + moveLineobj.height / 2;
                spotC.y = spotD.y;
                break;
              case 'top':
                spotC.x = moveLineobj.x + moveLineobj.lineWidth + moveLineobj.width / 2;
                spotD.x = spotC.x;
                spotD.y = moveLineobj.y;
                spotC.y = spotD.y - 40;
                break;
              case 'bottom':
                spotC.x = moveLineobj.x + moveLineobj.lineWidth + moveLineobj.width / 2;
                spotD.x = spotC.x;
                spotD.y = moveLineobj.y + moveLineobj.lineWidth * 2 + moveLineobj.height;
                spotC.y = spotD.y + 40;
                break;
            }
          }
          path2d.bezierCurveTo(spotB.x, spotB.y, spotC.x, spotC.y, spotD.x, spotD.y);
        }
      }

      function canvasmousemove(e) {
        e.stopPropagation();
        e.preventDefault();
        clearInterval(timmer);
        tempthis.HTMLhide(tempthis.Title);
        if (isMousDown && btn == 0) {
          isClick = false;
          CanvasIsClick = false;
          switch (isInGraphJson.type) {
            case 'rect':
              isInGraphJson.obj.setLocation((e.x - startX) / tempthis.scale.x + startObjX, (e.y - startY) / tempthis.scale.y + startObjY);
              break;
            case 'rhombus':
              isInGraphJson.obj.setLocation((e.x - startX) / tempthis.scale.x + startObjX, (e.y - startY) / tempthis.scale.y + startObjY);
              break;
            case 'linkPoints':
              tempthis.drawChild();
              let windowscroll = tempthis.scroll(tempthis.canvas);
              let to = e;
              let path2d = new Path2D();
              let json: DrawType.DrawIsInGraph = isInGraph(e) || {};
              let spotA: DrawType.DrawScale = {};
              let spotB: DrawType.DrawScale = {};
              let spotC: DrawType.DrawScale = {};
              let spotD: DrawType.DrawScale = {};
              tempthis.contextCont.beginPath(path2d);
              tempthis.contextCont.strokeStyle = DrawTop.theme.lineStrokeStyle || isInGraphJson.obj.strokeStyle;
              tempthis.contextCont.lineWidth = isInGraphJson.obj.lineWidth;
              spotA.x = isInGraphJson.Path.x;
              spotA.y = isInGraphJson.Path.y;
              switch (isInGraphJson.Path.type) {
                case 'left':
                  spotB.x = spotA.x - 40;
                  spotB.y = spotA.y;
                  break;
                case 'right':
                  spotB.x = spotA.x + 40;
                  spotB.y = spotA.y;
                  break;
                case 'top':
                  spotB.x = spotA.x;
                  spotB.y = spotA.y - 40;
                  break;
                case 'bottom':
                  spotB.x = spotA.x;
                  spotB.y = spotA.y + 40;
                  break;
              }
              path2d.moveTo(spotA.x, spotA.y);
              switch (json.type) {
                case 'rect':
                  rectaddLine(json, spotA, spotB, spotC, spotD, path2d);
                  break;
                case 'rhombus':
                  rectaddLine(json, spotA, spotB, spotC, spotD, path2d);
                  break;
                case 'rLinkPoints':
                  moveLineobj = json.obj;
                  if (typeof (isInGraphJson.obj.LinePoint.PointTo[isInGraphJson.Path.type]) == 'string') {
                    return false;
                  }
                  let goid = isInGraphJson.obj.LinePoint.PointTo[isInGraphJson.Path.type].way[isInGraphJson.Path.id];
                  if (typeof (goid) == 'object') {
                    let passblean = false;
                    for (let i = 0; i < goid.length; i++) {
                      if (goid[i] == json.Path.id) {
                        passblean = true;
                      }
                    }
                    if (!passblean) {
                      return false;
                    }
                  } else {
                    if (json.Path.id != goid) {
                      return false;
                    }
                  }
                  linkPoints.frompath = isInGraphJson.Path;
                  linkPoints.topath = json.Path;
                  linkPoints.totype = isInGraphJson.obj.LinePoint.PointTo[isInGraphJson.Path.type].direction;
                  switch (isInGraphJson.obj.LinePoint.PointTo[isInGraphJson.Path.type].direction) {
                    case 'left':
                      spotC.x = moveLineobj.x - 40;
                      spotD.x = spotC.x + 40;
                      spotD.y = moveLineobj.y + moveLineobj.lineWidth + moveLineobj.height / 2;
                      spotC.y = spotD.y;
                      break;
                    case 'right':
                      spotC.x = moveLineobj.x + moveLineobj.lineWidth * 2 + moveLineobj.width + 40;
                      spotD.x = spotC.x - 40;
                      spotD.y = moveLineobj.y + moveLineobj.lineWidth + moveLineobj.height / 2;
                      spotC.y = spotD.y;
                      break;
                    case 'top':
                      spotC.x = linkPoints.topath.x;
                      spotD.x = spotC.x;
                      spotD.y = moveLineobj.y;
                      spotC.y = spotD.y - 40;
                      break;
                    case 'bottom':
                      spotC.x = linkPoints.topath.x;
                      spotD.x = spotC.x;
                      spotD.y = moveLineobj.y + moveLineobj.lineWidth * 2 + moveLineobj.height;
                      spotC.y = spotD.y + 40;
                      break;
                  }
                  path2d.bezierCurveTo(spotB.x, spotB.y, spotC.x, spotC.y, spotD.x, spotD.y);
                  break;
                default:
                  moveLineobj = null;
                  switch (isInGraphJson.Path.type) {
                    case 'left':
                      spotC.x = (to.x - startX) / tempthis.scale.x + startObjX + 40;
                      spotD.x = spotC.x - 40;
                      spotD.y = (to.y - startY) / tempthis.scale.y + startObjY + isInGraphJson.obj.lineWidth * 2 + (isInGraphJson.Path.y - isInGraphJson.obj.y);
                      spotC.y = spotD.y;
                      break;
                    case 'right':
                      spotC.x = (to.x - startX) / tempthis.scale.x + startObjX + isInGraphJson.obj.lineWidth * 2 + isInGraphJson.obj.width - 40;
                      spotD.x = spotC.x + 40;
                      spotD.y = (to.y - startY) / tempthis.scale.y + startObjY + isInGraphJson.obj.lineWidth * 2 + (isInGraphJson.Path.y - isInGraphJson.obj.y);
                      spotC.y = spotD.y;
                      break;
                    case 'top':
                      spotC.x = (to.x - startX) / tempthis.scale.x + startObjX + isInGraphJson.obj.lineWidth + (isInGraphJson.Path.x - isInGraphJson.obj.x);
                      spotD.x = spotC.x;
                      spotD.y = (to.y - startY) / tempthis.scale.y + startObjY;
                      spotC.y = spotD.y + 40;
                      break;
                    case 'bottom':
                      spotC.x = (to.x - startX) / tempthis.scale.x + startObjX + isInGraphJson.obj.lineWidth + (isInGraphJson.Path.x - isInGraphJson.obj.x);
                      spotD.x = spotC.x;
                      spotD.y = (to.y - startY) / tempthis.scale.y + startObjY + isInGraphJson.obj.lineWidth * 2 + isInGraphJson.obj.height;
                      spotC.y = spotD.y - 40;
                      break;
                  }
                  path2d.bezierCurveTo(spotB.x, spotB.y, spotC.x, spotC.y, spotD.x, spotD.y);
              }
              tempthis.contextCont.stroke(path2d);
              path2d.closePath();
              let baseLineB = tempthis.PointOnCubicBezier([spotA, spotB, spotC, spotD], 0.5);
              let baseLineA = tempthis.PointOnCubicBezier([spotA, spotB, spotC, spotD], 0.4);
              if (isInGraphJson.obj.LinePoint.link.arrows.imageicon) {
                tempthis.drawArrow(baseLineA.x, baseLineA.y, baseLineB.x, baseLineB.y, isInGraphJson.obj.strokeStyle, null, null, null, 20, 20, tempthis.ImageIcon[isInGraphJson.obj.LinePoint.link.arrows.imageicon], 'Icon', isInGraphJson.obj.LinePoint.link.arrows.place);
              } else {
                isInGraphJson.obj.LinePoint.link.arrows.show && tempthis.drawArrow(baseLineA.x, baseLineA.y, baseLineB.x, baseLineB.y, DrawTop.theme.lineStrokeStyle || isInGraphJson.obj.strokeStyle, isInGraphJson.obj.lineWidth);
              }
              break;
            case 'line':

              break;
            case 'rLinkPoints':

              break;
            default:
              tempthis.translate.x = startTranslate.x + (e.x - startX) / tempthis.scale.x;
              tempthis.translate.y = startTranslate.y + (e.y - startY) / tempthis.scale.y;
              tempthis.reloadsize();
              break;
          }
        } else {
          tempthis.clearHover();
          let json = isInGraph(e);
          if (json.ispass) {
            reloadLinkpoints();
            switch (json.type) {
              case 'linkPoints':
                tempthis.canvas.style.cursor = 'crosshair';
                lastObj = json.obj;
                lastLinkPoints = json.Path;
                json.obj.PathStyle[lastLinkPoints.type] = {};
                json.obj.PathStyle[lastLinkPoints.type][lastLinkPoints.id] = {
                  width: lastObj.hoverArcWidth || lastObj.arcWidth,
                  fillStyle: lastObj.hoverFillArcStyle || lastObj.fillArcStyle,
                  lineWidth: lastObj.hoverArclineWidth || lastObj.arclineWidth,
                  strokeStyle: lastObj.hoverStrokeArcStyle || lastObj.strokeArcStyle
                };
                break;
              case 'rect':
              case 'rhombus':
                tempthis.canvas.style.cursor = 'pointer';
                tempthis.hoverEvent && tempthis.hoverEvent(json);
                break;
              case 'line':
                tempthis.canvas.style.cursor = 'pointer';
                lastLink = json.obj;
                json.obj.strokeStyle = json.obj.hoverLineStrokeStyle || json.obj.strokeStyle;
                json.obj.lineWidth = json.obj.hoverLineWidth || json.obj.lineWidth;
                break;
            }
            let num = 0;
            timmer = setInterval(function () {
              num++;
              if (num == 2) {
                if (json.type != 'line') {
                  let span = document.createElement('span');
                  span.className = 'DrawTop-title-header';
                  span.innerHTML = json.obj.centerText;
                  let span2 = document.createElement('span');
                  span2.className = 'DrawTop-title-text';
                  span2.innerHTML = json.obj.text;
                  tempthis.Title.appendChild(span);
                  tempthis.Title.appendChild(span2);
                } else {
                  if (json.obj.tips) {
                    tempthis.Title.innerHTML = json.obj.tips;
                  } else {
                    tempthis.Title.innerHTML = '从  ' + json.obj.from.centerText + '' + json.obj.from.text + '  到  ' + json.obj.to.centerText + '' + json.obj.to.text + '   的连线';
                  }
                }
                tempthis.HTMLshow(e, tempthis.Title);
                clearInterval(timmer);
              };
            }, json.obj.timeout || 1000);
          } else {
            tempthis.canvas.style.cursor = 'default';
            reloadLinkpoints();
          }
          tempthis.reloadsize();
        }
      }

      function reloadLinkpoints() {
        if (lastLinkPoints) {
          lastObj.PathStyle[lastLinkPoints.type][lastLinkPoints.id].width = lastObj.config.arcWidth || DrawTop.theme.arcWidth;
          lastObj.PathStyle[lastLinkPoints.type][lastLinkPoints.id].fillStyle = lastObj.config.hoverFillArcStyle || DrawTop.theme.fillArcStyle;
          lastObj.PathStyle[lastLinkPoints.type][lastLinkPoints.id].lineWidth = lastObj.config.hoverArclineWidth || DrawTop.theme.arclineWidth;
          lastObj.PathStyle[lastLinkPoints.type][lastLinkPoints.id].strokeStyle = lastObj.config.hoverStrokeArcStyle || DrawTop.theme.strokeArcStyle;
          tempthis.reloadsize();
        }
        if (lastLink) {
          lastLink.strokeStyle = lastLink.config.lineStrokeStyle || DrawTop.theme.lineStrokeStyle;
          lastLink.lineWidth = lastLink.config.lineLineWidth || DrawTop.theme.lineLineWidth;
          tempthis.reloadsize();
          lastLink = null;
        }
      }

      function canvasmouseup(e) {
        let lineStartPlace;
        if (moveLineobj) {
          if (linkPoints.frompath) {
            lineStartPlace = {
              fromPath: linkPoints.frompath.id,
              toPath: linkPoints.topath ? linkPoints.topath.id : null,
              type: isInGraphJson.Path.type,
              totype: linkPoints.totype || null
            };
          } else {
            lineStartPlace = isInGraphJson.Path.type;
          }
          let link = new DrawTop.Link(isInGraphJson.obj, moveLineobj, {
            lineStrokeStyle: DrawTop.theme.lineStrokeStyle || isInGraphJson.obj.strokeStyle,
            lineStartPlace: lineStartPlace,
            arrows: {
              show: isInGraphJson.obj.LinePoint.link.arrows.show,
              imageicon: isInGraphJson.obj.LinePoint.link.arrows.imageicon,
              place: isInGraphJson.obj.LinePoint.link.arrows.place || {top: 0, left: 0},
            },
          });
          if ((tempthis.doLink.doLinkJudge && tempthis.doLink.doLinkJudge({
            from: isInGraphJson.obj,
            to: moveLineobj,
            link: link
          })) || !tempthis.doLink.doLinkJudge) {
            tempthis.add(link);
          }
          moveLineobj = null;
          linkPoints = {};
        }
        if (CanvasIsClick) {
          tempthis.clearClick();
          tempthis.clearHover();
          tempthis.reloadsize();
        }
        // console.log(isMousDown, isClick, isInGraphJson.obj);
        if (isMousDown && isClick && (!idDblclick)) {
          if (isInGraphJson.obj.saveLocal) {
            if (isInGraphJson.obj.saveLocal.x == isInGraphJson.obj.x && isInGraphJson.obj.saveLocal.y == isInGraphJson.obj.y) {
              tempthis.clearClick();
              tempthis.clearHover();
              tempthis.clickEvent && tempthis.clickEvent(isInGraphJson);
              tempthis.reloadsize();
              canvasClick(e, isInGraphJson.obj);
              isClick = false;
            }
          }
        }
        isInGraphJson = null;
        isMousDown = false;
        idDblclick = false;
      }

      function isInGraph(e): DrawType.DrawIsInGraph {
        let json: DrawType.DrawIsInGraph;
        let children = tempthis.childs;
        let windowscroll = tempthis.scroll(tempthis.canvas);
        json = {};
        json.ispass = true;
        for (let i = children.length - 1; i > -1; i--) {
          let item = children[i];
          if (item.type == 'line') {
            if (tempthis.contextCont.isPointInPath(item.path2d, e.x - tempthis.offset.left + windowscroll.left, e.y - tempthis.offset.top + windowscroll.top) || tempthis.contextCont.isPointInStroke(item.path2d, e.x - tempthis.offset.left + windowscroll.left, e.y - tempthis.offset.top + windowscroll.top)) {
              json.type = item.type;
              json.obj = item;
              json.Path = item.path2d;
              return json;
            }
          } else {
            if (tempthis.contextCont.isPointInPath(item.path2d, e.x - tempthis.offset.left + windowscroll.left, e.y - tempthis.offset.top + windowscroll.top) || tempthis.contextCont.isPointInStroke(item.path2d, e.x - tempthis.offset.left + windowscroll.left, e.y - tempthis.offset.top + windowscroll.top)) {
              json.type = item.type;
              json.obj = item;
              json.Path = item.path2d;
              return json;
            }
            for (let j = 0; j < item.arcPath2d.length; j++) {
              if (tempthis.contextCont.isPointInPath(item.arcPath2d[j], e.x - tempthis.offset.left + windowscroll.left, e.y - tempthis.offset.top + windowscroll.top) || tempthis.contextCont.isPointInStroke(item.arcPath2d[j], e.x - tempthis.offset.left + windowscroll.left, e.y - tempthis.offset.top + windowscroll.top)) {
                json.type = 'linkPoints';
                json.obj = item;
                json.Path = item.arcPath2d[j];
                return json;
              }
            }
            for (let k = 0; k < item.rPath2d.length; k++) {
              if (tempthis.contextCont.isPointInPath(item.rPath2d[k], e.x - tempthis.offset.left + windowscroll.left, e.y - tempthis.offset.top + windowscroll.top) || tempthis.contextCont.isPointInStroke(item.rPath2d[k], e.x - tempthis.offset.left + windowscroll.left, e.y - tempthis.offset.top + windowscroll.top)) {
                json.type = 'rLinkPoints';
                json.obj = item;
                json.Path = item.rPath2d[k];
                return json;
              }
            }
          }
        }
        json.ispass = false;
        return json;
      }

      function canvasClick(e, json) {
        e.rtype = 'click';
        json && json['click'] && json['click'](e);
      }
    },
    examineRLinkPoint: function (link, toObj) {
      let result = {
        pass: false,
        index: null,
        rPath: null,
      };
      if (toObj.rPath2d.length) {
        if (link.length < toObj.rPath2d.length) {
          result.pass = true;
        }
      } else {
        result.pass = false;
      }
      result.index = link.length;
      result.rPath = toObj.rPath2d;
      return result;
    },
    clearClick: function () {
      const rectChild = this.getNodeObj('rect');
      const rhombusChild = this.getNodeObj('rhombus');
      this.clearEvent(rectChild);
      this.clearEvent(rhombusChild);
    },
    clearHover: function () {
      const rectChild = this.getNodeObj('rect');
      const rhombusChild = this.getNodeObj('rhombus');
      this.clearStyle(rectChild);
      this.clearStyle(rhombusChild);
    },
    clearStyle: function (objArr) {
      for (let i = 0; i < objArr.length; i++) {
        const item = objArr[i];
        if (item.isClick) {
          continue;
        }
        item.centerTextColor = item.config.centerTextColor || DrawTop.theme.centerTextColor;
        item.fillStyle = item.config.fillStyle || DrawTop.theme.fillStyle;
      }
    },
    clearEvent: function (objArr) {
      for (let i = 0; i < objArr.length; i++) {
        const item = objArr[i];
        item.isClick = false;
      }
    },
    detectionBrowser: function () {
      if (navigator.userAgent.toUpperCase().indexOf('MSIE') == -1) {
        if (navigator.userAgent.toUpperCase().indexOf('FIREFOX') == -1) {
          if (navigator.userAgent.toUpperCase().indexOf('CHROME') == -1) {

          } else {
            return 'CHROME';
          }
        } else {
          return 'FIREFOX';
        }
      } else {
        return 'IE';
      }
    },
    offSet: function (obj: any) {
      let json = { top: null, left: null };
      json.top = obj.offsetTop;
      json.left = obj.offsetLeft;
      let parent = obj.offsetParent;
      while (parent != null) {
        json.top += parent.offsetTop;
        json.left += parent.offsetLeft;
        parent = parent.offsetParent;
      }
      return json;
    },
    scroll: function (obj, json) {
      json = json || {};
      json.left = json.left || 0;
      json.top = json.top || 0;
      if (obj != document) {
        json.left += obj.scrollLeft;
        json.top += obj.scrollTop;
        return this.scroll(obj.parentNode, json);
      } else {
        return json;
      }
    },
    drawArrow: function (fromX, fromY, toX, toY, color, width, theta, headlen, IconW, IconH, Image, type, place) {
      theta = theta || 20;
      headlen = headlen || 10;
      width = width || 1;
      color = color || '#333';
      place = place || { top: 0, left: 0 };
      let angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI;
      let angle1 = (angle + theta) * Math.PI / 180,
        angle2 = (angle - theta) * Math.PI / 180,
        topX = headlen * Math.cos(angle1),
        topY = headlen * Math.sin(angle1),
        botX = headlen * Math.cos(angle2),
        botY = headlen * Math.sin(angle2);
      this.contextCont.save();
      this.contextCont.beginPath();
      let arrowX = fromX - topX,
        arrowY = fromY - topY;
      if (type == 'Icon') {
        arrowX = (fromX + toX) / 2,
          arrowY = (fromY + toY) / 2;
        this.contextCont.drawImage(Image, arrowX - IconW / 2 + place.left, arrowY - IconH / 2 + place.top, IconW, IconH);
        this.contextCont.strokeStyle = color;
        this.contextCont.stroke();
        this.contextCont.restore();
      } else {
        this.contextCont.moveTo(arrowX, arrowY);
        arrowX = toX + topX;
        arrowY = toY + topY;
        this.contextCont.moveTo(arrowX, arrowY);
        this.contextCont.lineTo(toX, toY);
        arrowX = toX + botX;
        arrowY = toY + botY;
        this.contextCont.lineTo(arrowX, arrowY);
        this.contextCont.strokeStyle = color;
        this.contextCont.lineWidth = width;
        this.contextCont.stroke();
        this.contextCont.restore();
      }
      return this;
    },
    reloadsize: function () {
      this.canvas.width = this.canvasBox.clientWidth;
      this.canvas.height = this.canvasBox.clientHeight;
      this.offset = this.offSet(this.canvas) || 0;
      this.drawChild();
      return this;
    },
    PointOnCubicBezier: function (spotArr, t) {
      let ax, bx, cx;
      let ay, by, cy;
      let tSquared, tCubed;
      let result = {
        x: null,
        y: null,
      };

      cx = 3.0 * (spotArr[1].x - spotArr[0].x);
      bx = 3.0 * (spotArr[2].x - spotArr[1].x) - cx;
      ax = spotArr[3].x - spotArr[0].x - cx - bx;

      cy = 3.0 * (spotArr[1].y - spotArr[0].y);
      by = 3.0 * (spotArr[2].y - spotArr[1].y) - cy;
      ay = spotArr[3].y - spotArr[0].y - cy - by;

      tSquared = t * t;
      tCubed = tSquared * t;

      result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + spotArr[0].x;
      result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + spotArr[0].y;
      return result;
    },
    getAutoHeight: function (node) {
      node.textMaxWidth = node.textMaxWidth || node.width;
      node.textSize = node.textSize || 12;
      let rw = node.textMaxWidth / (node.textSize * 0.5);
      let title = node.centerText;
      for (let i = 1; this.getTrueLength(title) > 0; i++) {
        let tlittle = this.cutString(title, rw);
        title.substr(0, tlittle).replace(/^\s+|\s+$/, '');
        title = title.substr(tlittle);
        if (this.getTrueLength(title) == 0 && (i - 1) > 0) {
          node.height = (i * 1.3 + 1) * node.textSize;
        }
      }
    },
    drawChild: function () {
      this.contextCont.setTransform(this.scale.x, 0, 0, this.scale.y, this.origin.x, this.origin.y);
      this.contextCont.translate(this.translate.x, this.translate.y);
      this.contextCont.clearRect(-this.translate.x - this.origin.x / this.scale.x, -this.translate.y - this.origin.y / this.scale.y, this.canvas.width / this.scale.x, this.canvas.height / this.scale.y);
      let tempthis = this;
      if (!this.childs.length) {
        return this;
      }
      this.childs.map((val) => {
        let arrtemp = [];
        for (let item_t = 0; item_t < val.parentStages.length; item_t++) {
          var item_o = val.parentStages[item_t];
          if (item_o.id != tempthis.id) {
            arrtemp.push(item_o);
          }
        }
        val.parentStages = arrtemp;
        val.parentStages.push(tempthis);
        if (val.type != 'line') {
          tempthis.getAutoHeight(val);
          val.path2d = new Path2D();
          tempthis.contextCont.save(val.path2d);
          tempthis.contextCont.beginPath(val.path2d);
          tempthis.contextCont.fillStyle = val.fillStyle;
          tempthis.contextCont.lineWidth = val.lineWidth * 2;
          tempthis.contextCont.strokeStyle = val.strokeStyle;
          switch (val.type) {
            case 'rhombus':
              val.path2d.moveTo(val.x + val.radius.p1 + val.lineWidth, val.y + val.lineWidth);
              val.path2d.lineTo(val.x + val.width - val.radius.p2 + val.lineWidth, val.y + val.lineWidth);
              val.path2d.arcTo(val.x + val.width + val.lineWidth, val.y + val.lineWidth, val.x + val.width + val.lineWidth, val.y + val.radius.p2 + val.lineWidth, val.radius.p2);
              val.path2d.lineTo(val.x + val.width + val.lineWidth, val.y + val.height - val.radius.p3 + val.lineWidth);
              val.path2d.arcTo(val.x + val.width + val.lineWidth, val.y + val.height + val.lineWidth, val.x + val.width - val.radius.p3 + val.lineWidth, val.y + val.height + val.lineWidth, val.radius.p3);
              val.path2d.lineTo(val.x + val.radius.p4 + val.lineWidth, val.y + val.height + val.lineWidth);
              val.path2d.arcTo(val.x + val.lineWidth, val.y + val.height + val.lineWidth, val.x + val.lineWidth, val.y - val.radius.p4 + val.lineWidth, val.radius.p4);
              val.path2d.lineTo(val.x + val.lineWidth, val.y + val.radius.p1 + val.lineWidth);
              val.path2d.arcTo(val.x + val.lineWidth, val.y + val.lineWidth, val.x + val.radius.p1 + val.lineWidth, val.y + val.lineWidth, val.radius.p1);
              break;
            default:
              val.path2d.rect(val.x + val.lineWidth, val.y + val.lineWidth, val.width, val.height);
              break;
          }
          tempthis.contextCont.stroke(val.path2d);
          tempthis.contextCont.fill(val.path2d);
          val.path2d.closePath();
          // 绘制链接组块
          tempthis.drawLinePoint(val, val.LinePointPlace);
          tempthis.drawText(val);
        } else {
          let from = val.from;
          let to = val.to;
          let spotA: DrawType.DrawScale = {};
          let spotB: DrawType.DrawScale = {};
          let spotC: DrawType.DrawScale = {};
          let spotD: DrawType.DrawScale = {};
          val.path2d = new Path2D();
          tempthis.contextCont.save(val.path2d);
          tempthis.contextCont.beginPath(val.path2d);
          tempthis.contextCont.strokeStyle = val.strokeStyle;
          tempthis.contextCont.lineWidth = val.lineWidth;
          if (typeof (val.lineStartPlace) == 'string') {
            switch (val.lineStartPlace) {
              case 'left':
                spotA.x = from.x;
                spotA.y = from.y + from.lineWidth + from.height / 2;
                spotB.x = spotA.x - 40;
                spotB.y = spotA.y;
                break;
              case 'right':
                spotA.x = from.x + from.lineWidth * 2 + from.width;
                spotA.y = from.y + from.lineWidth + from.height / 2;
                spotB.x = spotA.x + 40;
                spotB.y = spotA.y;
                break;
              case 'top':
                spotA.x = from.x + from.lineWidth + from.width / 2;
                spotA.y = from.y;
                spotB.x = spotA.x;
                spotB.y = spotA.y - 40;
                break;
              case 'bottom':
                spotA.x = from.x + from.lineWidth + from.width / 2;
                spotA.y = from.y + from.lineWidth * 2 + from.height;
                spotB.x = spotA.x;
                spotB.y = spotA.y + 40;
                break;
            }
            switch (from.LinePoint.PointTo[val.lineStartPlace]) {
              case 'left':
                spotC.x = to.x - 40;
                spotD.x = spotC.x + 40;
                spotD.y = to.y + to.lineWidth + to.height / 2;
                spotC.y = spotD.y;
                break;
              case 'right':
                spotC.x = to.x + to.lineWidth * 2 + to.width + 40;
                spotD.x = spotC.x - 40;
                spotD.y = to.y + to.lineWidth + to.height / 2;
                spotC.y = spotD.y;
                break;
              case 'top':
                spotC.x = to.x + to.lineWidth + to.width / 2;
                spotD.x = spotC.x;
                spotD.y = to.y;
                spotC.y = spotD.y - 40;
                break;
              case 'bottom':
                spotC.x = to.x + to.lineWidth + to.width / 2;
                spotD.x = spotC.x;
                spotD.y = to.y + to.lineWidth * 2 + to.height;
                spotC.y = spotD.y + 40;
                break;
            }
          } else {
            let type = val.lineStartPlace.type;
            val.fromPath = tempthis.findPoint(from, type, val.lineStartPlace.fromPath).path;
            val.toPath = tempthis.findPoint(to, val.lineStartPlace.totype, val.lineStartPlace.toPath, 'rpoint').path;
            switch (type) {
              case 'left':
                spotA.x = from.x;
                spotA.y = val.fromPath.y;
                spotB.x = spotA.x - 40;
                spotB.y = spotA.y;
                break;
              case 'right':
                spotA.x = from.x + from.lineWidth * 2 + from.width;
                spotA.y = val.fromPath.y;
                spotB.x = spotA.x + 40;
                spotB.y = spotA.y;
                break;
              case 'top':
                spotA.x = val.fromPath.x;
                spotA.y = from.y;
                spotB.x = spotA.x;
                spotB.y = spotA.y - 40;
                break;
              case 'bottom':
                spotA.x = val.fromPath.x;
                spotA.y = from.y + from.lineWidth * 2 + from.height;
                spotB.x = spotA.x;
                spotB.y = spotA.y + 40;
                break;
            }
            if (val.toPath) {
              let toType = from.LinePoint.PointTo[type].direction || val.lineStartPlace.totype;
              switch (toType) {
                case 'left':
                  spotC.x = to.x - 40;
                  spotD.x = spotC.x + 40;
                  spotD.y = val.toPath.y;
                  spotC.y = spotD.y;
                  break;
                case 'right':
                  spotC.x = to.x + to.lineWidth * 2 + to.width + 40;
                  spotD.x = spotC.x - 40;
                  spotD.y = val.toPath.y;
                  spotC.y = spotD.y;
                  break;
                case 'top':
                  spotC.x = val.toPath.x;
                  spotD.x = spotC.x;
                  spotD.y = to.y;
                  spotC.y = spotD.y - 40;
                  break;
                case 'bottom':
                  spotC.x = val.toPath.x;
                  spotD.x = spotC.x;
                  spotD.y = to.y + to.lineWidth * 2 + to.height;
                  spotC.y = spotD.y + 40;
                  break;
              }
            } else {
              switch (from.LinePoint.PointTo[type]) {
                case 'left':
                  spotC.x = to.x - 40;
                  spotD.x = spotC.x + 40;
                  spotD.y = to.y + to.lineWidth + to.height / 2;
                  spotC.y = spotD.y;
                  break;
                case 'right':
                  spotC.x = to.x + to.lineWidth * 2 + to.width + 40;
                  spotD.x = spotC.x - 40;
                  spotD.y = to.y + to.lineWidth + to.height / 2;
                  spotC.y = spotD.y;
                  break;
                case 'top':
                  spotC.x = to.x + to.lineWidth + to.width / 2;
                  spotD.x = spotC.x;
                  spotD.y = to.y;
                  spotC.y = spotD.y - 40;
                  break;
                case 'bottom':
                  spotC.x = to.x + to.lineWidth + to.width / 2;
                  spotD.x = spotC.x;
                  spotD.y = to.y + to.lineWidth * 2 + to.height;
                  spotC.y = spotD.y + 40;
                  break;
              }
            }
          }
          val.path2d.moveTo(spotA.x, spotA.y);
          val.path2d.bezierCurveTo(spotB.x, spotB.y, spotC.x, spotC.y, spotD.x, spotD.y);
          tempthis.contextCont.stroke(val.path2d);
          val.path2d.closePath();
          let baseLineB = tempthis.PointOnCubicBezier([spotA, spotB, spotC, spotD], 0.5);
          let baseLineA = tempthis.PointOnCubicBezier([spotA, spotB, spotC, spotD], 0.4);
          if (val.arrows.imageicon) {
            tempthis.drawArrow(baseLineA.x, baseLineA.y, baseLineB.x, baseLineB.y, val.strokeStyle, null, null, null, 20, 20, tempthis.ImageIcon[val.arrows.imageicon], 'Icon', val.arrows.place);
          }
          if (val.arrows.show) {
            val.arrows.show && tempthis.drawArrow(baseLineA.x, baseLineA.y, baseLineB.x, baseLineB.y, val.strokeStyle, val.lineWidth);
          }
        }
      });
      return this;
    },
    findPoint: function (obj, path, id, type) {
      let len, pointPath;
      type = type || 'point';
      switch (type) {
        case 'point':
          len = obj.arcPath2d.length;
          pointPath = obj.arcPath2d;
          if (len) {
            for (let i = 0; i < len; i++) {
              let item = pointPath[i];
              if (item.type == path && (id ? (item.id == id) : true)) {
                return { path: item, index: i + 1 };
              }
            }
          }
          break;
        case 'rpoint':
          len = obj.rPath2d.length;
          pointPath = obj.rPath2d;

          if (len) {
            for (let i = 0; i < len; i++) {
              let item = pointPath[i];
              if (item.type == path && (id ? (item.id == id) : true)) {
                return { path: item, index: i + 1 };
              }
            }
          }
          break;
      }
      return false;
    },
    drawLinePoint: function (obj) {
      let pointConfig = obj.LinePoint.place;
      let rPointConfig = obj.LinePoint.RLinkPoint;
      obj.arcPath2d = obj.arcPath2d.length ? obj.arcPath2d : [];
      for (let i in pointConfig) {
        if (!pointConfig[i]) {
          continue;
        }
        if (typeof (pointConfig[i]) == 'boolean') {
          let tempthisFindPath = this.findPoint(obj, i) || { path: {}, id: null };
          let path: any = new Path2D();
          Object.defineProperty(path, 'id', { value: (parseInt((new Date).getTime() + '' + Math.floor(Math.random() * 10000))) });
          this.contextCont.save(path);
          this.contextCont.beginPath(path);
          let pointS = obj.PathStyle[i][tempthisFindPath.path.id] || {};
          path.fillStyle = pointS.fillStyle || obj.fillArcStyle;
          path.lineWidth = pointS.lineWidth || obj.arclineWidth;
          path.strokeStyle = pointS.strokeStyle || obj.strokeArcStyle;
          path.width = pointS.width || obj.arcWidth;
          this.contextCont.fillStyle = path.fillStyle;
          this.contextCont.lineWidth = path.lineWidth;
          this.contextCont.strokeStyle = path.strokeStyle;
          switch (i) {
            case 'left':
              path.x = obj.x;
              path.y = obj.y + obj.lineWidth * 2 + obj.height / 2;
              path.arc(path.x, path.y, path.width, 1.5 * Math.PI, 0.5 * Math.PI, true);
              break;
            case 'right':
              path.x = obj.x + obj.lineWidth * 2 + obj.width;
              path.y = obj.y + obj.lineWidth * 2 + obj.height / 2;
              path.arc(path.x, path.y, path.width, 1.5 * Math.PI, 0.5 * Math.PI, false);
              break;
            case 'top':
              path.x = obj.x + obj.lineWidth + obj.width / 2;
              path.y = obj.y;
              path.arc(path.x, path.y, path.width, 0, Math.PI, true);
              break;
            case 'bottom':
              path.x = obj.x + obj.lineWidth + obj.width / 2;
              path.y = obj.y + obj.lineWidth * 2 + obj.height;
              path.arc(path.x, path.y, path.width, 0, Math.PI, false);
              break;
          }
          path.type = i;
          this.contextCont.stroke(path);
          this.contextCont.fill(path);
          path.closePath();
          if (tempthisFindPath.index) {
            obj.arcPath2d[tempthisFindPath.index - 1] = path;
          } else {
            obj.arcPath2d.push(path);
          }
        } else {
          let len = pointConfig[i].length;
          for (let j = 0; j < len; j++) {
            let item_ps = pointConfig[i][j];
            let tempthisFindPath = this.findPoint(obj, i, item_ps.id) || { path: {} };
            let path: any = new Path2D();
            this.contextCont.save(path);
            this.contextCont.beginPath(path);
            let pointS = obj.PathStyle[i][tempthisFindPath.path.id] || {};
            path.fillStyle = pointS.fillStyle || item_ps.fillArcStyle || obj.fillArcStyle;
            path.lineWidth = pointS.lineWidth || item_ps.arclineWidth || obj.arclineWidth;
            path.strokeStyle = pointS.strokeStyle || item_ps.strokeStyle || obj.strokeArcStyle;
            path.width = pointS.width || item_ps.width || obj.arcWidth;
            Object.defineProperty(path, 'id', { value: (item_ps.id || parseInt((new Date).getTime() + '' + Math.floor(Math.random() * 10000))) });
            this.contextCont.fillStyle = path.fillStyle;
            this.contextCont.lineWidth = path.lineWidth;
            this.contextCont.strokeStyle = path.strokeStyle;
            switch (i) {
              case 'left':
                path.x = obj.x;
                path.y = obj.y + obj.lineWidth * 2 + obj.height / (len + 1) * (j + 1);
                path.arc(path.x, path.y, path.width, 1.5 * Math.PI, 0.5 * Math.PI, true);
                break;
              case 'right':
                path.x = obj.x + obj.lineWidth * 2 + obj.width;
                path.y = obj.y + obj.lineWidth * 2 + obj.height / (len + 1) * (j + 1);
                path.arc(path.x, path.y, path.width, 1.5 * Math.PI, 0.5 * Math.PI, false);
                break;
              case 'top':
                path.x = obj.x + obj.lineWidth + obj.width / (len + 1) * (j + 1);
                path.y = obj.y;
                path.arc(path.x, path.y, path.width, 0, Math.PI, true);
                break;
              case 'bottom':
                path.x = obj.x + obj.lineWidth + obj.width / (len + 1) * (j + 1);
                path.y = obj.y + obj.lineWidth * 2 + obj.height;
                path.arc(path.x, path.y, path.width, 0, Math.PI, false);
                break;
            }
            path.type = i;
            this.contextCont.stroke(path);
            this.contextCont.fill(path);
            path.closePath();
            if (tempthisFindPath.index) {
              obj.arcPath2d[tempthisFindPath.index - 1] = path;
            } else {
              obj.arcPath2d.push(path);
            }
          }
        }
      }
      for (let k in rPointConfig) {
        let item = rPointConfig[k];
        let length = item.length;
        if (length && typeof (item) == 'object') {
          for (let q = 0; q < length; q++) {
            let this_point = this.findPoint(obj, k, item[q].id, 'rpoint') || { path: {}, id: null };
            ;
            let path: any = new Path2D();
            this.contextCont.save(path);
            this.contextCont.beginPath(path);
            let rpointS: {
              fillStyle?: any;
              lineWidth?: any;
              strokeStyle?: any;
              width: any;
            };
            path.fillStyle = rpointS.fillStyle || item.fillArcStyle || obj.fillArcStyle;
            path.lineWidth = rpointS.lineWidth || item.arclineWidth || obj.arclineWidth;
            path.strokeStyle = rpointS.strokeStyle || item.strokeStyle || obj.strokeArcStyle;
            path.width = rpointS.width || item.width || obj.arcWidth;
            Object.defineProperty(path, 'id', { value: (item[q].id || parseInt((new Date).getTime() + '' + Math.floor(Math.random() * 10000))) });
            this.contextCont.fillStyle = path.fillStyle;
            this.contextCont.lineWidth = path.lineWidth;
            this.contextCont.strokeStyle = path.strokeStyle;
            switch (k) {
              case 'left':
                path.x = obj.x;
                path.y = obj.y + obj.lineWidth * 2 + obj.height / (length + 1) * (q + 1);
                path.arc(path.x, path.y, path.width, 1.5 * Math.PI, 0.5 * Math.PI, true);
                break;
              case 'right':
                path.x = obj.x + obj.lineWidth * 2 + obj.width;
                path.y = obj.y + obj.lineWidth * 2 + obj.height / (length + 1) * (q + 1);
                path.arc(path.x, path.y, path.width, 1.5 * Math.PI, 0.5 * Math.PI, false);
                break;
              case 'top':
                path.x = obj.x + obj.lineWidth + obj.width / (length + 1) * (q + 1);
                path.y = obj.y;
                path.arc(path.x, path.y, path.width, 0, Math.PI, true);
                break;
              case 'bottom':
                path.x = obj.x + obj.lineWidth + obj.width / (length + 1) * (q + 1);
                path.y = obj.y + obj.lineWidth * 2 + obj.height;
                path.arc(path.x, path.y, path.width, 0, Math.PI, false);
                break;
            }
            path.type = k;
            this.contextCont.stroke(path);
            this.contextCont.fill(path);
            path.closePath();
            if (this_point.index) {
              obj.rPath2d[this_point.index - 1] = path;
            } else {
              obj.rPath2d.push(path);
            }
          }
        }
      }
    },
    clearAll: function () {
      this.contextCont.clearRect(-this.translate.x - this.origin.x / this.scale.x, -this.translate.y - this.origin.y / this.scale.y, this.canvas.width / this.scale.x, this.canvas.height / this.scale.y);
      this.childs = [];
      return this;
    },
    clear: function (node) {
      node = (typeof (node) == 'string' || typeof (node) == 'number') ? this.getinChild(node).node : (typeof (node) == 'object' ? node : null);
      let nodes = this.childs, tempthis = this;
      if (nodes && node) {
        let nodeindex = nodes.indexOf(node);
        nodeindex > -1 && this.childs.splice(nodeindex, 1);
        if (node.type != 'line') {
          node.linkFrom.map(function (item) {
            let index = nodes.indexOf(item), line = item;
            index > -1 && tempthis.childs.splice(index, 1);
            if (index > -1) {
              nodes.map(function (item) {
                if (item.type != 'line') {
                  let index = item.linkTo.indexOf(line);
                  index > -1 && item.linkTo.splice(index, 1);
                }
              });
            }
          });
          node.linkTo.map(function (item) {
            let index = nodes.indexOf(item), line = item;
            index > -1 && tempthis.childs.splice(index, 1);
            if (index > -1) {
              nodes.map(function (item) {
                if (item.type != 'line') {
                  let index = item.linkFrom.indexOf(line);
                  index > -1 && item.linkFrom.splice(index, 1);
                }
              });
            }
          });
        } else {
          let indexfrom = node.from.linkTo.indexOf(node);
          indexfrom > -1 && node.from.linkTo.splice(indexfrom, 1);
          let indexto = node.to.linkFrom.indexOf(node);
          indexto > -1 && node.to.linkFrom.splice(indexto, 1);
        }
      } else {
        DrawTop.error && DrawTop.error('缺少节点');
        return false;
      }
      this.reloadsize();
      return this;
    },

    /**
     * 放大
     */
    amplification: function () {
      this.scale.x *= 1.1;
      this.scale.y *= 1.1;
      this.scale.x = this.scale.x > 5 ? 5 : this.scale.x;
      this.scale.y = this.scale.y > 5 ? 5 : this.scale.y;
      this.reloadsize();
    },
    /**
     * 缩小
     */
    zoomOut: function () {
      this.scale.x /= 1.1;
      this.scale.y /= 1.1;
      this.scale.x = this.scale.x < 0.3 ? 0.3 : this.scale.x;
      this.scale.y = this.scale.y < 0.3 ? 0.3 : this.scale.y;
      this.reloadsize();
    },

    isHasloop: function () {
      let iNode = this.childs.map(function (val) {
        if (val.type != 'line') {
          return val;
        }
      }), isor = false;

      function isc(link, item) {
        let len = link.length;
        for (let i = 0; i < len; i++) {
          let itemtempthis = link[i];
          if (item.id == itemtempthis.to.id) {
            isor = true;
            return true;
          }
          (!isor) && isc(itemtempthis.to.linkTo, item);
        }
      }

      iNode.map(function (item) {
        (!isor) && isc(item.linkTo, item);
      });
      return isor;
    },
    textFlashback: function (str) {
      let resault = [];
      for (let len = str.length; len >= 0; len--) {
        resault.push(str[len]);
      }
      return resault.join('');
    },
    drawText: function (node, path) {
      if (typeof (this.config.id) != 'string' && typeof (this.config.id) != 'number') {
        return false;
      }
      // 绘制文字
      this.contextCont.beginPath(path);
      this.contextCont.fillStyle = node.centerTextColor;
      this.contextCont.font = node.textSize + 'px Arial,微软雅黑';
      this.contextCont.textAlign = 'center';
      let rw = node.textMaxWidth / (node.textSize * 0.5);
      let title = node.centerText;
      for (let i = 1; this.getTrueLength(title) > 0; i++) {
        let tlittle = this.cutString(title, rw);
        this.contextCont.fillText(title.substr(0, tlittle).replace(/^\s+|\s+$/, ''), node.x + node.lineWidth + node.width / 2, node.y + (i * 1.3 + 0.4) * node.textSize);
        title = title.substr(tlittle);
      }
      // 标题下面的主要文字
      this.contextCont.closePath();
      this.contextCont.beginPath(path);
      this.contextCont.fillStyle = node.textColor;
      this.contextCont.font = node.textSize + 'px Arial,微软雅黑';
      this.contextCont.textAlign = 'center';
      let textRw = (node.textMaxWidth + 30) / (node.textSize * 0.5);
      let text = node.text;
      for (let i = 1; this.getTrueLength(text) > 0; i++) {
        let tl = this.cutString(text, textRw);
        this.contextCont.fillText(text.substr(0, tl).replace(/^\s+|\s+$/, ''), node.x + node.lineWidth + node.width / 2, node.y + node.height + (i * 1.3 + 1) * node.textSize);
        text = text.substr(tl);
      }
      this.contextCont.closePath();
    },
    //获取字符串的真实长度（字节长度）
    getTrueLength: function (str) {
      let len = str.length,
        truelen = 0;
      for (let x = 0; x < len; x++) {
        if (str.charCodeAt(x) > 128) {
          truelen += 2;
        } else {
          truelen += 1;
        }
      }
      return truelen;
    },
    //按字节长度截取字符串，返回substr截取位置
    cutString: function (str, leng) {
      let len = str.length,
        tlen = len,
        nlen = 0;
      for (let x = 0; x < len; x++) {
        if (str.charCodeAt(x) > 128) {
          if (nlen + 2 < leng) {
            nlen += 2;
          } else {
            tlen = x;
            break;
          }
        } else {
          if (nlen + 1 < leng) {
            nlen += 1.6;
          } else {
            tlen = x;
            break;
          }
        }
      }
      return tlen;
    },
    add: function (obj) {
      if (obj.length) {
        let lineChilds: any[], tempthis = this;
        lineChilds = [];
        obj.map((item) => {
          if (item.type == 'line') {
            lineChilds.push(item);
          } else {
            tempthis.childs.push(item);
          }
        });
        lineChilds.map((item) => {
          let index = null;
          if (typeof (item.from) != 'object' && (item.from ? (isNaN(item.from - 0) ? true : item.from -= 0) : false)) {
            let json = tempthis.getinChild(item.from);
            item.from = json.node;
          }
          if (typeof (item.to) != 'object' && (item.to ? (isNaN(item.to - 0) ? true : item.to -= 0) : false)) {
            let json = tempthis.getinChild(item.to);
            item.to = json.node;
            index = json.nodeindex;
          } else {
            index = tempthis.childs.indexOf(item.to);
          }
          item.from.linkTo.push(item);
          item.to.linkFrom.push(item);
          index ? tempthis.childs.splice(index + 1, 0, item) : tempthis.childs.push(item);
        });
        this.childs = this.NrepetitiveId(this.childs);
        this.drawChild();
      } else if (toString.apply(obj) === '[object Object]') {
        if (obj.error) {
          return this;
        }
        let index = null;
        if (obj.type == 'line') {
          if (obj.from.id == obj.to.id) {
            this.drawChild();
            return this;
          }
          if (typeof (obj.from) == 'number') {
            let json = this.getinChild(obj.from);
            obj.from = json.node;
          }
          if (typeof (obj.to) == 'number') {
            let json = this.getinChild(obj.to);
            obj.to = json.node;
            index = json.nodeindex;
          } else {
            index = this.childs.indexOf(obj.to);
          }
          obj.from.linkTo.push(obj);
          obj.to.linkFrom.push(obj);
        }
        let tempindex = 0;
        for (let k = 0; k < this.childs.length; k++) {
          const temp_item = this.childs[k];
          if (temp_item.id === obj.id) {
            tempindex++;
          }
        }
        if (tempindex) {
          this.drawChild();
        } else {
          index ? this.childs.splice(index, 0, obj) : this.childs.push(obj);
          this.drawChild();
        }
      }
      return this;
    },
    getinChild: function (id) {
      let json: {
        node?: any;
        nodeindex?: any;
      };
      json = {};
      this.childs.map(function (item, index) {
        if (item.id == id) {
          json.node = item;
          json.nodeindex = index;
        }
      });
      return json;
    },
    NrepetitiveId: function (arr) {
      let json = {},
        rarr = [],
        len = arr.length;
      for (let i = 0; i < len; i++) {
        let item = arr[i];
        if (!json[item.id]) {
          json[item.id] = 1;
          rarr.push(item);
        }
      }
      return rarr;
    },
    getNodeObj: function (type) {
      let result = [];
      this.childs.map(function (item, index) {
        if (item.type == type) {
          result.push(item);
        }
      });
      return result;
    },
    getNodeObjFromDataValue: function (name, value) {
      let result = this.childs.map(function (item, index) {
        if (item.type != 'line') {
          if (item.dataValue[name] == value) {
            return item;
          }
        }
      });
      return result;
    },
    getNodeData: function () {
      let result = { Node: [], Theme: {}, StageData: {} };
      let childs = this.childs;
      childs.map(function (val, index) {
        if (val.type != 'line') {
          let json = {
            location: {},
            id: val.id,
            name: val.text,
            title: val.centerText,
            type: val.type,
            styles: {},
            linkTo: [],
            dataValue: null
          };
          json.location = { x: val.x, y: val.y };
          if (val.linkTo) {
            let linktoarr = val.linkTo.map(function (val, index) {
              let json_i = { toNodeid: val.to.id, lineId: val.id, dataValue: val.dataValue, styles: {} };
              for (let i in val.config) {
                json_i.styles[i] = val.config[i];
              }
              json.linkTo.push(json_i);
            });
          }
          for (let i in val.config) {
            json.styles[i] = json.styles[i] || val.config[i];
          }
          json.dataValue = val.dataValue;
          result.Node.push(json);
        }
      });
      result.Theme = DrawTop.theme;
      result.StageData = {
        scale: this.scale,
        translate: this.translate,
        origin: this.origin,
      };
      return result;
    },
    drawNodeData: function (data) {
      if (data) {
        DrawTop.theme = data.Theme ? data.Theme : DrawTop.theme;
        if (data.StageData) {
          this.scale = data.StageData.scale ? data.StageData.scale : { x: 1, y: 1 };
          this.translate = data.StageData.translate ? data.StageData.translate : { x: 0, y: 0 };
          this.origin = data.StageData.origin ? data.StageData.origin : { x: 0, y: 0 };
        }
        let Nodes = data.Node;
        let Nodesarr = [];
        for (let i = 0; i < Nodes.length; i++) {
          let node = Nodes[i];
          let config = node.styles || {};
          config.text = node.name || '';
          config.centerText = node.title || '';
          config.id = node.id || '';
          let itemNode = new DrawTop.Node(config);
          itemNode.x = node.location.x;
          itemNode.y = node.location.y;
          itemNode.dataValue = node.dataValue;
          let linkTo = node.linkTo;
          for (let j = 0; j < linkTo.length; j++) {
            let iLinkTo = linkTo[j];
            if (iLinkTo.dataValue) {
              iLinkTo.styles.dataValue = iLinkTo.dataValue;
            }
            let link = new DrawTop.Link(itemNode, iLinkTo.toNodeid, iLinkTo.styles);
            Nodesarr.push(link);
          }
          Nodesarr.push(itemNode);
        }
        this.childs = [];
        this.add(Nodesarr);
      }
      return this;
    },
  };

  function addEvent(event, obj, fn) {
    obj.addEventListener(event, fn, true);
  }

  function removeEvent(event, obj, fn) {
    obj.removeEventListener(event, fn);
  }

  return typeof (id) == 'string' ? this.initialize(id, config) : (toString.apply(id) == '[object Object]' ? this.initialize(id.id, id) : Error('\u53c2\u6570\u9519\u8bef\uff1a\u0053\u0074\u0061\u0067\u0065\u0020\u53c2\u6570\u5fc5\u987b\u4e3a\u5b57\u7b26\u4e32'));
};
DrawTop.Node = function (text, config) {
  this.config = config || {};
  if (typeof (text) == 'string') {
    this.config.text = text;
  } else if (toString.apply(text) === '[object Object]') {
    this.config = text;
  }
  Object.defineProperty(this, 'id', { value: ((typeof (this.config.id) == 'string' || typeof (this.config.id) == 'number') ? this.config.id : parseInt((new Date).getTime() + '' + Math.floor(Math.random() * 10000))) });
  // 对节点的配置初始化
  var EventArr = ['click'];
  for (var j = 0; j < EventArr.length; j++) {
    var item = EventArr[j];
    this[item] = this.config[item] || null;
  }
  this.parentStages = [];
  this.type = this.config.type || DrawTop.theme.type;
  this.width = this.config.width || DrawTop.theme.width;
  this.height = this.config.height || DrawTop.theme.height;
  this.strokeStyle = this.config.strokeStyle || DrawTop.theme.strokeStyle;
  this.lineWidth = this.config.lineWidth || DrawTop.theme.lineWidth;
  this.fillStyle = this.config.fillStyle || DrawTop.theme.fillStyle;
  this.fillArcStyle = this.config.fillArcStyle || DrawTop.theme.fillArcStyle;
  this.strokeArcStyle = this.config.strokeArcStyle || DrawTop.theme.strokeArcStyle;
  this.text = this.config.text || 'Node' + this.id;
  this.textColor = this.config.textColor || DrawTop.theme.textColor;
  this.x = this.config.x || DrawTop.theme.x;
  this.y = this.config.y || DrawTop.theme.y;
  this.arcWidth = this.config.arcWidth || DrawTop.theme.arcWidth;
  this.arclineWidth = this.config.arclineWidth || DrawTop.theme.arclineWidth;
  this.centerText = this.config.centerText || DrawTop.theme.centerText || null;
  this.centerTextColor = this.config.centerTextColor || DrawTop.theme.centerTextColor || null;
  this.LinePoint = this.config.LinePoint || {};
  this.LinePoint.place = this.LinePoint.place || {};
  this.LinePoint.place.right = typeof (this.LinePoint.place.right) == 'undefined' ? false : this.LinePoint.place.right;
  this.LinePoint.place.left = typeof (this.LinePoint.place.left) == 'undefined' ? false : this.LinePoint.place.left;
  this.LinePoint.place.bottom = typeof (this.LinePoint.place.bottom) == 'undefined' ? true : this.LinePoint.place.bottom;
  this.LinePoint.place.top = typeof (this.LinePoint.place.top) == 'undefined' ? false : this.LinePoint.place.top;
  this.LinePoint.PointTo = this.LinePoint.PointTo || {};
  this.LinePoint.PointTo.right = this.LinePoint.PointTo.right || 'top';
  this.LinePoint.PointTo.left = this.LinePoint.PointTo.left || 'top';
  this.LinePoint.PointTo.bottom = this.LinePoint.PointTo.bottom || 'top';
  this.LinePoint.PointTo.top = this.LinePoint.PointTo.top || 'top';
  this.LinePoint.link = this.LinePoint.link || {};
  this.LinePoint.link.arrows = this.LinePoint.link.arrows || {};
  this.LinePoint.link.arrows.show = (typeof (this.LinePoint.link.arrows.show) != 'undefined' && typeof (this.LinePoint.link.arrows.show) == 'boolean') ? this.LinePoint.link.arrows.show : true;
  this.LinePoint.link.arrows.imageicon = (typeof (this.LinePoint.link.arrows.imageicon) != 'undefined' && typeof (this.LinePoint.link.arrows.imageicon) == 'string') ? this.LinePoint.link.arrows.imageicon : '';
  this.LinePoint.link.arrows.place = this.LinePoint.link.arrows.place || { top: 0, left: 0 };
  this.LinePoint.RLinkPoint = this.LinePoint.RLinkPoint || {};
  this.rPath2d = [];
  switch (this.type) {
    case 'rhombus':
      this.radius = this.config.radius || { p1: 4, p2: 4, p3: 4, p4: 4 };
      break;
  }
  // 路径连接点样式
  this.PathStyle = {
    bottom: {},
    top: {},
    left: {},
    right: {}
  };
  // 自定义属性
  this.dataValue = this.config.dataValue || {};
  // 链接线属性
  this.arcPath2d = [];
  this.linkFrom = [];
  this.linkTo = [];
  // hover属性
  this.hoverArcWidth = this.config.hoverArcWidth || DrawTop.theme.hoverArcWidth || this.arcWidth;
  this.hoverFillArcStyle = this.config.hoverFillArcStyle || DrawTop.theme.hoverFillArcStyle || this.fillArcStyle;
  this.hoverArclineWidth = this.config.hoverArclineWidth || DrawTop.theme.hoverArclineWidth || this.arclineWidth;
  this.hoverStrokeArcStyle = this.config.hoverStrokeArcStyle || DrawTop.theme.hoverStrokeArcStyle || this.strokeArcStyle;
  var changeWatch = ['width', 'height', 'text'];
  for (var i = 0; i < changeWatch.length; i++) {
    this['_' + changeWatch[i]] = this[changeWatch[i]];
  }
  let WatchJson = {
    // 'width': {
    //   configurable: true,
    //   enumerable: true,
    //   get: function() {
    //     return this._width;
    //   },
    //   set: function(val) {
    //     this._width = val;
    //     this.reload();
    //     return this._width;
    //   }
    // },
    // 'height': {
    //   configurable: true,
    //   enumerable: true,
    //   get: function() {
    //     return this._height;
    //   },
    //   set: function(val) {
    //     this._height = val;
    //     this.reload();
    //     return this._height;
    //   }
    // },
    'text': {
      configurable: true,
      enumerable: true,
      get: function () {
        return this._text;
      },
      set: function (val) {
        this._text = val;
        this.reload();
        return this._text;
      }
    },
  };
  Object.defineProperties(this, WatchJson);
};

DrawTop.Node.prototype.reload = function () {
  var parents = this.parentStages;
  if (parents) {
    for (var i = 0; i < parents.length; i++) {
      parents[i].reloadsize();
    }
  }
  return this;
};
DrawTop.Node.prototype.addEvent = function (event, fn) {
  this[event] = fn;
  return this;
};
DrawTop.Node.prototype.setLocation = function (x, y) {
  this.x = x;
  this.y = y;
  var parents = this.parentStages;
  if (parents) {
    for (var i = 0; i < parents.length; i++) {
      var parent = parents[i];
      parent.drawChild();
    }
  }
  return this;
};

DrawTop.Node.prototype.setDateValue = function (json) {
  if (toString.apply(json) === '[object Object]') {
    for (var i in json) {
      this.dataValue[i] = json[i];
    }
  } else {
    DrawTop.error && DrawTop.error('请传入Json对象');
  }
  return this;
};
DrawTop.Node.prototype.getDateValue = function () {
  return this.dataValue;
};

DrawTop.Link = function (from, to, config) {
  if (!(from && to)) {
    DrawTop.error && DrawTop.error('缺少节点参数');
    return { error: '缺少节点参数' };
  }
  if ((typeof (from) == 'number' && typeof (to) == 'number' && from == to) || from == to) {
    DrawTop.error && DrawTop.error('id相同，请不要自己连接自己');
    return { error: 'id相同，请不要自己连接自己' };
  }
  this.config = config || {};
  Object.defineProperty(this, 'id', { value: (this.config.id || parseInt((new Date).getTime() + '' + Math.floor(Math.random() * 10000))) });
  Object.defineProperty(this, 'type', { value: 'line' });
  // 初始化设置
  this.parentStages = [];
  this.strokeStyle = this.config.lineStrokeStyle || DrawTop.theme.lineStrokeStyle;
  this.lineWidth = this.config.lineLineWidth || DrawTop.theme.lineLineWidth;
  this.hoverLineStrokeStyle = this.config.hoverLineStrokeStyle || DrawTop.theme.hoverLineStrokeStyle;
  this.hoverLineWidth = this.config.hoverLineLineWidth || DrawTop.theme.hoverLineLineWidth;
  this.lineStartPlace = this.config.lineStartPlace || 'bottom';
  this.from = from;
  this.to = to;
  this.click = this.config.click || null;
  this.dataValue = this.config.dataValue || {};
  this.timeout = this.config.timeout || 1000;
  this.tips = this.config.tips;
  this.arrows = this.config.arrows || {};
  this.arrows.place =  this.arrows.place || { top: 0, left: 0 } ;
  this.arrows.show = (typeof (this.arrows.show) != 'undefined' && typeof (this.arrows.show) == 'boolean') ? this.arrows.show : true;
  this.arrows.imageicon = (typeof (this.arrows.imageicon) != 'undefined' && typeof (this.arrows.imageicon) == 'string') ? this.arrows.imageicon : '';
};

export default DrawTop;
