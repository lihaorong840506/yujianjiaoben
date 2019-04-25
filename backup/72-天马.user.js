// ==UserScript==
// @name         72-天马
// @namespace    http://tampermonkey.net/
// @version      V1.1
// @description  论剑脚本
// @author       sun
// @match        http://sword-direct22.yytou.cn:8084/*
// @include     http://*.yytou.cn*
// @grant        none
// ==/UserScript==

//-----------全局变量------------
var kftfTrigger = 0;
var playerAttrs;
var forceToRefresh = 15000;//战斗中内力小于40000回内
var forceToRefresh2 = 1000;//战斗后内力小于10000回内
var keeToHeal = 0.3; //气血小于50%回血
var healMaxTimes = 3;  //每轮最多回血次数
var healCurTimes = 0;
var cmdQueue = new Queue();
var btnList = {};		// 按钮列表
var buttonWidth = '40px';	// 按钮宽度
var buttonHeight = '22px';	// 按钮高度
var firstpos = 20;		// 当前按钮距离顶端高度，初始130
var secondpos = 450;		// 当前按钮距离顶端高度，初始130
var delta = 10;	                // 每个按钮间隔
var paddingLeft = '0px';//按钮内文字离按钮左边距
var paddingRight= '0px';//按钮内文字离按钮右边距
var curStamp = 0;  //当前时间戳
var preStamp = 0;  //之前时间戳
var TianJianNPCList = ["天1剑", "天剑1真身", "虹1风","虹雨","虹雷", "虹电", "天剑谷卫士","[71-75区]恶棍", "[71-75区]流寇", "[71-75区]剧盗","[71-75区]云老四", "[71-75区]岳老三", "[71-75区]二娘","[71-75区]段老大", "[71-75区]墟归一","[71-75区]上官晓芙","[71-75区]洪昭天","恶棍", "流寇", "云老四", "岳老三", "二娘","段老大","剧盗","年兽","醉汉"];
var TianJianNPCList = ["镇谷神兽", "守谷神兽", "饕餮幼崽", "饕餮兽魂", "饕餮分身","饕餮王","饕餮战神","镇山神兽", "守山神兽", "应龙幼崽", "应龙兽魂","应龙分身","应龙王","应龙战神","镇潭神兽", "守潭神兽", "腾蛇幼崽","腾蛇兽魂","腾蛇分身","腾蛇王","腾蛇战神","镇殿神兽","守殿神兽","幽荧幼崽","幽荧兽魂","幽荧分身","幽荧王","幽荧战神","楼兰遗民","黑毒沙蝎","寻宝贼","突厥骑兵","楼兰遗民","嗜血蜥蜴","戈壁凶狼","噬人蚁","沙漠王蛇","金狼将","月幽剑士","濯缨剑士","对影剑士","夏花剑士","千夫长","金狼军","百夫长","十夫长","银狼军","铁狼军","紫衣侍女","未央公主","公主丞","公主家令","羽林中郎将","车郎将","户郎将","骑郎将","渡风神识","渡云神识","渡雨神识","中军侍卫","颉利","鹰军主帅","鹰军侍卫","虎军侍卫","虎军侍卫","虎军侍卫","虎军主帅","豹军主帅","豹军侍卫","杀神寨匪首","杀神寨头目","独孤须臾","翼国公","云观海","黑袍公","孽龙之灵","孽龙分身","孽龙之灵","阿保甲","黑羽敌将","黑羽刺客","乞利","胡族军士","金狼大将","金狼死士","黑鹰死士","赤豹死士","银狼近卫","飞羽神箭","青衣盾卫","饕餮兽魂","饕餮分身","饕餮王","饕餮战神","饕餮幼崽", "守谷神兽", "镇谷神兽","天剑谷卫士","年兽","醉汉","黑袍公","独孤须臾","翼国公","云观海","[71-75区]段老大"];
var skillList = "破军棍诀;千影百伤棍;";//通用群招技能
var skillList2 = "无影毒阵;燎原百破;玄胤天雷;雪饮狂刀;九天龙吟剑法;覆雨剑法;如来神掌;天火飞锤;玄天杖法;织冰剑法;";//通用单招技能
var comboSkillList = "千影百伤棍;雪饮狂刀;排云掌法;翻云刀法;燎原百破;九天龙吟剑法;破军棍诀;玄胤天雷;玄天杖法;织冰剑法;燕云十七斩;玄天杖法;";//出阵技能池
var comboSkillListEx = "千影百伤棍:燎原百破;破军棍诀:翻云刀法;九天龙吟剑法:燎原百破;九天龙吟剑法:雪饮狂刀;覆雨剑法:如来神掌;九天龙吟剑法:排云掌法;破军棍诀:天火飞锤;玄天杖法:织冰剑法;";//出阵备选组合，按顺序优先出
var comboSkillListEx1 = "九天龙吟剑法:燎原百破;覆雨剑法:如来神掌;九天龙吟剑法:排云掌法;燕云十七斩:玄天杖法;";//出阵备选组合，按顺序优先出
var healSkillList = "生生造化功;道种心魔经;不动明王诀;";
var excludeSkills = "天师灭神剑|茅山道术";
var skillList3 = "不动明王诀";//内功设定
//-----------添加按钮面板--------
var topMaxSize = 190;//面板高度
var heightMaxSize = 350;//面板宽度
var heightMinSize = 10;

var topMinSize = topMaxSize + heightMaxSize/2 - heightMinSize/2;
var hideBtnWidth = 20;//红边框宽度
var panelWidth = 105;
var panelRight = 0;
var skillPanelMax = 6;
//-----------添加按钮------------
createBtnPanelEx();
createGroupPanel("gp01","天马1.0",true);
createButton("gp01","天剑",tianjianFunc);
createButton("gp01","逃犯",startKftf);
createButton("gp01","帮战",startClanWar);
createButton("gp01","叫杀",killTianJianTargetFunc);
createButton("gp01","好人",killHuangMingTargetFunc);
createButton("gp01","坏人",killHongMingTargetFunc);
createButton("gp01","单招",autoPerformSkill2);
//createButton("gp01","群杀",autoPerformSkill);
//createButton("gp01","单阵",autoPerformCombo1);
createButton("gp01","群阵",autoPerformCombo);
createButton("gp01","恢复", yijianhuifuFunc);
createButton("gp01","尸体",AutoGetFunc);
createButton("gp01","战装",ZhuangBei);
createButton("gp01","风泉",fengquanFunc);
createButton("gp01","逃跑",escapeFunc);
//createButton("gp01","支线",ZhixianFunc);

createGroupPanel("gp02","日常");
createButton("gp02","签到",CheckIn);
createButton("gp02","晚安",Goodnight);
createButton("gp02","答题",answerQuestionFunc);
//createButton("gp02","试剑",shijian);
createButton("gp02","师帮",SHIMENBANGPAI100Func);
createButton("gp02","打榜",PaiHangFunc);
createButton("gp02","铜人",TRFunc);
createButton("gp02","苗疆",Mjly1Func);
createButton("gp02","天山",Tsdz1Func);
createButton("gp02","除魔",TiexueFunc);
createButton("gp02","冰月",bingyueFunc);
createButton("gp02","云远",YunyuanFunc);
createButton("gp02","最优",mijingFunc);
createButton("gp02","直达",goMijing);
createButton("gp02","朱果",QiXiaTalkFunc);
//createButton("gp02","开云远",openYunyuan);
createButton("gp02","九幽",JiuyouFunc);
createButton("gp02","七侠",TianShanQiJianFunc);
//createButton("gp02","下技能",AutoequipFunc);
//createButton("gp02","比试奇侠",BiShiFunc);

createGroupPanel("gp04","辅助");
createButton("gp04","孽龙",nielongFunc);
createButton("gp04","军阵",pozhenFunc);
createButton("gp04","金狼",jinlangFunc);
createButton("gp04","神寨",shashenFunc);
createButton("gp04","侠客",RiChangFunc);
createButton("gp04","壁画",MianBiFunc);
createButton("gp04","红包",qiangHongbao);
createButton("gp04","楼兰",LoulanFunc);
createButton("gp04","理包",clearBag);
createButton("gp04","宝石",HebaoshiFunc);
//createButton("gp04","悟性装",Wuqiqiehuan);
createButton("gp04","万年",YaopuFunc);
createButton("gp04","千年",Yaopu1Func);
//createButton("gp04","谜题找物",gomiti2);
//createButton("gp04","交谜题",goHuiqu);
createButton("gp04","清谜",clearPuzzleFunc);
createButton("gp04","VIP",VipallFunc);
//===============
function ZhixianFunc(){
        go('kill haiyunge_dixiaoxia');
    }
// 换装备 -------------------------------------------------------
function ZhuangBei(){
    if(btnList["战装"].innerText == '战装')
    { console.log("切换战斗装备！");
     go('auto_equip on');       // 一键装备
     //go('unwield weapon_sb_sword10');       // 脱九天剑
     go('unwield weapon_sb_spear11');       // 脱枪
     go('unwield weapon_sb_unarmed11');       // 脱天罡
     //go('unwield weapon_sb_sword11');       // 脱轩辕剑
     //go('wield weapon_sb_sword10');       // 穿九天剑
     //go('wield weapon_sb_sword11');        //穿轩辕剑
     go('wield weapon_sb_spear11');       // 穿枪
    go('wield weapon_sb_unarmed11');       // 穿天罡
     btnList["战装"].innerText = '悟装';
    }
    else
    {console.log("切换打坐装备！");
    // go('unwield weapon_sb_sword10');     // 脱九天龙吟剑
    // go('unwield weapon_sb_sword11');       // 脱轩辕剑
     go('wear bow_luori');       // 落日弓
     go('wear langya_diaozhui');  //狼牙吊坠
     go('wear dream hat');  //戴帽子
     go('wield sword of windspring');       // 风泉
     go('wear longyuan banzhi moke');       // 龙渊
     btnList["战装"].innerText = '战装';
    }
}





//--------------------------------------------------------------------------------------
var clanWarInfo = {};
var clanWarTrigger = 0;
function startClanWar()
{
	if(btnList["帮战"].innerText  == '帮战'){
		clanWarTrigger = 1;
        autoClanWar();
		killClanWarNpc();
        btnList["帮战"].innerText  = '停战';
		btnList["帮战"].style.backgroundColor="red";
	}else{
         btnList["帮战"].innerText  = '帮战';
		 btnList["帮战"].style.backgroundColor="buttonface";
		 clanWarTrigger = 0;
    }


	function autoClanWar(){
		if (clanWarTrigger!=1) return;
		var curPos;
		if (g_obj_map.get("msg_room"))
		{
		    curPos = $(change_html(g_obj_map.get("msg_room").get("short"))).text() || (g_obj_map.get("msg_room").get("short"));
		}
		if (isClanWarReady()){
			//console.log(curPos);
			if (!g_gmain.is_fighting&&curPos&&isContains(curPos,"武林广场")){
				var curPosId = 1;
				if (isContains(curPos,"武林广场"))
				{
					curPosId = curPos.replace("武林广场","");
				}
				//当前地点回到广场3
				if (curPosId-3>0)
				{
					for(var i=0;i<curPosId-3;i++)
					{
						pushCmd("w");
					}
				}else
				{
					for(var i=0;i<3-curPosId;i++)
					{
						pushCmd("e");
					}
				}
				//恢复血内
				//eatWannianA();
				//获取当前帮战信息
				setTimeout(function(){clickButton('event_1_20705356', 0);},1000);

				setTimeout(function(){getClanWarInfo();},3000);

				//前往战场
				setTimeout(gotoBattleField,4000);

			}else{

				if(clanWarInfo["dest_pos"]!=undefined)
				{
					if (curPos!=clanWarInfo["dest_pos"]){
						if (curPos=="天阁"){
							go("e;n;");
						}else if (curPos =="龙阁"){
							go("ne;n;");
						}else if (curPos =="地阁"){
							go("n;n;");
						}else if (curPos =="玄阁"){
							go("nw;n;");
						}else if (curPos =="黄阁"){
							go("w;n;");
						}else if (isContains("至尊殿;翰海楼;八荒谷;九州城;怒蛟泽;凌云峰;江左营;虎啸林;青云山;论剑堂",curPos)){
							go("n;");
						}
					}
				}
			}
		}
		setTimeout(autoClanWar,10000);
	//getClanWarInfo();
	}
}

