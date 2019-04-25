// ==UserScript==
// @name         论剑小号辅助版
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
var buttonWidth = '45px';   // 按钮宽度
var buttonHeight = '20px';  // 按钮高度
var currentPos = 30;        // 当前按钮距离顶端高度，初始130
var delta = 25;                 // 每个按钮间隔

//-------------------------分割线-----------

mySkillLists = "九天龙吟剑法;排云掌法";

//-------------------------分割线-----------
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
createButton('签到',CheckInFunc);
createButton('报名',ShiJieFunc);
createButton('吃果',SongmieguiFunc);
createButton('送花',Songmiegui1Func);
createButton('帮一',SaodangFunc);
createButton('元宝',SWFunc);
createButton('金元',SJFunc);
createButton('香符',SXFunc);
createButton('镖签',BiaochehaoFunc);
createButton('论剑',LlunjianjiangliFunc);
createButton('帮战',BZFunc);
createButton('退帮',TBPFunc);
createButton('加帮',JBPFunc);
createButton('理包',clearBag);
//createButton('VIP一键',VIPFunc);

/*test:
go("jh 1;e;n;n");go("jh 2;n;n;n")
*/




// 签到--买蜜蜂------------------------------------------------------
function CheckInFunc(){
    go("share_ok 1;share_ok 2;share_ok 3;share_ok 4;share_ok 5;share_ok 7;");//分享
    go('jh 1;look_npc snow_mercenary;eval_startFengyi();zhounian_lb;lq_znboss_rewards;home;');
    //go('jh 1;event_1_27161119;event_1_43728742;event_1_22820083;event_1_61814991;event_1_63936630;event_1_2847443;items use obj_molitang;items use obj_lanlingmeijiu;home;');//礼包
    //go('jh 1;w;event_1_46497436;home;');//纪念金庸
    //go('jh 1;event_1_57666623;items use obj_molitang;home;');//逢义 礼包、喝汤
    go('jh 5;n;n;n;w;sign7;home;exercise stop;exercise;shop money_buy mny_shop1_N_10');//扬州签到、买蜜蜂
    //go('jh 1;e;n;e;e;event_1_44731074;event_1_8041045;event_1_8041045;home;');//消费积分和谜题卡
    go('jh 2;;n;n;n;n;n;n;n;e;tzjh;');
    go('touzi_jihua2 buygo 6',1)//买投资计划1
    go('touzi_jihua2 buygo 5',1)//买投资计划1
    go('tzjh_lq;home;');//领取投资计划
}
//==fengyi================================
function startFengyi(){
    console.log("startfengyi");
    var npc=g_obj_map.get("msg_npc");
    if (npc==undefined){
        setTimeout(startFengyi,500);
    }else if(npc.get("id")!="snow_mercenary"){
        setTimeout(startFengyi,500);
    }else{
        for (var i=1;i<10;i++){
            console.log(npc.get("cmd"+i+"_name"));
            if (npc.get("cmd"+i+"_name")==undefined)
                break;
            if (npc.get("cmd"+i+"_name").match("礼包")!=null&&npc.get("cmd"+i+"_name").match("1元")==null&&npc.get("cmd"+i+"_name").match("兑换")==null){
                var fengyilibao = npc.get("cmd"+i);
                console.log(fengyilibao);
                clickButton(fengyilibao, 1);
            }
        }
    }
}
// 小号报名论剑----------------------------
function ShiJieFunc(){
    go('swords');
    go('swords report go');
    go('swords select_member gaibang_hong');  //洪帮主
    go('swords select_member dali_yideng');   //古灯大师
    go('swords select_member gumu_yangguo');   //神雕大侠

}
//===================================================
// 包裹整理 ------
var clb_time;
var clb_flag=true;
function clearBag(){
    clb_flag=false;
    go('items',0);
    clearInterval(clb_time);
    clb_time=setInterval(clearitem,800);
}
var items_use='玄冰碧火酒 兰陵美酒 周年英雄令 周年热血令 神鸢宝箱 茉莉汤 云梦青青凤纹绶 热血印 风云宝箱  高级狂暴丹特级狂暴丹保险卡特级大还丹高级大还丹小还丹百年紫芝百年灵草特级乾坤再造丹高级乾坤再造丹神秘宝箱高级乾坤袋';
var items_store='腊八粥 长生石宝箱 腊百草美酒元宵 年糕冰糖葫芦超级突破加速卡舞鸢尾百宜雪梅『隐武竹笺』暴击双倍（月）卡	高级突破加速卡狗年礼券高级突破秘术玫瑰花百宝令朱果突破加速卡空识卷轴长生石 青龙碎片『神匠宝箱』『秘籍木盒』晚香玉 凌霄花 百宜雪梅 朝开暮落花 凤凰木 熙颜花 君影草 矢车菊 冰镇酸梅汤 忘忧草 仙客来 雪英 夕雾草 彼岸花 洛神花 青木宝箱 千年紫芝千年灵草驻颜丹烧香符周年礼券玄重铁分身卡鱼竿鱼饵江湖令谜题令正邪令状元贴白银宝箱黄金宝箱铂金宝箱装备打折卡碎片黄金钥匙鎏金黑玉锥曜玉钥匙铂金钥匙赤璃钥匙';
var items_study='紫霞秘籍 武穆遗书 左手兵刃研习';
var items_splite='翎眼赤护 青鸾护臂 苍狼护臂 宝玉甲 天寒匕 貂皮斗篷 白玉腰束 无心匕 玄武盾 月光宝甲 沧海护腰 夜行披风虎皮腰带红光匕金丝甲羊毛斗篷破军盾金丝甲疯魔杖毒龙鞭玉清棍生死符霹雳掌套血屠刀残雪帽残雪戒残雪鞋残雪手镯残雪项链金丝宝甲衣';
var items_sell='妖刀狗屠黑狗血玄苏剑漫天花雨匕三清神冠七星翻云靴咒剑王□鲜红锦衣牛皮靴八角锤灰雁七星宝戒船桨白金项链断云斧乌夷长裙红色绸裙包子大剪刀黑水伏蛟帝王剑麻布手套银丝帽吴钩绵裙铜钹大刀紫袍铁笛圣火令绿罗裙绣花针清心散垓下刀紫金杖阿拉伯弯刀青锋剑青布袍淑女剑紫霜血蝉衣软金束带穿花蛇影鞋魔鞭翩珑大红僧袍九环禅杖精铁棒毒蒺藜暗灵桃木剑横断钩银丝链甲衣天魔刀玉竹杖叫化鸡七星剑逆钩匕银丝甲天寒帽天寒戒天寒鞋天寒项链天寒手镯软甲衣金刚杖飞羽剑斩空刀拜月掌套金弹子新月棍白蟒鞭硫磺木戟黑袍粗布白袍长戟回旋镖拂尘松子白色棋子黑色棋子竹节鞭白棋子木叉银色丝带波斯长袍铁鞭竹刀长虹剑莲蓬鲤鱼窄裉袄灵芝锦衣台夷头巾毛毯废焦丹废药渣台夷头巾粉红绸衫灰燕野山鸡麻雀岩鸽瑶琴维吾尔族长袍旧书桃符纸木锤木钩竹鞭木刀木枪木剑彩巾彩靴彩帽彩带彩镯彩衣砍刀绣花鞋舞蝶彩衫军刀铁扇剑割鹿刀大理雪梨圆领小袄皮帽弯月刀兔肉粗磁大碗羊肉串天山雪莲青铜盾禅杖金刚罩丝质披风暗箭青葫芦松子铁斧水蜜桃蓑衣破弯刀柴刀丝衣长鞭道德经布裙钢丝甲衣牛皮带制服金刚杖斩空刀拜月掌套金弹子新月棍白蟒鞭-草莓玉蜂浆玉蜂蜜蜂浆瓶豆浆蛋糕菠菜粉条包裹鸡叫草水密桃--新月棍银簪重甲羊角匕梅花匕日月神教腰牌船篙-丝绸马褂白缨冠白色长袍蛇杖鬼头刀拐杖古铜缎子袄裙大环刀鹿皮手套丝绸衣羊毛裙牧羊鞭牛皮酒袋麻带钢剑钢杖藤甲盾长斗篷军袍破披风木盾铁盾锦缎腰带鞶革青色道袍-鲫鱼树枝水草破烂衣服-鹿皮小靴青绫绸裙粗布衣草帽草鞋布鞋精铁甲-柳玉刀玉竹剑钢刀戒刀单刀长剑长枪铁锤木棍轻罗绸衫兽皮鞋皮鞭铁棍飞镖匕首细剑绣鞋绣花小鞋狼皮雪靴金戒金手镯铁戒银戒铁手镯银手镯铁项链银项链';

