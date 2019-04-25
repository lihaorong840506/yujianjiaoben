// ==UserScript==
// @name        自动扫图
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*.yytou.cn/*
// @exclude      http://res.yytou.cn/*
// @grant        none
// ==/UserScript==
var btnList = {};		// 按钮列表
var buttonWidth = '100px';	// 按钮宽度
var buttonHeight = '20px';	// 按钮高度
var currentPos = 10;		// 当前按钮距离顶端高度，初始130
var delta = 23;	                // 每个按钮间隔
//var corpseNPCLists = prompt("请输入要摸的目标","月老的尸体");

youxia_id = null;	// 游侠ID初始化
steps = 0;//路径记数清零
var imultiplePuzzle = 0;

var ipositiveKill=0;//刷正气  0：停止； 1：开始刷正气  杀段老大，二娘
var inegativeKill=0;//刷邪气  0：停止； 1：开始刷正气   查血量


mySkillLists = "排云掌法;九天龙吟剑法;如来神掌;无相金刚掌;六脉神剑";
qxNpcList = "浪唤雨;王蓉;庞统;李宇飞;步惊鸿;风行骓;郭济;吴缜;风南;火云邪神;逆风舞;狐苍雁;护竺";
var forceList = "天邪神功;生生造化功;道种心魔经;混元一气功;易筋经神功";
var qlEquipList ="斩龙宝靴;龙皮至尊衣;斩龙宝戒;斩龙帽;斩龙宝链;斩龙宝镯;飞宇天怒刀;九天龙吟剑;小李飞刀;天罡掌套;乌金玄火鞭;开天宝棍;达摩杖";



//var ql_req = '狂暴丹小还丹乾坤再造丹紫芝灵草疯魔杖毒龙鞭玉清棍生死符霹雳掌套血屠刀星河剑残雪帽残雪戒残雪鞋残雪手镯残雪项链金丝宝甲衣烈日棍西毒蛇杖冰魄银针碧磷鞭--倚天剑屠龙刀墨玄掌套明月帽明月鞋明月项链明月戒月光宝甲衣明月手镯残阳棍伏虎杖暴雨梨花针七星鞭--诛仙剑斩神刀龙象拳套烈日帽烈日宝靴烈日宝链烈日宝戒日光宝甲衣烈日宝镯开天宝棍达摩杖小李飞刀乌金玄火鞭--九天龙吟剑飞宇天怒刀天罡掌套斩龙帽斩龙宝靴斩龙宝链斩龙宝戒龙皮至尊甲衣斩龙宝镯';
//var ql_req = '狂暴丹小还丹乾坤再造丹紫芝灵草--明月项链明月戒--诛仙剑龙象拳套烈日帽烈日宝靴烈日宝链烈日宝戒日光宝甲衣烈日宝镯--九天龙吟剑飞宇天怒刀天罡掌套斩龙帽斩龙宝靴斩龙宝链斩龙宝戒龙皮至尊甲衣斩龙宝镯';
//ql_req0 = '天寒帽天寒戒天寒鞋天寒项链天寒手镯软甲衣金刚杖飞羽剑斩空刀拜月掌套金弹子新月棍白蟒鞭--疯魔杖毒龙鞭玉清棍生死符霹雳掌套血屠刀星河剑残雪帽残雪戒残雪鞋残雪手镯残雪项链金丝宝甲衣';
//ql_req1 = '天寒帽天寒戒天寒鞋天寒项链天寒手镯软甲衣金刚杖飞羽剑斩空刀拜月掌套金弹子新月棍白蟒鞭--疯魔杖毒龙鞭玉清棍生死符霹雳掌套血屠刀星河剑残雪帽残雪戒残雪鞋残雪手镯残雪项链金丝宝甲衣--烈日棍西毒蛇杖冰魄银针碧磷鞭--倚天剑屠龙刀墨玄掌套明月帽明月鞋明月项链明月戒月光宝甲衣明月手镯';
//天寒：狂暴丹小还丹乾坤再造丹紫芝灵草天寒帽天寒戒天寒鞋天寒项链天寒手镯软甲衣金刚杖飞羽剑斩空刀拜月掌套金弹子新月棍白蟒鞭
//残雪：疯魔杖毒龙鞭玉清棍生死符霹雳掌套血屠刀星河剑残雪帽残雪戒残雪鞋残雪手镯残雪项链金丝宝甲衣
//明月：烈日棍西毒蛇杖冰魄银针碧磷鞭--倚天剑屠龙刀墨玄掌套明月帽明月鞋明月项链明月戒月光宝甲衣明月手镯
//烈日：残阳棍伏虎杖暴雨梨花针七星鞭--诛仙剑斩神刀龙象拳套烈日帽烈日宝靴烈日宝链烈日宝戒日光宝甲衣烈日宝镯
//斩龙：开天宝棍达摩杖小李飞刀乌金玄火鞭--九天龙吟剑飞宇天怒刀天罡掌套斩龙帽斩龙宝靴斩龙宝链斩龙宝戒龙皮至尊甲衣斩龙宝镯


//获得了战利品：天罡掌套x1
var isDelayCmd = 1, // 是否延迟命令
    cmdCache = [],      // 命令池
    timeCmd = null,     // 定时器句柄
    cmdDelayTime = 200; // 命令延迟时间

// 执行命令串
function go(str) {
    var arr = str.split(";");
    if (isDelayCmd && cmdDelayTime) {
        // 把命令存入命令池中
        cmdCache = cmdCache.concat(arr);

        // 当前如果命令没在执行则开始执行
        if (!timeCmd) delayCmd();
    } else {
        for (var i = 0; i < arr.length; i++) clickButton(arr[i]);
    }
}

// 执行命令池中的命令
function delayCmd() {
    // 执行命令池中第一个命令，并从池中删除
    var cmd=cmdCache.shift();
    var arr=cmd.split(",");
    if(!sock) {
        return;
    }
    clickButton(arr[0]);
    for(var i=arr.length-1;i>0;i--){
        cmdCache.unshift(arr[i]);
    }

    // 如果命令池还有命令，则延时继续执行
    if (cmdCache.length > 0) {
        timeCmd = setTimeout(delayCmd, cmdDelayTime);
    } else {
        // 没有命令 则归零
        timeCmd = 1;
        setTimeout(function(){
            if(cmdCache.length === 0)
                timeCmd=0;
            else
                delayCmd();
        },cmdDelayTime);
    }

}
// 停止执行
function stopDelayCmd() {
    // 清除计时器
    clearTimeout(timeCmd);

    // 归零计时器
    timeCmd = 0;

    // 清除命令池
    cmdCache = [];
}


function sleep(d){
    for(var t = Date.now();Date.now() - t <= d;);
}

function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
}
var myname = "我是谁";
var myMaxKee=0;
function WhoAmIFunc() {
    go('home_prompt');    // 主页
    go('score');    // 状态
    console.log("whoami1");
    var elem = $('span.out3:contains(】)').first();
    var m = elem.text().match(/】(.*)/);


   //  go('score');    // 状态
    var qixue = $('span.out3:contains(【气血】)').text();
    var neili = $('span.out3:contains(【内力】)').text();
    console.log(qixue);
    var qixueNum = qixue.match(/\d{1,}/g);// 气血
    var neiliNum = neili.match(/\d{1,}/g);// 内力
    var isMax = qixueNum[1] - qixueNum[0];
    myMaxKee=qixueNum[1] ;

    if (m != null) {
        myname = m[1];
        btnList["我是谁"].innerText =  myname;
    }
    go("prev");
}

function WhoAmI1Func() {
    console.log("whoami1");
    var elem = $('span.out3:contains(】)').first();
    var m = elem.text().match(/】(.*)/);


   //  go('score');    // 状态
    var qixue = $('span.out3:contains(【气血】)').text();
    var neili = $('span.out3:contains(【内力】)').text();
    console.log(qixue);
    var qixueNum = qixue.match(/\d{1,}/g);// 气血
    var neiliNum = neili.match(/\d{1,}/g);// 内力
    var isMax = qixueNum[1] - qixueNum[0];
    myMaxKee=qixueNum[1] ;

    if (m != null) {
        myname = m[1];
        btnList["我是谁"].innerText =  myname;
    }
    go("prev");
}
createButton('回主页',GoHomeFunc);
//createButton('我是谁',WhoAmIFunc);
createButton('自动战斗',AutoKillFunc);
//createButton('摸尸体',AutoGetFunc);
//createButton('战斗装',ZhuangBei);
//createButton('领奖',getRewardsFunc);
createButton('签到',CheckInFunc);
createButton('洛阳理财',luoyangBankFunc);
//createButton('直达赌锭',goldFunc);
//createButton('大昭面壁',MianBiFunc);
//createButton('侠客日常',RiChangFunc);
//createButton('冰月谷',BingYueFunc);
//createButton('钓鱼',fishingFunc);
//createButton('开答题',answerQuestions2Func);
//createButton('试剑',ShiJianFunc);
//createButton('打排行榜',PaiHangFunc);
//createButton('一键VIP',VipGetFunc);
//createButton('自动答题',answerQuestionFunc);
createButton('包裹整理', clearBag);
//createButton('帮派21',bangpaiFunc);
//createButton('师门26',shimenFunc);
//createButton('孽龙',nielongFunc);
//createButton('军阵',pozhenFunc);
//createButton('金狼',jinlangFunc);
//createButton('买千年',buyMedecineFunc);


//createButton('出海',fishingFirstFunc);
//createButton('莲花鳄鱼',pickingLotusFunc);
//createButton('喂鳄鱼',WeiYuFunc);
//createButton('疗伤10',LiaoShangFunc);
//createButton('吃千年',userMedecineFunc);
createButton('清谜题',clearPuzzleFunc);
//createButton('加力',enforceFunc);
//createButton('刷青竹蛇',SnakeFunc);
//createButton('杀坏人',killHongMingTargetFunc);
//createButton('杀好人',killHuangMingTargetFunc);
//createButton('杀天剑',killTianJianTargetFunc);
//createButton('买东西',buyOneBeeFunc);
//createButton('比试奇侠',BiShiFunc);
//createButton('三新门派',sanmenpaiFunc);
//createButton('帮派任务',BangPaiFunc);
//createButton('师门任务',ShiMenFunc);
//切小号（切之前请提前切一次，小号不要点取消或接受点下观察即可）--------------------------------
//createButton('切小号',BiShi2Func);
//createButton('青龙监听',listenQLFunc);
//createButton('杀NPC',killQLNPCTargetFunc);
//createButton('游侠监听',listenYXFunc);

//createButton('跨服监听',listenKFFunc);
//createButton('飞跨服',kuafuFlyFunc);


//createButton('逃跑',escapeFunc);
//createButton('刷正气',positiveKill);
//createButton('刷邪气',negativeKill);

//createButton('谜题',PuzzleFunc);


//createButton('地图',testMapPath);
createButton('单谜题',NpcBatchAskFunc);
createButton('自动迷题',listenPuzzleFunc);
createButton('进度',PuzzleNextFunc);
createButton('进度设置',PuzzleNPCGoFunc);
createButton('迷题扫图',GetNPCStart);
createButton('雪亭镇',GoStartXTZ);
createButton('洛阳',GoStartLY);
createButton('华山村',GoStartHSC);
createButton('华山',GoStartHS);
createButton('扬州',GoStartYZ);
createButton('丐帮',GoStartGB);
createButton('乔阴县',GoStartQYX);
createButton('恒山',GoStartHS1);
createButton('武当山',GoStartWDS);
createButton('水烟阁',GoStartSYG);
createButton('唐门',GoStartTM);
createButton('逍遥林',GoStartXYL);
createButton('开封',GoStartKF);
createButton('明教',GoStartMJ);
createButton('全真教',GoStartQZJ);
createButton('古墓',GoStartGM);
createButton('白驮山',GoStartBTS);
createButton('嵩山',GoStartSS);
createButton('寒梅庄',GoStartHMZ);
createButton('泰山',GoStartTS);
createButton('大昭寺',GoStartDZS);




//createButton('雪亭镇',GetNPCXT);

var Puzzletrigger=0;
function listenPuzzleFunc(){
    if (Puzzletrigger==0){
        Puzzletrigger=1;
        btnList["自动迷题"].innerText = '手动迷题';
    }else if (Puzzletrigger==1){
        Puzzletrigger=0;
        clearInterval(PuzzleActIntervalFunc);
        btnList["自动迷题"].innerText = '自动迷题';
    }
}



 // 雪亭镇  洛阳 华山村 华山 扬州 丐帮 乔阴县 峨眉山 恒山 武当山 晚月庄 水烟阁 少林寺 唐门 青城山 逍遥林 开封 光明顶 全真教 古墓 白驮山

function testMapPath() {
      var w='雪亭镇';
      if (w.startsWith("雪亭镇")) {
			go_path = "jh 1;e;s;w;w;e;s;n;e;e;ne;ne;sw;sw;n;w;n;e;e;n;s;e;e;n;s;e;w;s;n;w;w;w;w;w;e;n;w;e;n;w;e;e;e;w;w;n;n;s;e;w;w";
        } else if (w.startsWith("洛阳")) {
			go_path = "jh 2;n;n;e;s;n;w;n;e;s;n;w;w;e;n;w;s;w;e;n;e;e;s;n;w;n;w;n;n;w;e;s;s;s;n;w;n;n;n;e;w;s;s;w;e;s;e;e;e;n;s;e;n;n;w;e;e;n;s;w;n;w;e;n;e;w;n;w;e;s;s;s;s;s;w;w;n;w;e;e;n;s;w;n;e;w;n;w;e;e;w;n;e;n;n";
        } else if (w.startsWith("华山村")) {
			go_path = "jh 3;n;e;w;s;w;e;s;e;n;s;w;s;e;s;n;w;w;n;s;e;s;s;w;n;s;e;s;e;w;nw;n;n;e;w;n;w;e;n;n;w;e;e;w;n";
        } else if (w.startsWith("华山")) {
			go_path = "jh 4;n;n;w;e;n;e;w;n;n;n;e;n;n;s;s;w;n;n;w;s;n;w;n;s;e;e;n;e;n;n;w;e;n;e;w;n;e;w;n;s;s;s;s;s;w;n;w;e;n;n;w;e;e;s;s;n;n;n;n;s;s;w;n";
        } else if (w.startsWith("扬州")) {
			go_path = "jh 5;n;w;w;n;s;e;e;e;w;n;w;e;e;w;n;w;e;n;w;e;n;w;w;s;s;n;n;n;n;w;n;n;n;s;s;s;e;e;w;n;s;s;s;e;e;e;n;n;n;s;s;w;n;e;n;n;s;s;e;n;n;w;n;n;s;s;w;s;s;e;e;s;w;s;w;n;w;e;e;n;n;e;w;w;e;n;n;s;s;s;s;w;n;w;e;e;w;n;w;w;n;s;e;e;n;e;s;e;s;s;s;n;n;n;w;n;w;w;s;n;w;n;w;e;e;w;n;n;w;n;s;e;e;s;n;w;n";
        } else if (w.startsWith("丐帮")) {
			go_path = "jh 6;event_1_98623439;ne;n;ne;ne;ne;sw;sw;sw;s;ne;ne;sw;sw;sw;s;w";
        } else if (w.startsWith("乔阴县")) {
			go_path = "jh 7;s;s;s;w;s;w;w;w;e;e;e;e;s;s;e;n;n;e;w;s;s;w;s;w;w;w;n;s;s;e;n;s;e;ne;s;e;n;e;s;e";
        } else if (w.startsWith("峨眉山")) {
			go_path = "jh 8;ne;e;e;e;e;w;n;s;s;n;w;w;w;sw;w;nw;n;n;n;n;w;e;se;nw;e;n;s;e;n;n;e;halt;n;n;n;e;e;w;w;w;n;n;n;w;w;s;e;w;s;e;w;w;e;n;w;e;n;w;w;n;s;sw;ne;e;e;n;e;w;w;e;n;e;w;w;e;n;w;w;w;n;n;n;s;s;s;e;e;e;e;e;e;e;e;e;w;w;s;e;w;w;e;s;e;w;w;e;s;e;e;w;w;s;e;w;w;e;s;e;w;w;e;n;n;w;w;n;n;n;n;w;n;s;w;e;s;n;e;n;n;n;n;s;s;nw;nw;n;n;s;s;se;sw;w;nw;w;e;se;e;ne;se;ne;se;s;se;nw;n;nw;ne;n;s;se;e";
        } else if (w.startsWith("恒山")) {
			go_path = "jh 9;n;w;e;n;e;w;n;w;e;n;e;w;n;n;n;w;n;s;s;n;e;e;n;s;e;w;w;n;n;w;n;e;w;n;n;w;e;n";
        } else if (w.startsWith("武当山")) {
			go_path = "jh 10;w;n;n;w;w;w;n;n;n;n;n;w;n;s;e;n;n;n;n;s;s;s;s;e;e;s;n;e;e;w;w;w;w;s;e;e;e;e;s;e;s;e;n;s;s;n;e;e;n;s;e;w;s;s;s";
        } else if (w.startsWith("晚月庄")) {
			go_path = "jh 11;e;e;n;e;s;sw;se;s;s;s;s;s;s;se;s;n;ne;n;nw;w;w;s;s;w;e;se;e;n;n;n;n;n;n;w;n;s;w;n;w;e;s;w;w;e;s;n;e;s;w;e;s;e;e;e;w;w;w;w;w;n;s;s;n;e;s;n;e;s;w;w;e;e;e;s;s;e;w;w;s;e;e;w;w;n;e;w;w;w;e;n;n;n;s;w;e;s;e;s;n;n;e";
        } else if (w.startsWith("水烟阁")) {
			go_path = "jh 12;n;e;w;n;n;n;s;w;n;n;e;w;s;nw;e;n;s;e;sw;n;s;s;e";
        } else if (w.startsWith("少林寺")) {
			go_path = "jh 13;e;s;s;w;w;w;e;e;n;n;w;n;w;w;n;s;e;e;n;e;w;w;e;n;n;e;w;w;e;n;n;e;w;w;e;n;n;e;w;w;e;n;n;e;s;s;s;s;s;s;s;s;n;n;n;n;n;n;n;n;w;w;s;s;s;s;s;s;s;s;n;n;n;n;n;n;n;n;e;n;e;w;w;e;n;w;n";
        } else if (w.startsWith("唐门")) {
			go_path = "jh 14;e;w;w;n;n;n;n;s;w;n;s;s;n;w;n;s;s;n;w;n;s;s;n;w;e;e;e;e;e;s;n;e;n;e;w;n;n;s;ask tangmen_tangmei;ask tangmen_tangmei;e;event_1_8413183;event_1_39383240;e;s;e;n;w;n;n";
        } else if (w.startsWith("青城山")) {
			go_path = "jh 15;s;s;e;w;w;n;s;e;s;e;w;w;w;n;s;s;s;n;n;w;w;w;n;s;w;e;e;e;e;e;e;s;e;w;w;e;s;e;w;s;w;s;ne;s;s;s;e;s;n;w;n;n;n;n;n;n;n;n;n;n;nw;w;nw;n;s;w;s;s;s;halt;w;w;w;w;n;e;n;s;s;s;n;e;n;e;w;w;e;n;s;s;e";
        } else if (w.startsWith("逍遥林")) {
			go_path = "jh 16;s;s;s;s;e;e;e;s;w;w;w;w;w;e;n;s;s;n;e;e;n;n;s;s;s;s;n;n;e;n;s;s;s;n;n;e;e;n;n;e;event_1_5221690;s;w;event_1_57688376;n;n;w;w;e;n;s;e;e;n;s;e;n;n;w;n;e;n";
        } else if (w.startsWith("开封")) {
			go_path = "jh 17;sw;s;sw;nw;ne;sw;se;ne;n;ne;n;w;e;e;s;n;w;n;w;n;n;s;s;e;e;e;n;n;s;s;s;n;w;s;s;s;w;e;e;n;s;e;e;w;w;s;n;w;s;w;e;n;n;n;n;w;n;e;w;n;w;e;e;w;n;e;n;n;n;s;s;s;w;s;s;s;s;s;e;s;s;s;e;w;s;s;w";
        } else if (w.startsWith("光明顶")) {
			go_path = "jh 18;e;w;w;n;s;e;n;nw;n;n;w;e;n;n;n;ne;n;n;w;e;e;w;n;w;e;e;w;n;n;w;w;s;n;n;e;e;e;e;s;se;se;e;w;nw;nw;w;w;n;w;w;n;n;e;nw;se;e;e;e;se;e;w;sw;s;w;w;n;e;w;n;e;w;w;e;n;n;n;n;w;e;n;event_1_90080676;event_1_56007071;ne;n";
        } else if (w.startsWith("全真教")) {
			go_path = "jh 19;s;s;s;sw;s;e;n;nw;n;n;n;n;e;w;w;e;n;e;n;s;e;e;w;n;n;s;s;w;w;w;w;w;w;s;n;e;s;n;e;e;e;n;n;w;w;s;s;n;n;w;s;s;n;n;w;n;n;n;n;n;n;e;n;e;e;n;n;s;s;e;e;e;e;s;e;s;s;s;n;w;n;s;s;s;s;w;s;n;w;n;e;n;n;n;s;w;n;n;n;s;s;s;w;n;s;w;n;s;s;s;e;n;n;e;s;s;s;w";
        } else if (w.startsWith("古墓")) {
			go_path = "jh 20;s;s;n;n;w;w;s;e;s;s;s;s;s;sw;sw;s;e;se;nw;w;s;w;e;e;w;s;s;w;w;e;s;sw;ne;e;s;s;w;w;e;e;s;n;e;e;e;e;s;e;w;n;w;n;n;s;e;w;w;s;n;n;n;n;s;e;w;w";
        } else if (w.startsWith("白驮山")) {
			go_path = "jh 21;nw;s;n;ne;ne;sw;n;n;ne;w;e;n;n;w;w;e;e;s;s;sw;s;s;sw;w;n;s;w;nw;e;w;nw;nw;n;w;sw;ne;e;s;se;se;n;e;w;n;n;w;e;n;n;w;w;w;n;n;n;n;s;s;s;e;e;e;n;s;s;n;e;e;e;w;ne;sw;n;n;w;e;e;e;w;w;n;nw;se;ne;w;e;e;w;n";
        } else if (w.startsWith("嵩山")) {
			go_path = "jh 22";
        } else if (w.startsWith("寒梅庄")) {
			go_path = "jh 23";
        } else if (w.startsWith("泰山")) {
			go_path = "jh 24";
        } else if (w.startsWith("大旗门")) {
			go_path = "jh 25";
        } else if (w.startsWith("大昭寺")) {
			go_path = "jh 26";
        } else if (w.startsWith("魔教")) {
			go_path = "jh 27";
        }
		go_steps(go_path);
}

function luoyangBankFunc() {
    go("jh 2;n;n;n;n;n;n;;n;e");
    go('tzjh_lq');
   go('home');
}

var kfMonitor = 0;
var kfKind = "";
function listenKFFunc() {
    if (kfMonitor==0){
        kfMonitor=1;
        btnList["跨服监听"].innerText = '停止跨服';
    }else if (kfMonitor==1){
        kfMonitor=0;
        btnList["跨服监听"].innerText = '跨服监听';
    }
}

var kf = "";
var killtimes = 0;

function kuafuFlyFunc() {
    console.log(kf);
    if (kf.match("find_qinglong_road.*") != null)
        eval(kf);
    else
        go_ql(kf);
    //killHongMingTargetFunc();
}

function zhengli(itemName, itemid, action, limit) {
    var m = $('#out table:eq(2) tr span:contains('+itemName+')');
    if (m != null) {
        m = m.parent().parent().find('span').filter(function () {
            return new RegExp("[0-9]+").test($(this).text());
        });
        var num = m.text().match(/(\d+)/);
        if (num == null)
            return;
        //   var exec = "clickButton('items "+action+" "+itemid+"')";
        var exec = "items "+action+" "+itemid;

        console.log(exec);
        num = parseInt(num[0]);
        if (action == "put_store")
            num = 1;
        if (limit != null)
            num = limit;
        for (var i = 0; i < num; ++i) {
            //      eval(exec);
            go(exec);
        }
    }
}
/*
function baoguoZhengli1Func() {
    //宝石
    /*
   zhengli("碎裂的红宝石", "hongbaoshi1", "put_store");
    zhengli("裂开的红宝石", "hongbaoshi2", "put_store");
    //zhengli("红宝石",      "hongbaoshi3", "put_store");
    zhengli("碎裂的绿宝石", "lvbaoshi1", "put_store");
    zhengli("裂开的绿宝石", "lvbaoshi2", "put_store");
    //zhengli("绿宝石",      "lvbaoshi3", "put_store");
    zhengli("碎裂的黄宝石", "huangbaoshi1", "put_store");
    zhengli("裂开的黄宝石", "huangbaoshi2", "put_store");
    //zhengli("黄宝石",      "huangbaoshi3", "put_store");
    zhengli("碎裂的紫宝石", "zishuijing1", "put_store");
    zhengli("裂开的紫宝石", "zishuijing2", "put_store");
    //zhengli("紫宝石",      "zishuijing3", "put_store");
    zhengli("碎裂的蓝宝石", "lanbaoshi1", "put_store");
    zhengli("裂开的蓝宝石", "lanbaoshi2", "put_store");
    //zhengli("蓝宝石",      "lanbaoshi3", "put_store");
    
    zhengli("武穆遗书",    "obj_wumu-yishu", "put_store");
    zhengli("百宝令",    "obj_baibaoling", "put_store");
    zhengli("白银宝箱",    "baiyin box", "put_store");
    zhengli("玄铁令", "obj_xuantieling", "put_store");
    zhengli("玄重铁", "obj_xuanzhongtie", "put_store");
    zhengli("驻颜丹", "zhuyan dan", "put_store");
    zhengli("黄金宝箱", "huangjin box", "put_store");
    zhengli("玄铁碎片", "xuantie suipian", "put_store");
    zhengli("金锭", "obj_jinding", "put_store");
    zhengli("左手兵刃研习", "leftweapon book", "put_store");
    zhengli("玫瑰花","meigui hua", "put_store");
    zhengli("玄武碎片","xuanwu_suipian", "put_store");
    zhengli("白虎碎片","baihu_suipian", "put_store");
    zhengli("青龙碎片","qinglong_suipian", "put_store");
    zhengli("朱雀碎片","zhuque suipian", "put_store");



    // sell
    zhengli("钢剑","gangjian1", "sell");
    zhengli("钢剑","weapon_sword2", "sell");
    zhengli("长剑","changjian_cj", "sell");
    zhengli("单刀","weapon_blade1", "sell");
    zhengli("鬼头刀","weapon_blade2", "sell");
    zhengli("铁戒","equip_finger1", "sell");
    zhengli("破披风","equip_surcoat1", "sell");
    zhengli("布衣","cloth", "sell");
    zhengli("布衣","equip_cloth1", "sell");
    zhengli("长斗篷","equip_surcoat2", "sell");
    zhengli("军袍","equip_surcoat3", "sell");
    zhengli("丝质披风","equip_surcoat4", "sell");
    zhengli("羊毛斗篷","equip_surcoat5", "splite");
    zhengli("木盾","equip_shield1", "sell");
    zhengli("牛皮带","equip_waist3", "sell");
    zhengli("铁盾","equip_shield2", "sell");
    zhengli("藤甲盾","equip_shield3", "sell");
    zhengli("青铜盾","equip_shield4", "sell");
    zhengli("麻带","equip_waist1", "sell");
    zhengli("鞶革","equip_waist2", "sell");
    zhengli("锦缎腰带","equip_waist4", "sell");
    zhengli("树枝","binghuo_shuzhi", "sell");
    zhengli("鲤鱼","binghuo_liyu", "sell");
    zhengli("鲫鱼","binghuo_jiyu", "sell");
    zhengli("破烂衣服","binghuo_polanyifu", "sell");
    zhengli("水草","binghuo_shuicao", "sell");
    zhengli("莲蓬","changan_lianpeng", "sell");
    zhengli("七星宝戒","qixing baojie", "sell");


    zhengli("神秘宝箱","obj_shenmi_box", "use");
    zhengli("长生石宝箱","dali_changshengshibaoxiang", "use");
    zhengli("灵草","qiannian lingcao", "use");
    zhengli("紫芝","qiannian zizhi", "use");
    zhengli("百年紫芝","bainian qiannian zizhi", "use");
    zhengli("乾坤再造丹","qiankun dan", "use");

    zhengli("冰镇酸梅汤","obj_bingzhen_suanmeitang", "use", 1);
    zhengli("高级狂暴丹","gaoji kuangbao dan", "use");
    zhengli("高级大还丹","gaoji dahuan dan", "use");
    zhengli("小还丹","xiaohuan dan", "use");
    zhengli("狂暴丹","kuangbao dan", "use");
    zhengli("突破丹礼包","tupodan_libao", "use");

}

function baoguoZhengliFunc() {
    go("score");
    go("items", 0);
    setTimeout(baoguoZhengli1Func,1000);
}
*/
// 包裹整理 ------------------------
var clb_time;
var clb_flag=true;
function clearBag(){
    clb_flag=false;
    go('items',0);
    clearInterval(clb_time);
    clb_time=setInterval(clearitem,400);
}
var items_use='乾坤袋青凤纹绶热血印风云宝箱高级狂暴丹特级狂暴丹保险卡特级大还丹高级大还丹小还丹百年紫芝百年灵草特级乾坤再造丹高级乾坤再造丹神秘宝箱';
var items_store='狗年礼券 茉莉汤朱果『秘籍木盒』 优昙仙露 玫瑰花『神匠宝箱』百宜雪梅长生石千年紫芝千年灵草驻颜丹烧香符周年礼券玄重铁江湖令谜题令正邪令状元贴装备打折卡碎片鎏金黑玉锥玄铁令';
//冰月羽-
var items_study='武穆遗书';
var items_splite='翎眼赤护青鸾护臂苍狼护臂宝玉甲 天寒匕 貂皮斗篷 白玉腰束 无心匕 玄武盾 月光宝甲 沧海护腰 夜行披风虎皮腰带红光匕金丝甲羊毛斗篷破军盾金丝甲疯魔杖毒龙鞭玉清棍生死符霹雳掌套血屠刀残雪帽残雪戒残雪鞋残雪手镯残雪项链金丝宝甲衣';
var items_sell='蛮刀漫天花雨匕三清神冠七星翻云靴咒剑王□鲜红锦衣牛皮靴八角锤灰雁七星宝戒船桨白金项链断云斧乌夷长裙红色绸裙包子大剪刀黑水伏蛟帝王剑麻布手套银丝帽吴钩绵裙铜钹大刀紫袍铁笛圣火令绿罗裙绣花针清心散垓下刀紫金杖阿拉伯弯刀青锋剑青布袍淑女剑紫霜血蝉衣软金束带穿花蛇影鞋魔鞭翩珑大红僧袍九环禅杖精铁棒毒蒺藜暗灵桃木剑横断钩银丝链甲衣天魔刀玉竹杖叫化鸡七星剑逆钩匕银丝甲天寒帽天寒戒天寒鞋天寒项链天寒手镯软甲衣金刚杖飞羽剑斩空刀拜月掌套金弹子新月棍白蟒鞭硫磺木戟黑袍粗布白袍长戟回旋镖拂尘松子白色棋子黑色棋子竹节鞭白棋子木叉银色丝带波斯长袍铁鞭竹刀长虹剑莲蓬鲤鱼窄裉袄灵芝锦衣台夷头巾毛毯废焦丹废药渣台夷头巾粉红绸衫灰燕野山鸡麻雀岩鸽瑶琴维吾尔族长袍旧书桃符纸木锤木钩竹鞭木刀木枪木剑彩巾彩靴彩帽彩带彩镯彩衣砍刀绣花鞋舞蝶彩衫军刀铁扇剑割鹿刀大理雪梨圆领小袄皮帽弯月刀兔肉粗磁大碗羊肉串天山雪莲青铜盾禅杖金刚罩丝质披风暗箭青葫芦松子铁斧水蜜桃蓑衣破弯刀柴刀丝衣长鞭道德经布裙钢丝甲衣牛皮带制服金刚杖斩空刀拜月掌套金弹子新月棍白蟒鞭-草莓玉蜂浆玉蜂蜜蜂浆瓶豆浆蛋糕菠菜粉条包裹鸡叫草水密桃--新月棍银簪重甲羊角匕梅花匕日月神教腰牌船篙-丝绸马褂白缨冠白色长袍蛇杖鬼头刀拐杖古铜缎子袄裙大环刀鹿皮手套丝绸衣羊毛裙牧羊鞭牛皮酒袋麻带钢剑钢杖藤甲盾长斗篷军袍破披风木盾铁盾锦缎腰带鞶革青色道袍-鲫鱼树枝水草破烂衣服-鹿皮小靴青绫绸裙粗布衣草帽草鞋布鞋精铁甲-柳玉刀玉竹剑钢刀戒刀单刀长剑长枪铁锤木棍轻罗绸衫兽皮鞋皮鞭铁棍飞镖匕首细剑绣鞋绣花小鞋狼皮雪靴金戒金手镯铁戒银戒铁手镯银手镯铁项链银项链';

