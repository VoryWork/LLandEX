

if (!file.exists("./plugins/js_data/organizationEX/")) {
    log("[公会系统]首次运行，创建文件夹");
    file.mkdir("./plugins/js_data/organizationEX/")
}
// 创建配置文件
if (!file.exists("./plugins/js_data/organizationEX/config.json")) {
    log("[公会系统]首次运行，创建JSON文件1");
    var config = {
        enableHome: true,
        enableWarp: true,
        useLLmoney: false,
        nameLengthLimit: 8,
        enableUserCreate: false,//允许用户创建公会
        createPayment: 500000,//创建公会价格
        moneyScoreboard: "coin",
        moneyName: "祭点"
    };
    file.writeTo("./plugins/js_data/organizationEX/config.json", data.toJson(config, 4));
} else {
    var config = data.parseJson(File.readFrom("./plugins/js_data/organizationEX/config.json"));
}
// 创建数据文件
if (!file.exists("./plugins/js_data/organizationEX/orgData.json")) {
    log("[公会系统]首次运行，创建JSON文件2");
    var orgData = {};
    file.writeTo("./plugins/js_data/organizationEX/orgData.json", data.toJson(orgData, 4));
} else {
    var orgData = data.parseJson(File.readFrom("./plugins/js_data/organizationEX/orgData.json"));
}
//玩家公会函数
let playerDB = new JsonConfigFile("./plugins/js_data/organizationEX/playerData.json", "{}");
let applyDB = new JsonConfigFile("./plugins/js_data/organizationEX/applyData.json", "{}");
//生存公会数据的函数。
function summonNum() {
    return ("o-" + (100000 + Math.floor(Math.random() * 900000)));
}
mc.regPlayerCmd("organization op","管理公会",(pl,args)=>{
    if (pl.isOP()) { // 进入OP管理界面
        opFormInit(pl)
        return;
    }
},1)
mc.regPlayerCmd("organization", "公会系统", function (pl, args) {
    var orgNum = playerDB.get(pl.xuid);
    if (orgNum == null || orgData[orgNum] == null) {
        playerWelcomeInit(pl);
        return;
    }
    var myOrg = orgData[orgNum];
    if (myOrg.owner.indexOf(pl.xuid) >= 0) { // 公会管理员面板
        playerFormInit(pl, orgNum, true);
    } else { // 公会成员面板
        playerFormInit(pl, orgNum, false);
    }
})
function opFormInit(player) {
    var form = mc.newSimpleForm().setTitle("公会管理面板").setContent("尊敬的管理员，欢迎使用公会系统!");
    form.addButton("增加公会\n§9添加一个新的公会", "textures/ui/icon_best3");
    form.addButton("解散公会\n§9解散一个已有的公会", "textures/ui/icon_trash");
    form.addButton("公会管理\n§9对现有公会进行管理", "textures/ui/icon_setting");
    form.addButton("公会补助\n§9对公会进行补助", "textures/ui/anvil_icon");
    player.sendForm(form, function (pl, dt) {
        switch (dt) {
            case 0: opAddOrg(pl)
                break;
            case 1: opSelectOrg(pl, true)
                break;
            case 2: opSelectOrg(pl, false)
                break;
            case 3: opAddMoney(pl)
                break;
            default:
                break;
        }
    });
}
function opAddOrg(player) {
    var form = mc.newCustomForm();
    form.setTitle("添加公会");
    form.addLabel("设置你要添加的公会");
    form.addInput("公会名称", "请输入新增公会的名称");
    plname_array = []
    //制作玩家Array
    mc.getOnlinePlayers().forEach(element => {
        plname_array.push(element.realName)
    });
    form.addDropdown("添加公会管理员", plname_array)
    player.sendForm(form, function (pl, dt) {
        if (dt == null) {
            return;
        };
        if (dt[1] == "" || dt[1].length > config.nameLengthLimit) {
            pl.tell("[公会]公会名不能为空");
            return;
        }
        var targetPlayer = mc.getPlayer(plname_array[dt[2]]);
        if (targetPlayer == null) {
            pl.tell("[公会]对应玩家已经下线！");
            return;
        }
        var orgNum = summonNum();
        while (orgData[orgNum] != undefined) {
            orgNum = summonNum();
        };
        var owner = targetPlayer.xuid;
        orgData[orgNum] = {
            name: dt[1],
            owner: [owner],
            member: {},
            enableUserGetMoeny: true,
            shareMoney: 0,
            homePos: [
                0, 128, 0, 0
            ],
            warpList: {
                "默认锚点（示例）": [0, 128, 0, 0]
            }
        };
        orgData[orgNum].member[owner] = targetPlayer.realName;
        file.writeTo("./plugins/js_data/organizationEX/orgData.json", data.toJson(orgData, 4));
        playerDB.set(owner, orgNum);
        pl.tell("[公会]" + dt[1] + "创建成功，代码：§a" + orgNum);
    });
}
function opSelectOrg(player, isDelete) {
    if (Object.keys(orgData)[0] == undefined) {
        player.tell("[公会]§c你尚未创建任何公会");
        return;
    }
    var form = mc.newCustomForm();
    form.setTitle(isDelete ? "公会删除" : "公会管理");
    form.addLabel(isDelete ? "请选择你要解散的公会" : "请选择你要管理的公会");
    var orgNameArray = [];
    var orgNumArray = Object.keys(orgData);
    for (let index = 0; index < orgNumArray.length; index++) {
        const element = orgData[orgNumArray[index]];
        orgNameArray[index] = orgNumArray[index] + "-" + element.name;
    }
    form.addDropdown("选择公会", orgNameArray, 0);
    player.sendForm(form, (pl, dt) => {
        if (dt == null) {
            return;
        }
        if (isDelete) {
            delete orgData[orgNumArray[dt[1]]];
            file.writeTo("./plugins/js_data/organizationEX/orgData.json", data.toJson(orgData, 4));
            pl.tell("[公会]§a解散成功");
        } else {
            playerFormInit(pl, orgNumArray[dt[1]], true);
        }
    })
}
function opAddMoney(player) {
    if (Object.keys(orgData)[0] == undefined) {
        player.tell("[公会]§c你尚未创建任何公会");
        return;
    }
    var form = mc.newCustomForm();
    form.setTitle("公会补助");
    form.addLabel("请选择你要补助的公会");
    var orgNameArray = [];
    var orgNumArray = Object.keys(orgData);
    for (let index = 0; index < orgNumArray.length; index++) {
        const element = orgData[orgNumArray[index]];
        orgNameArray[index] = orgNumArray[index] + "-" + element.name;
    }
    form.addDropdown("选择公会", orgNameArray, 0);
    form.addInput("补助金额", "正数补助，负数罚款");
    player.sendForm(form, (pl, dt) => {
        if (dt == null) {
            return;
        }
        if (isNaN(dt[2])) {
            pl.tell("[公会]§c您输入的数字错误！");
            return;
        }
        orgData[orgNumArray[dt[1]]].shareMoney += parseInt(dt[2]);
        file.writeTo("./plugins/js_data/organizationEX/orgData.json", data.toJson(orgData, 4));
        pl.tell("[公会]§a补助成功");
    })
}
function ownerFormInit(player, orgNum) {
    var form = mc.newSimpleForm().setTitle("公会管理面板").setContent("尊敬的" + orgData[orgNum].name + "公会管理，欢迎使用公会系统!");
    form.addButton("添加成员\n§9将一个玩家添加为公会成员", "textures/ui/icon_armor");
    form.addButton("修改名称\n§9修改本公会的名称", "textures/ui/icon_book_writable");
    form.addButton("重设总部\n§9将我所在的位置设为总部位置", "textures/ui/icon_best3");
    form.addButton("增改锚点\n§9增加或修改一个传送锚点", "textures/ui/icon_recipe_nature");
    form.addButton("删除锚点\n§9删除一个传送锚点", "textures/ui/icon_recipe_construction");
    form.addButton("添加管理\n§9将一个玩家设为公会负责人", "textures/ui/icon_armor");
    form.addButton("移除成员\n§9将一个成员移出公会", "textures/items/paper");
    form.addButton("人员审核\n§9审核申请加入公会的玩家", "textures/items/book_writable");
    if (orgData[orgNum].enableUserGetMoeny) {
        form.addButton("禁止成员取钱\n§9仅允许管理员取得公会基金", "textures/ui/haste_effect");
    } else {
        form.addButton("允许成员取钱\n§9允许所有成员取得公会基金", "textures/ui/haste_effect");
    }
    player.sendForm(form, function (pl, dt) {
        if (dt == null) {
            return;
        }
        switch (dt) {
            case 0:
                inviteSubmit(pl, orgNum)
                break;
            case 1:
                changeName(pl, orgNum);
                break;
            case 2:
                resetLorry(pl, orgNum);
                break;
            case 3:
                addWarpPoint(pl, orgNum);
                break;
            case 4:
                delWarpPoint(pl, orgNum);
                break;
            case 5:
                addOwner(pl, orgNum);
                break;
            case 6:
                removeMember(pl, orgNum);
                break;
            case 7:
                addMember(pl, orgNum);
                break;
            case 8:
                orgData[orgNum].enableUserGetMoeny = !orgData[orgNum].enableUserGetMoeny;
                file.writeTo("./plugins/js_data/organizationEX/orgData.json", data.toJson(orgData, 4));
                break;
            default:
                break;
        }
    });
}
function playerFormInit(player, orgNum, isOwner) {
    var form = mc.newSimpleForm().setTitle("公会面板").setContent("尊敬的" + orgData[orgNum].name + "公会成员，欢迎使用公会系统!" + "\n" + "本公会的邀请代码为: §9" + orgNum.substr(2) + "§r");
    form.addButton("前往总部\n§9前往本公会的总部", "textures/ui/icon_recipe_nature");
    form.addButton("传送锚点\n§9前往本公会的传送锚点", "textures/ui/storageIconColor");
    form.addButton("公积金\n§9公会基金进行存取", "textures/ui/slow_falling_effect");
    form.addButton("退出公会\n§9退出目前的公会", "textures/ui/icon_trash");
    if (isOwner) {
        form.addButton("公会设置\n§9对公会进行管理", "textures/ui/icon_setting");
    }
    player.sendForm(form, function (pl, dt) {
        if (dt == null) {
            return;
        }
        switch (dt) {
            case 0:
                if (!config.enableHome) {
                    player.tell("此功能已被服主禁用");
                    return;
                }
                var pos = mc.newFloatPos(orgData[orgNum].homePos[0], orgData[orgNum].homePos[1], orgData[orgNum].homePos[2], orgData[orgNum].homePos[3])
                pl.teleport(pos);
                break;
            case 1:
                warpFormInit(pl, orgNum);
                break;
            case 2:
                saveMoney(pl, orgNum);
                break;
            case 3:
                exitOrg(pl, orgNum);
                break;
            case 4:
                ownerFormInit(pl, orgNum);
                break;
            default:
                break;
        }
    });
}
function warpFormInit(player, orgNum) {
    if (!config.enableWarp) {
        player.tell("此功能已被服主禁用");
        return;
    }
    var warpList = orgData[orgNum].warpList;
    var warpListKeys = Object.keys(warpList);
    if (warpListKeys[0] == undefined) {
        player.tell("[公会]暂无任何传送点");
        return;
    }
    var form = mc.newSimpleForm().setTitle("传送锚点").setContent("尊敬的" + orgData[orgNum].name + "点击按钮即可传送至对应位置!");
    for (let index = 0; index < warpListKeys.length; index++) {
        const element = warpList[warpListKeys[index]];
        const name = warpListKeys[index];
        form.addButton(name + "\n§7" + element[0] + "," + element[1] + "," + element[2] + "," + element[3]);
    };
    player.sendForm(form, (pl, dt) => {
        if (dt == null) {
            return;
        }
        var targetPos = warpList[warpListKeys[dt]];
        pl.teleport(targetPos[0], targetPos[1], targetPos[2], targetPos[3]);
    });
};
function saveMoney(player, orgNum) {
    let myMoney = 0;
    if (config.useLLmoney) {
        myMoney = money.get(player.xuid);
    } else {
        myMoney = player.getScore(config.moneyScoreboard);
    }
    var form = mc.newCustomForm();
    form.setTitle("存公积金");
    form.addLabel("请输入你要操作的金额" + "\n您有§a" + myMoney + "§r" + config.moneyName + "\n公会基金有§a" + orgData[orgNum].shareMoney + "§r" + config.moneyName);
    var orgNameArray = [];
    var orgNumArray = Object.keys(orgData);
    form.addInput("金额", "正数存入，负数取出");
    player.sendForm(form, (pl, dt) => {
        if (dt == null) {
            return;
        }
        if (dt[1] == "") {
            pl.tell("[公会]§c您输入的数字错误！");
            return;
        }
        if (isNaN(dt[1])) {
            pl.tell("[公会]§c您输入的数字错误！");
            return;
        }
        if (parseInt(dt[1]) >= myMoney) {
            pl.tell("[公会]存款数额大于您拥有的数额");
            return;
        }
        if (parseInt(dt[1]) < 0 && !orgData[orgNum].enableUserGetMoeny && orgData[orgNum].owner.indexOf(pl.xuid) === -1) {
            pl.tell("[公会]您没有权限从公积金中取钱");
            return;
        }
        if (orgData[orgNum].shareMoney < -parseInt(dt[1])) {
            pl.tell("[公会]取款数额大于公会拥有的数额");
            return;
        };
        if (config.useLLmoney) {
            if (parseInt(dt[1]) > 0 && !money.reduce(pl.xuid, parseInt(dt[1]))) {
                pl.tell("[公会]操作失败，可能是LLmoney有问题，请联系管理员！");
                return;
            } else if (parseInt(dt[1]) <= 0 && !money.add(pl.xuid, -parseInt(dt[1]))) {
                pl.tell("[公会]操作失败，可能是LLmoney有问题，请联系管理员！");
                return;
            }
        } else {
            if (!player.reduceScore(config.moneyScoreboard, parseInt(dt[1]))) {
                pl.tell("[公会]操作失败，请联系管理员！");
                return;
            }
        }
        orgData[orgNum].shareMoney += parseInt(dt[1]);
        file.writeTo("./plugins/js_data/organizationEX/orgData.json", data.toJson(orgData, 4));
        pl.tell("[公会]§a操作成功");
    })
}
function exitOrg(player, orgNum) {
    player.sendModalForm("你确定吗？", "你确定要退出" + orgData[orgNum].name + "吗?", "取消", "确定", function (pl, result) {
        if (result == null) {
            return;
        }
        if (!result) {
            if (orgData[orgNum].owner.indexOf(pl.xuid) !== -1) {
                //这人是管理，要删除
                orgData[orgNum].owner.splice(orgData[orgNum].owner.indexOf(pl.xuid), 1);
            }
            try {
                delete orgData[orgNum].member[pl.xuid];
            } catch (error) {
            }
            file.writeTo("./plugins/js_data/organizationEX/orgData.json", data.toJson(orgData, 4));
            playerDB.delete(pl.xuid);
            pl.tell("[公会]§a退出成功");
        }
    })
}
function inviteSubmit(player, orgNum) {
    var form = mc.newCustomForm();
    form.setTitle("邀请成员");
    form.addLabel("设置你要邀请的玩家");
    plname_array = []
    //制作玩家Array
    mc.getOnlinePlayers().forEach(element => {
        plname_array.push(element.realName)
    });
    form.addDropdown("添加公会成员", plname_array)
    player.sendForm(form, (pl, dt) => {
        if (dt == null) {
            return;
        }
        var targetPlayer = mc.getPlayer(plname_array[dt[1]]);
        if (targetPlayer == null) {
            pl.tell("[公会]相关玩家可能已经下线");
            return;
        }
        if (playerDB.get(targetPlayer.xuid) === orgNum) {
            pl.tell("[公会]相关玩家已经是你的工会成员");
            return;
        }
        pl.tell("[公会]邀请已发送");
        targetPlayer.sendModalForm("公会邀请", "玩家" + player.realName + "邀请您加入" + orgData[orgNum].name + "", "拒绝", "同意", function (taP, result) {
            if (result == null) {
                return;
            };
            if (result == 0) {
                //检查是否加入了其他公会
                let oriOrgNum = playerDB.get(taP.xuid)
                if (oriOrgNum && orgData[oriOrgNum]) {
                    if (orgData[oriOrgNum].owner.indexOf(taP.xuid)) {
                        orgData[oriOrgNum].owner.splice(orgData[oriOrgNum].owner.indexOf(taP.xuid), 1);
                    }
                    delete orgData[oriOrgNum].member[pl.xuid];
                }
                playerDB.set(taP.xuid, orgNum);
                orgData[orgNum].member[taP.xuid] = taP.realName;
                file.writeTo("./plugins/js_data/organizationEX/orgData.json", data.toJson(orgData, 4));
                taP.tell("[公会]§a加入成功");
                pl.tell("[公会]相关玩家已经同意加入公会！");
            } else {
                pl.tell("[公会]相关玩家拒绝加入公会！");
            }
        })
    });
}
function changeName(player, orgNum) {
    var form = mc.newCustomForm();
    form.setTitle("设置名称");
    form.addLabel("修改公会的名称");
    form.addInput("工会名称", "请输入0-4字", orgData[orgNum].name);
    player.sendForm(form, (pl, dt) => {
        if (dt == null) {
            return;
        }
        if (dt[1].length <= 0 || dt[1].length > config.nameLengthLimit) {
            pl.tell("[公会]文字长度不符合要求");
            return;
        }
        orgData[orgNum].name = dt[1];
        file.writeTo("./plugins/js_data/organizationEX/orgData.json", data.toJson(orgData, 4));
        pl.tell("[公会]§a修改成功！");
    });
};

