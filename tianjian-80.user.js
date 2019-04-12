// ==UserScript==
// @name        tianjian-80
// @namespace    http://tampermonkey.net/
// @version      1.0.3
// @description  遇见MUD天剑辅助
// @author       游戏爱好者
// @match        http://*.yytou.cn/*
// @exclude      http://res.yytou.cn/*
// @grant        none
// ==/UserScript==

// 引用入版本号
var verJs = document.createElement("script");
verJs.type = "text/javascript";
verJs.src = "https://gway.cc/yujian/tianjian-80-ver.js?v="+(new Date().getTime());

var node = document.getElementsByTagName('head')[0];
node.appendChild(verJs);
