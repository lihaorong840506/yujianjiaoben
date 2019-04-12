// ==UserScript==
// @name         天马专用V0.1
// @namespace    http://tampermonkey.net/
// @version      2018.9.1
// @description  try to take over the world!
// @author       ZERO
// @match        http://*.yytou.cn/*
// @exclude      http://res.yytou.cn/*
// @exclude      http://sword.mud.yytou.cn/*
// @grant        none
// ==/UserScript==
var btnList = {};// 按钮列表
var buttonWidth = '45px';// 按钮宽度
var buttonHeight = '20px';// 按钮高度
var currentPos = 30;// 当前按钮距离顶端高度，初始130
var delta = 25;// 每个按钮间隔

//按钮加入窗体中----------------------------
function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
}
function createButton(btnName,func){
    btnList[btnName]=document.createElement('button');
    var myBtn = btnList[btnName];
    myBtn.innerText = btnName;
    myBtn.style.position = 'absolute';
    myBtn.style.left = '0px';
    myBtn.style.top = currentPos + 'px';
    currentPos = currentPos + delta;
    myBtn.style.width = buttonWidth;
    myBtn.style.height = buttonHeight;
    myBtn.addEventListener('click', func);
    document.body.appendChild(myBtn);
}


//按钮列表----------------------------------
createButton('日常',buttonhideFunc);
createButton('签到',CheckInFunc);
createButton('打榜',PaiHangFunc);
createButton('试剑',ShiJieFunc);
createButton('答题',answerQuestionsFunc);
//createButton('刷碎片',SnakeFunc);
createButton('壁画',MianBiFunc);
createButton('侠客',RiChangFunc);
createButton('苗疆',MiaojiangFunc);
createButton('冰月',bingyueFunc);
createButton('天山',Tsdz1Func);
createButton('孽龙',nielongFunc);
createButton('军阵',pozhenFunc);
createButton('金狼',jinlangFunc);
createButton('神寨',shashenFunc);
createButton('青龙',listenQLFunc);
//createButton('游侠',listenYXFunc);


//隐藏所有按钮的按钮----------------------------------
var buttonhiden=0;
function buttonhideFunc(){
    if (buttonhiden==0){
        buttonhiden=1;
        btnList['日常'].innerText = '☀';
        hideButton();
    }else{
        buttonhiden=0;
        btnList['日常'].innerText = '隐';
        showButton();
    }
}
function hideButton(){
    btnList['签到'].style.visibility="hidden";
    btnList['打榜'].style.visibility="hidden";
    btnList['试剑'].style.visibility="hidden";
    btnList['答题'].style.visibility="hidden";
    //btnList['刷碎片'].style.visibility="hidden";
    btnList['壁画'].style.visibility="hidden";
    btnList['侠客'].style.visibility="hidden";
    btnList['苗疆'].style.visibility="hidden";
    btnList['冰月'].style.visibility="hidden";
    btnList['天山'].style.visibility="hidden";
    btnList['孽龙'].style.visibility="hidden";
    btnList['军阵'].style.visibility="hidden";
    btnList['金狼'].style.visibility="hidden";
    btnList['神寨'].style.visibility="hidden";
    btnList['青龙'].style.visibility="hidden";
   // btnList['游侠'].style.visibility="hidden";
    //btnList['加力'].style.visibility="hidden";
}
function showButton(){
    btnList['签到'].style.visibility="visible";
    btnList['打榜'].style.visibility="visible";
    btnList['试剑'].style.visibility="visible";
    btnList['答题'].style.visibility="visible";
    //btnList['刷碎片'].style.visibility="visible";
    btnList['壁画'].style.visibility="visible";
    btnList['侠客'].style.visibility="visible";
    btnList['苗疆'].style.visibility="visible";
    btnList['冰月'].style.visibility="visible";
    btnList['天山'].style.visibility="visible";
    btnList['孽龙'].style.visibility="visible";
    btnList['军阵'].style.visibility="visible";
    btnList['金狼'].style.visibility="visible";
    btnList['神寨'].style.visibility="visible";
    btnList['青龙'].style.visibility="visible";
    //btnList['游侠'].style.visibility="visible";
    //btnList['加力'].style.visibility="visible";
}

/*test:
go("jh 1;e;n;n");go("jh 2;n;n;n")
*/




// 签到--------------------------------------------------------
function CheckInFunc(){
    go('jh 1;look_npc snow_zhounianxiaoer;zhongqiu_lb;zhounian_lb;guoqing_lb;items use obj_molitang;items use obj_lanlingmeijiu;home;');//礼包
    go('vip drops');//领通勤
    //go('vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;');//10次暴击
    go('vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig');//挖宝
    go('vip finish_fb dulongzhai;vip finish_fb dulongzhai;vip finish_fb junying;vip finish_fb junying;vip finish_fb beidou;vip finish_fb beidou;vip finish_fb youling;vip finish_fb youling;vip finish_fb siyu');//副本扫荡
    go('vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;');//钓鱼
    go('clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;');//上香
    go('sort;sort fetch_reward;');//排行榜奖励
    go("share_ok 1;share_ok 2;share_ok 3;share_ok 4;share_ok 5;share_ok 7;");//分享
    go('cangjian get_all;xueyin_shenbinggu blade get_all;xueyin_shenbinggu unarmed get_all;xueyin_shenbinggu throwing get_all;');//闯楼奖励
    go('jh 5;n;n;n;w;sign7;home;');//扬州签到
    //go('jh 1;event_1_44140115;items use obj_bingzhen_suanmeitang;items use meigui hua;items use meigui hua;items use meigui hua;home;');//大雪礼包
    go('jh 1;e;n;e;e;event_1_44731074;event_1_8041045;event_1_8041045;event_1_29721519;event_1_60133236;home;');//消费积分和谜题卡
    go("jh 1;e;n;e;e;e;e;n;lq_bysf_lb;lq_lmyh_lb;home;");//比翼双飞和劳模英豪
    go('jh 2;n;n;n;n;n;n;n;e;tzjh_lq;w;n;n;n;n;n;n;n;n;n;n;n;n;e;n;n;n;w;event_1_31320275;home');//采莲
    go('jh 26;w;w;n;e;e;event_1_18075497;home');//大招采矿
    go('jh 26;w;w;n;n;event_1_14435995;home');//大招破阵
    go("jh 37;n;e;e;nw;nw;w;n;e;n;e;e;e;ne;ne;ne;se;n;event_1_97487911;home");//绝情谷鳄鱼
    go('jh 35;nw;nw;nw;n;ne;nw;w;nw;e;e;e;e;e;se;n;n;w;n;w;event_1_53278632;sousuo;sousuo;home'); //冰火岛玄重铁
    //go("jh 14;sw;s;e;s;s;sw;sw;w;w;s;s;e;e;e;n;ne;event_1_56989555 go;home");//唐门试练
    go("jh 28;n;w;w;w;w;w;w;nw;ne;nw;ne;nw;ne;e");//射雕
}


//快速师门帮派---------
function bangpaiANDshimenFunc(){
    alert("VIP专用\n\n请手动完成最后一个任务");
    go("heme;clan;clan scene;clan task;");
    var num  =21;
    for(var i=0; i < num; i++) { // 从第一个开始循环
        go('vip finish_clan'); //帮派
    }
    go('clan task;home');//帮派第21

    go("heme;family_quest;");
    var num  =25;
    for(var i=0; i < num; i++) { // 从第一个开始循环
        go('vip finish_family'); //师门
    }
    go('family_quest;home');//师门第26
    go('clan task;home');//帮派第21
}


// 打排行榜----------------------------
function PaiHangFunc(){
    if(btnList["打榜"].innerText  == '打榜'){
        clickButton('sort');
        clickButton('fight_hero 1');
        AutoPaiHangFunc();
        btnList["打榜"].innerText  = '停打榜';
    }
    else{clearPaiHang();
         btnList["打榜"].innerText  = '打榜';
        }
}
function AutoPaiHangFunc(){
    // 间隔1500毫秒查找打一次
    AutoPaiHangFuncIntervalFunc = setInterval(AutoPaiHang,1500);
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
        btnList["打榜"].innerText  = '打榜';
        clickButton('home');
        console.log('打完收工！');
    }
    else{
        ninesword();
    }
}


// 试剑----------------------------
function ShiJieFunc(){
    go('swords');
    go('swords select_member gaibang_hong');  //洪帮主
    go('swords select_member dali_yideng');   //古灯大师
    go('swords select_member gumu_yangguo');   //神雕大侠
    go('swords fight_test go');
    setTimeout(Shijie1,1000);//code
}
function Shijie1(){
    if( isContains($('span:contains(你今天)').text().slice(-12), '你今天试剑次数已达限额。')){
        console.log('打完收工！');
    }
    else{go('swords fight_test go');
         ninesword();
         setTimeout(Shijie1,1000);//code
        }
}