function resetLorry(player, orgNum) {
    var x = Math.floor(player.pos.x);
    var y = Math.floor(player.pos.y);
    var z = Math.floor(player.pos.z);
    var d = Math.floor(player.pos.dimid);
    player.sendModalForm("重设总部", "您确认要把" + orgData[orgNum].name + "总部设在[" + x + "," + y + "," + z + "," + player.pos.dim + "]?", "取消", "确认", function (pl, result) {
        if (result == null) {
            return;
        };
        if (result == 0) {
            orgData[orgNum].homePos = [x, y, z, d];
            file.writeTo("./plugins/js_data/organizationEX/orgData.json", data.toJson(orgData, 4));
            pl.tell("[公会]§a总部位置设置成功");
        }
    });
}

function addWarpPoint(player, orgNum) {
    if (!config.enableWarp) {
        player.tell("此功能已被服主禁用");
        return;
    }
    var x = Math.floor(player.pos.x);
    var y = Math.floor(player.pos.y);
    var z = Math.floor(player.pos.z);
    var d = Math.floor(player.pos.dimid);
    var form = mc.newCustomForm();
    form.setTitle("修改传送锚点");
    form.addLabel("输入您想修改的传送锚点的名称，不存在的将会自动添加。");
    form.addInput("锚点名称", "请输入0-4字");
    player.sendForm(form, (pl, dt) => {
        if (dt == null) {
            return;
        }
        if (dt[1].length <= 0 || dt[1].length > 4) {
            pl.tell("[公会]文字长度不符合要求");
            return;
        };
        pl.sendModalForm("设置锚点", "您确认要把" + dt[1] + "设在[" + x + "," + y + "," + z + "," + player.pos.dim + "]?", "取消", "确认", function (pl, result) {
            if (result == null) {
                return;
            };
            if (result == 0) {
                orgData[orgNum].warpList[dt[1]] = [x, y, z, d];
                file.writeTo("./plugins/js_data/organizationEX/orgData.json", data.toJson(orgData, 4));
                pl.tell("[公会]§a锚点位置设置成功");
            }
        });
    })
};
function delWarpPoint(player, orgNum) {
    if (!config.enableWarp) {
        player.tell("此功能已被服主禁用");
        return;
    }
    var form = mc.newCustomForm();
    form.setTitle("删除传送锚点");
    form.addLabel("选择您想删除的传送锚点");
    var warpListKeys = Object.keys(orgData[orgNum].warpList);
    form.addDropdown("锚点选择", warpListKeys);
    player.sendForm(form, (pl, dt) => {
        if (dt == null) {
            return;
        };
        pl.sendModalForm("删除锚点", "您确认要删除" + warpListKeys[dt[1]] + "?", "取消", "确认", function (plar, result) {
            if (result == null) {
                return;
            };
            if (result == 0) {
                delete orgData[orgNum].warpList[warpListKeys[dt[1]]];
                file.writeTo("./plugins/js_data/organizationEX/orgData.json", data.toJson(orgData, 4));
                plar.tell("[公会]§a锚点删除成功");
            }
        });
    });
}
function addOwner(player, orgNum) {
    var form = mc.newCustomForm();
    form.setTitle("添加公会管理员");
    form.addLabel("此操作不可逆！§c请谨慎操作！");
    plname_array = []
    //制作玩家Array
    mc.getOnlinePlayers().forEach(element => {
        plname_array.push(element.realName)
    });
    form.addDropdown("选择你要添加的玩家", plname_array)
    player.sendForm(
        form, (pl, dt) => {
            if (dt == null) {
                return;
            }
            pl.sendModalForm("添加管理", "您确认要添加" + plname_array[dt[1]] + "为管理员吗?", "取消", "确认", function (plar, result) {
                if (result == null) {
                    return;
                };
                if (result == 0) {
                    var xuid = mc.getPlayer(plname_array[dt[1]]).xuid;
                    if (orgData[orgNum].owner.indexOf(xuid) !== -1) {
                        plar.tell("[公会]此玩家已经是管理员");
                        return;
                    }
                    if (playerDB.get(xuid) !== orgNum) {
                        plar.tell("[公会]此玩家不是你的公会成员");
                        return;
                    }
                    orgData[orgNum].owner.push(xuid);
                    file.writeTo("./plugins/js_data/organizationEX/orgData.json", data.toJson(orgData, 4));
                    plar.tell("[公会]§a管理添加成功");
                }
            });
        }
    )
}

