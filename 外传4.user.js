// ==UserScript==
// @name         外传4
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
var buttonHeight = '30px';  // 按钮高度
var currentPos = 5;        // 当前按钮距离顶端高度，初始130
var delta = 40;                 // 每个按钮间隔

//按钮加入窗体中----------------------------
function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
}
function createButton(btnName,func){
    btnList[btnName]=document.createElement('button');
    var myBtn = btnList[btnName];
    myBtn.innerText = btnName;
    myBtn.style.position = 'absolute';
    myBtn.style.left = '1300px';
    myBtn.style.top = currentPos + 'px';
    currentPos = currentPos + delta;
    myBtn.style.width = buttonWidth;
    myBtn.style.height = buttonHeight;
    myBtn.addEventListener('click', func);
    document.body.appendChild(myBtn);
}


//按钮列表----------------------------------
createButton('常一恶',changyieFunc);
createButton('第一次招魂师',zhaohunshiFunc);
createButton('程不为',chengbuweiFunc);


//常一恶
function changyieFunc(){
    clickButton("kill xiaoyao_mabangduozhu");
}

//第一次招魂师
function zhaohunshiFunc(){
    clickButton("kill changan_zhaohunshi1");
}

//程不为
function chengbuweiFunc(){
    clickButton("kill taishan_tiemianshashou");
}