function clearitem(){
    var t=$("tr[bgcolor]:contains(两)").siblings();
    if(t.length>0){
        clearInterval(clb_time);
        for(var i=0;i<t.length;i++){
            if(t.eq(i)[0].innerText.replace(/\s+/g,"")!=""){
                var a=t.eq(i).find('td')[0].innerText.replace('\n',"");
                var b=parseInt(t.eq(i).find('td')[1].innerText.match(/\d+/g)[0]);
                var c=t[i].getAttribute('onclick').split("'")[1].split("info ")[1];
                if(items_use.indexOf(a)!=-1){
                    console.log("使用："+a+" 数量："+b);
                    for(j=0;j<b;j++){go('items use '+c);
                                    }
                }else if(items_study.indexOf(a)!=-1){
                    console.log("学习："+a+" 数量："+b);
                    for(j=0;j<b;j++){go('study '+c);
                                    }
                }else if(items_sell.indexOf(a)!=-1){
                    console.log("卖掉："+a+" 数量："+b);
                    for(j=0;j<Math.floor(b/10);j++){
                        go('items sell '+c+'_N_10');
                    }
                    for(j=0;j<(b%10);j++){
                        go('items sell '+c);
                    }
                }else if(items_splite.indexOf(a)!=-1){
                    console.log("分解："+a+" 数量："+b);
                    for(j=0;j<Math.floor(b/10);j++){
                        go('items splite '+c+'_N_10');
                    }
                    for(j=0;j<(b%10);j++){
                        go('items splite '+c);
                    }
                }else if(items_store.indexOf(a)!=-1){
                    console.log("存仓库："+a+" 数量："+b);
                    go('items put_store '+c);
                }
                if(a.indexOf('】璞玉')!=-1){
                    console.log("存仓库："+a+" 数量："+b);
                    go('items put_store '+c);
               /*  }
              if(a.indexOf('残页』')!=-1){
                    console.log("存仓库："+a+" 数量："+b);
                    go('items put_store '+c);
                }
                if(a.indexOf('宝石')!=-1){
                    console.log("存仓库："+a+" 数量："+b);
                    go('items put_store '+c);*/
                }
                if(a.indexOf('基础')!=-1||a.indexOf('中级')!=-1||a.indexOf('进阶')!=-1||a.indexOf('衫')!=-1||a.indexOf('劲服')!=-1||a.indexOf('袈裟')!=-1||a.indexOf('吹雪')!=-1||a.indexOf('圣衣')!=-1||a.indexOf('道袍')!=-1||a.indexOf('水烟阁')!=-1){
                    console.log("卖掉："+a+" 数量："+b);
                    for(j=0;j<b;j++){go('items sell '+c);
                                    }
                }
            }
        }
        go('use_all');
    }
}
function createButton(btnName,func){
    btnList[btnName]=document.createElement('button');
    var myBtn = btnList[btnName];
    myBtn.innerText = btnName;
    myBtn.style.position = 'absolute';
    myBtn.style. right = '0px';
    myBtn.style.top = currentPos + 'px';
    currentPos = currentPos + delta;
    myBtn.style.width = buttonWidth;
    myBtn.style.height = buttonHeight;
    myBtn.addEventListener('click', func);

    // 按钮加入窗体中
    document.body.appendChild(myBtn);
}

/**
window.go = function(dir) {
    console.debug("开始执行：", dir);
    var d = dir.split(";");
    for (var i = 0; i < d.length; i++)
        clickButton(d[i], 0);
};
*/

//回主页-------------------------
function GoHomeFunc(){
    clickButton('home');     //回主页
}
// 签到---------投食、破阵、神兵 -------------------------------------------------
function CheckInFunc(){ // 进入扬州
    console.log('签到一次！');

    go('jh 1;baixinnian;look_npc snow_mercenary');
    libao_ing = setInterval(autoLiBao,1000);

    // clickButton('home');  //回主页
    //  clickButton('exercise stop');  //停止打坐
    //  clickButton('exercise');  //打坐
    //  clickButton('home');     //回主页
    //clickButton('shop money_buy shop1_N_10'); // 引路蜂
    // clickButton('cangjian get_all'); // 一键领取藏剑楼奖励
    //  clickButton('xueyin_shenbinggu blade get_all'); // 一键领取霸刀楼奖励
    //  clickButton('xueyin_shenbinggu unarmed get_all'); // 一键领取铁拳楼奖励
    //  clickButton('xueyin_shenbinggu throwing get_all'); // 一键领取天机楼奖励
    //  clickButton('home');     //回主页
    // 采莲花----------------------------------------------------
    /*
    clickButton('jh 2');       // 进入洛阳
    clickButton('go north');     // 南郊小路
    clickButton('go north');   // 南门
    clickButton('go north');    // 南大街
    clickButton('go north');     // 洛川街
    clickButton('go north');   // 中心鼓楼
    clickButton('go north');    // 中州街
    clickButton('go north');     // 北大街
    clickButton('go north');   // 北门
    clickButton('go north');    // 北郊小路
    clickButton('go north');    // 北郊小路
    clickButton('go north');    // 北郊小路
    clickButton('go north');    // 北郊小路
    clickButton('go north');    // 北郊小路
    clickButton('go north');    // 瓮城
    clickButton('go north');    // 明德门
    clickButton('go north');    // 承天门大街
    clickButton('go north');    // 承天门大街
    clickButton('go north');    // 承天门大街
    clickButton('go north');    // 承天门大街
    clickButton('go east');    // 观海庄大门
    clickButton('go north');    // 门厅
    clickButton('go north');    // 聚贤厅
    clickButton('go north');    // 后院
    clickButton('go west');    // 荷花池
    clickButton('event_1_31320275');    // 采莲
    clickButton('home');     //回主页
    //喂鳄鱼 ----------------------------------------------------
    go("jh 37;n;e;e;nw;nw;w;n;e;n;e;e;e;ne;ne;ne;se;n;event_1_97487911;home");
    //破阵、挖矿 ----------------------------------------------------------
    clickButton('jh 26');    // 进入大昭寺
    clickButton('go west') ; //草原
    clickButton('go west') ; //草原
    clickButton('go north'); //阴山
    clickButton('go north'); //阴敌军大阵
    clickButton('event_1_14435995', 0); //破阵
    clickButton('go south'); //阴山
    clickButton('go east') ; //敕勒川
    clickButton('go east') ; //色尔腾山
    clickButton('event_1_18075497', 0); //采矿
    clickButton('home');     //回主页
    // 到达冰火岛玄铁 ----------------------------------------------------
    clickButton('jh 35');       // 进入章节
    clickButton('go northwest');      // 熔岩滩头
    clickButton('go northwest');      // 海蚀涯
    clickButton('go northwest');      // 峭壁崖道
    clickButton('go north');      // 峭壁崖道
    clickButton('go northeast') ;     // 炙溶洞口
    clickButton('go northwest');      // 炙溶洞
    clickButton('go west') ;     // 炙溶洞口
    clickButton('go northwest') ;     // 熔岩小径
    clickButton('go east') ;     // 熔岩小径
    clickButton('go east');      // 石华林
    clickButton('go east');      // 分岛岭
    clickButton('go east');      // 跨谷石桥
    clickButton('go east') ;     // 大平原
    clickButton('go southeast');
    clickButton('go north');
    clickButton('go north');
    clickButton('go west');
    clickButton('go north');
    clickButton('go west');
    clickButton('event_1_53278632');//进入洞穴
    clickButton('sousuo');//搜索
    clickButton('sousuo');//搜索
    clickButton('home');     //回主页
    */
}


function autoLiBao(){
   clearInterval(libao_ing);
	$("button.cmd_click2").each(
        function(){
            if(isContains($(this).html() , '礼包')){
				if(isContains($(this).html() , '兑换礼包') || isContains($(this).html() , '1元礼包')) return;
				eval($(this).attr("onclick"));

            }
        }
	);

   // go('items use obj_bingzhen_suanmeitang;items use meigui hua;items use meigui hua;items use meigui hua;home');
    go('items use obj_bingzhen_suanmeitang;home');

 //    go('sort;sort fetch_reward;');//排行榜奖励
    go('shop money_buy shop1_N_10;home;');//买引路蜂10个
    go('exercise stop;exercise;');//打坐
    go("share_ok 1;share_ok 2;share_ok 3;share_ok 4;share_ok 5;share_ok 7;");//分享
  //  go('cangjian get_all;xueyin_shenbinggu blade get_all;xueyin_shenbinggu unarmed get_all;xueyin_shenbinggu throwing get_all;');//闯楼奖励


   // go('jh 1;event_1_6640312;items use obj_bingzhen_suanmeitang;items use meigui hua;items use meigui hua;items use meigui hua;home;');//琼枝礼包







    go('jh 1;e;n;e;e;event_1_44731074;event_1_8041045;event_1_8041045;event_1_34254529;event_1_34254529;home;');//消费积分和谜题卡
    //   go("jh 1;e;n;e;e;e;e;n;lq_bysf_lb;lq_lmyh_lb;home;");//比翼双飞和劳模英豪
//    go('jh 2;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;e;n;n;n;w;event_1_31320275;home');//采莲

  //  go('jh 5;n;n;n;w;sign7;home;');//扬州签到
    go('jh 5;n;n;e;event_1_1278209;w;n;w;sign7;home;');
    //event_1_1278209

  //  go('jh 26;w;w;n;e;e;event_1_18075497;home');//大招采矿
  //  go('jh 26;w;w;n;n;event_1_14435995;home');//大招破阵

  //  go('jh 35;nw;nw;nw;n;ne;nw;w;nw;e;e;e;e;e;se;n;n;w;n;w;event_1_53278632;sousuo;sousuo;home'); //冰火岛玄重铁
  //  go("jh 37;n;e;e;nw;nw;w;n;e;n;e;e;e;ne;ne;ne;se;n;event_1_97487911;home");//绝情谷鳄鱼


}



//自动杀青龙NPC

var killQLNPCIntervalFunc =  null;
var currentQLNPCIndex = 0;
var QLNPCList = [];
QLNPCList[0]='二娘';

function killQLNPCTargetFunc(){
    zdskill =  mySkillLists;
    killtimes=0;

    if (btnList["杀NPC"].innerText == '杀NPC'){
        currentNPCIndex = 0;
        console.log("开始自动杀目标NPC！");
        skillLists = mySkillLists;
        btnList["杀NPC"].innerText = '停杀NPC';
        killQLNPCIntervalFunc = setInterval(killQLNPC, 500);

    }else{
        console.log("停止杀目标NPC！");
        btnList["杀NPC"].innerText = '杀NPC';
        clearInterval(killQLNPCIntervalFunc);
    }
}

function killQLNPC(){
    //	  clickButton('go east');
     killtimes++;
    if (killtimes > 500) {
        killQLNPCTargetFunc();
        return;
    }
    if ($('span').text().slice(-7) == "不能杀这个人。"){
        currentNPCIndex = currentNPCIndex + 1;
        console.log("不能杀这个NPC！");
        //        return;
    }
    getQLNPCTargetCode();
    setTimeout(ninesword, 200);
    if($('span:contains(胜利)').text().slice(-3)=='胜利！' || $('span:contains(战败了)').text().slice(-6)=='战败了...'){
        currentNPCIndex = 0;
        console.log('杀NPC一次！');
        go('prev_combat');
    //    go('home');
    }
}
function getQLNPCTargetCode(){
    var peopleList = $(".cmd_click3");
    var thisonclick = null;
    var targetNPCListHere = [];
    var countor= 0;

    for(var i=0; i < peopleList.length; i++) { // 从第一个开始循环
        // 打印 NPC 名字，button 名，相应的NPC名
        thisonclick = peopleList[i].getAttribute('onclick');
        if (QLNPCList.contains(peopleList[i].innerText)){
            var targetCode = thisonclick.split("'")[1].split(" ")[1];
            //           console.log("发现NPC名字：" +  peopleList[i].innerText + "，代号：" + targetCode);
            targetNPCListHere[countor] = peopleList[i];
            countor = countor +1;
        }
    }
    // targetNPCListHere 是当前场景所有满足要求的NPC button数组
    if (currentNPCIndex >= targetNPCListHere.length){
        currentNPCIndex = 0;
    }
    if (targetNPCListHere.length > 0){
        thisonclick = targetNPCListHere[currentNPCIndex].getAttribute('onclick');
        var targetCode = thisonclick.split("'")[1].split(" ")[1];
        console.log("准备杀目标NPC名字：" + targetNPCListHere[currentNPCIndex].innerText + "，代码：" + targetCode +"，目标列表中序号：" + (currentNPCIndex ));
        clickButton('kill ' + targetCode); // 点击杀人
        setTimeout(detectkillQLNPCInfo,200); // 200 ms后获取杀人情况，是满了还是进入了
    }
}
function detectkillQLNPCInfo(){
    var corpseInfo = $('span').text();
    if (corpseInfo.slice(-15) == "已经太多人了，不要以多欺少啊。"){
        currentNPCIndex = currentNPCIndex + 1;
    }else{
        currentNPCIndex = 0;
    }
}












// 月老按钮 ------------------------------------------------------------------------------------------------------
// 摸月老 ------------------------------------------------------------------------------------------------------
//var getcorpseTargetButton = document.createElement('button');
//getcorpseTargetButton.innerText = '摸月老';
//getcorpseTargetButton.style.position = 'absolute';
//getcorpseTargetButton.style.right = '0px';
//getcorpseTargetButton.style.top = currentPos + 'px';
//currentPos = currentPos + delta;
//getcorpseTargetButton.style.width = buttonWidth;
//getcorpseTargetButton.style.height = buttonHeight;
//document.body.appendChild(getcorpseTargetButton);
//getcorpseTargetButton.addEventListener('click', getcorpseTargetFunc);
//var corpseNPCList = ["王铁匠", "杨掌柜", "柳绘心", "柳小花", "朱老伯","方老板", "醉汉"];
//var corpseNPCList = corpseNPCLists;
var getcorpseIntervalFunc =  null;
var currentNPCIndex = 0;
//var corpseNPCList = [];
function getcorpseTargetFunc(){
    zdskill =  mySkillLists;
    //var corpseNPCLists = prompt("请输入要摸的目标","月老的尸体");
    // corp = corpseNPCLists
    //var corpseNPCLists = prompt("请输入要摸的目标","月老的尸体");
   var corpseNPCList = [];
   corpseNPCList[0] = prompt("请输入要摸的目标","月老的尸体");
    if (getcorpseTargetButton.innerText == '摸月老'){
        currentNPCIndex = 0;
        console.log("开始摸月老目标NPC！");
        skillLists = mySkillLists;
        getcorpseTargetButton.innerText ='停摸';
        getcorpseIntervalFunc = setInterval(getcorpse, 500);

    }else{
        console.log("停止摸月老目标NPC！");
        getcorpseTargetButton.innerText ='摸月老';
        clearInterval(getcorpseIntervalFunc);
    }
}

function getcorpse(){
    //	  clickButton('go east');
    if ($('span').text().slice(-7) == "不能杀这个人。"){
        currentNPCIndex = currentNPCIndex + 1;
        console.log("不能杀这个人！");
        //        return;
    }
    getcorpseTargetCode();
    setTimeout(ninesword, 200);
    if($('span:contains(胜利)').text().slice(-3)=='胜利！' || $('span:contains(战败了)').text().slice(-6)=='战败了...'){
        currentNPCIndex = 0;
        console.log('杀人一次！');
        go('prev_combat');
    }
}
function getcorpseTargetCode(){
    var peopleList = $(".cmd_click3");
    var thisonclick = null;
    var targetNPCListHere = [];
    var countor= 0;

    for(var i=0; i < peopleList.length; i++) { // 从第一个开始循环
        // 打印 NPC 名字，button 名，相应的NPC名
        thisonclick = peopleList[i].getAttribute('onclick');
        if (corpseNPCList.contains(peopleList[i].innerText)){
            var targetCode = thisonclick.split("'")[1].split(" ")[1];
            //           console.log("发现NPC名字：" +  peopleList[i].innerText + "，代号：" + targetCode);
            targetNPCListHere[countor] = peopleList[i];
            countor = countor +1;
        }
    }
    // targetNPCListHere 是当前场景所有满足要求的NPC button数组
    if (currentNPCIndex >= targetNPCListHere.length){
        currentNPCIndex = 0;
    }
    if (targetNPCListHere.length > 0){
        thisonclick = targetNPCListHere[currentNPCIndex].getAttribute('onclick');
        var targetCode = thisonclick.split("'")[1].split(" ")[1];
        console.log("准备杀目标NPC名字：" + targetNPCListHere[currentNPCIndex].innerText + "，代码：" + targetCode +"，目标列表中序号：" + (currentNPCIndex ));
        clickButton('get ' + targetCode); // 点击杀人
        setTimeout(detectgetcorpseInfo,200); // 200 ms后获取杀人情况，是满了还是进入了
    }
}
function detectgetcorpseInfo(){
    var corpseInfo = $('span').text();
    if (corpseInfo.slice(-15) == "已经太多人了，不要以多欺少啊。"){
        currentNPCIndex = currentNPCIndex + 1;
    }else{
        currentNPCIndex = 0;
    }
}
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

// 一键VIP按钮 ------------------------------------------------------------------------------------------------------
//document.body.removeChild(VipGetButton);
function VipGetFunc(){

    go('vip drops');//领通勤
    go('vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;');//10次暴击
    go('vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig');//挖宝
    go('vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu');//钓鱼10次
    go('vip finish_fb dulongzhai;vip finish_fb dulongzhai;vip finish_fb junying;vip finish_fb junying;vip finish_fb beidou;vip finish_fb beidou;vip finish_fb youling;vip finish_fb youling');//副本扫荡


}


//快速帮派---------
function bangpaiFunc(){
    alert("VIP专用\n\n请手动完成最后一个任务");
    go('heme;clan;clan scene;clan task');
    var num  =21;
    for(var i=0; i < num; i++) { // 从第一个开始循环
        go('vip finish_clan'); //帮派
    }
    go('clan task;');//第21
}
//-------------------------分割线-----------


//快速师门---------
function shimenFunc(){
    alert("VIP专用\n\n请手动完成最后一个任务");
    go('heme;family_quest');
    var num  =25;
    for(var i=0; i < num; i++) { // 从第一个开始循环
        go('vip finish_family'); //师门
    }
    go('family_quest;');//第26
}

// 大昭面壁 ------------------------------------------------------------------------------------------------------
//document.body.removeChild(MianBiButton);
function MianBiFunc(){
    go('jh 26;w;w;n;w;w;w;n;n;e;event_1_12853448;home'); //大昭壁画

}

// 采莲花喂鳄鱼--------------------------------------------------------
function pickingLotusFunc(){ // 进入洛阳北长安
    go('jh 37;n;e;e;nw;nw;w;n;e;n;e;e;e;ne;ne;ne;se;n;event_1_97487911;home');
}

//3新门派------------------------
function sanmenpaiFunc(){
    go('jh 2;n;n;e;s;luoyang317_op1;look_npc luoyang_luoyang17;go_hjs;go_hjs go;se;se;ne;w;n;ne;ne');
}

function LiaoShangFunc(){
    // go('recovery;recovery;recovery;recovery;recovery;recovery;recovery;recovery;recovery;recovery');
    //  go('home_prompt');    // 主页
   /* clickButton('score');    // 状态
    var qixue = $('span.out3:contains(【气血】)').text();
    var neili = $('span.out3:contains(【内力】)').text();
    var qixueNum = qixue.match(/\d{1,}/g);// 气血
    var neiliNum = neili.match(/\d{1,}/g);// 内力
    var isMax = qixueNum[1] - qixueNum[0];
    var useNum =Math.floor((neiliNum[1] -neiliNum[0])/ 5000);//吃药次数
    if(isMax!=0)//缺血
    {
        if(useNum<0){useNum = 0;}
        for (var i=0; i<useNum; i++)  // 补内力
        {
            go('items use snow_qiannianlingzhi');
        }
        for (var i=0; i<15; i++)   // 补血
        {
            go('recovery');
        }
    }
    else
    {
        if(useNum<0){useNum = 0;}
        for (var i=0; i<useNum; i++)  // 补内力
        {
            go('items use snow_qiannianlingzhi');
        }
    }
    go('golook_room');    // 观察
    */

for (var i=0; i<10; i++)
  {
 //clickButton('recovery');
      go('recovery');
  }

}




//杀孽龙-------------------------
function nielongFunc(){
    go('jh 15;n;nw;w;nw;n;event_1_14401179;');     //杀孽龙
}

//-------------------------分割线-----------



//白驼军阵-------------------------
function pozhenFunc(){
    go('jh 21;n;n;n;n;w;');     //白驼军阵
}
//-------------------------分割线-----------


//峨眉金狼-------------------------
function jinlangFunc(){
    alert("别忘了劳军\n\n1锭换朱果");
    go('jh 8;ne;e;e;e;;');     //白驼军阵
}

//喂鳄鱼------------------------
function WeiYuFunc(){
    go('jh 37;n;e;e;nw;nw;w;n;e;n;e;e;e;ne;ne;ne;se;n;event_1_97487911');
}

//直达赌锭------------------------
function goldFunc(){
    go('jh 2;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;w;w;w;w;w;w');
}

//大昭寺破阵采矿，壁画手动------------------------
function DaZhaoFunc(){
    go("jh 26;w;w;n;n;event_1_14435995;s;e;e;event_1_18075497;w;w;w;w;w;n");
}

// 换装备 -------------------------------------------------------
function ZhuangBei(){
    if(btnList["战斗装"].innerText == '战斗装')
    { console.log("切换战斗装备！");
     go('auto_equip on');       // 一键装备
     go('unwield weapon_sb_unarmed10');      // 天罡拳套
     go('unwield weapon_sb_sword10');       // 九天龙吟剑
     go('unwield weapon_sb_unarmed11');      // 天罡拳套
     go('unwield weapon_sb_sword11');       // 九天龙吟剑

     go('unwield sword of windspring');
     go('wield weapon_sb_sword10');       // 九天龙吟剑
     go('wield weapon_sb_unarmed10');       // 天罡拳套
  //   go('wear equip_moke_finger10');       // 斩龙戒指
 //    go('wear equip_moke_head10');       // 斩龙帽子
     go('wield weapon_sb_sword11');//11套剑
     go('wield weapon_sb_unarmed11');       // 11套拳
//     go('wear equip_moke_finger11');//11套戒指
//     go('wear equip_moke_head11');//11套帽子
     btnList["战斗装"].innerText = '打坐装';
    }
    else
    {console.log("切换打坐装备！");
     go('unwield weapon_sb_sword10');     // 脱九天龙吟剑
     go('unwield weapon_sb_sword11');       // 脱轩辕剑
     go('wear dream hat');       // 迷幻经纶
     go('wear langya_diaozhui');  //狼牙吊坠
     go('wield sword of windspring');       // 风泉
     go('wear longyuan banzhi moke');       // 龙渊
     btnList["战斗装"].innerText = '战斗装';
    }
}
// 领取奖励 ------------------------------------------------
//getRewardsFunc();
function getRewardsFunc(){
    scanEscapedFish();
    /*
    var getRewardsdelay = 100;
    var getRewardsInterval = 5*60*1000; // ms
    if (btnList["开领奖"].innerText == '开领奖'){ // 处于未领奖状态，单击开始领奖,并将状态置于停领奖状态
        console.log("开始自动领取奖励！");
        scanEscapedFish();
        scanEscaped = setInterval(scanEscapedFish,getRewardsInterval);
        maikuli_i = setInterval(maikuli,5000 + getRewardsdelay); // 干苦力, 5s
        duancha_i  = setInterval(duancha,10*1000  + getRewardsdelay ); // 端茶送水, 10s
        dalie_i = setInterval(dalie,5*60*1000 + getRewardsdelay); // 上山打猎, 5 min = 300 s
        btnList["开领奖"].innerText = '停领奖';
    }else{
        console.log("停止自动领取奖励！");
        clearInterval(scanEscaped);
        clearInterval(maikuli_i);
        clearInterval(duancha_i);
        clearInterval(dalie_i);
        btnList["开领奖"].innerText = '开领奖';
    }
    */
}
function maikuli() {
    go('work click maikuli');
}
function duancha() {
    go('work click duancha');
}
function dalie() {
    go('work click dalie');
}
function baobiao() {
    go('work click baobiao');
}
function maiyi() {
    go('work click maiyi');
}
function xuncheng() {
    go('work click xuncheng');
}
function datufei() {
    go('work click datufei');
}
function dalei() {
    go('work click dalei');
}
function kangjijinbin() {
    go('work click kangjijinbin');
}
function zhidaodiying() {
    go('work click zhidaodiying');
}
function dantiaoqunmen() {
    go('work click dantiaoqunmen');
}
function shenshanxiulian() {
    go('work click shenshanxiulian');
}
function jianlimenpai() {
    go('work click jianmenlipai');
}
function scanEscapedFish() {
    maikuli();

    duancha();

    dalie();

    baobiao();

    maiyi();

    xuncheng();

    datufei();

    dalei();

    kangjijinbin();

    zhidaodiying();

    dantiaoqunmen();

    shenshanxiulian();

    jianlimenpai();

    go('work click dubawulin');

    go('work click youlijianghu');

    go('work click yibangmaoxian');

    go('public_op3'); // 向师傅磕头
}
// 出海----------------------------------------------------
function fishingFirstFunc(){
    console.log("开始走向冰火岛！");
    fishingFirstStage();
}
function fishingFirstStage(){
    FishingParas = 0;
    // 进入扬州
     go('jh 5;n;n;n;n;n;n;n;n;n;n;ne;chuhai go');

}