function killClanWarNpc()
{
	if (clanWarTrigger!=1) return;
	var curPos;
	if (g_obj_map.get("msg_room")){
	    curPos = $(change_html(g_obj_map.get("msg_room").get("short"))).text() + "阁";
	}
	//console.log($(change_html(g_obj_map.get("msg_room").get("short"))));
	//console.log(g_obj_map.get("msg_room").get("short"));
	//console.log(clanWarInfo["dest_pos"]);
	if(clanWarInfo["dest_pos"]!=undefined&&isClanWarReady())
	{
		console.log("destPos:"+clanWarInfo["dest_pos"] + "curPos :"  + curPos);
		//curPos = "黄阁";
		if (curPos===clanWarInfo["dest_pos"]){
			if (!g_gmain.is_fighting&&clanWarInfo["dest_npc"]!=undefined)
			{
				clickButton('kill ' + clanWarInfo["dest_npc"],0);
			}
			if (!g_gmain.is_fighting) eatWannianA();
		}
	}
	//console.log("clanwar do kill!");
	setTimeout(killClanWarNpc,4000);
}
function isClanWarReady()
{
	var now = new Date();
	var readyTime = Date.parse(now.format("yyyy-MM-dd") + " 21:25:00");
	var endTime = Date.parse(now.format("yyyy-MM-dd") + " 23:25:00");
	//console.log(readyTime);
	//console.log(now.getTime());
	//星期日、二、四、五 21点25分
	return ((0===now.getDay() || 2===now.getDay() ||4===now.getDay()||5===now.getDay())&&now.getTime()>=readyTime&&now.getTime()<=endTime)
}

function gotoBattleField()
{
	if (clanWarInfo)
	{
		go(clanWarInfo["dest_path"]);
	}else{
		console.log("帮战信息不正确！");
	}
}
function getClanWarInfo()
{
    var warPath = new MyMap();
	var warGonglouNpc = new MyMap();
	var warShoulouNpc = new MyMap();
	warPath.put("至尊殿.天阁","w;w;s;w");
	warPath.put("至尊殿.龙阁","w;w;s;sw");
	warPath.put("至尊殿.地阁","w;w;s;s");
	warPath.put("至尊殿.玄阁","w;w;s;se");
	warPath.put("至尊殿.黄阁","w;w;s;e");

	warPath.put("翰海楼.天阁","w;s;w");
	warPath.put("翰海楼.龙阁","w;s;sw");
	warPath.put("翰海楼.地阁","w;s;s");
	warPath.put("翰海楼.玄阁","w;s;se");
	warPath.put("翰海楼.黄阁","w;s;e");

	warPath.put("八荒谷.天阁","s;w");
	warPath.put("八荒谷.龙阁","s;sw");
	warPath.put("八荒谷.地阁","s;e");
	warPath.put("八荒谷.玄阁","s;se");
	warPath.put("八荒谷.黄阁","s;e");

	warPath.put("九州城.天阁","e;s;w");
	warPath.put("九州城.龙阁","e;s;sw");
	warPath.put("九州城.地阁","e;s;s");
	warPath.put("九州城.玄阁","e;s;se");
	warPath.put("九州城.黄阁","e;s;e");

	warPath.put("怒蛟泽.天阁","e;e;s;w");
	warPath.put("怒蛟泽.龙阁","e;e;s;sw");
	warPath.put("怒蛟泽.地阁","e;e;s;s");
	warPath.put("怒蛟泽.玄阁","e;e;s;se");
	warPath.put("怒蛟泽.黄阁","e;e;s;e");

	warShoulouNpc.put("至尊殿.天阁","kuafu_shoulouhujiang_1_1");
	warShoulouNpc.put("至尊殿.龙阁","kuafu_shoulouhujiang_1_2");
	warShoulouNpc.put("至尊殿.地阁","kuafu_shoulouhujiang_1_3");
	warShoulouNpc.put("至尊殿.玄阁","kuafu_shoulouhujiang_1_4");
	warShoulouNpc.put("至尊殿.黄阁","kuafu_shoulouhujiang_1_5");

	warShoulouNpc.put("翰海楼.天阁","kuafu_shoulouhujiang_2_1");
	warShoulouNpc.put("翰海楼.龙阁","kuafu_shoulouhujiang_2_2");
	warShoulouNpc.put("翰海楼.地阁","kuafu_shoulouhujiang_2_3");
	warShoulouNpc.put("翰海楼.玄阁","kuafu_shoulouhujiang_2_4");
	warShoulouNpc.put("翰海楼.黄阁","kuafu_shoulouhujiang_2_5");

	warShoulouNpc.put("八荒谷.天阁","kuafu_shoulouhujiang_3_1");
	warShoulouNpc.put("八荒谷.龙阁","kuafu_shoulouhujiang_3_2");
	warShoulouNpc.put("八荒谷.地阁","kuafu_shoulouhujiang_3_3");
	warShoulouNpc.put("八荒谷.玄阁","kuafu_shoulouhujiang_3_4");
	warShoulouNpc.put("八荒谷.黄阁","kuafu_shoulouhujiang_3_5");

	warShoulouNpc.put("九州城.天阁","kuafu_shoulouhujiang_4_1");
	warShoulouNpc.put("九州城.龙阁","kuafu_shoulouhujiang_4_2");
	warShoulouNpc.put("九州城.地阁","kuafu_shoulouhujiang_4_3");
	warShoulouNpc.put("九州城.玄阁","kuafu_shoulouhujiang_4_4");
	warShoulouNpc.put("九州城.黄阁","kuafu_shoulouhujiang_4_5");

	warShoulouNpc.put("怒蛟泽.天阁","kuafu_shoulouhujiang_5_1");
	warShoulouNpc.put("怒蛟泽.龙阁","kuafu_shoulouhujiang_5_2");
	warShoulouNpc.put("怒蛟泽.地阁","kuafu_shoulouhujiang_5_3");
	warShoulouNpc.put("怒蛟泽.玄阁","kuafu_shoulouhujiang_5_4");
	warShoulouNpc.put("怒蛟泽.黄阁","kuafu_shoulouhujiang_5_5");

	warGonglouNpc.put("至尊殿.天阁","kuafu_gonglousishi_1_1");
	warGonglouNpc.put("至尊殿.龙阁","kuafu_gonglousishi_1_2");
	warGonglouNpc.put("至尊殿.地阁","kuafu_gonglousishi_1_3");
	warGonglouNpc.put("至尊殿.玄阁","kuafu_gonglousishi_1_4");
	warGonglouNpc.put("至尊殿.黄阁","kuafu_gonglousishi_1_5");

	warGonglouNpc.put("翰海楼.天阁","kuafu_gonglousishi_2_1");
	warGonglouNpc.put("翰海楼.龙阁","kuafu_gonglousishi_2_2");
	warGonglouNpc.put("翰海楼.地阁","kuafu_gonglousishi_2_3");
	warGonglouNpc.put("翰海楼.玄阁","kuafu_gonglousishi_2_4");
	warGonglouNpc.put("翰海楼.黄阁","kuafu_gonglousishi_2_5");

	warGonglouNpc.put("八荒谷.天阁","kuafu_gonglousishi_3_1");
	warGonglouNpc.put("八荒谷.龙阁","kuafu_gonglousishi_3_2");
	warGonglouNpc.put("八荒谷.地阁","kuafu_gonglousishi_3_3");
	warGonglouNpc.put("八荒谷.玄阁","kuafu_gonglousishi_3_4");
	warGonglouNpc.put("八荒谷.黄阁","kuafu_gonglousishi_3_5");

	warGonglouNpc.put("九州城.天阁","kuafu_gonglousishi_4_1");
	warGonglouNpc.put("九州城.龙阁","kuafu_gonglousishi_4_2");
	warGonglouNpc.put("九州城.地阁","kuafu_gonglousishi_4_3");
	warGonglouNpc.put("九州城.玄阁","kuafu_gonglousishi_4_4");
	warGonglouNpc.put("九州城.黄阁","kuafu_gonglousishi_4_5");

	warGonglouNpc.put("怒蛟泽.天阁","kuafu_gonglousishi_5_1");
	warGonglouNpc.put("怒蛟泽.龙阁","kuafu_gonglousishi_5_2");
	warGonglouNpc.put("怒蛟泽.地阁","kuafu_gonglousishi_5_3");
	warGonglouNpc.put("怒蛟泽.玄阁","kuafu_gonglousishi_5_4");
	warGonglouNpc.put("怒蛟泽.黄阁","kuafu_gonglousishi_5_5");

    var rst = null;
	var destPos = "";
	if (g_obj_map.get("msg_clan_war"))
	{
		for (var i = 1;i<8;i++)
		{
			if (g_obj_map.get("msg_clan_war").get("war"+i))
			{
				//console.log(g_obj_map.get("msg_clan_war").get("war"+i));

				if (isContains(g_obj_map.get("msg_clan_war").get("war"+i),"[72区]梵音战阁"))
				{
					rst = g_obj_map.get("msg_clan_war").get("war"+i).split(",");
				}
			}
		}
	}else
	{
		console.log("没有帮战资料");
	}
	if (rst)
	{
		var rst1 = rst[1].split("，");
		var rst3 = rst[3].split("，");
		if (isContains(rst[1],"[72区]梵音战阁"))
		{
			for(var i = 0;i<rst1.length;i++)
			{
				if (isContains(rst1[i],"[72区]梵音战阁"))
				{
					destPos = rst1[i].replace("[72区]梵音战阁","").replace("(","").replace(")","");
				}
			}
			if (destPos.length>0)
			{
				clanWarInfo["dest_pos"] = destPos;
				clanWarInfo["dest_path"] = warPath.get(rst[0]+"."+destPos);
				clanWarInfo["dest_npc"] = warGonglouNpc.get(rst[0]+"."+destPos);
			}

		}else if (isContains(rst[3],"[72区]梵音战阁"))
		{
			for(var i = 0;i<rst3.length;i++)
			{
				if (isContains(rst3[i],"[72区]梵音战阁"))
				{
					destPos = rst3[i].replace("[72区]梵音战阁","").replace("(","").replace(")","");
				}
			}
			if (destPos.length>0)
			{
				clanWarInfo["dest_pos"] = destPos;
				clanWarInfo["dest_path"] = warPath.get(rst[0]+"."+destPos);
				clanWarInfo["dest_npc"] = warShoulouNpc.get(rst[0]+"."+destPos);
			}
		}


	}
	console.log(clanWarInfo);
	return rst;
}

function eatWannianA(){
	var force = g_obj_map.get("msg_attrs").get("force");
	var maxForce = g_obj_map.get("msg_attrs").get("max_force");
	var kee = g_obj_map.get("msg_attrs").get("kee");
	var max_kee = g_obj_map.get("msg_attrs").get("max_kee");
	//console.log("kee:" + kee + "," + max_kee);

	if (force && maxForce)
	{
		for (var i =0;i<Math.ceil((maxForce-force)/20000);i++){
			pushCmd('items use snow_wannianlingzhi');
		}
	}else{
		clickButton('items use snow_wannianlingzhi', 0);
	}
	if (kee&&max_kee)
	{
		for (var i=0;i<Math.ceil((max_kee-kee)/20000);i++)
		{
			pushCmd('recovery');
		}
	}else
	{
		clickButton('recovery', 0);
	}

}
//跨服逃犯=====================================
function startKftf(){
	if ("逃犯"==btnList["逃犯"].innerText)
	{
		var now = new Date();
		console.log(now.format("yyyy-MM-dd hh:mm:ss")+ "  逃犯");
		kftfTrigger =1;
		btnList["逃犯"].innerText = "停犯";
		btnList["逃犯"].style.backgroundColor="red";
		if (!killTianJianIntervalFunc)
		{
			killTianJianTargetFunc();
		}
	}else{
		kftfTrigger=0;
		if (killTianJianIntervalFunc)
		{
			killTianJianTargetFunc();
		}
		btnList["逃犯"].innerText = "逃犯";
		btnList["逃犯"].style.backgroundColor="buttonface";
	}
}
function kftfMonitor(){
	this.dispatchMessage = function(b){

		var type = b.get("type"),subtype = b.get("subtype"),ctype = b.get("ctype");
		if ("channel"==type&& "sys"==subtype)
		{
			var tfMsg = b.get("msg");
			//console.log(tfMsg);
			if (tfMsg ==null || tfMsg==undefined) return;
			if (isContains(tfMsg,"[71-75区]") && isContains(tfMsg,"段老大")){
			//if (isContains(tfMsg,"[71-75区]")){
				console.log(change_html(tfMsg));
				console.log($(change_html(tfMsg)).filter("a").attr("href"));
				if ($(change_html(tfMsg)).filter("a").attr("href"))
				{
					var tfRouteCmd = $(change_html(tfMsg)).filter("a").attr("href").replace("javascript:clickButton('","").replace("', 0);","");
					console.log("逃犯直达！");
					clickButton(tfRouteCmd,0);
				}
			}
		}
		//vs>>>combat_result  jh>>>new_item  jh>>>dest_npc  jh>>>dest_item
	}
}

var kftf = new kftfMonitor;