function clearitem(){
    var t=$("tr[bgcolor]:contains(万两)").siblings();
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
                }else if(items_store.indexOf(a)!=-1){
                    console.log("存仓库："+a+" 数量："+b);
                    go('items put_store '+c);
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
                }
                if(a.indexOf('】璞玉')!=-1){
                    console.log("存仓库："+a+" 数量："+b);
                    go('items put_store '+c);
                }
                if(a.indexOf('】青玉')!=-1){
                    console.log("存仓库："+a+" 数量："+b);
                    go('items put_store '+c);
                }
                if(a.indexOf('】墨玉')!=-1){
                    console.log("存仓库："+a+" 数量："+b);
                    go('items put_store '+c);
                }
                //                if(a.indexOf('残页』')!=-1){
                //                    console.log("存仓库："+a+" 数量："+b);
                //                    go('items put_store '+c);
                //                }
               // if(a.indexOf('宝石')!=-1){
               //     console.log("存仓库："+a+" 数量："+b);
               //     go('items put_store '+c);
               // }
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
// 送玫瑰-吃朱果---------------------------------------------------
function SongmieguiFunc(){
     go('items info zhu guo;use_all');
}
// 送玫瑰---------------------------------------------------
function Songmiegui1Func(){
     go('items use meigui hua;items use meigui hua;items use meigui hua;items use meigui hua;items use meigui hua;');
}