// 答题 ---------------------------------------------------
var answerQuestionsInterval = null;
var QuestAnsLibs = {
    "“白玉牌楼”场景是在哪个地图上？":"c",
    "“百龙山庄”场景是在哪个地图上？":"b",
    "“冰火岛”场景是在哪个地图上？":"b",
    "“常春岛渡口”场景是在哪个地图上？":"c",
    "“跪拜坪”场景是在哪个地图上？":"b",
    "“翰墨书屋”场景是在哪个地图上？":"c",
    "“花海”场景是在哪个地图上？":"a",
    "“留云馆”场景是在哪个地图上？":"b",
    "“清音居”场景是在哪个地图上？":"a",
    "“日月洞”场景是在哪个地图上？":"b",
    "“蓉香榭”场景是在哪个地图上？":"c",
    "“三清殿”场景是在哪个地图上？":"b",
    "“三清宫”场景是在哪个地图上？":"c",
    "“双鹤桥”场景是在哪个地图上？":"b",
    "“无名山脚”场景是在哪个地图上？":"d",
    "“伊犁”场景是在哪个地图上？":"b",
    "“鹰记商号”场景是在哪个地图上？":"d",
    "“迎梅客栈”场景是在哪个地图上？":"d",
    "“子午楼”场景是在哪个地图上？":"c",
    "8级的装备摹刻需要几把刻刀？":"a",
    "NPC公平子在哪一章地图？":"a",
    "vip每天不可以领取什么？":"b",
    "瑷伦在晚月庄的哪个场景？":"b",
    "安惜迩是在那个场景？":"c",
    "黯然消魂掌有多少招式？":"c",
    "黯然销魂掌是哪个门派的技能？":"a",
    "黯然销魂掌有多少招式？":"c",
    "八卦迷阵是哪个门派的阵法？":"b",
    "八卦迷阵是那个门派的阵法？":"a",
    "白金戒指可以在哪位npc那里获得？":"b",
    "白金戒指可以在哪位那里获得？":"b",
    "白金手镯可以在哪位npc那里获得？":"a",
    "白金项链可以在哪位npc那里获得？":"b",
    "白金项链可以在哪位那里获得？":"b",
    "白蟒鞭的伤害是多少？":"a",
    "白驼山第一位要拜的师傅是谁？":"a",
    "白银宝箱礼包多少元宝一个？":"d",
    "白玉牌楼场景是在哪个地图上？":"c",
    "白玉腰束是腰带类的第几级装备？":"b",
    "拜师风老前辈需要正气多少？":"b",
    "拜师老毒物需要蛤蟆功多少级？":"a",
    "拜师铁翼需要多少内力？":"b",
    "拜师小龙女需要容貌多少？":"c",
    "拜师张三丰需要多少正气？":"b",
    "包家将是哪个门派的师傅？":"a",
    "包拯在哪一章？":"d",
    "宝石合成一次需要消耗多少颗低级宝石？":"c",
    "宝玉帽可以在哪位npc那里获得？":"d",
    "宝玉帽可以在哪位那里获得？":"d",
    "宝玉鞋击杀哪个npc可以获得？":"a",
    "宝玉鞋击杀哪个可以获得？":"a",
    "宝玉鞋在哪获得？":"a",
    "暴雨梨花针的伤害是多少？":"c",
    "北斗七星阵是第几个的组队副本？":"c",
    "北冥神功是哪个门派的技能？":"b",
    "北岳殿神像后面是哪位？":"b",
    "北岳殿神像后面是哪位npc？":"b",
    "匕首加什么属性？":"c",
    "碧海潮生剑在哪位师傅处学习？":"a",
    "碧磷鞭的伤害是多少？":"b",
    "镖局保镖是挂机里的第几个任务？":"d",
    "冰魄银针的伤害是多少？":"b",
    "病维摩拳是哪个门派的技能？":"b",
    "不可保存装备下线多久会消失？":"c",
    "不属于白驼山的技能是什么？":"b",
    "仓库最多可以容纳多少种物品？":"b",
    "沧海护腰可以镶嵌几颗宝石？":"d",
    "沧海护腰是腰带类的第几级装备？":"a",
    "藏宝图在哪个npc处购买？":"b",
    "藏宝图在哪个处购买？":"b",
    "藏宝图在哪里npc那里买？":"a",
    "藏宝图在哪里那里买？":"a",
    "藏宝图在哪个NPC处购买":"a",
    "草帽可以在哪位npc那里获得？":"b",
    "成功易容成异性几次可以领取易容成就奖？":"b",
    "成长计划第七天可以领取多少元宝？":"d",
    "成长计划六天可以领取多少银两？":"d",
    "成长计划需要多少元宝方可购买？":"a",
    "城里打擂是挂机里的第几个任务？":"d",
    "跨服天剑谷是星期几举行的":"b",
    "城里抓贼是挂机里的第几个任务？":"b",
    "充值积分不可以兑换下面什么物品？":"d",
    "出生选武学世家增加什么":"a",
    "闯楼第几层可以获得称号“藏剑楼护法”？":"b",
    "闯楼第几层可以获得称号“藏剑楼楼主”？":"d",
    "闯楼第几层可以获得称号“藏剑楼长老”？":"c",
    "闯楼每多少层有称号奖励？":"a",
    "春风快意刀是哪个门派的技能？":"b",
    "春秋水色斋需要多少杀气才能进入？":"d",
    "从哪个npc处进入跨服战场？":"a",
    "从哪个处进入跨服战场？":"a",
    "摧心掌是哪个门派的技能":"a",
    "达摩在少林哪个场景？":"c",
    "达摩杖的伤害是多少？":"d",
    "打开引路蜂礼包可以得到多少引路蜂？":"b",
    "打排行榜每天可以完成多少次？":"a",
    "打土匪是挂机里的第几个任务？":"c",
    "打造刻刀需要多少个玄铁？":"a",
    "打坐增长什么属性？":"a",
    "大保险卡可以承受多少次死亡后不降技能等级？":"b",
    "大乘佛法有什么效果？":"d",
    "大旗门的修养术有哪个特殊效果？":"a",
    "大旗门的云海心法可以提升哪个属性？":"c",
    "大招寺的金刚不坏功有哪个特殊效果？":"a",
    "大招寺的铁布衫有哪个特殊效果？":"c",
    "当日最低累积充值多少元即可获得返利？":"b",
    "刀法基础在哪掉落？":"a",
    "倒乱七星步法是哪个门派的技能？":"d",
    "等级多少才能在世界频道聊天？":"c",
    "第一个副本需要多少等级才能进入？":"d",
    "貂皮斗篷是披风类的第几级装备？":"b",
    "丁老怪是哪个门派的终极师傅？":"a",
    "丁老怪在天宿海的哪个场景？":"b",
    "丁老怪在天宿海哪个场景？":"b",
    "丁老怪在星宿海的哪个场景？":"b",
    "东方教主在魔教的哪个场景？":"b",
    "斗转星移是哪个门派的技能？":"a",
    "斗转星移阵是哪个门派的阵法？":"a",
    "毒龙鞭的伤害是多少？":"a",
    "毒物阵法是哪个门派的阵法？":"b",
    "独孤求败有过几把剑？":"d",
    "独龙寨是第几个组队副本？":"a",
    "读书写字301-400级在哪里买书？":"c",
    "读书写字最高可以到多少级？":"b",
    "端茶递水是挂机里的第几个任务？":"b",
    "断云斧是哪个门派的技能？":"a",
    "锻造一把刻刀需要多少玄铁碎片锻造？":"c",
    "锻造一把刻刀需要多少银两？":"a",
    "兑换易容面具需要多少玄铁碎片？":"c",
    "多少消费积分换取黄金宝箱？":"a",
    "多少消费积分可以换取黄金钥匙？":"b",
    "翻译梵文一次多少银两？":"d",
    "方媃是哪个门派的师傅？":"b",
    "飞仙剑阵是哪个门派的阵法？":"b",
    "风老前辈在华山哪个场景？":"b",
    "风泉之剑加几点悟性？":"c",
    "风泉之剑可以在哪位npc那里获得？":"b",
    "风泉之剑可以在哪位那里获得？":"b",
    "风泉之剑在哪里获得？":"d",
    "疯魔杖的伤害是多少？":"b",
    "伏虎杖的伤害是多少？":"c",
    "副本完成后不可获得下列什么物品？":"b",
    "副本一次最多可以进几人？":"a",
    "副本有什么奖励":"d",
    "富春茶社在哪一章？":"c",
    "改名字在哪改？":"d",
    "丐帮的绝学是什么？":"a",
    "丐帮的轻功是哪个？":"b",
    "干苦力是挂机里的第几个任务？":"a",
    "钢丝甲衣可以在哪位npc那里获得？":"d",
    "钢丝甲衣可以在哪位那里获得？":"d",
    "高级乾坤再造丹加什么？":"b",
    "高级乾坤再造丹是增加什么的？":"b",
    "高级突破丹多少元宝一颗？":"d",
    "割鹿刀可以在哪位npc那里获得？":"b",
    "葛伦在大招寺的哪个场景":"b",
    "根骨能提升哪个属性？":"c",
    "功德箱捐香火钱有什么用？":"a",
    "功德箱在雪亭镇的哪个场景？":"c",
    "购买新手进阶礼包在挂机打坐练习上可以享受多少倍收益？":"b",
    "孤独求败称号需要多少论剑积分兑换？":"b",
    "孤儿出身增加什么？":"d",
    "古灯大师是哪个门派的终极师傅？":"c",
    "古灯大师在大理哪个场景？":"c",
    "古墓多少级以后才能进去？":"d",
    "挂机增长什么？":"a",
    "寒玉床睡觉修炼需要多少点内力值？":"c",
    "寒玉床睡觉一次多久？":"c",
    "寒玉床需要切割多少次？":"d",
    "寒玉床在哪里切割？":"a",
    "寒玉床在那个地图可以找到？":"a",
    "黑狗血在哪获得？":"b",
    "黑水伏蛟可以在哪位npc那里获得？":"c",
    "黑水伏蛟可以在哪位那里获得？":"c",
    "红宝石加什么属性？":"b",
    "洪帮主在洛阳哪个场景？":"c",
    "虎皮腰带是腰带类的第几级装备？":"a",
    "花不为在哪一章？":"a",
    "花花公子在哪个地图？":"a",
    "华山村王老二掉落的物品是什么？":"a",
    "华山施戴子掉落的物品是什么？":"b",
    "华山武器库从哪个NPC进？":"d",
    "黄宝石加什么属性？":"c",
    "黄岛主在桃花岛的哪个场景？":"d",
    "黄袍老道是哪个门派的师傅？":"c",
    "积分商城在雪亭镇的哪个场景？":"c",
    "技能柳家拳谁教的？":"a",
    "技能数量超过了什么消耗潜能会增加？":"b",
    "嫁衣神功是哪个门派的技能？":"b",
    "剑冢在哪个地图？":"a",
    "街头卖艺是挂机里的第几个任务？":"a",
    "金弹子的伤害是多少？":"a",
    "金刚不坏功有什么效果？":"a",
    "金刚杖的伤害是多少？":"a",
    "金戒指可以在哪位npc那里获得？":"d",
    "金手镯可以在哪位npc那里获得？":"b",
    "金丝鞋可以在哪位npc那里获得？":"b",
    "金项链可以在哪位npc那里获得？":"d",
    "金玉断云是哪个门派的阵法？":"a",
    "锦缎腰带是腰带类的第几级装备？":"a",
    "精铁棒可以在哪位npc那里获得？":"d",
    "精铁棒可以在哪位那里获得？":"d",
    "九区服务器名称？":"d",
    "九阳神功是哪个门派的技能？":"c",
    "九阴派梅师姐在星宿海哪个场景？":"a",
    "军营是第几个组队副本？":"b",
    "开通VIP月卡最低需要当天充值多少元方有购买资格？":"a",
    "可以召唤金甲伏兵助战是哪个门派？":"a",
    "客商在哪一章？":"b",
    "孔雀氅可以镶嵌几颗宝石？":"b",
    "孔雀氅是披风类的第几级装备？":"c",
    "枯荣禅功是哪个门派的技能？":"a",
    "跨服副本周六几点开启？":"a",
    "跨服是星期几举行的？":"b",
    "跨服天剑谷每周六几点开启？":"a",
    "跨服需要多少级才能进入？":"c",
    "跨服在哪个场景进入？":"c",
    "兰花拂穴手是哪个门派的技能？":"a",
    "蓝宝石加什么属性？":"a",
    "蓝止萍在哪一章？":"c",
    "蓝止萍在晚月庄哪个小地图？":"b",
    "老毒物在白驮山的哪个场景？":"b",
    "老顽童在全真教哪个场景？":"b",
    "莲花掌是哪个门派的技能？":"a",
    "烈火旗大厅是那个地图的场景？":"c",
    "烈日项链可以镶嵌几颗宝石？":"c",
    "林祖师是哪个门派的师傅？":"a",
    "灵蛇杖法是哪个门派的技能？":"c",
    "凌波微步是哪个门派的技能？":"b",
    "凌虚锁云步是哪个门派的技能？":"b",
    "领取消费积分需要寻找哪个NPC？":"c",
    "鎏金缦罗是披风类的第几级装备？":"d",
    "柳淳风在哪一章":"c",
    "柳淳风在雪亭镇哪个场景？":"b",
    "柳文君所在的位置？":"a",
    "六脉神剑是哪个门派的绝学？":"a",
    "六阴追魂剑是哪个门派的技能？":"b",
    "陆得财是哪个门派的师傅？":"c",
    "陆得财在乔阴县的哪个场景？":"a",
    "论剑每天能打几次？":"a",
    "论剑是每周星期几？":"c",
    "论剑是什么时间点正式开始？":"a",
    "论剑是星期几进行的？":"c",
    "论剑是星期几举行的？":"c",
    "论剑输一场获得多少论剑积分？":"a",
    "论剑要在晚上几点前报名？":"b",
    "论剑一次最多能突破几个技能？":"c",
    "论剑在周几进行？":"b",
    "论剑中步玄派的师傅是哪个？":"a",
    "论剑中大招寺第一个要拜的师傅是谁？":"c",
    "论剑中古墓派的终极师傅是谁？":"d",
    "论剑中花紫会的师傅是谁？":"c",
    "论剑中青城派的第一个师傅是谁？":"a",
    "论剑中青城派的终极师傅是谁？":"d",
    "论剑中逍遥派的终极师傅是谁？":"c",
    "论剑中以下不是峨嵋派技能的是哪个":"b",
    "论剑中以下不是华山派的人物的是哪个？":"d",
    "论剑中以下哪个不是大理段家的技能？":"c",
    "论剑中以下哪个不是大招寺的技能？":"b",
    "论剑中以下哪个不是峨嵋派可以拜师的师傅？":"d",
    "论剑中以下哪个不是丐帮的技能？":"d",
    "论剑中以下哪个不是丐帮的人物？":"a",
    "论剑中以下哪个不是古墓派的的技能？":"b",
    "论剑中以下哪个不是华山派的技能的？":"d",
    "论剑中以下哪个不是明教的技能？":"d",
    "论剑中以下哪个不是魔教的技能？":"a",
    "论剑中以下哪个不是魔教的人物？":"d",
    "论剑中以下哪个不是全真教的技能？":"d",
    "论剑中以下哪个不是是晚月庄的技能？":"d",
    "论剑中以下哪个不是唐门的技能？":"c",
    "论剑中以下哪个不是唐门的人物？":"c",
    "论剑中以下哪个不是铁雪山庄的技能？":"d",
    "论剑中以下哪个不是铁血大旗门的技能？":"c",
    "论剑中以下哪个不是晚月庄的技能？":"d",
    "论剑中以下哪个是大理段家的技能":"a",
    "论剑中以下哪个是大招寺的技能？":"b",
    "论剑中以下哪个是丐帮的技能？":"b",
    "论剑中以下哪个是花紫会的技能":"a",
    "论剑中以下哪个是华山派的技能的？":"a",
    "论剑中以下哪个是明教的技能？":"b",
    "论剑中以下哪个是青城派的技能？":"b",
    "论剑中以下哪个是唐门的技能？":"b",
    "论剑中以下哪个是天邪派的技能？":"b",
    "论剑中以下哪个是天邪派的人物？":"a",
    "论剑中以下哪个是铁雪山庄的技能？":"c",
    "论剑中以下哪个是铁血大旗门的技能？":"b",
    "论剑中以下哪个是铁血大旗门的师傅？":"a",
    "论剑中以下哪个是晚月庄的技能？":"a",
    "论剑中以下哪个是晚月庄的人物":"a",
    "论剑中以下是峨嵋派技能的是哪个？":"a",
    "论语在哪购买？":"a",
    "骆云舟在哪一章？":"c",
    "骆云舟在乔阴县的哪个场景？":"b",
    "落英神剑掌是哪个门派的技能？":"b",
    "吕进在哪个地图？":"a",
    "绿宝石加什么属性？":"c",
    "漫天花雨匕在哪获得？":"a",
    "茅山的绝学是什么":"b",
    "茅山的天师正道可以提升哪个属性？":"d",
    "茅山可以招几个宝宝？":"c",
    "茅山派的轻功是什么？":"b",
    "茅山天师正道可以提升什么？":"c",
    "茅山学习什么技能招宝宝？":"a",
    "茅山在哪里拜师？":"c",
    "每次合成宝石需要多少银两？":"a",
    "每个玩家最多能有多少个好友？":"b",
    "每日微信分享可以获得什么奖励？":"a",
    "每天的任务次数几点重置？":"d",
    "每天分享游戏到哪里可以获得20元宝？":"a",
    "每天能挖几次宝？":"d",
    "每天能做多少个谜题任务？":"a",
    "每天能做多少个师门任务？":"c",
    "每天微信分享能获得多少元宝？":"d",
    "每天有几次试剑？":"b",
    "每天在线多少个小时即可领取消费积分？":"b",
    "每突破一次技能有效系数加多少":"a",
    "密宗伏魔是哪个门派的阵法？":"c",
    "灭绝师太在第几章？":"c",
    "灭绝师太在峨眉山哪个场景？":"a",
    "明教的九阳神功有哪个特殊效果？":"a",
    "明月帽要多少刻刀摩刻？":"a",
    "摹刻10级的装备需要摩刻技巧多少级？":"b",
    "摹刻烈日宝链需要多少级摩刻技巧？":"c",
    "摹刻扬文需要多少把刻刀？":"a",
    "魔鞭诀在哪里学习？":"d",
    "魔教的大光明心法可以提升哪个属性？":"d",
    "莫不收在哪一章？":"a",
    "墨磷腰带是腰带类的第几级装备？":"d",
    "木道人在青城山的哪个场景？":"b",
    "慕容家主在慕容山庄的哪个场景？":"a",
    "慕容山庄的斗转星移可以提升哪个属性":"d",
    "哪个npc处可以捏脸？":"a",
    "哪个NPC掉落拆招基础？":"a",
    "哪个npc属于全真七子？":"b",
    "哪个处可以捏脸？":"a",
    "哪个分享可以获得20元宝？":"b",
    "哪个技能不是魔教的？":"d",
    "哪个门派拜师没有性别要求？":"d",
    "哪样不能获得玄铁碎片？":"c",
    "能增容貌的是下面哪个技能？":"a",
    "捏脸需要花费多少银两？":"c",
    "捏脸需要寻找哪个NPC？":"a",
    "欧阳敏是哪个门派的？":"b",
    "欧阳敏是哪个门派的师傅？":"b",
    "欧阳敏在哪一章？":"a",
    "欧阳敏在唐门的哪个场景？":"c",
    "排行榜最多可以显示多少名玩家？":"a",
    "逄义是在那个场景？":"a",
    "披星戴月是披风类的第几级装备？":"d",
    "劈雳拳套有几个镶孔？":"a",
    "霹雳掌套的伤害是多少？":"b",
    "辟邪剑法是哪个门派的绝学技能？":"a",
    "辟邪剑法在哪学习？":"b",
    "婆萝蜜多心经是哪个门派的技能？":"b",
    "七宝天岚舞是哪个门派的技能？":"d",
    "七星鞭的伤害是多少？":"c",
    "七星剑法是哪个门派的绝学？":"a",
    "棋道是哪个门派的技能？":"c",
    "千古奇侠称号需要多少论剑积分兑换？":"d",
    "乾坤大挪移属于什么类型的武功？":"a",
    "乾坤一阳指是哪个师傅教的？":"a",
    "青城派的道德经可以提升哪个属性":"c",
    "青城派的道家心法有哪个特殊效果？":"a",
    "清风寨在哪":"b",
    "清虚道长在哪一章？":"d",
    "去唐门地下通道要找谁拿钥匙？":"a",
    "全真的道家心法有哪个特殊效果？":"a",
    "全真的基本阵法有哪个特殊效果？":"b",
    "全真的双手互搏有哪个特殊效果？":"c",
    "人物背包最多可以容纳多少种物品？":"a",
    "日月神教大光明心法可以提升什么":"d",
    "如何将华山剑法从400级提升到440级？":"d",
    "如意刀是哪个门派的技能？":"c",
    "山河藏宝图需要在哪个NPC手里购买？":"d",
    "上山打猎是挂机里的第几个任务？":"c",
    "少林的混元一气功有哪个特殊效果？":"d",
    "少林的易筋经神功有哪个特殊效果？":"a",
    "蛇形刁手是哪个门派的技能？":"b",
    "什么影响打坐的速度？":"c",
    "什么影响攻击力":"d",
    "什么装备不能镶嵌黄水晶？":"d",
    "什么装备都能镶嵌的是什么宝石？":"c",
    "什么装备可以镶嵌紫水晶？":"c",
    "神雕大侠所在的地图？":"b",
    "神雕大侠在哪一章？":"a",
    "神雕侠侣的时代背景是哪个朝代？":"d",
    "神雕侠侣的作者是?":"b",
    "升级什么技能可以提升根骨？":"a",
    "生死符的伤害是多少？":"a",
    "师门磕头增加什么？":"a",
    "师门任务每天可以完成多少次？":"a",
    "师门任务每天可以做多少个？":"c",
    "师门任务什么时候更新？":"b",
    "师门任务一天能完成几次？":"d",
    "师门任务最多可以完成多少个？":"d",
    "施令威在哪个地图？":"b",
    "石师妹哪个门派的师傅？":"c",
    "使用朱果经验潜能将分别增加多少？":"a",
    "首冲重置卡需要隔多少天才能在每日充值奖励中领取？":"b",
    "首次通过桥阴县不可以获得那种奖励？":"a",
    "受赠的消费积分在哪里领取":"d",
    "兽皮鞋可以在哪位npc那里获得？":"b",
    "兽皮鞋可以在哪位那里获得？":"b",
    "树王坟在第几章节？":"c",
    "双儿在扬州的哪个小地图？":"a",
    "孙天灭是哪个门派的师傅？":"c",
    "踏雪无痕是哪个门派的技能？":"b",
    "踏云棍可以在哪位npc那里获得？":"a",
    "踏云棍可以在哪位那里获得？":"a",
    "唐门的唐门毒经有哪个特殊效果？":"a",
    "唐门密道怎么走？":"c",
    "天蚕围腰可以镶嵌几颗宝石？":"d",
    "天蚕围腰是腰带类的第几级装备？":"d",
    "天山姥姥在逍遥林的哪个场景？":"d",
    "天山折梅手是哪个门派的技能？":"c",
    "天师阵法是哪个门派的阵法？":"b",
    "天邪派在哪里拜师？":"b",
    "天羽奇剑是哪个门派的技能？":"a",
    "铁戒指可以在哪位npc那里获得？":"a",
    "铁戒指可以在哪位那里获得？":"a",
    "铁手镯可以在哪位npc那里获得？":"a",
    "铁手镯可以在哪位那里获得？":"a",
    "铁项链可以在哪位npc那里获得？":"a",
    "铁血大旗门云海心法可以提升什么？":"a",
    "通灵需要花费多少银两？":"d",
    "通灵需要寻找哪个NPC？":"c",
    "突破丹在哪里购买？":"b",
    "屠龙刀法是哪个门派的绝学技能？":"b",
    "屠龙刀是什么级别的武器？":"a",
    "挖剑冢可得什么？":"a",
    "弯月刀可以在哪位npc那里获得？":"b",
    "弯月刀可以在哪位那里获得？":"b",
    "玩家每天能够做几次正邪任务？":"c",
    "玩家想修改名字可以寻找哪个NPC？":"a",
    "晚月庄的内功是什么？":"b",
    "晚月庄的七宝天岚舞可以提升哪个属性？":"b",
    "晚月庄的小贩在下面哪个地点？":"a",
    "晚月庄七宝天岚舞可以提升什么？":"b",
    "晚月庄意寒神功可以提升什么？":"b",
    "晚月庄主线过关要求？":"a",
    "王铁匠是在那个场景？":"b",
    "王重阳是哪个门派的师傅？":"b",
    "魏无极处读书可以读到多少级？":"a",
    "魏无极身上掉落什么装备？":"c",
    "魏无极在第几章？":"a",
    "闻旗使在哪个地图？":"a",
    "乌金玄火鞭的伤害是多少？":"d",
    "乌檀木刀可以在哪位npc那里获得？":"d",
    "乌檀木刀可以在哪位那里获得？":"d",
    "钨金腰带是腰带类的第几级装备？":"d",
    "武当派的绝学技能是以下哪个？":"d",
    "武穆兵法提升到多少级才能出现战斗必刷？":"d",
    "武穆兵法通过什么学习？":"a",
    "武学世家加的什么初始属性？":"a",
    "舞中之武是哪个门派的阵法？":"b",
    "西毒蛇杖的伤害是多少？":"c",
    "吸血蝙蝠在下面哪个地图？":"a",
    "下列哪项战斗不能多个玩家一起战斗？":"a",
    "下列装备中不可摹刻的是？":"c",
    "下面哪个npc不是魔教的？":"d",
    "下面哪个不是古墓的师傅？":"d",
    "下面哪个不是门派绝学？":"d",
    "下面哪个不是魔教的？":"d",
    "下面哪个地点不是乔阴县的":"d",
    "下面哪个门派是正派？":"a",
    "下面哪个是天邪派的师傅？":"a",
    "下面有什么是寻宝不能获得的？":"c",
    "向师傅磕头可以获得什么？":"b",
    "逍遥步是哪个门派的技能？":"a",
    "逍遥林是第几章的地图？":"c",
    "逍遥林怎么弹琴可以见到天山姥姥？":"b",
    "逍遥派的绝学技能是以下哪个？":"a",
    "萧辟尘在哪一章？":"d",
    "小李飞刀的伤害是多少？":"d",
    "小龙女住的古墓是谁建造的？":"b",
    "小男孩在华山村哪里？":"a",
    "新人礼包在哪个npc处兑换？":"a",
    "新手礼包在哪里领取":"a",
    "新手礼包在哪领取？":"c",
    "需要使用什么衣服才能睡寒玉床？":"a",
    "选择孤儿会影响哪个属性？":"c",
    "选择商贾会影响哪个属性？":"b",
    "选择书香门第会影响哪个属性？":"b",
    "选择武学世家会影响哪个属性？":"a",
    "学习屠龙刀法需要多少内力？":"b",
    "雪莲有什么作用？":"a",
    "雪蕊儿是哪个门派的师傅？":"a",
    "雪蕊儿在铁雪山庄的哪个场景？":"d",
    "扬文的属性？":"a",
    "扬州询问黑狗能到下面哪个地点？":"a",
    "扬州询问黑狗子能到下面哪个地点？":"a",
    "扬州在下面哪个地点的npc处可以获得玉佩？":"c",
    "扬州在下面哪个地点的处可以获得玉佩？":"c",
    "羊毛斗篷是披风类的第几级装备？":"a",
    "阳刚之劲是哪个门派的阵法？":"c",
    "杨过小龙女分开多少年后重逢?":"c",
    "杨过在哪个地图？":"a",
    "夜行披风是披风类的第几级装备？":"a",
    "夜皇在大旗门哪个场景？":"c",
    "一个队伍最多有几个队员？":"c",
    "一天能使用元宝做几次暴击谜题？":"c",
    "一天能完成谜题任务多少个？":"b",
    "一天能完成师门任务有多少个？":"c",
    "一天能完成挑战排行榜任务多少次":"a",
    "一张分身卡的有效时间是多久？":"c",
    "一指弹在哪里领悟？":"b",
    "移开明教石板需要哪项技能到一定级别？":"a",
    "以下不是步玄派的技能的哪个？":"c",
    "以下不是天宿派师傅的是哪个？":"c",
    "以下不是晚月庄技能？":"d",
    "以下不是隐藏门派的是哪个？":"d",
    "以下哪个宝石不能镶嵌到戒指？":"c",
    "以下哪个宝石不能镶嵌到内甲？":"a",
    "以下哪个宝石不能镶嵌到披风？":"c",
    "以下哪个宝石不能镶嵌到腰带？":"c",
    "以下哪个宝石不能镶嵌到衣服？":"a",
    "以下哪个不是道尘禅师教导的武学？":"d",
    "以下哪个不是何不净教导的武学？":"c",
    "以下哪个不是慧名尊者教导的技能？":"d",
    "以下哪个不是空空儿教导的武学？":"b",
    "以下哪个不是梁师兄教导的武学？":"b",
    "以下哪个不是鲁长老教导的武学？":"d",
    "以下哪个不是论剑的皮肤？":"d",
    "以下哪个不是全真七子？":"c",
    "以下哪个不是宋首侠教导的武学？":"d",
    "以下哪个不是微信分享好友、朋友圈、QQ空间的奖励？":"a",
    "以下哪个不是岳掌门教导的武学？":"a",
    "以下哪个不是在洛阳场景 ":"d",
    "以下哪个不是在雪亭镇场景":"d",
    "以下哪个不是在扬州场景？":"d",
    "以下哪个不是知客道长教导的武学？":"b",
    "以下哪个门派不是隐藏门派？":"c",
    "以下哪个门派是正派？":"d",
    "以下哪个门派是中立门派？":"a",
    "以下哪个是步玄派的祖师？":"b",
    "以下哪个是封山派的祖师？":"c",
    "以下哪个是花紫会的祖师？":"a",
    "以下哪个是晚月庄的祖师？":"d",
    "以下哪些物品不是成长计划第二天可以领取的？":"c",
    "以下哪些物品不是成长计划第三天可以领取的？":"d",
    "以下哪些物品不是成长计划第一天可以领取的？":"d",
    "以下哪些物品是成长计划第四天可以领取的？":"a",
    "以下哪些物品是成长计划第五天可以领取的？":"b",
    "以下属于邪派的门派是哪个？":"b",
    "以下属于正派的门派是哪个？":"a",
    "以下谁不精通降龙十八掌？":"d",
    "以下有哪些物品不是每日充值的奖励？":"d",
    "倚天剑加多少伤害？":"d",
    "倚天屠龙记的时代背景哪个朝代？":"a",
    "易容后保持时间是多久？":"a",
    "易容面具需要多少玄铁兑换？":"c",
    "易容术多少级才可以易容成异性NPC？":"a",
    "易容术可以找哪位NPC学习？":"b",
    "易容术向谁学习？":"a",
    "易容术在哪里学习？":"a",
    "易容术在哪学习？":"b",
    "银手镯可以在哪位npc那里获得？":"b",
    "银手镯可以在哪位那里获得？":"b",
    "银丝链甲衣可以在哪位npc那里获得？":"a",
    "银项链可以在哪位npc那里获得？":"b",
    "银项链可以在哪位那里获得？":"b",
    "尹志平是哪个门派的师傅？":"b",
    "隐者之术是那个门派的阵法？":"a",
    "鹰爪擒拿手是哪个门派的技能？":"a",
    "影响你出生的福缘的出生是？":"d",
    "油流麻香手是哪个门派的技能？":"a",
    "游龙散花是哪个门派的阵法？":"d",
    "玉草帽可以在哪位npc那里获得？":"b",
    "玉蜂浆在哪个地图获得":"a",
    "玉女剑法是哪个门派的技能？":"b",
    "岳掌门在哪一章？":"a",
    "云九天是哪个门派的师傅？":"c",
    "云问天在哪一章？":"a",
    "在洛阳萧问天那可以学习什么心法":"b",
    "在庙祝处洗杀气每次可以消除多少点？":"a",
    "在哪个npc处可以更改名字？":"a",
    "在哪个npc处领取免费消费积分？":"d",
    "在哪个npc处能够升级易容术？":"b",
    "在哪个NPC可以购买恢复内力的药品？":"c",
    "在哪个处可以更改名字？":"a",
    "在哪个处领取免费消费积分？":"d",
    "在哪个处能够升级易容术？":"b",
    "在哪里可以找到“香茶”？":"a",
    "在哪里捏脸提升容貌":"d",
    "在哪里消杀气？":"a",
    "在逍遥派能学到的技能是哪个？":"a",
    "在雪亭镇李火狮可以学习多少级柳家拳？":"b",
    "在战斗界面点击哪个按钮可以进入聊天界面？":"d",
    "在正邪任务中不能获得下面什么奖励？":"d",
    "怎么样获得免费元宝？":"a",
    "赠送李铁嘴银两能够增加什么？":"a",
    "张教主在明教哪个场景？":"d",
    "张三丰在哪一章":"d",
    "张三丰在武当山哪个场景？":"d",
    "张松溪在哪个地图？":"c",
    "张天师是哪个门派的师傅？":"a",
    "张天师在茅山哪个场景？":"d",
    "长虹剑在哪位npc那里获得？":"a",
    "长虹剑在哪位那里获得？":"a",
    "长剑在哪里可以购买？":"a",
    "正邪任务杀死好人增长什么？":"b",
    "正邪任务一天能做几次？":"a",
    "正邪任务中客商的在哪个地图？":"a",
    "正邪任务中卖花姑娘在哪个地图":"b",
    "正邪任务最多可以完成多少个？":"d",
    "支线对话书生上魁星阁二楼杀死哪个NPC给10元宝？":"a",
    "朱姑娘是哪个门派的师傅？":"a",
    "朱老伯在华山村哪个小地图？":"b",
    "追风棍可以在哪位npc那里获得？":"a",
    "追风棍在哪里获得？":"b",
    "紫宝石加什么属性？":"d",
    "钻石项链在哪获得？":"a"

};
function answerQuestionsFunc(){
    if(btnList["答题"].innerText == "答题"){
        console.log("准备自动答题！");
        answerQuestionsInterval = setInterval(answerQuestions, 1000);
        btnList["答题"].innerText = "停止";
    }else{
        console.log("停止自动答题！");
        btnList["答题"].innerText = "答题";
        clearInterval(answerQuestionsInterval);
    }
}