//冰月谷-------------------------
function BingYueFunc(){
    go('jh 14;w;n;n;n;n;event_1_32682066');
}

//钓鱼-----------------------------------------------------
function fishingFunc(){
    resFishingParas=0;
    console.log("开始钓鱼！");
    // 到达冰火岛
    go('jh 35;nw;nw;nw;n;ne;nw;w;nw;e;e;e;e;e;se;e;');
    // 开始钓鱼
    setTimeout(fishIt,2000);
}
function fishIt(){
    resFishingParas = resFishingParas+1;
    if ( isContains($('span:contains(钓鱼需要)').text().slice(-17), '钓鱼需要鱼竿和鱼饵，你还没有'))
    {alert('鱼竿或鱼饵不足，停止钓鱼！');
     console.log('没有工具！钓鱼次数：%d次。',resFishingParas);}
    else if( isContains($('span:contains(整个冰湖的)').text().slice(-6), '明天再来吧。')){
        console.log('钓完了！钓鱼次数：%d次。',resFishingParas);
        clickButton('home');
    }
    else{
        go('diaoyu');
        setTimeout(fishIt, 6000);
        console.log($('span:contains(突然)').text().slice(-9));}
}
// 清谜题 -----------------------------------------------

function clearPuzzleFunc(){
    go('auto_tasks cancel');
}

// 吃千年灵芝-------------------------------------------
function userMedecineFunc(){
    for (var i=0; i<5; i++)
    {
        go('items use snow_qiannianlingzhi');
    }
}




// 买千年灵芝-------------------------------------------
function buyMedecineFunc(){
    go('jh 1;e;n;n;n;w;');
    buy1MedecineFunc();
}
function  buy1MedecineFunc(){
    var num  = 0;
    if(!( num  = prompt("请输入购买数量，只能输入10的倍数：","10"))){
        return;
    }
    num  = parseInt(num/10);
    for(var i=0; i < num; i++) { // 从第一个开始循环
        go('buy /map/snow/obj/qiannianlingzhi_N_10 from snow_herbalist'); //买灵芝
    }
}