//createButtonEx("test",test);
function test(){
	console.log(g_obj_map.keys());
	var keys = g_obj_map.keys();
	for (var i=0;i<keys.length;i++)
	{
        console.log(keys[i] + ":");
		console.log(g_obj_map.get(keys[i]));
	}
}
function createButtonEx(btnName,fn)
{
	btnList[btnName]= document.createElement('button');
	btnList[btnName].innerText = btnName;
	btnList[btnName].style.height = buttonHeight;
	btnList[btnName].style.width = buttonWidth;
	btnList[btnName].style.fontWeight = "bold";
	btnList[btnName].style.marginTop = "4px";
	btnList[btnName].style.paddingLeft = paddingLeft;
	btnList[btnName].style.paddingRight = paddingRight;
	btnList[btnName].addEventListener('click', fn);
	//console.log(btnList[btnName].outerHTML);
	$('#ljScriptPanel').append(btnList[btnName]);
}
function createGroupPanel(id,title,isDisplay)
{
	var html = '<div class="vtitle"><em class="v v02"></em>'+title+'</div><div id="' +id+ '" class="vcon"></div>';
	if (!isDisplay){
		html = '<div class="vtitle"><em class="v"></em>'+title+'</div><div id = "' + id + '"class="vcon" style="display: none;"></div>';
	}
	$('#ljScriptPanel').append(html);
}

function createBtnPanelEx()
{
	var html ='<div id="ljScriptPanel" style="display:block;top:100px;width: 200px;height:480px;background-color: #CCCC99;position: absolute;right:0px;margin: 0;padding: 0;opacity:0.6;"></div><div id="ljScriptBtn" style="top:100px;width: 30px;right:200px;position: absolute;z-index: 1;height: 480px;background-color: #990033;line-height: 100px;text-align: center;color: white;cursor: pointer;margin: 0;padding: 0;  line-height:400px;opacity:0.8; ">>>></div> ';
	$(document.body).append(html);
	//----------按钮面板初始化-------
		//$a = $(window).height();
	/////////$("#ljScriptPanel").height($a);
	$("#ljScriptPanel").css("top",topMaxSize+"px");
	$("#ljScriptPanel").css("height",heightMaxSize+"px");
	$("#ljScriptPanel").css("width",panelWidth+"px");
	$("#ljScriptPanel").css("right",panelRight+"px");
	$("#ljScriptBtn").css("top",topMaxSize+"px");
	$("#ljScriptBtn").css("height",heightMaxSize+"px");
	$("#ljScriptBtn").css("width",hideBtnWidth+"px");
	$("#ljScriptBtn").css("right",panelWidth+panelRight+"px");
	$("#ljScriptBtn").click(function(){
		if ($("#ljScriptBtn").text()==">>>")
		{

			$("#ljScriptPanel").fadeOut("low");
			//$("#ljScriptBtnb").delay(500).animate({left:'0'});
			$("#ljScriptBtn").delay(100).animate({height:heightMinSize+'px',top:topMinSize+'px',right:panelRight+'px',lineHeight:heightMinSize+'px'});
			//$("#ljScriptBtn").delay(1000).animate({top:'300px'});
			$("#ljScriptBtn").text("┇");
		}else {
			//$("#ljScriptBtn").css("line-height","400px");
			$("#ljScriptBtn").animate({height:heightMaxSize+'px',top:topMaxSize+'px',right:panelWidth +panelRight+ 'px',lineHeight:heightMaxSize+'px'},function(){$("#ljScriptBtn").text(">>>");});
			$("#ljScriptPanel").delay(100).fadeIn("low");


		}
	});
}

function createSplitter()
{
	var splitter = document.createElement('hr');
	splitter.style.marginTop="4px";
	splitter.style.marginBottom="0px";
	splitter.style.backgroundColor = "#990033";
	splitter.style.border = "none";
	splitter.style.height="1px";
	$('#ljScriptPanel').append(splitter.outerHTML);
}


function createButton(groupPanelID,btnName,fn)
{
	btnList[btnName]= document.createElement('button');
	btnList[btnName].innerText = btnName;
	btnList[btnName].style.height = buttonHeight;
	btnList[btnName].style.width = buttonWidth;
	btnList[btnName].style.fontWeight = "bold";
	btnList[btnName].style.marginTop = "4px";
	btnList[btnName].style.marginLeft = "10px";
	btnList[btnName].style.paddingLeft = paddingLeft;
	btnList[btnName].style.paddingRight = paddingRight;
	btnList[btnName].addEventListener('click', fn);
	//console.log(btnList[btnName].outerHTML);
	$('#'+groupPanelID).append(btnList[btnName]);
}
//-----------任务代码------------
var performSkillTrigger = 0;
function autoPerformSkill(){
    if(btnList["自动群招"].innerText  == '自动群招'){
		performSkillTrigger = 1;
        performSkill();
        btnList["自动群招"].innerText  = '停止群招';}
    else{
         btnList["自动群招"].innerText  = '自动群招';
		 performSkillTrigger = 0;
    }
}

var performSkillTrigger2 = 0;
function autoPerformSkill2(){
    if(btnList["单招"].innerText  == '单招'){
		performSkillTrigger2 = 1;
        performSkill2();
        btnList["单招"].innerText  = '停单';}
    else{
         btnList["单招"].innerText  = '单招';
		 performSkillTrigger2 = 0;
    }
}

var performComboTrigger = 0;
function autoPerformCombo(){
	if(btnList["群阵"].innerText  == '群阵'){
		performComboTrigger = 1;
     	   performSkill();
        btnList["群阵"].innerText  = '停群';}
    else{
         btnList["群阵"].innerText  = '群阵';
		 performComboTrigger = 0;
    }
}
//单阵===================================
function autoPerformCombo1(){
    var performComboTrigger = 0;
	if(btnList["单阵"].innerText  == '单阵'){
        performSkill1();
        btnList["单阵"].innerText  = '停单';}
    else{
         btnList["单阵"].innerText  = '单阵';
		 performComboTrigger = 0;
    }
}
//--------------------------------------

function performSkill1(){
	if (1==performSkillTrigger||1==performComboTrigger)
	{
        var intervalValue = 600;
		if (g_gmain.is_fighting&&gSocketMsg.get_xdz()>1) performSkillA1();
		if($('span.outbig_text:contains(战斗结束)').length>0){
			if (playerAttrs&&playerAttrs["force"]<=forceToRefresh2)
			{
				var flag = 0;
				if ('停杀'==btnList['叫杀'])
				{
					killTianJianTargetFunc();
					flag = 1;
				}
				for (var i =0;i<Math.ceil((playerAttrs["max_force"]-playerAttrs["force"])/5000);i++){
					pushCmd('items use snow_qiannianlingzhi');
					intervalValue+=300;
				}
				pushCmd('prev_combat,1');
				pushCmd('golook_room');
				if (flag){
					setTimeout(killTianJianTargetFunc,intervalValue);
				}
			}else
			{
				pushCmd('prev_combat,1');
				pushCmd('golook_room');
			}
			healCurTimes = 0;

		}
		setTimeout(performSkill1,intervalValue);
    }
}



function performSkillA1(){

	playerAttrs = getPlayerAttr();
	var isRefresh = false;
	var skillName = "";
	//判断player属性
	if (playerAttrs)
	{
		//console.log(m["kee"] + " ::" + m["max_kee"]);
		//console.log((m["kee"]-0)/(m["max_kee"]-0));
		//console.log(playerAttrs["force"] + "::" + playerAttrs["max_force"]);
		if (playerAttrs["force"]<=forceToRefresh)
		{
			for(var i = 1;i <= skillPanelMax;i++){
				skillName = $('#skill_'+i).children().children().text();
				//console.log(comboSkillList);
				if(skillName !== "" && isContains(skillName, "不动明王诀")){
					//console.log(skillName);
					clickButton('playskill '+i);
					isRefresh = true;
				}
			}
			if (!isRefresh)
			{
				clickButton("escape",0);
			}
		}else{
			if (playerAttrs["kee"]/playerAttrs["max_kee"] <= keeToHeal){
				if (healCurTimes>healMaxTimes)
				{
					clickButton("escape",0);
				}else
                {
					//优先回血
					if (gSocketMsg.get_xdz()<2) return;

					var healSkills = healSkillList.split(";");
					var isHeal = false;
					for (var j=0;j < healSkills.length;j++)
					{
						if (isHeal) break;
						for(var i = 1;i <=skillPanelMax;i++){
							skillName = $('#skill_'+i).children().children().text();
							//console.log(skillList);
							// 如果找到设置的回血技能则释放
							if(skillName !== "" && isContains(healSkills[j], skillName)){
								//console.log("healTimes : " +healCurTimes+"  healSkill:" + skillName);
								clickButton('playskill '+i,0);
								healCurTimes ++;
								isHeal = true;
								break;
						 }
					   }
				   }
			   }
			}
		}
	}

	if ( !performSkillTrigger && 1==performComboTrigger && gSocketMsg.get_xdz()<6) return;

	if (1==Trigger) {
	   performSingleSkill();
	}else if (1==performComboTrigger){
		performComboSkill1();
	}
}

//--------------------------------------
function performComboSkill1()
{
    if (gSocketMsg.get_xdz()<6) return;
	var performCount=0;
	var zhenList1 = comboSkillListEx1.split(";");
	var skillPerform;
	for(var j=0;j<zhenList1.length;j++)
	{
		var zhenSkill1 = zhenList1[j].split(":");
		performCount = 0;
		skillPerform = null;
		for(var k=0;k<zhenSkill1.length;k++)
		{
			// 如果找到设置的技能则释放
			for(var i = 1;i <=skillPanelMax;i++){
				skillName=$('#skill_'+i).children().children().text();
				//console.log(comboSkillList);
				if(skillName !== "" && isContains(zhenSkill1[k], skillName)){
					//console.log(skillName);
					//clickButton('playskill '+i);
					skillPerform = skillPerform + ";" + "playskill "+i;
					performCount ++;
				}

			}
		}
		if (performCount>1)
	    {
			var skills = skillPerform.split(";");
			//console.log(skills);
			for(var n=0;n<skills.length;n++)
			{
				if (skills[n])
				{
					clickButton(skills[n]);
				}
			}
			return;
		}

	}
 }
//===============================================
/*
function autoPerformSkill2()
{
	if(btnList["自动群杀"].innerText  == '自动群杀'){
        btnList["自动群杀"].innerText  = '自动单杀';
		 go('enable mapped_skills restore go 2;');
		performSkillTrigger2 = 1;

	}
    else{
        btnList["自动群杀"].innerText  = '自动群杀';
		  go('enable mapped_skills restore go 1;');
		 performSkillTrigger2 = 0;
    }
}
*/




var doYunyuan = 0;
var yunyuanCount = 0;
var timeCounter = 0;
var yunyuanTrigger = 0;

function openYunyuan()
{
	if(btnList["开云远"].innerText  == '开云远'){
        btnList["开云远"].innerText  = '停云远';
		yunyuanTrigger = 1;
		timeCounter = 0;
		killYunyuan();
	}
    else{
        btnList["开云远"].innerText  = '开云远';
		yunyuanTrigger = 0;
		timeCounter==1
    }
}

var reconnectTimeout = 1000*60*3;//断线重连间隔
//setTimeout(openYunyuan,10000);
//openYunyuan();
function killYunyuan()
{
	if (!sock&&yunyuanTrigger) {
			yunyuanTrigger=0;
			//断线重连
			setTimeout(function(){window.location.reload();},reconnectTimeout);
			return;
	 }
	if (yunyuanTrigger&&timeCounter==0)
	{
		var now = new Date();
		if (6==now.getHours()&&now.getMinutes()>0&&!g_gmain.is_fighting&&doYunyuan==0)

		{
			if (btnList["叫杀"].innerText == '叫杀')
			{
				killTianJianTargetFunc();
			}

			if (performComboTrigger ==0)
			{
				autoPerformCombo();
			}
			if (g_obj_map.get("msg_room")!=undefined){
				if (isContains(g_obj_map.get("msg_room").get("short"),"地室"))
				{
					if (yunyuanCount==0)
					{
						clickButton("go east",0);
					}
					if (yunyuanCount==1)
					{
						clickButton("go south",0);
					}
					if (yunyuanCount==2)
					{
						clickButton("go west",0);
					}
					if (yunyuanCount==3)
					{
						clickButton("go north");
					}
					yunyuanCount ++;
				}
				else if (isContains(g_obj_map.get("msg_room").get("short"),"十恶殿"))
				{
					clickButton("go west",0);
				}else if (isContains(g_obj_map.get("msg_room").get("short"),"千蛇窟"))
				{
					clickButton("go north",0);
				}else if (isContains(g_obj_map.get("msg_room").get("short"),"百毒池")){
					clickButton("go east",0);
				}
				else if (isContains(g_obj_map.get("msg_room").get("short"),"万蛊堂")){
					clickButton("go south",0);
				}
				else{
					doYunyuan = 1;
					go("jh 2;n;n;n;n;n;n;n;n;n;n;n;n");
					setTimeout(function (){go("n;n;n;n;w;s;s;s;s;e;event_1_2215721");},7*1000);
					console.log("当前地点：" + g_obj_map.get("msg_room").get("short") + "  云远地点不正确，15秒后重置...");
					//10秒后重开killYunyuan
					setTimeout(function(){doYunyuan=0;},15*1000);
				}
			}else{
				doYunyuan = 1;
				go("jh 2;n;n;n;n;n;n;n;n;n;n;n;n");
				setTimeout(function (){go("n;n;n;n;w;s;s;s;s;e;event_1_2215721");},7*1000);
				console.log("room is undefined  15秒后重置...");
				//10秒后重开killYunyuan
				setTimeout(function(){doYunyuan=0;},15*1000);
			}
		}
		//timeCounter++

		//计数复位
        if (yunyuanCount >3 )
		{
			yunyuanCount = 0;
		}
		setTimeout(killYunyuan,1*1000);
	}
}

