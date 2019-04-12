// ==UserScript==
// @name         外传5
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       ZERO
// @match        http://*.yytou.cn/*
// @exclude      http://res.yytou.cn/*
// @exclude      http://sword.mud.yytou.cn/*
// @grant        none
// ==/UserScript==

var btnList = {};       // 按钮列表
var buttonWidth = '100px';   // 按钮宽度
var buttonHeight = '20px';  // 按钮高度
var currentPos = 5;        // 当前按钮距离顶端高度，初始130
var delta = 25;                 // 每个按钮间隔

//按钮加入窗体中----------------------------
function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
}
function createButton(btnName,func){
    btnList[btnName]=document.createElement('button');
    var myBtn = btnList[btnName];
    myBtn.innerText = btnName;
    myBtn.style.position = 'absolute';
    myBtn.style.left = '1250px';
    myBtn.style.top = currentPos + 'px';
    currentPos = currentPos + delta;
    myBtn.style.width = buttonWidth;
    myBtn.style.height = buttonHeight;
    myBtn.addEventListener('click', func);
    document.body.appendChild(myBtn);
}


//按钮列表----------------------------------
createButton('独孤须臾',duguxuyuFunc);
createButton('独孤皇后',duguhuanghouFunc);
createButton('捕快统领',bukuaitonglingFunc);
createButton('千夜暗使',qianyeanshiFunc);
createButton('司马墉',simayongFunc);
createButton('毒王杀手',duwangshashouFunc);
createButton('嵬名元昊1',weimingyuanhao1Func);
createButton('元昊玄素',weimingyuanhao2Func);
createButton('杨玄素',yangxuansuFunc);

//独孤须臾
function duguxuyuFunc(){
    clickButton("kill changan_duguxuyu2");
}

//独孤皇后
function duguhuanghouFunc(){
    clickButton("kill changan_neigongjinwei");
}

//捕快统领
function bukuaitonglingFunc(){
    clickButton("kill changan_bukuaitongling");
}

//千夜暗使
function qianyeanshiFunc(){
    clickButton("kill songshan_qianyeanshi");
}

//司马墉
function simayongFunc(){
    clickButton("kill taishan_simayong");
}

//毒王杀手
function duwangshashouFunc(){
    clickButton("kill songshan_duwangshashou");
}

//嵬名元昊1
function weimingyuanhao1Func(){
    clickButton("kill jueqinggu_weimingyuanhao1");
}

//元昊玄素
function weimingyuanhao2Func(){
    clickButton("kill jueqinggu_yangxuansu");
}

//杨玄素
function yangxuansuFunc(){
    clickButton("kill changan_yangxuansu1");
}
