// ==UserScript==
// @name         yujian-80
// @namespace    https://github.com/yytou/yujian
// @version      1.0.4
// @description  遇剑MUD辅助脚本
// @author       游戏爱好者
// @match        http://*.yytou.cn/*
// @grant        none
// ==/UserScript== 520  620  720
//

// 引用入版本号
document.domain="yytou.cn";

var verJs = document.createElement("script");
verJs.type = "text/javascript";
verJs.src = "https://gway.cc/yujian/yujian-80-ver.js?s=1.0.4&v="+(new Date().getTime());
var node = document.getElementsByTagName('head')[0];
node.appendChild(verJs);