//签到----------------------------------------------------------------------------
function CheckIn(){
	go('jh 1;event_1_61814991;event_1_63936630;event_1_2847443;event_1_43728742;items use obj_molitang;items use obj_lanlingmeijiu;home;');//礼包
    go('jh 1;w;event_1_46497436;home;');//纪念金庸
    go('vip drops');//领通勤
  //go('vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;');//10次暴击
    go('vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig');//挖宝
    go('vip finish_fb dulongzhai;vip finish_fb dulongzhai;vip finish_fb junying;vip finish_fb junying;vip finish_fb beidou;vip finish_fb beidou;vip finish_fb youling;vip finish_fb youling;vip finish_fb siyu');//副本扫荡
    go('vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;');//钓鱼
    go('clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;clan incense yx;');//上香
    go('sort;sort fetch_reward;');//排行榜奖励
    go("share_ok 1;share_ok 2;share_ok 3;share_ok 4;share_ok 5;share_ok 7;");//分享
    go('cangjian get_all;xueyin_shenbinggu blade get_all;xueyin_shenbinggu unarmed get_all;xueyin_shenbinggu throwing get_all;xueyin_shenbinggu spear get_all;xueyin_shenbinggu stick get_all;');//闯楼奖励
    go('jh 5;n;n;n;w;sign7;home;');//扬州签到
    go('jh 1;e;n;e;e;event_1_44731074;event_1_8041045;event_1_8041045;event_1_29721519;event_1_60133236;home;');//消费积分和谜题卡
    //go("jh 1;e;n;e;e;e;e;n;lq_bysf_lb;lq_lmyh_lb;home;");//比翼双飞和劳模英豪
    go('jh 2;n;n;n;n;n;n;n;e;tzjh_lq;w;n;n;n;n;n;n;n;n;n;n;n;n;e;n;n;n;w;event_1_31320275;home');//采莲
    go('jh 26;w;w;n;e;e;event_1_18075497;home');//大招采矿
    go('jh 26;w;w;n;n;event_1_14435995;home');//大招破阵
    go("jh 37;n;e;e;nw;nw;w;n;e;n;e;e;e;ne;ne;ne;se;n;event_1_97487911;home");//绝情谷鳄鱼
    go('jh 35;nw;nw;nw;n;ne;nw;w;nw;e;e;e;e;e;se;n;n;w;n;w;event_1_53278632;sousuo;sousuo;home'); //冰火岛玄重铁
    //go("jh 14;sw;s;e;s;s;sw;sw;w;w;s;s;e;e;e;n;ne;event_1_56989555 go;home");//唐门试练
    go("jh 28;n;w;w;w;w;w;w;nw;ne;nw;ne;nw;ne;e");//射雕
}
//晚安----------------------------------------------------------------------------
function Goodnight(){
     go('sort;sort fetch_reward;');//排行榜奖励
     go('jh 1;e;n;e;e;event_1_44731074;event_1_8041045;event_1_8041045;event_1_29721519;event_1_60133236;home;');//消费积分和谜题卡百宝
     go('clan buy 703;clan buy 703;clan buy 703;clan buy 703;clan buy 703;clan buy 703;clan buy 703;clan buy 703;clan buy 703;clan buy 703;clan buy 601;clan buy 401;clan buy 302;clan buy 302;clan buy 302;clan buy 302;clan buy 302;home;');//帮派商店

}
//==========================
var sendrequest=0;