function answerQuestions(){
    if($('span:contains(每日武林知识问答次数已经)').text().slice(-46) == "每日武林知识问答次数已经达到限额，请明天再来。每日武林知识问答次数已经达到限额，请明天再来。") {
        // 今天答题结束了
        console.log("完成自动答题！");
        btnList["答题"].innerText = "答题";
        clearInterval(answerQuestionsInterval);
    }
    go('question');
    setTimeout(getAndAnsQuestion, 200); // 200 ms之后提取问题，查询答案，并回答
}

function getAndAnsQuestion(){
    // 提取问题
    //alert($(".out").text());
    var theQuestion = A = $(".out").text().split("题")[1].split("A")[0];
    // 左右去掉空格

    //var theQuestion = A = $(".out").text();
    //theQuestion=theQuestion.split("题")[1];
    //theQuestion=theQuestion.split("A.")[0];
    theQuestion=theQuestion.replace( /^\theQuestion*/, "");
    theQuestion=theQuestion.replace( /\theQuestion*$/, "");
    theQuestion=theQuestion.slice(1);
    //theQuestion = theQuestion.trim(" ","left").trim(" ","right");
    //alert(theQuestion);
    // 查找某个问题，如果问题有包含关系，则
    var theAnswer = getAnswer2Question(theQuestion);
    if (theAnswer !== "failed"){
        eval   ("go('question " + theAnswer + "')");
    }else{
        //alert("没有找到答案，请手动完成该题目！");
        console.log("停止自动答题！");
        btnList["答题"].innerText = "答题";
        clearInterval(answerQuestionsInterval);
        return;
    }
    setTimeout(printAnswerInfo, 200);

}
function printAnswerInfo(){
    console.log("完成一道武林知识问答：" );
    console.log($('span:contains(知识问答第)').text().split("继续答题")[0]);
}
function getAnswer2Question(localQuestion){
    // 如果找到答案，返回响应答案，a,b,c或者d
    // 如果没有找到答案，返回 "failed"

    var resultsFound = [];
    var countor = 0;
    for(var quest in QuestAnsLibs){
        if (isContains(quest, localQuestion)){ //包含关系就可
            resultsFound[countor] = quest;
            countor = countor +1;
        }else if(isContains(quest, localQuestion.replace("npc","")) || isContains(quest, localQuestion.replace("NPC",""))){

        }

    }
    if(resultsFound.length ==1){
        return QuestAnsLibs[resultsFound[0]];
    }
    else {
        console.log("题目 " + localQuestion + " 找不到答案或存在多个答案，请手动作答！");
        return "failed";
    }
}