function removeMember(player, orgNum) {
    var form = mc.newCustomForm();
    form.setTitle("移除玩家");
    form.addLabel("此操作不可逆！§c请谨慎操作！");
    plname_array = []
    plxuid_array = []
    //制作玩家Array
    let key = Object.keys(orgData[orgNum].member);
    for (let index = 0; index < key.length; index++) {
        const element = key[index];
        plxuid_array.push(element);
        plname_array.push(orgData[orgNum].member[element]);
    }
    form.addDropdown("选择你要移除的玩家", plname_array);
    player.sendForm(
        form, (pl, dt) => {
            if (dt == null) {
                return;
            }
            pl.sendModalForm("删除用户", "您确认要将" + plname_array[dt[1]] + "移出本公会吗?", "取消", "确认", function (plar, result) {
                if (result == null) {
                    return;
                };
                if (result == 0) {
                    var xuid = plxuid_array[dt[1]];
                    if (orgData[orgNum].owner.indexOf(xuid) !== -1) {
                        plar.tell("[公会]此玩家是管理员，无法移出");
                        return;
                    }
                    delete orgData[orgNum].member[xuid];
                    file.writeTo("./plugins/js_data/organizationEX/orgData.json", data.toJson(orgData, 4));
                    playerDB.delete(xuid);
                    plar.tell("[公会]§a移出成功");
                }
            });
        }
    )
}