function sendtell(){
	if (sendrequest==0){
		if (g_obj_map.get("msg_attrs")==undefined){
			setTimeout(function(){sendtell()},1000);
		}else{
			var me=g_obj_map.get("msg_attrs").get("id");
			send("tell u3823757 "+me+"HUAIrequest\n");
		}
	}
}
//sendtell();
// 打凤泉----------------------------------------------------
function fengquanFunc(){
    go("jh 7;s;s;s;s;s;s;s;s;e;n;e;s;e;kill scholar_master");
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
//大昭壁画-------------------------
function MianBiFunc(){
    go('jh 26;w;w;n;w;w;w;n;n;e;event_1_12853448;home');
}
//采莲-------------------------
function cailian(){
   go('jh 2;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;e;n;n;n;w;event_1_31320275');
   setTimeout(shilian,2000);
}
//试炼-------------------------
function shilian(){
   go('jh 14;sw;s;e;s;s;sw;sw;w;w;s;s;e;e;e;n;ne;event_1_56989555;event_1_56989555 go');
   setTimeout(startCangxi,2000);
}
//壁画========================================
var cangxiTrigger = 0;
function Cangxiyanhua(){
	this.dispatchMessage=function(b){
		var type = b.get("type"), subType = b.get("subtype");
		//console.log(b);
		//console.log("type=" + type + " subtype=" + subType);
		//console.log(subType);
		if (type=="vs"&&subType=="vs_info"){ //这是进入战斗的提示
			console.log("进入战斗");
			clickButton("escape",0)
		}else if (type=="vs"&&subType=="combat_result"){//战斗结束 继续调取击
			send("look_room\n");
			clickButton('jh 26');
			//setTimeout(cangxi,1000);
		}else if (type=="jh" &&subType=="info"){
			var locationname=g_obj_map.get("msg_room").get("short");
			var roominfo = g_obj_map.get("msg_room");
			console.log(locationname);
			if (locationname=="阴山古刹"){
				clickButton('jh 26');
			}else if (locationname=="阴山密林"){
				for(var i = 0;i<direction.length;i++)
				{
					if (roominfo.get(direction[i])!=undefined){
						if (roominfo.get(direction[i]).match("阴山密林"))
						{
							clickButton("go "+direction[i]);
							return;
						}
					}
				}
			}else if (locationname=="阴山岩画"){
				clickButton("event_1_12853448");
				cangxiTrigger = 0 ;
			}else{

			}
		}else if (type== "suc" && subType== "jh 26"){
			pushCmd('go west');
			pushCmd('go west');
			pushCmd('go north');
			pushCmd('go west');
			pushCmd('go west');
			pushCmd('go west');
			pushCmd('go north');
			pushCmd('go north');
		} else
		{
			//setTimeout(cangxi,1000);
		}
	}
}
var cangxiyanhua  = new Cangxiyanhua;
function startCangxi()
{
	cangxiTrigger = 1;
	pushCmd("jh 26");
}

function cangxi(){
    //pushCmd("home");
    console.log("fighting = " + g_gmain.is_fighting);
	if (undefined == g_obj_map.get("msg_room"))
	{
		pushCmd('jh 26');
		pushCmd('go west');
		pushCmd('go west');
		pushCmd('go north');
		pushCmd('go west');
		pushCmd('go west');
		pushCmd('go west');
		pushCmd('go north');
		pushCmd('go north');
		//setTimeout(function(){cangxi();},500);
	}else{
		var locationname=g_obj_map.get("msg_room").get("short");
		console.log(locationname);
		if (locationname=="阴山古刹"&&cmdQueue.isEmpty()){
			pushCmd('jh 26');
			pushCmd('go west');
			pushCmd('go west');
			pushCmd('go north');
			pushCmd('go west');
			pushCmd('go west');
			pushCmd('go north');
			pushCmd('go north');
			setTimeout(function(){cangxi();},500);
		}else if (locationname=="阴山密林"&&cmdQueue.isEmpty()){
			pushCmd("go north");
			setTimeout(function(){cangxi();},500);
		}else if (locationname=="阴山岩画"&&cmdQueue.isEmpty()){
			console.log(locationname);
			pushCmd("event_1_12853448");
			cangxiTrigger =0 ;
		}else{
			pushCmd('jh 26');
			pushCmd('go west');
			pushCmd('go west');
			pushCmd('go north');
			pushCmd('go west');
			pushCmd('go west');
			pushCmd('go west');
			pushCmd('go north');
			pushCmd('go north');
			setTimeout(function(){cangxi();},500);
		}

	}
}
//====================================
function weieyu(){
	var jhlist=g_obj_map.get("msg_jh_list").get("finish37");
	if (jhlist!=undefined&&jhlist!=0){
		pushCmd("jh 37");
		pushCmd("go north");
		pushCmd("go east");
		pushCmd("go east");
		pushCmd("go northwest");
		pushCmd("go northwest");
		pushCmd("go west");
		pushCmd("go north");
		pushCmd("go east");
		pushCmd("go north");
		pushCmd("go east");
		pushCmd("go east");
		pushCmd("go east");
		pushCmd("go northeast");
		pushCmd("go northeast");
		pushCmd("go northeast");
		pushCmd("go southeast");
		pushCmd("go north");
		pushCmd('event_1_97487911');
		console.log("喂过鳄鱼");
		xiakedao1();
	}else{
		xiakedao1();
	}
}


function maikuli() {
	pushCmd('work click maikuli');
}
function duancha() {
	pushCmd('work click duancha');
}
function dalie() {
	pushCmd('work click dalie');
}
function baobiao() {
	pushCmd('work click baobiao');
}
function maiyi() {
	pushCmd('work click maiyi');
}
function xuncheng() {
	pushCmd('work click xuncheng');
}
function datufei() {
	pushCmd('work click datufei');
}
function dalei() {
	pushCmd('work click dalei');
}
function kangjijinbin() {
	pushCmd('work click kangjijinbin');
}
function zhidaodiying() {
	pushCmd('work click zhidaodiying');
}
function dantiaoqunmen() {
	pushCmd('work click dantiaoqunmen');
}
function shenshanxiulian() {
	pushCmd('work click shenshanxiulian');
}
function jianmenlipai(){
	pushCmd('work click jianmenlipai');
}
function dubawulin(){
	pushCmd('work click dubawulin');
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
	jianmenlipai();
	dubawulin();
	pushCmd('public_op3'); // 向师傅磕头
}

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
		}

		else if(isContains(mijing,"石街"))
		{
			go("jh 2;n;n;n;n;w;event_1_98995501;n");
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


var mijingTrigger=0;
	function mijingFunc(){
		var roominfor=g_obj_map.get("msg_room").get("map_id");
		var mijingid=["tianlongshan","dafuchuan","fomenshiku","dilongling","luanshishan","lvzhou","taohuadu","daojiangu","binhaigucheng","baguamen","lvshuige","langhuanyudong","nanmanzhidi","fengduguicheng"];
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
		if (roominfor=="langhuanyudong"){
					pushCmd("go northwest");
					pushCmd("event_1_92817399");
					pushCmd("go west");
					pushCmd("event_1_91110342");
					pushCmd("go south");
					pushCmd("event_1_74276536");
					pushCmd("go southeast");
					pushCmd("event_1_14726005");
					pushCmd("go southwest");
					pushCmd("event_1_66980486");
					pushCmd("go northwest");
					pushCmd("event_1_39972900");
					pushCmd("go northwest");
					pushCmd("event_1_61689122");
					pushCmd("go west");
					pushCmd("event_1_19336706");
					pushCmd("go south");
					pushCmd("event_1_30457951");
					pushCmd("go southwest");
					pushCmd("event_1_96023188");
					pushCmd("go south");
			return;
		}
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
				}else if (roominfor=="binghaigucheng"){
					if (zhuguo>=3385){
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
				}else if (roominfor=="nanmanzhidi"){
					if (zhuguo>=3890){
						clickButton(roominfor+'_saodang go',0);
					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="fengduguicheng"){
					if (zhuguo>=3895){
						clickButton(roominfor+'_saodang go',0);
					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}
			}
		}
	}

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
		pushCmd('find_task_road qixia ' + QXindex);
		pushCmd('golook_room');
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
	function TalkLangjuXu(){
		//13 狼居胥
		if (QXStop==1){
			return;
		}
		TalkQXBase("狼居胥",13);
	}
	function TalkLieJiuZhou(){
		//14 烈九州
		if (QXStop==1){
			return;
		}
		TalkQXBase("烈九州",14);
	}
	function TalkMuMiaoYu(){
		//15 穆妙羽
		if (QXStop==1){
			return;
		}
		TalkQXBase("穆妙羽",15);
	}
	function TalkYuWenWuDi(){
		//16 宇文无敌
		if (QXStop==1){
			return;
		}
		TalkQXBase("宇文无敌",16);
	}
	function TalkLiXuanBa(){
		//17 李玄霸
		if (QXStop==1){
			return;
		}
		TalkQXBase("李玄霸",17);
	}
	function TalkBaBuLongJiang(){
		//18 八部龙将
		if (QXStop==1){
			return;
		}
		TalkQXBase("八部龙将",18);
	}
	function TalkLiCangRuo(){
		//19 厉沧若
		if (QXStop==1){
			return;
		}
		TalkQXBase("厉沧若",19);
	}
	function TalkXiaYueQing(){
		//20 夏岳卿
		if (QXStop==1){
			return;
		}
		TalkQXBase("夏岳卿",20);
	}
	function TalkMiaoWuXin(){
		//21 妙无心
		if (QXStop==1){
			return;
		}
		TalkQXBase("妙无心",21);
	}
	function TalkWuYeJi(){
		//22 巫夜姬
		if (QXStop==1){
			return;
		}
		TalkQXBase("巫夜姬",22);
	}
	function TalkXuanYueYan(){
		//23 玄月研
		if (QXStop==1){
			return;
		}
		TalkQXBase("玄月研",23);
	}
	function TalkFengWuHeng(){
		//24 风无痕
		if (QXStop==1){
			return;
		}
		TalkQXBase("风无痕",24);
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
		console.log(temparray);//第一次排序结束。现在要挑出所有3万以上的亲密 并且放到最后。
		for (var i=0;i<temparray.length;i++){
			if (parseInt(temparray[i]["degree"])>30000){//找到3万以上的
				over3.push(i);//push超过3万的序号
			}
		}
		console.log(over3);
		var overarray=[];
		var overcounter=0;
		for (var i=0;i<temparray.length;i++){ //第一遍循环 找到不在1万列表中的
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
		if (QixiaTotalCounter<=24){// 奇侠list仍然有元素。开始调取排列第一个的奇侠
			var Qixianame="";
			var QixiaIndex=0;
			console.log(finallist[0]["name"]);
			Qixianame=finallist[QixiaTotalCounter]["name"];
			QixiaIndex=finallist[QixiaTotalCounter]["index"];
			if (finallist[QixiaTotalCounter]["isOk"]!=true){
				alert("奇侠"+Qixianame+"目前不在江湖，可能死亡，可能在师门。领取朱果中断，请在一段时间之后重新点击领取朱果按钮。无需刷新页面");
				return;
				//QixiaTotalCounter++;
				//GetQXID(Qixianame,QixiaIndex);
			}else{
				console.log(finallist[0]);
				console.log(finallist[0]);
				clickButton('find_task_road qixia '+QixiaIndex);

				console.log(QixiaIndex);
				GetQXID(Qixianame,QixiaIndex);
			}
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
				arr2 = arr[i].replace("朱果","").match(/<td[^>]*>([^\d\(]*)\(?(\d*)\)?<\/td><td[^>]*>(.*?)<\/td><td[^>]*>(.*?)<\/td><td[^>]*>.*?<\/td>/);
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
			case "狼居胥":
				setTimeout(TalkLangjuXu, currentTime);
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
			case "玄月研":
				setTimeout(TalkXuanYueYan, currentTime);
				break;
			case "风无痕":
				setTimeout(TalkFengWuHeng, currentTime);
				break;
			default:
				console.error("没有找到该奇侠：" + localname + " ！");
		}
	}

//比试奇侠--------------------------------
function BiShiFunc(){
    if(btnList["比试奇侠"].innerText  == '比试奇侠'){
        var Swordsman_targetName = prompt("请输入奇侠名称","只需要修改游侠名称，小号自动比试");
		if (Swordsman_targetName)
		{
			fightSwordsmanFunc();
			btnList["比试奇侠"].innerText  = '停止比试';}
	    }
    else{clearKill();
         {btnList["比试奇侠"].innerText  = '比试奇侠';}
        }

    function fightSwordsmanFunc(){
        // 间隔2000毫秒查找比试一次
        fightSwordsmanIntervalFunc = setInterval(fightSwordsman,1000);
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

function answerQuestionFunc(){
	   pushCmd('look_room');
	   console.log("aaa");
	   clickButton('question', 0);
	}
//-----------通用发招代码--------

function heal(){

}

function performCombo()
{
	if (1==performComboTrigger)
	{

        performComboA();
		if($('span.outbig_text:contains(战斗结束)').length>0){
			clickButton('golook_room');
		}
		setTimeout(performCombo,800);
    }
}

function performComboA()
{
   if (gSocketMsg.get_xdz()<6) return;
	var performCount=0;
	// 如果找到设置的技能则释放
	for(var i = 1;i < 5;i++){
        skillName = $('#skill_'+i).children().children().text();
		console.log(comboSkillList);
        if(skillName !== "" && isContains(comboSkillList, skillName)){
            console.log(skillName);
            pushCmd('playskill '+i);
    		performCount ++;
        }
		if (performCount>1) return;
    }

    // 如果没找到设置技能，随便用一个非招bb的技能
    for(i = 1;i < 5;i++){
        skillName = $('#skill_'+i).children().children().text();
        if(skillName !== "" && !isContains(excludeSkills, skillName)){
            //console.log(skillName);
            clickButton('playskill '+i);
            return;
        }
    }
}

function performSkill(){
	if (1==performSkillTrigger||1==performComboTrigger)
	{
        var intervalValue = 600;
		if (g_gmain.is_fighting&&gSocketMsg.get_xdz()>1) performSkillA();
		if($('span.outbig_text:contains(战斗结束)').length>0){
			if (playerAttrs&&playerAttrs["force"]<=forceToRefresh2)
			{
				var flag = 0;
				if ('停杀'==btnList['叫杀'])
				{
					killTianJianTargetFunc();
					flag = 1;
				}
				for (var i =0;i<Math.ceil((playerAttrs["max_force"]-playerAttrs["force"])/5000);i++){
					pushCmd('items use snow_qiannianlingzhi');
					intervalValue+=300;
				}
				pushCmd('prev_combat,1');
				pushCmd('golook_room');
				if (flag){
					setTimeout(killTianJianTargetFunc,intervalValue);
				}
			}else
			{
				pushCmd('prev_combat,1');
				pushCmd('golook_room');
			}
			healCurTimes = 0;

		}
		setTimeout(performSkill,intervalValue);
    }
}



function performSkillA(){

	playerAttrs = getPlayerAttr();
	var isRefresh = false;
	var skillName = "";
	//判断player属性
	if (playerAttrs)
	{
		//console.log(m["kee"] + " ::" + m["max_kee"]);
		//console.log((m["kee"]-0)/(m["max_kee"]-0));
		//console.log(playerAttrs["force"] + "::" + playerAttrs["max_force"]);
		if (playerAttrs["force"]<=forceToRefresh)
		{
			for(var i = 1;i <= skillPanelMax;i++){
				skillName = $('#skill_'+i).children().children().text();
				//console.log(comboSkillList);
				if(skillName !== "" && isContains(skillName, "不动明王诀")){
					//console.log(skillName);
					clickButton('playskill '+i);
					isRefresh = true;
				}
			}
			//if (!isRefresh)
			//{
			//	clickButton("escape",0);
			//}
		}else{
			if (playerAttrs["kee"]/playerAttrs["max_kee"] <= keeToHeal){
				if (healCurTimes>healMaxTimes)
				{
					clickButton("escape",0);
				}else{
					//优先回血
					if (gSocketMsg.get_xdz()<2) return;

					var healSkills = healSkillList.split(";");
					var isHeal = false;
					for (var j=0;j < healSkills.length;j++)
					{
						if (isHeal) break;
						for(var i = 1;i <=skillPanelMax;i++){
							skillName = $('#skill_'+i).children().children().text();
							//console.log(skillList);
							// 如果找到设置的回血技能则释放
							if(skillName !== "" && isContains(healSkills[j], skillName)){
								//console.log("healTimes : " +healCurTimes+"  healSkill:" + skillName);
								clickButton('playskill '+i,0);
								healCurTimes ++;
								isHeal = true;
								break;
						 }
					   }
				   }
			   }
			}
		}
	}

	if ( !performSkillTrigger && 1==performComboTrigger && gSocketMsg.get_xdz()<6) return;

	if (1==Trigger) {
	   performSingleSkill();
	}else if (1==performComboTrigger){
		performComboSkill();
	}


	/*
	var performCount=0;

    for(var i = 1;i < 5;i++){
        skillName = $('#skill_'+i).children().children().text();
		//console.log(skillList);
        if(skillName !== "" && 1==Trigger && isContains(skillList, skillName)){
            //console.log(skillName);
            clickButton('playskill '+i,0);
			return;
        }else if (skillName !== ""&&1==performComboTrigger && isContains(comboSkillList, skillName))
		{
			clickButton('playskill '+i,0);
			performCount ++;
			if (performCount>1) return;
		}
    }

    // 如果没找到设置技能，随便用一个非招bb的技能
    for(i = 1;i < 5;i++){
        skillName = $('#skill_'+i).children().children().text();
        if(skillName !== "" && !isContains(excludeSkills, skillName)){
            console.log(skillName);
            clickButton('playskill '+i);
            return;
        }
    }
	*/
}

function performSingleSkill(){

	if (gSocketMsg.get_xdz()<2) return;
	var skillName;
	var skills = skillList.split(";");

	for(var j=0;j<skills.length;j++)
	{
		// 如果找到设置的技能则释放
		for(var i = 1;i <= skillPanelMax;i++){
		    skillName = $('#skill_'+i).children().children().text();
			//console.log(comboSkillList);
			if(skillName !== "" && isContains(skills[j], skillName)){
				//console.log(skillName);
				clickButton('playskill '+i);
				return;
			}
		}
	}



    // 如果没找到设置技能，随便用一个非招bb的技能
    for(i = 1;i <=skillPanelMax;i++){
        skillName = $('#skill_'+i).children().children().text();
        if(skillName !== "" && !isContains(excludeSkills, skillName)){
            //console.log(skillName);
            clickButton('playskill '+i);
            return;
        }
    }

}

function performSkill2(){
	if (1==performSkillTrigger2||1==performComboTrigger)
	{
        var intervalValue = 600;
		if (g_gmain.is_fighting&&gSocketMsg.get_xdz()>1) performSkill2A();
		if($('span.outbig_text:contains(战斗结束)').length>0){
			if (playerAttrs&&playerAttrs["force"]<=forceToRefresh2)
			{
				var flag = 0;
				if ('停杀'==btnList['叫杀'])
				{
					killTianJianTargetFunc();
					flag = 1;
				}
				for (var i =0;i<Math.ceil((playerAttrs["max_force"]-playerAttrs["force"])/5000);i++){
					pushCmd('items use snow_qiannianlingzhi');
					intervalValue+=300;
				}
				pushCmd('prev_combat,1');
				pushCmd('golook_room');
				if (flag){
					setTimeout(killTianJianTargetFunc,intervalValue);
				}
			}else
			{
				pushCmd('prev_combat,1');
				pushCmd('golook_room');
			}
			healCurTimes = 0;

		}
		setTimeout(performSkill2,intervalValue);
    }
}



function performSkill2A(){

	playerAttrs = getPlayerAttr();
	var isRefresh = false;
	var skillName = "";
	//判断player属性
	if (playerAttrs)
	{
		//console.log(m["kee"] + " ::" + m["max_kee"]);
		//console.log((m["kee"]-0)/(m["max_kee"]-0));
		//console.log(playerAttrs["force"] + "::" + playerAttrs["max_force"]);
		if (playerAttrs["force"]<=forceToRefresh)
		{
			for(var i = 1;i <= skillPanelMax;i++){
				skillName = $('#skill_'+i).children().children().text();
				//console.log(comboSkillList);
				if(skillName !== "" && isContains(skillName, "不动明王诀")){
					//console.log(skillName);
					clickButton('playskill '+i);
					isRefresh = true;
				}
			}
			//if (!isRefresh)
			//{
				//clickButton("escape",0);
			//}
		}else{
			if (playerAttrs["kee"]/playerAttrs["max_kee"] <= keeToHeal){
				if (healCurTimes>healMaxTimes)
				{
					//clickButton("escape",0);
				}else{
					//优先回血
					if (gSocketMsg.get_xdz()<2) return;

					var healSkills = healSkillList.split(";");
					var isHeal = false;
					for (var j=0;j < healSkills.length;j++)
					{
						if (isHeal) break;
						for(var i = 1;i <=skillPanelMax;i++){
							skillName = $('#skill_'+i).children().children().text();
							//console.log(skillList);
							// 如果找到设置的回血技能则释放
							if(skillName !== "" && isContains(healSkills[j], skillName)){
								//console.log("healTimes : " +healCurTimes+"  healSkill:" + skillName);
								clickButton('playskill '+i,0);
								healCurTimes ++;
								isHeal = true;
								break;
						 }
					   }
				   }
			   }
			}
		}
	}

	if ( !performSkillTrigger2 && 1==performComboTrigger && gSocketMsg.get_xdz()<6) return;

	if (1==performSkillTrigger2) {
	   performSingleSkill2();
	}else if (1==performComboTrigger){
		performComboSkill();
	}


	/*
	var performCount=0;

    for(var i = 1;i < 5;i++){
        skillName = $('#skill_'+i).children().children().text();
		//console.log(skillList);
        if(skillName !== "" && 1==performSkillTrigger && isContains(skillList, skillName)){
            //console.log(skillName);
            clickButton('playskill '+i,0);
			return;
        }else if (skillName !== ""&&1==performComboTrigger && isContains(comboSkillList, skillName))
		{
			clickButton('playskill '+i,0);
			performCount ++;
			if (performCount>1) return;
		}
    }

    // 如果没找到设置技能，随便用一个非招bb的技能
    for(i = 1;i < 5;i++){
        skillName = $('#skill_'+i).children().children().text();
        if(skillName !== "" && !isContains(excludeSkills, skillName)){
            console.log(skillName);
            clickButton('playskill '+i);
            return;
        }
    }
	*/
}

function performSingleSkill2(){

	if (gSocketMsg.get_xdz()<3) return;
	var skillName;
	var skills = skillList2.split(";");

	for(var j=0;j<skills.length;j++)
	{
		// 如果找到设置的技能则释放
		for(var i = 1;i <= skillPanelMax;i++){
		    skillName = $('#skill_'+i).children().children().text();
			//console.log(comboSkillList);
			if(skillName !== "" && isContains(skills[j], skillName)){
				//console.log(skillName);
				clickButton('playskill '+i);
				return;
			}
		}
	}



    // 如果没找到设置技能，随便用一个非招bb的技能
    for(i = 1;i <=skillPanelMax;i++){
        skillName = $('#skill_'+i).children().children().text();
        if(skillName !== "" && !isContains(excludeSkills, skillName)){
            //console.log(skillName);
            clickButton('playskill '+i);
            return;
        }
    }

}

function performComboSkill()
{
    if (gSocketMsg.get_xdz()<6) return;
	var performCount=0;
	var zhenList = comboSkillListEx.split(";");
	var skillPerform;
	for(var j=0;j<zhenList.length;j++)
	{
		var zhenSkill = zhenList[j].split(":");
		performCount = 0;
		skillPerform = null;
		for(var k=0;k<zhenSkill.length;k++)
		{
			// 如果找到设置的技能则释放
			for(var i = 1;i <=skillPanelMax;i++){
				skillName = $('#skill_'+i).children().children().text();
				//console.log(comboSkillList);
				if(skillName !== "" && isContains(zhenSkill[k], skillName)){
					//console.log(skillName);
					//clickButton('playskill '+i);
					skillPerform = skillPerform + ";" + "playskill "+i;
					performCount ++;
				}

			}
		}
		//找到阵的两个技能以上
		if (performCount>1)
	    {
			var skills = skillPerform.split(";");
			//console.log(skills);
			for(var n=0;n<skills.length;n++)
			{
				if (skills[n])
				{
					clickButton(skills[n]);
				}
			}
			return;
		}

	}



    // 如果没找到设置技能，随便用一个非招bb的技能
    for(i = 1;i <=skillPanelMax;i++){
        skillName = $('#skill_'+i).children().children().text();
        if(skillName !== "" && !isContains(excludeSkills, skillName)){
            //console.log(skillName);
            clickButton('playskill '+i);
            return;
        }
    }
}

function getPlayerAttr()
{
	var playerName=ansi_up.ansi_to_text(g_obj_map.get("msg_attrs").get("name"));
	var area = "[22]";
    var vsSide = 0;
	var vsPos = 0;
	var rst = {};
	for (var i=0;i<4;i++){
		if (g_obj_map.get("msg_vs_info")!=undefined){
			if(g_obj_map.get("msg_vs_info").get("vs2_name"+(i+1))!=undefined){
				if (ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs2_name"+(i+1))).replace(area,"")==playerName){
					vsSide=1;
					vsPos = i+1;
					rst["kee"]=g_obj_map.get("msg_vs_info").get("vs2_kee"+(i+1));
					rst["max_kee"]=g_obj_map.get("msg_attrs").get("max_kee");
					rst["force"]=g_obj_map.get("msg_vs_info").get("vs2_force"+(i+1));
					rst["max_force"]=g_obj_map.get("msg_attrs").get("max_force");
					break;
				}
			}
		}
		if (g_obj_map.get("msg_vs_info")!=undefined){
			if(g_obj_map.get("msg_vs_info").get("vs1_name"+(i+1))!=undefined){
					if (ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs1_name"+(i+1))).replace(area,"")==playerName){
					vsSide=2;
					rst["kee"]=g_obj_map.get("msg_vs_info").get("vs1_kee"+(i+1));
					rst["max_kee"]=g_obj_map.get("msg_attrs").get("max_kee");
					rst["force"]=g_obj_map.get("msg_vs_info").get("vs1_force"+(i+1));
					rst["max_force"]=g_obj_map.get("msg_attrs").get("max_force");
					vsPos = i+1;
					break;
				}
			}
		}
	}
   if (vsSide==0||vsPos==0) return undefined;
   return rst;
}

// 杀坏人----------------------------------------------------------------------------------------------------------------
var HongMingNPCList =["无『双』公主","[71-75区]恶棍", "[71-75区]流寇", "[71-75区]剧盗","[71-75区]云老四", "[71-75区]岳老三", "[71-75区]二娘","[71-75区]段老大","[71-75区]墟归一","[71-75区]上官晓芙","[71-75区]洪昭天", "[新区]恶1棍", "[新区]流1寇", "[新区]剧1盗","[新区]云1老四", "[新区]岳1老三", "[新区]二1娘","[新区]段老1大", "恶棍", "流寇", "云老四", "岳老三", "二娘","段老大","剧盗"];
var killHongMingIntervalFunc =  null;
var currentNPCIndex = 0;

function killHongMingTargetFunc(){
   // zdskill =  null;
    if (btnList["坏人"].innerText == '坏人'){
        currentNPCIndex = 0;
        console.log("开始杀红名目标NPC！");
    //    skillLists = mySkillLists;
        btnList["坏人"].innerText ='停坏';
        killHongMingIntervalFunc = setInterval(killHongMing, 500);

    }else{
        console.log("停止杀红名目标NPC！");
        btnList["坏人"].innerText ='坏人';
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
var killHuangMingIntervalFunc = null;

var currentNPCIndex = 0;

function killHuangMingTargetFunc(){
  //  zdskill = null;
    if (btnList["好人"].innerText=='好人'){
        currentNPCIndex = 0;
        console.log("开始杀好人目标NPC！");
       // skillLists = mySkillLists;
        btnList["好人"].innerText ='停好';
        killHuangMingIntervalFunc = setInterval(killHuangMing, 500);

    }else{
        console.log("停止杀好人目标NPC！");
        btnList["好人"].innerText ='好人';
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

//--------叫杀
var killTianJianIntervalFunc =  null;
//var currentNPCIndex = 0;
function killTianJianTargetFunc(){
    //zdskill =  mySkillLists;
    if (btnList["叫杀"].innerText == '叫杀'){
        currentNPCIndex = 0;
        console.log("开始杀天剑目标NPC！");
        //skillLists = mySkillLists;
        btnList["叫杀"].innerText ='停叫杀';
        killTianJianIntervalFunc = setInterval(killTianJian, 500);

    }else{
        console.log("停止杀天剑目标NPC！");
        btnList["叫杀"].innerText ='叫杀';
        clearInterval(killTianJianIntervalFunc);
		killTianJianIntervalFunc = null;
    }
}

function killTianJian(){
    if ($('span').text().slice(-7) == "不能杀这个人。"){
        currentNPCIndex = currentNPCIndex + 1;
        console.log("不能杀这个人！");
        //        return;
    }
    getTianJianTargetCode();
    //setTimeout(ninesword, 200);
    if($('span:contains(胜利)').text().slice(-3)=='胜利！' || $('span:contains(战败了)').text().slice(-6)=='战败了...'){
        currentNPCIndex = 0;
        console.log('杀人一次！');
        //clickButton('prev_combat');
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
//-----------跨服天剑谷----------
var tianjianTrigger=0;
var path=[];
	var tjfight=0;
	var tjroomclear=0;
	var preroomrandom="";
	var direction=["west","east","south","north","southwest","southeast","northeast","northwest"];//八个方向
	function tianjianFunc(){
		if (tianjianTrigger==0){
			btnList["天剑"].innerText = '停剑';
			tianjianTrigger=1;
			killtianjian();
			tianjianmove();
		}else if (tianjianTrigger==1){
			btnList["天剑"].innerText = '天剑';
			tianjianTrigger=0;
			tjroomclear=0;
			path=[];
			tjfight=0;
			preroomrandom="";
		}
	}

	function tianjianmove(){
		var roominfo=g_obj_map.get("msg_room");
		if ((roominfo==undefined||tjroomclear==0)&&tianjianTrigger==1){//房间信息没有刷新，或者在战斗，或者房间内还有npc
			 setTimeout(function(){tianjianmove();},200);
		}else{
			console.log(path);
			for (var i=0;i<8;i++){
				if (roominfo.get(direction[i])!=undefined){
					if (roominfo.get(direction[i]).match("峡谷")==null&&(path.length<=10||Math.random()>0.4)){//不包含峡谷两个字，为特殊房间
					preroomrandom=roominfo.get("go_random");
					tjroomclear=0;
					path.push(g_obj_map.get("msg_room").get(direction[i]));
					clickButton("go "+direction[i]); //移动到特殊房间
			if (tianjianTrigger==1){
				tianjianmove();
				setTimeout(killtianjian,1000);
			}
					return;
					}
				}

			}
			//没有特殊房间，开始寻找普通房间
			for (var i=0;i<8;i++){
				if (roominfo.get(direction[i])!=undefined){
					if (path.indexOf(g_obj_map.get("msg_room").get(direction[i]))==-1){
					path.push(g_obj_map.get("msg_room").get(direction[i]));
					preroomrandom=roominfo.get("go_random");
					tjroomclear=0;
					clickButton("go "+direction[i],0);
			if (tianjianTrigger==1){
				tianjianmove();
				setTimeout(killtianjian,1000);
			}
					return;
					}
				}
			}
			preroomrandom=roominfo.get("go_random");
			var randomdirect=Math.round((Math.random()*7));
			while(roominfo.get(direction[randomdirect])==undefined){
				randomdirect=Math.round((Math.random()*7));
			}
			tjroomclear=0;
			clickButton("go "+direction[randomdirect],0);
			if (tianjianTrigger==1){
				tianjianmove();
				setTimeout(killtianjian,1000);
			}


		}
	}
	function tianjianGu(){
		this.dispatchMessage=function(b){
			var type = b.get("type"), subType = b.get("subtype");
			//console.log(b);
			//console.log("type=" + type + " subtype=" + subType + " ready_pos = " + b.get("ready_pos"));
		    //console.log(subType);
			if (type=="vs"&&subType=="vs_info"){ //这是进入战斗的提示
			    console.log("进入战斗");
			    //performSkillA();
				//clickButton("playskill 1",0);//放个绝学先
			}else if (type=="vs"&&subType=="combat_result"){//战斗结束 继续调取击
				tjfight=0;
				send("look_room\n");
				setTimeout(killtianjian,1000);
			}
		}
	}
	function killtianjian(){
		var npclist=g_obj_map.get("msg_room");
		if ((npclist==undefined||tjfight==1)&&tianjianTrigger==1){
			setTimeout(function(){killtianjian();},200);
		}else{
			if (npclist.get("go_random")==preroomrandom&&g_obj_map.get("msg_team")==undefined){//没动啊，是队长或者一个人的话就再次调用移动
				tjroomclear=1;
				return;
			}else if(npclist.get("go_random")==preroomrandom&&g_obj_map.get("msg_team").get("is_learder")==undefined){
				tjroomclear=1;
				return;
			}else if(npclist.get("go_random")==preroomrandom&&g_obj_map.get("msg_team").get("is_learder")==1){
				tjroomclear=1;
				return;
			}
			for (var i=1;i<10;i++){
				if (npclist.get("npc"+i)==undefined){
					if (g_obj_map.get("msg_team")==undefined){
						break;
					}else if(g_obj_map.get("msg_team").get("is_learder")==undefined){
						break;
					}else if(g_obj_map.get("msg_team").get("is_learder")==1){
						break;
					}else if (parseInt(g_obj_map.get("msg_team").get("is_leader"))==0) {
						break;
					}
				}
				if (npclist.get("npc"+i).split(",")[0]!="kuafu_tjgws"&&npclist.get("npc"+i).split(",")[1].match("符兵")==null&&npclist.get("npc"+i).split(",")[1].match("天剑")==null&&npclist.get("npc"+i).split(",")[1].match("虹风")==null&&npclist.get("npc"+i).split(",")[1].match("虹电")==null&&npclist.get("npc"+i).split(",")[1].match("虹雨")==null&&npclist.get("npc"+i).split(",")[1].match("虹雷")==null){
					tjfight=1;
					clickButton("kill "+npclist.get("npc"+i).split(",")[0]);
					break;
				}

			}
			for (var i=1;i<10;i++){
				if (npclist.get("npc"+i)==undefined){
					if (g_obj_map.get("msg_team")==undefined){
						tjroomclear=1;
						return;
					}else if(g_obj_map.get("msg_team").get("is_learder")==undefined){
						tjroomclear=1;
						return;
					}else if(g_obj_map.get("msg_team").get("is_learder")==1){
						tjroomclear=1;
						return;
					}else if (parseInt(g_obj_map.get("msg_team").get("is_leader"))==0) {
						if (tianjianTrigger==1)
						setTimeout(killtianjian,200);
					}
				}
				if (npclist.get("npc"+i).split(",")[0]=="kuafu_tjgws"){
					tjfight=1;
					console.log("kill "+npclist.get("npc"+i).split(",")[0]);
					clickButton("kill "+npclist.get("npc"+i).split(",")[0]);
					return;
				}
			}
			killtianjian();
		}
	}
	var tianjian=new tianjianGu;

// 试剑----------------------------
function shijian(){

	if($('span.outbig_text:contains(战斗结束)').length>0){
			clickButton('golook_room');
	}
	if( isContains($('span:contains(你今天)').text().slice(-12), '你今天试剑次数已达限额。')){
        console.log('打完收工！');
    }else
	{
		if ($('.cmd_skill_button').length>0){
			performSkillA();
		}
		else{
			pushCmd('swords');
			pushCmd('swords select_member huashan_feng');   //风清扬
			pushCmd('swords select_member gumu_yangguo'); //神雕大侠
			pushCmd('swords select_member taoist_zhangtianshi'); //张天师
			pushCmd('swords fight_test go');
		}
		setTimeout(shijian,800);
	}
}
//摸尸体--------------------------------
function getFromCorpse(){
    if(btnList["摸尸体"].innerText  == '摸尸体'){
        var AutoGet_targetName = "尸体";
        btnList["摸尸体"].innerText  = '不摸了';
		autoGet();
    }else{
        btnList["摸尸体"].innerText  = '摸尸体';
    }
    function autoGet(){
		if ('不摸了'==btnList["摸尸体"].innerText)
		{
			$("button.cmd_click3").each(
				function(){
					if(isContains($(this).html() , AutoGet_targetName))
						eval($(this).attr("onclick").replace("look_item corpse","get corpse"));
				});
			setTimeout(autoGet,1500);
		}
    }
}

// 打榜----------------------------
function PaiHangFunc(){
    if ("打榜"==btnList["打榜"].innerText){
	   btnList["打榜"].innerText = "停榜";
	    clickButton('sort');
        clickButton('fight_hero 1');
        AutoPaiHangFunc();
   }else
   {
       clearPaiHang();
	   btnList["打榜"].innerText = "打榜";
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
        PaiHangFuncButton.innerText  = '打榜';
        clickButton('home');
        console.log('打完收工！');
    }
}
// 师门98帮派59 ----------------------------
function SHIMENBANGPAI100Func(){
    go('vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;');
    go('vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;');
}
// 吃千年灵芝-------------------------------------------
var healtriger=0;
	function yijianhuifuFunc(){
	   if (healtriger==0){
		   healtriger=1;
		   btnList["恢复"].innerText ='停止';
           healFunc();
	   }else{
		   btnList["恢复"].innerText ='恢复';
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
				btnList["恢复"].innerText ='恢复';
		   		healtriger=0;
			}
		}
	}
//-----------初始化代码----------
(function (window) {
	//---------UI初始化代码----Begin----
		addCSSRule(document.styleSheets[0], ".v", "float:right;width:14px;height:14px;overflow:hidden;display:inline-block;margin-top:-5px;margin-bottom:-5px;");
		addCSSRule(document.styleSheets[0], ".v01", "background-position:0 0;");
		addCSSRule(document.styleSheets[0], ".v02", "background-position:0 -16px;background:#990033;");
		addCSSRule(document.styleSheets[0], ".vcon", "padding-bottom:5px;");
		addCSSRule(document.styleSheets[0], ".vtitle", 'height:30px;background:#fbede0;line-height:30px;border:1px solid #ccb6a9;margin-top:0px;padding-left:20px;font-size:15px;font-weight:bold;color:#990033;font-family:"\5FAE\8F6F\96C5\9ED1";cursor:pointer;');
		addCSSRule(document.styleSheets[0], ".vtitle em", "margin:10px 10px 0 0;");
		addCSSRule(document.styleSheets[0], ".vconlist", "background:#9cc;");
		addCSSRule(document.styleSheets[0], ".vconlist li a", 'height:30px;line-height:30px;padding-left:30px;display:block;font-size:14px;color:#866f67;font-family:"\5FAE\8F6F\96C5\9ED1";');
		addCSSRule(document.styleSheets[0], ".vconlist li.select a", "color:#ed4948;text-decoration:none;");
		addCSSRule(document.styleSheets[0], ".vconlist li a:hover", "color:#ed4948;text-decoration:none;");
		//console.log(document.styleSheets[0]);
		//菜单隐藏展开
		var tabs_i=0
		$('.vtitle').click(function(){
			var _self = $(this);
			var j = $('.vtitle').index(_self);
			if( tabs_i == j ) return false; tabs_i = j;
			$('.vtitle em').each(function(e){
				if(e==tabs_i){
					$('em',_self).removeClass('v01').addClass('v02');
				}else{
					$(this).removeClass('v02').addClass('v01');
				}
			});
			$('.vcon').slideUp("fast").eq(tabs_i).slideDown("fast");
		});
		function addCSSRule(sheet, selector, rules, index) {
			if("insertRule" in sheet) {
				sheet.insertRule(selector + "{" + rules + "}", index);
			}
			else if("addRule" in sheet) {
				sheet.addRule(selector, rules, index);
			}
		}

		var sheet = (function() {
			// 创建 <style> 标签
			var style = document.createElement("style");

			// 可以添加一个媒体(/媒体查询,media query)属性
			// style.setAttribute("media", "screen")
			// style.setAttribute("media", "only screen and (max-width : 1024px)")

			// 对WebKit hack :(
			style.appendChild(document.createTextNode(""));


			// 将 <style> 元素加到页面中
			document.head.appendChild(style);

			return style.sheet;
		})();
		//---------UI初始化代码----End----
		window.go = function(dir) {
			console.debug("开始执行：", dir);
			var d = dir.split(";");
			for (var i = 0; i < d.length; i++)
				pushCmd(d[i], 0);
		};

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
			this.answers.put('首次通过乔阴县不可以获得那种奖励',"a");
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
            this.answers.put('清风寨在哪', "b");
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
			this.answers.put('丁老怪在星宿海的哪个场景', "b");
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
	        this.answers.put('论语在哪购买', "c");
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
            this.answers.put('青城派的道德经可以提升哪个属性', "d");
			this.answers.put('金项链可以在哪位npc那里获得', "d");

			this.answer = function(a) {
	//          alert("答案是：" + a);
				pushCmd("question " + a,0);
	//            go("question");
			}

			this.dispatchMessage = function(b) {
				var type = b.get("type"), msg= b.get("msg"),subtype=b.get("subtype");
				if (type == "show_html_page" && msg.indexOf("知识问答第") > 0) {
					console.log(msg);
					if (msg.indexOf("回答正确！") > 0) {
						pushCmd("question");
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

				}else if ("notice"==type && undefined==subtype){
					if (isContains(b.get("msg"),"你赢了这场宝藏秘图之战！"))
					{
		//				pushCmd("home");
		//				pushCmd("clan bzmt select go 1");
		//				pushCmd("clan bzmt puzz");
		//				pushCmd("look_room");
		//				doYunyuan = 0;
		//				console.log((new Date()).format("yyyy-MM-dd hh:mm:ss") + "  拼图");
					}
				}
			}
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
			}

			this.enable = function() {
				this.enabled = true;
			}

			this.disable = function() {
				this.enabled = false;
			}

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


			pushCmd("jh " + w, 0);
		};


		function Triggers() {
			this.allTriggers = [];

			this.trigger = function(line) {
				var t = this.allTriggers.slice(0);
				for (var i = 0, l = t.length; i < l; i++) {
					t[i].trigger(line);
				}
			}

			this.newTrigger = function(r, h, c, n) {
				var t = new Trigger(r, h, c, n);
				if (n) {
					for (var i = this.allTriggers.length - 1; i >= 0; i--) {
						if (this.allTriggers[i].name == n) this.allTriggers.splice(i, 1);
					}
				}

				this.allTriggers.push(t);

				return t;
			}

			this.enableTriggerByName = function(n) {
				for (var i = this.allTriggers.length - 1; i >= 0; i--) {
					t = this.allTriggers[i];
					if (t.name == n) t.enable();
				}
			}

			this.disableTriggerByName = function(n) {
				for (var i = this.allTriggers.length - 1; i >= 0; i--) {
					t = this.allTriggers[i];
					if (t.name == n) t.disable();
				}
			}

			this.enableByCls = function(c) {
				for (var i = this.allTriggers.length - 1; i >= 0; i--) {
					t = this.allTriggers[i];
					if (t.class == c) t.enable();
				}
			}

			this.disableByCls = function(c) {
				for (var i = this.allTriggers.length - 1; i >= 0; i--) {
					t = this.allTriggers[i];
					if (t.class == c) t.disable();
				}
			}

			this.removeByCls = function(c) {
				for (var i = this.allTriggers.length - 1; i >= 0; i--) {
					t = this.allTriggers[i];
					if (t && t.class == c) this.allTriggers.splice(i, 1);
				}
			}

			this.removeByName = function(n) {
				for (var i = this.allTriggers.length - 1; i >= 0; i--) {
					t = this.allTriggers[i];
					if (t.name == n) this.allTriggers.splice(i, 1);
				}
			}
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
				question.dispatchMessage(b);
				/*
				if (fishingTrigger==1){
					fishfeedback.dispatchMessage(b);
				}
				if (QxTalking==1){
					whipser.dispatchMessage(b);
				}
				if (escapeTrigger==1){
					escape.dispatchMessage(b);
				}
				if (onekillTrigger==1){
					onekill.dispatchMessage(b);
				}
				if(fanjiTrigger==1){
					combat.dispatchMessage(b);
				}
				if (kuafuTrigger==1){
					kuafu.dispatchMessage(b);
				}*/
				if (tianjianTrigger==1){
					tianjian.dispatchMessage(b);
				}
				if (cangxiTrigger==1)
				{
					cangxiyanhua.dispatchMessage(b);
				}

				if (kftfTrigger==1)
				{
					kftf.dispatchMessage(b);
				}
				/*
				if (Debug==1){
					debugm.dispatchMessage(b);
				}
				if (killerTrigger==1){
					killing.dispatchMessage(b);
				}
				if (GodMode==1){
					godview.dispatchMessage(b);
				}*/
				/*
				if (permission==0){
					allowed.dispatchMessage(b);
				}*/

			}
		};
		attach();

	})(window);
//-----------通用代码------------
function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
}
function execCmdQueue()
{
	if (!cmdQueue.isEmpty())
	{
		curStamp=(new Date()).valueOf();
		if ((curStamp-preStamp)>200){
			var cmd = cmdQueue.dequeue();
			clickButton(cmd);
			preStamp=curStamp;
		}
	}
	setTimeout(function(){execCmdQueue();},10);
}

execCmdQueue();
function pushCmd(cmd)
{
	cmdQueue.enqueue(cmd);
}
function pullCmd()
{
	if (j<100)
	{
		;
		console.log(cmdQueue.dequeue());
		j++;
		setTimeout(pullCmd,1000);
	}
}

//队列构造
function Queue() {

	this.items = [];
	//初始化队列方法
	if (typeof Queue.prototype.push != "function") {
		//入队
		Queue.prototype.enqueue = function() {
				var len = arguments.length;
				if (len == 0) {
					return;
				}
				for (var i = 0; i < len; i++) {
					this.items.push(arguments[i])
				}
			}
			//出队
		Queue.prototype.dequeue = function() {
				var result = this.items.shift();
				return typeof result != 'undefined' ? result : false;
			}
			//返回队首元素
		Queue.prototype.front = function() {
				return this.items[items.length - 1];
			}
			//队列是否为空
		Queue.prototype.isEmpty = function() {
				return this.items.length == 0;
			}
			//返回队列长度
		Queue.prototype.size = function() {
				return this.items.length;
			}
			//清空队列
		Queue.prototype.clear = function() {
				this.items = [];
			}
			//返回队列
		Queue.prototype.show = function() {
			return this.items;
		}
	}
}
//无脑摸尸体--------------------------------
//AutoGetFunc();
function AutoGetFunc(){
    if(btnList["尸体"].innerText  == '尸体'){
        var AutoGet_targetName = "尸体";
        AutoGet1Func();
        btnList["尸体"].innerText  = '不摸';}
    else{clearGet();
         {btnList["尸体"].innerText  = '尸体';}
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


//逃跑-------------------------
function escapeFunc(){
    if(btnList["逃跑"].innerText  == '逃跑'){
        AutoEscapeFunc();
        btnList["逃跑"].innerText  = '取消';}
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

//无脑技能--------------------------------
//AutoequipFunc();
function AutoequipFunc(){
    if(btnList["下技能"].innerText  == '下技能'){
      go('auto_equip off;enable unmap_all;enable stick douzhangundian;enable stick pjgj;enable pjgj attack_select;enable stick shshisigun;enable douzhangundian none;enable shshisigun none;enable force dzxinmojing;enable force xlxf;enable xlxf attack_select;enable force budongmwj;enable budongmwj attack_select;enable force sszaohuagong;exercise stop;exercise;wield sword of windspring;wear langya_diaozhui;');
	   btnList["下技能"].innerText  = '上技能';
	    }
    else{
		clearGet();

		 btnList["下技能"].innerText  = '下技能';
		 }

       function clearGet(){
      go('auto_equip on;auto_equip on;unwield weapon_sb_hammer11;unwield weapon_sb_stick11;wield weapon_sb_hammer11;wield weapon_sb_stick11;enable hammer xytl;enable hammer thfc;enable thfc attack_select;enable parry jiutian-sword;enable parry kongqueling;enable stick pjgj;enable pjgj attack_select;enable map_all;enable mapped_skills restore 1;enable mapped_skills restore go 1');
    }



}

// 清谜题 -----------------------------------------------

function clearPuzzleFunc(){
    clickButton('auto_tasks cancel');
}

// 一键VIP所有  -----------------------------------------------

function VipallFunc(){
  go('vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;');//10次暴击
  go('vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;vip finish_bad 2;');//20次正邪
  go('vip finish_taofan 2;vip finish_taofan 2;vip finish_taofan 2;vip finish_taofan 2;vip finish_taofan 2;');//5次逃犯
  //go('vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;');
  //go('vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;');
  go('look_room public_op12;daily finish 0;daily finish 2;daily finish 3;daily finish 5;daily finish 6;daily finish 7;daily finish 10;daily finish 11;daily finish 13;daily finish 14;daily finish 15;daily finish 16;');//日常
}

//===========================
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

//抢红包===========================================
var qiangHongbaoTrigger = 0;
var hongbaoList;
function qiangHongbao(){
	if ("抢红包"==btnList["抢红包"].innerText){
		hongbaoList = new MyMap;
        qiangHongbaoTrigger = 1;
		qiangHongbaoA();
		console.log("开始抢红包");
		btnList["抢红包"].innerText = "停抢红包";

	}else{
		btnList["抢红包"].innerText = "抢红包";
		qiangHongbaoTrigger = 0;
	}
	function qiangHongbaoA(){

		if (!qiangHongbaoTrigger) return;

		if (hongbaoList.size()>5000)
		{
			hongbaoList.clear();
			pushCmd('go_chat hongbao');
		}
	    $("a:contains(点这儿)").each(
		    function (){
				var gn = $(this).attr("href").split(" ");
				gn = gn[3].replace("',","");
				var cmd = $(this).attr("href").replace("javascript:clickButton('","").replace("', 0);","");
				if (!hongbaoList.containsKey(gn))
				{
					var intv = Math.round(Math.random()*1000);
					console.log("抢红包:" + intv);
					setTimeout(function(){pushCmd(cmd);},intv);

					hongbaoList.put(gn,cmd);
				}
				//console.log($(this).attr("href"));
			}
	//	pushCmd('go_chat hongbao');
		);
		//	pushCmd('go_chat hongbao');
		//	setTimeout(qiangHongbaoA,200);

	}
}
Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

function MyMap(){
		this.elements = [];
		this.size = function() {
			return this.elements.length
		};
		this.isEmpty = function() {
			return 1 > this.elements.length
		};
		this.clear = function() {
			this.elements = []
		};
		this.put = function(a, b) {
			for (var c = !1, d = 0; d < this.elements.length; d++)
				if (this.elements[d].key == a) {
					c = !0;
					this.elements[d].value = b;
					break
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
						return this.elements.splice(c, 1), !0
			} catch (d) {
				b =
				!1
			}
			return b
		};
		this.get = function(a) {
			try {
				for (var b = 0; b < this.elements.length; b++)
					if (this.elements[b].key == a)
						return this.elements[b].value
			} catch (c) {
				return null
			}
		};
		this.copy = function(a) {
			null == a && (a = new Map);
			try {
				for (var b = 0; b < this.elements.length; b++)
					a.put(this.elements[b].key, this.elements[b].value);
				return a
			} catch (c) {
				return null
			}
		};
		this.element = function(a) {
			return 0 > a || a >= this.elements.length ? null : this.elements[a]
		};
		this.containsKey = function(a) {
			var b = !1;
			try {
				for (var c = 0; c < this.elements.length; c++)
					if (this.elements[c].key ==
					a) {
						b = !0;
						break
					}
			} catch (d) {
				b = !1
			}
			return b
		};
		this.containsValue = function(a) {
			var b = !1;
			try {
				for (var c = 0; c < this.elements.length; c++)
					if (this.elements[c].value == a) {
						b = !0;
						break
					}
			} catch (d) {
				b = !1
			}
			return b
		};
		this.values = function() {
			for (var a = [], b = 0; b < this.elements.length; b++)
				a.push(this.elements[b].value);
			return a
		};
		this.keys = function() {
			for (var a = [], b = 0; b < this.elements.length; b++)
				a.push(this.elements[b].key);
			return a
		}
	}
//天山七剑----------------------------------------------------
function TianShanQiJianFunc(){
    setTimeout(QiJian1Func,200);
}
function QiJian1Func(){
    go('jh 39;ne;e;n;ne;ne;n;ne;nw;ne;nw;event_1_17801939;');
    setTimeout(QiJian2Func,5000);
}
function QiJian2Func(){
    if (g_obj_map.get("msg_room")==undefined){
        setTimeout(function(){QiJian2Func();},200);
    }else{
        var locationname=g_obj_map.get("msg_room").get("short");
        console.log(locationname);
        if (locationname=="星星峡"){
            console.log("。");
            go('ne;ne;nw;nw;');
        }else{
            setTimeout(QiJian1Func,200);
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
// 九幽----------------------------------------------------
function JiuyouFunc(){
    go('jh 18;n;nw;n;n;n;n;n;ne;n;n;n;n;n;n;n;n;n;w;nw;nw;event_1_70957287;');

}
//铁雪除魔-----------------------------------------------------
function TiexueFunc(){
    go("jh 31;n;se;e;se;s;s;sw;se;se;e;nw;e;ne;n;ne;n;n;n;n;n;n;n;n;n;");

}
// 西安-云远-------------------------------------------------
function YunyuanFunc(){
    go("jh 2;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;w;s;s;s;s;e;event_1_2215721");
       }
// 天山-------------------------------------------------
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
// 铜人-------------------------------------------------
function TRFunc(){
        autoPerformSkill2();
        go('home;clan zsdg enter;n;n;n;n;n');//铜人1
        HitTRFunc();
        go('home;clan zsdg enter;n;n;n;n;n;n;n;e;e;e;e;e;e;e;e;s;s;');//铜人2
        HitTRFunc();
}
function HitTRFunc(){
        go('enable mapped_skills restore 3;enable mapped_skills restore go 3;enable unmap_all;enforce 0;auto_equip off');
        go('event_1_14757697',1);  //挑战铜人 1
        go('event_1_35095441',1);  //挑战铜人 2
        go('auto_equip on;auto_equip on;enable mapped_skills restore 1;enable mapped_skills restore go 1;enforce 1100');

    }

// 苗疆-------------------------------------------------
function Mjly1Func(){
    go('home;jh 40;s;s;s;s;e;s;se;sw;s;sw;e;e;sw;se;sw;se;');
    console.log("铁索桥。");
    go('event_1_8004914;');
    setTimeout( Mjly2Func,4000);
}
function  Mjly2Func(){
    if (g_obj_map.get("msg_room").get("short") !=="澜沧江南岸"){
        console.log("重新跑。");
        setTimeout(Mjly1Func,4000);
    }else{
        console.log("继续走。");
        go('se;s;s;e;n;n;e;s;e;ne;s;sw;e;e;ne;ne;nw;ne;ne;n;n;w;');
        setTimeout( Mjly3Func,5000);
    }
}
function  Mjly3Func(){
    if( isContains($('span.out2:contains(炼药的丹炉)').text().slice(-6), '明天再来吧！')){
       console.log("炼完了。");
    }else{
        go('lianyao;');
        setTimeout( Mjly3Func,6000);
    }
}
//冰月谷-------------------------
function bingyueFunc(){
    go('jh 14;w;n;n;n;n;event_1_32682066;');
}
// 日常签到--------------------------------------------------------
//买万年----------------------------------------------------
function YaopuFunc(){
		var count_qn = prompt("请输入购买万年灵芝的数量",50);
    var buy = "";
    for(var i=0;i<count_qn/10;i++)
	{
		buy = buy + "buy /map/snow/obj/wannianlingzhi_N_10 from snow_herbalist;";
	}
    go('jh 1;e;n;n;n;w;'+buy + "home");
}
//买千年============================
function Yaopu1Func(){
		var count_qn = prompt("请输入购买千年灵芝的数量",50);
    var buy = "";
    for(var i=0;i<count_qn/10;i++)
	{
		buy = buy + "buy /map/snow/obj/qiannianlingzhi_N_10 from snow_herbalist;";
	}
    go('jh 1;e;n;n;n;w;'+buy + "home");
}
//去楼兰-------------------------

function LoulanFunc(){
	go('jh 39;ne;e;n;nw;nw;w;s;s;sw;n;nw;e;sw;w;s;w;n;w;event_1_69872740;event_1_18663573');
}
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
var items_store=' 狗年礼券 茉莉汤朱果『秘籍木盒』 优昙仙露 玫瑰花『神匠宝箱』百宜雪梅长生石千年紫芝千年灵草驻颜丹烧香符周年礼券玄重铁江湖令谜题令正邪令状元贴装备打折卡碎片鎏金黑玉锥玄铁令';
//冰月羽-
var items_study=' ';
var items_splite='翎眼赤护青鸾护臂苍狼护臂宝玉甲 天寒匕 貂皮斗篷 白玉腰束 无心匕 玄武盾 月光宝甲 沧海护腰 夜行披风虎皮腰带红光匕金丝甲羊毛斗篷破军盾金丝甲疯魔杖毒龙鞭玉清棍生死符霹雳掌套血屠刀残雪帽残雪戒残雪鞋残雪手镯残雪项链金丝宝甲衣';
var items_sell='蛮刀 漫天花雨匕三清神冠七星翻云靴咒剑王□鲜红锦衣牛皮靴八角锤灰雁七星宝戒船桨白金项链断云斧乌夷长裙红色绸裙包子大剪刀黑水伏蛟帝王剑麻布手套银丝帽吴钩绵裙铜钹大刀紫袍铁笛圣火令绿罗裙绣花针清心散垓下刀紫金杖阿拉伯弯刀青锋剑青布袍淑女剑紫霜血蝉衣软金束带穿花蛇影鞋魔鞭翩珑大红僧袍九环禅杖精铁棒毒蒺藜暗灵桃木剑横断钩银丝链甲衣天魔刀玉竹杖叫化鸡七星剑逆钩匕银丝甲天寒帽天寒戒天寒鞋天寒项链天寒手镯软甲衣金刚杖飞羽剑斩空刀拜月掌套金弹子新月棍白蟒鞭硫磺木戟黑袍粗布白袍长戟回旋镖拂尘松子白色棋子黑色棋子竹节鞭白棋子木叉银色丝带波斯长袍铁鞭竹刀长虹剑莲蓬鲤鱼窄裉袄灵芝锦衣台夷头巾毛毯废焦丹废药渣台夷头巾粉红绸衫灰燕野山鸡麻雀岩鸽瑶琴维吾尔族长袍旧书桃符纸木锤木钩竹鞭木刀木枪木剑彩巾彩靴彩帽彩带彩镯彩衣砍刀绣花鞋舞蝶彩衫军刀铁扇剑割鹿刀大理雪梨圆领小袄皮帽弯月刀兔肉粗磁大碗羊肉串天山雪莲青铜盾禅杖金刚罩丝质披风暗箭青葫芦松子铁斧水蜜桃蓑衣破弯刀柴刀丝衣长鞭道德经布裙钢丝甲衣牛皮带制服金刚杖斩空刀拜月掌套金弹子新月棍白蟒鞭-草莓玉蜂浆玉蜂蜜蜂浆瓶豆浆蛋糕菠菜粉条包裹鸡叫草水密桃--新月棍银簪重甲羊角匕梅花匕日月神教腰牌船篙-丝绸马褂白缨冠白色长袍蛇杖鬼头刀拐杖古铜缎子袄裙大环刀鹿皮手套丝绸衣羊毛裙牧羊鞭牛皮酒袋麻带钢剑钢杖藤甲盾长斗篷军袍破披风木盾铁盾锦缎腰带鞶革青色道袍-鲫鱼树枝水草破烂衣服-鹿皮小靴青绫绸裙粗布衣草帽草鞋布鞋精铁甲-柳玉刀玉竹剑钢刀戒刀单刀长剑长枪铁锤木棍轻罗绸衫兽皮鞋皮鞭铁棍飞镖匕首细剑绣鞋绣花小鞋狼皮雪靴金戒金手镯铁戒银戒铁手镯银手镯铁项链银项链';

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
}