// 刷碎片 ----------------------------
var SnakeName = 'luoyang_luoyang20';

function SnakeFunc(){
    if (! (counthead=prompt("请输入剩余数量","20"))){
        return;
    }
    go('jh 2;n;n;n;n;n;n;n;n;n;e;');
    go('kill ' + SnakeName);
    setTimeout(killsnake,500);
}


function killsnake(){
    if($('span:contains(胜利)').text().slice(-3) == '胜利！'){
        go('prev_combat');
        if(counthead > 1){
            counthead = counthead - 1;
            console.log('杀人一次，剩余杀人次数：%d！',counthead);
            go('kill ' + SnakeName);
        }
        else{
            console.log('刷完了！');
            go('home');
            return;  // 终止
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


//大昭壁画-------------------------
function MianBiFunc(){
    go('jh 26;w;w;n;w;w;w;n;n;e;event_1_12853448;home');
}


//一键侠客岛--------------------
function RiChangFunc(){
    if ($('.cmd_click_room')[0] === undefined || $('.cmd_click_room')[0].innerText !== "侠客岛渡口"){
        alert("你想干嘛？快送人家回“侠客岛渡口”！");
        return;
    }
    go('e;ne;ne;ne;e;e;e;event_1_9179222;e;event_1_11720543;w;n;e;e;s;e;event_1_44025101;');
    setTimeout(XiaKeFunc,2000);
}
// 判断出路
function XiaKeFunc(){
    if ($('span.outtitle')[0].innerText == "崖底")        // 重新跳
        XuanYaFunc();
    else if ($('span.outtitle')[0].innerText == "石门")   // 进门领悟
    {
        console.log("参悟石壁。");
        go('event_1_36230918;e;e;s;event_1_77496481;home;');
    }
    else{
        setTimeout(XiaKeFunc,2000);     // 2秒后重新检查出路
    }
}
// 重新跳崖
function XuanYaFunc(){
    console.log("姿势不对，大侠的屁股摔成了八瓣。。。");
    go('event_1_4788477;nw;w;sw;w;n;n;n;w;w;s;w;nw;ne;ne;ne;e;e;e;e;e;s;e;event_1_44025101');
    setTimeout(XiaKeFunc,2000);
    // 2秒后检查出路
}


// 苗疆-------------------------------------------------
function MiaojiangFunc(){
    go('jh 40;s;s;s;s;e;s;se;sw;s;sw;e;e;sw;se;sw;se;');
    console.log("铁索桥。");
    go('event_1_8004914;');
    setTimeout( Mjly2Func,6000);
}
function  Mjly2Func(){
    if (g_obj_map.get("msg_room").get("short") !== "澜沧江南岸"){
        console.log("重新跑。");
        setTimeout(MiaojiangFunc,100);
    }else{
        console.log("继续走。");
        go('se;s;s;e;n;n;e;s;e;ne;s;sw;e;e;ne;ne;nw;ne;ne;n;n;w;');
        setTimeout( Mjly3Func,5000);
    }
}
function  Mjly3Func(){
    if( isContains($('span.out2:contains(炼药的丹炉)').text().slice(-6), '明天再来吧！')){
       console.log("炼完了。");
       go('home');
	setTimeout(function(){BiShiTongRenFunc();},500);
    }else{
        go('lianyao;');
        setTimeout( Mjly3Func,6000);
    }
}

//比试铜人
var tongren=0 ;
function BiShiTongRenFunc(){
    if (tongren ==0 ){
        go('home;clan zsdg enter;n;n;n;n;n');
        go('enable mapped_skills restore 3;enable mapped_skills restore go 3;enable unmap_all;enforce 0;auto_equip off');
        go('event_1_14757697',1);  //挑战铜人 1
        //go('event_1_35095441',1);  //挑战铜人 2
        go('auto_equip on;auto_equip on;enable mapped_skills restore 1;enable mapped_skills restore go 1;enforce 1175');
        tongren =1;
    } else{
        go('home;clan zsdg enter;n;n;n;n;n;n;n;e;e;e;e;e;e;e;e;s;s;');
        go('enable mapped_skills restore 3;enable mapped_skills restore go 3;enable unmap_all;enforce 0;auto_equip off');
        go('event_1_35095441',1);  //挑战铜人 2
        go('auto_equip on;auto_equip on;enable mapped_skills restore 1;enable mapped_skills restore go 1;enforce 1175');
    }
}
//冰月谷-------------------------
function bingyueFunc(){
    go('jh 14;w;n;n;n;n;event_1_32682066;');
}

//天山打坐-------------------------
function Tsdz1Func(){
    go('jh 39;ne;e;n;ne;ne;n;ne;nw;event_1_58460791;');
    setTimeout(Tsdz2Func,5000);
}
function Tsdz2Func(){
    if (g_obj_map.get("msg_room")==undefined){
        setTimeout(function(){Tsdz2Func();},200);
    }else{
        var locationname=g_obj_map.get("msg_room").get("short");
        console.log(locationname);
        if (locationname=="失足岩"){
            console.log("继续走。");
            go('nw;n;ne;nw;nw;w;n;n;n;e;e;s;give tianshan_hgdz;ask tianshan_hgdz;ask tianshan_hgdz;s;event_1_34855843');
        }else{
            setTimeout(Tsdz1Func,200);
        }
    }
}
//杀孽龙-------------------------
function nielongFunc(){
    go('jh 15;n;nw;w;nw;n;event_1_14401179;');
}


//白驼军阵-------------------------
function pozhenFunc(){
    go('jh 21;n;n;n;n;w;');
}


//峨眉金狼-------------------------
function jinlangFunc(){
    alert("别忘了劳军\n\n1锭换朱果");
    go('jh 8;ne;e;e;e;n;');
}


//恒山杀神-------------------------
function shashenFunc(){
    go('jh 9;event_1_20960851;');
}




//-----------------------------------------------------------------------------------
var QLtrigger=0;
function listenQLFunc(){
   if (QLtrigger==0){
	   QLtrigger=1;
	   btnList['青龙'].innerText = '停止';
   }else if (QLtrigger==1){
	   QLtrigger=0;
	   btnList['青龙'].innerText = '青龙';
   }
}


var YXtrigger=0;
function listenYXFunc(){
   if (YXtrigger==0){
	   YXtrigger=1;
	   btnList['游侠'].innerText = '停止';
   }else if (YXtrigger==1){
	   YXtrigger=0;
	   btnList['游侠'].innerText = '游侠';
   }
}


function QinglongMon() {
        this.dispatchMessage = function(b) {
            var type = b.get("type"), subType = b.get("subtype");
            if (type == "channel" && subType == "sys") {
                var msg = g_simul_efun.replaceControlCharBlank(b.get("msg"));
                if (msg.indexOf("【系统】青龙会组织：[71-75区]") > -1 || msg.indexOf("游侠会：") > 0) {
                    var l = msg.match(/系统】青龙会组织：(.*)正在(.*)施展力量，本会愿出(.*)的战利品奖励给本场战斗的最终获胜者。/);
                    if (l&&QLtrigger==1) {
                        go_ql(l[2]);
                        alert('青龙:' + l[1] + " --- " + l [3] + "  " + l[2]);
                        return;
                    }

                    l = msg.match(/【系统】游侠会：听说(.*)出来闯荡江湖了，目前正在前往(.*)的路上。/);
                    if (l&&YXtrigger==1) {
                        go_yx(l[2]);
                        return;
                    }
                }
            }
        }
    }

    var qlMon = new QinglongMon;

    var ql_w = {
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
    	zx(ql_w[w]);
    }

    function go_yx(w){
        if (w.startsWith("雪亭镇")) {
            go("jh 1");
        } else if (w.startsWith("洛阳")) {
            go("jh 2");
        } else if (w.startsWith("华山村")) {
            go("jh 3");
        } else if (w.startsWith("华山")) {
            go("jh 4");
        } else if (w.startsWith("扬州")) {
            go("jh 5");
        } else if (w.startsWith("丐帮")) {
            go("jh 6");
        } else if (w.startsWith("乔阴县")) {
            go("jh 7");
        } else if (w.startsWith("峨眉山")) {
            go("jh 8");
        } else if (w.startsWith("恒山")) {
            go("jh 9");
        } else if (w.startsWith("武当山")) {
            go("jh 10");
        } else if (w.startsWith("晚月庄")) {
            go("jh 11");
        } else if (w.startsWith("水烟阁")) {
            go("jh 12");
        } else if (w.startsWith("少林寺")) {
            go("jh 13");
        } else if (w.startsWith("唐门")) {
            go("jh 14");
        } else if (w.startsWith("青城山")) {
            go("jh 15");
        } else if (w.startsWith("逍遥林")) {
            go("jh 16");
        } else if (w.startsWith("开封")) {
            go("jh 17");
        } else if (w.startsWith("明教")) {
            go("jh 18");
        } else if (w.startsWith("全真教")) {
            go("jh 19");
        } else if (w.startsWith("古墓")) {
            go("jh 20");
        } else if (w.startsWith("白驮山")) {
            go("jh 21");
        } else if (w.startsWith("嵩山")) {
            go("jh 22");
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

    function random_move() {
        var v = Math.random();
        if (v < 0.25) go("e")
        else if (v < 0.5) go("w")
        else if (v < 0.75) go("s")
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
            go("jh 2;n;n;e")
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

        webSocketMsg.prototype.old = gSocketMsg.dispatchMessage;

        gSocketMsg.dispatchMessage = function(b) {
            this.old(b);
            qlMon.dispatchMessage(b);
        }



buttonhideFunc();


// ==/UserScript==------------------------------------------------------------------------------------------------------------
// 跨服、秘境列表-------------------------------------------------------------------------------------------------------------
// 跨服、秘境列表-------------------------------------------------------------------------------------------------------------
// 跨服、秘境列表-------------------------------------------------------------------------------------------------------------
var btnList1 = {};// 按钮列表
var buttonWidth = '45px';// 按钮宽度
var buttonHeight = '20px';// 按钮高度
var currentPos = 30;// 当前按钮距离顶端高度，初始130
var delta = 25;// 每个按钮间隔
//按钮加入窗体中----------------------------
function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
}
function createButton1(btnName,func){
    btnList1[btnName]=document.createElement('button');
    var myBtn = btnList1[btnName];
    myBtn.innerText = btnName;
    myBtn.style.position = 'absolute';
    myBtn.style.left = '215px';
    myBtn.style.top = currentPos + 'px';
    currentPos = currentPos + delta;
    myBtn.style.width = buttonWidth;
    myBtn.style.height = buttonHeight;
    myBtn.addEventListener('click', func);
    document.body.appendChild(myBtn);
}

//按钮列表----------------------------------
createButton1('隐藏按钮',buttonhide1Func);
createButton1('战装',ZhuangBei);
createButton1('摸尸',AutoGetFunc);
createButton1('三气',AutoKillFunc);
createButton1('坏人',killHongMingTargetFunc);
createButton1('好人',killHuangMingTargetFunc);
createButton1('天剑',killTianJianTargetFunc);
createButton1('叫杀',jiaoshaFunc);
createButton1('恢复',yijianhuifuFunc);



//隐藏所有按钮的按钮----------------------------------
var buttonhiden=0;
function buttonhide1Func(){
    if (buttonhiden==0){
        buttonhiden=1;
        btnList1['隐藏按钮'].innerText = '☠';
        hideButton1();
    }else{
        buttonhiden=0;
        btnList1['隐藏按钮'].innerText = '隐';
        showButton1();
    }
}
function hideButton1(){
    btnList1['战装'].style.visibility="hidden";
    btnList1['摸尸'].style.visibility="hidden";
    btnList1['三气'].style.visibility="hidden";
    btnList1['坏人'].style.visibility="hidden";
    btnList1['好人'].style.visibility="hidden";
    btnList1['天剑'].style.visibility="hidden";
    btnList1['叫杀'].style.visibility="hidden";
    btnList1['恢复'].style.visibility="hidden";
}
function showButton1(){
    btnList1['战装'].style.visibility="visible";
    btnList1['摸尸'].style.visibility="visible";
    btnList1['三气'].style.visibility="visible";
    btnList1['坏人'].style.visibility="visible";
    btnList1['好人'].style.visibility="visible";
    btnList1['天剑'].style.visibility="visible";
    btnList1['叫杀'].style.visibility="visible";
    btnList1['恢复'].style.visibility="visible";
}


/*test:
go("jh 1;e;n;n");go("jh 2;n;n;n")
*/

//-------------------------分割线-----------

mySkillLists ="千影百伤棍||覆雨剑法||孔雀翎||无影毒阵||九天龙吟剑法||唐门毒功";

//-------------------------分割线-----------
var isDelayCmd = 1,// 是否延迟命令
    cmdCache = [],// 命令池
    timeCmd = null,// 定时器句柄
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


//战斗调用通用脚本----------------------------------------------------
var banSkills = "天师灭神剑|茅山道术";
function ninesword(){
    zdskill = mySkillLists;
    setTimeout(ninesword1,1000);
    if($('span.outbig_text:contains(战斗结束)').length>0){
        go('prev_combat');
    }
}
function ninesword1(){
    if (gSocketMsg.get_xdz()<3) return;
    // 如果找到设置的技能则释放
    for(var i = 1;i < 7;i++){
        skillName = $('#skill_'+i).children().children().text();
        if(skillName !== "" && isContains(zdskill, skillName)){
            console.log(skillName);
            go('playskill '+i);
            return;
        }
    }

    // 如果没找到设置技能，随便用一个非招bb的技能
    for(i = 1;i < 7;i++){
        skillName = $('#skill_'+i).children().children().text();
        if(skillName !== "" && !isContains(banSkills, skillName)){
            console.log(skillName);
            go('playskill '+i);
            return;
        }
    }
}

//-------------------------分割线-----------


// 换装备 -------------------------------------------------------
function ZhuangBei(){
    if(btnList1["战装"].innerText == '战装')
    { console.log("切换战斗装备！");
     go('auto_equip on');       // 一键装备
     go('unwield weapon_sb_sword10');       // 脱九天剑
     go('unwield weapon_sb_unarmed11');       // 脱破岳掌套
     go('unwield weapon_sb_unarmed10');       // 脱天罡
     go('unwield weapon_sb_sword11');       // 脱轩辕剑
     go('wield weapon_sb_sword10');       // 穿九天剑
     go('wield weapon_sb_sword11');        //穿轩辕剑
     go('wield weapon_sb_unarmed11');       // 穿破岳掌套
     go('wield weapon_sb_unarmed10');       // 穿天罡
     btnList1["战装"].innerText = '悟装';
    }
    else
    {console.log("切换打坐装备！");
     go('unwield weapon_sb_sword10');     // 脱九天龙吟剑
     go('unwield weapon_sb_sword11');       // 脱轩辕剑
     go('wear bow_luori');       // 落日弓
     go('wear langya_diaozhui');  //狼牙吊坠
     go('wear dream hat');  //戴帽子
     go('wield sword of windspring');       // 风泉
     go('wear longyuan banzhi moke');       // 龙渊
     btnList1["战装"].innerText = '战装';
    }
}


// 摸尸体----------------------------------------------------
function AutoGetFunc(){
    if(btnList1["摸尸"].innerText  == '摸尸'){
        var AutoGet_targetName = "尸体";
        AutoGet1Func();
        btnList1["摸尸"].innerText  = '不摸';}
    else{clearGet();
         {btnList1["摸尸"].innerText  = '摸尸';}
        }

    function AutoGet1Func(){
        AutoGet1IntervalFunc = setInterval(AutoGet1,300);
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


//自动三气战斗--------------------------
function AutoKillFunc(){
    if(btnList1["三气"].innerText  == '三气'){
        AutoKill1Func();
        btnList1["三气"].innerText  = '停';}
    else{clearKill2();
         {btnList1["三气"].innerText  = '三气';}
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
            go('prev_combat');
        }
    }
}

//叫杀--------------------------------
var SnakeName = '';

function jiaoshaFunc(){
    if (! (SnakeName=prompt("请输入叫杀人ID","1"))){
        return;
    }
    go('kill ' + SnakeName);
}




// 杀坏人----------------------------------------------------------------------------------------------------------------
var HongMingNPCList =["无『双』公主","[71-75区]恶棍", "[71-75区]流寇", "[71-75区]剧盗","[71-75区]云老四", "[71-75区]岳老三", "[71-75区]二娘","[71-75区]段老大","[71-75区]墟归一","[71-75区]上官晓芙","[71-75区]洪昭天", "[新区]恶1棍", "[新区]流1寇", "[新区]剧1盗","[新区]云1老四", "[新区]岳1老三", "[新区]二1娘","[新区]段老1大", "恶棍", "流寇", "云老四", "岳老三", "二娘","段老大","剧盗"];
var killHongMingIntervalFunc =  null;
var currentNPCIndex = 0;

function killHongMingTargetFunc(){
    zdskill =  null;
    if (btnList1["坏人"].innerText == '坏人'){
        currentNPCIndex = 0;
        console.log("开始杀红名目标NPC！");
        skillLists = mySkillLists;
        btnList1["坏人"].innerText ='停坏';
        killHongMingIntervalFunc = setInterval(killHongMing, 500);

    }else{
        console.log("停止杀红名目标NPC！");
        btnList1["坏人"].innerText ='坏人';
        clearInterval(killHongMingIntervalFunc);
    }
}

function killHongMing(){
    if ($('span').text().slice(-7) == "不能杀这个人。"){
        currentNPCIndex = currentNPCIndex + 1;
        console.log("不能杀这个人！");
    }
    getHongMingTargetCode();
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
    for(var i=0; i < peopleList.length; i++) { // 从第一个开始循环
        // 打印 NPC 名字，button 名，相应的NPC名
        thisonclick = peopleList[i].getAttribute('onclick');
        if (HongMingNPCList.contains(peopleList[i].innerText)){
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



// 杀好人----------------------------------------------------------------------------------------------------------------
var HuangMingNPCList = ["不『二』剑客","年兽","青竹蛇","[71-75区]王铁匠", "[71-75区]杨掌柜", "[71-75区]柳绘心", "[71-75区]柳小花", "[71-75区]卖花姑娘","[71-75区]刘守财","[71-75区]朱老伯","[71-75区]方老板", "[71-75区]客商","[71-75区]方寡妇","[71-75区]无一","[71-75区]花落云", "[71-75区]辰川","[71-75区]王世仲","[新区]王1铁匠", "[新区]杨1掌柜", "[新区]柳1绘心", "[新区]柳1小花", "[新区]卖1花姑娘","[新区]刘1守财","[新区]朱1老伯","[新区]方老1板", "[新区]客1商","[新区]方1寡妇", "王铁匠", "杨掌柜", "柳绘心", "柳小花", "卖花姑娘","刘守财","朱老伯","方老板", "客商","方寡妇"];
var killHuangMingIntervalFunc =  null;

var currentNPCIndex = 0;

function killHuangMingTargetFunc(){
    zdskill =  null;
    if (btnList1["好人"].innerText == '好人'){
        currentNPCIndex = 0;
        console.log("开始杀好人目标NPC！");
        skillLists = mySkillLists;
        btnList1["好人"].innerText ='停好';
        killHuangMingIntervalFunc = setInterval(killHuangMing, 500);

    }else{
        console.log("停止杀好人目标NPC！");
        btnList1["好人"].innerText ='好人';
        clearInterval(killHuangMingIntervalFunc);
    }
}

function killHuangMing(){
    if ($('span').text().slice(-7) == "不能杀这个人。"){
        currentNPCIndex = currentNPCIndex + 1;
        console.log("不能杀这个人！");
    }
    getHuangMingTargetCode();
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
    for(var i=0; i < peopleList.length; i++) { // 从第一个开始循环
        // 打印 NPC 名字，button 名，相应的NPC名
        thisonclick = peopleList[i].getAttribute('onclick');
        if (HuangMingNPCList.contains(peopleList[i].innerText)){
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

// 杀天剑----------------------------------------------------------------------------------------------------------------
var TianJianNPCList = ["不『二』剑客","无『双』公主","守山神兽", "守谷神兽", "饕餮幼崽", "饕餮王", "用用农作物", "镇谷神兽", "饕餮分身", "镇山神兽", "饕餮兽魂", "应龙幼崽", "镇殿神兽", "守殿神兽", "幽荧幼崽", "幽荧兽魂", "应龙兽魂", "镇潭神兽", "守潭神兽", "螣蛇幼崽", "螣蛇兽魂","天6剑", "天1剑真身", "虹2风", "虹3雨","虹4雷", "虹5电", "天剑谷卫士"];
var killTianJianIntervalFunc =  null;
var currentNPCIndex = 0;
function killTianJianTargetFunc(){
    zdskill =  mySkillLists;
    if (btnList1["天剑"].innerText == '天剑'){
        currentNPCIndex = 0;
        console.log("开始杀天剑目标NPC！");
        skillLists = mySkillLists;
        btnList1["天剑"].innerText ='停剑';
        killTianJianIntervalFunc = setInterval(killTianJian, 400);

    }else{
        console.log("停止杀天剑目标NPC！");
        btnList1["天剑"].innerText ='天剑';
        clearInterval(killTianJianIntervalFunc);
    }
}

function killTianJian(){
    var kee=parseInt(g_obj_map.get("msg_attrs").get("kee"));
		var max_kee=parseInt(g_obj_map.get("msg_attrs").get("max_kee"));
		var force=parseInt(g_obj_map.get("msg_attrs").get("force"));
		var max_force=parseInt(g_obj_map.get("msg_attrs").get("max_force"));
		console.log("血量是: "+kee+"/"+max_kee);
		console.log("内力是: "+force+"/"+max_force);
    if ($('span').text().slice(-7) == "不能杀这个人。"){
        currentNPCIndex = currentNPCIndex + 1;
        console.log("不能杀这个人！");
        //        return;
    }
    getTianJianTargetCode();
    //setTimeout(ninesword, 200);
    if($('span:contains(胜利)').text().slice(-3)=='胜利！' ) {
         currentNPCIndex = 0;
        console.log('杀人一次！');
        clickButton('prev_combat');
    }

    if( $('span:contains(战败了)').text().slice(-6)=='战败了...'){
        {
        currentNPCIndex = 0;
        console.log('杀人一次！');
        clickButton('prev_combat');
        }
        if (kee<max_kee){
			if (force>0)
			clickButton('recovery',0);
			else
			clickButton('items use snow_qiannianlingzhi');
			console.log("治疗中.....");
			setTimeout(function(){healFunc()},200);
		}else{
			if (force<max_force){
				clickButton('items use snow_qiannianlingzhi');
				console.log("治疗中.....");
				setTimeout(function(){healFunc()},200);
            }
        }

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
//一键恢复------------------------
var healtriger=0;
	function yijianhuifuFunc(){
	   if (healtriger==0){
		   healtriger=1;
		   btnList1["恢复"].innerText ='停止';
           healFunc();
	   }else{
		   btnList1["恢复"].innerText ='恢复';
		   healtriger=0;
	   }
	}

	function healFunc(){
		if (healtriger==0){
			return;
		}
		var kee=parseInt(g_obj_map.get("msg_attrs").get("kee"));
		var max_kee=parseInt(g_obj_map.get("msg_attrs").get("max_kee"));
		var force=parseInt(g_obj_map.get("msg_attrs").get("force"));
		var max_force=parseInt(g_obj_map.get("msg_attrs").get("max_force"));
		console.log("血量是: "+kee+"/"+max_kee);
		console.log("内力是: "+force+"/"+max_force);
		if (kee<max_kee){
			if (force>0)
			clickButton('recovery',0);
			else
			clickButton('items use snow_qiannianlingzhi');
			console.log("治疗中.....");
			setTimeout(function(){healFunc()},200);
		}else{
			if (force<max_force){
				clickButton('items use snow_qiannianlingzhi');
				console.log("治疗中.....");
				setTimeout(function(){healFunc()},200);
			}else{
				btnList1["恢复"].innerText ='恢复';
		   		healtriger=0;
			}
		}
	}

buttonhide1Func();
// ==/UserScript==------------------------------------------------------------------------------------------------------------
// 跨服、秘境列表-------------------------------------------------------------------------------------------------------------
var btnList3 = {};       // 按钮列表
var buttonWidth = '45px';   // 按钮宽度
var buttonHeight = '20px';  // 按钮高度
var currentPos = 30;        // 当前按钮距离顶端高度，初始130
var delta = 25;                 // 每个按钮间隔
//按钮加入窗体中----------------------------
function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
}
function createButton3(btnName,func){
    btnList3[btnName]=document.createElement('button');
    var myBtn = btnList3[btnName];
    myBtn.innerText = btnName;
    myBtn.style.position = 'absolute';
    myBtn.style.right = '0px';
    myBtn.style.top = currentPos + 'px';
    currentPos = currentPos + delta;
    myBtn.style.width = buttonWidth;
    myBtn.style.height = buttonHeight;
    myBtn.addEventListener('click', func);
    document.body.appendChild(myBtn);
}
//按钮列表----------------------------------
createButton3('隐藏辅助',buttonhide3Func);
createButton3('宝石',HebaoshiFunc);
createButton3('包裹',clearBag);
createButton3('天策',zoutianceFunc);
createButton3('凌烟',zoulingyanFunc);
createButton3('观海',zouguanhaiFunc);
createButton3('酒馆',zoufenghuaFunc);
createButton3('云远',yunyuanTempleFunc);
createButton3('易容',leanYirongFunc);
createButton3('磕头',DLKTFunc);
createButton3('凤泉',fengquanFunc);
createButton3('买药',YaopuFunc);
createButton3('飞秘',goMijing);
createButton3('优化',mijingFunc);
createButton3('琅嬛',langhuanFunc);
createButton3('无尽',wujinFunc);
createButton3('地宫',dixiamigongFunc);
createButton3('撩果',QiXiaTalkFunc);
//隐藏所有按钮的按钮----------------------------------
var buttonhiden=0;
function buttonhide3Func(){
    if (buttonhiden==0){
        buttonhiden=1;
        btnList3['隐藏辅助'].innerText = '✟';
        hideButton3();
    }else{
        buttonhiden=0;
        btnList3['隐藏辅助'].innerText = '隐';
        showButton3();
    }
}
function hideButton3(){
    btnList3['宝石'].style.visibility="hidden";
    btnList3['包裹'].style.visibility="hidden";
    btnList3['天策'].style.visibility="hidden";
    btnList3['凌烟'].style.visibility="hidden";
    btnList3['观海'].style.visibility="hidden";
    btnList3['酒馆'].style.visibility="hidden";
    btnList3['云远'].style.visibility="hidden";
    btnList3['易容'].style.visibility="hidden";
    btnList3['磕头'].style.visibility="hidden";
    btnList3['凤泉'].style.visibility="hidden";
    btnList3['买药'].style.visibility="hidden";
    btnList3['飞秘'].style.visibility="hidden";
    btnList3['优化'].style.visibility="hidden";
    btnList3['琅嬛'].style.visibility="hidden";
    btnList3['无尽'].style.visibility="hidden";
    btnList3['地宫'].style.visibility="hidden";
    btnList3['撩果'].style.visibility="hidden";
}
function showButton3(){
    btnList3['宝石'].style.visibility="visible";
    btnList3['包裹'].style.visibility="visible";
    btnList3['天策'].style.visibility="visible";
    btnList3['凌烟'].style.visibility="visible";
    btnList3['观海'].style.visibility="visible";
    btnList3['酒馆'].style.visibility="visible";
    btnList3['云远'].style.visibility="visible";
    btnList3['易容'].style.visibility="visible";
    btnList3['磕头'].style.visibility="visible";
    btnList3['凤泉'].style.visibility="visible";
    btnList3['买药'].style.visibility="visible";
    btnList3['飞秘'].style.visibility="visible";
    btnList3['优化'].style.visibility="visible";
    btnList3['琅嬛'].style.visibility="visible";
    btnList3['无尽'].style.visibility="visible";
    btnList3['地宫'].style.visibility="visible";
    btnList3['撩果'].style.visibility="visible";
}
// 合宝石 -------------------------------------------------------
function HebaoshiFunc(){
   go('items hecheng hongbaoshi1_N_10;items hecheng hongbaoshi1_N_10;items hecheng hongbaoshi1_N_10');
   go('items hecheng lanbaoshi1_N_10;items hecheng lanbaoshi1_N_10;items hecheng lanbaoshi1_N_10');
   go('items hecheng zishuijing1_N_10;items hecheng zishuijing1_N_10;items hecheng zishuijing1_N_10');
   go('items hecheng hongbaoshi1_N_1;items hecheng hongbaoshi1_N_1;items hecheng hongbaoshi1_N_1');
   go('items hecheng lanbaoshi1_N_1;items hecheng lanbaoshi1_N_1;items hecheng lanbaoshi1_N_1');
   go('items hecheng zishuijing1_N_1;items hecheng zishuijing1_N_1;items hecheng zishuijing1_N_1');


   go('items hecheng hongbaoshi2_N_1;items hecheng hongbaoshi2_N_1;items hecheng hongbaoshi2_N_1');
   go('items hecheng lanbaoshi2_N_1;items hecheng lanbaoshi2_N_1;items hecheng lanbaoshi2_N_1');
   go('items hecheng zishuijing2_N_1;items hecheng zishuijing2_N_1;items hecheng zishuijing2_N_1');



  /*
    go "hongbaoshi1_n_10", "hecheng");
    zhengli("碎裂的红宝石", "hongbaoshi1_n_1", "hecheng");
    zhengli("裂开的红宝石", "hongbaoshi2_n_10", "hecheng");
    zhengli("裂开的红宝石", "hongbaoshi2_n_1", "hecheng");
    zhengli("红宝石","hongbaoshi3_n_10", "hecheng");
    zhengli("红宝石","hongbaoshi3_n_1", "hecheng");
    zhengli("碎裂的蓝宝石", "lanbaoshi1_n_10", "hecheng");
    zhengli("碎裂的蓝宝石", "lanbaoshi1_n_1", "hecheng");
    zhengli("裂开的蓝宝石", "lanbaoshi2_n_10", "hecheng");
    zhengli("裂开的蓝宝石", "lanbaoshi2_n_1", "hecheng");
    zhengli("蓝宝石","lanbaoshi3_n_10", "hecheng");
    zhengli("蓝宝石","lanbaoshi3_n_1", "hecheng");
    zhengli("碎裂的紫宝石", "lanbaoshi1_n_10", "hecheng");
    zhengli("碎裂的紫宝石", "lanbaoshi1_n_1", "hecheng");
    zhengli("裂开的紫宝石", "lanbaoshi2_n_10", "hecheng");
    zhengli("裂开的紫宝石", "lanbaoshi2_n_1", "hecheng");
    zhengli("紫宝石","lanbaoshi3_n_10", "hecheng");
    zhengli("紫宝石","lanbaoshi3_n_1", "hecheng");

    zhengli("碎裂的绿宝石", "lvbaoshi1", "put_store");
    zhengli("裂开的绿宝石", "lvbaoshi2", "put_store");
    zhengli("绿宝石","lvbaoshi3", "put_store");
    zhengli("碎裂的黄宝石", "huangbaoshi1", "put_store");
    zhengli("裂开的黄宝石", "huangbaoshi2", "put_store");
    zhengli("黄宝石",      "huangbaoshi3", "put_store");
*/
      }

// 包裹整理 ------
var clb_time;
var clb_flag=true;
function clearBag(){
    clb_flag=false;
    go('items',0);
    clearInterval(clb_time);
    clb_time=setInterval(clearitem,400);
}
var items_use='茉莉汤 云梦青冰糖葫芦青凤纹绶 热血印 风云宝箱 腊百草美酒元宵 年糕 高级狂暴丹特级狂暴丹保险卡特级大还丹高级大还丹小还丹百年紫芝百年灵草特级乾坤再造丹高级乾坤再造丹玫瑰花神秘宝箱冰镇酸梅汤';
var items_store='长生石-千年紫芝千年灵草驻颜丹烧香符帮派令周年礼券玄重铁百宝令江湖令师门令谜题令正邪令状元贴白银宝箱黄金宝箱铂金宝箱高级乾坤袋装备打折卡碎片武穆遗书黄金钥匙鎏金黑玉锥曜玉钥匙铂金钥匙赤璃钥匙玄铁令';
//冰月羽-
var items_study='御蜂术左手兵刃研习';
var items_splite='翎眼赤护青鸾护臂苍狼护臂宝玉甲 天寒匕 貂皮斗篷 白玉腰束 无心匕 玄武盾 月光宝甲 沧海护腰 夜行披风虎皮腰带红光匕金丝甲羊毛斗篷破军盾金丝甲疯魔杖毒龙鞭玉清棍生死符霹雳掌套血屠刀残雪帽残雪戒残雪鞋残雪手镯残雪项链金丝宝甲衣';
var items_sell='漫天花雨匕三清神冠七星翻云靴咒剑王□鲜红锦衣牛皮靴八角锤灰雁七星宝戒船桨白金项链断云斧乌夷长裙红色绸裙包子大剪刀黑水伏蛟帝王剑麻布手套银丝帽吴钩绵裙铜钹大刀紫袍铁笛圣火令绿罗裙绣花针清心散垓下刀紫金杖阿拉伯弯刀青锋剑青布袍淑女剑紫霜血蝉衣软金束带穿花蛇影鞋魔鞭翩珑大红僧袍九环禅杖精铁棒毒蒺藜暗灵桃木剑横断钩银丝链甲衣天魔刀玉竹杖叫化鸡七星剑逆钩匕银丝甲天寒帽天寒戒天寒鞋天寒项链天寒手镯软甲衣金刚杖飞羽剑斩空刀拜月掌套金弹子新月棍白蟒鞭硫磺木戟黑袍粗布白袍长戟回旋镖拂尘松子白色棋子黑色棋子竹节鞭白棋子木叉银色丝带波斯长袍铁鞭竹刀长虹剑莲蓬鲤鱼窄裉袄灵芝锦衣台夷头巾毛毯废焦丹废药渣台夷头巾粉红绸衫灰燕野山鸡麻雀岩鸽瑶琴维吾尔族长袍旧书桃符纸木锤木钩竹鞭木刀木枪木剑彩巾彩靴彩帽彩带彩镯彩衣砍刀绣花鞋舞蝶彩衫军刀铁扇剑割鹿刀大理雪梨圆领小袄皮帽弯月刀兔肉粗磁大碗羊肉串天山雪莲青铜盾禅杖金刚罩丝质披风暗箭青葫芦松子铁斧水蜜桃蓑衣破弯刀柴刀丝衣长鞭道德经布裙钢丝甲衣牛皮带制服金刚杖斩空刀拜月掌套金弹子新月棍白蟒鞭-草莓玉蜂浆玉蜂蜜蜂浆瓶豆浆蛋糕菠菜粉条包裹鸡叫草水密桃--新月棍银簪重甲羊角匕梅花匕日月神教腰牌船篙-丝绸马褂白缨冠白色长袍蛇杖鬼头刀拐杖古铜缎子袄裙大环刀鹿皮手套丝绸衣羊毛裙牧羊鞭牛皮酒袋麻带钢剑钢杖藤甲盾长斗篷军袍破披风木盾铁盾锦缎腰带鞶革青色道袍-鲫鱼树枝水草破烂衣服-鹿皮小靴青绫绸裙粗布衣草帽草鞋布鞋精铁甲-柳玉刀玉竹剑钢刀戒刀单刀长剑长枪铁锤木棍轻罗绸衫兽皮鞋皮鞭铁棍飞镖匕首细剑绣鞋绣花小鞋狼皮雪靴金戒金手镯铁戒银戒铁手镯银手镯铁项链银项链';

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
// 天策府----------------------------------------------------
function zoutianceFunc(){
    go('jh 2;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;w;w;w;w;n;n;');

}
// 凌烟阁----------------------------------------------------
function zoulingyanFunc(){
    go('jh 2;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;e;e;e;e;e;e;n;n;n;n;n;n;n;n;n;n;n;n;n;n;');

}
// 观海庄----------------------------------------------------
function zouguanhaiFunc(){
    go('jh 2;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;e;');

}
// 风花酒馆----------------------------------------------------
function zoufenghuaFunc(){
   go('jh 2;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;w;w;w;w;s;s;w;');

}
//去云远寺-------------------------
function yunyuanTempleFunc(){
    go('jh 2;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;w;s;s;s;s;e;event_1_2215721');

}
//学习易容--------------------------
function leanYirongFunc(){
    if (! (counthead=prompt("请输入学习等级","20"))){
        return;
    }
    go('event_1_66277068;')
    setTimeout(lean,500);
}

function lean(){

        if(counthead > 1){
            counthead = counthead - 1;

           go('event_1_66277068;')
        }
        else{
            console.log('学完了！');
            return;  // 终止
        }

    setTimeout(lean,500);
}

//刀楼磕头------------------------------
function DLKTFunc(){
    if (! (counthead=prompt("请输入磕头次数","20"))){
        return;
    }
    go('event_1_55800414;')
    setTimeout(lean1,500);
}

function lean1(){

        if(counthead > 1){
            counthead = counthead - 1;

           go('event_1_55800414;')
        }
        else{
            console.log('学完了！');
            return;  // 终止
        }

    setTimeout(lean1,500);
}
// 打凤泉----------------------------------------------------
function fengquanFunc(){
    go("jh 7;s;s;s;s;s;s;s;s;e;n;e;s;e;kill scholar_master");
}
//买千年----------------------------------------------------
function YaopuFunc(){
		var count_qn = prompt("请输入购买千年灵芝的数量",50);
    var buy = "";
    for(var i=0;i<count_qn/10;i++)
	{
		buy = buy + "buy /map/snow/obj/qiannianlingzhi_N_10 from snow_herbalist;";
	}
    go('jh 1;e;n;n;n;w;'+buy + "home");
    go('jh 1;e;n;n;n;w;buy snow_herbalist');
}
//飞秘境-------------------------------------------------------------------------------------------------------------
function goMijing(){
	if($('span.out2:contains(应当会有发现……):last').length>0){
		//console.log($('span.out2:contains(应当会有发现……):last'));
		var mijing = $('span.out2:contains(应当会有发现……):last').text();
		if (isContains(mijing,"山坳"))
		{
			go("jh 1;e;n;n;n;n;n;n");
		}else if(isContains(mijing,"临渊石台"))
		{
			go("jh 4;n;n;n;n;n;n;n;n;n;e;n");
		}
		else if(isContains(mijing,"桃花泉"))
		{
			go("jh 3;s;s;s;s;s;nw;n;n;e");
		}
		else if(isContains(mijing,"潭畔草地"))
		{
			go("jh 4;n;n;n;n;n;n;n;event_1_91604710;s;s;s;");
		}
		else if (isContains(mijing,"长空栈道"))
		{
			go("jh 4;n;n;n;n;n;n;n;n;n;e;");
		}else if (isContains(mijing,"猢狲愁"))
		{
			go("jh 4;n;n;n;n;n;n;e;n;n");
		}else if (isContains(mijing, "千尺幢"))
		{
			go("jh 4;n;n;n;n");
		}
		else if (isContains(mijing,"玉女峰"))
		{
			go("jh 4;n;n;n;n;n;n;n;n;w");
		}
		else if(isContains(mijing,"沙丘小洞"))
		{
			go("jh 6;event_1_98623439;ne;n;ne;ne;ne;event_1_97428251");
		}
		else if(isContains(mijing,"小洞天"))
		{
			go("jh 24;n;n;n;n;e;e;")
		}
		else if(isContains(mijing,"戈壁"))
		{
			go("jh 21");
		}
		else if(isContains(mijing,"青云坪"))
		{
			go("jh 13;e;s;s;w;w;");
		}
		else if(isContains(mijing,"九老洞"))
		{
			go("jh 8;w;nw;n;n;n;n;e;e;n;n;e");
		}else if (isContains(mijing,"草原"))
		{
			go("jh 26;w;");
		}else if(isContains(mijing,"天梯"))
		{
			go("jh 24;n;n;n;");
		}else if(isContains(mijing,"湖边"))
		{
			go("jh 16;s;s;s;s;e;n;e;event_1_5221690;s;w");
		}else if(isContains(mijing,"观景台"))
		{
			go("jh 24;n;n;n;n;n;n;n;n;n;n;n;n;e;e;n");
		}else if(isContains(mijing,"山溪畔"))
		{
			go("jh 22;n;n;w;n;n;n;n;event_1_88705407;s;s;");
		}else if(isContains(mijing,"碧水寒潭"))
		{
			go("jh 18;n;nw;n;n;n;n;n;ne;n;n;n;n;n;n;e;e;s;se;se;e;");
		}else if(isContains(mijing,"卢崖瀑布"))
		{
			go("jh 22;n;n;n;escape;n;e;n;");
		}else if(isContains(mijing,"悬根松"))
		{
			go("jh 9;n;w;");
		}else if(isContains(mijing,"夕阳岭"))
		{
			go("jh 9;n;n;e");
		}else if(isContains(mijing,"玉壁瀑布"))
		{
			go("jh 16;s;s;s;s;e;n;e;");
	    }else if(isContains(mijing,"危崖前"))
		{
			go("jh 25;w;");
		}else if(isContains(mijing,"启母石"))
		{
			go("jh 22;n;n;w;w;");
		}else if (isContains(mijing,"无极老姆洞"))
		{
			go("jh 22;n;n;w;n;n;n;n;");
		}
		else if(isContains(mijing,"奇槐坡"))
		{
			go("jh 23;n;n;n;n;n;n;n;n;");
		}else if(isContains(mijing,"云步桥"))
		{
			go("jh 24;n;n;n;n;n;n;n;n;n;");
		}else if(isContains(mijing,"悬崖"))
		{
			go("jh 20;w;w;s;e;s;s;s;s;s;sw;sw;s;s;e");
		}
		else if(isContains(mijing,"寒水潭"))
		{
			go("jh 20;w;w;s;e;s;s;s;s;s;sw;sw;s;e;se;");
		}else if (isContains(mijing,"危涯前"))
		{
		   go("jh 25;w;");
		}else if (isContains(mijing,"无名山峡谷"))
		{
			go("jh 29;n;n;n;n;event_1_60035830;event_1_65661209");
		}
		else
		{
			alert("没找到秘境路径，请手动前往！");
		}

    }else{
		alert("还没接到秘境！");
	}
}



// 秘境优化----------------------------------------------------------------------------------------------------------------
function mijingFunc(){
    var roominfor=g_obj_map.get("msg_room").get("map_id");
    var mijingid=["tianlongshan","dafuchuan","fomenshiku","dilongling","luanshishan","lvzhou","taohuadu","daojiangu","baguamen","lvshuige"];
    if (mijingid.indexOf(roominfor)==-1){
        alert("当前秘境不支持优化。");
        return;
    }else{
        clickButton(roominfor+'_saodang',0);//点击扫荡 按钮一次;
        startOptimize(roominfor);
    }
}
function startOptimize(roominfor){
    var promt=g_obj_map.get("msg_prompt");
    console.log(roominfor);


    if (promt==undefined){
        setTimeout(function(){startOptimize(roominfor)},500);
    }else{
        var msg=promt.get("msg");
        var zhuguo=parseInt(msg.split("朱果")[1].split("。")[0].split("x")[1]);
        if (zhuguo==0){
            alert("当前扫荡出错了。");
            return;
        }else{
            console.log("目前朱果为:"+zhuguo);
            if (roominfor=="daojiangu"){
                if (zhuguo>=1535){
                    clickButton(roominfor+'_saodang go',0);
                }else{
                    clickButton(roominfor+'_saodang',0);
                    setTimeout(function(){startOptimize(roominfor)},500);
                }
            }else if (roominfor=="taohuadu"){
                if (zhuguo>=1785){
                    clickButton(roominfor+'_saodang go',0);
                }else{
                    clickButton(roominfor+'_saodang',0);
                    setTimeout(function(){startOptimize(roominfor)},500);
                }
            }else if (roominfor=="lvshuige"){
                if (zhuguo>=1255){
                    clickButton(roominfor+'_saodang go',0);
                }else{
                    clickButton(roominfor+'_saodang',0);
                    setTimeout(function(){startOptimize(roominfor)},500);
                }
            }else if (roominfor=="lvzhou"){
                if (zhuguo>=2035){
                    clickButton(roominfor+'_saodang go',0);
                }else{
                    clickButton(roominfor+'_saodang',0);
                    setTimeout(function(){startOptimize(roominfor)},500);
                }
            }else if (roominfor=="luanshishan"){
                if (zhuguo>=2350){
                    clickButton(roominfor+'_saodang go',0);
                }else{
                    clickButton(roominfor+'_saodang',0);
                    setTimeout(function(){startOptimize(roominfor)},500);
                }
            }else if (roominfor=="dilongling"){
                if (zhuguo>=2385){
                    clickButton(roominfor+'_saodang go',0);
                }else{
                    clickButton(roominfor+'_saodang',0);
                    setTimeout(function(){startOptimize(roominfor)},500);
                }
            }else if (roominfor=="fomenshiku"){
                if (zhuguo>=2425){

                    clickButton(roominfor+'_saodang go',0);

                }else{
                    clickButton(roominfor+'_saodang',0);
                    setTimeout(function(){startOptimize(roominfor)},500);
                }
            }else if (roominfor=="dafuchuan"){
                if (zhuguo>=3090){
                    clickButton(roominfor+'_saodang go',0);
                }else{
                    clickButton(roominfor+'_saodang',0);
                    setTimeout(function(){startOptimize(roominfor)},500);
                }
            }else if (roominfor=="tianlongshan"){
                if (zhuguo>=3100){
                    clickButton(roominfor+'_saodang go',0);
                }else{
                    clickButton(roominfor+'_saodang',0);
                    setTimeout(function(){startOptimize(roominfor)},500);
                }
            }else if (roominfor=="baguamen"){
                if (zhuguo>=3635){
                    clickButton(roominfor+'_saodang go',0);
                }else{
                    clickButton(roominfor+'_saodang',0);
                    setTimeout(function(){startOptimize(roominfor)},500);
                }
            }
        }
    }
}

//琅嬛玉洞--------------------------------------------------
function langhuanFunc(){
    go("event_1_61856223;nw;event_1_92817399;nw;event_1_92817399;w;event_1_91110342;s;event_1_74276536;se;event_1_14726005;sw;event_1_66980486;nw;event_1_39972900;nw;event_1_61689122;w;event_1_19336706;s;event_1_30457951;sw;event_1_96023188;s;");
}

// 无尽深渊-------------------------------------------------
function wujinFunc(){
    go("event_1_73460819;event_1_26155795;e;event_1_87937025;e;event_1_53431345;s;event_1_37624225;w;event_1_8619086;w;event_1_141449;s;event_1_18895106;s;event_1_99645595;e;event_1_68019423;n;event_1_20713310;e;event_1_34346484;s;event_1_97755427;e;event_1_5643169;e;event_1_62284753;n;event_1_36602188;w;event_1_61213429;n;event_1_47421759;e;event_1_66484319;n;event_1_65370482;w;");
}

// 地下迷宫-------------------------------------------------
function dixiamigongFunc(){
    go("event_1_82876458;e;event_1_82876458;e;event_1_82876458;s;event_1_82876458;w;event_1_82876458;w;event_1_82876458;s;event_1_82876458;e;event_1_82876458;e;event_1_82876458;s;event_1_82876458;w;event_1_82876458;w;event_1_82876458;w;event_1_82876458;n;event_1_82876458;n;event_1_82876458;n;event_1_82876458;n;event_1_82876458;");
}

//撩奇侠--------------------------
var QXretried=0;
var QXStop=0;
var QXTalkcounter=1;
var QxTalking=0;
function GetQXID(name,QXindex){
    if (QXStop==1&&qinmiFinished==1){
        return;
    }else if (g_obj_map.get("msg_room")==undefined||QXStop==1){
        setTimeout(function(){GetQXID(name,QXindex);},500);
    }else{
        console.log("开始寻找"+name+QXindex);
        var QX_ID = "";
        var npcindex=0;
        var els=g_obj_map.get("msg_room").elements;
        for (var i = els.length - 1; i >= 0; i--) {
            if (els[i].key.indexOf("npc") > -1) {
                if (els[i].value.indexOf(",") > -1) {
                    var elsitem_ar = els[i].value.split(',');
                    if (elsitem_ar.length > 1 && elsitem_ar[1] == name) {
                        console.log(elsitem_ar[0]);
                        npcindex=els[i].key;
                        QX_ID = elsitem_ar[0];
                    }
                }
            }
        }
        if (QX_ID==null||QX_ID==undefined||QX_ID==0){
            clickButton('find_task_road qixia '+QXindex);
            setTimeout(function(){GetQXID(name,QXindex);},500);
        }else{
            console.log("找到奇侠编号"+QX_ID);
            if (QXTalkcounter<=5){
                console.log("开始与"+name+"第"+QXTalkcounter+"对话")
                QXTalkcounter++;
                clickButton('ask '+QX_ID);
                clickButton('find_task_road qixia '+QXindex);
                setTimeout(function(){GetQXID(name,QXindex)},500);
            }else if (QXTalkcounter>5){
                QXTalkcounter=1;
                console.log("与"+name+"对话完成");
                QixiaTotalCounter++;
                console.log("GetQXid:奇侠第"+QixiaTotalCounter+"号状态：" + finallist[QixiaTotalCounter]);
                if (QixiaTotalCounter>24){
                    alert("今日奇侠已经完成");
                }else{
                    console.log("下一个目标是"+finallist[QixiaTotalCounter]["name"]);
                }
                talktoQixia();
            }
        }

    }
}
var QixiaTotalCounter=0;
function TalkQXBase(name,QXindex){
    var QX_NAME = name;
    console.log("开始撩" + QX_NAME + "！");
    if (g_obj_map.get("msg_room")!=undefined)
        g_obj_map.get("msg_room").clear();
    overrideclick('find_task_road qixia ' + QXindex);
    overrideclick('golook_room');
    setTimeout(function(){GetQXID(QX_NAME,QXindex);},500);
}

function TalkLangHuanYu(){
    // 0 浪欢愉
    if (QXStop==1){
        return;
    }
    TalkQXBase("浪唤雨",0);
}
function TalkWangRong(){
    // 1 王蓉，要果子
    if (QXStop==1){
        return;
    }
    TalkQXBase("王蓉",1);
}
function TalkPangTong(){
    // 2 庞统
    if (QXStop==1){
        return;
    }
    TalkQXBase("庞统",2);
}
function TalkLiYuFei(){
    // 3 李宇飞，要果子
    if (QXStop==1){
        return;
    }
    TalkQXBase("李宇飞",3);
}
function TalkBuJingHong(){
    //4  步惊魂
    if (QXStop==1){
        return;
    }
    TalkQXBase("步惊鸿",4);
}
function TalkFengXingJu(){
    //5 风行骓
    if (QXStop==1){
        return;
    }
    TalkQXBase("风行骓",5);
}
function TalkGuoJI(){
    // 6 郭记
    if (QXStop==1){
        return;
    }
    TalkQXBase("郭济",6);
}
function TalkWuZhen(){
    // 7 吴缜
    if (QXStop==1){
        return;
    }
    TalkQXBase("吴缜",7);
}
function TalkFengNan(){
    // 8 凤南
    if (QXStop==1){
        return;
    }
    TalkQXBase("风南",8);
}
function TalkHuoYunXieShen(){
    //9 火云邪神
    if (QXStop==1){
        return;
    }
    TalkQXBase("火云邪神",9);
}
function TalkNiFengWu(){
    //10 逆风舞
    if (QXStop==1){
        return;
    }
    TalkQXBase("逆风舞",10);
}
function TalkCangGuYan(){
    //11 狐苍雁
    if (QXStop==1){
        return;
    }
    TalkQXBase("狐苍雁",11);
}
function TalkHuZhu(){
    //12 护竺
    if (QXStop==1){
        return;
    }
    TalkQXBase("护竺",12);
}
function TalkXuanYueYan(){
    //13 玄月研
    if (QXStop==1){
        return;
    }
    TalkQXBase("玄月研",13);
}
function TalkLangJuXu(){
    //14 狼居胥
    if (QXStop==1){
        return;
    }
    TalkQXBase("狼居胥",14);
}
function TalkLieJiuZhou(){
    //15 烈九州
    if (QXStop==1){
        return;
    }
    TalkQXBase("烈九州",15);
}
function TalkMuMiaoYu(){
    //16 穆妙羽
    if (QXStop==1){
        return;
    }
    TalkQXBase("穆妙羽",16);
}
function TalkYuWenWuDi(){
    //17 宇文无敌
    if (QXStop==1){
        return;
    }
    TalkQXBase("宇文无敌",17);
}
function TalkLiXuanBa(){
    //18 李玄霸
    if (QXStop==1){
        return;
    }
    TalkQXBase("李玄霸",18);
}
function TalkBaBuLongJiang(){
    //19 八部龙将
    if (QXStop==1){
        return;
    }
    TalkQXBase("八部龙将",19);
}
function TalkFengWuHen(){
    //20 风无痕
    if (QXStop==1){
        return;
    }
    TalkQXBase("风无痕",20);
}
function TalkLiCangRuo(){
    //21 厉沧若
    if (QXStop==1){
        return;
    }
    TalkQXBase("厉沧若",21);
}
function TalkXiaYueQing(){
    //22 夏岳卿
    if (QXStop==1){
        return;
    }
    TalkQXBase("夏岳卿",22);
}
function TalkMiaoWuXin(){
    //23 妙无心
    if (QXStop==1){
        return;
    }
    TalkQXBase("妙无心",23);
}
function TalkWuYeJi(){
    //24 巫夜姬
    if (QXStop==1){
        return;
    }
    TalkQXBase("巫夜姬",24);
}
var currentTime  = 0;
var delta_Time = 2000;
var QXStop=0;
var qinmiFinished=0;
var QiXiaList=[];
function QXWhisper(){
    this.dispatchMessage=function(b){
        var type = b.get("type"), subtype = b.get("subType");
        if (type=="notice"){
            var msg=g_simul_efun.replaceControlCharBlank(b.get("msg"));
            if (msg.match("对你悄声道")!=null){
                QXStop=1;
                alert(msg);
                QiXiaTalkButton.innerText = '继续奇侠';
            }
            console.log(msg);
        }else if (type=="main_msg"){
            var msg=g_simul_efun.replaceControlCharBlank(b.get("msg"));
            if (msg.match("今日亲密度操作次数")!=null){
                var qinmi=parseInt(msg.split("(")[1].split("/")[0]);
                if (qinmi==20){
                    QXStop=1;
                    qinmiFinished=1;
                    alert("今日亲密度操作已经达到20，奇侠功能暂停。再次使用请重新点击开始领取果子。");
                    QXTalking=0;
                }
            }
        }
    }
}
var whipser=new QXWhisper;
function GetQiXiaList(){
    var html=g_obj_map.get("msg_html_page");
    QxTalking=1;
    if (html==undefined){
        setTimeout(function(){GetQiXiaList();},500);
    }else if(g_obj_map.get("msg_html_page").get("msg").match("江湖奇侠成长信息")==null){
        setTimeout(function(){GetQiXiaList();},500);
    }else{
        QiXiaList=formatQx(g_obj_map.get("msg_html_page").get("msg"));
        console.log(QiXiaList);
        SortQiXia();
    }
}
function SortQiXia(){//冒泡法排序
    var temp={};
    var temparray=[];
    var newarray=[];
    for (var i=0;i<QiXiaList.length;i++){
        for (var j=1;j<QiXiaList.length-i;j++){
            if (parseInt(QiXiaList[j-1]["degree"])<parseInt(QiXiaList[j]["degree"])){
                temp=QiXiaList[j-1];
                QiXiaList[j-1]=QiXiaList[j];
                QiXiaList[j]=temp;
            }
        }
    }
    var tempcounter=0;
    console.log("奇侠好感度排序如下:");
    console.log(QiXiaList);
    //首次排序结束 目前是按照由小到大排序。现在需要找出所有的超过25000 小于30000的奇侠。找到后 排序到最上面；
    for (var i=0;i<QiXiaList.length;i++){
        if (parseInt(QiXiaList[i]["degree"])>=25000&&parseInt(QiXiaList[i]["degree"])<30000){
            temparray[tempcounter]=QiXiaList[i];
            tempcounter++;
            newarray.push(i);
        }
    }
    console.log(temparray);
    console.log("提取满朱果好感度排序如下:");
    for (var i=0;i<QiXiaList.length;i++){
        if (newarray.indexOf(i)==-1){
            temparray[tempcounter]=QiXiaList[i];
            tempcounter++;
        }
    }
    var over3=[];
    console.log(temparray);//第一次排序结束。现在要挑出所有超过3万的亲密 并且放到最后。
    for (var i=0;i<temparray.length;i++){
        if (parseInt(temparray[i]["degree"])>=30000){//找到3万以上的
            over3.push(i);//push超过3万的序号
        }
    }
    console.log(over3);
    var overarray=[];
    var overcounter=0;
    for (var i=0;i<temparray.length;i++){ //第一遍循环 找到不在3万列表中的
        if (over3.indexOf(i)<0){
            overarray[overcounter]=temparray[i];
            overcounter++;
        }
    }
    console.log(overarray);
    for (var i=0;i<temparray.length;i++){//第二遍循环 把列表中的插入
        if (over3.indexOf(i)>=0){
            overarray[overcounter]=temparray[i];
            overcounter++;
        }
    }
    finallist=[];
    finallist=overarray;
    console.log(finallist);
    getZhuguo();
}
function getZhuguo(){
    var msg="";
    console.log(finallist);
    for (var i=0;i<4;i++){//只检查 头四个奇侠是不是在师门，是不是已经死亡。
        if (finallist[i]["isOk"]!=true){
            msg+=finallist[i]["name"]+" ";
        }
    }
    if (msg!=""){
        alert("根据您的奇侠亲密好感度，目前可以最优化朱果数目的以下奇侠不在江湖或者已经死亡："+msg+"。请您稍后再尝试使用奇侠领取朱果服务。");
    }else{//头四位奇侠都在江湖中，可以开始领取朱果
        talktoQixia();
    }
}
var unfinish="";
function talktoQixia(){
    console.log("talktoqixia-奇侠-目前计数" + QixiaTotalCounter);
    console.log(finallist[QixiaTotalCounter]);
    if (QixiaTotalCounter<=24){// 奇侠list仍然有元素。开始调取排列第一个的奇侠
        var Qixianame="";
        var QixiaIndex=0;
        console.log(finallist[QixiaTotalCounter]["name"]);
        Qixianame=finallist[QixiaTotalCounter]["name"];
        QixiaIndex=finallist[QixiaTotalCounter]["index"];
        if (finallist[QixiaTotalCounter]["isOk"]!=true){
            //            alert("奇侠"+Qixianame+"目前不在江湖，可能死亡，可能在师门。领取朱果中断，请在一段时间之后重新点击领取朱果按钮。无需刷新页面");
            console.log("talktoqixia-奇侠"+Qixianame+"目前不在江湖，可能死亡，可能在师门。");
            QixiaTotalCounter++;
            setTimeout(talktoQixia,500);
            // return;
        }else{
            console.log(finallist[QixiaTotalCounter]);
            clickButton('find_task_road qixia '+QixiaIndex);
            console.log(QixiaIndex);
            GetQXID(Qixianame,QixiaIndex);
        }
    }else{
        alert("今日奇侠已经完成");
        return;
    }
}
var finallist=[];
function QiXiaTalkFunc(){
    var QiXiaList_Input= "";
    //打开 江湖奇侠页面。
    if (QXStop==0){
        clickButton('open jhqx', 0);
        GetQiXiaList();
    }else if (QXStop==1&&qinmiFinished==0){
        QXStop=0;
        QiXiaTalkButton.innerText = '奇侠领朱果';
    }else if (QXStop==1&&qinmiFinished==1){
        QXStop=0;
        QixiaList=[];
        finallist=[];
        QXTalkcounter=1;
        QixiaTotalCounter=0;
        clickButton('open jhqx', 0);
        GetQiXiaList();
    }
}
// 格式话奇侠数据并返回数组
function formatQx(str){
    var tmpMsg = removeSpec(str);
    var arr = tmpMsg.match(/<tr>(.*?)<\/tr>/g);
    var qxArray = [];
    var qxInfo = {};
    if(arr){
        for(var i = 0;i < arr.length;i++){
            qxInfo = {};
            arr2 = arr[i].match(/<td[^>]*>([^\d\(]*)\(?(\d*)\)?<\/td><td[^>]*>(.*?)<\/td><td[^>]*>(.*?)<\/td><td[^>]*>.*?<\/td>/);
            qxInfo["name"] = arr2[1];
            qxInfo["degree"] = arr2[2] == "" ? 0 : arr2[2];
            console.log(arr2);
            if (arr2[3].match("未出世")!=null||arr2[4].match("师门")!=null){
                qxInfo["isOk"]=false;
            }else{
                qxInfo["isOk"]=true;
            }
            qxInfo["index"]=i;
            qxArray.push(qxInfo);

        }
        return qxArray;
    }
    return [];
}

// 去除链接以及特殊字符
function removeSpec(str) {
    var tmp = g_simul_efun.replaceControlCharBlank(str.replace(/\u0003.*?\u0003/g, ""));
    tmp = tmp.replace(/[\x01-\x09|\x11-\x20]+/g, "");
    tmp = tmp.replace(/朱果/g, "");
    return tmp;
}

function talk2QiXiabyName(localname){
    //    console.log("目前是：" + localname);
    currentTime = currentTime + delta_Time;
    switch(localname){
        case "王蓉":
            setTimeout(TalkWangRong, currentTime); // 王蓉
            break;
        case "浪唤雨":
            setTimeout(TalkLangHuanYu, currentTime);
            break;
        case "庞统":
            setTimeout(TalkPangTong, currentTime);
            break;
        case "李宇飞":
            setTimeout(TalkLiYuFei, currentTime);
            break;
        case "步惊鸿":
            setTimeout(TalkBuJingHong, currentTime);
            break;
        case "风行骓":
            setTimeout(TalkFengXingJu, currentTime);
            break;
        case "郭济":
            setTimeout(TalkGuoJI, currentTime);
            break;
        case "吴缜":
            setTimeout(TalkWuZhen, currentTime);
            break;
        case "风南":
            setTimeout(TalkFengNan, currentTime);
            break;
        case "火云邪神":
            setTimeout(TalkHuoYunXieShen, currentTime);
            break;
        case "逆风舞":
            setTimeout(TalkNiFengWu, currentTime);
            break;
        case "狐苍雁":
            setTimeout(TalkCangGuYan, currentTime);
            break;
        case "护竺":
            setTimeout(TalkHuZhu, currentTime);
            break;
        case "玄月研":
            setTimeout(TalkXuanYueYan, currentTime);
            break;
        case "狼居胥":
            setTimeout(TalkLangJuXu, currentTime);
            break;
        case "烈九州":
            setTimeout(TalkLieJiuZhou, currentTime);
            break;
        case "穆妙羽":
            setTimeout(TalkMuMiaoYu, currentTime);
            break;
        case "宇文无敌":
            setTimeout(TalkYuWenWuDi, currentTime);
            break;
        case "李玄霸":
            setTimeout(TalkLiXuanBa, currentTime);
            break;
        case "八部龙将":
            setTimeout(TalkBaBuLongJiang, currentTime);
            break;
        case "风无痕":
            setTimeout(TalkFengWuHen, currentTime);
            break;
        case "厉沧若":
            setTimeout(TalkLiCangRuo, currentTime);
            break;
        case "夏岳卿":
            setTimeout(TalkXiaYueQing, currentTime);
            break;
        case "妙无心":
            setTimeout(TalkMiaoWuXin, currentTime);
            break;
        case "巫夜姬":
            setTimeout(TalkWuYeJi, currentTime);
            break;
        default:
            console.error("没有找到该奇侠：" + localname + " ！");
    }
}
//窗口3结束------------------------------
buttonhide3Func();