function addMember(player, orgNum) {
    var form = mc.newCustomForm();
    form.setTitle("添加玩家");
    form.addLabel("接受或拒绝玩家加入的申请");
    plname_array = []
    plxuid_array = []
    //制作玩家Array
    let key = Object.keys(orgData[orgNum].applyer || {});
    for (let index = 0; index < key.length; index++) {
        const element = key[index];
        plxuid_array.push(element);
        plname_array.push(orgData[orgNum].applyer[element]);
        form.addSwitch(orgData[orgNum].applyer[element], false);
    }
    player.sendForm(
        form, (pl, dt) => {
            if (dt == null) {
                return;
            }
            let result_array = dt;
            result_array.splice(0, 1);//去除null
            let toUserStr = "";
            for (let index = 0; index < result_array.length; index++) {
                let applyResult = result_array[index];
                let name = plname_array[index];
                toUserStr += name + ":" + (applyResult ? "§a通过" : "§c拒绝") + "§r\n";
            }
            pl.sendModalForm("确认结果", toUserStr, "取消", "确认", function (plar, result) {
                if (result == null) {
                    return;
                };
                if (result == 0) {
                    for (let index = 0; index < result_array.length; index++) {
                        if(result_array[index]){
                            //通过
                            orgData[orgNum].member[plxuid_array[index]]=plname_array[index];
                            playerDB.set(plxuid_array[index],orgNum);
                        }
                        applyDB.delete(plxuid_array[index]);
                    }
                    orgData[orgNum].applyer={};
                    
                file.writeTo("./plugins/js_data/organizationEX/orgData.json", data.toJson(orgData, 4));
                pl.tell("[公会]§a审核结果已提交！")
                }
            });
        }
    )
}