// 扫荡帮一-----------------------------clan scene;clan fb;-----------------------
function SaodangFunc(){
     go('clan fb go_saodang shenshousenlin;clan fb go_saodang daxuemangongdao;home');//扫荡帮一

}
//帮派声望--clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;-------------------------------------------------
function SWFunc(){
    go('clan incense cx;clan incense cx;clan incense cx;clan incense cx;clan incense cx;home;');//上香

}
//帮派声望----------------clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;------clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;-----------------------------
function SJFunc(){
     go('clan incense cx;clan incense cx;clan incense cx;clan incense cx;clan incense cx;home;');//元宝
     go('clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;clan incense jx;home;');//上香
}
//烧香符---------------------------------------------------
function SXFunc(){
     go('items use obj_shaoxiangfu;');
}
// 镖车-签到--买蜜蜂------------------------------------------------------
function BiaochehaoFunc(){
   go("share_ok 1;share_ok 2;share_ok 3;share_ok 4;share_ok 5;share_ok 7;");//分享
   //go('jh 1;look_npc snow_mercenary;eval_startFengyi();zhounian_lb;lq_znboss_rewards;home;');
   go('shop;shop buy shop37;home;jh 5;n;n;n;n;n;n;w;event_1_9344294;event_1_79809060 go 4;');//祭祀
   //go('jh 1;event_1_27161119;event_1_22820083;event_1_43728742;event_1_61814991;event_1_63936630;event_1_2847443;home;exercise stop;exercise;sleep_hanyuchuang stop;sleep_hanyuchuang;shop money_buy mny_shop1_N_10');//礼包
    //go('jh 1;event_1_57666623;items use obj_molitang;home;');//逢义 礼包、喝汤
    //go('jh 5;n;n;n;w;sign7;home;exercise stop;exercise;shop money_buy mny_shop1_N_10');//扬州签到、买蜜蜂
    //go('jh 1;e;n;e;e;event_1_44731074;event_1_8041045;event_1_8041045;home;');//消费积分和谜题卡
    go('jh 2;;n;n;n;n;n;n;n;e;tzjh;');
   go('touzi_jihua2 buygo 6',1)//买投资计划1
   go('tzjh_lq;home;');//领取投资计划
}
// 领论剑奖励----------
function LlunjianjiangliFunc(){
   go('home;swords;swords get_drop go;');
   go('jh 4;n;n;n;e;lq_twar;home;');
    }
// 交帮战奖励----------
function BZFunc(){
   go('clan;clan scene;give_geling;give_fengyunling;');
   go('items use obj_fengyunbaoxiang;items use obj_rexueyin;items use obj_rexueyin;items use obj_rexueyin;items use obj_rexueyin;items use obj_rexueyin;items use obj_rexueyin;items use obj_rexueyin;items use obj_rexueyin;items use obj_rexueyin;home;')
   go('items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;items use obj_qingfengwenshou;home;')
    }
// 退帮派----------
function TBPFunc(){
   go('clan;clan_members;clan quit go;');
    }
// 加帮派----------
function JBPFunc(){
   go('clan;clan view 15201168739187;clan join 15201168739187;');
    }