String.prototype.trim = function (char, type) { // 去除字符串中，头部或者尾部的指定字符串
    if (char) {
        if (type == 'left') {
            return this.replace(new RegExp('^\\'+char+'+', 'g'), '');
        } else if (type == 'right') {
            return this.replace(new RegExp('\\'+char+'+$', 'g'), '');
        }
        return this.replace(new RegExp('^\\'+char+'+|\\'+char+'+$', 'g'), '');
    }
    return this.replace(/^\s+|\s+$/g, '');
};
// 自动答题
function answerQuestionFunc(){
    clickButton('look_room');
    clickButton('question', 0);
}
//青龙监听
var QLtrigger=0;
function listenQLFunc(){
    if (QLtrigger==0){
        QLtrigger=1;
        btnList["青龙监听"].innerText = '停止青龙';
    }else if (QLtrigger==1){
        QLtrigger=0;
        btnList["青龙监听"].innerText = '青龙监听';
    }
}
//游侠监听
var YXtrigger=0;
function listenYXFunc(){
    if (YXtrigger==0){
        YXtrigger=1;
        btnList["游侠监听"].innerText = '停止游侠';
    }else if (YXtrigger==1){
        YXtrigger=0;
        btnList["游侠监听"].innerText = '游侠监听';
    }
}
var lastcmd ;
var lastpuzzlelink;
var lastpuzzleid;
var lastpuzzlename;
var singlePuzzleMsg = '';
(function (window) {

    function QinglongMon() {
        this.dispatchMessage = function(b) {
            var type = b.get("type"), subType = b.get("subtype");


            if (type == "main_msg") {
              var msg = g_simul_efun.replaceControlCharBlank(b.get("msg"));


                if( msg.indexOf("今日已达到谜题数量限制") > -1 && Puzzletrigger == 1 )
                {
                    listenPuzzleFunc();

                }

              if (iBatchAskStart >= 1){
             //     console.log( msg );

                   if( msg.indexOf("此人现在已不在这儿了") > -1){
                  //  每隔5秒检查 检查
                                  setTimeout(PuzzleNPCAsk,1000);

                 }

                  if (msg.indexOf('所接谜题过多') > -1){
                       iBatchAskStart = 0;
                  //     listenPuzzleFunc();// 自动处理任务模式
                      eval("clickButton('task_quest')") ;//显示任务列表
                      return;
                  }
                  if( msg.indexOf("你想干什么") > -1  || msg.indexOf("挺有兴致地跟你聊了起来") > -1  || msg.indexOf("盯着你看了一会儿") > -1  || msg.indexOf("你在这做什么") > -1  || msg.indexOf("江湖上好玩吗") > -1  || msg.indexOf("似乎想问你天气怎么样") > -1  ){

                      setTimeout(PuzzleNextFunc,300);

                  }
                   if (msg.indexOf('find_task_road') > -1){


                  //      console.log( iBatchAskStart );
                       if (iBatchAskStart >= iValidPuzzleNum){
                           //谜题接满5个开始处理任务
                           iBatchAskStart = 0;
                            listenPuzzleFunc();// 自动处理任务模式
                            eval("clickButton('task_quest')") ;//显示任务列表
                            return;

                       }else {
                           iBatchAskStart = iBatchAskStart +1;

                           setTimeout(PuzzleNextFunc,300);


                        // 如果全部NPC已经完成  开始处理任务

                        //否则继续找下个NPC接谜题;





                       }




                   }



              }
              if (Puzzletrigger==1){

                if (msg.indexOf('find_task_road') > -1){
              //       console.log('迷题 - '  + msg );

               //      var l=msg.match(/find_task_road( \w+)/);
                   if (msg.indexOf('谜题2') > -1){
                       imultiplePuzzle = 1;
                       singlePuzzleMsg = msg.split('\n')[0];
                       msg= singlePuzzleMsg.toString();
              //       console.log('迷题 n- '  + msg );
             //         console.log('迷题 1- '  + singlePuzzleMsg );
           //          return;


                   }else{
                       if  (msg.indexOf('谜题1') > -1){
                       imultiplePuzzle = 0;
             //          return;
                       }
                   }

                     lastpuzzlelink=msg.match( /(find[\w|-]+\s[\w|-]+)/g);  //    /find[\w|-]+\s[\w|-]+/g           /(find_\w+\s\w*)/g   //获取buttonclick 事件名称
                     lastpuzzleid=msg.match(/\s([\w|-]+)/g);   //获取谜题任务NPC的ID
                  var l= msg.match(/\s[\w|-]+\S([\u4e00-\u9fa5|-]+)/g);   //获取谜题任务NPC的NAME
                    lastpuzzlename=l;
               //       console.log("NAME：" +  lastpuzzlename);


           //           console.log('迷题 n- '  + msg );
             //        console.log("NAME：" +  l);

                     var lstmppuzzlename;

              //       console.log('迷题 n- '  + (l.length) );
                     if ( lastpuzzlelink ) {
                         if ( lastpuzzlelink.length  == 2) {
                            //  console.log("NAME：" +  l);

                               for(j=0;j<l.length;j++){

                                 lastpuzzlename[j]=l[j].match(/[\u4e00-\u9fa5|-]+/g);

                             //     console.log("NAME1：" +  lstmppuzzlename);
                                 if( lastpuzzlename[j].toString().indexOf('-') >-1){

                                     lstmppuzzlename=lastpuzzlename[j].toString().split('-');
                                   //  console.log("NAME1：" +  lstmppuzzlename);
                                     lastpuzzlename[j]=lstmppuzzlename[lstmppuzzlename.length - 1];

                                 }

                             }
                           //  console.log("NAME2：" +  lastpuzzlename);


                         eval("clickButton('" + lastpuzzlelink[1] + "')") ;// go( l[1]);

                         }else if (lastpuzzlelink.length ==1)  {
                            //  lastpuzzlename[0]=l[0].match(/([\u4e00-\u9fa5|-]+)/g);
                              lastpuzzlename[1]= lastpuzzlename[0];
                              for(j=0;j<lastpuzzlename.length;j++){
                                  lastpuzzlename[j]=l[j].match(/[\u4e00-\u9fa5|-]+/g);
                                if(lastpuzzlename[j].toString().indexOf('-') >-1){

                                    lstmppuzzlename=lastpuzzlename[j].toString().split('-');

                                     lastpuzzlename[j]=lstmppuzzlename[lstmppuzzlename.length - 1];
                          //           lastpuzzlename[j].replace(/([^,]*)/g, "$1");
                          //           lastpuzzlename[j]=lastpuzzlename[j].toString().split('-')[1].toString();
                                 }

                             }
                              lastpuzzlename[1]= lastpuzzlename[0];
                  //            console.log('link- '  + lastpuzzlelink[0] );
                   //           console.log('ID- '  + lastpuzzlename[0]);
                  //           console.log('NAME- '  + lastpuzzlename[0] );
                          eval("clickButton('" + lastpuzzlelink[0] + "')") ;// go( l[0]);

                         }else{

                               for(j=0;j<lastpuzzlename.length;j++){
                                  lastpuzzlename[j]=l[j].match(/[\u4e00-\u9fa5|-]+/g);
                                   if(lastpuzzlename[j].toString().indexOf('-') >-1){
                                       lstmppuzzlename=lastpuzzlename[j].toString().split('-');

                                     lastpuzzlename[j]=lstmppuzzlename[lstmppuzzlename.length - 1];
                                 }

                             }
             //                console.log('link- '  + lastpuzzlelink[0]+'--'+ lastpuzzlelink[1] +'--'+ lastpuzzlelink[2] );
           //                  console.log('ID- '  + lastpuzzleid[0]+'--'+ lastpuzzleid[1] +'--'+ lastpuzzleid[2] );
            //                   console.log('NAME- '  + lastpuzzlename[0]+'--'+ lastpuzzlename[1] +'--'+ lastpuzzlename[2] );
                            eval("clickButton('" + lastpuzzlelink[1] + "')") ;// go( l[1]);
                         }

                          for(j=0;j<lastpuzzlename.length;j++){




                                 if( lastpuzzlename[j].toString().indexOf(',') >-1){

                                     lstmppuzzlename=lastpuzzlename[j].toString().split(',');
                                   //  console.log("NAME1：" +  lstmppuzzlename);
                                     lastpuzzlename[j]=lstmppuzzlename[lstmppuzzlename.length - 1];

                                 }

                        }








                         lastcmd = msg;
                    //     lastpuzzlelink = l[0] ;
                    //     lastdeslink =  l[1] ;
                          igoodsteps =0;

              //           console.log("谜题:" + '-'  + l[0] +  '+'  + l[1] );
                 //      console.log("谜题：" +  lastcmd);
                //        console.log("LINK：" +  lastpuzzlelink);
               //         console.log("ID：" +  lastpuzzleid);
              //           console.log("NAME：" +  lastpuzzlename);


                        clearInterval(PuzzleActIntervalFunc);
                         PuzzleActIntervalFunc = setInterval(function(){ PuzzleActFunc(lastcmd ,lastpuzzlelink ,lastpuzzleid  , lastpuzzlename);}, 1000);
                      //   setTimeout(function(){ PuzzleActFunc(lastcmd ,lastsoulink ,lastdeslink  );},500);
                     }



                 }

                if( msg.indexOf("完成谜题") > -1 ){
                    clearInterval(PuzzleActIntervalFunc);
                    var strfinishNum = msg.match(/完成谜题\((\d+)\//);
                    var strpuzzlename = msg.split('：')[1].split('，')[0];
                    var strexp = msg.match(/经验x(.*)/);
                    var strpotential=msg.match(/潜能x(.*)/);
                    var strmoney = msg.match(/银两x(.*)/);


                   // console.log('完成谜题:' + strfinishNum[1] + strpuzzlename +strexp[0] +strpotential[0]  +strmoney[0]);


                    var lexp= parseInt(strexp[1]);
                    if (strexp && lexp > 200000 ){

                      alert('谜题暴击:' +strpuzzlename + " --- " +strexp[0] + "  " +strpotential[0]   + "  " + strmoney[0] );

                      console.log('完成谜题:' + strfinishNum[1] + strpuzzlename +strexp[0] +strpotential[0]  +strmoney[0]);
                    }
                    if (parseInt(strfinishNum[1])<= 10){
                        iValidPuzzleNum =5;

                    }else{
                        iValidPuzzleNum = 15 - parseInt(strfinishNum[1]) ;
                    }
                    if (parseInt(strfinishNum[1]) ==15){
                        listenPuzzleFunc();

                    }else{
                        if (imultiplePuzzle ==1 ){
                             eval("clickButton('task_quest')") ;
                        }else{
                         //   setTimeout(PuzzleNextFunc,300);
                            if (iBatchAskModel == 1){
                              setTimeout(NpcBatchAskStartFunc,300);
                            }else{
                                setTimeout(PuzzleNextFunc,300);
                            }


                        }


                    }

                }
                if( msg.indexOf("我就不给，你又能怎样") > -1){
                     PuzzleActIntervalFunc = setInterval(function(){ PuzzleActFunc(lastcmd ,lastpuzzlelink ,lastpuzzleid  , lastpuzzlename);}, 1000);

                 }
                  //此人现在已不在这儿了
                  if( msg.indexOf("此人现在已不在这儿了") > -1){
                  //  每隔5秒检查 检查
                                  setTimeout(PuzzleNPCAsk,1000);

                 }


                  if( msg.indexOf("你想干什么") > -1  || msg.indexOf("挺有兴致地跟你聊了起来") > -1  || msg.indexOf("盯着你看了一会儿") > -1  || msg.indexOf("你在这做什么") > -1  || msg.indexOf("江湖上好玩吗") > -1  || msg.indexOf("似乎想问你天气怎么样") > -1  ){

                    PuzzleNextFunc();

                }
                   if( msg.indexOf("你现在没有接到谜题任务") > -1){
                        imultiplePuzzle = 0;
                   }

              }




            }

            if (type == "channel" && subType == "sys") {
                var msg = g_simul_efun.replaceControlCharBlank(b.get("msg"));
                if (msg.indexOf("【系统】青龙会组织：") > -1 || msg.indexOf("游侠会：") > 0) {
                    var l = msg.match(/系统】青龙会组织：(.*)正在(.*)施展力量，本会愿出(.*)的战利品奖励给本场战斗的最终获胜者。/);
                    if (l&&QLtrigger==1 && isContains(qlEquipList, l[3])) {
               //      if (l&&QLtrigger==1 ) {
                        palyWarn();
                        QLNPCList[0]=l[1];
                        go_ql(l[2]);
                        killQLNPCTargetFunc();


                //        alert('青龙:' + l[1] + " --- " + l [3] + "  " + l[2]);
                        return;
                    }

                    l = msg.match(/【系统】游侠会：听说(.*)出来闯荡江湖了，目前正在前往(.*)的路上。/);
                    if (l&&YXtrigger==1) {
                        if (l[1] == '龙儿'){

                        return;
                        }
                        QLNPCList[0]=l[1];
						palyWarn();

						console.log('游侠:' + l[1] + " --在-- " + l [2] );
                        go_yx(l[2]);
                        return;
                    }
                }
                var m;

                m = msg.match(/【系统】\[16-20区\](段老大).+(find_qinglong_road \d+)/);
                if (m != null) {
                    kfKind = "跨服逃犯";
                    kf = "clickButton('" + m[2] + "')";
                    if (kfMonitor == 1) {
                        kuafuFlyFunc();
                        killHongMingTargetFunc();
                    }
                }
                m = msg.match(/青龙会组织：\[16-20区\](.*)正在(.*)施展力量，本会愿出(.*)的战利品奖励给本场战斗的最终获胜者。/);
                if (m != null && m[3].match(/.*(碎片|斩龙|龙皮至尊甲衣|飞宇天怒刀|九天龙吟剑|小李飞刀|天罡掌套|乌金玄火鞭|开天宝棍|达摩杖).*/) != null) {
                    kfKind = "跨服青龙";
                    kf = m[2];
                    if (kfMonitor == 1) {
                        kuafuFlyFunc();
                        killHongMingTargetFunc();
                    }
                }
                m = msg.match(/荣威镖局：\[16-20区\]花落云/);
                if (m != null) {
                    msg = $('span:contains(荣威镖局:[16-20区]花落云)').find('a').attr('href');
                    console.log("kf:"+msg);
                    kfKind = "跨服镖车";
                    m = msg.match(/(find_qinglong_road \d+)/);
                    kf = "clickButton('" + m[1] + "')";
                    if (kfMonitor == 1) {
                        kuafuFlyFunc();
                        killHongMingTargetFunc();
                    }
                }
                 m = msg.match(/【系统】(.*)对着(.*)叫道：喂，老匹夫！想要消灾赶紧掏钱，要不然老子可不客气了！/);
                if (m != null &&  m[1].match(/.*(段老大|二娘).*/) != null && ipositiveKill == 1 ) {
                    console.log("出现目标NPC:"+m[1]);
                    QLNPCList[0]=m[1];
                    if (m[2]=="杨掌柜"){
                         go_ql("桑邻药铺");

                    }else if (m[2]=="王铁匠"){
                        go_ql("打铁铺子");

                    }else if (m[2]=="柳绘心"){
                        go_ql("书房");

                    }else if (m[2]=="客商"){
                        go_ql("南市");
                    }else if (m[2]=="柳小花"){
                        go_ql("桃花别院");

                    }else if (m[2]=="卖花姑娘"){
                        go_ql("北大街");

                    }else if (m[2]=="刘守财"){
                        go_ql("钱庄");

                    }else if (m[2]=="方寡妇"){
                        go_ql("厅堂");

                    }else if (m[2]=="朱老伯"){
                        go_ql("祠堂大门");

                    }else if (m[2]=="方老板"){
                        go_ql("杂货铺");
                    }
                     killQLNPCTargetFunc();
                    return;



                }

            }
        };
    }

    function palyWarn(){
		//base64码警报声
		var snd = new Audio("data:audio/wav;base64,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");
		snd.play();
//		if(qinglong_need > 0){
//			setTimeout(palyWarn,1000);
//		}
	}

    var qlMon = new QinglongMon;

    var ql_p = {
        '书房': 1,
        '打铁铺子': 2,
        '桑邻药铺': 3,
        '南市': 4,
        '桃花别院': 5,
        '绣楼': 6,
        '北大街': 7,
        '钱庄': 8,
        '杂货铺': 9,
        '祠堂大门': 10,
        '厅堂': 11
    };
    window.go_ql = function(w) {
        zx(ql_p[w]);
    };
     function go_yx(w) {
         // 雪亭镇  洛阳 华山村 华山 扬州 丐帮 乔阴县 峨眉山 恒山 武当山 晚月庄 水烟阁 少林寺 唐门 青城山 逍遥林 开封 光明顶 全真教 古墓 白驮山
		//穿装备
        //go("wield weapon_moke_unarmed8;wield weapon_moke_unarmed9;wield weapon_moke_unarmed10;wield weapon_moke_sword10;wear equip_moke_head10");
        steps=0;
        if (w.startsWith("雪亭镇")) {
			go_path = "jh 1;e;s;w;w;e;s;n;e;e;ne;ne;sw;sw;n;w;n;e;e;n;s;e;e;n;s;e;w;s;n;w;w;w;w;w;e;n;w;e;n;w;e;e;e;w;w;n;n;s;e;w;w";
        } else if (w.startsWith("洛阳")) {
			go_path = "jh 2;n;n;e;s;n;w;n;e;s;n;w;w;e;n;w;s;w;e;n;e;e;s;n;w;n;w;n;n;w;e;s;s;s;n;w;n;n;n;e;w;s;s;w;e;s;e;e;e;n;s;e;n;n;w;e;e;n;s;w;n;w;e;n;e;w;n;w;e;s;s;s;s;s;w;w;n;w;e;e;n;s;w;n;e;w;n;w;e;e;w;n;e;n;n";
        } else if (w.startsWith("华山村")) {
			go_path = "jh 3;n;e;w;s;w;e;s;e;n;s;w;s;e;s;n;w;w;n;s;e;s;s;w;n;s;e;s;e;w;nw;n;n;e;w;n;w;e;n;n;w;e;e;w;n";
        } else if (w.startsWith("华山")) {
			go_path = "jh 4;n;n;w;e;n;e;w;n;n;n;e;n;n;s;s;w;n;n;w;s;n;w;n;s;e;e;n;e;n;n;w;e;n;e;w;n;e;w;n;s;s;s;s;s;w;n;w;e;n;n;w;e;e;s;s;n;n;n;n;s;s;w;n";
        } else if (w.startsWith("扬州")) {
			go_path = "jh 5;n;w;w;n;s;e;e;e;w;n;w;e;e;w;n;w;e;n;w;e;n;w;w;s;s;n;n;n;n;w;n;n;n;s;s;s;e;e;w;n;s;s;s;e;e;e;n;n;n;s;s;w;n;e;n;n;s;s;e;n;n;w;n;n;s;s;w;s;s;e;e;s;w;s;w;n;w;e;e;n;n;e;w;w;e;n;n;s;s;s;s;w;n;w;e;e;w;n;w;w;n;s;e;e;n;e;s;e;s;s;s;n;n;n;w;n;w;w;s;n;w;n;w;e;e;w;n;n;w;n;s;e;e;s;n;w;n";
        } else if (w.startsWith("丐帮")) {
			go_path = "jh 6;event_1_98623439;ne;n;ne;ne;ne;sw;sw;sw;s;ne;ne;sw;sw;sw;s;w";
        } else if (w.startsWith("乔阴县")) {
			go_path = "jh 7;s;s;s;w;s;w;w;w;e;e;e;e;s;s;e;n;n;e;w;s;s;w;s;w;w;w;n;s;s;e;n;s;e;ne;s;e;n;e;s;e";
        } else if (w.startsWith("峨眉山")) {
			go_path = "jh 8;ne;e;e;e;e;w;n;s;s;n;w;w;w;sw;w;nw;n;n;n;n;w;e;se;nw;e;n;s;e;n;n;e;halt;n;n;n;e;e;w;w;w;n;n;n;w;w;s;e;w;s;e;w;w;e;n;w;e;n;w;w;n;s;sw;ne;e;e;n;e;w;w;e;n;e;w;w;e;n;w;w;w;n;n;n;s;s;s;e;e;e;e;e;e;e;e;e;w;w;s;e;w;w;e;s;e;w;w;e;s;e;e;w;w;s;e;w;w;e;s;e;w;w;e;n;n;w;w;n;n;n;n;w;n;s;w;e;s;n;e;n;n;n;n;s;s;nw;nw;n;n;s;s;se;sw;w;nw;w;e;se;e;ne;se;ne;se;s;se;nw;n;nw;ne;n;s;se;e";
        } else if (w.startsWith("恒山")) {
			go_path = "jh 9;n;w;e;n;e;w;n;w;e;n;e;w;n;n;n;w;n;s;s;n;e;e;n;s;e;w;w;n;n;w;n;e;w;n;n;w;e;n";
        } else if (w.startsWith("武当山")) {
			go_path = "jh 10;w;n;n;w;w;w;n;n;n;n;n;w;n;s;e;n;n;n;n;s;s;s;s;e;e;s;n;e;e;w;w;w;w;s;e;e;e;e;s;e;s;e;n;s;s;n;e;e;n;s;e;w;s;s;s";
        } else if (w.startsWith("晚月庄")) {
			go_path = "jh 11;e;e;n;e;s;sw;se;s;s;s;s;s;s;se;s;n;ne;n;nw;w;w;s;s;w;e;se;e;n;n;n;n;n;n;w;n;s;w;n;w;e;s;w;w;e;s;n;e;s;w;e;s;e;e;e;w;w;w;w;w;n;s;s;n;e;s;n;e;s;w;w;e;e;e;s;s;e;w;w;s;e;e;w;w;n;e;w;w;w;e;n;n;n;s;w;e;s;e;s;n;n;e";
        } else if (w.startsWith("水烟阁")) {
			go_path = "jh 12;n;e;w;n;n;n;s;w;n;n;e;w;s;nw;e;n;s;e;sw;n;s;s;e";
        } else if (w.startsWith("少林寺")) {
			go_path = "jh 13;e;s;s;w;w;w;e;e;n;n;w;n;w;w;n;s;e;e;n;e;w;w;e;n;n;e;w;w;e;n;n;e;w;w;e;n;n;e;w;w;e;n;n;e;s;s;s;s;s;s;s;s;n;n;n;n;n;n;n;n;w;w;s;s;s;s;s;s;s;s;n;n;n;n;n;n;n;n;e;n;e;w;w;e;n;w;n";
        } else if (w.startsWith("唐门")) {
			go_path = "jh 14;e;w;w;n;n;n;n;s;w;n;s;s;n;w;n;s;s;n;w;n;s;s;n;w;e;e;e;e;e;s;n;e;n;e;w;n;n;s;ask tangmen_tangmei;ask tangmen_tangmei;e;event_1_8413183;event_1_39383240;e;s;e;n;w;n;n";
        } else if (w.startsWith("青城山")) {
			go_path = "jh 15;s;s;e;w;w;n;s;e;s;e;w;w;w;n;s;s;s;n;n;w;w;w;n;s;w;e;e;e;e;e;e;s;e;w;w;e;s;e;w;s;w;s;ne;s;s;s;e;s;n;w;n;n;n;n;n;n;n;n;n;n;nw;w;nw;n;s;w;s;s;s;halt;w;w;w;w;n;e;n;s;s;s;n;e;n;e;w;w;e;n;s;s;e";
        } else if (w.startsWith("逍遥林")) {
			go_path = "jh 16;s;s;s;s;e;e;e;s;w;w;w;w;w;e;n;s;s;n;e;e;n;n;s;s;s;s;n;n;e;n;s;s;s;n;n;e;e;n;n;e;event_1_5221690;s;w;event_1_57688376;n;n;w;w;e;n;s;e;e;n;s;e;n;n;w;n;e;n";
        } else if (w.startsWith("开封")) {
			go_path = "jh 17;sw;s;sw;nw;ne;sw;se;ne;n;ne;n;w;e;e;s;n;w;n;w;n;n;s;s;e;e;e;n;n;s;s;s;n;w;s;s;s;w;e;e;n;s;e;e;w;w;s;n;w;s;w;e;n;n;n;n;w;n;e;w;n;w;e;e;w;n;e;n;n;n;s;s;s;w;s;s;s;s;s;e;s;s;s;e;w;s;s;w";
        } else if (w.startsWith("光明顶")) {
			go_path = "jh 18;e;w;w;n;s;e;n;nw;n;n;w;e;n;n;n;ne;n;n;w;e;e;w;n;w;e;e;w;n;n;w;w;s;n;n;e;e;e;e;s;se;se;e;w;nw;nw;w;w;n;w;w;n;n;e;nw;se;e;e;e;se;e;w;sw;s;w;w;n;e;w;n;e;w;w;e;n;n;n;n;w;e;n;event_1_90080676;event_1_56007071;ne;n";
        } else if (w.startsWith("全真教")) {
			go_path = "jh 19;s;s;s;sw;s;e;n;nw;n;n;n;n;e;w;w;e;n;e;n;s;e;e;w;n;n;s;s;w;w;w;w;w;w;s;n;e;s;n;e;e;e;n;n;w;w;s;s;n;n;w;s;s;n;n;w;n;n;n;n;n;n;e;n;e;e;n;n;s;s;e;e;e;e;s;e;s;s;s;n;w;n;s;s;s;s;w;s;n;w;n;e;n;n;n;s;w;n;n;n;s;s;s;w;n;s;w;n;s;s;s;e;n;n;e;s;s;s;w";
        } else if (w.startsWith("古墓")) {
			go_path = "jh 20;s;s;n;n;w;w;s;e;s;s;s;s;s;sw;sw;s;e;se;nw;w;s;w;e;e;w;s;s;w;w;e;s;sw;ne;e;s;s;w;w;e;e;s;n;e;e;e;e;s;e;w;n;w;n;n;s;e;w;w;s;n;n;n;n;s;e;w;w";
        } else if (w.startsWith("白驮山")) {
			go_path = "jh 21;nw;s;n;ne;ne;sw;n;n;ne;w;e;n;n;w;w;e;e;s;s;sw;s;s;sw;w;n;s;w;nw;e;w;nw;nw;n;w;sw;ne;e;s;se;se;n;e;w;n;n;w;e;n;n;w;w;w;n;n;n;n;s;s;s;e;e;e;n;s;s;n;e;e;e;w;ne;sw;n;n;w;e;e;e;w;w;n;nw;se;ne;w;e;e;w;n";
        } else if (w.startsWith("嵩山")) {
			go_path = "jh 22";
        } else if (w.startsWith("寒梅庄")) {
			go_path = "jh 23";
        } else if (w.startsWith("泰山")) {
			go_path = "jh 24";
        } else if (w.startsWith("大旗门")) {
			go_path = "jh 25";
        } else if (w.startsWith("大昭寺")) {
			go_path = "jh 26";
        } else if (w.startsWith("魔教")) {
			go_path = "jh 27";
        }
		go_steps(go_path);
    }
/*
    function go_yx(w){
        if (w.startsWith("雪亭镇")) {
            go("jh 1;e;n");
        } else if (w.startsWith("洛阳")) {
            go("jh 2;n;n");
        } else if (w.startsWith("华山村")) {
            go("jh 3;s;s");
        } else if (w.startsWith("华山")) {
            go("jh 4;n;n");
        } else if (w.startsWith("扬州")) {
            go("jh 5;n;n");
        } else if (w.startsWith("丐帮")) {
            go("jh 6;event_1_98623439;s");
        } else if (w.startsWith("乔阴县")) {
            go("jh 7;s;s;s");
        } else if (w.startsWith("峨眉山")) {
            go("jh 8;w;nw;n;n;n;n");
        } else if (w.startsWith("恒山")) {
            go("jh 9;n;n;n");
        } else if (w.startsWith("武当山")) {
            go("jh 10;w;n;n");
        } else if (w.startsWith("晚月庄")) {
            go("jh 11;e;e;s;sw;se;w");
        } else if (w.startsWith("水烟阁")) {
            go("jh 12;n;n;n");
        } else if (w.startsWith("少林寺")) {
            go("jh 13;n;n");
        } else if (w.startsWith("唐门")) {
            go("jh 14;w;n;n;n");
        } else if (w.startsWith("青城山")) {
            go("jh 15;s;s");
        } else if (w.startsWith("逍遥林")) {
            go("jh 16;s;s");
        } else if (w.startsWith("开封")) {
            go("jh 17;n;n");
        } else if (w.startsWith("明教")) {
            go("jh 18;n;nw;n;n");
        } else if (w.startsWith("全真教")) {
            go("jh 19;s;s");
        } else if (w.startsWith("古墓")) {
            go("jh 20;w;w");
        } else if (w.startsWith("白驮山")) {
            go("jh 21;nw;w");
        } else if (w.startsWith("嵩山")) {
            go("jh 22;n;n");
        } else if (w.startsWith("寒梅庄")) {
            go("jh 23");
        } else if (w.startsWith("泰山")) {
            go("jh 24");
        } else if (w.startsWith("大旗门")) {
            go("jh 25");
        } else if (w.startsWith("大昭寺")) {
            go("jh 26");
        } else if (w.startsWith("魔教")) {
            go("jh 27");
        }

        random_move();
    }
    */

    function random_move() {
        var v = Math.random();
        if (v < 0.25) go("e");
        else if (v < 0.5) go("w");
        else if (v < 0.75) go("s");
        else go("n");
    }

    function zx(x) {
        x = parseInt(x);
        console.debug(x);

        if (x == 1) {
            go("jh 1;e;n;e;e;e;e;n");
        } else if (x == 2) {
            go("jh 1;e;n;n;w");
        } else if (x == 3) {
            go("jh 1;e;n;n;n;w");
        }

        if (x == 4) {
            go("jh 2;n;n;e");
        }

        if (x == 5) {
            go("jh 2;n;n;n;n;w;s");
        }
        if (x == 6) {
            go("jh 2;n;n;n;n;w;s;w");
        }
        if (x == 7) {
            go("jh 2;n;n;n;n;n;n;n");
        }
        if (x == 8) {
            go("jh 2;n;n;n;n;n;n;;n;e");
        }

        if (x == 9) {
            go("jh 3;s;s;e");
        }
        if (x == 10) {
            go("jh 3;s;s;w");
        }
        if (x == 11) {
            go("jh 3;s;s;w;n");
        }

    }


    function MyMap(){
        this.elements = [];
        this.size = function() {
            return this.elements.length;
        };
        this.isEmpty = function() {
            return 1 > this.elements.length;
        };
        this.clear = function() {
            this.elements = [];
        };
        this.put = function(a, b) {
            for (var c = !1, d = 0; d < this.elements.length; d++)
                if (this.elements[d].key == a) {
                    c = !0;
                    this.elements[d].value = b;
                    break;
                }
            !1 == c && this.elements.push({
                key: a,
                value: b
            })
        };
        this.remove = function(a) {
            var b = !1;
            try {
                for (var c = 0; c < this.elements.length; c++)
                    if (this.elements[c].key == a)
                        return this.elements.splice(c, 1), !0;
            } catch (d) {
                b =
                    !1;
            }
            return b;
        };
        this.get = function(a) {
            try {
                for (var b = 0; b < this.elements.length; b++)
                    if (this.elements[b].key == a)
                        return this.elements[b].value;
            } catch (c) {
                return null;
            }
        };
        this.copy = function(a) {
            null == a && (a = new Map);
            try {
                for (var b = 0; b < this.elements.length; b++)
                    a.put(this.elements[b].key, this.elements[b].value);
                return a;
            } catch (c) {
                return null;
            }
        };
        this.element = function(a) {
            return 0 > a || a >= this.elements.length ? null : this.elements[a];
        };
        this.containsKey = function(a) {
            var b = !1;
            try {
                for (var c = 0; c < this.elements.length; c++)
                    if (this.elements[c].key ==
                        a) {
                        b = !0;
                        break;
                    }
            } catch (d) {
                b = !1;
            }
            return b;
        };
        this.containsValue = function(a) {
            var b = !1;
            try {
                for (var c = 0; c < this.elements.length; c++)
                    if (this.elements[c].value == a) {
                        b = !0;
                        break;
                    }
            } catch (d) {
                b = !1;
            }
            return b;
        };
        this.values = function() {
            for (var a = [], b = 0; b < this.elements.length; b++)
                a.push(this.elements[b].value);
            return a;
        };
        this.keys = function() {
            for (var a = [], b = 0; b < this.elements.length; b++)
                a.push(this.elements[b].key);
            return a;
        };
    }

    function Question() {
        this.answers = new MyMap;
        this.answers.put("锦缎腰带是腰带类的第几级装备", "a");
        this.answers.put("扬州询问黑狗子能到下面哪个地点", "a");
        this.answers.put("跨服天剑谷每周六几点开启", "a");
        this.answers.put("青城派的道德经可以提升哪个属性", "c");
        this.answers.put("论剑中以下哪个不是晚月庄的技能", "d");
        this.answers.put("跨服天剑谷是星期几举行的", "b");
        this.answers.put("玉女剑法是哪个门派的技能", "b");
        this.answers.put("玉草帽可以在哪位npc那里获得？", "b");
        this.answers.put("逍遥林是第几章的地图", "c");
        this.answers.put("精铁棒可以在哪位npc那里获得", "d");
        this.answers.put("鎏金缦罗是披风类的第几级装备", "d");
        this.answers.put("神雕大侠在哪一章", "a");
        this.answers.put("华山武器库从哪个NPC进", "d");
        this.answers.put("首冲重置卡需要隔多少天才能在每日充值奖励中领取", "b");
        this.answers.put("以下哪个不是空空儿教导的武学", "b");
        this.answers.put('“迎梅客栈”场景是在哪个地图上', "d");
        this.answers.put('独孤求败有过几把剑', "d");
        this.answers.put('晚月庄的小贩在下面哪个地点', "a");
        this.answers.put('扬州询问黑狗能到下面哪个地点', "a");
        this.answers.put('“清音居”场景是在哪个地图上', "a");
        this.answers.put('一天能完成师门任务有多少个', "c");
        this.answers.put('林祖师是哪个门派的师傅', "a");
        this.answers.put('九区服务器名称', "d");
        this.answers.put('去唐门地下通道要找谁拿钥匙', "a");
        this.answers.put('能增容貌的是下面哪个技能', "a");
        this.answers.put('铁手镯  可以在哪位npc那里获得', "a");
        this.answers.put('街头卖艺是挂机里的第几个任务', "a");
        this.answers.put('“三清宫”场景是在哪个地图上', "c");
        this.answers.put('论剑中以下哪个是大理段家的技能', "a");
        this.answers.put('藏宝图在哪里npc那里买', "a");
        this.answers.put('六脉神剑是哪个门派的绝学', "a");
        this.answers.put('如何将华山剑法从400级提升到440级', "d");
        this.answers.put('王重阳是哪个门派的师傅', "b");
        this.answers.put('在庙祝处洗杀气每次可以消除多少点', "a");
        this.answers.put('以下哪个宝石不能镶嵌到衣服', "a");
        this.answers.put('达摩杖的伤害是多少', "d");
        this.answers.put('嫁衣神功是哪个门派的技能', "b");
        this.answers.put('可以召唤金甲伏兵助战是哪个门派', "a");
        this.answers.put('端茶递水是挂机里的第几个任务', "b");
        this.answers.put('下列哪项战斗不能多个玩家一起战斗', "a");
        this.answers.put('寒玉床在哪里切割', "a");
        this.answers.put('拜师风老前辈需要正气多少', "b");
        this.answers.put('每天微信分享能获得多少元宝', "d");
        this.answers.put('丐帮的绝学是什么', "a");
        this.answers.put('以下哪个门派不是隐藏门派', "c");
        this.answers.put('玩家想修改名字可以寻找哪个NPC', "a");
        this.answers.put('论剑中以下哪个不是古墓派的的技能', "b");
        this.answers.put('安惜迩是在那个场景', "c");
        this.answers.put('神雕侠侣的时代背景是哪个朝代', "d");
        this.answers.put('论剑中以下哪个是华山派的技能的', "a");
        this.answers.put('夜皇在大旗门哪个场景', "c");
        this.answers.put('什么装备可以镶嵌紫水晶', "c");
        this.answers.put('乌檀木刀可以在哪位npc那里获得', "d");
        this.answers.put('易容后保持时间是多久', "a");
        this.answers.put('以下哪个不是宋首侠教导的武学', "d");
        this.answers.put('踏云棍可以在哪位npc那里获得', "a");
        this.answers.put('玉女剑法是哪个门派的技能', "b");
        this.answers.put('根骨能提升哪个属性', "c");
        this.answers.put('论剑中以下哪个是铁血大旗门的技能', "b");
        this.answers.put('明教的九阳神功有哪个特殊效果', "a");
        this.answers.put('辟邪剑法在哪学习', "b");
        this.answers.put('论剑中古墓派的终极师傅是谁', "d");
        this.answers.put('论剑中青城派的终极师傅是谁', "d");
        this.answers.put('逍遥林怎么弹琴可以见到天山姥姥', "b");
        this.answers.put('论剑一次最多能突破几个技能', "c");
        this.answers.put('劈雳拳套有几个镶孔', "a");
        this.answers.put('仓库最多可以容纳多少种物品', "b");
        this.answers.put('以下不是天宿派师傅的是哪个', "c");
        this.answers.put('易容术在哪学习', "b");
        this.answers.put('瑷伦在晚月庄的哪个场景', "b");
        this.answers.put('羊毛斗篷是披风类的第几级装备', "a");
        this.answers.put('弯月刀可以在哪位npc那里获得', "b");
        this.answers.put('骆云舟在乔阴县的哪个场景', "b");
        this.answers.put('屠龙刀是什么级别的武器', "a");
        this.answers.put('天蚕围腰可以镶嵌几颗宝石', "d");
        this.answers.put('“蓉香榭”场景是在哪个地图上', "c");
        this.answers.put('施令威在哪个地图', "b");
        this.answers.put('扬州在下面哪个地点的npc处可以获得玉佩', "c");
        this.answers.put('拜师铁翼需要多少内力', "b");
        this.answers.put('九区服务器名称', "d");
        this.answers.put('"白玉牌楼"场景是在哪个地图上', "c");
        this.answers.put('宝玉鞋在哪获得', "a");
        this.answers.put('落英神剑掌是哪个门派的技能', "b");
        this.answers.put('下面哪个门派是正派', "a");
        this.answers.put('兑换易容面具需要多少玄铁碎片', "c");
        this.answers.put('以下哪些物品是成长计划第五天可以领取的', "b");
        this.answers.put('论剑中以下哪个是晚月庄的人物', "a");
        this.answers.put('论剑中以下哪个不是魔教的技能', "a");
        this.answers.put('匕首加什么属性', "c");
        this.answers.put('钢丝甲衣可以在哪位npc那里获得', "d");
        this.answers.put('论剑中花紫会的师傅是谁', "c");
        this.answers.put('暴雨梨花针的伤害是多少', "c");
        this.answers.put('吸血蝙蝠在下面哪个地图', "a");
        this.answers.put('论剑中以下是峨嵋派技能的是哪个', "a");
        this.answers.put('蓝止萍在晚月庄哪个小地图', "b");
        this.answers.put('下面哪个地点不是乔阴县的', "d");
        this.answers.put('领取消费积分需要寻找哪个NPC', "c");
        this.answers.put('下面哪个不是门派绝学', "d");
        this.answers.put('人物背包最多可以容纳多少种物品', "a");
        this.answers.put('什么装备不能镶嵌黄水晶', "d");
        this.answers.put('古灯大师在大理哪个场景', "c");
        this.answers.put('草帽可以在哪位npc那里获得', "b");
        this.answers.put('西毒蛇杖的伤害是多少', "c");
        this.answers.put('成长计划六天可以领取多少银两', "d");
        this.answers.put('朱老伯在华山村哪个小地图', "b");
        this.answers.put('论剑中以下哪个是唐门的技能', "b");
        this.answers.put('游龙散花是哪个门派的阵法', "d");
        this.answers.put('高级乾坤再造丹加什么', "b");
        this.answers.put('唐门的唐门毒经有哪个特殊效果', "a");
        this.answers.put('葛伦在大招寺的哪个场景', "b");
        this.answers.put('“三清殿”场景是在哪个地图上', "b");
        this.answers.put('哪样不能获得玄铁碎片', "c");
        this.answers.put('在哪里捏脸提升容貌', "d");
        this.answers.put('论剑中以下哪个是天邪派的技能', "b");
        this.answers.put('向师傅磕头可以获得什么', "b");
        this.answers.put('骆云舟在哪一章', "c");
        this.answers.put('论剑中以下哪个不是唐门的技能', "c");
        this.answers.put('华山村王老二掉落的物品是什么', "a");
        this.answers.put('下面有什么是寻宝不能获得的', "c");
        this.answers.put('寒玉床需要切割多少次', "d");
        this.answers.put('绿宝石加什么属性', "c");
        this.answers.put('魏无极处读书可以读到多少级', "a");
        this.answers.put('天山姥姥在逍遥林的哪个场景', "d");
        this.answers.put('天羽奇剑是哪个门派的技能', "a");
        this.answers.put('大招寺的铁布衫有哪个特殊效果', "c");
        this.answers.put('挖剑冢可得什么', "a");
        this.answers.put('灭绝师太在峨眉山哪个场景', "a");
        this.answers.put('论剑是星期几举行的', "c");
        this.answers.put('柳淳风在雪亭镇哪个场景', "b");
        this.answers.put('萧辟尘在哪一章', "d");
        this.answers.put('论剑中以下哪个是明教的技能', "b");
        this.answers.put('天邪派在哪里拜师', "b");
        this.answers.put('钨金腰带是腰带类的第几级装备', "d");
        this.answers.put('灭绝师太在第几章', "c");
        this.answers.put('一指弹在哪里领悟', "b");
        this.answers.put('翻译梵文一次多少银两', "d");
        this.answers.put('刀法基础在哪掉落', "a");
        this.answers.put('黯然消魂掌有多少招式', "c");
        this.answers.put('黑狗血在哪获得', "b");
        this.answers.put('雪蕊儿在铁雪山庄的哪个场景', "d");
        this.answers.put('东方教主在魔教的哪个场景', "b");
        this.answers.put('以下属于正派的门派是哪个', "a");
        this.answers.put('选择武学世家会影响哪个属性', "a");
        this.answers.put('寒玉床睡觉一次多久', "c");
        this.answers.put('魏无极在第几章', "a");
        this.answers.put('孙天灭是哪个门派的师傅', "c");
        this.answers.put('易容术在哪里学习', "a");
        this.answers.put('哪个NPC掉落拆招基础', "a");
        this.answers.put('七星剑法是哪个门派的绝学', "a");
        this.answers.put('以下哪些物品不是成长计划第二天可以领取的', "c");
        this.answers.put('以下哪个门派是中立门派', "a");
        this.answers.put('黄袍老道是哪个门派的师傅', "c");
        this.answers.put('舞中之武是哪个门派的阵法', "b");
        this.answers.put('隐者之术是那个门派的阵法', "a");
        this.answers.put('踏雪无痕是哪个门派的技能', "b");
        this.answers.put('以下哪个不是在雪亭镇场景', "d");
        this.answers.put('排行榜最多可以显示多少名玩家', "a");
        this.answers.put('貂皮斗篷是披风类的第几级装备', "b");
        this.answers.put('武当派的绝学技能是以下哪个', "d");
        this.answers.put('兰花拂穴手是哪个门派的技能', "a");
        this.answers.put('油流麻香手是哪个门派的技能', "a");
        //        this.answers.put('清风寨在哪', "b");
        this.answers.put('披星戴月是披风类的第几级装备', "d");
        this.answers.put('当日最低累积充值多少元即可获得返利', "b");
        this.answers.put('追风棍在哪里获得', "b");
        this.answers.put('长剑在哪里可以购买', "a");
        this.answers.put('莫不收在哪一章', "a");
        this.answers.put('读书写字最高可以到多少级', "b");
        this.answers.put('哪个门派拜师没有性别要求', "d");
        this.answers.put('墨磷腰带是腰带类的第几级装备', "d");
        this.answers.put('不属于白驼山的技能是什么', "b");
        this.answers.put('婆萝蜜多心经是哪个门派的技能', "b");
        this.answers.put('乾坤一阳指是哪个师傅教的', "a");
        this.answers.put('“日月洞”场景是在哪个地图上', "b");
        this.answers.put('倚天屠龙记的时代背景哪个朝代', "a");
        this.answers.put('八卦迷阵是哪个门派的阵法', "b");
        this.answers.put('七宝天岚舞是哪个门派的技能', "d");
        this.answers.put('断云斧是哪个门派的技能', "a");
        this.answers.put('跨服需要多少级才能进入', "c");
        this.answers.put('易容面具需要多少玄铁兑换', "c");
        this.answers.put('张教主在明教哪个场景', "d");
        this.answers.put('玉蜂浆在哪个地图获得', "a");
        this.answers.put('在逍遥派能学到的技能是哪个', "a");
        this.answers.put('每日微信分享可以获得什么奖励', "a");
        this.answers.put('红宝石加什么属性', "b");
        this.answers.put('金玉断云是哪个门派的阵法', "a");
        this.answers.put('正邪任务一天能做几次', "a");
        this.answers.put('白金戒指可以在哪位npc那里获得', "b");
        this.answers.put('金戒指可以在哪位npc那里获得', "d");
        this.answers.put('柳淳风在哪哪一章', "c");
        this.answers.put('论剑是什么时间点正式开始', "a");
        this.answers.put('黯然销魂掌是哪个门派的技能', "a");
        this.answers.put('在正邪任务中不能获得下面什么奖励', "d");
        this.answers.put('孤儿出身增加什么', "d");
        this.answers.put('丁老怪在天宿海的哪个场景', "b");
        this.answers.put('读书写字301-400级在哪里买书', "c");
        this.answers.put('闯楼第几层可以获得称号“藏剑楼长老”', "c");
        this.answers.put('以下属于邪派的门派是哪个', "b");
        this.answers.put('论剑中以下哪个不是丐帮的人物', "a");
        this.answers.put('论剑中青城派的第一个师傅是谁', "a");
        this.answers.put('以下哪个不是何不净教导的武学', "c");
        this.answers.put('吕进在哪个地图', "a");
        this.answers.put('拜师老毒物需要蛤蟆功多少级', "a");
        this.answers.put('蛇形刁手是哪个门派的技能', "b");
        this.answers.put('乌金玄火鞭的伤害是多少', "d");
        this.answers.put('张松溪在哪个地图', "c");
        this.answers.put('欧阳敏是哪个门派的', "b");
        this.answers.put('以下哪个门派是正派', "d");
        this.answers.put('成功易容成异性几次可以领取易容成就奖', "b");
        this.answers.put('论剑中以下不是峨嵋派技能的是哪个', "b");
        this.answers.put('城里抓贼是挂机里的第几个任务', "b");
        this.answers.put('每天的任务次数几点重置', "d");
        this.answers.put('莲花掌是哪个门派的技能', "a");
        this.answers.put('大招寺的金刚不坏功有哪个特殊效果', "a");
        this.answers.put('多少消费积分可以换取黄金钥匙', "b");
        this.answers.put('什么装备都能镶嵌的是什么宝石', "c");
        this.answers.put('什么影响打坐的速度', "c");
        this.answers.put('蓝止萍在哪一章', "c");
        this.answers.put('寒玉床睡觉修炼需要多少点内力值', "c");
        this.answers.put('武穆兵法通过什么学习', "a");
        this.answers.put('倒乱七星步法是哪个门派的技能', "d");
        this.answers.put('闯楼第几层可以获得称号“藏剑楼护法”', "b");
        this.answers.put('兽皮鞋可以在哪位npc那里获得', "b");
        this.answers.put('寒玉床在那个地图可以找到', "a");
        this.answers.put('易容术可以找哪位NPC学习', "b");
        this.answers.put('铁戒指可以在哪位npc那里获得', "a");
        this.answers.put('通灵需要寻找哪个NPC', "c");
        this.answers.put('功德箱在雪亭镇的哪个场景', "c");
        this.answers.put('蓝宝石加什么属性', "a");
        this.answers.put('每天分享游戏到哪里可以获得20元宝', "a");
        this.answers.put('选择书香门第会影响哪个属性', "b");
        this.answers.put('以下哪个不是微信分享好友、朋友圈、QQ空间的奖励', "a");
        this.answers.put('新手礼包在哪领取', "c");
        this.answers.put('春风快意刀是哪个门派的技能', "b");
        this.answers.put('朱姑娘是哪个门派的师傅', "a");
        this.answers.put('出生选武学世家增加什么', "a");
        this.answers.put('以下哪个宝石不能镶嵌到内甲', "a");
        this.answers.put('生死符的伤害是多少', "a");
        this.answers.put('扬文的属性', "a");
        this.answers.put('云问天在哪一章', "a");
        this.answers.put('首次通过桥阴县不可以获得那种奖励', "a");
        this.answers.put('剑冢在哪个地图', "a");
        this.answers.put('在哪里消杀气', "a");
        this.answers.put('闯楼每多少层有称号奖励', "a");
        this.answers.put('打坐增长什么属性', "a");
        this.answers.put('从哪个npc处进入跨服战场', "a");
        this.answers.put('下面哪个是天邪派的师傅', "a");
        this.answers.put('每天能做多少个谜题任务', "a");
        this.answers.put('小男孩在华山村哪里', "a");
        this.answers.put('追风棍可以在哪位npc那里获得', "a");
        this.answers.put('逍遥派的绝学技能是以下哪个', "a");
        this.answers.put('沧海护腰是腰带类的第几级装备', "a");
        this.answers.put('花花公子在哪个地图', "a");
        this.answers.put('每次合成宝石需要多少银两', "a");
        this.answers.put('以下哪个不是微信分享好友、朋友圈、QQ空间的奖励', "a");
        this.answers.put('打排行榜每天可以完成多少次', "a");
        this.answers.put('夜行披风是披风类的第几级装备', "a");
        this.answers.put('白蟒鞭的伤害是多少', "a");
        this.answers.put('易容术向谁学习', "a");
        this.answers.put('支线对话书生上魁星阁二楼杀死哪个NPC给10元宝', "a");
        this.answers.put('斗转星移是哪个门派的技能', "a");
        this.answers.put('杨过在哪个地图', "a");
        this.answers.put('钻石项链在哪获得', "a");
        this.answers.put('多少消费积分换取黄金宝箱', "a");
        this.answers.put('每突破一次技能有效系数加多少', "a");
        this.answers.put('茅山学习什么技能招宝宝', "a");
        this.answers.put('陆得财在乔阴县的哪个场景', "a");
        this.answers.put('独龙寨是第几个组队副本', "a");
        this.answers.put('以下哪个是花紫会的祖师', "a");
        this.answers.put('金弹子的伤害是多少', "a");
        this.answers.put('明月帽要多少刻刀摩刻', "a");
        this.answers.put('论剑输一场获得多少论剑积分', "a");
        this.answers.put('论剑中以下哪个是铁血大旗门的师傅', "a");
        this.answers.put('8级的装备摹刻需要几把刻刀', "a");
        this.answers.put('赠送李铁嘴银两能够增加什么', "a");
        this.answers.put('金刚不坏功有什么效果', "a");
        this.answers.put('少林的易筋经神功有哪个特殊效果', "a");
        this.answers.put('大旗门的修养术有哪个特殊效果', "a");
        this.answers.put('金刚杖的伤害是多少', "a");
        this.answers.put('双儿在扬州的哪个小地图', "a");
        this.answers.put('花不为在哪一章', "a");
        this.answers.put('铁项链可以在哪位npc那里获得', "a");
        this.answers.put('武学世家加的什么初始属性', "a");
        this.answers.put('师门磕头增加什么', "a");
        this.answers.put('全真的道家心法有哪个特殊效果', "a");
        this.answers.put('功德箱捐香火钱有什么用', "a");
        this.answers.put('雪莲有什么作用', "a");
        this.answers.put('论剑中以下哪个是花紫会的技能', "a");
        this.answers.put('柳文君所在的位置', "a");
        this.answers.put('岳掌门在哪一章', "a");
        this.answers.put('长虹剑在哪位npc那里获得？', "a");
        this.answers.put('副本一次最多可以进几人', "a");
        this.answers.put('师门任务每天可以完成多少次', "a");
        this.answers.put('逍遥步是哪个门派的技能', "a");
        this.answers.put('新人礼包在哪个npc处兑换', "a");
        this.answers.put('使用朱果经验潜能将分别增加多少', "a");
        this.answers.put('欧阳敏在哪一章', "a");
        this.answers.put('辟邪剑法是哪个门派的绝学技能', "a");
        this.answers.put('在哪个npc处可以更改名字', "a");
        this.answers.put('毒龙鞭的伤害是多少', "a");
        this.answers.put('晚月庄主线过关要求', "a");
        this.answers.put('怎么样获得免费元宝', "a");
        this.answers.put('成长计划需要多少元宝方可购买', "a");
        this.answers.put('青城派的道家心法有哪个特殊效果', "a");
        this.answers.put('藏宝图在哪个NPC处购买', "a");
        this.answers.put('丁老怪是哪个门派的终极师傅', "a");
        this.answers.put('斗转星移阵是哪个门派的阵法', "a");
        this.answers.put('挂机增长什么', "a");
        this.answers.put('鹰爪擒拿手是哪个门派的技能', "a");
        this.answers.put('八卦迷阵是那个门派的阵法', "a");
        this.answers.put('一天能完成挑战排行榜任务多少次', "a");
        this.answers.put('论剑每天能打几次', "a");
        this.answers.put('需要使用什么衣服才能睡寒玉床', "a");
        this.answers.put('张天师是哪个门派的师傅', "a");
        this.answers.put('技能柳家拳谁教的', "a");
        this.answers.put('九阴派梅师姐在星宿海哪个场景', "a");
        this.answers.put('哪个npc处可以捏脸', "a");
        this.answers.put('论剑中步玄派的师傅是哪个', "a");
        this.answers.put('宝玉鞋击杀哪个npc可以获得', "a");
        this.answers.put('慕容家主在慕容山庄的哪个场景', "a");
        this.answers.put('闻旗使在哪个地图', "a");
        this.answers.put('虎皮腰带是腰带类的第几级装备', "a");
        this.answers.put('在哪里可以找到“香茶”？', "a");
        this.answers.put('打造刻刀需要多少个玄铁', "a");
        this.answers.put('包家将是哪个门派的师傅', "a");
        this.answers.put('论剑中以下哪个是天邪派的人物', "a");
        this.answers.put('升级什么技能可以提升根骨', "a");
        this.answers.put('NPC公平子在哪一章地图', "a");
        this.answers.put('逄义是在那个场景', "a");
        this.answers.put('锻造一把刻刀需要多少银两', "a");
        this.answers.put('以下哪个不是岳掌门教导的武学', "a");
        this.answers.put('捏脸需要寻找哪个NPC？', "a");
        this.answers.put('论剑中以下哪个是晚月庄的技能', "a");
        this.answers.put('碧海潮生剑在哪位师傅处学习', "a");
        this.answers.put('干苦力是挂机里的第几个任务', "a");
        this.answers.put('铁血大旗门云海心法可以提升什么', "a");
        this.answers.put('以下哪些物品是成长计划第四天可以领取的？', "a");
        this.answers.put('易容术多少级才可以易容成异性NPC', "a");
        this.answers.put('摹刻扬文需要多少把刻刀？', "a");
        this.answers.put('正邪任务中客商的在哪个地图', "a");
        this.answers.put('白驼山第一位要拜的师傅是谁', "a");
        this.answers.put('枯荣禅功是哪个门派的技能', "a");
        this.answers.put('漫天花雨匕在哪获得', "a");
        this.answers.put('摧心掌是哪个门派的技能', "a");
        this.answers.put('“花海”场景是在哪个地图上？', "a");
        this.answers.put('雪蕊儿是哪个门派的师傅', "a");
        this.answers.put('新手礼包在哪里领取', "a");
        this.answers.put('论语在哪购买', "a");
        this.answers.put('银丝链甲衣可以在哪位npc那里获得？', "a");
        this.answers.put('乾坤大挪移属于什么类型的武功', "a");
        this.answers.put('移开明教石板需要哪项技能到一定级别', "a");
        this.answers.put('开通VIP月卡最低需要当天充值多少元方有购买资格', "a");
        this.answers.put('黯然销魂掌有多少招式', "c");
        this.answers.put('“跪拜坪”场景是在哪个地图上', "b");
        this.answers.put('孤独求败称号需要多少论剑积分兑换', "b");
        this.answers.put('孔雀氅可以镶嵌几颗宝石', "b");
        this.answers.put('客商在哪一章', "b");
        this.answers.put('疯魔杖的伤害是多少', "b");
        this.answers.put('丐帮的轻功是哪个', "b");
        this.answers.put('霹雳掌套的伤害是多少', "b");
        this.answers.put('方媃是哪个门派的师傅', "b");
        this.answers.put('拜师张三丰需要多少正气', "b");
        this.answers.put('天师阵法是哪个门派的阵法', "b");
        this.answers.put('选择商贾会影响哪个属性', "b");
        this.answers.put('银手镯可以在哪位npc那里获得？', "b");
        //this.answers.put('清风寨在哪', "d");
        this.answers.put('在雪亭镇李火狮可以学习多少级柳家拳', "b");
        this.answers.put('华山施戴子掉落的物品是什么', "b");
        this.answers.put('尹志平是哪个门派的师傅', "b");
        this.answers.put('病维摩拳是哪个门派的技能', "b");
        this.answers.put('茅山的绝学是什么', "b");
        this.answers.put('茅山派的轻功是什么', "b");
        this.answers.put('风泉之剑可以在哪位npc那里获得？', "b");
        this.answers.put('凌波微步是哪个门派的技能', "b");
        this.answers.put('藏宝图在哪个npc处购买', "b");
        this.answers.put('军营是第几个组队副本', "b");
        this.answers.put('北岳殿神像后面是哪位npc', "b");
        this.answers.put('王重阳是哪个门派的师傅', "b");
        this.answers.put('跨服是星期几举行的', "b");
        this.answers.put('学习屠龙刀法需要多少内力', "b");
        this.answers.put('高级乾坤再造丹是增加什么的', "b");
        this.answers.put('银项链可以在哪位npc那里获得', "b");
        this.answers.put('每天在线多少个小时即可领取消费积分', "b");
        this.answers.put('晚月庄的内功是什么', "b");
        this.answers.put('冰魄银针的伤害是多少', "b");
        this.answers.put('论剑中以下哪个是丐帮的技能', "b");
        this.answers.put('神雕大侠所在的地图', "b");
        this.answers.put('突破丹在哪里购买', "b");
        this.answers.put('白金手镯可以在哪位npc那里获得', "a");
        this.answers.put('金手镯可以在哪位npc那里获得', "b");
        this.answers.put('以下哪个不是梁师兄教导的武学', "b");
        this.answers.put('技能数量超过了什么消耗潜能会增加', "b");
        this.answers.put('白金项链可以在哪位npc那里获得', "b");
        this.answers.put('小龙女住的古墓是谁建造的', "b");
        this.answers.put('打开引路蜂礼包可以得到多少引路蜂', "b");
        this.answers.put('购买新手进阶礼包在挂机打坐练习上可以享受多少倍收益', "b");
        this.answers.put('白玉腰束是腰带类的第几级装备', "b");
        this.answers.put('老顽童在全真教哪个场景', "b");
        this.answers.put('神雕侠侣的作者是', "b");
        this.answers.put('晚月庄的七宝天岚舞可以提升哪个属性', "b");
        this.answers.put('论剑在周几进行', "b");
        this.answers.put('vip每天不可以领取什么', "b");
        this.answers.put('每天有几次试剑', "b");
        this.answers.put('晚月庄七宝天岚舞可以提升什么', "b");
        this.answers.put('哪个分享可以获得20元宝', "b");
        this.answers.put('大保险卡可以承受多少次死亡后不降技能等级', "b");
        this.answers.put('凌虚锁云步是哪个门派的技能', "b");
        this.answers.put('屠龙刀法是哪个门派的绝学技能', "b");
        this.answers.put('金丝鞋可以在哪位npc那里获得', "b");
        this.answers.put('老毒物在白驮山的哪个场景', "b");
        this.answers.put('毒物阵法是哪个门派的阵法', "b");
        this.answers.put('以下哪个不是知客道长教导的武学', "b");
        this.answers.put('飞仙剑阵是哪个门派的阵法', "b");
        this.answers.put('副本完成后不可获得下列什么物品', "b");
        this.answers.put('晚月庄意寒神功可以提升什么', "b");
        this.answers.put('北冥神功是哪个门派的技能', "b");
        this.answers.put('论剑中以下哪个是青城派的技能', "b");
        this.answers.put('六阴追魂剑是哪个门派的技能', "b");
        this.answers.put('王铁匠是在那个场景', "b");
        this.answers.put('以下哪个是步玄派的祖师', "b");
        this.answers.put('在洛阳萧问天那可以学习什么心法', "b");
        this.answers.put('在哪个npc处能够升级易容术', "b");
        this.answers.put('摹刻10级的装备需要摩刻技巧多少级', "b");
        this.answers.put('师门任务什么时候更新', "b");
        this.answers.put('哪个npc属于全真七子', "b");
        this.answers.put('正邪任务中卖花姑娘在哪个地图', "b");
        this.answers.put('风老前辈在华山哪个场景', "b");
        this.answers.put('“留云馆”场景是在哪个地图上？', "b");
        this.answers.put('割鹿刀可以在哪位npc那里获得', "b");
        this.answers.put('论剑中以下哪个是大招寺的技能', "b");
        this.answers.put('全真的基本阵法有哪个特殊效果', "b");
        this.answers.put('论剑要在晚上几点前报名', "b");
        this.answers.put('碧磷鞭的伤害是多少？', "b");
        this.answers.put('一天能完成谜题任务多少个', "b");
        this.answers.put('正邪任务杀死好人增长什么', "b");
        this.answers.put('木道人在青城山的哪个场景', "b");
        this.answers.put('论剑中以下哪个不是大招寺的技能', "b");
        this.answers.put('“伊犁”场景是在哪个地图上？', "b");
        this.answers.put('“冰火岛”场景是在哪个地图上', "b");
        this.answers.put('“双鹤桥”场景是在哪个地图上', "b");
        this.answers.put('“百龙山庄”场景是在哪个地图上？', "b");

        this.answers.put('九阳神功是哪个门派的技能', "c");
        this.answers.put('树王坟在第几章节', "c");
        this.answers.put('阳刚之劲是哪个门派的阵法', "c");
        this.answers.put('上山打猎是挂机里的第几个任务', "c");
        this.answers.put('一张分身卡的有效时间是多久', "c");
        this.answers.put('锻造一把刻刀需要多少玄铁碎片锻造', "c");
        this.answers.put('论剑中以下哪个不是铁血大旗门的技能', "c");
        this.answers.put('如意刀是哪个门派的技能', "c");
        this.answers.put('跨服在哪个场景进入', "c");
        this.answers.put('在哪个NPC可以购买恢复内力的药品？', "c");
        this.answers.put('欧阳敏在唐门的哪个场景', "c");
        this.answers.put('密宗伏魔是哪个门派的阵法', "c");
        this.answers.put('孔雀氅是披风类的第几级装备？', "c");
        this.answers.put('天山折梅手是哪个门派的技能', "c");
        this.answers.put('玩家每天能够做几次正邪任务', "c");
        this.answers.put('柳淳风在哪一章', "c");
        this.answers.put('茅山天师正道可以提升什么', "c");
        this.answers.put('洪帮主在洛阳哪个场景', "c");
        this.answers.put('以下哪个不是全真七子？', "c");
        this.answers.put('云九天是哪个门派的师傅', "c");
        this.answers.put('摹刻烈日宝链需要多少级摩刻技巧', "c");
        this.answers.put('伏虎杖的伤害是多少', "c");
        this.answers.put('灵蛇杖法是哪个门派的技能', "c");
        this.answers.put('“子午楼”场景是在哪个地图上', "c");
        this.answers.put('什么装备可以镶嵌紫水晶', "c");
        this.answers.put('石师妹哪个门派的师傅', "c");
        this.answers.put('烈火旗大厅是那个地图的场景', "c");
        this.answers.put('打土匪是挂机里的第几个任务', "c");
        this.answers.put('捏脸需要花费多少银两', "c");
        this.answers.put('大旗门的云海心法可以提升哪个属性', "c");
        this.answers.put('论剑中以下哪个是铁雪山庄的技能', "c");
        this.answers.put('“白玉牌楼”场景是在哪个地图上', "c");
        this.answers.put('以下哪个宝石不能镶嵌到披风', "c");
        this.answers.put('魏无极身上掉落什么装备', "c");
        this.answers.put('以下不是步玄派的技能的哪个', "c");
        this.answers.put('“常春岛渡口”场景是在哪个地图上', "c");
        this.answers.put('北斗七星阵是第几个的组队副本', "c");
        this.answers.put('宝石合成一次需要消耗多少颗低级宝石', "c");
        this.answers.put('烈日项链可以镶嵌几颗宝石', "c");
        this.answers.put('达摩在少林哪个场景', "c");
        this.answers.put('积分商城在雪亭镇的哪个场景', "c");
        this.answers.put('全真的双手互搏有哪个特殊效果', "c");
        this.answers.put('论剑中以下哪个不是唐门的人物', "c");
        this.answers.put('棋道是哪个门派的技能', "c");
        this.answers.put('七星鞭的伤害是多少', "c");
        this.answers.put('富春茶社在哪一章', "c");
        this.answers.put('等级多少才能在世界频道聊天', "c");
        this.answers.put('以下哪个是封山派的祖师', "c");
        this.answers.put('论剑是星期几进行的', "c");
        this.answers.put('师门任务每天可以做多少个', "c");
        this.answers.put('风泉之剑加几点悟性', "c");
        this.answers.put('黑水伏蛟可以在哪位npc那里获得？', "c");
        this.answers.put('陆得财是哪个门派的师傅', "c");
        this.answers.put('拜师小龙女需要容貌多少', "c");
        this.answers.put('下列装备中不可摹刻的是', "c");
        this.answers.put('古灯大师是哪个门派的终极师傅', "c");
        this.answers.put('“翰墨书屋”场景是在哪个地图上', "c");
        this.answers.put('论剑中大招寺第一个要拜的师傅是谁', "c");
        this.answers.put('杨过小龙女分开多少年后重逢', "c");
        this.answers.put('选择孤儿会影响哪个属性', "c");
        this.answers.put('论剑中逍遥派的终极师傅是谁', "c");
        this.answers.put('不可保存装备下线多久会消失', "c");
        this.answers.put('一个队伍最多有几个队员', "c");
        //        this.answers.put('论语在哪购买', "c");
        this.answers.put('以下哪个宝石不能镶嵌到戒指', "c");
        this.answers.put('论剑是每周星期几', "c");
        this.answers.put('茅山在哪里拜师', "c");
        this.answers.put('以下哪个宝石不能镶嵌到腰带', "c");
        this.answers.put('黄宝石加什么属性', "c");
        this.answers.put('茅山可以招几个宝宝', "c");
        this.answers.put('唐门密道怎么走', "c");
        this.answers.put('论剑中以下哪个不是大理段家的技能', "c");
        this.answers.put('论剑中以下哪个不是魔教的人物', "d");
        this.answers.put('每天能做多少个师门任务', "c");
        this.answers.put('一天能使用元宝做几次暴击谜题', "c");

        this.answers.put('成长计划第七天可以领取多少元宝', "d");
        this.answers.put('每天能挖几次宝', "d");
        this.answers.put('日月神教大光明心法可以提升什么', "d");
        this.answers.put('在哪个npc处领取免费消费积分', "d");
        this.answers.put('副本有什么奖励', "d");
        this.answers.put('论剑中以下不是华山派的人物的是哪个', "d");
        this.answers.put('论剑中以下哪个不是丐帮的技能', "d");
        this.answers.put('以下哪个不是慧名尊者教导的技能', "d");
        this.answers.put('慕容山庄的斗转星移可以提升哪个属性', "d");
        this.answers.put('论剑中以下哪个不是铁雪山庄的技能', "d");
        this.answers.put('师门任务一天能完成几次', "d");
        this.answers.put('以下有哪些物品不是每日充值的奖励', "d");
        this.answers.put('论剑中以下哪个不是华山派的技能的', "d");
        this.answers.put('武穆兵法提升到多少级才能出现战斗必刷', "d");
        this.answers.put('论剑中以下哪个不是全真教的技能', "d");
        this.answers.put('师门任务最多可以完成多少个', "d");
        this.answers.put('张三丰在哪一章', "d");
        this.answers.put('倚天剑加多少伤害', "d");
        this.answers.put('以下谁不精通降龙十八掌', "d");
        this.answers.put('论剑中以下哪个不是明教的技能', "d");
        this.answers.put('受赠的消费积分在哪里领取', "d");
        this.answers.put('以下哪个不是道尘禅师教导的武学', "d");
        this.answers.put('古墓多少级以后才能进去', "d");
        this.answers.put('千古奇侠称号需要多少论剑积分兑换', "d");
        this.answers.put('魔鞭诀在哪里学习', "d");
        this.answers.put('通灵需要花费多少银两', "d");
        this.answers.put('白银宝箱礼包多少元宝一个', "d");
        this.answers.put('以下哪个不是论剑的皮肤', "d");
        this.answers.put('小李飞刀的伤害是多少', "d");
        this.answers.put('下面哪个npc不是魔教的', "d");
        this.answers.put('天蚕围腰是腰带类的第几级装备', "d");
        this.answers.put('黄岛主在桃花岛的哪个场景', "d");
        this.answers.put('宝玉帽可以在哪位npc那里获得？', "d");
        this.answers.put('什么影响攻击力', "d");
        this.answers.put('紫宝石加什么属性', "d");
        this.answers.put('少林的混元一气功有哪个特殊效果', "d");
        this.answers.put('以下哪个是晚月庄的祖师', "d");
        this.answers.put('以下不是隐藏门派的是哪个', "d");
        this.answers.put('第一个副本需要多少等级才能进入', "d");
        this.answers.put('风泉之剑在哪里获得', "d");
        this.answers.put('镖局保镖是挂机里的第几个任务', "d");
        this.answers.put('下面哪个不是古墓的师傅', "d");
        this.answers.put('每个玩家最多能有多少个好友', "b");
        this.answers.put('以下哪个不是在扬州场景', "d");
        this.answers.put('茅山的天师正道可以提升哪个属性', "d");
        this.answers.put('“无名山脚”场景是在哪个地图上', "d");
        this.answers.put('闯楼第几层可以获得称号“藏剑楼楼主”', "d");
        this.answers.put('充值积分不可以兑换下面什么物品', "d");
        this.answers.put('魔教的大光明心法可以提升哪个属性', "d");
        this.answers.put('以下哪些物品不是成长计划第三天可以领取的', "d");
        this.answers.put('论剑中以下哪个不是峨嵋派可以拜师的师傅', "d");
        this.answers.put('哪个技能不是魔教的', "d");
        this.answers.put('沧海护腰可以镶嵌几颗宝石', "d");
        this.answers.put('城里打擂是挂机里的第几个任务', "d");
        this.answers.put('以下哪个不是鲁长老教导的武学', "d");
        this.answers.put('以下哪些物品不是成长计划第一天可以领取的', "d");
        this.answers.put('包拯在哪一章', "d");
        this.answers.put('张天师在茅山哪个场景', "d");
        this.answers.put('山河藏宝图需要在哪个NPC手里购买？', "d");
        this.answers.put('影响你出生的福缘的出生是', "d");
        this.answers.put('张三丰在武当山哪个场景', "d");
        this.answers.put('春秋水色斋需要多少杀气才能进入', "d");
        this.answers.put('论剑中以下哪个不是是晚月庄的技能', "d");
        this.answers.put('大乘佛法有什么效果', "d");
        this.answers.put('正邪任务最多可以完成多少个', "d");
        this.answers.put('高级突破丹多少元宝一颗', "d");
        this.answers.put('清虚道长在哪一章', "d");
        this.answers.put('在战斗界面点击哪个按钮可以进入聊天界面', "d");
        this.answers.put('“鹰记商号”场景是在哪个地图上？', "d");
        this.answers.put('改名字在哪改', "d");
        this.answers.put('以下哪个不是在洛阳场景', "d");
        //        this.answers.put('青城派的道德经可以提升哪个属性', "d");
        this.answers.put('金项链可以在哪位npc那里获得', "d");

        this.answer = function(a) {
            //          alert("答案是：" + a);
            go("question " + a);
            //            go("question");
        };

        this.dispatchMessage = function(b) {
            var type = b.get("type"), msg= b.get("msg");
            if (type == "show_html_page" && msg.indexOf("知识问答第") > 0) {
                console.log(msg);
                if (msg.indexOf("回答正确！") > 0) {
               //     sleep(500);
                    go("question");
                    return;
                }

                var q = this.answers.keys();
                for (var i in q) {
                    var k = q[i];

                    if (msg.indexOf(k) > 0) {
                        this.answer(this.answers.get(k));
                        break;
                    }
                }

                //                else if (msg.indexOf("正邪任务一天能做几次") > 0) this.answer("b")

            }
        };
    }

    var question = new Question;
    function Trigger(r, h, c, n) {
        this.regexp = r;
        this.handler = h;
        this.class = c;
        this.name = n;

        this.enabled = true;

        this.trigger = function(line) {
            if (!this.enabled) return;

            if (!this.regexp.test(line)) return;

            console.log("触发器: " + this.regexp + "触发了");
            var m = line.match(this.regexp);
            this.handler(m);
        };

        this.enable = function() {
            this.enabled = true;
        };

        this.disable = function() {
            this.enabled = false;
        };

    }

    jh = function(w) {
        if (w == 'xt') w = 1;
        if (w == 'ly') w = 2;
        if (w == 'hsc') w = 3;
        if (w == 'hs') w = 4;
        if (w == 'yz') w = 5;
        if (w == 'gb') w = 6;
        if (w == 'qy') w = 7;
        if (w == 'em') w = 8;
        if (w == 'hs2') w = 9;
        if (w == 'wd') w = 10;
        if (w == 'wy') w = 11;
        if (w == 'sy') w = 12;
        if (w == 'sl') w = 13;
        if (w == 'tm') w = 14;
        if (w == 'qc') w = 15;
        if (w == 'xx') w = 16;
        if (w == 'kf') w = 17;
        if (w == 'gmd') w = 18;
        if (w == 'qz') w = 19;
        if (w == 'gm') w = 20;
        if (w == 'bt') w = 21;
        if (w == 'ss') w = 22;
        if (w == 'mz') w = 23;
        if (w == 'ts') w = 24;


        go("jh " + w, 0);
 //       sleep(500);
    };


    function Triggers() {
        this.allTriggers = [];

        this.trigger = function(line) {
            var t = this.allTriggers.slice(0);
            for (var i = 0, l = t.length; i < l; i++) {
                t[i].trigger(line);
            }
        };

        this.newTrigger = function(r, h, c, n) {
            var t = new Trigger(r, h, c, n);
            if (n) {
                for (var i = this.allTriggers.length - 1; i >= 0; i--) {
                    if (this.allTriggers[i].name == n) this.allTriggers.splice(i, 1);
                }
            }

            this.allTriggers.push(t);

            return t;
        };

        this.enableTriggerByName = function(n) {
            for (var i = this.allTriggers.length - 1; i >= 0; i--) {
                t = this.allTriggers[i];
                if (t.name == n) t.enable();
            }
        };

        this.disableTriggerByName = function(n) {
            for (var i = this.allTriggers.length - 1; i >= 0; i--) {
                t = this.allTriggers[i];
                if (t.name == n) t.disable();
            }
        };

        this.enableByCls = function(c) {
            for (var i = this.allTriggers.length - 1; i >= 0; i--) {
                t = this.allTriggers[i];
                if (t.class == c) t.enable();
            }
        };

        this.disableByCls = function(c) {
            for (var i = this.allTriggers.length - 1; i >= 0; i--) {
                t = this.allTriggers[i];
                if (t.class == c) t.disable();
            }
        };

        this.removeByCls = function(c) {
            for (var i = this.allTriggers.length - 1; i >= 0; i--) {
                t = this.allTriggers[i];
                if (t && t.class == c) this.allTriggers.splice(i, 1);
            }
        };

        this.removeByName = function(n) {
            for (var i = this.allTriggers.length - 1; i >= 0; i--) {
                t = this.allTriggers[i];
                if (t.name == n) this.allTriggers.splice(i, 1);
            }
        };
    }

    window.triggers = new Triggers;

    triggers.newTrigger(/似乎以下地方藏有宝物(.*)/, function(m) {
        m = m[1].split(/\d+/);
        var bl_found = false;
        for (i = 0, l = m.length; i < l; i++) {
            var a = m[i];
            console.log(a);
            if (/一片翠绿的草地/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;e;e;n;n;n;n;n;w;dig go');
                bl_found = true;
                break;
            }
            if (/大诗人白居易之墓，墓碑上刻着“唐少傅白公墓”。四周环绕着冬青。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;e;e;n;n;n;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/你现在正站在雪亭镇南边的一家小客栈里，这家客栈虽小，却是方圆五百里/.test(a)) {
                jh('xt');
                go('dig go');
                bl_found = true;
                break;
            }
            if (/这里是雪亭镇镇前广场的空地，地上整齐地铺著大石板。广场中央有一个木头搭的架子，经过多年的风吹日晒雨淋，看来非常破旧。四周建筑林立。往西你可以看到一间客栈，看来生意似乎很好。/.test(a)) {
                jh('xt');
                go('e;dig go');
                bl_found = true;
                break;
            }
            if (/这是一间十分老旧的城隍庙，在你面前的神桌上供奉著一尊红脸的城隍，庙虽老旧，但是神案四周已被香火薰成乌黑的颜色，显示这里必定相当受到信徒的敬仰。/.test(a)) {
                jh('xt');
                go('e;e;dig go');
                bl_found = true;
                break;
            }
            if (/这是一条普通的黄土小径，弯弯曲曲往东北一路盘旋上山，北边有一间城隍庙，往西则是雪亭镇的街道。/.test(a)) {
                jh('xt');
                go('e;e;s;dig go');
                bl_found = true;
                break;
            }
            if (/这是一条普通的黄土小径，小径往西南通往一处山间的平地，从这里可以望见不少房屋错落在平地上，往东北则一路上山。/.test(a)) {
                jh('xt');
                go('e;e;s;ne;dig go');
                bl_found = true;
                break;
            }
            if (/这是一条说宽不宽，说窄倒也不窄的山路，路面用几块生满青苔的大石铺成，西面是一段坡地，从这里可以望见西边有几间房屋错落在林木间，东面则是山壁，山路往西南衔接一条黄土小径，往北则是通往山上的石阶。/.test(a)) {
                jh('xt');
                go('e;e;s;ne;ne;dig go');
                bl_found = true;
                break;
            }
            if (/这里是雪亭镇的街口，往北是一个热闹的广场，南边是条小路通往一座林子，东边则有一条小径沿著山腰通往山上，往西是一条比较窄的街道，参差不齐的瓦屋之间传来几声犬吠。从这里向东南走就是进出关的驿道了。/.test(a)) {
                jh('xt');
                go('e;s;dig go');
                bl_found = true;
                break;
            }
            if (/这里是雪亭镇的街道，你的北边有一家客栈，从这里就可以听到客栈里人们饮酒谈笑/.test(a)) {
                jh('xt');
                go('e;s;w;dig go');
                bl_found = true;
                break;
            }
            if (/这里是一间宽敞的书院，虽然房子看起来很老旧了，但是打扫得很整洁，墙壁上挂著一幅山水画，意境颇为不俗，书院的大门开在北边，西边有一扇木门通往边厢。/.test(a)) {
                jh('xt');
                go('e;s;w;s;dig go');
                bl_found = true;
                break;
            }
            if (/这是一条宽敞坚实的青石板铺成的大道，路上车马的痕迹已经在路面上留下一条条明显的凹痕，往东是一条较小的街道通往雪亭镇。/.test(a)) {
                jh('xt');
                go('e;s;w;w;dig go');
                bl_found = true;
                break;
            }
            if (/你现在正走在雪亭镇的街道上，东边不远处有一间高大的院子，门口立著一根粗大的旗杆/.test(a)) {
                jh('xt');
                go('e;n;dig go');
                bl_found = true;
                break;
            }
            if (/这是一间素来以公平信用著称的钱庄，钱庄的老板还是个曾经中过举人的读书人/.test(a)) {
                jh('xt');
                go('e;n;w;dig go');
                bl_found = true;
                break;
            }
            if (/你现在正站在一间大宅院的入口，两只巨大的石狮镇守在大门的两侧，一阵阵吆喝与刀剑碰撞的声音从院子中传来，通过大门往东可以望见许多身穿灰衣的汉子正在操练。/.test(a)) {
                jh('xt');
                go('e;n;e;dig go');
                bl_found = true;
                break;
            }
            if (/你现在正站在一个宽敞的教练场中，地上铺著黄色的细砂，许多人正在这里努力地操练著，北边是一间高大的兵器厅，往东则是武馆师父们休息的大厅。/.test(a)) {
                jh('xt');
                go('e;n;e;e;dig go');
                bl_found = true;
                break;
            }
            if (/这是一间堆满各式兵器、刀械的储藏室，各式武器都依照种类、长短、依次放在一起，并且擦拭得一尘不染，储藏室的出口在你的南边，面对出口的左手边有一个架子/.test(a)) {
                jh('xt');
                go('e;n;e;e;n;dig go');
                bl_found = true;
                break;
            }
            if (/这里是淳风武馆的正厅，五张太师椅一字排开面对著门口，这是武馆中四位大师傅与馆主柳淳风的座位/.test(a)) {
                jh('xt');
                go('e;n;e;e;e;dig go');
                bl_found = true;
                break;
            }
            if (/这里是淳风武馆中的天井，往西走可以回到正厅/.test(a)) {
                jh('xt');
                go('e;n;e;e;e;e;dig go');
                bl_found = true;
                break;
            }
            if (/这里是一间整理得相当乾净的书房，红木桌椅上铺著蓝绸巾，显得十分考究，西面的立著一个书架，上面放著一排排的古书，往南走出房门可以看到天井。/.test(a)) {
                jh('xt');
                go('e;n;e;e;e;e;n;dig go');
                bl_found = true;
                break;
            }
            if (/这里是一间布置得相当雅致的厢房，从窗子可以看到北边的天井跟南边的庭园中各式各样的奇花异草，以及他们所带来的淡淡香气，厢房的东面墙上还挂著一幅仕女图/.test(a)) {
                jh('xt');
                go('e;n;e;e;e;e;s;dig go');
                bl_found = true;
                break;
            }
            if (/这里是淳风武馆的内院，平常武馆弟子没有馆主的允许是不敢到这里来的/.test(a)) {
                jh('xt');
                go('e;n;e;e;e;e;e;dig go');
                bl_found = true;
                break;
            }
            if (/你现在正走在雪亭镇的大街，往南直走不远处是镇上的广场，在你的东边是一间大宅院/.test(a)) {
                jh('xt');
                go('e;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/这里是一间打铁铺子，从火炉中冒出的火光将墙壁映得通红，屋子的角/.test(a)) {
                jh('xt');
                go('e;n;n;w;dig go');
                bl_found = true;
                break;
            }
            if (/这里是雪亭镇的大街，东边有一栋陈旧的建□，看起来像是什麽店铺，但是并没有任何招牌，只有一扇门上面写著一个大大的/.test(a)) {
                jh('xt');
                go('e;n;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/这是一家中等规模的当铺，老旧的柜台上放著一张木牌/.test(a)) {
                jh('xt');
                go('e;n;n;n;e;dig go');
                bl_found = true;
                break;
            }
            if (/这里是丰登当铺的储藏室，有时候当铺里的大朝奉会把铺里存不下的死当货物拿出来拍卖/.test(a)) {
                jh('xt');
                go('e;n;n;n;e;e;dig go');
                bl_found = true;
                break;
            }
            if (/这里是雪亭镇的大街，一条小巷子通往东边，西边则是一间驿站/.test(a)) {
                jh('xt');
                go('e;n;n;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/这里是负责雪亭镇官府文书跟军令往来的雪亭驿/.test(a)) {
                jh('xt');
                go('e;n;n;n;n;w;dig go');
                bl_found = true;
                break;
            }
            if (/一间小木屋，在这北方的风中吱吱作响。/.test(a)) {
                jh('xt');
                go('e;n;n;n;n;e;dig go');
                bl_found = true;
                break;
            }
            if (/这里是一处山坳，往南就是雪亭镇，一条蜿蜒的小径往东通往另一个邻近的小山村/.test(a)) {
                jh('xt');
                go('e;n;n;n;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/这里便是有名的龙门石窟，石窟造像，密布于两岸的崖壁上。远远可以望见琵琶峰上的白冢。/.test(a)) {
                jh('ly');
                go('dig go');
                bl_found = true;
                break;
            }
            if (/城南官道，道路两旁是一片树林，远处是一片片的农田了。田地里传来农人的呼号，几头黄牛悠闲的趴卧着。/.test(a)) {
                jh('ly');
                go('n;dig go');
                bl_found = true;
                break;
            }
            if (/由此洛阳城南门出去，就可以通往南市的龙门石窟。城门处往来客商络绎不绝，几名守城官兵正在检查过往行人。/.test(a)) {
                jh('ly');
                go('n;n;dig go');
                bl_found = true;
                break;
            }
            if (/洛阳最繁华的街市，这里聚集着各国客商。/.test(a)) {
                jh('ly');
                go('n;n;e;dig go');
                bl_found = true;
                break;
            }
            if (/这里便是洛水渡口静静的洛水由此向东，汇入滚滚黄河。码头上正泊着一艘船坞，常常的缆绳垂在水中。/.test(a)) {
                jh('ly');
                go('n;n;e;s;dig go');
                bl_found = true;
                break;
            }
            if (/一艘普通的船坞，船头坐着一位蓑衣男子。/.test(a)) {
                jh('ly');
                go('n;n;e;s;luoyang317_op1;dig go');
                bl_found = true;
                break;
            }
            if (/这儿是洛阳的南面了，街上有好几个乞丐在行乞。/.test(a)) {
                jh('ly');
                go('n;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/这儿是一座供奉洛神的小庙。小庙的地上放着几个蒲团。/.test(a)) {
                jh('ly');
                go('n;n;n;w;dig go');
                bl_found = true;
                break;
            }
            if (/这儿就是洛阳金刀世家了。金刀门虽然武功不算高，但也是有两下子的。/.test(a)) {
                jh('ly');
                go('n;n;n;e;dig go');
                bl_found = true;
                break;
            }
            if (/金刀世家的练武场。金刀门的门主王天霸在这儿教众弟子习武。/.test(a)) {
                jh('ly');
                go('n;n;n;e;s;dig go');
                bl_found = true;
                break;
            }
            if (/这儿是洛神庙下面的地道，上面人走动的声音都隐约可听见。/.test(a)) {
                jh('ly');
                go('n;n;n;w;putuan;dig go');
                bl_found = true;
                break;
            }
            if (/湿润的青石路显然是刚刚下过雨，因为来往行人过多，路面多少有些坑坑凹凹，一不留神很容易被绊到。/.test(a)) {
                jh('ly');
                go('n;n;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/这儿就是菜市口。各种小贩商人十分嘈杂，而一些地痞流氓也混迹人群伺机作案。/.test(a)) {
                jh('ly');
                go('n;n;n;n;e;dig go');
                bl_found = true;
                break;
            }
            if (/一个猪肉摊，在这儿摆摊卖肉已经十多年了。/.test(a)) {
                jh('ly');
                go('n;n;n;n;e;s;dig go');
                bl_found = true;
                break;
            }
            if (/你刚踏进巷子，便听得琴韵丁冬，小巷的宁静和外面喧嚣宛如两个世界/.test(a)) {
                jh('ly');
                go('n;n;n;n;w;dig go');
                bl_found = true;
                break;
            }
            if (/小院四周满是盛开的桃花，穿过一条长廊，一座别致的绣楼就在眼前了。/.test(a)) {
                jh('ly');
                go('n;n;n;n;w;s;dig go');
                bl_found = true;
                break;
            }
            if (/绣楼内挂着湖绿色帐幔，一名女子斜靠在窗前的美人榻上。/.test(a)) {
                jh('ly');
                go('n;n;n;n;w;s;w;dig go');
                bl_found = true;
                break;
            }
            if (/这里就是背阴巷了，站在巷口可以万剑阴暗潮湿的窄巷，这里聚集着洛阳的地痞流氓，寻常人不敢近前。/.test(a)) {
                jh('ly');
                go('n;n;n;n;w;event_1_98995501;dig go');
                bl_found = true;
                break;
            }
            if (/黑暗的街道，几个地痞无赖正慵懒的躺在一旁。/.test(a)) {
                jh('ly');
                go('n;n;n;n;w;event_1_98995501;n;dig go;n;dig go');
                bl_found = true;
                break;
            }
            if (/这是一家酒肆，洛阳地痞头目甄大海正坐在里面小酌。/.test(a)) {
                jh('ly');
                go('n;n;n;n;w;event_1_98995501;n;n;e;dig go');
                bl_found = true;
                break;
            }
            if (/院落里杂草丛生，东面的葡萄架早已枯萎。/.test(a)) {
                jh('ly');
                go('n;n;n;n;w;event_1_98995501;n;w;dig go');
                bl_found = true;
                break;
            }
            if (/一座跨街大青砖砌的拱洞高台谯楼，矗立在城中心。鼓楼为二层木瓦建筑，设有大鼓大钟，晨钟暮鼓，用以报时。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/相传春秋时代，楚王在此仰望周王城，问鼎重几何。周室暗弱，居然隐忍不发。这便是街名的由来。银钩赌坊也在这条街上。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;w;dig go');
                bl_found = true;
                break;
            }
            if (/这里便是洛阳有名的悦来客栈，只见客栈大门处人来人往，看来生意很红火。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;w;n;dig go');
                bl_found = true;
                break;
            }
            if (/客栈大院，院内紫藤花架下放着几张桌椅，东面是一座马厩。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;w;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/客栈马倌正在往马槽里添草料，旁边草料堆看起来有些奇怪。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;w;n;n;w;dig go');
                bl_found = true;
                break;
            }
            if (/房间布置的极为雅致，没有太多的装饰，唯有屋角放着一个牡丹屏风。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;w;w;n;n;n;e;dig go');
                bl_found = true;
                break;
            }
            if (/赌坊二楼走廊，两旁房间里不时床来莺声燕语，看来这里不止可以赌。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;w;w;n;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/通往赌坊二楼的楼梯，上面铺着大红色地毯。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;w;w;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/大厅满是呼庐喝雉声、骰子落碗声、银钱敲击声，男人和女人的笑声，/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;w;w;n;dig go');
                bl_found = true;
                break;
            }
            if (/走出赌坊后门，桂花清香扑面而来，桂花树下的水缸似乎被人移动过。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;w;w;n;w;dig go');
                bl_found = true;
                break;
            }
            if (/赌坊门口人马喧哗，门上一支银钩在风中摇晃，不知道多少人咬上了这没有鱼饵的钩/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;w;w;dig go');
                bl_found = true;
                break;
            }
            if (/自古以来，洛阳墨客骚人云集，因此有“诗都”之称，牡丹香气四溢，又有“花都”的美誉/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;w;s;dig go');
                bl_found = true;
                break;
            }
            if (/这儿是牡丹园内的一座小亭子，布置得十分雅致。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;w;s;luoyang111_op1;dig go');
                bl_found = true;
                break;
            }
            if (/也许由于连年的战乱，使得本来很热闹的街市冷冷清清，道路两旁的店铺早已破旧不堪，一眼望去便知道有很久没有人居住了。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/这间当铺处于闹市，位置极好。当铺老板正半眯着双眼在高高的柜台上打盹。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;n;w;dig go');
                bl_found = true;
                break;
            }
            if (/你无意中走进一条青石街，这里不同于北大街的繁华热闹，两边是一些小店铺，北面有一家酒肆，里面出入的人看起来衣衫褴褛。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;n;e;dig go');
                bl_found = true;
                break;
            }
            if (/这是一间小酒肆，里面黑暗潮湿，满是油垢的桌旁，几名无赖正百无聊赖的就着一盘花生米喝酒。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;n;e;n;dig go');
                bl_found = true;
                break;
            }
            if (/这是洛阳北边街道，人群熙熙攘攘甚是热闹。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/洛阳城的钱庄，来往的商客往往都会将银两存于此处。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;n;n;e;dig go');
                bl_found = true;
                break;
            }
            if (/就是洛阳北门，门口站着的是守城官兵。站在城楼望出去，外面是一片茅草路。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;n;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/城北通往邙山的小路，路旁草丛中时有小兽出没。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;n;n;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/一片绿云般的竹林隔绝了喧嚣尘世，步入这里，心不由平静了下来。青石小路在竹林中蜿蜒穿行，竹林深处隐约可见一座小院。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;n;n;n;n;e;dig go');
                bl_found = true;
                break;
            }
            if (/绿竹环绕的小院，院内几间房舍都用竹子打造，与周围竹林颇为和谐。这小院的主人显然有些独特之处。院内一名老翁正在劈柴。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;n;n;n;n;e;n;dig go');
                bl_found = true;
                break;
            }
            if (/一间雅致的书斋，透过窗户可以见到青翠修竹，四周如此清幽，竹叶上露珠滴落的声音都能听见。靠墙的书架看起来很别致。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;n;n;n;n;e;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/ 就是洛阳城墙上的城楼，驻守的官兵通常会在这儿歇个脚，或是聊下天。如果心细之人，能看到角落里似乎有一个隐秘的把手。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;n;n;n;w;dig go');
                bl_found = true;
                break;
            }
            if (/ 这个城楼上的密室显然是守城军士秘密建造的，却不知有何用途。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;n;n;n;w;luoyang14_op1;dig go');
                bl_found = true;
                break;
            }
            if (/这就是洛阳城的城墙。洛阳是重镇，因此城墙上驻守的官兵格外多。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;n;n;n;e;dig go');
                bl_found = true;
                break;
            }
            if (/由于连年的战乱，整条金谷街的不少铺子已经荒废掉了。再往东走就是洛阳地痞流氓聚集的背阴巷。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;e;dig go');
                bl_found = true;
                break;
            }
            if (/这儿是洛阳首富的庄院，据说家财万贯，富可敌国。庄院的的中间有一棵参天大树。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;e;n;dig go');
                bl_found = true;
                break;
            }
            if (/这儿是富人家的储藏室，因此有不少奇珍异宝。仔细一看，竟然还有一个红光满面的老人家半躺在角落里。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;e;n;op1;dig go');
                bl_found = true;
                break;
            }
            if (/一座朴实的石拱桥，清澈河水从桥下流过。对面可见一座水榭。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;e;e;dig go');
                bl_found = true;
                break;
            }
            if (/荷池旁的水榭，几名游客正在里面小憩。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;e;e;n;dig go');
                bl_found = true;
                break;
            }
            if (/回廊两旁便是碧绿荷塘，阵阵荷香拂过。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;e;e;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/荷塘中的观景台，两名女子在这里游玩。远远站着几名护卫，闲杂人等一律被挡在外面。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;e;e;n;n;w;dig go');
                bl_found = true;
                break;
            }
            if (/隐藏在一片苍翠树林中的小路，小路尽头有座草屋。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;e;e;n;n;e;dig go');
                bl_found = true;
                break;
            }
            if (/简陋的茅草小屋，屋内陈设极其简单。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;e;e;n;n;e;n;dig go');
                bl_found = true;
                break;
            }
            if (/石阶两侧山泉叮咚，林木森森。漫步而上，可见山腰有亭。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;e;e;n;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/这就是听伊亭，据说白居易曾与好友在此品茗、论诗。一旁的松树上似乎有什么东西。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;e;e;n;n;n;w;dig go');
                bl_found = true;
                break;
            }
            if (/丛林小径，因为走得人少，小径已被杂草覆盖。/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;e;e;n;n;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/听着松涛之音，犹如直面大海/.test(a)) {
                jh('ly');
                go('n;n;n;n;n;e;e;n;n;n;n;e;dig go');
                bl_found = true;
                break;
            }
            if (/这里是华山村村口，几个草垛随意的堆放在路边，三两个泼皮慵懒躺在那里。/.test(a)) {
                jh('hsc');
                go('dig go');
                bl_found = true;
                break;
            }
            if (/这是一条穿过村口松树林的小路。/.test(a)) {
                jh('hsc');
                go('n;dig go');
                bl_found = true;
                break;
            }
            if (/这就是有名的神女冢，墓碑前散落着游人墨客烧的纸钱，前面不远处有一间破败的土地庙。/.test(a)) {
                jh('hsc');
                go('n;e;dig go');
                bl_found = true;
                break;
            }
            if (/这是一片溪边的杏树林，一群孩童在此玩耍。/.test(a)) {
                jh('hsc');
                go('w;dig go');
                bl_found = true;
                break;
            }
            if (/村口一个简易茶棚，放着几张木质桌椅，干净齐整，过往路人会在这里喝杯热茶歇歇脚，村里的王老二常常会混在这里小偷小摸。/.test(a)) {
                jh('hsc');
                go('w;n;dig go');
                bl_found = true;
                break;
            }
            if (/这是一间破败的土地庙门口，门旁的对联已经模糊不清，隐约只见上联“德之不修/.test(a)) {
                jh('hsc');
                go('w;event_1_59520311;dig go');
                bl_found = true;
                break;
            }
            if (/土地庙庙堂，正中供奉着土地，香案上堆积这厚厚的灰尘。/.test(a)) {
                jh('hsc');
                go('w;event_1_59520311;n;dig go');
                bl_found = true;
                break;
            }
            if (/隐藏在佛像后的地道入口，两只黑狗正虎视眈眈的立在那里。/.test(a)) {
                jh('hsc');
                go('w;event_1_59520311;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/通往西侧的通道，前面被铁栅栏挡住了。/.test(a)) {
                jh('hsc');
                bl_found = true;
                go('w;event_1_59520311;n;n;w;dig go');
                break;
            }
            if (/通往地下通道的木楼梯/.test(a)) {
                jh('hsc');
                go('w;event_1_59520311;n;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/通道两侧点着油灯，昏暗的灯光让人看不清楚周围的环境。/.test(a)) {
                jh('hsc');
                go('w;event_1_59520311;n;n;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/通往东侧的通道，前面传来有水声和痛苦的呻吟。/.test(a)) {
                jh('hsc');
                go('w;event_1_59520311;n;n;n;n;e;dig go');
                bl_found = true;
                break;
            }
            if (/这是一件宽敞的大厅，正中间摆着一张太师椅，两侧放着一排椅子。/.test(a)) {
                jh('hsc');
                go('w;event_1_59520311;n;n;n;n;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/这是一件布置极为简单的卧房，显然只是偶尔有人在此小憩。床上躺着一名半裸女子，满脸惊恐。/.test(a)) {
                jh('hsc');
                go('w;event_1_59520311;n;n;n;n;n;n;e;dig go');
                bl_found = true;
                break;
            }
            if (/这是一条古老的青石街，几个泼皮在街上游荡。/.test(a)) {
                jh('hsc');
                go('s;dig go');
                bl_found = true;
                break;
            }
            if (/这是一条碎石小路，前面有一个打铁铺。/.test(a)) {
                jh('hsc');
                go('s;e;dig go');
                bl_found = true;
                break;
            }
            if (/这是一间打铁铺，炉火烧的正旺，一名汉子赤膊挥舞着巨锤，锤落之处但见火花四溅。/.test(a)) {
                jh('hsc');
                go('s;e;n;dig go');
                bl_found = true;
                break;
            }
            if (/一棵千年银杏树屹立在广场中央，树下有一口古井，据说这口古井的水清澈甘甜，村里的人每天都会来这里挑水。/.test(a)) {
                jh('hsc');
                go('s;s;dig go');
                bl_found = true;
                break;
            }
            if (/村里的杂货铺，店老板正在清点货品。/.test(a)) {
                jh('hsc');
                go('s;s;e;dig go');
                bl_found = true;
                break;
            }
            if (/杂货铺后院，堆放着一些杂物，东边角落里放着一个马车车厢，一个跛脚汉子坐在一旁假寐。/.test(a)) {
                jh('hsc');
                go('s;s;e;s;dig go');
                bl_found = true;
                break;
            }
            if (/这是一个普通的马车车厢，粗布帘挡住了马车车窗和车门，地板上面躺着一个人。/.test(a)) {
                jh('hsc');
                go('s;s;e;s;huashancun24_op2;dig go');
                bl_found = true;
                break;
            }
            if (/这是村内宗祠大门，门口一棵古槐，树干低垂。/.test(a)) {
                jh('hsc');
                go('s;s;w;dig go');
                bl_found = true;
                break;
            }
            if (/宗祠的大厅，这里供奉着宗室先祖。/.test(a)) {
                jh('hsc');
                go('s;s;w;n;dig go');
                bl_found = true;
                break;
            }
            if (/青石板铺就的小桥，几棵野草从石缝中钻出，清澈的溪水自桥下湍湍流过。/.test(a)) {
                jh('hsc');
                go('s;s;s;dig go');
                bl_found = true;
                break;
            }
            if (/田间泥泞的小路，一个稻草人孤单的立在一旁，似乎在指着某个地方。一个男子神色慌张的从一旁田地里钻出。/.test(a)) {
                jh('hsc');
                go('s;s;s;s;dig go');
                bl_found = true;
                break;
            }
            if (/这是一间竹篱围城的小院，院内种着几株桃花，屋后竹林环绕，颇为雅致。旁边的西厢房上挂着一把铜制大锁，看起来有些奇怪。/.test(a)) {
                jh('hsc');
                go('s;s;s;s;w;dig go');
                bl_found = true;
                break;
            }
            if (/这是小院的厅堂，迎面墙壁上挂着一幅山水画，看来小院的主人不是普通农人。/.test(a)) {
                jh('hsc');
                go('s;s;s;s;w;n;dig go');
                bl_found = true;
                break;
            }
            if (/这是一间普通的厢房，四周窗户被布帘遮得严严实实。/.test(a)) {
                jh('hsc');
                go('s;s;s;s;w;get_silver;dig go');
                bl_found = true;
                break;
            }
            if (/一条杂草丛生的乡间小路，时有毒蛇出没。/.test(a)) {
                jh('hsc');
                go('s;s;s;s;s;dig go');
                bl_found = true;
                break;
            }
            if (/一间看起来有些破败的小茅屋，屋内角落里堆着一堆稻草，只见稻草堆悉悉索索响了一阵，竟然从里面钻出一个人来。/.test(a)) {
                jh('hsc');
                go('s;s;s;s;s;e;dig go');
                bl_found = true;
                break;
            }
            if (/清风寨山脚，站在此处可以摇摇望见四面悬崖的清风寨。/.test(a)) {
                jh('hsc');
                go('s;s;s;s;s;nw;dig go');
                bl_found = true;
                break;
            }
            if (/通往清风寨唯一的山路，一侧便是万丈深渊。/.test(a)) {
                jh('hsc');
                go('s;s;s;s;s;nw;n;dig go');
                bl_found = true;
                break;
            }
            if (/两扇包铁木门将清风寨与外界隔绝开来，门上写着“清风寨”三字。/.test(a)) {
                jh('hsc');
                go('s;s;s;s;s;nw;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/这里就是桃花泉，一片桃林环绕着清澈泉水，据说泉水一年四季不会枯竭。/.test(a)) {
                jh('hsc');
                go('s;s;s;s;s;nw;n;n;e;dig go');
                bl_found = true;
                break;
            }
            if (/清风寨前院，地面由坚硬岩石铺就。/.test(a)) {
                jh('hsc');
                go('s;s;s;s;s;nw;n;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/清风寨练武场，四周放置着兵器架。/.test(a)) {
                jh('hsc');
                go('s;s;s;s;s;nw;n;n;n;w;dig go');
                bl_found = true;
                break;
            }
            if (/清风寨议事厅，正中放置着一张虎皮椅。/.test(a)) {
                jh('hsc');
                go('s;s;s;s;s;nw;n;n;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/这里是清风寨后院，远角有一颗大树，树旁有一扇小门。/.test(a)) {
                jh('hsc');
                go('s;s;s;s;s;nw;n;n;n;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/这里就是清风寨兵器库了，里面放着各色兵器。角落里一个上锁的黑铁箱不知道装着什么。/.test(a)) {
                jh('hsc');
                go('s;s;s;s;s;nw;n;n;n;n;n;w;dig go');
                bl_found = true;
                break;
            }
            if (/这里的空气中充满清甜的味道，地上堆积着已经晒干的柿子。/.test(a)) {
                jh('hsc');
                go('s;s;s;s;s;nw;n;n;n;n;n;e;dig go');
                bl_found = true;
                break;
            }
            if (/这是清风寨寨主的卧房，床头挂着一把大刀。/.test(a)) {
                jh('hsc');
                go('s;s;s;s;s;nw;n;n;n;n;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/这是通往二楼大厅的楼梯，楼梯扶手上的雕花精美绝伦，看来这酒楼老板并不是一般的生意人/.test(a)) {
                jh('yz');
                go('n;n;n;n;n;n;e;n;dig go');
                bl_found = true;
                break;
            }
            if (/二楼是雅座，文人学士经常在这里吟诗作画，富商土豪也在这里边吃喝边作交易。/.test(a)) {
                jh('yz');
                go('n;n;n;n;n;n;e;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/进门绕过一道淡绿绸屏风，迎面墙上挂着一副『芙蓉出水』图。厅内陈列奢华，雕花楠/.test(a)) {
                jh('yz');
                go('n;n;n;n;n;n;e;n;n;w;dig go');
                bl_found = true;
                break;
            }
            if (/进门绕过一道淡黄绸屏风，迎面墙上挂着一副『芍药』图，鲜嫩欲滴/.test(a)) {
                jh('yz');
                go('n;n;n;n;n;n;e;n;n;e;dig go');
                bl_found = true;
                break;
            }
            if (/进门绕过一道淡红绸屏风，迎面墙上挂着一副『牡丹争艳』图，牡丹素以富贵著称。图侧对联：“幽径天姿呈独秀，古园国色冠群芳”。/.test(a)) {
                jh('yz');
                go('n;n;n;n;n;n;e;n;n;n;dig go');
                bl_found = true;
                break;
            }
            if (/你站在观景台上眺望，扬州城的美景尽收眼底。东面是就是小秦淮河岸，河岸杨柳轻拂水面，几簇粉色桃花点缀其间。/.test(a)) {
                jh('yz');
                go('n;n;n;n;n;n;e;n;n;n;n;dig go');
                bl_found = true;
                break;
            }

        }
        if (bl_found) go("cangbaotu_op1");
        //      window.setTimeout('go("cangbaotu_op1")', 3000);
    }, "", "cbt");



    window.game = this;

    window.attach = function() {
        var oldWriteToScreen = window.writeToScreen;
        window.writeToScreen = function(a, e, f, g) {
            oldWriteToScreen(a, e, f, g);
            a = a.replace(/<[^>]*>/g, "");
            triggers.trigger(a);
        };

        webSocketMsg.prototype.old = gSocketMsg.dispatchMessage;

        gSocketMsg.dispatchMessage = function(b) {
            this.old(b);
            qlMon.dispatchMessage(b);
            question.dispatchMessage(b);
        };
    };
    attach();

})(window);
String.prototype.trim = function (char, type) { // 去除字符串中，头部或者尾部的指定字符串
    if (char) {
        if (type == 'left') {
            return this.replace(new RegExp('^\\'+char+'+', 'g'), '');
        } else if (type == 'right') {
            return this.replace(new RegExp('\\'+char+'+$', 'g'), '');
        }
        return this.replace(new RegExp('^\\'+char+'+|\\'+char+'+$', 'g'), '');
    }
    return this.replace(/^\s+|\s+$/g, '');
};

// 加力 ----------------------------
function enforceFunc(){
    if (btnList["加力"].innerText == '加力') {
        var enforcePoints = prompt("请输入加力点数","835");  //加力点数
        go('enforce '+ enforcePoints);
        btnList["加力"].innerText = '不加力';
    }else{ // 不加力
        go('enforce');
        btnList["加力"].innerText = '加力';
    }
}

//切小号（切之前请提前切一次，小号不要点取消或接受点下观察即可）--------------------------------
function BiShi2Func(){
    if(btnList["切小号"].innerText  == '切小号'){
        var Swordsman2_targetName = prompt("请输入小号名","qq");
        fightSwordsman2Func();
        btnList["切小号"].innerText  = '停切磋';}
    else{clearKill2();
         {btnList["切小号"].innerText  = '切小号';}
        }

    function fightSwordsman2Func(){

        // 间隔500毫秒查找比试一次
        fightSwordsmanInterval2Func = setInterval(fightSwordsman2,500);
    }

    /**
 * [clearKill 停止比试小号]
 * @return {[type]} [无]
 */
    function clearKill2(){
        clearInterval(fightSwordsmanInterval2Func);
    }

    /**
 * [fightSwordsman2 比试指定小号]
 * @return {[type]} [无]
 */
    function fightSwordsman2(){
        // 寻找指定名称的小号并开始比试
        $("button.cmd_click3").each(
            function(){
                if(isContains($(this).html() , Swordsman2_targetName))
                    eval($(this).attr("onclick").replace("score","fight"));
            });

        // 战斗结束自动退出战斗界面
        if($('span.outbig_text:contains(战斗结束)').length>0){
            clickButton('prev_combat');
        }
        if (isContains($('span:contains(道：)').text().slice(-8),'应当会有发现……')){
            //fightSwordsmanIntervalFunc = setInterval(fightSwordsman,500);
            clearInterval(fightSwordsmanInterval2Func);
            btnList["切小号"].innerText  = '切小号';
        }
        //fightSwordsmanFunc();
    }
}


//一键侠客岛--------------------
function RiChangFunc(){
    if ($('.cmd_click_room')[0] === undefined || $('.cmd_click_room')[0].innerText !== "侠客岛渡口"){
        alert("你想干嘛？快送人家回“侠客岛渡口”！");
        return;
    }

    go('e;ne;ne;ne;e;e;e;event_1_9179222;e;event_1_11720543;w;n;e;e;s;e;event_1_44025101;');
    setTimeout(XiaKeFunc,1000);
}

// 判断出路
function XiaKeFunc(){
    if ($('button.cmd_click3')[0].innerText == "游出去"){		// 重新跳
        setTimeout(XuanYaFunc,1000);
    }
    else if ($('span.outtitle')[0].innerText == "石门")	// 进门领悟
    {

        console.log("参悟石壁。");
        go('event_1_36230918;e;e;s;event_1_77496481;home;');
    }
    else{
        setTimeout(XiaKeFunc,1500);		// 2秒后重新检查出路
    }
}

// 重新跳崖
function XuanYaFunc(){
    //console.log("姿势不对，大侠的屁股摔成了八瓣。。。");
    go('event_1_4788477;nw;w;sw;w;n;n;n;w;w;s;w;nw;ne;ne;ne;e;e;e;e;e;s;e;event_1_44025101');

    setTimeout(XiaKeFunc,1500);
    // 2秒后检查出路
}

// 帮派任务 ------------------------------------------------------------------------------------------------------
function BangPaiFunc(){
    clickButton('clan');//进入帮派
    //    clickButton('clan scene');//进入帮派议事堂
    //    clickButton('clan submit_task');//帮派提交任务
    //    clickButton('clan task');//帮派任务
    //    clickButton('find_clan_quest_road');//帮派任务引路
}

// 师门任务 ------------------------------------------------------------------------------------------------------
function ShiMenFunc(){
    clickButton('home');     //回主页
    clickButton('look_room');//师门
    //	  clickButton('give qingcheng_renying');//师门提交任务
    //    clickButton('family_quest');//师门任务
    //    clickButton('find_family_quest_road');//师门任务引路
}

//比试奇侠--------------------------------
function BiShiFunc(){
    if(btnList["比试奇侠"].innerText  == '比试奇侠'){
        var Swordsman_targetName = prompt("请输入奇侠名称","只需要修改游侠名称，小号自动比试");
        fightSwordsmanFunc();
        btnList["比试奇侠"].innerText  = '停止比试';}
    else{clearKill();
         {btnList["比试奇侠"].innerText  = '比试奇侠';}
        }

    function fightSwordsmanFunc(){
        // 间隔500毫秒查找比试一次
        fightSwordsmanIntervalFunc = setInterval(fightSwordsman,500);
    }

    /**
 * [clearKill 停止比试奇侠]
 * @return {[type]} [无]
 */
    function clearKill(){
        clearInterval(fightSwordsmanIntervalFunc);
    }

    /**
 * [fightSwordsman 比试指定奇侠]
 * @return {[type]} [无]
 */
    function fightSwordsman(){
        // 寻找指定名称的奇侠并开始比试
        $("button.cmd_click3").each(
            function(){
                if(isContains($(this).html() , Swordsman_targetName))
                    eval($(this).attr("onclick").replace("look_npc","fight"));
            });

        // 战斗结束自动退出战斗界面
        if($('span.outbig_text:contains(战斗结束)').length>0){
            clickButton('prev_combat');
        }
    }
}

// 怼蛇 ----------------------------
var SnakeName = 'luoyang_luoyang20';

function SnakeFunc(){
    if (! (counthead=prompt("请输入剩余数量","20"))){
        return;
    }
    go('jh 2;n;n;n;n;n;n;n;n;n;e;');        // 进入章节
    go('kill ' + SnakeName);
    setTimeout(killsnake,500);
}


function killsnake(){
    if($('span:contains(胜利)').text().slice(-3) == '胜利！'){
        clickButton('prev_combat');
        if(counthead > 1){
            counthead = counthead - 1;
            console.log('杀人一次，剩余杀人次数：%d！',counthead);
            go('kill ' + SnakeName);
        }
        else{
            console.log('刷完了！');
            go('home');
            return;	 // 终止
        }
    }
    else{
        if(is_fighting)
            ninesword();
        else
            go('kill ' + SnakeName);
    }
    setTimeout(killsnake,500);
}

// 试剑----------------------------

function ShiJianFunc(){
    if(btnList["试剑"].innerText  == '试剑'){
        clickButton('swords');
        clickButton('swords select_member mingjiao_zhang');   //明教张无忌
        clickButton('swords select_member xiaoyao_tonglao');  //逍遥天山姥姥
        clickButton('swords select_member gumu_yangguo');   //古墓 神雕大侠
        clickButton('swords fight_test go');
        AutoShiJianFunc();
        btnList["试剑"].innerText  = '停止试剑';
    }
    else{clearShiJian();
         btnList["试剑"].innerText  = '试剑';
        }
}
function AutoShiJianFunc(){
    // 间隔1000毫秒查找打一次
    AutoShiJianFuncIntervalFunc = setInterval(AutoShijian1,1000);
}
function clearShiJian(){
    clearInterval(AutoShiJianFuncIntervalFunc);
}
function AutoShijian1(){
    if($('span.outbig_text:contains(战斗结束)').length>0){
        clickButton('swords fight_test go');
    }
    else if( isContains($('span:contains(你今天)').text().slice(-12), '你今天试剑次数已达限额。')){
        btnList["试剑"].innerText  = '试剑';
        clearShiJian();
        clickButton('home');
        console.log('打完收工！');
    }
    else{
        ninesword();
    }
}

// 打排行榜----------------------------
function PaiHangFunc(){
    if(btnList["打排行榜"].innerText  == '打排行榜'){
        clickButton('sort');
        clickButton('fight_hero 1');
        AutoPaiHangFunc();
        btnList["打排行榜"].innerText  = '停止打榜';
    }
    else{clearPaiHang();
         btnList["打排行榜"].innerText  = '打排行榜';
        }
}
function AutoPaiHangFunc(){
    // 间隔1000毫秒查找打一次
    AutoPaiHangFuncIntervalFunc = setInterval(AutoPaiHang,1000);
}
function clearPaiHang(){
    clearInterval(AutoPaiHangFuncIntervalFunc);
}
function AutoPaiHang(){
    if($('span.outbig_text:contains(战斗结束)').length>0){
        clickButton('prev_combat');
        clickButton('fight_hero 1');
    }
    else if( isContains($('span:contains(今日挑战)').text().slice(-19), '今日挑战高手的次数已达上限，明日再来。')){
        clearPaiHang();
        btnList["打排行榜"].innerText  = '打排行榜';
        clickButton('home');
        console.log('打完收工！');
    }
    else{
        ninesword();
    }
}

// 杀坏人----------------------------
var HongMingNPCList =["[16-20区]恶棍", "[16-20区]流寇", "[16-20区]剧盗","[16-20区]云老四", "[16-20区]岳老三", "[16-20区]二娘","[16-20区]段老大", "[16-20区]墟归一","[16-20区]上官晓芙","[16-20区]洪昭天","恶棍", "流寇", "云老四", "岳老三", "二娘","段老大","剧盗"];
var killHongMingIntervalFunc =  null;
var currentNPCIndex = 0;

function killHongMingTargetFunc(){
    zdskill =  null;
    killtimes = 0;
    if (btnList["杀坏人"].innerText == '杀坏人'){
        currentNPCIndex = 0;
        console.log("开始杀红名目标NPC！");
        skillLists = mySkillLists;
        btnList["杀坏人"].innerText ='停坏人';
        killHongMingIntervalFunc = setInterval(killHongMing, 500);

    }else{
        console.log("停止杀红名目标NPC！");
        btnList["杀坏人"].innerText ='杀坏人';
        clearInterval(killHongMingIntervalFunc);
    }
}

function killHongMing(){
    killtimes++;
    if (killtimes > 500) {
        killHongMingTargetFunc();
        return;
    }
    if ($('span').text().slice(-7) == "不能杀这个人。"){
        currentNPCIndex = currentNPCIndex + 1;
        console.log("不能杀这个人！");
    }
    getHongMingTargetCode();
    ninesword();
    if($('span:contains(胜利)').text().slice(-3)=='胜利！' || $('span:contains(战败了)').text().slice(-6)=='战败了...'){
        currentNPCIndex = 0;
        console.log('杀人一次！');
        clickButton('prev_combat');
    }
}
function getHongMingTargetCode(){
    var peopleList = $(".cmd_click3");
    var thisonclick = null;
    var targetNPCListHere = [];
    var countor= 0;
    var npcList = HongMingNPCList;
    if (kfKind == "跨服逃犯")
        npcList = ["[16-20区]段老大"];
    for(var i=0; i < peopleList.length; i++) { // 从第一个开始循环
        // 打印 NPC 名字，button 名，相应的NPC名
        thisonclick = peopleList[i].getAttribute('onclick');
        if (npcList.contains(peopleList[i].innerText)){
            var targetCode = thisonclick.split("'")[1].split(" ")[1];
            //           console.log("发现NPC名字：" +  peopleList[i].innerText + "，代号：" + targetCode);
            targetNPCListHere[countor] = peopleList[i];
            countor = countor +1;
        }
    }
    // targetNPCListHere 是当前场景所有满足要求的NPC button数组
    if (currentNPCIndex >= targetNPCListHere.length){
        currentNPCIndex = 0;
    }
    if (targetNPCListHere.length > 0){
        thisonclick = targetNPCListHere[currentNPCIndex].getAttribute('onclick');
        var targetCode = thisonclick.split("'")[1].split(" ")[1];
        console.log("准备杀目标NPC名字：" + targetNPCListHere[currentNPCIndex].innerText + "，代码：" + targetCode +"，目标列表中序号：" + (currentNPCIndex ));
        clickButton('kill ' + targetCode); // 点击杀人
        setTimeout(detectKillHongMingInfo,200); // 200 ms后获取杀人情况，是满了还是进入了
    }
}
function detectKillHongMingInfo(){
    var HongMingInfo = $('span').text();
    if (HongMingInfo.slice(-15) == "已经太多人了，不要以多欺少啊。"){
        currentNPCIndex = currentNPCIndex + 1;
    }else{
        currentNPCIndex = 0;
    }
}
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};


// 杀好人----------------------------
var HuangMingNPCList = ["[16-20区]王铁匠", "[16-20区]杨掌柜", "[16-20区]柳绘心", "[16-20区]柳小花", "[16-20区]卖花姑娘","[16-20区]刘守财","[16-20区]朱老伯","[16-20区]方老板", "[16-20区]客商","[16-20区]方寡妇","[16-20区]花落云", "[16-20区]辰川","[16-20区]王世仲","王铁匠", "杨掌柜", "柳绘心", "柳小花", "朱老伯","方老板", "客商","方寡妇","卖花姑娘","刘守财"];
var killHuangMingIntervalFunc =  null;
var currentNPCIndex = 0;

function killHuangMingTargetFunc(){
    zdskill =  null;
    killtimes = 0;
    if (btnList["杀好人"].innerText == '杀好人'){
        currentNPCIndex = 0;
        console.log("开始杀好人目标NPC！");
        skillLists = mySkillLists;
        btnList["杀好人"].innerText ='停好人';
        killHuangMingIntervalFunc = setInterval(killHuangMing, 500);

    }else{
        console.log("停止杀好人目标NPC！");
        btnList["杀好人"].innerText ='杀好人';
        clearInterval(killHuangMingIntervalFunc);
    }
}

function killHuangMing(){
    killtimes++;
    if (killtimes > 500) {
        killHuangMingTargetFunc();
        return;
    }
    if ($('span').text().slice(-7) == "不能杀这个人。"){
        currentNPCIndex = currentNPCIndex + 1;
        console.log("不能杀这个人！");
    }
    getHuangMingTargetCode();
    ninesword();
    if($('span:contains(胜利)').text().slice(-3)=='胜利！' || $('span:contains(战败了)').text().slice(-6)=='战败了...'){
        currentNPCIndex = 0;
        console.log('杀人一次！');
        clickButton('prev_combat');
    }
}
function getHuangMingTargetCode(){
    var peopleList = $(".cmd_click3");
    var thisonclick = null;
    var targetNPCListHere = [];
    var countor= 0;
    var npcList = HuangMingNPCList;
    if (kfKind == "跨服逃犯")
        npcList = ["[16-20区]无一"];
    for(var i=0; i < peopleList.length; i++) { // 从第一个开始循环
        // 打印 NPC 名字，button 名，相应的NPC名
        thisonclick = peopleList[i].getAttribute('onclick');
        if (npcList.contains(peopleList[i].innerText)){
            var targetCode = thisonclick.split("'")[1].split(" ")[1];
            //           console.log("发现NPC名字：" +  peopleList[i].innerText + "，代号：" + targetCode);
            targetNPCListHere[countor] = peopleList[i];
            countor = countor +1;
        }
    }
    // targetNPCListHere 是当前场景所有满足要求的NPC button数组
    if (currentNPCIndex >= targetNPCListHere.length){
        currentNPCIndex = 0;
    }
    if (targetNPCListHere.length > 0){
        thisonclick = targetNPCListHere[currentNPCIndex].getAttribute('onclick');
        var targetCode = thisonclick.split("'")[1].split(" ")[1];
        console.log("准备杀目标NPC名字：" + targetNPCListHere[currentNPCIndex].innerText + "，代码：" + targetCode +"，目标列表中序号：" + (currentNPCIndex ));
        clickButton('kill ' + targetCode); // 点击杀人
        setTimeout(detectKillHuangMingInfo,200); // 200 ms后获取杀人情况，是满了还是进入了
    }
}
function detectKillHuangMingInfo(){
    var HuangMingInfo = $('span').text();
    if (HuangMingInfo.slice(-15) == "已经太多人了，不要以多欺少啊。"){
        currentNPCIndex = currentNPCIndex + 1;
    }else{
        currentNPCIndex = 0;
    }
}
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

// 杀天剑----------------------------
var TianJianNPCList = [ "天剑", "天剑真身","虹风", "虹雨","虹雷", "虹电","天剑谷卫士","镇潭神兽", "守潭神兽", "螣蛇幼崽","守谷神兽","镇谷神兽","饕餮兽魂","镇山神兽","守山神兽","应龙幼崽","镇殿神兽","守殿神兽","幽荧幼崽"];//"饕餮幼崽",
var killTianJianIntervalFunc =  null;
var currentNPCIndex = 0;
function killTianJianTargetFunc(){
    zdskill =  mySkillLists;
    if (btnList["杀天剑"].innerText == '杀天剑'){
        currentNPCIndex = 0;
        console.log("开始杀天剑目标NPC！");
        skillLists = mySkillLists;
        btnList["杀天剑"].innerText ='停天剑';
        killTianJianIntervalFunc = setInterval(killTianJian, 500);

    }else{
        console.log("停止杀天剑目标NPC！");
        btnList["杀天剑"].innerText ='杀天剑';
        clearInterval(killTianJianIntervalFunc);
    }
}

function killTianJian(){
    if ($('span').text().slice(-7) == "不能杀这个人。"){
        currentNPCIndex = currentNPCIndex + 1;
        console.log("不能杀这个人！");
        //        return;
    }
    getTianJianTargetCode();
    //setTimeout(ninesword, 1000);
    ninesword();
    if($('span:contains(胜利)').text().slice(-3)=='胜利！' || $('span:contains(战败了)').text().slice(-6)=='战败了...'){
        currentNPCIndex = 0;
        console.log('杀人一次！');
        clickButton('prev_combat');
    }
}
function getTianJianTargetCode(){
    var peopleList = $(".cmd_click3");
    var thisonclick = null;
    var targetNPCListHere = [];
    var countor= 0;
    for(var i=0; i < peopleList.length; i++) { // 从第一个开始循环
        // 打印 NPC 名字，button 名，相应的NPC名
        thisonclick = peopleList[i].getAttribute('onclick');
        if (TianJianNPCList.contains(peopleList[i].innerText)){
            var targetCode = thisonclick.split("'")[1].split(" ")[1];
            //           console.log("发现NPC名字：" +  peopleList[i].innerText + "，代号：" + targetCode);
            targetNPCListHere[countor] = peopleList[i];
            countor = countor +1;
        }
    }
    // targetNPCListHere 是当前场景所有满足要求的NPC button数组
    if (currentNPCIndex >= targetNPCListHere.length){
        currentNPCIndex = 0;
    }
    if (targetNPCListHere.length > 0){
        thisonclick = targetNPCListHere[currentNPCIndex].getAttribute('onclick');
        var targetCode = thisonclick.split("'")[1].split(" ")[1];
        console.log("准备杀目标NPC名字：" + targetNPCListHere[currentNPCIndex].innerText + "，代码：" + targetCode +"，目标列表中序号：" + (currentNPCIndex ));
        clickButton('kill ' + targetCode); // 点击杀人
        setTimeout(detectKillTianJianInfo,200); // 200 ms后获取杀人情况，是满了还是进入了
    }
}
function detectKillTianJianInfo(){
    var TianJianInfo = $('span').text();
    if (TianJianInfo.slice(-15) == "已经太多人了，不要以多欺少啊。"){
        currentNPCIndex = currentNPCIndex + 1;
    }else{
        currentNPCIndex = 0;
    }
}
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

// 买东西 --------------------------------

function buyOneBeeFunc(){
    var object  = "";
    var num  = 0;
    if(!(object  = prompt("请输入要购买的物品：","鱼竿，鱼饵") )){ // 支持 鱼竿，鱼饵
        return;
    }
    if(!( num  = prompt("请输入购买数量：","1"))){ // 支持 鱼竿，鱼饵
        return;
    }
    num  = parseInt(num); // 支持 鱼竿，鱼饵
    //鱼竿
    if (object == "鱼竿"){
        for(var i=0; i < num; i++) { // 从第一个开始循环
            go('shop money_buy shop5'); // 鱼竿
        }
    }else if (object == "鱼饵"){
        for(var i=0; i < num; i++) { // 从第一个开始循环
            go('shop money_buy shop6'); // 鱼饵
        }
    }else{
        alert("抱歉，此脚本还不能用于购买此物品！");
    }
}



//自动战斗--------------------------
function AutoKillFunc(){
    if(btnList["自动战斗"].innerText  == '自动战斗'){
        AutoKill1Func();
        btnList["自动战斗"].innerText  = '手动战斗';}
    else{clearKill2();
         {btnList["自动战斗"].innerText  = '自动战斗';}
        }

    function AutoKill1Func(){
        // 间隔500毫秒查找比试一次
        AutoKill1FuncIntervalFunc = setInterval(AutoKill1,500);
    }

    function clearKill2(){
        clearInterval(AutoKill1FuncIntervalFunc);
    }

    function AutoKill1(){
        ninesword();
        if($('span.outbig_text:contains(战斗结束)').length>0){
            clickButton('prev_combat');
        }
    }
}


//无脑摸尸体--------------------------------
//AutoGetFunc();
function AutoGetFunc(){
    if(btnList["摸尸体"].innerText  == '摸尸体'){
        var AutoGet_targetName = "尸体";
        AutoGet1Func();
        btnList["摸尸体"].innerText  = '不摸了';}
    else{clearGet();
         {btnList["摸尸体"].innerText  = '摸尸体';}
        }

    function AutoGet1Func(){
        AutoGet1IntervalFunc = setInterval(AutoGet1,1000);
    }

    function clearGet(){
        clearInterval(AutoGet1IntervalFunc);
    }

    function AutoGet1(){
        $("button.cmd_click3").each(
            function(){
                if(isContains($(this).html() , AutoGet_targetName))
                    eval($(this).attr("onclick").replace("look_item corpse","get corpse"));
            });
    }
}

//战斗调用通用脚本----------------------------------------------------
var banSkills = "天师灭神剑|茅山道术";
function ninesword(){
    zdskill = mySkillLists;
    //console.log(zdskill);
    setTimeout(ninesword1,1000);
    if($('span.outbig_text:contains(战斗结束)').length>0){
        clickButton('prev_combat');
        /*
        if ( igoodsteps == 1 ){
          $("button.cmd_click3").each(
                          function(){
                              if(isContains($(this).html() , '尸体'))
                                  eval($(this).attr("onclick").replace("look_item corpse","get corpse"));
                          });
                      igoodsteps =  2;  }
                      */


    }
}

/*
var elem = $('td:contains('+myname+')');
        if (elem != null) {
            var val = elem.find('span.vader11').attr('style');
            if (val == null)
                val = elem.find('span.vader12').attr('style');
            if (val == null)
                val = elem.find('span.vader13').attr('style');
            if (val == null)
                val = elem.find('span.vader14').attr('style');
            if (val != null) {
                var m = val.match(/width: (\d+)\./);
                if (m == null)
                    m = val.match(/width: (\d+)%/);
                var p = parseInt(m[1]);

*/
function ninesword1(){
    zdskill = mySkillLists;
    if (myname != '我是谁' && myMaxKee != 0) {
        var elem = $('td:contains('+myname+')');
        if (elem != null) {
            elem = elem.find('span.outkee_text');
            if (elem != null) {
                var curKee = parseInt(elem.text());
                var p = curKee * 100 / myMaxKee;
                if (p < 65) {
                    console.log("wound : " + p);
                    for(var i = 1;i < 5;i++) {
                        skillName = $('#skill_'+i).children().children().text();
                        if(skillName !== "" && isContains(forceList, skillName)) {
                            clickButton('playskill '+i);
                            return;
                        }
                    }
                }
            }
        }
    }

    // 如果找到设置的技能则释放
    for(var i = 1;i < 5;i++){
        skillName = $('#skill_'+i).children().children().text();
        if(skillName !== "" && isContains(zdskill, skillName) && !isContains(banSkills, skillName)){
            //console.log(i);
            clickButton('playskill '+i);
            return;
        }
    }
    // 如果没找到设置技能，随便用一个非招bb的技能
    for(i = 1;i < 5;i++){
        skillName = $('#skill_'+i).children().children().text();
        if(skillName !== "" && !isContains(banSkills, skillName)){
            //console.log(skillName);
            clickButton('playskill '+i);
            return;
        }
    }
}


//-------------------------分割线-----------

//逃跑-------------------------
function escapeFunc(){
    if(btnList["逃跑"].innerText  == '逃跑'){
        AutoEscapeFunc();
        btnList["逃跑"].innerText  = '取消逃跑';}
    else{clearEscape();
         {btnList["逃跑"].innerText  = '逃跑';}
        }

    function AutoEscapeFunc(){
        // 间隔500毫秒逃跑一次
        AutoEscapeFuncIntervalFunc = setInterval(AutoEscape,500);
    }

    function clearEscape(){
        clearInterval(AutoEscapeFuncIntervalFunc);
    }

    function AutoEscape(){
        go('escape');     //逃跑
        if($('span.outbig_text:contains(战斗结束)').length>0){
            clearEscape();
            btnList["逃跑"].innerText  = '逃跑';
            go('prev_combat');
        }
        else if($('button.cmd_combat_byebye').length===0){
            clearEscape();
            btnList["逃跑"].innerText  = '逃跑';
            go('prev_combat');
        }
    }
}
//-------------------------分割线-----------

//全地图搜索
function go_steps(dir) {
	$("button.cmd_click3").each(
		function(){
			if(isContains($(this).html() , QLNPCList[0] )){
				//读取目标ID
				youxia_id = $(this).attr("onclick").split("'")[1].split(" ")[1];
                console.log("发现游侠NPC名字：" +  QLNPCList[0] + "，代号：" + youxia_id);
			}
		}
	);
	var d = dir.split(";");
	if(d[steps]=='halt') {
		steps += 1;
		return;
	}
	if(steps < d.length && youxia_id == null){
		clickButton(d[steps]);
		steps += 1;
        setTimeout(function(){go_steps(dir);},200);
	}else{
        steps=0;
		if (youxia_id != null){
			//go( 'look_npc ' + youxia_id );
			youxia_id = null;
            killQLNPCTargetFunc();
		}
    }
}



//-------------------------分割线-----------
//正邪杀二娘,段老大 刷正气 positive


function positiveKill() {

     if (ipositiveKill==0){
        ipositiveKill=1;
        inegativeKill=0;
        btnList["刷正气"].innerText = '停刷正气';
   //     btnList["刷邪气"].innerText = '刷邪气';

    }else if (ipositiveKill==1){
        ipositiveKill=0;
        btnList["刷正气"].innerText = '刷正气';
    }

}


//刷邪气 negative 查血量

function negativeKill() {

    var peopleList = $(".cmd_click3");
    var thisonclick = null;
    var targetNPCListHere = [];
    var countor = 0;
    var elem;
    var curKee = 0;
    var maxKee = 0;
    var p = 1;
    var val;
    var m = null;
    console.log("刷邪气 " + String( peopleList.length )  );

    for(var i=0; i < peopleList.length; i++) { // 从第一个开始循环
        // 打印 NPC 名字，button 名，相应的NPC名
        thisonclick = peopleList[i].getAttribute('onclick');


        var targetCode = thisonclick.split("'")[1].split(" ")[1];

     //    console.log("发现NPC名字：" +  peopleList[i].innerText + "，代号：" + targetCode  + (targetCode.indexOf("bad")));
        if ( targetCode.indexOf("bad") != -1  ){


            clickButton('watch_vs ' + targetCode);

         //   console.log("目标NPC: " +peopleList[i].innerText + "进入观战");
           if(isContains($('#out2').html(),'vs21')){

                  console.log("目标NPC: " + peopleList[i].innerText + "血量1:"  + $('#vs_hp21').children().children().text() );
                   curKee = $('#vs_hp21').children().children().text();
                  console.log("目标NPC: " + peopleList[i].innerText + "血量1:"  + curKee  );
                    if( curKee >  690000 ){
                 //       console.log("目标NPC: " + peopleList[i].innerText + "血量1:"  + curKee  );

                    //     go('escape');
                        return;
                    }

            }else
            {

            }
            clickButton('escape');
            /*
            elem = null;
            elem = $('td:contains('+peopleList[i].innerText+')');
            if (elem != null) {

              val = elem.find('span.vader21').attr('style');

              if (val == null)
                val = elem.find('span.vader22').attr('style');
              if (val == null)
                val = elem.find('span.vader23').attr('style');
              if (val == null)
                val = elem.find('span.vader24').attr('style');
              if (val != null) {
                m = val.match(/width: (\d+)\./);
           //     console.log("NPC：" +  peopleList[i].innerText + "，血量1：" + m[1]);
                p = parseInt(m[1]);
              }else
              {
                  p = 100;
             //     console.log("NPC：" +  peopleList[i].innerText + "，血量1：100");
              }

              elem = elem.find('span.outkee_text');
              if (elem != null) {
                curKee = parseInt(elem.text());
                  */

                maxKee=  curKee  ;
         //   console.log("NPC：" +  peopleList[i].innerText + "，血量1：" + elem.text() );


                if ( maxKee > 690000 ) {
                    //可以刷邪气

                    targetNPCListHere[countor] = peopleList[i];
                    countor = countor +1;

                }


              }
            }





    // targetNPCListHere 是当前场景所有满足要求的NPC button数组
    if (currentNPCIndex >= targetNPCListHere.length){
        currentNPCIndex = 0;
    }
    if (targetNPCListHere.length > 0){
        thisonclick = targetNPCListHere[currentNPCIndex].getAttribute('onclick');
        var targetCode = thisonclick.split("'")[1].split(" ")[1];
        console.log("准备杀目标NPC名字：" + targetNPCListHere[currentNPCIndex].innerText + "，代码：" + targetCode +"，目标列表中序号：" + (currentNPCIndex ));
        clickButton('kill ' + targetCode); // 点击杀人
        setTimeout(detectkillQLNPCInfo,200); // 200 ms后获取杀人情况，是满了还是进入了
    }


}


///-------------------------分割线-----------
//接谜题

//clickButton('room_sousuo') 搜索此地
itargetNPCOrder = 0 ;
iNPCOrder = 0 ;
function PuzzleFunc(){



  var peopleList = $(".cmd_click3");
    var thisonclick = null;
    var targetNPCListHere = [];
    var countor= 0;

    for(var i=0; i < peopleList.length; i++) { // 从第一个开始循环
        // 打印 NPC 名字，button 名，相应的NPC名

        thisonclick = peopleList[i].getAttribute('onclick');

		var targetCode = thisonclick.split("'")[1].split(" ")[1];

        if (typeof(targetCode) != "undefined" && targetCode.indexOf("bad") == -1 ) {


             console.log("发现NPC名字：" +  peopleList[i].innerText + "，代号：" + targetCode);
             targetNPCListHere[iNPCOrder] = peopleList[i];
             iNPCOrder = iNPCOrder +1;

             if (iNPCOrder < itargetNPCOrder ) return ;

             itargetNPCOrder = iNPCOrder;
             go('ask '+ targetCode);

        //   clickButton('task_quest');

             if ( isContains($('span:contains(find_task_road)').text().slice(-14), 'find_task_road')){

                 return;
             }

             if ( isContains($('span:contains(今日已达到谜题数量)').text().slice(-12), '今日已达到谜题数量限制。')){
                 alert('当前用户15个谜题已经完成，请更换新用户进行谜题任务/n 任务序号:' + (itargetNPCOrder));
                 return ;
             }
             if ( isContains($('span:contains(盯着你看了一会儿。)').text(), '盯着你看了一会儿。')){

             }
             if ( isContains($('span:contains(睁大眼睛望着你，似乎想问你天气怎么样。)').text(), '睁大眼睛望着你，似乎想问你天气怎么样。')){
                 alert('没有谜题' );
                 //    return

             }
         }

    }



}

///-------------------------分割线-----------
//谜题处理

//var PuzzleActIntervalFunc =  null;

// ask fight kill give  get  npc_datan

var igoodsteps=0;

var PuzzleActIntervalFunc = null;

function PuzzleActFunc( lstrmsg , lsrslink , lsrsid, lsrsname ){
   clearInterval(PuzzleActIntervalFunc);
    //打探打探情况
    //可前去寻找
    var lsacttype;


//    var lslog="";
 //   console.log("处理谜题：" +  lstrmsg);

//    console.log("link：" +  lsrslink);
//    console.log("ID：" +  lsrsid);
 //   console.log("Name1：" +  lsrsname[1]);
    /*
    for (k=0; k < lsrslink.length ; k++){
        lslog= lslog +lsrslink[k]+ "--"
    }
    console.log("link：" +  lslog);
     lslog="";
    for (k=0; k < lsrsid.length ; k++){
        lslog= lslog +lsrsid[k]+ "--"
    }
    console.log("ID：" +  lslog);
     lslog="";
     for (k=0; k < lsrsname.length ; k++){
        lslog= lslog +lsrsname[k]+ "--"
    }
    console.log("Name：" +  lslog);

*/
        if (Puzzletrigger !=1 ){
            return;
        }


     var peopleList = $(".cmd_click3");
    var thisonclick = null;
    var targetNPCListHere = [];
    var countor= 0;
    var lsrteval= null ;
    var lsnpcname ="";
    if  (lstrmsg.indexOf("可前去寻找") > -1 ){

           lsrteval = "clickButton('room_sousuo')";


         }

    if  ( ( lstrmsg.indexOf("好想要") > -1  || lstrmsg.indexOf("可否帮忙找来") > -1) && igoodsteps == 2 ){
        go( lsrslink[0]);
        igoodsteps = igoodsteps + 1;

    }



    for(var i=0; i < peopleList.length; i++) { // 从第一个开始循环
        // 打印 NPC 名字，button 名，相应的NPC名

        thisonclick = peopleList[i].getAttribute('onclick');
        if (thisonclick != null && thisonclick.split("'")[1].split(" ")[0] == 'look_item'  ) {

            if (lsrsname[1] == peopleList[i].innerText ){ //要寻找地上的物品

                lsrteval = "clickButton('get " +  thisonclick.split("'")[1].split(" ")[1]  + "')";

                }

        }

         if (thisonclick != null && thisonclick.split("'")[1].split(" ")[0] == 'look_npc'  ) {

             var targetCode = thisonclick.split("'")[1].split(" ")[1];

       //     console.log("发现NPC名字：" +  peopleList[i].innerText + "，代号：" + targetCode +lsrsname[1]+'>>' + lsrsname[1].indexOf(peopleList[i].innerText) );


             if (typeof(targetCode) != "undefined" && targetCode.indexOf("bad") == -1 &&  targetCode.indexOf("eren") == -1   && targetCode.indexOf("taofan") == -1 &&  targetCode.indexOf("bukuai") == -1 ){

                 //     console.log("发现NPC名字：" +  peopleList[i].innerText + "，代号：" + targetCode);
                 if (lstrmsg.indexOf("打探打探") > -1 && lsrsname[1]==peopleList[i].innerText ){
                     lsrteval = "clickButton('npc_datan " +  targetCode  + "')";
                 }else if  (lstrmsg.indexOf("可前去打探一番") > -1 && lsrsname[1]==peopleList[i].innerText ){
        //             console.log("打探：" +  peopleList[i].innerText + "，代号：" + targetCode);

                     lsrteval = "clickButton('npc_datan " +  targetCode  + "')";


                 }else if  (lstrmsg.indexOf("可前去寻找") > -1 ){

                     lsrteval = "clickButton('room_sousuo')";


                 }else if (lstrmsg.indexOf("去替我要回来吧") > -1 && (lsrsname[1]==peopleList[i].innerText || lsrsname[2]==peopleList[i].innerText )){

                     lsrteval = "clickButton('fight " +  targetCode  + "')";


                 }else if  (lstrmsg.indexOf("去替我要回来可好") > -1 && lsrsname[1]==peopleList[i].innerText ){

                     if (peopleList[i].innerText == '大松鼠' || peopleList[i].innerText == '流氓' ||  peopleList[i].innerText == '小混混'   ) {
                         lsrteval = "clickButton('kill " +  targetCode  + "')";
                     }else{
                         lsrteval = "clickButton('fight " +  targetCode  + "')";
                     }

                 }else if  (lstrmsg.indexOf("替我去教训教训") > -1 && lsrsname[1]==peopleList[i].innerText ){

                     lsrteval = "clickButton('fight " +  targetCode  + "')";

                 }else if  (lstrmsg.indexOf("尝尝厉害") > -1 && lsrsname[1]==peopleList[i].innerText ){

                     lsrteval = "clickButton('fight " +  targetCode  + "')";

                 }else if  (lstrmsg.indexOf("见识见识厉害") > -1 && lsrsname[1]==peopleList[i].innerText ){

                     lsrteval = "clickButton('fight " +  targetCode  + "')";

                 }else if  (lstrmsg.indexOf("交差了") > -1 &&  lsrsname[0]==peopleList[i].innerText ){

                     lsrteval = "clickButton('ask " +  targetCode  + "')";


                 }else if  (lstrmsg.indexOf("回去告诉") > -1 && lsrsname[0]==peopleList[i].innerText ){

                     lsrteval = "clickButton('ask " +  targetCode  + "')";


                 }else if  (lstrmsg.indexOf("商量一点事情") > -1 && lsrsname[1]==peopleList[i].innerText ){

                     lsrteval = "clickButton('ask " +  targetCode  + "')";


                 }else if  (lstrmsg.indexOf("回去转告") > -1 && lsrsname[0]==peopleList[i].innerText  ){

                     lsrteval = "clickButton('ask " +  targetCode  + "')";


                 }else if  (lstrmsg.indexOf("我有个事情想找") > -1 && lsrsname[1]==peopleList[i].innerText ){

                     lsrteval = "clickButton('ask " +  targetCode  + "')";


                 }else if  (lstrmsg.indexOf("可否帮忙找来") > -1 ){//蓝玫瑰  ,或者杀了拿东西 ，然后 返回lsrslink  GIVE

                     /* console.log("步骤:" + (igoodsteps));
                     if (igoodsteps == 0){
                         lsrteval = "clickButton('kill " +  targetCode  + "')";
                         igoodsteps = 1;


                     }else if (igoodsteps == 1){ //捡东西






                     } else if (igoodsteps == 2){ //返回
                  //       go( lsrslink);
                  //       igoodsteps = igoodsteps + 1;
                     }
                     else if (igoodsteps == 3){ //返回
                         lsrteval = "clickButton('give " +  targetCode  + "')";
                         igoodsteps =0;
                         clearInterval(PuzzleActIntervalFunc);
                     }




*/
                 }else if  (lstrmsg.indexOf("好想要") > -1 ){//蓝玫瑰  ,或者杀了拿东西 ，然后 返回lsrslink  GIVE

                     /*console.log("步骤:" + (igoodsteps));
                     if (igoodsteps == 0){
                         lsrteval = "clickButton('kill " +  targetCode  + "')";
                         igoodsteps = 1;


                     }else if (igoodsteps == 1){ //捡东西






                     } else if (igoodsteps == 2){ //返回
                    //     go( lsrslink);
                     //    igoodsteps = igoodsteps + 1;
                     }
                     else if (igoodsteps == 3){ //返回
                         lsrteval = "clickButton('give " +  targetCode  + "')";
                         igoodsteps =0;
                         clearInterval(PuzzleActIntervalFunc);
                     }

*/

                 }else if  (lstrmsg.indexOf("去杀了他") > -1 && lsrsname[1]==peopleList[i].innerText &&  lsrsname[1]!="龙儿"    ){

                     lsrteval = "clickButton('kill " +  targetCode  + "')";


                 }else if  (lstrmsg.indexOf("真想杀掉他") > -1 && lsrsname[1]==peopleList[i].innerText &&  lsrsname[1]!="龙儿" ){

                     lsrteval = "clickButton('kill " +  targetCode  + "')";


                 }


                 if (lsrteval) {
                  //   console.log(lsrteval);
                     eval(lsrteval);
                     if (lsrteval.indexOf("kill") > -1){

                         ninesword();
                     }
                     return;
                 }

                 //    eval(lsrteval);




                 //       go('ask '+ targetCode);
             }


         }

    }
     if (lsrteval) {
    //     console.log(lsrteval);
         eval(lsrteval);
     }

     PuzzleActIntervalFunc = setInterval(function(){ PuzzleActFunc(lastcmd ,lastpuzzlelink ,lastpuzzleid  , lastpuzzlename);}, 1000);




}


///-------------------------分割线-----------
//测试地图
var gstrNpcPath;
var gmapNPCList = [];  //NPC 列表
var gmapNPCPath = [];  //NPC 地图路径
var tempNPCList = [];  //零时数组 ，走地图时重复记录NPC ID的问题
var gmapNPCCount=0;  //记录 NPC数量
var iPuzzleOrders = -1 ;//迷题NPC进度
var gstrMapPath="";


function GetNPCStart(){

  //  go('home');
     clickButton('home');     //回主页
 //   WhoAmIFunc();

    if(btnList["自动战斗"].innerText  == '自动战斗'){
        AutoKillFunc();
    }


  var w = null ;
    //雪亭镇  洛阳 华山村 华山 扬州 丐帮 乔阴县 峨眉山 恒山 武当山 晚月庄 水烟阁 少林寺 唐门 青城山 逍遥林 开封 光明顶 全真教 古墓 白驮山
     if (! (w=prompt("请输入迷题地图名次","雪亭镇"))){
        return;
    }
    GetNPCStartMap(w);




}


///-------------------------分割线-----------
//产生地图NPC路径

function GetNPCPath(dir){
    var peopleList = $(".cmd_click3");
    var thisonclick = null;

    for(var i=0; i < peopleList.length; i++) { // 从第一个开始循环
        // 打印 NPC 名字，button 名，相应的NPC名

        thisonclick = peopleList[i].getAttribute('onclick');
        if (thisonclick != null && thisonclick.split("'")[1].split(" ")[0] == 'look_npc'  ) {

            var targetCode = thisonclick.split("'")[1].split(" ")[1];
          //  console.log("发现NPC名字：" +  peopleList[i].innerText + "，代号：" + targetCode + "，动作：" + thisonclick.split("'")[1].split(" ")[0]);

            if (isContains(qxNpcList , peopleList[i].innerText )) {

            }else{

                if (typeof(targetCode) != "undefined" && targetCode.indexOf("bad") == -1 &&  targetCode.indexOf("eren") == -1   && targetCode.indexOf("taofan") == -1 &&  targetCode.indexOf("bukuai") == -1 )
                {
                    if(tempNPCList.contains(targetCode)){

                    }else{
                        console.log("发现NPC名字：" + (gmapNPCCount +1) + ":" + peopleList[i].innerText + "，代号：" + targetCode);
                        tempNPCList[gmapNPCCount]=  targetCode ;
                        if (gstrNpcPath == ''){
                            gmapNPCList[gmapNPCCount] = peopleList[i].innerText + ';' + targetCode ;
                            gmapNPCPath[gmapNPCCount] = '';

                        }else
                        {
                            gmapNPCList[gmapNPCCount]= peopleList[i].innerText + ';' + targetCode  ;
                            gmapNPCPath[gmapNPCCount]= gstrNpcPath ;

                        }
                         gmapNPCCount = gmapNPCCount +1;
                    }
                }
            }
        }
    }

	var d = dir.split(";");
	if(d[steps]=='halt') {

        gstrNpcPath = gstrNpcPath + ';' + d[steps];
        steps += 1;
		return;
	}
	if(steps < d.length ){

		clickButton(d[steps]);

		 if (gstrNpcPath == ''){
             gstrNpcPath = d[steps];
         }else{
             gstrNpcPath = gstrNpcPath + ';' + d[steps];
         }
        steps += 1;
        setTimeout(function(){GetNPCPath(dir);},300);
	}else{
        steps= 0 ;
        gstrNpcPath = 0 ;
     //   gmapNPCList.sort();
        var npcpathlog='NPC 数量：' + (gmapNPCList.length) + '\n' ;
        for ( i=0 ; i <  gmapNPCList.length ; i++){
            npcpathlog = npcpathlog + gmapNPCList[i] + "路径--" + gmapNPCPath[i] + '\n';
        }
        // console.log(npcpathlog);
      //  PuzzleNextFunc();
        NpcBatchAskStartFunc();

    }


}


///-------------------------分割线-----------
//接谜题单个或者多个

function PuzzleNextFunc(){

    if ( iBatchAskModel == 1){ //批量接谜题模式

        if (iPuzzleOrders == -1 ){ // 每个地图第一个NPC
            iPuzzleOrders = iPuzzleOrders + 1;
            if (  iPuzzleOrders  <  gmapNPCList.length )
            {
                btnList["进度"].innerText = '[' +( iPuzzleOrders + 1 )  +   ' -> ' + gmapNPCList.length + ']' + gmapNPCList[iPuzzleOrders].split(";")[0] ;
                go ( gmapNPCPath[iPuzzleOrders] );
                go ("ask "+gmapNPCList[iPuzzleOrders].split(";")[1]);

            }


        }else{

            iPuzzleOrders = iPuzzleOrders + 1;


            if (  iPuzzleOrders  <  gmapNPCList.length ){
                 btnList["进度"].innerText = '[' +( iPuzzleOrders + 1 )  +   ' -> ' + gmapNPCList.length + ']' + gmapNPCList[iPuzzleOrders].split(";")[0] ;

                if (gmapNPCPath[iPuzzleOrders] == gmapNPCPath[iPuzzleOrders - 1]){


                    go ("ask "+gmapNPCList[iPuzzleOrders].split(";")[1]);



                }else{
                    //先走路然后接谜题
             //       console.log("路径1："+ gmapNPCList[iPuzzleOrders - 1].split(";")[0] +"--" + gmapNPCPath[iPuzzleOrders - 1]);
           //         console.log("路径2："+ gmapNPCList[iPuzzleOrders].split(";")[0] +"--" + gmapNPCPath[iPuzzleOrders ]);
            //        console.log("路径2："+ gmapNPCPath[iPuzzleOrders].substr(gmapNPCPath[iPuzzleOrders - 1].length + 1));
                    go(gmapNPCPath[iPuzzleOrders].substr(gmapNPCPath[iPuzzleOrders - 1].length + 1));
                    go ("ask "+gmapNPCList[iPuzzleOrders].split(";")[1]);
                }
            }else{
                //批处理模式关闭  , 打开谜题自动模式 ,显示当前谜题

                iBatchAskStart =0;
            //    listenPuzzleFunc();// 自动处理任务模式
                eval("clickButton('task_quest')") ;//显示任务列表
                return;



            }
        }

    }else if(  iBatchAskModel ==0) {

        iPuzzleOrders = iPuzzleOrders + 1;
        if (  iPuzzleOrders  <  gmapNPCList.length )
        {
            btnList["进度"].innerText = '[' +( iPuzzleOrders + 1 )  +   ' -> ' + gmapNPCList.length + ']' + gmapNPCList[iPuzzleOrders].split(";")[0] ;
            go ( gmapNPCPath[iPuzzleOrders] );
            go ("ask "+gmapNPCList[iPuzzleOrders].split(";")[1]);

        }else
        {
            //    alert("当前地图迷题已经扫完");

        }
    }



}

///-------------------------分割线-----------
//产生地图NPC路径

function PuzzleNPCGoFunc(){
     var num  = 0;
    if(!( num  = prompt("请输入谜题NPC顺序：","1"))){
        return;
    }
    num  = parseInt(num);
    num = num -1;
    if (gmapNPCList.length<=0) {
        return;
        }
    if ( num < 0 && num >= gmapNPCList.length ){
        return;
    }


    iPuzzleOrders =num;
    if (  iPuzzleOrders  <  gmapNPCList.length )
    {
        btnList["进度"].innerText = '[' +( iPuzzleOrders + 1 )  +   ' -> ' + gmapNPCList.length + ']' + gmapNPCList[iPuzzleOrders].split(";")[0] ;
        go ( gmapNPCPath[iPuzzleOrders] );
        go ("ask "+gmapNPCList[iPuzzleOrders].split(";")[1]);

    }else
    {
    //    alert("当前地图迷题已经扫完");

    }



}

///-------------------------分割线-----------
//产生地图NPC路径



function PuzzleNPCAsk(){
    if (  iPuzzleOrders  <  gmapNPCList.length && iPuzzleOrders >= 0 )
    {
         go ("ask "+gmapNPCList[iPuzzleOrders].split(";")[1]);
    }

}

///-------------------------批量接谜题设置分割线-----------
//产生地图NPC路径
iBatchAskModel=0;
function NpcBatchAskFunc(){

    if (Puzzletrigger==1){
        listenPuzzleFunc();

    }




    if (iBatchAskModel == 0){
         iBatchAskModel=1;

         btnList["单谜题"].innerText = '多谜题';




    }else if (iBatchAskModel == 1){
        iBatchAskModel=0;
        iBatchAskStart =0;
         btnList["单谜题"].innerText = '单谜题';

    }

}
//批量接谜题开始
iBatchAskStart =0;
iValidPuzzleNum=1;

function NpcBatchAskStartFunc(){

    if (iBatchAskModel == 1){

       if (Puzzletrigger==1){
        listenPuzzleFunc();

       }
      iBatchAskStart = 1;

    }
    iPuzzleOrders = iPuzzleOrders + 1;
    if (  iPuzzleOrders  <  gmapNPCList.length )
    {
        btnList["进度"].innerText = '[' +( iPuzzleOrders + 1 )  +   ' -> ' + gmapNPCList.length + ']' + gmapNPCList[iPuzzleOrders].split(";")[0] ;
        go ( gmapNPCPath[iPuzzleOrders] );
        go ("ask "+gmapNPCList[iPuzzleOrders].split(";")[1]);

    }else
    {
        //    alert("当前地图迷题已经扫完");

    }

}

function GetNPCStartMap(w){

  //  go('home');
     clickButton('home');     //回主页
 //   WhoAmIFunc();

    if(btnList["自动战斗"].innerText  == '自动战斗'){
        AutoKillFunc();
    }

  gstrNpcPath='';
  gmapNPCList = [];
  gmapNPCPath = [];
  tempNPCList = [];
  gmapNPCCount=0;
  steps=0;
  iPuzzleOrders = -1 ;

 // go_path = "jh 1;e;s;w;w;e;s;n;e;e;ne;ne;sw;sw;n;w;n;e;e;n;s;e;e;n;s;e;w;s;n;w;w;w;w;w;e;n;w;e;n;w;e;e;e;w;w;n;n;s;e;w;w";
  //go_path = "jh 2;n;n;e;s;n;w;n;e;s;n;w;w;e;n;w;s;w;e;n;e;e;s;n;w;n;w;n;n;w;e;s;s;s;n;w;n;n;n;e;w;s;s;w;e;s;e;e;e;n;s;e;n;n;w;e;e;n;s;w;n;w;e;n;e;w;n;w;e;s;s;s;s;s;w;w;n;w;e;e;n;s;w;n;e;w;n;w;e;e;w;n;e;n;n";
 //   go_path = "jh 3;n;e;w;s;w;e;s;e;n;s;w;s;e;s;n;w;w;n;s;e;s;s;w;n;s;e;s;e;w;nw;n;n;e;w;n;w;e;n;n;w;e;e;w;n";
  if (w.startsWith("雪亭镇")) {
			go_path = "jh 1;e;s;w;w;e;s;n;e;e;ne;ne;sw;sw;n;w;n;e;e;n;s;e;e;n;s;e;w;s;n;w;w;w;w;w;e;n;w;e;n;w;e;e;e;w;w;n;n;s;e;w;w";
        } else if (w.startsWith("洛阳")) {
			go_path = "jh 2;n;n;e;s;n;w;n;e;s;n;w;w;e;n;w;s;w;e;n;e;e;s;n;w;n;w;n;n;w;e;s;s;s;n;w;n;n;n;e;w;s;s;w;e;s;e;e;e;n;s;e;n;n;w;e;e;n;s;w;n;w;e;n;e;w;n;w;e;s;s;s;s;s;w;w;n;w;e;e;n;s;w;n;e;w;n;w;e;e;w;n;e;n;n";
        } else if (w.startsWith("华山村")) {
			go_path = "jh 3;n;e;w;s;w;e;s;e;n;s;w;s;e;s;n;w;w;n;s;e;s;s;w;n;s;e;s;e;w;nw;n;n;e;w;n;w;e;n;n;w;e;e;w;n";
        } else if (w.startsWith("华山")) {
			go_path = "jh 4;n;n;w;e;n;e;w;n;n;n;e;n;n;s;s;w;n;n;w;s;n;w;n;s;e;e;n;e;n;n;w;e;n;e;w;n;e;w;n;s;s;s;s;s;w;n;w;e;n;n;w;e;e;s;s;n;n;n;n;s;s;w;n";
        } else if (w.startsWith("扬州")) {
			go_path = "jh 5;n;w;w;n;s;e;e;e;w;n;w;e;e;w;n;w;e;n;w;e;n;w;w;s;s;n;n;n;n;w;n;n;n;s;s;s;e;e;w;n;s;s;s;e;e;e;n;n;n;s;s;w;n;e;n;n;s;s;e;n;n;w;n;n;s;s;w;s;s;e;e;s;w;s;w;n;w;e;e;n;n;e;w;w;e;n;n;s;s;s;s;w;n;w;e;e;w;n;w;w;n;s;e;e;n;e;s;e;s;s;s;n;n;n;w;n;w;w;s;n;w;n;w;e;e;w;n;n;w;n;s;e;e;s;n;w;n";
        } else if (w.startsWith("丐帮")) {
			go_path = "jh 6;event_1_98623439;ne;n;ne;ne;ne;sw;sw;sw;s;ne;ne;sw;sw;sw;s;w";
        } else if (w.startsWith("乔阴县")) {
			go_path = "jh 7;s;s;s;w;s;w;w;w;e;e;e;e;s;s;e;n;n;e;w;s;s;w;s;w;w;w;n;s;s;e;n;s;e;ne;s;e;n;e;s;e";
        } else if (w.startsWith("峨眉山")) {
			go_path = "n;n;n;e;e;w;w;w;n;n;n;w;w;s;e;w;s;e;w;w;e;n;w;e;n;w;w;n;s;sw;ne;e;e;n;e;w;w;e;n;e;w;w;e;n;w;w;w;n;n;n;s;s;s;e;e;e;e;e;e;e;e;e;w;w;s;e;w;w;e;s;e;w;w;e;s;e;e;w;w;s;e;w;w;e;s;e;w;w;e;n;n;w;w;n;n;n;n;w;n;s;w;e;s;n;e;n;n;n;n;s;s;nw;nw;n;n;s;s;se;sw;w;nw;w;e;se;e;ne;se;ne;se;s;se;nw;n;nw;ne;n;s;se;e";
        } else if (w.startsWith("恒山")) {
			go_path = "jh 9;n;w;e;n;e;w;n;w;e;n;e;w;n;n;n;w;n;s;s;n;e;e;n;s;e;w;w;n;n;w;n;e;w;n;n;w;e;n";
        } else if (w.startsWith("武当山")) {
			go_path = "jh 10;w;n;n;w;w;w;n;n;n;n;n;w;n;s;e;n;n;n;n;s;s;s;s;e;e;s;n;e;e;w;w;w;w;s;e;e;e;e;s;e;s;e;n;s;s;n;e;e;n;s;e;w;s;s;s";
        } else if (w.startsWith("晚月庄")) {
			go_path = "jh 11;e;e;n;e;s;sw;se;s;s;s;s;s;s;se;s;n;ne;n;nw;w;w;s;s;w;e;se;e;n;n;n;n;n;n;w;n;s;w;n;w;e;s;w;w;e;s;n;e;s;w;e;s;e;e;e;w;w;w;w;w;n;s;s;n;e;s;n;e;s;w;w;e;e;e;s;s;e;w;w;s;e;e;w;w;n;e;w;w;w;e;n;n;n;s;w;e;s;e;s;n;n;e";
        } else if (w.startsWith("水烟阁")) {
			go_path = "jh 12;n;e;w;n;n;n;s;w;n;n;e;w;s;nw;e;n;s;e;sw;n;s;s;e";
        } else if (w.startsWith("少林寺")) {
			go_path = "jh 13;e;s;s;w;w;w;e;e;n;n;w;n;w;w;n;s;e;e;n;e;w;w;e;n;n;e;w;w;e;n;n;e;w;w;e;n;n;e;w;w;e;n;n;e;s;s;s;s;s;s;s;s;n;n;n;n;n;n;n;n;w;w;s;s;s;s;s;s;s;s;n;n;n;n;n;n;n;n;e;n;e;w;w;e;n;w;n";
        } else if (w.startsWith("唐门")) {
			go_path = "jh 14;e;w;w;n;n;n;n;s;w;n;s;s;n;w;n;s;s;n;w;n;s;s;n;w;e;e;e;e;e;s;n;e;n;e;w;n;n;s";
        } else if (w.startsWith("青城山")) {
			go_path = "jh 15;s;s;e;w;w;n;s;e;s;e;w;w;w;n;s;s;s;n;n;w;w;w;n;s;w;e;e;e;e;e;e;s;e;w;w;e;s;e;w;s;w;s;ne;s;s;s;e;s;n;w;n;n;n;n;n;n;n;n;n;n;nw;w;nw;n;s;w;s;s;s";
        } else if (w.startsWith("逍遥林")) {
			go_path = "jh 16;s;s;s;s;e;e;e;s;w;w;w;w;w;e;n;s;s;n;e;e;n;n;s;s;s;s;n;n;e;n;s;s;s;n;n;e;e;n;n;e";
        } else if (w.startsWith("开封")) {
			go_path = "jh 17;sw;s;sw;nw;ne;sw;se;ne;n;ne;n;w;e;e;s;n;w;n;w;n;n;s;s;e;e;e;n;n;s;s;s;n;w;s;s;s;w;e;e;n;s;e;e;w;w;s;n;w;s;w;e;n;n;n;n;w;n;e;w;n;w;e;e;w;n;e;n;n;n;s;s;s;w;s;s;s;s;s;e;s;s;s;e;w;s;s;w";
        } else if (w.startsWith("明教")  || w.startsWith("光明顶")) {
			go_path = "jh 18;e;w;w;n;s;e;n;nw;n;n;w;e;n;n;n;ne;n;n;w;e;e;w;n;w;e;e;w;n;n;w;w;s;n;n;e;e;e;e;s;se;se;e;w;nw;nw;w;w;n;w;w;n;n;e;nw;se;e;e;e;se;e;w;sw;s;w;w;n;e;w;n;e;w;w;e;n;n;n;n;w;e;n;event_1_90080676;event_1_56007071;ne;n";
        } else if (w.startsWith("全真教")) {
			go_path = "jh 19;s;s;s;sw;s;e;n;nw;n;n;n;n;e;w;w;e;n;e;n;s;e;e;w;n;n;s;s;w;w;w;w;w;w;s;n;e;s;n;e;e;e;n;n;w;w;s;s;n;n;w;s;s;n;n;w;n;n;n;n;n;n;e;n;e;e;n;n;s;s;e;e;e;e;s;e;s;s;s;n;w;n;s;s;s;s;w;s;n;w;n;e;n;n;n;s;w;n;n;n;s;s;s;w;n;s;w;n;s;s;s;e;n;n;e;s;s;s;w";
        } else if (w.startsWith("古墓")) {
			go_path = "jh 20;s;s;n;n;w;w;s;e;s;s;s;s;s;sw;sw;s;e;se;nw;w;s;w;e;e;w;s;s;w;w;e;s;sw;ne;e;s;s;w;w;e;e;s;n;e;e;e;e;s;e;w;n;w;n;n;s;e;w;w;s;n;n;n;n;s;e;w;w";
        } else if (w.startsWith("白驮山")) {
			go_path = "jh 21;nw;s;n;ne;ne;sw;n;n;ne;w;e;n;n;w;w;e;e;s;s;sw;s;s;sw;w;n;s;w;nw;e;w;nw;nw;n;w;sw;ne;e;s;se;se;n;e;w;n;n;w;e;n;n;w;w;w;n;n;n;n;s;s;s;e;e;e;n;s;s;n;e;e;e;w;ne;sw;n;n;w;e;e;e;w;w;n;nw;se;ne;w;e;e;w;n";
        }  else if (w.startsWith("嵩山")) {
			go_path = "jh 22;n;n;w;w;s;s;s;s;s;n;w;e;n;n;e;w;n;n;e;n;n;n;n;n;e;n;e;w;n;w;n;s;e;n;n;n;w;w;e;n;w;e;n;s;s;e;e;w;n;e;w;n;e;w;n";
        } else if (w.startsWith("寒梅庄")) {
			go_path = "jh 23;n;n;e;w;n;n;n;n;n;w;w;e;e;e;s;n;w;n;w;w;e;n;s;e;e;n;s;w;n;n;e;w;w;n";
        } else if (w.startsWith("泰山")) {
			go_path = "jh 24;n;n;n;n;e;e;w;s;n;w;w;e;n;n;w;e;e;w;n;e;w;n;w;n;n;n;n;n;s;s;w;n;s;e;s;s;s;e;n;e;w;n;w;e;n;n;w;n;n;n;n;e;w;s;s;w;e;s;e;w;s;e;e;s;n;e;n;e;w;n;w;e;e;w;n;n;s;s;s;s;s;w;w;n;n;e;w;w;e;n;n;e;w;w;e;n";
        } else if (w.startsWith("大旗门")) {
			go_path = "jh 25;w;e;e;e;e;e;s";
        } else if (w.startsWith("大昭寺")) {
			go_path = "jh 26;w;w;n;n;s;w;e;e;e;e;w;w;w;s;w;w;w;n;s;w;n;n;e;w;w;w;w;w;s;s;s;s;s;e;s;e;e;e;n;w;e;e;e;w;w;n;w;w;n;e;w;w;e;s;w;n;s;s;n;w";
        } else if (w.startsWith("魔教")) {
			go_path = "jh 27";
        }else{
            w = null;
            return ;
        }




  gstrMapPath=go_path;
  btnList["迷题扫图"].innerText = w;
  setTimeout(function(){GetNPCPath(go_path) ;},500);


}

function GoStartXTZ(){
    GetNPCStartMap("雪亭镇");
}


function GoStartLY(){
    GetNPCStartMap("洛阳");
}

function GoStartHSC(){
    GetNPCStartMap("华山村");
}

function GoStartHS(){
    GetNPCStartMap("华山");
}

function GoStartYZ(){
    GetNPCStartMap("扬州");
}

function GoStartGB(){
    GetNPCStartMap("丐帮");
}

function GoStartQYX(){
    GetNPCStartMap("乔阴县");
}

function GoStartHS1(){
    GetNPCStartMap("恒山");
}
function GoStartWDS(){
    GetNPCStartMap("武当山");
}

function GoStartSYG(){
    GetNPCStartMap("水烟阁");
}
function GoStartTM(){
    GetNPCStartMap("唐门");
}
function GoStartXYL(){
    GetNPCStartMap("逍遥林");
}
function GoStartKF(){
    GetNPCStartMap("开封");
}
function GoStartMJ(){
    GetNPCStartMap("明教");
}

function GoStartQZJ(){
    GetNPCStartMap("全真教");
}

function GoStartGM(){
    GetNPCStartMap("古墓");
}

function GoStartBTS(){
    GetNPCStartMap("白驮山");
}

function GoStartSS(){
    GetNPCStartMap("嵩山");
}
function GoStartHMZ(){
    GetNPCStartMap("寒梅庄");
}
function GoStartTS(){
    GetNPCStartMap("泰山");
}
function GoStartDZS(){
    GetNPCStartMap("大昭寺");
}