//用户欢迎页面
function playerWelcomeInit(player) {
    if (!config.enableUserCreate) {
        //没有公会，之间跳转
        playerApplytoInit(player, true)
        return;
    }
    var form = mc.newSimpleForm().setTitle("公会系统").setContent("您尚未加入任何公会，请选择以下操作");
    form.addButton("加入已有的公会\n§9申请加入已有的公会", "textures/items/book_writable");
    form.addButton("创建一个新公会\n§9花费" + config.createPayment + config.moneyName + "创建新公会", "textures/items/paper");
    player.sendForm(form, (pl, dt) => {
        if (dt == null) {
            return;
        }
        switch (dt) {
            case 0:
                playerApplytoInit(pl);
                break;
            case 1:
                playerCreateOrgInit(pl);
                break;
            default:
                break;
        }
    })
}
//申请加入公会
function playerApplytoInit(player, transfer = false) {
    let applyOrgNum = applyDB.get(player.xuid);
    let form = mc.newCustomForm();
    form.setTitle("申请加入");
    form.addLabel("通过邀请码申请加入公会");
    form.addInput("邀请码", "请输入六位数字邀请码");
    if (applyOrgNum && orgData[applyOrgNum]) {
        form.addLabel("您当前已经申请加入§c" + orgData[applyOrgNum].name + "§r重新申请本申请将作废。")
    }
    player.sendForm(form, (pl, dt) => {
        if (dt == null) {
            return;
        }
        if (!/^[0-9]{6}$/.test(dt[1])) {
            pl.tell("[公会]§c邀请码格式错误！");
            return;
        }
        if (orgData["o-" + dt[1]] == undefined) {
            pl.tell("[公会]§c邀请码无效！");
            return;
        }
        player.sendModalForm("你确定吗？", "你确定要申请加入" + orgData["o-" + dt[1]].name + "吗?", "取消", "确定", function (pl, result) {
            if (result == null) {
                return;
            }
            if (!result) {
                if (!orgData["o-" + dt[1]].applyer) {
                    orgData["o-" + dt[1]].applyer = {};
                }
                //已经申请了其他公会，取消申请
                if (applyOrgNum && orgData[applyOrgNum].applyer) {
                    delete orgData[applyOrgNum].applyer[pl.xuid];
                }
                //加入公会
                orgData["o-" + dt[1]].applyer[pl.xuid] = pl.realName;
                file.writeTo("./plugins/js_data/organizationEX/orgData.json", data.toJson(orgData, 4));
                applyDB.set(pl.xuid, "o-" + dt[1]);
                pl.tell("[公会]§a申请已发送！请等待管理员回复！")
            }
        })
    });

}
//申请加入公会
function playerCreateOrgInit(player) {
    let myMoney = 0;
    if (config.useLLmoney) {
        myMoney = money.get(player.xuid);
    } else {
        myMoney = player.getScore(config.moneyScoreboard);
    }
    if (myMoney < config.createPayment) {
        player.tell("[公会]§c你的" + config.moneyName + "不够，无法创建公会(目前有：" + myMoney + ")。");
        return;
    }
    let form = mc.newCustomForm();
    form.setTitle("创建公会");
    form.addLabel("设置你要添加的公会");
    form.addInput("公会名称", "请输入新增公会的名称");
    player.sendForm(form, function (pl, dt) {
        if (dt == null) {
            return;
        };
        if (dt[1] == "" || dt[1].length > config.nameLengthLimit) {
            pl.tell("[公会]公会名不能为空");
            return;
        }
        var orgNum = summonNum();
        while (orgData[orgNum] != undefined) {
            orgNum = summonNum();
        };
        var owner = pl.xuid;
        orgData[orgNum] = {
            name: dt[1],
            owner: [owner],
            member: {},
            enableUserGetMoeny: true,
            shareMoney: 0,
            homePos: [
                0, 128, 0, 0
            ],
            warpList: {
                "默认锚点（示例）": [0, 128, 0, 0]
            }
        };
        orgData[orgNum].member[owner] = pl.realName;
        //扣钱
        if (config.useLLmoney && !money.reduce(owner, config.createPayment)) {
            pl.tell("[公会]扣款失败，检查LLMoney是否正常");
            return;
        } else if (!config.useLLmoney && !pl.reduceScore(config.moneyScoreboard, config.createPayment)) {
            pl.tell("[公会]扣款失败，检查记分板是否正常");
            return;
        }
        file.writeTo("./plugins/js_data/organizationEX/orgData.json", data.toJson(orgData, 4));
        playerDB.set(owner, orgNum);
        pl.tell("[公会]" + dt[1] + "创建成功，代码：§a" + orgNum);
    });

}
function getPlayerOrgName(xuid, time = 0) {
    let orgNum = playerDB.get(xuid);
    if (!orgNum) {
        return null;
    } else if (!orgData[orgNum]) {
        return null;
    } else {
        return orgData[orgNum].name;
    }
};
function getOrgName(orgNum) {
    if (!orgNum) {
        return null;
    } else if (!orgData[orgNum]) {
        return null;
    } else {
        return orgData[orgNum].name;
    }
};
function getPlayerOrgNum(xuid) {
    let orgNum = playerDB.get(xuid);
    if (!orgNum) {
        return null;
    } else if (!orgData[orgNum]) {
        return null;
    } else {
        return orgNum;
    }
};
function playerIsOwner(xuid) {
    let orgNum = playerDB.get(xuid);
    if (!orgNum) {
        return false;
    } else if (!orgData[orgNum]) {
        return false;
    } else if(orgData[orgNum].owner.indexOf(xuid)!==-1) {
        return true;
    }else{
        return false;
    }
};
function orgGetMoney(orgNum) {
    if (!orgData[orgNum]) {
        return null;
    } else {
        return orgData[orgNum].shareMoney;
    }
}
function orgAddMoney(orgNum, count) {
    if (!orgData[orgNum]) {
        return false;
    } else if (orgData[orgNum].shareMoney + count < 0) {
        return false;
    } else {
        orgData[orgNum].shareMoney += count;
        file.writeTo("./plugins/js_data/organizationEX/orgData.json", data.toJson(orgData, 4));
        return true;
    }
}

lxl.export(getPlayerOrgName, "orgEX_getPlayerOrgName");
lxl.export(getPlayerOrgNum, "orgEX_getPlayerOrgNum");
lxl.export(playerIsOwner, "orgEX_playerIsOwner");
lxl.export(orgGetMoney, "orgEX_orgGetMoney");
lxl.export(orgAddMoney, "orgEX_orgAddMoney");
lxl.export(getOrgName, "orgEX_getOrgName");