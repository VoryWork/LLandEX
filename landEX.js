/*
=======================================
                LandEX
          Copyright@VoryWork
=======================================
*/

/**
 * The complete Triforce, or one or more components of the Triforce.
 * @typedef {Object} pos --坐标对象
 * @property {number} x
 * @property {number} y
 * @property {number} z
 * @property {number} dimid
 * @property {string} dim
 *
 * @typedef {Object} posInterface --坐标对象
 * @property {number} dx
 * @property {number} dy
 * @property {number} dz
 * @property {number} maxX
 * @property {number} maxY
 * @property {number} maxZ
 * @property {number} minX
 * @property {number} minY
 * @property {number} minZ
 *
 * @typedef {Object} player --玩家对象
 * @property {string} name
 * @property {pos} pos - 	玩家所在坐标
 * @property {pos} blockPos - 玩家所在的方块坐标
 * @property {string} xuid - 玩家所在的方块坐标
 * @property {string} realName - 玩家所在的方块坐标
 *
 *
 * @typedef {number[]} SimplePos
 *
 *
 * @typedef {Object} state --玩家状态对象
 * @property {string} state
 * @property {string} inPLand
 * @property {Object} editingLand
 * @property {boolean} editingLand.isOrg
 * @property {string} editingLand.landId
 * @property {string} inOLand
 * @property {Object} enclosure
 * @property {boolean} enclosure.type2D
 * @property {number} enclosure.dim
 * @property {SimplePos} enclosure.posA
 * @property {SimplePos} enclosure.posB
 *
 *
 * @typedef {Object} landData -地皮信息
 * @property {Object} range
 * @property {boolean} range.type2D
 * @property {SimplePos} range.min_position
 * @property {SimplePos} range.max_position
 * @property {number} range.dimid
 * @property {Object} settings -地皮基础信息
 * @property {boolean} settings.notifyItemBar
 * @property {boolean} settings.notifytoPlayer
 * @property {boolean} settings.notifytoOwner
 * @property {boolean} settings.drawCube
 * @property {string} settings.name
 * @property {string} settings.describe
 * @property {string} settings.owner
 * @property {string[]} share -分享的玩家
 * @property {SimplePos} teleport -传送点
 * @property {PermissionsType} permissions
 * @property {Object} events
 * @property {boolean} events.pistonPush
 * @property {boolean} events.fireSpread
 * @property {boolean} events.explode
 * @property {boolean} events.redstoneUpdate
 * @property {boolean} events.farmlandDecay
 * @property {boolean} events.liquidFlow
 * @property {boolean} events.blockChange
 * @property {number} [resell] -卖地价格
 */

/**
 * @typedef PermissionsType
 * @property {PermissionsOrganizationType} [organization]
 * @property {PermissionsBlocksType} blocks
 * @property {PermissionsEntityType} entity
 * @property {PermissionsContainerType} container
 * @property {PermissionsRedStoneType} redStone
 * @property {PermissionsToolsType} tools
 * @property {PermissionsPlayerType} player
 */

/**
 * @typedef  PermissionsBlocksType
 * @property {boolean}blockPlace
 * @property {boolean}blockDestory
 * @property {boolean}itemDrop
 * @property {boolean}itemPickUp
 * @property {boolean}openDoor
 * @property {boolean}useFenceGate
 * @property {boolean}useTrapdoor
 */

/**
 * @typedef PermissionsOrganizationType
 * @property {boolean} allowOtherEnclose
 * @property {boolean} allowMemberEnclose
 * @property {boolean} trustMembers
 */

/**
 * @typedef PermissionsEntityType
 * @property {boolean} allowRideEntity
 * @property {boolean} allowEntityDestroy
 * @property {boolean} allowShoot
 * @property {boolean} allowUseBoat
 * @property {boolean} allowUseMinecart
 * @property {boolean} allowAttackEntity
 * @property {boolean} allowAnimalSpawn
 * @property {boolean} allowMobSpawn
 * @property {boolean} allowNeutralSpawn
 */

/**
 * @typedef PermissionsContainerType
 * @property {boolean} openShulkerBox
 * @property {boolean} useFrameBlock
 * @property {boolean} openChest
 * @property {boolean} openBarrel
 * @property {boolean} openHopper
 */

/**
 * @typedef PermissionsRedStoneType
 * @property {boolean} pressButton
 * @property {boolean} useLever
 * @property {boolean} usePressurePlate
 * @property {boolean} useDispenser
 * @property {boolean} useDropper
 * @property {boolean} useDaylightDetector
 * @property {boolean} changeComparator
 * @property {boolean} changeRepeater
 * @property {boolean} HopperChange
 * @property {boolean} pistonPush
 */

/**
 * @typedef PermissionsToolsType
 * @property {boolean} useBell
 * @property {boolean} useLoom
 * @property {boolean} useJukebox
 * @property {boolean} useBeacon
 * @property {boolean} useCraftingTable
 * @property {boolean} useCartographyTable
 * @property {boolean} useAnvil
 * @property {boolean} useBucket
 * @property {boolean} useBed
 * @property {boolean} useBlastFurnace
 * @property {boolean} useComposter
 * @property {boolean} useFurnace
 * @property {boolean} useGrindstone
 * @property {boolean} useRespawnAnchor
 * @property {boolean} useSmithingTable
 * @property {boolean} useNoteBlock
 * @property {boolean} useArmorStand
 * @property {boolean} useLectern
 * @property {boolean} useCampfire
 * @property {boolean} useSmoker
 * @property {boolean} useBrewingStand
 * @property {boolean} useEnchantingTable
 * @property {boolean} useFlint
 * @property {boolean} useCauldron
 * @property {boolean} useStonecutter
 */

/**
 * @typedef PermissionsPlayerType
 * @property {boolean} eat
 * @property {boolean} fishing
 * @property {boolean} allowThrowPotion
 * @property {boolean} allowShoot
 * @property {boolean} allowUseBoat
 * @property {boolean} allowUseMinecart
 * @property {boolean} allowAttackAnimal
 * @property {boolean} allowAttackNeutral
 * @property {boolean} allowAttackPlayer
 * @property {boolean} allowAttackMobs
 */
logger.setTitle("LandEX");
logger.setConsole(true, 4);
if (!File.exists("./plugins/js_data/landEX/")) {
    log("首次运行，创建文件夹");
    File.mkdir("./plugins/js_data/landEX/");
}
// 初始化领地系统配置
const configAPI = {
    data: {
        economy: {
            type: "llmoney",
            moneyScoreboard: "coin",
            moneyName: "祭点",
        },
        sell: {
            type3D: {
                priceXZ: 2,
                priceY: 1,
            },
            type2D: {
                priceSquare: 200,
            },
        },
        refund: {
            rate: 0.9,
        },
        common: {
            language: "zh-cn",
            allow3D: true,
            allow2D: true,
            useOrgnization: true,
            allowLandTeleport: true,
            useDrawLine: true,
            tickRate: 1000,
            enableCache: true,
            cacheSize: 512,
            defaultSpawn: false,
        },
        limit: {
            allowDimension: [0, 1, 2],
            type2DSquare: [10, 10000],
            type3DVolume: [100, 3840000],
            maxLands: 16,
        },
        operator: [],
    },
    save() {
        File.writeTo(
            "./plugins/js_data/landEX/config.json",
            JSON.stringify(this.data)
        );
    },
    reload() {
        this.data = JSON.parse(
            File.readFrom("./plugins/js_data/landEX/config.json")
        );
    },
};
// 读取已有的配置文件
if (File.exists("./plugins/js_data/landEX/config.json")) {
    configAPI.reload();
} else {
    configAPI.save();
}

// 国际化API
const i18n = {
    /**
     * 翻译类型
     * @type {object}
     */
    data: {},
    /**
     * 翻译主代码
     * @param {string} sentence 翻译字段
     * @param {Array[string]} replacer 替换字符
     * @returns {string}
     */
    $t(sentence, replacer = []) {
        if (!this.data[sentence]) {
            return "Translate Error";
        }
        let output = this.data[sentence];
        for (let index = 0; index < replacer.length; index++) {
            const element = replacer[index];
            output = output.replace("%s", element);
        }
        return output;
    },
    reload() {
        if (
            File.exists(
                "./plugins/js_data/landEX/i18n/" +
                    configAPI.data.common.language +
                    ".json"
            )
        ) {
            i18n.data = data.parseJson(
                File.readFrom(
                    "./plugins/js_data/landEX/i18n/" +
                        configAPI.data.common.language +
                        ".json"
                )
            );
        }
    },
};
if (
    File.exists(
        "./plugins/js_data/landEX/i18n/" +
            configAPI.data.common.language +
            ".json"
    )
) {
    i18n.data = data.parseJson(
        File.readFrom(
            "./plugins/js_data/landEX/i18n/" +
                configAPI.data.common.language +
                ".json"
        )
    );
}

// 统一的扣款api
const moneyUni = {
    offlineMoney: new KVDatabase("./plugins/js_data/landEX/offlineMoney/"),
    /**
     * 获取玩家的钱
     * @param {player} player -player
     * @returns {number}
     */
    get(player) {
        switch (configAPI.data.economy.type) {
            case "llmoney":
                return player.getMoney();
            case "scoreboard":
                return player.getScore(configAPI.data.economy.moneyScoreboard);
            case "xplevel":
                return player.getLevel();
        }
    },
    /**
     * 花钱
     * @param {player} player --player
     * @param {number} count --花钱数量
     * @returns {boolean}
     */
    pay(player, count) {
        if (this.get(player) < count) {
            // 钱不够
            return false;
        }
        switch (configAPI.data.economy.type) {
            case "llmoney":
                return player.reduceMoney(count);
            case "scoreboard":
                return player.reduceScore(
                    configAPI.data.economy.moneyScoreboard,
                    count
                );
            case "xplevel":
                return player.reduceLevel(count);
        }
    },
    addMoney(xuid, count) {
        switch (configAPI.data.economy.type) {
            case "llmoney":
                return money.add(xuid, count);
            case "scoreboard":
            case "xplevel":
                let player = mc.getPlayer(xuid);
                if (player) {
                    switch (configAPI.data.economy.type) {
                        case "scoreboard":
                            return player.addScore(
                                configAPI.data.economy.moneyScoreboard,
                                count
                            );
                        case "xplevel":
                            return player.addLevel(count);
                    }
                } else {
                    //玩家离线
                    let playerMoney = this.offlineMoney.get(xuid) || 0;
                    return this.offlineMoney.set(xuid, playerMoney + count);
                }
        }
    },
};
// 引入OrgEX的API
/**
 * @type {boolean}
 */
let enableOrg =
    configAPI.data.common.useOrgnization && ll.require("organizationEX.js");
/**
 * @type {boolean}
 */
let enableDrawLine =
    configAPI.data.common.useDrawLine && ll.require("draw-line.js");

const orgAPI = {
    getOrgNum: ll.import("orgEX_getPlayerOrgNum"),
    isOwner: ll.import("orgEX_playerIsOwner"),
    orgGetMoney: ll.import("orgEX_orgGetMoney"),
    orgAddMoney: ll.import("orgEX_orgAddMoney"),
    getOrgName: ll.import("orgEX_getOrgName"),
};
orgAPI.getOrgNum;

// 领地归属表
const belongToApi = {
    data: {
        /**
         * @type {Object<string,string>}
         */
        player: {},
        /**
         * @type {Object<string,string>}
         */
        shared: {},
        /**
         * @type {Object<string,string>}
         */
        org: {},
    },
    /**
     *
     * @param {string} xuid
     * @param {string} landId
     * @returns {boolean}
     */
    playerAddLand(xuid, landId) {
        if (!this.data.player[xuid]) {
            this.data.player[xuid] = [landId];
            return true;
        }
        if (this.data.player[xuid].includes(landId)) {
            return false;
        }
        this.data.player[xuid].push(landId);
        return true;
    },
    /**
     *
     * @param {string} xuid
     * @param {string} landId
     * @returns {boolean}
     */
    playerAddShare(xuid, landId) {
        if (!this.data.shared[xuid]) {
            this.data.shared[xuid] = [landId];
            return true;
        }
        if (this.data.shared[xuid].includes(landId)) {
            return false;
        }
        this.data.shared[xuid].push(landId);
        return true;
    },
    /**
     *
     * @param {string} orgNum
     * @param {string} landId
     * @returns {boolean}
     */
    orgAddLand(orgNum, landId) {
        if (!this.data.org[orgNum]) {
            this.data.org[orgNum] = [landId];
            return true;
        }
        if (this.data.org[orgNum].includes(landId)) {
            return false;
        }
        this.data.org[orgNum].push(landId);
        return true;
    },
    /**
     *
     * @param {string} xuid
     * @param {string} landId
     * @returns {boolean}
     */
    playerRemoveShare(xuid, landId) {
        if (
            !this.data.shared[xuid] ||
            !this.data.shared[xuid].includes(landId)
        ) {
            return false;
        }
        this.data.shared[xuid].splice(
            this.data.shared[xuid].indexOf(landId),
            1
        );
        return true;
    },
    /**
     *
     * @param {string} xuid
     * @param {string} landId
     * @returns {boolean}
     */
    playerRemoveLand(xuid, landId) {
        if (
            !this.data.player[xuid] ||
            !this.data.player[xuid].includes(landId)
        ) {
            return false;
        }
        this.data.player[xuid].splice(
            this.data.player[xuid].indexOf(landId),
            1
        );
        return true;
    },
    /**
     *
     * @param {string} orgNum
     * @param {string} landId
     * @returns {boolean}
     */
    orgRemoveLand(orgNum, landId) {
        if (!this.data.org[orgNum] || !this.data.org[orgNum].includes(landId)) {
            return false;
        }
        this.data.org[orgNum].splice(this.data.org[orgNum].indexOf(landId), 1);
        return true;
    },
    /**
     *
     * @returns {string[]} --获取到的地
     */
    getLand(xuid = "", orgNum = "") {
        if (xuid) {
            if (this.data.player[xuid]) {
                return this.data.player[xuid];
            } else {
                return [];
            }
        }
        if (orgNum) {
            if (this.data.org[orgNum]) {
                return this.data.org[orgNum];
            } else {
                return [];
            }
        }
        return [];
    },
    save() {
        File.writeTo(
            "./plugins/js_data/landEX/owner.json",
            JSON.stringify(this.data)
        );
    },
    reload() {
        this.data = JSON.parse(
            File.readFrom("./plugins/js_data/landEX/owner.json")
        );
    },
};

if (File.exists("./plugins/js_data/landEX/owner.json")) {
    belongToApi.reload();
} else {
    belongToApi.save();
}

// 私人圈地索引器界面
const pLandDataInterface = {
    /**
     * @type {Object<string,landData>}
     */
    data: {},
    save() {
        File.writeTo(
            "./plugins/js_data/landEX/priviteLandData.json",
            JSON.stringify(this.data)
        );
    },
    load() {
        this.data = JSON.parse(
            File.readFrom("./plugins/js_data/landEX/priviteLandData.json")
        );
    },
    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} dim
     * @param {number} landId
     * @returns {boolean}
     */
    isPosInLand(x, y, z, dim, landId) {
        if (!this.data[landId]) {
            return false;
        }
        let landData = this.data[landId];
        if (landData.range.dimid !== dim) {
            return false;
            // 维度错了
        }
        if (landData.range.type2D) {
            // 2D圈地
            if (
                x >= landData.range.min_position[0] &&
                x <= landData.range.max_position[0] &&
                z >= landData.range.min_position[2] &&
                z <= landData.range.max_position[2]
            ) {
                return true;
            } else {
                return false;
            }
        } else {
            if (
                x >= landData.range.min_position[0] &&
                x <= landData.range.max_position[0] &&
                z >= landData.range.min_position[2] &&
                z <= landData.range.max_position[2] &&
                y >= landData.range.min_position[1] &&
                y <= landData.range.max_position[1]
            ) {
                return true;
            } else {
                return false;
            }
        }
    },
    /**
     *
     * @param {posInterface} posInterface
     * @param {number} dim
     * @param {boolean} type2D
     * @param {string} landId
     * @returns {boolean}
     */
    isRangeInLand(posInterface, dim, type2D = false, landId) {
        if (!this.data[landId]) {
            // 领地不存在，肯定不冲突
            logger.debug("领地不存在");
            return false;
        }
        let landData = this.data[landId];
        if (landData.range.dimid !== dim) {
            logger.debug("维度不对");
            return false;
            // 维度不对，肯定不冲突
        }
        // 使用分离轴算法判断是否冲突
        if (
            posInterface.maxX < landData.range.min_position[0] ||
            posInterface.minX > landData.range.max_position[0]
        ) {
            logger.debug("X轴没有冲突");
            return false;
        }
        if (
            posInterface.maxZ < landData.range.min_position[2] ||
            posInterface.minZ > landData.range.max_position[2]
        ) {
            logger.debug("Z轴没有冲突");
            return false;
        }
        // 能走到这里，说明X与Z都全冲突了，如果两块圈地其中有一个是2D圈地，那必然重叠
        if (!type2D && !landData.range.type2D) {
            // 俩都是3D领地，加一个3D领地的判断
            if (
                posInterface.maxY < landData.range.min_position[1] ||
                posInterface.minY > landData.range.max_position[1]
            ) {
                logger.debug("Y轴没有冲突");
                return false;
            }
        }
        return true;
    },
    /**
     * 检查玩家是否为受信任玩家
     * @param {string} xuid
     * @param {string} landId
     * @returns {boolean}
     */
    inTrust(xuid, landId) {
        if (!this.data[landId]) {
            //领地不存在，放行
            return true;
        }
        if (
            this.data[landId].settings.owner === xuid ||
            this.data[landId].share.includes(xuid)
        ) {
            return true;
        } else {
            return false;
        }
    },
};
if (File.exists("./plugins/js_data/landEX/priviteLandData.json")) {
    pLandDataInterface.load();
} else {
    pLandDataInterface.save();
}
// 公会圈地索引器界面
const OlandDataInterface = {
    /**
     * @type {Object<string,landData>}
     */
    data: {},
    save() {
        File.writeTo(
            "./plugins/js_data/landEX/orgLandData.json",
            JSON.stringify(this.data)
        );
    },
    load() {
        this.data = JSON.parse(
            File.readFrom("./plugins/js_data/landEX/orgLandData.json")
        );
    },
    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} dim
     * @param {number} landId
     * @returns {boolean}
     */
    isPosInLand(x, y, z, dim, landId) {
        if (!this.data[landId]) {
            return false;
        }
        let landData = this.data[landId];
        if (landData.range.dimid !== dim) {
            return false;
            // 维度错了
        }
        if (landData.range.type2D) {
            // 2D圈地
            if (
                x >= landData.range.min_position[0] &&
                x <= landData.range.max_position[0] &&
                z >= landData.range.min_position[2] &&
                z <= landData.range.max_position[2]
            ) {
                return true;
            } else {
                return false;
            }
        } else {
            if (
                x >= landData.range.min_position[0] &&
                x <= landData.range.max_position[0] &&
                z >= landData.range.min_position[2] &&
                z <= landData.range.max_position[2] &&
                y >= landData.range.min_position[1] &&
                y <= landData.range.max_position[1]
            ) {
                return true;
            } else {
                return false;
            }
        }
    },
    /**
     *
     * @param {posInterface} posInterface
     * @param {number} dim
     * @param {boolean} type2D
     * @param {string} landId
     * @returns {boolean}
     */
    isRangeInLand(posInterface, dim, type2D = false, landId) {
        if (!this.data[landId]) {
            // 领地不存在，肯定不冲突
            logger.debug("领地不存在");
            return false;
        }
        let landData = this.data[landId];
        if (landData.range.dimid !== dim) {
            logger.debug("维度不对");
            return false;
            // 维度不对，肯定不冲突
        }
        // 使用分离轴算法判断是否冲突
        if (
            posInterface.maxX < landData.range.min_position[0] ||
            posInterface.minX > landData.range.max_position[0]
        ) {
            logger.debug("X轴没有冲突");
            return false;
        }
        if (
            posInterface.maxZ < landData.range.min_position[2] ||
            posInterface.minZ > landData.range.max_position[2]
        ) {
            logger.debug("Z轴没有冲突");
            return false;
        }
        // 能走到这里，说明X与Z都全冲突了，如果两块圈地其中有一个是2D圈地，那必然重叠
        if (!type2D && !landData.range.type2D) {
            // 俩都是3D领地，加一个3D领地的判断
            if (
                posInterface.maxY < landData.range.min_position[1] ||
                posInterface.minY > landData.range.max_position[1]
            ) {
                logger.debug("Y轴没有冲突");
                return false;
            }
        }
        return true;
    },

    /**
     * 检查玩家是否为受信任玩家
     * @param {string} xuid
     * @param {string} landId
     * @returns {boolean}
     */
    inTrust(xuid, landId) {
        if (!this.data[landId]) {
            //领地不存在，放行
            return true;
        }
        let orgNum = orgAPI.getOrgNum(xuid);
        if (this.data[landId].settings.owner !== orgNum) {
            return false;
            //非公会成员
        }
        if (orgAPI.isOwner(xuid)) {
            //管理员，恒信任
            return true;
        }
        if (this.data[landId].permissions.organization.trustMembers) {
            //信任成员
            return true;
        }
        return false;
    },
};

if (File.exists("./plugins/js_data/landEX/orgLandData.json")) {
    OlandDataInterface.load();
} else {
    OlandDataInterface.save();
}

// 区块索引器界面
const ChunkInterface = {
    data: {
        private: [{}, {}, {}],
        organization: [{}, {}, {}],
    },
    load() {
        logger.log("加载缓存的索引表...");
        this.data = JSON.parse(
            File.readFrom("./plugins/js_data/landEX/landIndex.json")
        );
    },
    reload() {
        logger.log("正在构建索引表...");
        // 设置计数
        let count = 0;
        // 遍历每个私人地皮数据
        for (const key in pLandDataInterface.data) {
            if (Object.hasOwnProperty.call(pLandDataInterface.data, key)) {
                const element = pLandDataInterface.data[key];
                const range = element.range;
                // 设置区块范围
                const chunkRange = {
                    minX: Math.floor(range.min_position[0] / 16 - 1),
                    minZ: Math.floor(range.min_position[2] / 16 - 1),
                    maxX: Math.floor(range.max_position[0] / 16 + 1),
                    maxZ: Math.floor(range.max_position[2] / 16 + 1),
                };

                // 二维遍历
                for (
                    let chunkX = chunkRange.minX;
                    chunkX < chunkRange.maxX;
                    chunkX++
                ) {
                    if (!this.data.private[range.dimid]["C" + String(chunkX)]) {
                        // 不存在相关X区块记录，创建
                        this.data.private[range.dimid]["C" + String(chunkX)] =
                            {};
                    }
                    for (
                        let chunkZ = chunkRange.minZ;
                        chunkZ < chunkRange.maxZ;
                        chunkZ++
                    ) {
                        if (
                            !this.data.private[range.dimid][
                                "C" + String(chunkX)
                            ]["C" + String(chunkZ)]
                        ) {
                            // 不存在相关Z区块记录，创建
                            this.data.private[range.dimid][
                                "C" + String(chunkX)
                            ]["C" + String(chunkZ)] = [];
                        }
                        // 加入data
                        this.data.private[range.dimid]["C" + String(chunkX)][
                            "C" + String(chunkZ)
                        ].push(key);
                        count++;
                    }
                }
            }
        }
        // 遍历团体地皮数据
        for (const key in OlandDataInterface.data) {
            if (Object.hasOwnProperty.call(OlandDataInterface.data, key)) {
                const element = OlandDataInterface.data[key];
                const range = element.range;
                // 设置区块范围
                const chunkRange = {
                    minX: Math.floor(range.min_position[0] / 16 - 1),
                    minZ: Math.floor(range.min_position[2] / 16 - 1),
                    maxX: Math.floor(range.max_position[0] / 16 + 1),
                    maxZ: Math.floor(range.max_position[2] / 16 + 1),
                };
                // 二维遍历
                for (
                    let chunkX = chunkRange.minX;
                    chunkX < chunkRange.maxX;
                    chunkX++
                ) {
                    if (
                        !this.data.organization[range.dimid][
                            "C" + String(chunkX)
                        ]
                    ) {
                        // 不存在相关X区块记录，创建
                        this.data.organization[range.dimid][
                            "C" + String(chunkX)
                        ] = {};
                    }
                    for (
                        let chunkZ = chunkRange.minZ;
                        chunkZ < chunkRange.maxZ;
                        chunkZ++
                    ) {
                        if (
                            !this.data.organization[range.dimid][
                                "C" + String(chunkX)
                            ]["C" + String(chunkZ)]
                        ) {
                            // 不存在相关Z区块记录，创建
                            this.data.organization[range.dimid][
                                "C" + String(chunkX)
                            ]["C" + String(chunkZ)] = [];
                        }
                        // 加入data
                        this.data.organization[range.dimid][
                            "C" + String(chunkX)
                        ]["C" + String(chunkZ)].push(key);
                        count++;
                    }
                }
            }
        }
        logger.log("索引构建完成，共产生" + count + "条数据。");
    },
    save() {
        File.writeTo(
            "./plugins/js_data/landEX/landIndex.json",
            JSON.stringify(this.data)
        );
    },
    /**
     *
     * @param {number} minX
     * @param {number} maxX
     * @param {number} minZ
     * @param {number} maxZ
     * @param {number} dimid
     * @param {string} landId
     */
    unlinkPrivate(minX, maxX, minZ, maxZ, dimid, landId) {
        // 删除索引
        // 计算区块范围
        const chunkRange = {
            minX: Math.floor(minX / 16 - 1),
            minZ: Math.floor(minZ / 16 - 1),
            maxX: Math.floor(maxX / 16 + 1),
            maxZ: Math.floor(maxZ / 16 + 1),
        };
        // 二维遍历
        for (let chunkX = chunkRange.minX; chunkX < chunkRange.maxX; chunkX++) {
            if (!this.data.private[dimid]["C" + String(chunkX)]) {
                // 不存在相关X区块记录，跳过
                continue;
            }
            for (
                let chunkZ = chunkRange.minZ;
                chunkZ < chunkRange.maxZ;
                chunkZ++
            ) {
                if (
                    !this.data.private[dimid]["C" + String(chunkX)][
                        "C" + String(chunkZ)
                    ]
                ) {
                    // 不存在相关Z区块记录，跳过
                    continue;
                }
                // 看看有没有
                let index =
                    this.data.private[dimid]["C" + String(chunkX)][
                        "C" + String(chunkZ)
                    ].indexOf(landId);
                if (index !== -1) {
                    this.data.private[dimid]["C" + String(chunkX)][
                        "C" + String(chunkZ)
                    ].splice(index, 1);
                }
                // 处理空数组
                if (
                    this.data.private[dimid]["C" + String(chunkX)][
                        "C" + String(chunkZ)
                    ].length === 0
                ) {
                    delete this.data.private[dimid]["C" + String(chunkX)][
                        "C" + String(chunkZ)
                    ];
                }
            }
            if (
                Object.keys(this.data.private[dimid]["C" + String(chunkX)])
                    .length === 0
            ) {
                delete this.data.private[dimid]["C" + String(chunkX)];
            }
        }
    },
    /**
     *
     * @param {number} minX
     * @param {number} maxX
     * @param {number} minZ
     * @param {number} maxZ
     * @param {number} dimid
     * @param {string} landId
     */
    unlinkOrg(minX, maxX, minZ, maxZ, dimid, landId) {
        // 删除索引
        // 计算区块范围
        const chunkRange = {
            minX: Math.floor(minX / 16 - 1),
            minZ: Math.floor(minZ / 16 - 1),
            maxX: Math.floor(maxX / 16 + 1),
            maxZ: Math.floor(maxZ / 16 + 1),
        };
        // 二维遍历
        for (let chunkX = chunkRange.minX; chunkX < chunkRange.maxX; chunkX++) {
            if (!this.data.organization[dimid]["C" + String(chunkX)]) {
                // 不存在相关X区块记录，跳过
                continue;
            }
            for (
                let chunkZ = chunkRange.minZ;
                chunkZ < chunkRange.maxZ;
                chunkZ++
            ) {
                if (
                    !this.data.organization[dimid]["C" + String(chunkX)][
                        "C" + String(chunkZ)
                    ]
                ) {
                    // 不存在相关Z区块记录，跳过
                    continue;
                }
                // 看看有没有
                let index =
                    this.data.organization[dimid]["C" + String(chunkX)][
                        "C" + String(chunkZ)
                    ].indexOf(landId);
                if (index !== -1) {
                    this.data.organization[dimid]["C" + String(chunkX)][
                        "C" + String(chunkZ)
                    ].splice(index, 1);
                }
                // 处理空数组
                if (
                    this.data.organization[dimid]["C" + String(chunkX)][
                        "C" + String(chunkZ)
                    ].length === 0
                ) {
                    delete this.data.organization[dimid]["C" + String(chunkX)][
                        "C" + String(chunkZ)
                    ];
                }
            }
            if (
                Object.keys(this.data.organization[dimid]["C" + String(chunkX)])
                    .length === 0
            ) {
                delete this.data.organization[dimid]["C" + String(chunkX)];
            }
        }
    },
    /**
     *
     * @param {string} landId
     * @returns
     */
    linkPrivate(landId) {
        let element = pLandDataInterface.data[landId];
        if (!element) {
            return;
        }
        let range = element.range;
        // 设置区块范围
        let chunkRange = {
            minX: Math.floor(range.min_position[0] / 16 - 1),
            minZ: Math.floor(range.min_position[2] / 16 - 1),
            maxX: Math.floor(range.max_position[0] / 16 + 1),
            maxZ: Math.floor(range.max_position[2] / 16 + 1),
        };
        // 二维遍历
        for (let chunkX = chunkRange.minX; chunkX < chunkRange.maxX; chunkX++) {
            if (!this.data.private[range.dimid]["C" + String(chunkX)]) {
                // 不存在相关X区块记录，创建
                this.data.private[range.dimid]["C" + String(chunkX)] = {};
            }
            for (
                let chunkZ = chunkRange.minZ;
                chunkZ < chunkRange.maxZ;
                chunkZ++
            ) {
                if (
                    !this.data.private[range.dimid]["C" + String(chunkX)][
                        "C" + String(chunkZ)
                    ]
                ) {
                    // 不存在相关Z区块记录，创建
                    this.data.private[range.dimid]["C" + String(chunkX)][
                        "C" + String(chunkZ)
                    ] = [];
                }
                // 加入data
                this.data.private[range.dimid]["C" + String(chunkX)][
                    "C" + String(chunkZ)
                ].push(landId);
            }
        }
    },
    /**
     *
     * @param {string} landId
     * @returns
     */
    linkOrg(landId) {
        let element = OlandDataInterface.data[landId];
        if (!element) {
            return;
        }
        let range = element.range;
        // 设置区块范围
        let chunkRange = {
            minX: Math.floor(range.min_position[0] / 16 - 1),
            minZ: Math.floor(range.min_position[2] / 16 - 1),
            maxX: Math.floor(range.max_position[0] / 16 + 1),
            maxZ: Math.floor(range.max_position[2] / 16 + 1),
        };
        // 二维遍历
        for (let chunkX = chunkRange.minX; chunkX < chunkRange.maxX; chunkX++) {
            if (!this.data.organization[range.dimid]["C" + String(chunkX)]) {
                // 不存在相关X区块记录，创建
                this.data.organization[range.dimid]["C" + String(chunkX)] = {};
            }
            for (
                let chunkZ = chunkRange.minZ;
                chunkZ < chunkRange.maxZ;
                chunkZ++
            ) {
                if (
                    !this.data.organization[range.dimid]["C" + String(chunkX)][
                        "C" + String(chunkZ)
                    ]
                ) {
                    // 不存在相关Z区块记录，创建
                    this.data.organization[range.dimid]["C" + String(chunkX)][
                        "C" + String(chunkZ)
                    ] = [];
                }
                // 加入data
                this.data.organization[range.dimid]["C" + String(chunkX)][
                    "C" + String(chunkZ)
                ].push(landId);
            }
        }
    },
    /**
     *
     * @param {number} x
     * @param {number} z
     * @param {number} dim
     * @param {boolean} org
     * @returns {string[]}
     */
    getChunksLand(x, z, dim, org) {
        // 获取模糊的附近领地
        let chunkX = Math.floor(x / 16);
        let chunkZ = Math.floor(z / 16);
        logger.debug("尝试以下索引：" + chunkX + "," + chunkZ + "," + dim);
        if (
            !this.data[org ? "organization" : "private"][dim] ||
            !this.data[org ? "organization" : "private"][dim][
                "C" + String(chunkX)
            ] ||
            !this.data[org ? "organization" : "private"][dim][
                "C" + String(chunkX)
            ]["C" + String(chunkZ)]
        ) {
            logger.debug("索引没有建立，此区块中没有领地");
            return [];
        } else {
            return this.data[org ? "organization" : "private"][dim][
                "C" + String(chunkX)
            ]["C" + String(chunkZ)];
        }
    },
    /**
     *
     * @param {number} chunkX
     * @param {number} chunkZ
     * @param {number} dim
     * @param {boolean} org
     * @returns {string[]}
     */
    getChunks(chunkX, chunkZ, dim, org = false) {
        // 获取区块内所有领地
        logger.debug("尝试以下索引：" + chunkX + "," + chunkZ + "," + dim);
        if (
            !this.data[org ? "organization" : "private"][dim] ||
            !this.data[org ? "organization" : "private"][dim][
                "C" + String(chunkX)
            ] ||
            !this.data[org ? "organization" : "private"][dim][
                "C" + String(chunkX)
            ]["C" + String(chunkZ)]
        ) {
            logger.debug("索引没有建立，此区块中没有领地");
            return [];
        } else {
            return this.data[org ? "organization" : "private"][dim][
                "C" + String(chunkX)
            ]["C" + String(chunkZ)];
        }
    },
};
if (!configAPI.data.common.enableCache) {
    ChunkInterface.reload();
} else if (File.exists("./plugins/js_data/landEX/landIndex.json")) {
    ChunkInterface.load();
} else {
    ChunkInterface.reload();
    ChunkInterface.save();
}
// 缓存系统
const cache = {
    data: new Map(),
    sequence: [],
    push(key, value) {
        // 向缓存中推送元素
        // 缓存超额，删除一些
        while (this.data.size >= configAPI.data.common.cacheSize) {
            let lastOne = this.sequence.pop();
            this.data.delete(lastOne);
        }
        this.data.set(key, value);
        let lastOne = this.sequence.indexOf(key);
        if (lastOne !== -1) {
            this.sequence.splice(lastOne, 1);
        }
        this.sequence.splice(0, 0, key);
        logger.debug("推送了一条索引" + key + ":" + value);
    },
    try(key) {
        // 尝试在缓存中命中元素
        let lastOne = this.sequence.indexOf(key);
        if (lastOne !== -1) {
            this.sequence.splice(lastOne, 1);
            this.sequence.splice(0, 0, key);
            return this.data.get(key);
        } else {
            return null;
        }
    },
    cancel(key) {
        // 使一个键作废
        let lastOne = this.sequence.indexOf(key);
        if (lastOne !== -1) {
            this.sequence.splice(lastOne, 1);
            return this.data.delete(key);
        }
    },
    clean() {
        // 清空缓存
        this.data = new Map();
        this.sequence = [];
    },
};

/**
 * 获取坐标所在的私人领地
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} dim
 * @returns {string|null}
 */
function getPLandIdbyPos(x, y, z, dim) {
    if (configAPI.data.common.enableCache) {
        // 如果有缓存，不妨试一试
        let result = cache.try(
            `p:${parseInt(x)},${parseInt(y)},${parseInt(z)},${dim}`
        );
        if (result === "em") {
            logger.debug("缓存命中:空");
            return null;
        }
        if (result) {
            logger.debug("缓存命中:" + result);
            return result;
        } else {
            logger.debug("缓存未命中，查区块索引试试");
        }
    }
    let possibleLand = ChunkInterface.getChunksLand(x, z, dim, false);
    for (const item of possibleLand) {
        if (
            pLandDataInterface.isPosInLand(
                parseInt(x),
                parseInt(y),
                parseInt(z),
                dim,
                item
            )
        ) {
            logger.debug("区块索引命中：" + item);
            if (configAPI.data.common.enableCache) {
                // 存入缓存
                cache.push(
                    `p:${parseInt(x)},${parseInt(y)},${parseInt(z)},${dim}`,
                    item
                );
                return item;
            }
        } else {
            logger.debug("区块索引未命中");
        }
    }
    // 啥都没有，吧啥都没有这个结果存入缓存
    if (configAPI.data.common.enableCache) {
        // 存入缓存
        cache.push(`p:${x},${y},${z},${dim}`, "em");
        return null;
    }
    return null;
}
/**
 * 获取团队坐标所在的领地
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} dim
 * @returns {string|null}
 */
function getOLandIdbyPos(x, y, z, dim) {
    // 前面的区域以后再来探索吧
    if (configAPI.data.common.enableCache) {
        // 如果有缓存，不妨试一试
        let result = cache.try(
            `o:${parseInt(x)},${parseInt(y)},${parseInt(z)},${dim}`
        );
        if (result === "em") {
            logger.debug("缓存命中:空");
            return null;
        }
        if (result) {
            logger.debug("缓存命中:" + result);
            return result;
        } else {
            logger.debug("缓存未命中，查区块索引试试");
        }
    }
    let possibleLand = ChunkInterface.getChunksLand(x, z, dim, true);
    for (const item of possibleLand) {
        if (
            OlandDataInterface.isPosInLand(
                parseInt(x),
                parseInt(y),
                parseInt(z),
                dim,
                item
            )
        ) {
            logger.debug("区块索引命中：" + item);
            if (configAPI.data.common.enableCache) {
                // 存入缓存
                cache.push(
                    `o:${parseInt(x)},${parseInt(y)},${parseInt(z)},${dim}`,
                    item
                );
                return item;
            }
        } else {
        }
    }
    // 啥都没有，吧啥都没有这个结果存入缓存
    if (configAPI.data.common.enableCache) {
        // 存入缓存
        cache.push(
            `o:${parseInt(x)},${parseInt(y)},${parseInt(z)},${dim}`,
            "em"
        );
        return null;
    }
    return null;
}

/**
 * 简单坐标处理函数
 * @param {SimplePos} pos1
 * @param {SimplePos} pos2
 * @returns {posInterface}
 */
function twoPosFormat(pos1, pos2) {
    return {
        minX: pos1[0] > pos2[0] ? pos2[0] : pos1[0],
        minY: pos1[1] > pos2[1] ? pos2[1] : pos1[1],
        minZ: pos1[2] > pos2[2] ? pos2[2] : pos1[2],
        maxX: pos1[0] < pos2[0] ? pos2[0] : pos1[0],
        maxY: pos1[1] < pos2[1] ? pos2[1] : pos1[1],
        maxZ: pos1[2] < pos2[2] ? pos2[2] : pos1[2],
        dx: Math.abs(pos1[0] - pos2[0]),
        dy: Math.abs(pos1[1] - pos2[1]),
        dz: Math.abs(pos1[2] - pos2[2]),
    };
}

/**
 * 私人领地冲突，返回冲突的领地
 * @param {posInterface} posInterface
 * @param {number} dim
 * @param {boolean} type2D
 * @param {string[]} hasChecked
 * @returns {string|null}
 */
function getPLandConflict(posInterface, dim, type2D = false, hasChecked = []) {
    const chunkRange = {
        minX: Math.floor(posInterface.minX / 16 - 1),
        minZ: Math.floor(posInterface.minZ / 16 - 1),
        maxX: Math.floor(posInterface.maxX / 16 + 1),
        maxZ: Math.floor(posInterface.maxZ / 16 + 1),
    };
    // 二维遍历
    for (let chunkX = chunkRange.minX; chunkX < chunkRange.maxX; chunkX++) {
        for (let chunkZ = chunkRange.minZ; chunkZ < chunkRange.maxZ; chunkZ++) {
            let chunks = ChunkInterface.getChunks(chunkX, chunkZ, dim);
            for (const landId of chunks) {
                if (hasChecked.indexOf(landId) !== -1) {
                    // 这块领地已经检查过合格，不需要再检查
                    continue;
                }
                if (
                    pLandDataInterface.isRangeInLand(
                        posInterface,
                        dim,
                        type2D,
                        landId
                    )
                ) {
                    // 找到冲突！
                    logger.debug("冲突：" + landId);
                    return landId;
                } else {
                    // 没有冲突，保存不再查找
                    hasChecked.push(landId);
                    logger.debug("[没有冲突]");
                }
            }
        }
    }
    return null;
}

/**
 * 私人领地范围检查
 * @param {posInterface} posInterface
 * @param {number} dim
 * @param {boolean} type2D
 * @param {string[]} hasChecked
 * @returns {string|null}
 */
function getPLandinRange(posInterface, dim, type2D = false) {
    const chunkRange = {
        minX: Math.floor(posInterface.minX / 16 - 1),
        minZ: Math.floor(posInterface.minZ / 16 - 1),
        maxX: Math.floor(posInterface.maxX / 16 + 1),
        maxZ: Math.floor(posInterface.maxZ / 16 + 1),
    };
    let hasChecked = [];
    let insideLand = [];
    // 二维遍历
    for (let chunkX = chunkRange.minX; chunkX < chunkRange.maxX; chunkX++) {
        for (let chunkZ = chunkRange.minZ; chunkZ < chunkRange.maxZ; chunkZ++) {
            //log(chunkX+":"+chunkZ+":"+dim+type2D)
            let chunks = ChunkInterface.getChunks(chunkX, chunkZ, dim, false);
            //log(chunks)
            for (const landId of chunks) {
                if (hasChecked.indexOf(landId) !== -1) {
                    // 这块领地已经检查过在外，不需要再检查
                    continue;
                }
                if (insideLand.indexOf(landId) !== -1) {
                    // 这块领地已经检查过在里，不需要再检查
                    continue;
                }
                if (
                    pLandDataInterface.isRangeInLand(
                        posInterface,
                        dim,
                        type2D,
                        landId
                    )
                ) {
                    // 找到冲突！
                    logger.debug("在内部：" + landId);
                    insideLand.push(landId);
                } else {
                    // 没有冲突，保存不再查找
                    hasChecked.push(landId);
                    logger.debug("在外部：" + landId);
                }
            }
        }
    }
    return insideLand;
}

/**
 * 团队领地冲突，返回冲突的领地
 * @param {posInterface} posInterface
 * @param {number} dim
 * @param {boolean} type2D
 * @param {string[]} hasChecked
 * @param {player} player
 * @param {boolean} typeOrg
 * @returns {string|null}
 */
function getOLandConflict(
    posInterface,
    dim,
    type2D = false,
    hasChecked = [],
    player,
    typeOrg = false
) {
    const chunkRange = {
        minX: Math.floor(posInterface.minX / 16 - 1),
        minZ: Math.floor(posInterface.minZ / 16 - 1),
        maxX: Math.floor(posInterface.maxX / 16 + 1),
        maxZ: Math.floor(posInterface.maxZ / 16 + 1),
    };
    // 二维遍历
    for (let chunkX = chunkRange.minX; chunkX < chunkRange.maxX; chunkX++) {
        for (let chunkZ = chunkRange.minZ; chunkZ < chunkRange.maxZ; chunkZ++) {
            let chunks = ChunkInterface.getChunks(chunkX, chunkZ, dim, true);
            for (const landId of chunks) {
                if (hasChecked.indexOf(landId) !== -1) {
                    // 这块领地已经检查过合格，不需要再检查
                    continue;
                } else if (
                    !OlandDataInterface.isRangeInLand(
                        posInterface,
                        dim,
                        type2D,
                        landId
                    )
                ) {
                    // 没有冲突
                    hasChecked.push(landId);
                    logger.debug("[没有冲突]");
                    continue;
                } else {
                    //找到重叠领地，查看是否冲突
                    if (typeOrg) {
                        //要圈的是团队领地，有重叠，冲突
                        logger.debug("[有冲突]");
                        return landId;
                    }
                    let landData = OlandDataInterface.data[landId];
                    if (landData.permissions.organization.allowOtherEnclose) {
                        logger.debug("[有冲突]但此领地允许任何人圈地");
                        hasChecked.push(landId);
                        continue;
                    } else if (
                        landData.permissions.organization.allowMemberEnclose &&
                        landData.settings.owner ===
                            orgAPI.getOrgNum(player.xuid)
                    ) {
                        logger.debug(
                            "[有冲突]但此领地允许玩家圈地且玩家是本公会的人"
                        );
                        hasChecked.push(landId);
                        continue;
                    } else if (orgAPI.isOwner(player.xuid)) {
                        logger.debug("[有冲突]但此玩家是领地所属公会的管理员");
                        hasChecked.push(landId);
                        continue;
                    } else {
                        logger.debug("[有冲突]");
                        return landId;
                    }
                }
            }
        }
    }
    return null;
}

/**
 * 玩家状态
 * @type {Object<string,state>}
 */
let playerState = {};
//

const drawCube = ll.import("xmmppsjs_drawCube");
// 地皮进入离开显示

setInterval(() => {
    for (const player of mc.getOnlinePlayers()) {
        let pos = player.blockPos;
        // 玩家状态
        if (!playerState[player.xuid]) {
            /**
             * @type {state}
             */
            playerState[player.xuid] = {
                state: "playing", // 正在游玩，不在圈地
                inPLand: "",
                inOLand: "",
                editingLand: {
                    isOrg: false,
                    LandId: "",
                },
                enclosure: {
                    // 临时圈地的信息
                    type2D: false,
                    dim: 0,
                    posA: [],
                    posB: [],
                },
            };
        }
        // 特殊状态特殊处理
        switch (playerState[player.xuid].state) {
            case "enclosing":
                {
                    // 圈地状态
                    let dim = playerState[player.xuid].enclosure.dim;
                    let posA = playerState[player.xuid].enclosure.posA.length
                        ? String(playerState[player.xuid].enclosure.posA)
                        : i18n.$t("enclose.edit.nochoose");
                    let posB = playerState[player.xuid].enclosure.posB.length
                        ? String(playerState[player.xuid].enclosure.posB)
                        : i18n.$t("enclose.edit.nochoose");
                    player.sendText(
                        i18n.$t("alert.buttom.enclosing", [posA, posB, dim]),
                        5
                    );
                }
                return;
            case "reEnclosing":
                {
                    // 重新圈地状态
                    let dim = playerState[player.xuid].enclosure.dim;
                    let posA = playerState[player.xuid].enclosure.posA.length
                        ? String(playerState[player.xuid].enclosure.posA)
                        : i18n.$t("enclose.edit.nochoose");
                    let posB = playerState[player.xuid].enclosure.posB.length
                        ? String(playerState[player.xuid].enclosure.posB)
                        : i18n.$t("enclose.edit.nochoose");
                    let landData = playerState[player.xuid].editingLand.isOrg
                        ? OlandDataInterface.data[
                              playerState[player.xuid].editingLand.landId
                          ]
                        : pLandDataInterface.data[
                              playerState[player.xuid].editingLand.landId
                          ];
                    player.sendText(
                        i18n.$t("alert.buttom.reEnclosing", [
                            landData.settings.name,
                            posA,
                            posB,
                        ]),
                        5
                    );
                }
                return;
            default:
                break;
        }
        // 游玩状态，正常显示边框
        let result = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
        if (!result) {
            if (playerState[player.xuid].inPLand !== "") {
                // 离开私人领地
                let landData =
                    pLandDataInterface.data[playerState[player.xuid].inPLand];
                if (
                    playerState[player.xuid].state === "playing" &&
                    landData.settings.notifyItemBar
                ) {
                    // 离开领地提示
                    player.sendText(
                        i18n.$t("alert.buttom.leave", [landData.settings.name]),
                        5
                    );
                }
                if (enableDrawLine && landData.settings.drawCube) {
                    // 画线
                    drawCube(
                        landData.range.min_position[0],
                        landData.range.min_position[1],
                        landData.range.min_position[2],
                        landData.range.max_position[0] -
                            landData.range.min_position[0] +
                            1,
                        landData.range.max_position[1] -
                            landData.range.min_position[1] +
                            1,
                        landData.range.max_position[2] -
                            landData.range.min_position[2] +
                            1,
                        landData.range.dimid,
                        ParticleColor.Yellow,
                        0.04,
                        true
                    );
                }
                playerState[player.xuid].inPLand = "";
            }
            // 玩家在空领地
        } else {
            if (result === playerState[player.xuid].inPLand) {
                // 玩家所在领地位置不变
                return;
            } else if (playerState[player.xuid].state !== "playing") {
                // 玩家没在游玩，可能在圈地
                return;
            } else {
                // 对玩家显示圈地
                playerState[player.xuid].inPLand = result;
                let landData = pLandDataInterface.data[result];
                if (landData.settings.notifyItemBar) {
                    // 发送进入领地的文本
                    player.sendText(
                        i18n.$t("alert.buttom.join", [landData.settings.name]),
                        5
                    );
                }
                if (enableDrawLine && landData.settings.drawCube) {
                    // 画线
                    drawCube(
                        landData.range.min_position[0],
                        landData.range.min_position[1],
                        landData.range.min_position[2],
                        landData.range.max_position[0] -
                            landData.range.min_position[0] +
                            1,
                        landData.range.max_position[1] -
                            landData.range.min_position[1] +
                            1,
                        landData.range.max_position[2] -
                            landData.range.min_position[2] +
                            1,
                        landData.range.dimid,
                        ParticleColor.Green,
                        0.02,
                        true
                    );
                }
                if (
                    playerState[player.xuid].state === "playing" &&
                    landData.settings.notifytoOwner &&
                    player.xuid === landData.settings.owner
                ) {
                    // 领地所有者提示
                    player.sendText(
                        i18n.$t("alert.text.owner", [
                            data.xuid2name(landData.settings.owner),
                        ]),
                        0
                    );
                } else if (
                    playerState[player.xuid].state === "playing" &&
                    landData.settings.notifytoPlayer
                ) {
                    // 领地所有者提示
                    player.sendText(
                        i18n.$t("alert.text.owner", [
                            data.xuid2name(landData.settings.owner),
                        ]),
                        0
                    );
                }
                if (landData.resell) {
                    player.sendText(
                        i18n.$t("resell.notify", [landData.resell])
                    );
                }
            }
        } //检查团队领地
        if (enableOrg) {
            result = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
            if (!result) {
                if (playerState[player.xuid].inOLand !== "") {
                    // 离开领地
                    let landData =
                        OlandDataInterface.data[
                            playerState[player.xuid].inOLand
                        ];
                    if (
                        playerState[player.xuid].state === "playing" &&
                        landData.settings.notifyItemBar
                    ) {
                        // 离开提示
                        player.sendText(
                            i18n.$t("alert.buttom.orgleave", [
                                landData.settings.name,
                            ]),
                            5
                        );
                    }
                    if (enableDrawLine && landData.settings.drawCube) {
                        // 画线
                        drawCube(
                            landData.range.min_position[0],
                            landData.range.min_position[1],
                            landData.range.min_position[2],
                            landData.range.max_position[0] -
                                landData.range.min_position[0] +
                                1,
                            landData.range.max_position[1] -
                                landData.range.min_position[1] +
                                1,
                            landData.range.max_position[2] -
                                landData.range.min_position[2] +
                                1,
                            landData.range.dimid,
                            ParticleColor.Yellow,
                            0.04,
                            true
                        );
                    }
                    playerState[player.xuid].inOLand = "";
                }
                // 玩家在空领地
            } else {
                if (result === playerState[player.xuid].inOLand) {
                    // 玩家所在领地位置不变
                    return;
                } else if (playerState[player.xuid].state !== "playing") {
                    // 玩家没在游玩，可能在圈地
                    return;
                } else {
                    // 对玩家显示圈地
                    playerState[player.xuid].inOLand = result;
                    let landData = OlandDataInterface.data[result];
                    if (landData.settings.notifyItemBar) {
                        // 发送进入领地的文本
                        player.sendText(
                            i18n.$t("alert.buttom.orgjoin", [
                                landData.settings.name,
                            ]),
                            5
                        );
                    }
                    if (enableDrawLine && landData.settings.drawCube) {
                        // 画线
                        drawCube(
                            landData.range.min_position[0],
                            landData.range.min_position[1],
                            landData.range.min_position[2],
                            landData.range.max_position[0] -
                                landData.range.min_position[0] +
                                1,
                            landData.range.max_position[1] -
                                landData.range.min_position[1] +
                                1,
                            landData.range.max_position[2] -
                                landData.range.min_position[2] +
                                1,
                            landData.range.dimid,
                            ParticleColor.Green,
                            0.02,
                            true
                        );
                    }
                    if (
                        playerState[player.xuid].state === "playing" &&
                        landData.settings.notifytoOwner &&
                        orgAPI.getOrgNum(player.xuid) ===
                            landData.settings.owner &&
                        orgAPI.isOwner(player.xuid)
                    ) {
                        // 领地所有者提示
                        player.sendText(
                            i18n.$t("alert.text.owner", [
                                orgAPI.getOrgName(landData.settings.owner),
                            ]),
                            0
                        );
                    } else if (
                        playerState[player.xuid].state === "playing" &&
                        landData.settings.notifytoPlayer
                    ) {
                        // 领地所有者提示
                        player.sendText(
                            i18n.$t("alert.text.owner", [
                                orgAPI.getOrgName(landData.settings.owner),
                            ]),
                            0
                        );
                    }
                }
            }
        }
    }
}, configAPI.data.common.tickRate);
// 玩家进服
mc.listen("onJoin", function (player) {
    // 写入玩家初始state
    if (!playerState[player.xuid]) {
        playerState[player.xuid] = {
            state: "playing", // 正在游玩，不在圈地
            inPLand: "",
            inOLand: "",
            editingLand: {
                isOrg: false,
                LandId: "",
            },
            enclosure: {
                // 临时圈地的信息
                type2D: false,
                dim: 0,
                posA: [],
                posB: [],
            },
        };
    }
    //玩家加钱
    if (moneyUni.offlineMoney.get(player.xuid)) {
        moneyUni.addMoney(parseInt(moneyUni.offlineMoney.get(player.xuid)));
        moneyUni.offlineMoney.delete(player.xuid);
    }
    //保存玩家的XUID和名字
    playerDB.data[player.xuid] = player.realName;
    playerDB.save();
});
// 玩家离开
mc.listen("onLeft", function (player) {
    // 删除玩家的state
    if (playerState[player.xuid]) {
        delete playerState[player.xuid];
    }
});

// 玩家圈地指令
function CommandEncloseHander(player, action) {
    let pos = player.blockPos;
    switch (action) {
        case "setpos1":
            if (playerState[player.xuid].state !== "reEnclosing") {
                playerState[player.xuid].state = "enclosing";
            }
            if (pos.dimid !== playerState[player.xuid].enclosure.dim) {
                if (playerState[player.xuid].state === "reEnclosing") {
                    player.tell(i18n.$t("reEnclosing.dimnoChange"));
                    return;
                }
                // 维度不同，清空另一个坐标
                playerState[player.xuid].enclosure.dim = pos.dimid;
                playerState[player.xuid].enclosure.posA = [pos.x, pos.y, pos.z];
                playerState[player.xuid].enclosure.posB = [];
            } else {
                // 维度相同，仅写入坐标
                playerState[player.xuid].enclosure.posA = [pos.x, pos.y, pos.z];
                if (
                    playerState[player.xuid].enclosure.posA.length !== 0 &&
                    playerState[player.xuid].enclosure.posB.length !== 0 &&
                    enableDrawLine
                ) {
                    // 画线
                    let posInter = twoPosFormat(
                        playerState[player.xuid].enclosure.posA,
                        playerState[player.xuid].enclosure.posB
                    );
                    drawCube(
                        posInter.minX,
                        posInter.minY,
                        posInter.minZ,
                        posInter.dx + 1,
                        posInter.dy + 1,
                        posInter.dz + 1,
                        playerState[player.xuid].enclosure.dim,
                        ParticleColor.Red,
                        0.04,
                        true
                    );
                }
            }
            break;
        case "setpos2":
            if (playerState[player.xuid].state !== "reEnclosing") {
                playerState[player.xuid].state = "enclosing";
            }
            if (pos.dimid !== playerState[player.xuid].enclosure.dim) {
                if (playerState[player.xuid].state === "reEnclosing") {
                    player.tell(i18n.$t("reEnclosing.dimnoChange"));
                    return;
                }
                // 维度不同，清空另一个坐标
                playerState[player.xuid].enclosure.dim = pos.dimid;
                playerState[player.xuid].enclosure.posB = [pos.x, pos.y, pos.z];
                playerState[player.xuid].enclosure.posA = [];
            } else {
                // 维度相同，仅写入坐标
                playerState[player.xuid].enclosure.posB = [pos.x, pos.y, pos.z];
                if (
                    playerState[player.xuid].enclosure.posA.length !== 0 &&
                    playerState[player.xuid].enclosure.posB.length !== 0 &&
                    enableDrawLine
                ) {
                    // 画线
                    let posInter = twoPosFormat(
                        playerState[player.xuid].enclosure.posA,
                        playerState[player.xuid].enclosure.posB
                    );
                    drawCube(
                        posInter.minX,
                        posInter.minY,
                        posInter.minZ,
                        posInter.dx + 1,
                        posInter.dy + 1,
                        posInter.dz + 1,
                        playerState[player.xuid].enclosure.dim,
                        ParticleColor.Red,
                        0.04,
                        true
                    );
                }
            }
            break;
        case "cancel":
            playerState[player.xuid].state = "playing";
            if (playerState[player.xuid].state === "reEnclosing") {
                playerState[player.xuid].editingLand.landId = "";
            }
            break;
        case "show":
            if (playerState[player.xuid].state !== "reEnclosing") {
                playerState[player.xuid].state = "enclosing";
            }
            if (
                playerState[player.xuid].enclosure.posA.length !== 0 &&
                playerState[player.xuid].enclosure.posB.length !== 0 &&
                enableDrawLine
            ) {
                // 画线
                let posInter = twoPosFormat(
                    playerState[player.xuid].enclosure.posA,
                    playerState[player.xuid].enclosure.posB
                );
                drawCube(
                    posInter.minX,
                    posInter.minY,
                    posInter.minZ,
                    posInter.dx + 1,
                    posInter.dy + 1,
                    posInter.dz + 1,
                    playerState[player.xuid].enclosure.dim,
                    ParticleColor.Red,
                    0.04,
                    true
                );
            }
            break;
        case "edit":
            // 手动编写
            if (
                playerState[player.xuid].enclosure.posA.length === 0 ||
                playerState[player.xuid].enclosure.posB.length === 0
            ) {
                // 有一个坐标没有，不允许编辑。
                player.tell(i18n.$t("enclose.edit.noHavePos"));
                return;
            }
            // 创建GUI
            let fm = mc
                .newCustomForm()
                .setTitle(i18n.$t("enclose.edit.formTitle"));
            fm.addLabel(i18n.$t("enclose.edit.label"));
            fm.addInput(
                i18n.$t("enclose.edit.posA") + "X",
                i18n.$t("enclose.edit.posDesp"),
                String(playerState[player.xuid].enclosure.posA[0])
            );
            fm.addInput(
                i18n.$t("enclose.edit.posA") + "Y",
                i18n.$t("enclose.edit.posDesp"),
                String(playerState[player.xuid].enclosure.posA[1])
            );
            fm.addInput(
                i18n.$t("enclose.edit.posA") + "Z",
                i18n.$t("enclose.edit.posDesp"),
                String(playerState[player.xuid].enclosure.posA[2])
            );
            fm.addInput(
                i18n.$t("enclose.edit.posB") + "X",
                i18n.$t("enclose.edit.posDesp"),
                String(playerState[player.xuid].enclosure.posB[0])
            );
            fm.addInput(
                i18n.$t("enclose.edit.posB") + "Y",
                i18n.$t("enclose.edit.posDesp"),
                String(playerState[player.xuid].enclosure.posB[1])
            );
            fm.addInput(
                i18n.$t("enclose.edit.posB") + "Z",
                i18n.$t("enclose.edit.posDesp"),
                String(playerState[player.xuid].enclosure.posB[2])
            );
            // 发送GUI
            player.sendForm(fm, (pl, dt) => {
                // 没有圈地
                if (dt == null) {
                    return;
                } else {
                    let xuid = pl.xuid;
                    // Y坐标超了
                    if (parseInt(dt[2]) > 319 || parseInt(dt[2]) < -64) {
                        pl.tell(i18n.$t("enclose.edit.errorY"));
                        return;
                    }
                    if (parseInt(dt[5]) > 319 || parseInt(dt[5]) < -64) {
                        pl.tell(i18n.$t("enclose.edit.errorY"));
                        return;
                    }
                    // 写state
                    playerState[xuid].enclosure.posA = [
                        parseInt(dt[1]),
                        parseInt(dt[2]),
                        parseInt(dt[3]),
                    ];
                    playerState[xuid].enclosure.posB = [
                        parseInt(dt[4]),
                        parseInt(dt[5]),
                        parseInt(dt[6]),
                    ];

                    pl.tell(i18n.$t("enclose.edit.success"));
                    if (
                        playerState[player.xuid].enclosure.posA.length !== 0 &&
                        playerState[player.xuid].enclosure.posB.length !== 0 &&
                        enableDrawLine
                    ) {
                        // 画线
                        let posInter = twoPosFormat(
                            playerState[player.xuid].enclosure.posA,
                            playerState[player.xuid].enclosure.posB
                        );
                        drawCube(
                            posInter.minX,
                            posInter.minY,
                            posInter.minZ,
                            posInter.dx + 1,
                            posInter.dy + 1,
                            posInter.dz + 1,
                            playerState[player.xuid].enclosure.dim,
                            ParticleColor.Red,
                            0.04,
                            true
                        );
                    }
                }
            });
            return;
        case "confirm":
            if (
                playerState[player.xuid].state === "enclosing" ||
                playerState[player.xuid].state === "reEnclosing"
            ) {
                if (
                    playerState[player.xuid].enclosure.posA.length === 0 ||
                    playerState[player.xuid].enclosure.posB.length === 0
                ) {
                    // 有一个坐标没有，不允许编辑。
                    player.tell(i18n.$t("enclose.confirm.noHavePos"));
                    return;
                }
                let dim = playerState[player.xuid].enclosure.dim;
                let posA = playerState[player.xuid].enclosure.posA.length
                    ? String(playerState[player.xuid].enclosure.posA)
                    : i18n.$t("enclose.edit.nochoose");
                let posB = playerState[player.xuid].enclosure.posB.length
                    ? String(playerState[player.xuid].enclosure.posB)
                    : i18n.$t("enclose.edit.nochoose");
                // 只允许一种圈地模式的情况
                if (
                    configAPI.data.common.allow2D &&
                    configAPI.data.common.allow3D
                ) {
                    player.sendModalForm(
                        i18n.$t("enclose.confirm.title"),
                        i18n.$t("enclose.confirm.info", [posA, posB, dim]),
                        "2D",
                        "3D",
                        function (pl, dt) {
                            if (dt == null) {
                                return;
                            }
                            playerState[player.xuid].enclosure.type2D = !!dt;
                            playerState[player.xuid].state === "enclosing"
                                ? SelectEncloseType(pl)
                                : ReEnclosingScan(pl);
                        }
                    );
                } else if (!configAPI.data.common.allow3D) {
                    playerState[player.xuid].enclosure.type2D = true;
                    playerState[player.xuid].state === "enclosing"
                        ? SelectEncloseType(player)
                        : ReEnclosingScan(player);
                } else if (!configAPI.data.common.allow2D) {
                    playerState[player.xuid].enclosure.type2D = false;
                    playerState[player.xuid].state === "enclosing"
                        ? SelectEncloseType(player)
                        : ReEnclosingScan(player);
                }
            } else {
                player.tell(i18n.$t("enclose.edit.noEnclosing"));
            }
            break;
        default:
            break;
    }
}

// 选择圈地类型，检查限制，冲突...
function SelectEncloseType(player) {
    let posInter = twoPosFormat(
        playerState[player.xuid].enclosure.posA,
        playerState[player.xuid].enclosure.posB
    );
    // 检查坐标
    if (posInter.maxY > 319) {
        posInter.maxY = 319;
    }
    if (posInter.minY < -64) {
        posInter.minY = -64;
    }
    if (playerState[player.xuid].enclosure.type2D) {
        posInter.minY = -64;
        posInter.maxY = 319;
    }
    posInter.dy = posInter.maxY - posInter.minY;
    // 维度限制
    if (
        !configAPI.data.limit.allowDimension.includes(
            playerState[player.xuid].enclosure.dim
        ) &&
        !configAPI.data.operator.includes(player.xuid)
    ) {
        // 玩家不是管理员且圈地位置不在允许范围内
        player.tell(i18n.$t("enclose.confirm.dimensionNotAllow"));
    }
    if (getLand(player.xuid).length >= configAPI.data.limit.maxLands) {
        let fm = mc
            .newSimpleForm()
            .setTitle(i18n.$t("enclose.confirm.countover.title"))
            .setContent(
                i18n.$t("enclose.confirm.countover.info", [
                    configAPI.data.limit.maxLands,
                ])
            );
        player.sendForm(fm, () => {});
    }
    // 大小限制
    if (playerState[player.xuid].enclosure.type2D) {
        let square = posInter.dx * posInter.dz;
        if (
            square > configAPI.data.limit.type2DSquare[1] ||
            square < configAPI.data.limit.type2DSquare[0]
        ) {
            let fm = mc
                .newSimpleForm()
                .setTitle(i18n.$t("enclose.confirm.over"))
                .setContent(
                    i18n.$t("enclose.confirm.2D.over", [
                        square,
                        configAPI.data.limit.type2DSquare[1],
                        configAPI.data.limit.type2DSquare[0],
                    ])
                );
            player.sendForm(fm, () => {});
            return;
        }
    } else {
        let volume = posInter.dx * posInter.dz * posInter.dz;
        if (
            volume > configAPI.data.limit.type3DVolume[1] ||
            volume < configAPI.data.limit.type3DVolume[0]
        ) {
            let fm = mc
                .newSimpleForm()
                .setTitle(i18n.$t("enclose.confirm.over"))
                .setContent(
                    i18n.$t("enclose.confirm.3D.over", [
                        volume,
                        configAPI.data.limit.type3DVolume[1],
                        configAPI.data.limit.type3DVolume[0],
                    ])
                );
            player.sendForm(fm, () => {});
            return;
        }
    }
    // 正式开始圈地
    if (enableOrg && orgAPI.isOwner(player.xuid)) {
        // 允许圈公会地，需要确认
        player.sendModalForm(
            i18n.$t("enclose.chooseType.title"),
            i18n.$t("enclose.chooseType.desp"),
            i18n.$t("enclose.chooseType.priButton"),
            i18n.$t("enclose.chooseType.orgButton"),
            (pl, dt) => {
                if (dt == null) {
                    return;
                } else if (!dt) {
                    enclosePayment(pl, posInter, orgAPI.getOrgNum(pl.xuid));
                } else {
                    enclosePayment(pl, posInter);
                }
            }
        );
    } else {
        enclosePayment(player, posInter);
    }
}
function enclosePayment(player, posInterface, orgNum = null) {
    let conflictLandId;
    // 团队领地冲突检查：
    if (enableOrg) {
        conflictLandId = getOLandConflict(
            posInterface,
            playerState[player.xuid].enclosure.dim,
            playerState[player.xuid].enclosure.type2D,
            [],
            player,
            !!orgNum
        );
        if (conflictLandId) {
            // 发现冲突
            let fm = mc
                .newSimpleForm()
                .setTitle(i18n.$t("enclose.conflict.title"))
                .setContent(i18n.$t("enclose.conflict.org", [conflictLandId]));
            player.sendForm(fm, () => {});
            return;
        }
    }
    // 私人领地冲突检查
    conflictLandId = getPLandConflict(
        posInterface,
        playerState[player.xuid].enclosure.dim,
        playerState[player.xuid].enclosure.type2D
    );
    if (conflictLandId) {
        // 发现冲突
        let fm = mc
            .newSimpleForm()
            .setTitle(i18n.$t("enclose.conflict.title"))
            .setContent(i18n.$t("enclose.conflict.pri", [conflictLandId]));
        player.sendForm(fm, () => {});
        return;
    }
    // 算钱
    let price = 0;
    if (playerState[player.xuid].enclosure.type2D) {
        // 2D地皮价格
        price =
            posInterface.dx *
            posInterface.dz *
            configAPI.data.sell.type2D.priceSquare;
    } else if (configAPI.data.sell.type3D.priceY) {
        price =
            posInterface.dx *
                posInterface.dz *
                configAPI.data.sell.type3D.priceXZ +
            posInterface.dy * configAPI.data.sell.type3D.priceY;
    } else {
        price =
            posInterface.dx *
            posInterface.dy *
            posInterface.dz *
            configAPI.data.sell.type3D.priceXZ;
    }
    if (!orgNum) {
        // 直接发送付款页面
        if (moneyUni.get(player) < price) {
            // 钱不够
            let fm = mc
                .newSimpleForm()
                .setTitle(i18n.$t("enclose.payment.title"))
                .setContent(
                    i18n.$t("enclose.payment.moneyNoEnough", [
                        configAPI.data.economy.moneyName,
                        price,
                        moneyUni.get(player),
                    ])
                );
            player.sendForm(fm, () => {});
        } else {
            // 钱够
            player.sendModalForm(
                i18n.$t("enclose.payment.title"),
                i18n.$t("enclose.payment.pri", [price, moneyUni.get(player)]),
                i18n.$t("common.confirm"),
                i18n.$t("common.cancel"),
                (pl, dt) => {
                    if (dt == null) {
                        return;
                    }
                    if (dt) {
                        if (!moneyUni.pay(player, price)) {
                            player.tell(i18n.$t("enclose.payment.error"));
                            return;
                        }
                        encloseMain(pl, posInterface);
                    }
                }
            );
        }
    } else {
        // 是公会，要求其选择自己的钱包还是公会钱包
        if (
            moneyUni.get(player) < price &&
            orgAPI.orgGetMoney(orgNum) < price
        ) {
            // 完全没钱
            let fm = mc
                .newSimpleForm()
                .setTitle(i18n.$t("enclose.payment.title"))
                .setContent(
                    i18n.$t("enclose.payment.moneyNoEnough", [
                        configAPI.data.economy.moneyName,
                        price,
                        moneyUni.get(player),
                    ])
                );
            player.sendForm(fm, () => {});
            return;
        } else if (moneyUni.get(player) < price) {
            // 工会基金钱够
            player.sendModalForm(
                i18n.$t("enclose.payment.title"),
                i18n.$t("enclose.payment.ori", [
                    price,
                    orgAPI.orgGetMoney(orgNum),
                ]),
                i18n.$t("common.confirm"),
                i18n.$t("common.cancel"),
                (pl, dt) => {
                    if (dt == null) {
                        return;
                    }
                    if (dt) {
                        if (!orgAPI.orgAddMoney(orgNum, -price)) {
                            player.tell(i18n.$t("enclose.payment.error"));
                            return;
                        }
                        encloseMain(pl, posInterface, orgNum);
                    }
                }
            );
            return;
        } else if (orgAPI.orgGetMoney(orgAPI.getOrgNum(player.xuid)) < price) {
            // 玩家钱包钱够
            player.sendModalForm(
                i18n.$t("enclose.payment.title"),
                i18n.$t("enclose.payment.pri", [price, moneyUni.get(player)]),
                i18n.$t("common.confirm"),
                i18n.$t("common.cancel"),
                (pl, dt) => {
                    if (dt == null) {
                        return;
                    }
                    if (dt) {
                        if (!moneyUni.pay(player, price)) {
                            player.tell(i18n.$t("enclose.payment.error"));
                            return;
                        }
                        encloseMain(pl, posInterface, orgNum);
                    }
                }
            );
        } else {
            // 钱都够
            player.sendModalForm(
                i18n.$t("enclose.payment.title"),
                i18n.$t("enclose.payment.choose", [
                    price,
                    moneyUni.get(player),
                    orgAPI.orgGetMoney(orgNum),
                ]),
                i18n.$t("enclose.pay.self"),
                i18n.$t("enclose.pay.org"),
                (pl, dt) => {
                    if (dt == null) {
                        return;
                    }
                    if (dt) {
                        if (!moneyUni.pay(player, price)) {
                            player.tell(i18n.$t("enclose.payment.error"));
                            return;
                        }
                        encloseMain(pl, posInterface, orgNum);
                    } else {
                        if (!orgAPI.orgAddMoney(orgNum, -price)) {
                            player.tell(i18n.$t("enclose.payment.error"));
                            return;
                        }
                        encloseMain(pl, posInterface, orgNum);
                    }
                }
            );
        }
    }
}
function encloseMain(player, posInterface, orgNum = null) {
    // 重新检查一遍冲突
    let conflictLandId;
    // 团队领地冲突检查：
    if (enableOrg) {
        conflictLandId = getOLandConflict(
            posInterface,
            playerState[player.xuid].enclosure.dim,
            playerState[player.xuid].enclosure.type2D,
            [],
            player,
            !!orgNum
        );
        if (conflictLandId) {
            // 发现冲突
            let fm = mc
                .newSimpleForm()
                .setTitle(i18n.$t("enclose.conflict.title"))
                .setContent(i18n.$t("enclose.conflict.org", [conflictLandId]));
            player.sendForm(fm, () => {});
            return;
        }
    }
    // 私人领地冲突检查
    conflictLandId = getPLandConflict(
        posInterface,
        playerState[player.xuid].enclosure.dim,
        playerState[player.xuid].enclosure.type2D
    );
    if (conflictLandId) {
        // 发现冲突
        let fm = mc
            .newSimpleForm()
            .setTitle(i18n.$t("enclose.conflict.title"))
            .setContent(i18n.$t("enclose.conflict.pri", [conflictLandId]));
        player.sendForm(fm, () => {});
        return;
    }
    let uuid = system.randomGuid();
    // 检查完毕，开始圈地
    if (orgNum) {
        OlandDataInterface.data[uuid] = {
            range: {
                type2D: playerState[player.xuid].enclosure.type2D,
                min_position: [
                    posInterface.minX,
                    posInterface.minY,
                    posInterface.minZ,
                ],
                dimid: playerState[player.xuid].enclosure.dim,
                max_position: [
                    posInterface.maxX,
                    posInterface.maxY,
                    posInterface.maxZ,
                ],
            },
            settings: {
                notifyItemBar: true,
                notifytoPlayer: true,
                notifytoOwner: true,
                drawCube: true,
                describe: "",
                owner: orgNum,
                name: i18n.$t("default.landName", [player.realName]),
            },
            teleport: [],
            events: {
                pistonPush: false,
                fireSpread: false,
                explode: false,
                redstoneUpdate: false,
                farmlandDecay: false,
                liquidFlow: true,
                blockChange: true,
            },
            permissions: {
                organization: {
                    allowOtherEnclose: false, // 允许任何人圈地
                    allowMemberEnclose: false, // 允许团队里的人圈地
                    trustMembers: true, // 信任团队成员。（否则只能圈地）
                },
                blocks: {
                    blockPlace: false, // 允许放置方块
                    itemPickUp: false, // 允许捡东西
                    blockDestory: false, // 允许破解方块
                    itemDrop: true, // 允许丢弃物品
                    openDoor: false,
                    useFenceGate: false,
                    useTrapdoor: false,
                },
                entity: {
                    allowRideEntity: false,
                    allowEntityDestroy: false,
                    allowUseBoat: true,
                    allowUseMinecart: true,
                    allowShoot: false,
                    allowAttackEntity: false,
                    allowAnimalSpawn: true,
                    allowMobSpawn: false,
                    allowNeutralSpawn: true,
                },
                container: {
                    openShulkerBox: false,
                    useFrameBlock: false, // 使用展示框
                    openChest: false,
                    openBarrel: false,
                    openHopper: false,
                },
                redStone: {
                    pressButton: false,
                    useLever: false,
                    usePressurePlate: false,
                    useDispenser: false, // 允许发射器
                    useDropper: false, // 允许投掷器
                    useDaylightDetector: false,
                    changeComparator: false,
                    changeRepeater: false,
                    HopperChange: false, // 漏斗
                    pistonPush: false,
                },
                tools: {
                    useBell: false,
                    useLoom: false,
                    useJukebox: false,
                    useBeacon: false,
                    useCraftingTable: false,
                    useCartographyTable: false,
                    useAnvil: false,
                    useBucket: false,
                    useBed: false,
                    useBlastFurnace: false,
                    useComposter: false,
                    useFurnace: false,
                    useGrindstone: false,
                    useRespawnAnchor: false,
                    useSmithingTable: false,
                    useNoteBlock: false,
                    useArmorStand: false,
                    useLectern: false, // 讲台
                    useCampfire: false,
                    useSmoker: false, // 烟熏炉
                    useBrewingStand: false, // 酿造台
                    useEnchantingTable: false, // 附魔台
                    useFlint: false,
                    useCauldron: false,
                    useStonecutter: false,
                },
                player: {
                    eat: false,
                    fishing: false,
                    allowThrowPotion: false,
                    allowUseBoat: true,
                    allowUseMinecart: true,
                    allowShoot: false,
                    allowAttackAnimal: false,
                    allowAttackNeutral: false,
                    allowAttackPlayer: false,
                    allowAttackMobs: true,
                },
            },
        };
        ChunkInterface.linkOrg(uuid);
        belongToApi.orgAddLand(orgNum, uuid);
        belongToApi.save();
        OlandDataInterface.save();
        if (configAPI.data.common.enableCache) {
            ChunkInterface.save();
            cache.clean();
        }
    } else {
        pLandDataInterface.data[uuid] = {
            range: {
                type2D: playerState[player.xuid].enclosure.type2D,
                min_position: [
                    posInterface.minX,
                    posInterface.minY,
                    posInterface.minZ,
                ],
                dimid: playerState[player.xuid].enclosure.dim,
                max_position: [
                    posInterface.maxX,
                    posInterface.maxY,
                    posInterface.maxZ,
                ],
            },
            settings: {
                notifyItemBar: true,
                notifytoPlayer: true,
                notifytoOwner: true,
                drawCube: true,
                describe: "",
                owner: player.xuid,
                name: i18n.$t("default.landName", [player.realName]),
            },
            share: [],
            teleport: [],
            events: {
                pistonPush: false,
                fireSpread: false,
                explode: false,
                redstoneUpdate: false,
                farmlandDecay: false,
                liquidFlow: true,
                blockChange: true,
            },
            permissions: {
                blocks: {
                    blockPlace: false, // 允许放置方块
                    itemPickUp: false, // 允许捡东西
                    blockDestory: false, // 允许破解方块
                    itemDrop: true, // 允许丢弃物品
                    openDoor: false,
                    useFenceGate: false,
                    useTrapdoor: false,
                },
                entity: {
                    allowRideEntity: false,
                    allowEntityDestroy: false,
                    allowUseBoat: true,
                    allowUseMinecart: true,
                    allowShoot: false,
                    allowAttackEntity: false,
                    allowAnimalSpawn: true,
                    allowMobSpawn: false,
                    allowNeutralSpawn: true,
                },
                container: {
                    openShulkerBox: false,
                    useFrameBlock: false, // 使用展示框
                    openChest: false,
                    openBarrel: false,
                    openHopper: false,
                },
                redStone: {
                    pressButton: false,
                    useLever: false,
                    usePressurePlate: false,
                    useDispenser: false, // 允许发射器
                    useDropper: false, // 允许投掷器
                    useDaylightDetector: false,
                    changeComparator: false,
                    changeRepeater: false,
                    HopperChange: false, // 漏斗
                    pistonPush: false,
                },
                tools: {
                    useBell: false,
                    useLoom: false,
                    useJukebox: false,
                    useBeacon: false,
                    useCraftingTable: false,
                    useCartographyTable: false,
                    useAnvil: false,
                    useBucket: false,
                    useBed: false,
                    useBlastFurnace: false,
                    useComposter: false,
                    useFurnace: false,
                    useGrindstone: false,
                    useRespawnAnchor: false,
                    useSmithingTable: false,
                    useNoteBlock: false,
                    useArmorStand: false,
                    useLectern: false, // 讲台
                    useCampfire: false,
                    useSmoker: false, // 烟熏炉
                    useBrewingStand: false, // 酿造台
                    useEnchantingTable: false, // 附魔台
                    useFlint: false,
                    useCauldron: false,
                    useStonecutter: false,
                },
                player: {
                    eat: false,
                    fishing: false,
                    allowThrowPotion: false,
                    allowUseBoat: true,
                    allowUseMinecart: true,
                    allowShoot: false,
                    allowAttackAnimal: false,
                    allowAttackNeutral: false,
                    allowAttackPlayer: false,
                    allowAttackMobs: true,
                },
            },
        };
        ChunkInterface.linkPrivate(uuid);
        belongToApi.playerAddLand(player.xuid, uuid);
        belongToApi.save();
        pLandDataInterface.save();
        if (configAPI.data.common.enableCache) {
            ChunkInterface.save();
            cache.clean();
        }
    }
    playerState[player.xuid].state = "playing";
    let fm = mc
        .newSimpleForm()
        .setTitle(i18n.$t("enclose.payment.title"))
        .setContent(i18n.$t("enclose.payment.success"));
    player.sendForm(fm, () => {});
} // 定义命令
mc.listen("onServerStarted", function () {
    // 圈地指令方法
    let landComm = mc.newCommand(
        "land",
        i18n.$t("command.description"),
        PermType.Any,
        0x80
    );
    landComm.setEnum("encloseEnterance", ["enclose"]);
    landComm.setEnum("encloseAction", [
        "setpos1",
        "setpos2",
        "confirm",
        "cancel",
        "show",
        "edit",
    ]);
    landComm.setEnum("singleAction", ["this", "dashboard", "buy"]);
    landComm.mandatory("action", ParamType.Enum, "encloseEnterance", 1);
    landComm.mandatory("enclose", ParamType.Enum, "encloseAction", 1);
    landComm.mandatory("action", ParamType.Enum, "singleAction", 1);
    landComm.overload(["encloseEnterance", "encloseAction"]);
    landComm.overload(["singleAction"]);
    if (configAPI.data.common.allowLandTeleport) {
        landComm.setEnum("tpEnterance", ["tp"]);
        landComm.setEnum("tpAction", ["gui", "set", "clear"]);
        landComm.mandatory("action", ParamType.Enum, "tpEnterance", 1);
        landComm.optional("tpaction", ParamType.Enum, "tpAction", 1);
        landComm.overload(["tpEnterance", "tpAction"]);
    }
    landComm.setCallback((_cmd, _ori, out, res) => {
        if (!_ori.player) {
            outp.error(i18n.$t("command.notplayer"));
        }
        switch (res.action) {
            case "enclose":
                CommandEncloseHander(_ori.player, res.enclose);
                break;
            case "this":
                CommandThisHander(_ori.player);
                break;
            case "tp":
                CommandTeleportHander(_ori.player, res.tpaction);
                break;
            case "buy":
                landResell(_ori.player);
                break;
            case "dashboard":
                DashBoardInit(_ori.player);
                break;
            default:
                break;
        }
    });
    landComm.setup();
});

// 对玩家执行this指令进行处理
function CommandThisHander(player) {
    let pos = player.blockPos;
    let pLandId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    let oLandId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    let permisstion = [0, 0];
    if (configAPI.data.operator.includes(player.xuid)) {
        //管理员，如果存在都允许
        permisstion = [!!pLandId, !!oLandId];
    }
    if (
        pLandId &&
        pLandDataInterface.data[pLandId].settings.owner === player.xuid
    ) {
        permisstion[0] = true;
    }
    if (
        oLandId &&
        OlandDataInterface.data[oLandId].settings.owner ===
            orgAPI.getOrgNum(player.xuid) &&
        orgAPI.isOwner(player.xuid)
    ) {
        permisstion[1] = true;
    }
    if (permisstion[0] && permisstion[1]) {
        //俩都允许，弹出窗口任选
        player.sendModalForm(
            i18n.$t("this.manage.choose.title"),
            i18n.$t("this.manage.choose.desp"),
            i18n.$t("this.manage.choose.org"),
            i18n.$t("this.manage.choose.pri"),
            (pl, dt) => {
                if (dt == null) {
                    return;
                }
                if (dt) {
                    ManageLand(player, oLandId, true);
                } else {
                    ManageLand(player, pLandId, false);
                }
            }
        );
    } else if (permisstion[0]) {
        ManageLand(player, pLandId, false);
    } else if (permisstion[1]) {
        ManageLand(player, oLandId, true);
    } else {
        //此处无垠三百两，告知
        player.tell(i18n.$t("this.manage.noland"));
    }
}

/**
 * 领地管理主入口
 * @param {player} player
 * @param {string} landId
 * @param {boolean} isOrg
 */
function ManageLand(player, landId, isOrg = false) {
    let fm = mc.newSimpleForm();
    fm.setTitle(i18n.$t("manage.main.title"));
    fm.addButton(i18n.$t("manage.main.info"), "textures/items/book_enchanted");
    fm.addButton(
        i18n.$t("manage.main.identification"),
        "textures/items/name_tag"
    );
    fm.addButton(i18n.$t("manage.main.events"), "textures/items/hopper");
    if (configAPI.data.common.allowLandTeleport)
        fm.addButton(
            i18n.$t("manage.main.teleport"),
            "textures/items/ender_eye"
        );
    fm.addButton(
        i18n.$t("manage.main.permission"),
        "textures/items/diamond_sword"
    );
    fm.addButton(i18n.$t("manage.main.recycle"), "textures/items/totem");
    fm.addButton(i18n.$t("manage.main.reenclose"), "textures/items/map_empty");
    if (!isOrg) {
        //社区领地无法转让、分享与出售
        fm.addButton(
            i18n.$t("manage.main.resell"),
            "textures/items/villagebell"
        );
        fm.addButton(i18n.$t("manage.main.share"), "textures/items/apple");
        fm.addButton(
            i18n.$t("manage.main.changeOwner"),
            "textures/items/armor_stand"
        );
    }
    player.sendForm(fm, (pl, dt) => {
        if (dt == null) {
            return;
        }
        if (dt > 2 && !configAPI.data.common.allowLandTeleport) dt++;
        switch (dt) {
            case 0:
                LandInfo(pl, landId, isOrg);
                break;
            case 1:
                LandIdentification(pl, landId, isOrg);
                break;
            case 2:
                LandEventsManage(pl, landId, isOrg);
                break;
            case 3:
                LandTeleportManage(pl, landId, isOrg);
                break;
            case 4:
                PermissionManageEntry(pl, landId, isOrg);
                break;
            case 5:
                recycleLand(pl, landId, isOrg);
                break;
            case 6:
                reEnclosingHander(pl, landId, isOrg);
                break;
            case 7:
                landResellManager(pl, landId, isOrg);
                //出售领地
                break;
            case 8:
                //共享给其他玩家
                sharedManageHander(pl, landId, isOrg);
                break;
            case 9:
                //领地转让
                changeOwnerHander(pl, landId, isOrg);
                break;
            default:
                break;
        }
    });
}
/**
 * 领地信息查看
 * @param {player} player
 * @param {string} landId
 * @param {boolean} isOrg
 */
function LandInfo(player, landId, isOrg = false) {
    let landData;
    if (isOrg) {
        landData = OlandDataInterface.data[landId];
    } else {
        landData = pLandDataInterface.data[landId];
    }
    let fm = mc.newSimpleForm();
    fm.setTitle(i18n.$t("manage.info.title"));
    fm.setContent(
        i18n.$t("manage.info.desp", [
            landId,
            String(landData.range.min_position),
            String(landData.range.max_position),
            landData.range.dimid,
            isOrg
                ? i18n.$t("this.manage.choose.org")
                : i18n.$t("this.manage.choose.pri"),
            isOrg
                ? orgAPI.getOrgName(landData.settings.owner) ||
                  i18n.$t("manage.info.noOrg")
                : data.xuid2name(landData.settings.owner),
            landData.settings.describe || i18n.$t("manage.info.noDesp"),
            landData.range.type2D
                ? i18n.$t("common.YES")
                : i18n.$t("common.NO"),
            landData.teleport.length === 0
                ? i18n.$t("manage.info.noDesp")
                : String(landData.teleport),
        ])
    );
    player.sendForm(fm, (pl, dt) => {
        if (dt == null) {
            ManageLand(pl, landId, isOrg);
            return;
        }
    });
}
/**
 * 领地标识设置
 * @param {player} player
 * @param {string} landId
 * @param {boolean} isOrg
 */
function LandIdentification(player, landId, isOrg = false) {
    let landData;
    if (isOrg) {
        landData = OlandDataInterface.data[landId];
    } else {
        landData = pLandDataInterface.data[landId];
    }
    let fm = mc.newCustomForm();
    fm.setTitle(i18n.$t("manage.idf.title"));
    fm.addInput(i18n.$t("manage.idf.name"), "...", landData.settings.name);
    fm.addInput(
        i18n.$t("manage.idf.describe"),
        "...",
        landData.settings.describe
    );
    fm.addSwitch(
        i18n.$t("manage.idf.notifyItemBar"),
        !!landData.settings.notifyItemBar
    );
    fm.addSwitch(
        i18n.$t("manage.idf.notifytoPlayer"),
        !!landData.settings.notifytoPlayer
    );
    fm.addSwitch(
        i18n.$t("manage.idf.notifytoOwner"),
        !!landData.settings.notifytoOwner
    );
    fm.addSwitch(i18n.$t("manage.idf.drawCube"), !!landData.settings.drawCube);
    player.sendForm(fm, (pl, dt) => {
        if (dt == null) {
            ManageLand(pl, landId, isOrg);
            return;
        }
        if (dt[0] === "") {
            let fm = mc
                .newSimpleForm()
                .setTitle(i18n.$t("manage.idf.title"))
                .setContent(i18n.$t("manage.idf.NamenoEmpty"));
            player.sendForm(fm, (pl, dt) => {
                LandIdentification(pl, landId, isOrg);
            });
            return;
        }
        //修改信息
        landData.settings.name = dt[0];
        landData.settings.describe = dt[1];
        landData.settings.notifyItemBar = !!dt[2];
        landData.settings.notifytoPlayer = !!dt[3];
        landData.settings.notifytoOwner = !!dt[4];
        landData.settings.drawCube = !!dt[5];
        if (isOrg) {
            OlandDataInterface.data[landId].settings = landData.settings;
            OlandDataInterface.save();
        } else {
            pLandDataInterface.data[landId].settings = landData.settings;
            pLandDataInterface.save();
        }
        let fm = mc
            .newSimpleForm()
            .setTitle(i18n.$t("manage.idf.title"))
            .setContent(i18n.$t("manage.idf.success"));
        player.sendForm(fm, (pl, dt) => {
            ManageLand(pl, landId, isOrg);
        });
    });
}

/**
 * 领地事件允许设置
 * @param {player} player
 * @param {string} landId
 * @param {boolean} isOrg
 */
function LandEventsManage(player, landId, isOrg = false) {
    /**
     * @type {landData}
     */
    let landData;
    if (isOrg) {
        landData = OlandDataInterface.data[landId];
    } else {
        landData = pLandDataInterface.data[landId];
    }
    let fm = mc.newCustomForm();
    fm.setTitle(i18n.$t("manage.event.title"));
    fm.addSwitch(
        i18n.$t("manage.event.pistonPush"),
        !!landData.events.pistonPush
    );
    fm.addSwitch(
        i18n.$t("manage.event.fireSpread"),
        !!landData.events.fireSpread
    );
    fm.addSwitch(i18n.$t("manage.event.explode"), !!landData.events.explode);
    fm.addSwitch(
        i18n.$t("manage.event.redstoneUpdate"),
        !!landData.events.redstoneUpdate
    );
    fm.addSwitch(
        i18n.$t("manage.event.farmlandDecay"),
        !!landData.events.farmlandDecay
    );
    fm.addSwitch(
        i18n.$t("manage.event.liquidFlow"),
        !!landData.events.liquidFlow
    );
    fm.addSwitch(
        i18n.$t("manage.event.blockChange"),
        !!landData.events.blockChange
    );
    player.sendForm(fm, (pl, dt) => {
        if (dt == null) {
            ManageLand(pl, landId, isOrg);
            return;
        }
        landData.events.pistonPush = !!dt[0];
        landData.events.fireSpread = !!dt[1];
        landData.events.explode = !!dt[2];
        landData.events.redstoneUpdate = !!dt[3];
        landData.events.farmlandDecay = !!dt[4];
        landData.events.liquidFlow = !!dt[5];
        landData.events.blockChange = !!dt[6];
        if (isOrg) {
            OlandDataInterface.data[landId].events = landData.events;
            OlandDataInterface.save();
        } else {
            pLandDataInterface.data[landId].events = landData.events;
            pLandDataInterface.save();
        }
        let fm = mc
            .newSimpleForm()
            .setTitle(i18n.$t("manage.event.title"))
            .setContent(i18n.$t("manage.idf.success"));
        player.sendForm(fm, (pl, dt) => {
            ManageLand(pl, landId, isOrg);
        });
    });
}
/**
 * 领地传送管理
 * @param {player} player
 * @param {string} landId
 * @param {boolean} isOrg
 */
function LandTeleportManage(player, landId, isOrg = false) {
    /**
     * @type {landData}
     */
    let landData;
    if (isOrg) {
        landData = OlandDataInterface.data[landId];
    } else {
        landData = pLandDataInterface.data[landId];
    }
    let fm = mc.newSimpleForm();
    let enable =
        configAPI.data.operator.includes(player.xuid) ||
        configAPI.data.common.allowLandTeleport;
    fm.setTitle(i18n.$t("manage.teleport.title"));
    fm.setContent(
        enable
            ? i18n.$t("manage.teleport.desp", [String(landData.teleport)])
            : i18n.$t("manage.teleport.noEnable")
    );
    if (enable && landData.teleport.length === 0) {
        //允许设置
        fm.addButton(
            i18n.$t("manage.teleport.set"),
            "textures/items/chorus_fruit"
        );
    } else if (enable) {
        fm.addButton(
            i18n.$t("manage.teleport.clear"),
            "textures/items/chorus_fruit"
        );
    }
    player.sendForm(fm, (pl, dt) => {
        if (dt == null) {
            ManageLand(pl, landId, isOrg);
            return;
        }
        if (dt === 0) {
            if (landData.teleport.length !== 0) {
                //清除teleport
                if (isOrg) {
                    OlandDataInterface.data[landId].teleport = [];
                    OlandDataInterface.save();
                } else {
                    pLandDataInterface.data[landId].teleport = [];
                    pLandDataInterface.save();
                }
                let fm = mc
                    .newSimpleForm()
                    .setTitle(i18n.$t("manage.teleport.title"))
                    .setContent(i18n.$t("manage.teleport.clearSuccess"));
                player.sendForm(fm, (pl, dt) => {
                    LandTeleportManage(pl, landId, isOrg);
                });
                return;
            } else {
                let pos = player.blockPos;
                if (
                    (isOrg &&
                        !OlandDataInterface.isPosInLand(
                            pos.x,
                            pos.y,
                            pos.z,
                            pos.dimid,
                            landId
                        )) ||
                    (!isOrg &&
                        !pLandDataInterface.isPosInLand(
                            pos.x,
                            pos.y,
                            pos.z,
                            pos.dimid,
                            landId
                        ))
                ) {
                    //不在地里
                    let fm = mc
                        .newSimpleForm()
                        .setTitle(i18n.$t("manage.teleport.title"))
                        .setContent(i18n.$t("manage.teleport.clearSuccess"));
                    player.sendForm(fm, (pl, dt) => {
                        LandTeleportManage(pl, landId, isOrg);
                    });
                    return;
                }
                if (isOrg) {
                    OlandDataInterface.data[landId].teleport = [
                        pos.x,
                        pos.y,
                        pos.z,
                    ];
                    OlandDataInterface.save();
                } else {
                    pLandDataInterface.data[landId].teleport = [
                        pos.x,
                        pos.y,
                        pos.z,
                    ];
                    pLandDataInterface.save();
                }
                let fm = mc
                    .newSimpleForm()
                    .setTitle(i18n.$t("manage.teleport.title"))
                    .setContent(i18n.$t("manage.idf.success"));
                player.sendForm(fm, (pl, dt) => {
                    LandTeleportManage(pl, landId, isOrg);
                });
                return;
            }
        }
    });
}

/**
 * 领地权限管理入口
 * @param {player} player
 * @param {string} landId
 * @param {boolean} isOrg
 */
function PermissionManageEntry(player, landId, isOrg = false) {
    /**
     * @type {landData}
     */
    let landData;
    if (isOrg) {
        landData = OlandDataInterface.data[landId];
    } else {
        landData = pLandDataInterface.data[landId];
    }
    let fm = mc.newSimpleForm();
    fm.setTitle(i18n.$t("manage.permission.main.title"));
    fm.addButton(
        i18n.$t("manage.permission.main.blocks"),
        "textures/ui/icon_recipe_nature"
    );
    fm.addButton(
        i18n.$t("manage.permission.main.entity"),
        "textures/ui/icon_deals"
    );
    fm.addButton(
        i18n.$t("manage.permission.main.container"),
        "textures/ui/inventory_icon"
    );
    fm.addButton(
        i18n.$t("manage.permission.main.redStone"),
        "textures/items/redstone_dust"
    );
    fm.addButton(
        i18n.$t("manage.permission.main.tools"),
        "textures/ui/icon_recipe_equipment"
    );
    fm.addButton(
        i18n.$t("manage.permission.main.player"),
        "textures/ui/icon_armor"
    );
    isOrg &&
        fm.addButton(
            i18n.$t("manage.permission.main.organization"),
            "textures/ui/lan_icon"
        );
    player.sendForm(fm, (pl, dt) => {
        if (dt == null) {
            ManageLand(pl, landId, isOrg);
            return;
        }
        switch (dt) {
            case 0:
                BlockPermissionManage(pl, landId, isOrg);
                break;
            case 1:
                EntityPermissionManage(pl, landId, isOrg);
                break;
            case 2:
                ContainerPermissionManage(pl, landId, isOrg);
                break;
            case 3:
                RedstonePermissionManage(pl, landId, isOrg);
                break;
            case 4:
                ToolsPermissionManage(pl, landId, isOrg);
                break;
            case 5:
                PlayerPermissionManage(pl, landId, isOrg);
                break;
            case 6:
                OrgPermissionManage(pl, landId, isOrg);
                break;
            default:
                break;
        }
    });
}
/**
 * 领地方块管理入口
 * @param {player} player
 * @param {string} landId
 * @param {boolean} isOrg
 */
function BlockPermissionManage(player, landId, isOrg = false) {
    /**
     * @type {landData}
     */
    let landData;
    if (isOrg) {
        landData = OlandDataInterface.data[landId];
    } else {
        landData = pLandDataInterface.data[landId];
    }
    let fm = mc.newCustomForm();
    fm.setTitle(i18n.$t("manage.permission.blocks.title"));
    fm.addSwitch(
        i18n.$t("manage.permission.blocks.blockPlace"),
        !!landData.permissions.blocks.blockPlace
    );
    fm.addSwitch(
        i18n.$t("manage.permission.blocks.blockDestory"),
        !!landData.permissions.blocks.blockDestory
    );
    fm.addSwitch(
        i18n.$t("manage.permission.blocks.itemDrop"),
        !!landData.permissions.blocks.itemDrop
    );
    fm.addSwitch(
        i18n.$t("manage.permission.blocks.itemPickUp"),
        !!landData.permissions.blocks.itemPickUp
    );
    fm.addSwitch(
        i18n.$t("manage.permission.blocks.openDoor"),
        !!landData.permissions.blocks.openDoor
    );
    fm.addSwitch(
        i18n.$t("manage.permission.blocks.useFenceGate"),
        !!landData.permissions.blocks.useFenceGate
    );
    fm.addSwitch(
        i18n.$t("manage.permission.blocks.useTrapdoor"),
        !!landData.permissions.blocks.useTrapdoor
    );
    player.sendForm(fm, (pl, dt) => {
        if (dt == null) {
            PermissionManageEntry(pl, landId, isOrg);
            return;
        }
        landData.permissions.blocks.blockPlace = dt[0];
        landData.permissions.blocks.blockDestory = dt[1];
        landData.permissions.blocks.itemDrop = dt[2];
        landData.permissions.blocks.itemPickUp = dt[3];
        landData.permissions.blocks.openDoor = dt[4];
        landData.permissions.blocks.useFenceGate = dt[5];
        landData.permissions.blocks.useTrapdoor = dt[6];
        if (isOrg) {
            OlandDataInterface.data[landId].permissions = landData.permissions;
            OlandDataInterface.save();
        } else {
            pLandDataInterface.data[landId].permissions = landData.permissions;
            pLandDataInterface.save();
        }
        let fm = mc
            .newSimpleForm()
            .setTitle(i18n.$t("manage.permission.blocks.title"))
            .setContent(i18n.$t("manage.idf.success"));
        player.sendForm(fm, (pl, dt) => {
            PermissionManageEntry(pl, landId, isOrg);
        });
    });
}

/**
 * 领地实体管理入口
 * @param {player} player
 * @param {string} landId
 * @param {boolean} isOrg
 */
function EntityPermissionManage(player, landId, isOrg = false) {
    /**
     * @type {landData}
     */
    let landData;
    if (isOrg) {
        landData = OlandDataInterface.data[landId];
    } else {
        landData = pLandDataInterface.data[landId];
    }
    let fm = mc.newCustomForm();
    fm.setTitle(i18n.$t("manage.permission.entity.title"));
    fm.addSwitch(
        i18n.$t("manage.permission.entity.allowRideEntity"),
        !!landData.permissions.entity.allowRideEntity
    );
    fm.addSwitch(
        i18n.$t("manage.permission.entity.allowUseBoat"),
        !!landData.permissions.entity.allowUseBoat
    );
    fm.addSwitch(
        i18n.$t("manage.permission.entity.allowUseMinecart"),
        !!landData.permissions.entity.allowUseMinecart
    );
    fm.addSwitch(
        i18n.$t("manage.permission.entity.allowShoot"),
        !!landData.permissions.entity.allowShoot
    );
    fm.addSwitch(
        i18n.$t("manage.permission.entity.allowAttackEntity"),
        !!landData.permissions.entity.allowAttackEntity
    );
    fm.addSwitch(
        i18n.$t("manage.permission.entity.allowMobSpawn"),
        !!landData.permissions.entity.allowMobSpawn
    );
    fm.addSwitch(
        i18n.$t("manage.permission.entity.allowNeutralSpawn"),
        !!landData.permissions.entity.allowNeutralSpawn
    );
    fm.addSwitch(
        i18n.$t("manage.permission.entity.allowAnimalSpawn"),
        !!landData.permissions.entity.allowAnimalSpawn
    );
    player.sendForm(fm, (pl, dt) => {
        if (dt == null) {
            PermissionManageEntry(pl, landId, isOrg);
            return;
        }
        landData.permissions.entity.allowRideEntity = dt[0];
        landData.permissions.entity.allowUseBoat = dt[1];
        landData.permissions.entity.allowUseMinecart = dt[2];
        landData.permissions.entity.allowShoot = dt[3];
        landData.permissions.entity.allowAttackEntity = dt[4];
        landData.permissions.entity.allowMobSpawn = dt[5];
        landData.permissions.entity.allowNeutralSpawn = dt[6];
        landData.permissions.entity.allowAnimalSpawn = dt[7];
        if (isOrg) {
            OlandDataInterface.data[landId].permissions = landData.permissions;
            OlandDataInterface.save();
        } else {
            pLandDataInterface.data[landId].permissions = landData.permissions;
            pLandDataInterface.save();
        }
        let fm = mc
            .newSimpleForm()
            .setTitle(i18n.$t("manage.permission.blocks.title"))
            .setContent(i18n.$t("manage.idf.success"));
        player.sendForm(fm, (pl, dt) => {
            PermissionManageEntry(pl, landId, isOrg);
        });
    });
}

/**
 * 领地实体管理入口
 * @param {player} player
 * @param {string} landId
 * @param {boolean} isOrg
 */
function ContainerPermissionManage(player, landId, isOrg = false) {
    /**
     * @type {landData}
     */
    let landData;
    if (isOrg) {
        landData = OlandDataInterface.data[landId];
    } else {
        landData = pLandDataInterface.data[landId];
    }
    let fm = mc.newCustomForm();
    fm.setTitle(i18n.$t("manage.permission.container.title"));
    fm.addSwitch(
        i18n.$t("manage.permission.container.useFrameBlock"),
        !!landData.permissions.container.useFrameBlock
    );
    fm.addSwitch(
        i18n.$t("manage.permission.container.openShulkerBox"),
        !!landData.permissions.container.openShulkerBox
    );
    fm.addSwitch(
        i18n.$t("manage.permission.container.openChest"),
        !!landData.permissions.container.openChest
    );
    fm.addSwitch(
        i18n.$t("manage.permission.container.openBarrel"),
        !!landData.permissions.container.openBarrel
    );
    fm.addSwitch(
        i18n.$t("manage.permission.container.openHopper"),
        !!landData.permissions.container.openHopper
    );
    player.sendForm(fm, (pl, dt) => {
        if (dt == null) {
            PermissionManageEntry(pl, landId, isOrg);
            return;
        }
        landData.permissions.container.useFrameBlock = dt[0];
        landData.permissions.container.openShulkerBox = dt[1];
        landData.permissions.container.openChest = dt[2];
        landData.permissions.container.openBarrel = dt[3];
        landData.permissions.container.openHopper = dt[4];
        if (isOrg) {
            OlandDataInterface.data[landId].permissions = landData.permissions;
            OlandDataInterface.save();
        } else {
            pLandDataInterface.data[landId].permissions = landData.permissions;
            pLandDataInterface.save();
        }
        let fm = mc
            .newSimpleForm()
            .setTitle(i18n.$t("manage.permission.container.title"))
            .setContent(i18n.$t("manage.idf.success"));
        player.sendForm(fm, (pl, dt) => {
            PermissionManageEntry(pl, landId, isOrg);
        });
    });
}

/**
 * 领地红石管理入口
 * @param {player} player
 * @param {string} landId
 * @param {boolean} isOrg
 */
function RedstonePermissionManage(player, landId, isOrg = false) {
    /**
     * @type {landData}
     */
    let landData;
    if (isOrg) {
        landData = OlandDataInterface.data[landId];
    } else {
        landData = pLandDataInterface.data[landId];
    }
    let fm = mc.newCustomForm();
    fm.setTitle(i18n.$t("manage.permission.redStone.title"));
    fm.addSwitch(
        i18n.$t("manage.permission.redStone.pressButton"),
        !!landData.permissions.redStone.pressButton
    );
    fm.addSwitch(
        i18n.$t("manage.permission.redStone.useLever"),
        !!landData.permissions.redStone.useLever
    );
    fm.addSwitch(
        i18n.$t("manage.permission.redStone.useDispenser"),
        !!landData.permissions.redStone.useDispenser
    );
    fm.addSwitch(
        i18n.$t("manage.permission.redStone.useDropper"),
        !!landData.permissions.redStone.useDropper
    );
    fm.addSwitch(
        i18n.$t("manage.permission.redStone.usePressurePlate"),
        !!landData.permissions.redStone.usePressurePlate
    );
    fm.addSwitch(
        i18n.$t("manage.permission.redStone.useDaylightDetector"),
        !!landData.permissions.redStone.useDaylightDetector
    );
    fm.addSwitch(
        i18n.$t("manage.permission.redStone.changeComparator"),
        !!landData.permissions.redStone.changeComparator
    );
    fm.addSwitch(
        i18n.$t("manage.permission.redStone.changeRepeater"),
        !!landData.permissions.redStone.changeRepeater
    );
    fm.addSwitch(
        i18n.$t("manage.permission.redStone.HopperChange"),
        !!landData.permissions.redStone.HopperChange
    );
    fm.addSwitch(
        i18n.$t("manage.permission.redStone.pistonPush"),
        !!landData.permissions.redStone.pistonPush
    );
    player.sendForm(fm, (pl, dt) => {
        if (dt == null) {
            PermissionManageEntry(pl, landId, isOrg);
            return;
        }
        landData.permissions.redStone.pressButton = dt[0];
        landData.permissions.redStone.useLever = dt[1];
        landData.permissions.redStone.useDispenser = dt[2];
        landData.permissions.redStone.useDropper = dt[3];
        landData.permissions.redStone.usePressurePlate = dt[4];
        landData.permissions.redStone.useDaylightDetector = dt[5];
        landData.permissions.redStone.changeComparator = dt[6];
        landData.permissions.redStone.changeRepeater = dt[7];
        landData.permissions.redStone.HopperChange = dt[8];
        landData.permissions.redStone.pistonPush = dt[9];
        if (isOrg) {
            OlandDataInterface.data[landId].permissions = landData.permissions;
            OlandDataInterface.save();
        } else {
            pLandDataInterface.data[landId].permissions = landData.permissions;
            pLandDataInterface.save();
        }
        let fm = mc
            .newSimpleForm()
            .setTitle(i18n.$t("manage.permission.redStone.title"))
            .setContent(i18n.$t("manage.idf.success"));
        player.sendForm(fm, (pl, dt) => {
            PermissionManageEntry(pl, landId, isOrg);
        });
    });
}

/**
 * 领地攻击管理入口
 * @param {player} player
 * @param {string} landId
 * @param {boolean} isOrg
 */
function ToolsPermissionManage(player, landId, isOrg = false) {
    /**
     * @type {landData}
     */
    let landData;
    if (isOrg) {
        landData = OlandDataInterface.data[landId];
    } else {
        landData = pLandDataInterface.data[landId];
    }
    let fm = mc.newCustomForm();
    fm.setTitle(i18n.$t("manage.permission.tools.title"));
    fm.addSwitch(
        i18n.$t("manage.permission.tools.useBell"),
        !!landData.permissions.tools.useBell
    );
    fm.addSwitch(
        i18n.$t("manage.permission.tools.useLoom"),
        !!landData.permissions.tools.useLoom
    );
    fm.addSwitch(
        i18n.$t("manage.permission.tools.useJukebox"),
        !!landData.permissions.tools.useJukebox
    );
    fm.addSwitch(
        i18n.$t("manage.permission.tools.useBeacon"),
        !!landData.permissions.tools.useBeacon
    );
    fm.addSwitch(
        i18n.$t("manage.permission.tools.useCraftingTable"),
        !!landData.permissions.tools.useCraftingTable
    );
    fm.addSwitch(
        i18n.$t("manage.permission.tools.useCartographyTable"),
        !!landData.permissions.tools.useCartographyTable
    );
    fm.addSwitch(
        i18n.$t("manage.permission.tools.useAnvil"),
        !!landData.permissions.tools.useAnvil
    );
    fm.addSwitch(
        i18n.$t("manage.permission.tools.useBucket"),
        !!landData.permissions.tools.useBucket
    );
    fm.addSwitch(
        i18n.$t("manage.permission.tools.useBed"),
        !!landData.permissions.tools.useBed
    );
    fm.addSwitch(
        i18n.$t("manage.permission.tools.useBlastFurnace"),
        !!landData.permissions.tools.useBlastFurnace
    );
    fm.addSwitch(
        i18n.$t("manage.permission.tools.useComposter"),
        !!landData.permissions.tools.useComposter
    );
    fm.addSwitch(
        i18n.$t("manage.permission.tools.useFurnace"),
        !!landData.permissions.tools.useFurnace
    );
    fm.addSwitch(
        i18n.$t("manage.permission.tools.useGrindstone"),
        !!landData.permissions.tools.useGrindstone
    );
    fm.addSwitch(
        i18n.$t("manage.permission.tools.useRespawnAnchor"),
        !!landData.permissions.tools.useRespawnAnchor
    );
    fm.addSwitch(
        i18n.$t("manage.permission.tools.useSmithingTable"),
        !!landData.permissions.tools.useSmithingTable
    );
    fm.addSwitch(
        i18n.$t("manage.permission.tools.useNoteBlock"),
        !!landData.permissions.tools.useNoteBlock
    );
    fm.addSwitch(
        i18n.$t("manage.permission.tools.useArmorStand"),
        !!landData.permissions.tools.useArmorStand
    );
    fm.addSwitch(
        i18n.$t("manage.permission.tools.useLectern"),
        !!landData.permissions.tools.useLectern
    );
    fm.addSwitch(
        i18n.$t("manage.permission.tools.useCampfire"),
        !!landData.permissions.tools.useCampfire
    );
    fm.addSwitch(
        i18n.$t("manage.permission.tools.useSmoker"),
        !!landData.permissions.tools.useSmoker
    );
    fm.addSwitch(
        i18n.$t("manage.permission.tools.useBrewingStand"),
        !!landData.permissions.tools.useBrewingStand
    );
    fm.addSwitch(
        i18n.$t("manage.permission.tools.useEnchantingTable"),
        !!landData.permissions.tools.useEnchantingTable
    );
    fm.addSwitch(
        i18n.$t("manage.permission.tools.useFlint"),
        !!landData.permissions.tools.useFlint
    );
    fm.addSwitch(
        i18n.$t("manage.permission.tools.useCauldron"),
        !!landData.permissions.tools.useCauldron
    );
    fm.addSwitch(
        i18n.$t("manage.permission.tools.useStonecutter"),
        !!landData.permissions.tools.useStonecutter
    );

    player.sendForm(fm, (pl, dt) => {
        if (dt == null) {
            PermissionManageEntry(pl, landId, isOrg);
            return;
        }
        landData.permissions.tools.useBell = dt[0];
        landData.permissions.tools.useLoom = dt[1];
        landData.permissions.tools.useJukebox = dt[2];
        landData.permissions.tools.useBeacon = dt[3];
        landData.permissions.tools.useCraftingTable = dt[4];
        landData.permissions.tools.useCartographyTable = dt[5];
        landData.permissions.tools.useAnvil = dt[6];
        landData.permissions.tools.useBucket = dt[7];
        landData.permissions.tools.useBed = dt[8];
        landData.permissions.tools.useBlastFurnace = dt[9];
        landData.permissions.tools.useComposter = dt[10];
        landData.permissions.tools.useFurnace = dt[11];
        landData.permissions.tools.useGrindstone = dt[12];
        landData.permissions.tools.useRespawnAnchor = dt[13];
        landData.permissions.tools.useSmithingTable = dt[14];
        landData.permissions.tools.useNoteBlock = dt[15];
        landData.permissions.tools.useArmorStand = dt[16];
        landData.permissions.tools.useLectern = dt[17];
        landData.permissions.tools.useCampfire = dt[18];
        landData.permissions.tools.useSmoker = dt[19];
        landData.permissions.tools.useBrewingStand = dt[20];
        landData.permissions.tools.useEnchantingTable = dt[21];
        landData.permissions.tools.useFlint = dt[22];
        landData.permissions.tools.useCauldron = dt[23];
        landData.permissions.tools.useStonecutter = dt[24];

        if (isOrg) {
            OlandDataInterface.data[landId].permissions = landData.permissions;
            OlandDataInterface.save();
        } else {
            pLandDataInterface.data[landId].permissions = landData.permissions;
            pLandDataInterface.save();
        }
        let fm = mc
            .newSimpleForm()
            .setTitle(i18n.$t("manage.permission.tools.title"))
            .setContent(i18n.$t("manage.idf.success"));
        player.sendForm(fm, (pl, dt) => {
            PermissionManageEntry(pl, landId, isOrg);
        });
    });
}

/**
 * 领地实体管理入口
 * @param {player} player
 * @param {string} landId
 * @param {boolean} isOrg
 */
function PlayerPermissionManage(player, landId, isOrg = false) {
    /**
     * @type {landData}
     */
    let landData;
    if (isOrg) {
        landData = OlandDataInterface.data[landId];
    } else {
        landData = pLandDataInterface.data[landId];
    }
    let fm = mc.newCustomForm();
    fm.setTitle(i18n.$t("manage.permission.player.title"));
    fm.addSwitch(
        i18n.$t("manage.permission.player.eat"),
        !!landData.permissions.player.eat
    );
    fm.addSwitch(
        i18n.$t("manage.permission.player.fishing"),
        !!landData.permissions.player.fishing
    );
    fm.addSwitch(
        i18n.$t("manage.permission.player.allowThrowPotion"),
        !!landData.permissions.player.allowThrowPotion
    );
    fm.addSwitch(
        i18n.$t("manage.permission.player.allowUseBoat"),
        !!landData.permissions.player.allowUseBoat
    );
    fm.addSwitch(
        i18n.$t("manage.permission.player.allowUseMinecart"),
        !!landData.permissions.player.allowUseMinecart
    );
    fm.addSwitch(
        i18n.$t("manage.permission.player.allowShoot"),
        !!landData.permissions.player.allowShoot
    );
    fm.addSwitch(
        i18n.$t("manage.permission.player.allowAttackAnimal"),
        !!landData.permissions.player.allowAttackAnimal
    );
    fm.addSwitch(
        i18n.$t("manage.permission.player.allowAttackNeutral"),
        !!landData.permissions.player.allowAttackNeutral
    );
    fm.addSwitch(
        i18n.$t("manage.permission.player.allowAttackPlayer"),
        !!landData.permissions.player.allowAttackPlayer
    );
    fm.addSwitch(
        i18n.$t("manage.permission.player.allowAttackMobs"),
        !!landData.permissions.player.allowAttackMobs
    );
    player.sendForm(fm, (pl, dt) => {
        if (dt == null) {
            PermissionManageEntry(pl, landId, isOrg);
            return;
        }
        landData.permissions.player.eat = dt[0];
        landData.permissions.player.fishing = dt[1];
        landData.permissions.player.allowThrowPotion = dt[2];
        landData.permissions.player.allowUseBoat = dt[3];
        landData.permissions.player.allowUseMinecart = dt[4];
        landData.permissions.player.allowShoot = dt[5];
        landData.permissions.player.allowAttackAnimal = dt[6];
        landData.permissions.player.allowAttackNeutral = dt[7];
        landData.permissions.player.allowAttackPlayer = dt[8];
        landData.permissions.player.allowAttackMobs = dt[9];
        if (isOrg) {
            OlandDataInterface.data[landId].permissions = landData.permissions;
            OlandDataInterface.save();
        } else {
            pLandDataInterface.data[landId].permissions = landData.permissions;
            pLandDataInterface.save();
        }
        let fm = mc
            .newSimpleForm()
            .setTitle(i18n.$t("manage.permission.player.title"))
            .setContent(i18n.$t("manage.idf.success"));
        player.sendForm(fm, (pl, dt) => {
            PermissionManageEntry(pl, landId, isOrg);
        });
    });
}

/**
 * 领地实体管理入口
 * @param {player} player
 * @param {string} landId
 * @param {boolean} isOrg
 */
function OrgPermissionManage(player, landId, isOrg = false) {
    /**
     * @type {landData}
     */
    let landData = OlandDataInterface.data[landId];
    let fm = mc.newCustomForm();
    fm.setTitle(i18n.$t("manage.permission.organization.title"));
    fm.addSwitch(
        i18n.$t("manage.permission.organization.allowOtherEnclose"),
        !!landData.permissions.organization.allowOtherEnclose
    );
    fm.addSwitch(
        i18n.$t("manage.permission.organization.allowMemberEnclose"),
        !!landData.permissions.organization.allowMemberEnclose
    );
    fm.addSwitch(
        i18n.$t("manage.permission.organization.trustMembers"),
        !!landData.permissions.organization.trustMembers
    );
    player.sendForm(fm, (pl, dt) => {
        if (dt == null) {
            PermissionManageEntry(pl, landId, isOrg);
            return;
        }
        landData.permissions.organization.allowOtherEnclose = dt[0];
        landData.permissions.organization.allowMemberEnclose = dt[1];
        landData.permissions.organization.trustMembers = dt[2];
        if (isOrg) {
            OlandDataInterface.data[landId].permissions = landData.permissions;
            OlandDataInterface.save();
        } else {
            pLandDataInterface.data[landId].permissions = landData.permissions;
            pLandDataInterface.save();
        }
        let fm = mc
            .newSimpleForm()
            .setTitle(i18n.$t("manage.permission.organization.title"))
            .setContent(i18n.$t("manage.idf.success"));
        player.sendForm(fm, (pl, dt) => {
            PermissionManageEntry(pl, landId, isOrg);
        });
    });
}

mc.listen(
    "onUseItemOn",
    /**
     *
     *
     * @param {player} player
     * @param {block} block
     */
    function (player, item, block, side) {
        if (configAPI.data.operator.includes(player.xuid)) {
            //管理员
            return;
        }
        logger.debug("onUseItemOn: block" + block.type);
        logger.debug("onUseItemOn item:" + item.type);

        //先要检测land存不存在
        /**
         * @type {pos}
         */
        let pos = block.pos;
        let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
        if (landId) {
            //领地存在，加载领地数据
            let landData = pLandDataInterface.data[landId];
            if (pLandDataInterface.inTrust(player.xuid, landId)) {
                logger.debug("onUseItemOn信任成员，放行行为");
                //信任成员，放行行为
                return;
            }
            switch (block.type) {
                case "minecraft:lectern":
                    if (!landData.permissions.tools.useLectern) {
                        return false;
                    }
                    break;
                case "minecraft:bed":
                    if (!landData.permissions.tools.useBed) {
                        return false;
                    }
                    break;
                case "minecraft:campfire":
                    if (!landData.permissions.tools.useCampfire) {
                        return false;
                    }
                    break;
                case "minecraft:soul_campfire":
                    if (!landData.permissions.tools.useCampfire) {
                        return false;
                    }
                    break;
                case "minecraft:bell":
                    if (!landData.permissions.tools.useBell) {
                        return false;
                    }
                    break;
                case "minecraft:crafting_table":
                    if (!landData.permissions.tools.useCraftingTable) {
                        return false;
                    }
                    break;
                case "minecraft:cauldron":
                    if (!landData.permissions.tools.useCauldron) {
                        return false;
                    }
                    break;
                case "minecraft:composter":
                    if (!landData.permissions.tools.useComposter) {
                        return false;
                    }
                    break;
                case "minecraft:noteblock":
                    if (!landData.permissions.tools.useNoteBlock) {
                        return false;
                    }
                    break;
                case "minecraft:jukebox":
                    if (!landData.permissions.tools.useJukebox) {
                        return false;
                    }
                    break;
                case "minecraft:respawn_anchor":
                    if (!landData.permissions.tools.useRespawnAnchor) {
                        return false;
                    }
                    break;
                case "minecraft:dragon_egg":
                    if (!landData.permissions.blocks.blockDestory) {
                        return false;
                    }
                    break;
                //红石类
                case "minecraft:lever":
                    if (!landData.permissions.redStone.useLever) {
                        return false;
                    }
                    break;
                case "minecraft:daylight_detector":
                    if (!landData.permissions.redStone.useDaylightDetector) {
                        return false;
                    }
                    break;
                case "minecraft:daylight_detector_inverted":
                    if (!landData.permissions.redStone.useDaylightDetector) {
                        return false;
                    }
                    break;
                case "minecraft:unpowered_repeater":
                    if (!landData.permissions.redStone.changeRepeater) {
                        return false;
                    }
                    break;
                case "minecraft:powered_repeater":
                    if (!landData.permissions.redStone.changeRepeater) {
                        return false;
                    }
                    break;
                case "minecraft:unpowered_comparator":
                    if (!landData.permissions.redStone.changeComparator) {
                        return false;
                    }
                    break;
                case "minecraft:powered_comparator":
                    if (!landData.permissions.redStone.changeComparator) {
                        return false;
                    }
                    break;
                //潜影盒
                case "minecraft:shulker_box":
                    if (!landData.permissions.container.openShulkerBox) {
                        return false;
                    }
                    break;
                case "minecraft:undyed_shulker_box":
                    if (!landData.permissions.container.openShulkerBox) {
                        return false;
                    }
                    break;
                default:
                    break;
            }
            switch (item.type) {
                case "minecraft:bucket":
                    if (!landData.permissions.tools.useBucket) {
                        return false;
                    }
                    break;
                case "minecraft:water_bucket":
                    if (!landData.permissions.tools.useBucket) {
                        return false;
                    }
                    break;
                case "minecraft:lava_bucket":
                    if (!landData.permissions.tools.useBucket) {
                        return false;
                    }
                    break;
                case "minecraft:cod_bucket":
                    if (!landData.permissions.tools.useBucket) {
                        return false;
                    }
                    break;
                case "minecraft:tropical_fish_bucket":
                    if (!landData.permissions.tools.useBucket) {
                        return false;
                    }
                    break;
                case "minecraft:powder_snow_bucket":
                    if (!landData.permissions.tools.useBucket) {
                        return false;
                    }
                    break;
                case "minecraft:pufferfish_bucket":
                    if (!landData.permissions.tools.useBucket) {
                        return false;
                    }
                    break;
                case "minecraft:axolotl_bucket":
                    if (!landData.permissions.tools.useBucket) {
                        return false;
                    }
                    break;
                case "minecraft:armor_stand":
                    if (!landData.permissions.tools.useArmorStand) {
                        return false;
                    }
                    break;
                case "minecraft:flint_and_steel":
                    if (!landData.permissions.tools.useFlint) {
                        return false;
                    }
                    break;
                case "minecraft:glow_ink_sac":
                    if (!landData.permissions.blocks.blockPlace) {
                        return false;
                    }
                    break;
                case "minecraft:ink_sac":
                    if (!landData.permissions.blocks.blockPlace) {
                        return false;
                    }
                    break;
                case "minecraft:end_crystal":
                    if (!landData.permissions.blocks.blockPlace) {
                        return false;
                    }
                    break;
                case "minecraft:ender_eye":
                    if (!landData.permissions.blocks.blockPlace) {
                        return false;
                    }
                    break;
                default:
                    break;
            }
            /**
             * @type {string}
             */
            let itemName = block.type;
            if (
                itemName.endsWith("door") &&
                !landData.permissions.blocks.openDoor
            ) {
                //各类门
                return false;
            } else if (
                itemName.endsWith("fence_gate") &&
                !landData.permissions.blocks.useFenceGate
            ) {
                //栅栏
                return false;
            } else if (
                itemName.endsWith("trapdoor") &&
                !landData.permissions.blocks.useTrapdoor
            ) {
                //活扳门
                return false;
            } else if (
                itemName.endsWith("button") &&
                !landData.permissions.redStone.pressButton
            ) {
                //按钮
                return false;
            } else if (
                itemName.endsWith("minecart") &&
                !landData.permissions.blocks.blockPlace
            ) {
                //矿车
                return false;
            } else if (
                itemName.endsWith("boat") &&
                !landData.permissions.blocks.blockPlace
            ) {
                //船
                return false;
            } else if (
                itemName === "minecraft:painting" &&
                !landData.permissions.blocks.blockPlace
            ) {
                //画
                return false;
            }
            return;
        }
        //是否禁用团队领地
        if (!enableOrg) {
            return;
        }
        landId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
        if (landId) {
            //领地存在，加载领地数据
            let landData = OlandDataInterface.data[landId];
            if (OlandDataInterface.inTrust(player.xuid, landId)) {
                logger.debug("onUseItemOn信任成员，放行行为");
                //信任成员，放行行为
                return;
            }
            switch (block.type) {
                case "minecraft:lectern":
                    if (!landData.permissions.tools.useLectern) {
                        return false;
                    }
                    break;
                case "minecraft:bed":
                    if (!landData.permissions.tools.useBed) {
                        return false;
                    }
                    break;
                case "minecraft:campfire":
                    if (!landData.permissions.tools.useCampfire) {
                        return false;
                    }
                    break;
                case "minecraft:soul_campfire":
                    if (!landData.permissions.tools.useCampfire) {
                        return false;
                    }
                    break;
                case "minecraft:bell":
                    if (!landData.permissions.tools.useBell) {
                        return false;
                    }
                    break;
                case "minecraft:crafting_table":
                    if (!landData.permissions.tools.useCraftingTable) {
                        return false;
                    }
                    break;
                case "minecraft:cauldron":
                    if (!landData.permissions.tools.useCauldron) {
                        return false;
                    }
                    break;
                case "minecraft:composter":
                    if (!landData.permissions.tools.useComposter) {
                        return false;
                    }
                    break;
                case "minecraft:noteblock":
                    if (!landData.permissions.tools.useNoteBlock) {
                        return false;
                    }
                    break;
                case "minecraft:jukebox":
                    if (!landData.permissions.tools.useJukebox) {
                        return false;
                    }
                    break;
                case "minecraft:respawn_anchor":
                    if (!landData.permissions.tools.useRespawnAnchor) {
                        return false;
                    }
                    break;
                //打龙蛋不行
                case "minecraft:dragon_egg":
                    if (!landData.permissions.blocks.blockDestory) {
                        return false;
                    }
                    break;
                //红石类
                case "minecraft:lever":
                    if (!landData.permissions.redStone.useLever) {
                        return false;
                    }
                    break;
                case "minecraft:daylight_detector":
                    if (!landData.permissions.redStone.useDaylightDetector) {
                        return false;
                    }
                    break;
                case "minecraft:daylight_detector_inverted":
                    if (!landData.permissions.redStone.useDaylightDetector) {
                        return false;
                    }
                    break;
                case "minecraft:unpowered_repeater":
                    if (!landData.permissions.redStone.changeRepeater) {
                        return false;
                    }
                    break;
                case "minecraft:powered_repeater":
                    if (!landData.permissions.redStone.changeRepeater) {
                        return false;
                    }
                    break;
                case "minecraft:unpowered_comparator":
                    if (!landData.permissions.redStone.changeComparator) {
                        return false;
                    }
                    break;
                case "minecraft:powered_comparator":
                    if (!landData.permissions.redStone.changeComparator) {
                        return false;
                    }
                    break;
                //潜影盒
                case "minecraft:shulker_box":
                    if (!landData.permissions.container.openShulkerBox) {
                        return false;
                    }
                    break;
                case "minecraft:undyed_shulker_box":
                    if (!landData.permissions.container.openShulkerBox) {
                        return false;
                    }
                    break;
                default:
                    break;
            }
            switch (item.type) {
                case "minecraft:bucket":
                    if (!landData.permissions.tools.useBucket) {
                        return false;
                    }
                    break;
                case "minecraft:water_bucket":
                    if (!landData.permissions.tools.useBucket) {
                        return false;
                    }
                    break;
                case "minecraft:lava_bucket":
                    if (!landData.permissions.tools.useBucket) {
                        return false;
                    }
                    break;
                case "minecraft:cod_bucket":
                    if (!landData.permissions.tools.useBucket) {
                        return false;
                    }
                    break;
                case "minecraft:tropical_fish_bucket":
                    if (!landData.permissions.tools.useBucket) {
                        return false;
                    }
                    break;
                case "minecraft:powder_snow_bucket":
                    if (!landData.permissions.tools.useBucket) {
                        return false;
                    }
                    break;
                case "minecraft:pufferfish_bucket":
                    if (!landData.permissions.tools.useBucket) {
                        return false;
                    }
                    break;
                case "minecraft:axolotl_bucket":
                    if (!landData.permissions.tools.useBucket) {
                        return false;
                    }
                    break;
                case "minecraft:armor_stand":
                    if (!landData.permissions.tools.useArmorStand) {
                        return false;
                    }
                    break;
                case "minecraft:flint_and_steel":
                    if (!landData.permissions.tools.useFlint) {
                        return false;
                    }
                    break;
                case "minecraft:glow_ink_sac":
                    if (!landData.permissions.blocks.blockPlace) {
                        return false;
                    }
                    break;
                case "minecraft:ink_sac":
                    if (!landData.permissions.blocks.blockPlace) {
                        return false;
                    }
                    break;
                case "minecraft:end_crystal":
                    if (!landData.permissions.blocks.blockPlace) {
                        return false;
                    }
                    break;
                case "minecraft:ender_eye":
                    if (!landData.permissions.blocks.blockPlace) {
                        return false;
                    }
                    break;
                default:
                    break;
            }
            /**
             * @type {string}
             */
            let itemName = block.type;
            if (
                itemName.endsWith("door") &&
                !landData.permissions.blocks.openDoor
            ) {
                //各类门
                return false;
            } else if (
                itemName.endsWith("fence_gate") &&
                !landData.permissions.blocks.useFenceGate
            ) {
                //栅栏
                return false;
            } else if (
                itemName.endsWith("trapdoor") &&
                !landData.permissions.blocks.useTrapdoor
            ) {
                //活扳门
                return false;
            } else if (
                itemName.endsWith("button") &&
                !landData.permissions.redStone.pressButton
            ) {
                //按钮
                return false;
            } else if (
                itemName.endsWith("minecart") &&
                !landData.permissions.blocks.blockPlace
            ) {
                //矿车
                return false;
            } else if (
                itemName.endsWith("boat") &&
                !landData.permissions.blocks.blockPlace
            ) {
                //船
                return false;
            } else if (
                itemName === "minecraft:painting" &&
                !landData.permissions.blocks.blockPlace
            ) {
                //画
                return false;
            }
            return;
        }
    }
);

mc.listen(
    "onBlockInteracted",
    /**
     *
     *
     * @param {player} player
     * @param {block} block
     */
    function (player, block) {
        logger.debug("onBlockInteracted:" + block.type);
        //先要检测land存不存在
        /**
         * @type {pos}
         */
        if (configAPI.data.operator.includes(player.xuid)) {
            //管理员
            return;
        }
        let pos = block.pos;
        let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
        if (landId) {
            //领地存在，加载领地数据
            let landData = pLandDataInterface.data[landId];
            if (pLandDataInterface.inTrust(player.xuid, landId)) {
                logger.debug("onBlockInteracted信任成员，放行行为");
                //信任成员，放行行为
                return;
            }
            //对各类实用方块进行判断
            switch (block.type) {
                case "minecraft:cartography_table":
                    if (!landData.permissions.tools.useCartographyTable) {
                        return false;
                    }
                    break;
                case "minecraft:smithing_table":
                    if (!landData.permissions.tools.useSmithingTable) {
                        return false;
                    }
                    break;
                case "minecraft:smoker":
                    if (!landData.permissions.tools.useSmoker) {
                        return false;
                    }
                    break;
                case "minecraft:furnace":
                    if (!landData.permissions.tools.useFurnace) {
                        return false;
                    }
                    break;
                case "minecraft:blast_furnace":
                    if (!landData.permissions.tools.useBlastFurnace) {
                        return false;
                    }
                    break;
                case "minecraft:brewing_stand":
                    if (!landData.permissions.tools.useBrewingStand) {
                        return false;
                    }
                    break;
                case "minecraft:anvil":
                    if (!landData.permissions.tools.useAnvil) {
                        return false;
                    }
                    break;
                case "minecraft:beacon":
                    if (!landData.permissions.tools.useBeacon) {
                        return false;
                    }
                    break;
                case "minecraft:enchanting_table":
                    if (!landData.permissions.tools.useEnchantingTable) {
                        return false;
                    }
                    break;
                case "minecraft:grindstone":
                    if (!landData.permissions.tools.useGrindstone) {
                        return false;
                    }
                    break;
                case "minecraft:loom":
                    if (!landData.permissions.tools.useLoom) {
                        return false;
                    }
                    break;
                case "minecraft:stonecutter_block":
                    if (!landData.permissions.tools.useStonecutter) {
                        return false;
                    }
                    break;
                default:
                    break;
            }
            //此项以私人领地为优先
            return;
        }
        //是否禁用团队领地
        if (!enableOrg) {
            return;
        }
        //没有私人领地，看看公会领地
        landId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
        if (landId) {
            //领地存在，加载领地数据
            let landData = OlandDataInterface.data[landId];
            if (OlandDataInterface.inTrust(player.xuid, landId)) {
                logger.debug("onBlockInteracted信任成员，放行行为");
                //信任成员，放行行为
                return;
            }
            //对各类实用方块进行判断
            switch (block.type) {
                case "minecraft:cartography_table":
                    if (!landData.permissions.tools.useCartographyTable) {
                        return false;
                    }
                    break;
                case "minecraft:smithing_table":
                    if (!landData.permissions.tools.useSmithingTable) {
                        return false;
                    }
                    break;
                case "minecraft:smoker":
                    if (!landData.permissions.tools.useSmoker) {
                        return false;
                    }
                    break;
                case "minecraft:furnace":
                    if (!landData.permissions.tools.useFurnace) {
                        return false;
                    }
                    break;
                case "minecraft:blast_furnace":
                    if (!landData.permissions.tools.useBlastFurnace) {
                        return false;
                    }
                    break;
                case "minecraft:brewing_stand":
                    if (!landData.permissions.tools.useBrewingStand) {
                        return false;
                    }
                    break;
                case "minecraft:anvil":
                    if (!landData.permissions.tools.useAnvil) {
                        return false;
                    }
                    break;
                case "minecraft:beacon":
                    if (!landData.permissions.tools.useBeacon) {
                        return false;
                    }
                    break;
                case "minecraft:enchanting_table":
                    if (!landData.permissions.tools.useEnchantingTable) {
                        return false;
                    }
                    break;
                case "minecraft:grindstone":
                    if (!landData.permissions.tools.useGrindstone) {
                        return false;
                    }
                    break;
                case "minecraft:loom":
                    if (!landData.permissions.tools.useLoom) {
                        return false;
                    }
                    break;
                case "minecraft:stonecutter_block":
                    if (!landData.permissions.tools.useStonecutter) {
                        return false;
                    }
                    break;
                default:
                    break;
            }
        }
    }
);
mc.listen("onUseItem", (player, item) => {
    logger.debug(item.type);
    if (configAPI.data.operator.includes(player.xuid)) {
        //管理员
        return;
    }
    let pos = player.pos;
    let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = pLandDataInterface.data[landId];
        if (pLandDataInterface.inTrust(player.xuid, landId)) {
            logger.debug("onUseItem信任放行");
            //信任成员，放行行为
            return;
        }
        if (
            item.type === "minecraft:bucket" &&
            !landData.permissions.tools.useBucket
        ) {
            return false;
        }
        return;
    }
    landId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = OlandDataInterface.data[landId];
        if (OlandDataInterface.inTrust(player.xuid, landId)) {
            logger.debug("onUseItem信任放行");
            //信任成员，放行行为
            return;
        }
        if (
            item.type === "minecraft:bucket" &&
            !landData.permissions.tools.useBucket
        ) {
            return false;
        }
        return;
    }
});

//容器监控
mc.listen("onOpenContainer", (player, block) => {
    logger.debug(block.type);
    if (configAPI.data.operator.includes(player.xuid)) {
        //管理员
        return;
    }
    let blockName = block.type;
    let pos = block.pos;
    let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = pLandDataInterface.data[landId];
        if (pLandDataInterface.inTrust(player.xuid, landId)) {
            logger.debug("onOpenContainer放行");
            //信任成员，放行行为
            return;
        }
        if (
            blockName === "minecraft:dispenser" &&
            !landData.permissions.redStone.useDispenser
        ) {
            return false;
        }
        if (
            blockName === "minecraft:dropper" &&
            !landData.permissions.redStone.useDropper
        ) {
            return false;
        }
        if (
            blockName === "minecraft:hopper" &&
            !landData.permissions.container.openHopper
        ) {
            return false;
        }
        if (
            blockName === "minecraft:barrel" &&
            !landData.permissions.container.openBarrel
        ) {
            return false;
        }
        if (
            blockName.endsWith("shulker_box") &&
            !landData.permissions.container.openShulkerBox
        ) {
            return false;
        }
        if (
            blockName.endsWith("chest") &&
            !landData.permissions.container.openShulkerBox
        ) {
            return false;
        }
        return;
    }
    //是否禁用团队领地
    if (!enableOrg) {
        return;
    }
    landId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = OlandDataInterface.data[landId];
        if (OlandDataInterface.inTrust(player.xuid, landId)) {
            logger.debug("onOpenContainer放行");
            //信任成员，放行行为
            return;
        }
        if (
            blockName === "minecraft:dispenser" &&
            !landData.permissions.redStone.useDispenser
        ) {
            return false;
        }
        if (
            blockName === "minecraft:dropper" &&
            !landData.permissions.redStone.useDropper
        ) {
            return false;
        }
        if (
            blockName === "minecraft:hopper" &&
            !landData.permissions.container.openHopper
        ) {
            return false;
        }
        if (
            blockName === "minecraft:barrel" &&
            !landData.permissions.container.openBarrel
        ) {
            return false;
        }
        if (
            blockName.endsWith("shulker_box") &&
            !landData.permissions.container.openShulkerBox
        ) {
            return false;
        }
        if (
            blockName.endsWith("chest") &&
            !landData.permissions.container.openShulkerBox
        ) {
            return false;
        }
        return;
    }
});

//这玩意貌似没有用
/**
 * @todo https://github.com/LiteLDev/LiteLoaderBDS/issues/350
 */
mc.listen("onStepOnPressurePlate", (entity, block) => {
    let pos = block.pos;
    let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = pLandDataInterface.data[landId];
        //踩压力板没什么赦免的
        if (!landData.permissions.redStone.usePressurePlate) {
            return false;
        }
        return;
    }
    if (!enableOrg) {
        return;
    }
    landId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = OlandDataInterface.data[landId];
        //踩压力板没什么赦免的
        if (!landData.permissions.redStone.usePressurePlate) {
            return false;
        }
        return;
    }
});

//漏斗吸取物品
mc.listen("onHopperSearchItem", (pos, isMinecart) => {
    let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = pLandDataInterface.data[landId];
        //踩压力板没什么赦免的
        if (!landData.permissions.redStone.HopperChange) {
            return false;
        }
        return;
    }
    if (!enableOrg) {
        return;
    }
    landId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = OlandDataInterface.data[landId];
        //踩压力板没什么赦免的
        if (!landData.permissions.redStone.HopperChange) {
            return false;
        }
        return;
    }
});

//漏斗吐出物品
mc.listen("onHopperPushOut", (pos) => {
    let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = pLandDataInterface.data[landId];
        //踩压力板没什么赦免的
        if (!landData.permissions.redStone.HopperChange) {
            return false;
        }
        return;
    }
    if (!enableOrg) {
        return;
    }
    landId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = OlandDataInterface.data[landId];
        //踩压力板没什么赦免的
        if (!landData.permissions.redStone.HopperChange) {
            return false;
        }
        return;
    }
});

mc.listen("onUseFrameBlock", (player, block) => {
    if (configAPI.data.operator.includes(player.xuid)) {
        //管理员
        return;
    }
    let pos = block.pos;
    let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        if (pLandDataInterface.inTrust(player.xuid, landId)) {
            return;
        }
        let landData = pLandDataInterface.data[landId];
        if (!landData.permissions.redStone.HopperChange) {
            return false;
        }
        return;
    }
    if (!enableOrg) {
        return;
    }
    landId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        if (OlandDataInterface.inTrust(player.xuid, landId)) {
            return;
        }
        let landData = OlandDataInterface.data[landId];
        if (!landData.permissions.redStone.HopperChange) {
            return false;
        }
        return;
    }
});

//放置方块
mc.listen("onPlaceBlock", (player, block) => {
    if (configAPI.data.operator.includes(player.xuid)) {
        //管理员
        return;
    }
    let pos = block.pos;
    let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        if (pLandDataInterface.inTrust(player.xuid, landId)) {
            return;
        }
        let landData = pLandDataInterface.data[landId];
        if (!landData.permissions.blocks.blockPlace) {
            return false;
        }
        return;
    }
    if (!enableOrg) {
        return;
    }
    landId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        if (OlandDataInterface.inTrust(player.xuid, landId)) {
            return;
        }
        let landData = OlandDataInterface.data[landId];
        if (!landData.permissions.blocks.blockPlace) {
            return false;
        }
        return;
    }
});

//破坏方块
mc.listen("onDestroyBlock", (player, block) => {
    if (configAPI.data.operator.includes(player.xuid)) {
        //管理员
        return;
    }
    let pos = block.pos;
    let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        if (pLandDataInterface.inTrust(player.xuid, landId)) {
            return;
        }
        let landData = pLandDataInterface.data[landId];
        if (!landData.permissions.blocks.blockDestory) {
            return false;
        }
        return;
    }
    if (!enableOrg) {
        return;
    }
    landId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        if (OlandDataInterface.inTrust(player.xuid, landId)) {
            return;
        }
        let landData = OlandDataInterface.data[landId];
        if (!landData.permissions.blocks.blockDestory) {
            return false;
        }
        return;
    }
});

//丢出物品
mc.listen("onDropItem", (player, item) => {
    if (configAPI.data.operator.includes(player.xuid)) {
        //管理员
        return;
    }
    let pos = player.pos;
    let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        if (pLandDataInterface.inTrust(player.xuid, landId)) {
            return;
        }
        let landData = pLandDataInterface.data[landId];
        if (!landData.permissions.blocks.itemDrop) {
            return false;
        }
        return;
    }
    if (!enableOrg) {
        return;
    }
    landId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        if (OlandDataInterface.inTrust(player.xuid, landId)) {
            return;
        }
        let landData = OlandDataInterface.data[landId];
        if (!landData.permissions.blocks.itemDrop) {
            return false;
        }
        return;
    }
});

//捡起物品
mc.listen("onTakeItem", (player, entity, item) => {
    if (configAPI.data.operator.includes(player.xuid)) {
        //管理员
        return;
    }
    let pos = entity.pos;
    let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        if (pLandDataInterface.inTrust(player.xuid, landId)) {
            return;
        }
        let landData = pLandDataInterface.data[landId];
        if (!landData.permissions.blocks.itemDrop) {
            return false;
        }
        return;
    }
    if (!enableOrg) {
        return;
    }
    landId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        if (OlandDataInterface.inTrust(player.xuid, landId)) {
            return;
        }
        let landData = OlandDataInterface.data[landId];
        if (!landData.permissions.blocks.itemDrop) {
            return false;
        }
        return;
    }
});

//实体分类
const entityDB = {
    blockType: [
        "minecraft:ender_crystal",
        "minecraft:painting",
        "minecraft:boat",
        "minecraft:chest_minecart",
        "minecraft:minecart",
        "minecraft:hopper_minecart",
        "minecraft:hopper_minecart",
        "minecraft:tnt_minecart",
    ], //像物品的
    peaceful: [
        "minecraft:axolotl",
        "minecraft:bat",
        "minecraft:cat",
        "minecraft:chicken",
        "minecraft:cod",
        "minecraft:cow",
        "minecraft:donkey",
        "minecraft:fox",
        "minecraft:glow_squid",
        "minecraft:horse",
        "minecraft:mooshroom",
        "minecraft:mule",
        "minecraft:ocelot",
        "minecraft:parrot",
        "minecraft:pig",
        "minecraft:rabbit",
        "minecraft:salmon",
        "minecraft:snow_golem",
        "minecraft:sheep",
        "minecraft:skeleton_horse",
        "minecraft:squid",
        "minecraft:strider",
        "minecraft:tropical_fish",
        "minecraft:turtle",
        "minecraft:villager_v2",
        "minecraft:wandering_trader",
        "minecraft:npc",
    ],

    neutral: [
        "minecraft:pufferfish",
        "minecraft:bee",
        "minecraft:dolphin",
        "minecraft:goat",
        "minecraft:iron_golem",
        "minecraft:llama",
        "minecraft:llama_spit",
        "minecraft:wolf",
        "minecraft:panda",
        "minecraft:polar_bear",
        "minecraft:enderman",
        "minecraft:piglin",
        "minecraft:zombie_pigman",
    ],

    mob: [
        "minecraft:blaze",
        "minecraft:small_fireball",
        "minecraft:creeper",
        "minecraft:drowned",
        "minecraft:elder_guardian",
        "minecraft:endermite",
        "minecraft:evocation_illager",
        "minecraft:evocation_fang",
        "minecraft:ghast",
        "minecraft:spider",
        "minecraft:cave_spider",
        "minecraft:guardian",
        "minecraft:hoglin",
        "minecraft:husk",
        "minecraft:magma_cube",
        "minecraft:phantom",
        "minecraft:pillager",
        "minecraft:ravager",
        "minecraft:shulker",
        "minecraft:silverfish",
        "minecraft:skeleton",
        "minecraft:skeleton_horse",
        "minecraft:slime",
        "minecraft:vex",
        "minecraft:vindicator",
        "minecraft:witch",
        "minecraft:wither_skeleton",
        "minecraft:zoglin",
        "minecraft:zombie",
        "minecraft:zombie_villager_v2",
        "minecraft:piglin_brute",
        "minecraft:ender_dragon",
        "minecraft:wither",
        "minecraft:wither_skull",
        "minecraft:wither_skull_dangerous",
    ],

    projectile: [
        "minecraft:fireball",
        "minecraft:shulker_bullet",
        "minecraft:dragon_fireball",
        "minecraft:snowball",
        "minecraft:fireworks_rocket",
        "minecraft:thrown_trident",
        "minecraft:arrow",
        "minecraft:ender_pearl",
        "minecraft:egg",
    ],
};
//玩家攻击实体
mc.listen("onAttackEntity", (player, entity) => {
    if (configAPI.data.operator.includes(player.xuid)) {
        //管理员
        return;
    }
    let pos = entity.pos;
    let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        if (pLandDataInterface.inTrust(player.xuid, landId)) {
            return;
        }
        let landData = pLandDataInterface.data[landId];
        if (
            entityDB.blockType.includes(entity.type) &&
            !landData.permissions.blocks.blockDestory
        ) {
            return false;
        } else if (
            entity.type === "minecraft:armor_stand" &&
            !landData.permissions.tools.useArmorStand
        ) {
            return false;
        } else if (
            entity.type === "minecraft:player" &&
            !landData.permissions.player.allowAttackPlayer
        ) {
            return false;
        } else if (
            entityDB.peaceful.includes(entity.type) &&
            !landData.permissions.player.allowAttackAnimal
        ) {
            return false;
        } else if (
            entityDB.neutral.includes(entity.type) &&
            !landData.permissions.player.allowAttackNeutral
        ) {
            return false;
        } else if (
            entityDB.mob.includes(entity.type) &&
            !landData.permissions.player.allowAttackMobs
        ) {
            return false;
        }
        return;
    }
    if (!enableOrg) {
        return;
    }
    landId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        if (OlandDataInterface.inTrust(player.xuid, landId)) {
            return;
        }
        let landData = OlandDataInterface.data[landId];
        if (
            entityDB.blockType.includes(entity.type) &&
            !landData.permissions.blocks.blockDestory
        ) {
            return false;
        } else if (
            entity.type === "minecraft:armor_stand" &&
            !landData.permissions.tools.useArmorStand
        ) {
            return false;
        } else if (
            entity.type === "minecraft:player" &&
            !landData.permissions.player.allowAttackPlayer
        ) {
            return false;
        } else if (
            entityDB.peaceful.includes(entity.type) &&
            !landData.permissions.player.allowAttackAnimal
        ) {
            return false;
        } else if (
            entityDB.neutral.includes(entity.type) &&
            !landData.permissions.player.allowAttackNeutral
        ) {
            return false;
        } else if (
            entityDB.mob.includes(entity.type) &&
            !landData.permissions.player.allowAttackMobs
        ) {
            return false;
        }
        return;
    }
});

//骑乘监听
mc.listen("onRide", (driver, target) => {
    let pos = target.pos;
    let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    let isPlayer = driver.isPlayer();
    let player = driver.toPlayer();
    if (isPlayer && configAPI.data.operator.includes(player.xuid)) {
        //管理员
        return;
    }
    if (landId) {
        if (isPlayer && pLandDataInterface.inTrust(player.xuid, landId)) {
            return;
        }
        let landData = pLandDataInterface.data[landId];
        if (
            isPlayer &&
            target.type === "minecraft:boat" &&
            landData.permissions.player.allowUseBoat
        ) {
            return;
        } else if (
            isPlayer &&
            target.type === "minecraft:boat" &&
            !landData.permissions.player.allowUseBoat
        ) {
            return false;
        } else if (
            isPlayer &&
            target.type === "minecraft:minecart" &&
            landData.permissions.player.allowUseMinecart
        ) {
            return;
        } else if (
            isPlayer &&
            target.type === "minecraft:minecart" &&
            !landData.permissions.player.allowUseMinecart
        ) {
            return false;
        } else if (
            !isPlayer &&
            target.type === "minecraft:boat" &&
            landData.permissions.entity.allowUseBoat
        ) {
            return;
        } else if (
            !isPlayer &&
            target.type === "minecraft:boat" &&
            !landData.permissions.entity.allowUseBoat
        ) {
            return false;
        } else if (
            !isPlayer &&
            target.type === "minecraft:minecart" &&
            landData.permissions.entity.allowUseMinecart
        ) {
            return;
        } else if (
            !isPlayer &&
            target.type === "minecraft:minecart" &&
            !landData.permissions.entity.allowUseMinecart
        ) {
            return false;
        }
        if (!landData.permissions.entity.allowRideEntity) {
            //全局不允许骑乘
            return false;
        }
        return;
    }
    if (!enableOrg) {
        return;
    }
    landId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        if (isPlayer && OlandDataInterface.inTrust(player.xuid, landId)) {
            return;
        }
        let landData = OlandDataInterface.data[landId];
        if (
            isPlayer &&
            target.type === "minecraft:boat" &&
            landData.permissions.player.allowUseBoat
        ) {
            return;
        } else if (
            isPlayer &&
            target.type === "minecraft:boat" &&
            !landData.permissions.player.allowUseBoat
        ) {
            return false;
        } else if (
            isPlayer &&
            target.type === "minecraft:minecart" &&
            landData.permissions.player.allowUseMinecart
        ) {
            return;
        } else if (
            isPlayer &&
            target.type === "minecraft:minecart" &&
            !landData.permissions.player.allowUseMinecart
        ) {
            return false;
        } else if (
            !isPlayer &&
            target.type === "minecraft:boat" &&
            landData.permissions.entity.allowUseBoat
        ) {
            return;
        } else if (
            !isPlayer &&
            target.type === "minecraft:boat" &&
            !landData.permissions.entity.allowUseBoat
        ) {
            return false;
        } else if (
            !isPlayer &&
            target.type === "minecraft:minecart" &&
            landData.permissions.entity.allowUseMinecart
        ) {
            return;
        } else if (
            !isPlayer &&
            target.type === "minecraft:minecart" &&
            !landData.permissions.entity.allowUseMinecart
        ) {
            return false;
        }
        if (!landData.permissions.entity.allowRideEntity) {
            //全局不允许骑乘
            return false;
        }
        return;
    }
});

//生物攻击监听
mc.listen("onMobHurt", (target, source, damage) => {
    if (!source) {
        //不是实体造成的伤害
        return;
    }
    if (source.isPlayer()) {
        //玩家造成的攻击，这里不拦截
        return;
    }
    let pos = target.pos;
    let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = pLandDataInterface.data[landId];
        if (
            (entityDB.mob.includes(source.type) ||
                entityDB.neutral.includes(source.type)) &&
            !landData.permissions.entity.allowAttackEntity
        ) {
            return false;
        }
        return;
    }
    if (!enableOrg) {
        return;
    }
    landId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = OlandDataInterface.data[landId];
        if (
            (entityDB.mob.includes(source.type) ||
                entityDB.neutral.includes(source.type)) &&
            !landData.permissions.entity.allowAttackEntity
        ) {
            return false;
        }
        return;
    }
});

//生物生成控制
mc.listen("onMobSpawn", (type, pos) => {
    if (type === "minecraft:player") {
        //是玩家，不拦截
        return;
    }
    if (
        entityDB.blockType.includes(type) ||
        entityDB.projectile.includes(type)
    ) {
        //实体不是生物，不拦截
        return;
    }
    let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = pLandDataInterface.data[landId];
        if (
            entityDB.mob.includes(type) &&
            !landData.permissions.entity.allowMobSpawn
        ) {
            return false;
        } else if (
            entityDB.neutral.includes(type) &&
            !landData.permissions.entity.allowNeutralSpawn
        ) {
            return false;
        } else if (
            entityDB.peaceful.includes(type) &&
            !landData.permissions.entity.allowAnimalSpawn
        ) {
            return false;
        }
        return;
    }
    if (!enableOrg) {
        return;
    }
    landId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = OlandDataInterface.data[landId];
        if (
            entityDB.mob.includes(type) &&
            !landData.permissions.entity.allowMobSpawn
        ) {
            return false;
        } else if (
            entityDB.neutral.includes(type) &&
            !landData.permissions.entity.allowNeutralSpawn
        ) {
            return false;
        } else if (
            entityDB.peaceful.includes(type) &&
            !landData.permissions.entity.allowAnimalSpawn
        ) {
            return false;
        }
        return;
    }
    if (!configAPI.data.common.defaultSpawn) {
        return false;
    }
});

//进食
mc.listen("onEat", (player, item) => {
    if (configAPI.data.operator.includes(player.xuid)) {
        //管理员
        return;
    }
    let pos = player.pos;
    let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        if (pLandDataInterface.inTrust(player.xuid, landId)) {
            return;
        }
        let landData = pLandDataInterface.data[landId];
        if (!landData.permissions.player.eat) {
            return false;
        }
        return;
    }
    if (!enableOrg) {
        return;
    }
    landId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        if (OlandDataInterface.inTrust(player.xuid, landId)) {
            return;
        }
        let landData = OlandDataInterface.data[landId];
        if (!landData.permissions.player.eat) {
            return false;
        }
        return;
    }
});

//弹射物监听

mc.listen("onSpawnProjectile", (shooter, type) => {
    if (!shooter.type) {
        //发射器发射
        return;
    }
    let pos = shooter.pos;
    let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = pLandDataInterface.data[landId];
        if (!shooter.isPlayer()) {
            if (landData.permissions.entity.allowShoot) {
                return;
            } else {
                return false;
            }
        }
        let player = shooter.toPlayer();
        if (configAPI.data.operator.includes(player.xuid)) {
            //管理员
            return;
        }
        if (pLandDataInterface.inTrust(player.xuid, landId)) {
            return;
        }
        if (type === "minecraft:fishing_hook") {
            //玩家钓鱼
            if (landData.permissions.player.fishing) {
                return;
            } else {
                return false;
            }
        }
        if (
            type === "minecraft:splash_potion" ||
            type === "minecraft:lingering_potion"
        ) {
            //玩家扔药水
            if (landData.permissions.player.allowThrowPotion) {
                return;
            } else {
                return false;
            }
        }
        if (landData.permissions.player.allowShoot) {
            return;
        } else {
            return false;
        }
    }
    if (!enableOrg) {
        return;
    }
    landId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = OlandDataInterface.data[landId];
        if (!shooter.isPlayer()) {
            if (landData.permissions.entity.allowShoot) {
                return;
            } else {
                return false;
            }
        }
        let player = shooter.toPlayer();
        if (configAPI.data.operator.includes(player.xuid)) {
            //管理员
            return;
        }
        if (OlandDataInterface.inTrust(player.xuid, landId)) {
            return;
        }
        if (type === "minecraft:fishing_hook") {
            //玩家钓鱼
            if (landData.permissions.player.fishing) {
                return;
            } else {
                return false;
            }
        }
        if (
            type === "minecraft:splash_potion" ||
            type === "minecraft:lingering_potion"
        ) {
            //玩家扔药水
            if (landData.permissions.player.allowThrowPotion) {
                return;
            } else {
                return false;
            }
        }
        if (landData.permissions.player.allowShoot) {
            return;
        } else {
            return false;
        }
    }
});

//修改盔甲架
mc.listen("onChangeArmorStand", (as, player, item) => {
    if (configAPI.data.operator.includes(player.xuid)) {
        //管理员
        return;
    }
    let pos = as.pos;
    let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        if (pLandDataInterface.inTrust(player.xuid, landId)) {
            return;
        }
        let landData = pLandDataInterface.data[landId];
        if (!landData.permissions.tools.useArmorStand) {
            return false;
        }
        return;
    }
    if (!enableOrg) {
        return;
    }
    landId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        if (OlandDataInterface.inTrust(player.xuid, landId)) {
            return;
        }
        let landData = OlandDataInterface.data[landId];
        if (!landData.permissions.tools.useArmorStand) {
            return false;
        }
        return;
    }
});

function CommandTeleportHander(player, action) {
    switch (action) {
        case "set":
            CommandTpSetHander(player);
            break;
        case "clear":
            CommandTpClearHander(player);
            break;
        default:
            CommandTpGuiHander(player);
            break;
    }
}

// 对玩家执行tp set指令进行处理
function CommandTpSetHander(player) {
    if (!configAPI.data.common.allowLandTeleport) {
        player.tell(i18n.$t("teleport.set.noPrem"));
    }
    let pos = player.blockPos;
    let pLandId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    let oLandId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    let permisstion = [0, 0];
    if (configAPI.data.operator.includes(player.xuid)) {
        //管理员，如果存在都允许
        permisstion = [!!pLandId, !!oLandId];
    }
    if (
        pLandId &&
        pLandDataInterface.data[pLandId].settings.owner === player.xuid
    ) {
        permisstion[0] = true;
    }
    if (
        oLandId &&
        OlandDataInterface.data[oLandId].settings.owner ===
            orgAPI.getOrgNum(player.xuid) &&
        orgAPI.isOwner(player.xuid)
    ) {
        permisstion[1] = true;
    }
    if (permisstion[0] && permisstion[1]) {
        //俩都允许，弹出窗口任选
        player.sendModalForm(
            i18n.$t("teleport.set.title"),
            i18n.$t("teleport.set.desp"),
            i18n.$t("teleport.set.pri"),
            i18n.$t("teleport.set.org"),
            (pl, dt) => {
                if (dt == null) {
                    return;
                }
                if (dt) {
                    pLandDataInterface.data[pLandId].teleport = [
                        pos.x,
                        pos.y,
                        pos.z,
                    ];
                    pLandDataInterface.save();
                    player.tell(i18n.$t("teleport.set.success"));
                } else {
                    OlandDataInterface.data[oLandId].teleport = [
                        pos.x,
                        pos.y,
                        pos.z,
                    ];
                    OlandDataInterface.save();
                    player.tell(i18n.$t("teleport.set.success"));
                }
            }
        );
    } else if (permisstion[0]) {
        pLandDataInterface.data[pLandId].teleport = [pos.x, pos.y, pos.z];
        pLandDataInterface.save();
        player.tell(i18n.$t("teleport.set.success"));
    } else if (permisstion[1]) {
        OlandDataInterface.data[oLandId].teleport = [pos.x, pos.y, pos.z];
        OlandDataInterface.save();
        player.tell(i18n.$t("teleport.set.success"));
    } else {
        //此处无垠三百两，告知
        player.tell(i18n.$t("this.manage.noland"));
    }
}

function CommandTpClearHander(player) {
    if (!configAPI.data.common.allowLandTeleport) {
        player.tell(i18n.$t("teleport.set.noPrem"));
    }
    let pos = player.blockPos;
    let pLandId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    let oLandId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    let permisstion = [0, 0];
    if (configAPI.data.operator.includes(player.xuid)) {
        //管理员，如果存在都允许
        permisstion = [!!pLandId, !!oLandId];
    }
    if (
        pLandId &&
        pLandDataInterface.data[pLandId].settings.owner === player.xuid
    ) {
        permisstion[0] = true;
    }
    if (
        oLandId &&
        OlandDataInterface.data[oLandId].settings.owner ===
            orgAPI.getOrgNum(player.xuid) &&
        orgAPI.isOwner(player.xuid)
    ) {
        permisstion[1] = true;
    }
    if (permisstion[0] && permisstion[1]) {
        //俩都允许，弹出窗口任选
        player.sendModalForm(
            i18n.$t("teleport.set.title"),
            i18n.$t("teleport.set.desp"),
            i18n.$t("teleport.set.pri"),
            i18n.$t("teleport.set.org"),
            (pl, dt) => {
                if (dt == null) {
                    return;
                }
                if (dt) {
                    pLandDataInterface.data[pLandId].teleport = [];
                    pLandDataInterface.save();
                    player.tell(i18n.$t("teleport.clear.success"));
                } else {
                    OlandDataInterface.data[oLandId].teleport = [];
                    OlandDataInterface.save();
                    player.tell(i18n.$t("teleport.clear.success"));
                }
            }
        );
    } else if (permisstion[0]) {
        pLandDataInterface.data[pLandId].teleport = [];
        pLandDataInterface.save();
        player.tell(i18n.$t("teleport.clear.success"));
    } else if (permisstion[1]) {
        OlandDataInterface.data[oLandId].teleport = [];
        OlandDataInterface.save();
        player.tell(i18n.$t("teleport.clear.success"));
    } else {
        //此处无垠三百两，告知
        player.tell(i18n.$t("this.manage.noland"));
    }
}

//传送页
function CommandTpGuiHander(player) {
    if (!configAPI.data.common.allowLandTeleport) {
        player.tell(i18n.$t("teleport.set.noPrem"));
    }
    let landList = [];
    let tLandList = belongToApi.data.player[player.xuid];
    if (tLandList && tLandList.length !== 0) {
        for (const landId of tLandList) {
            let landData = pLandDataInterface.data[landId];
            if (landData && landData.teleport.length !== 0) {
                landList.push({
                    isOrg: false,
                    name: landData.settings.name,
                    teleport: landData.teleport,
                    dim: landData.range.dimid,
                });
            }
        }
    }
    tLandList = belongToApi.data.shared[player.xuid];
    if (tLandList && tLandList.length !== 0) {
        for (const landId of tLandList) {
            let landData = pLandDataInterface.data[landId];
            if (landData && landData.teleport.length !== 0) {
                landList.push({
                    isOrg: false,
                    name: landData.settings.name,
                    teleport: landData.teleport,
                    dim: landData.range.dimid,
                });
            }
        }
    }
    if (enableOrg && orgAPI.getOrgNum(player.xuid)) {
        tLandList = belongToApi.data.org[orgAPI.getOrgNum(player.xuid)];
        if (tLandList && tLandList.length !== 0) {
            for (const landId of tLandList) {
                let landData = OlandDataInterface.data[landId];
                if (landData && landData.teleport.length !== 0) {
                    landList.push({
                        isOrg: true,
                        name: landData.settings.name,
                        teleport: landData.teleport,
                        dim: landData.range.dimid,
                    });
                }
            }
        }
    }
    //构建临时表完成，进行渲染。
    let fm = mc.newSimpleForm();
    fm.setTitle(i18n.$t("teleport.gui.title"));
    for (const item of landList) {
        if (item.isOrg) {
            fm.addButton(i18n.$t("teleport.gui.Orgitem", [item.name]));
        } else {
            fm.addButton(i18n.$t("teleport.gui.Priitem", [item.name]));
        }
    }
    player.sendForm(fm, (pl, dt) => {
        if (dt == null) {
            return;
        }
        let land = landList[dt];
        pl.teleport(
            land.teleport[0],
            land.teleport[1],
            land.teleport[2],
            land.dim
        );
        pl.tell(i18n.$t("teleport.gui.success"));
    });
}

//事件监控

//火焰蔓延
mc.listen("onFireSpread", (pos) => {
    let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = pLandDataInterface.data[landId];
        if (!landData.events.fireSpread) {
            return false;
        }
        return;
    }
    if (!enableOrg) {
        return;
    }
    landId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = OlandDataInterface.data[landId];
        if (!landData.events.fireSpread) {
            return false;
        }
        return;
    }
});

//红石更新
mc.listen("onRedStoneUpdate", (block, level, isActive) => {
    let pos = block.pos;
    let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = pLandDataInterface.data[landId];
        if (!landData.events.redstoneUpdate) {
            return false;
        }
        return;
    }
    if (!enableOrg) {
        return;
    }
    landId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = OlandDataInterface.data[landId];
        if (!landData.events.redstoneUpdate) {
            return false;
        }
        return;
    }
});

//活塞推动，两事件要一块处理
mc.listen("onPistonTryPush", (piston, block) => {
    let pos = block.pos;
    //俩只要有一个false，则不能动
    return PistonPushBlock(pos) && PistonMove(piston);
});
//活塞推动物品
function PistonPushBlock(pos) {
    let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = pLandDataInterface.data[landId];
        if (!landData.events.pistonPush) {
            return false;
        }
        return true;
    }
    if (!enableOrg) {
        return true;
    }
    landId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = OlandDataInterface.data[landId];
        if (!landData.events.pistonPush) {
            return false;
        }
        return true;
    }
}
//活塞运动
function PistonMove(pos) {
    let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = pLandDataInterface.data[landId];
        if (!landData.permissions.redStone.pistonPush) {
            return false;
        }
        return true;
    }
    if (!enableOrg) {
        return true;
    }
    landId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = OlandDataInterface.data[landId];
        if (!landData.permissions.redStone.pistonPush) {
            return false;
        }
        return true;
    }
}

//耕地退化
mc.listen("onFarmLandDecay", (pos, entity) => {
    let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = pLandDataInterface.data[landId];
        if (!landData.events.redstoneUpdate) {
            return false;
        }
        return;
    }
    if (!enableOrg) {
        return;
    }
    landId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = OlandDataInterface.data[landId];
        if (!landData.events.redstoneUpdate) {
            return false;
        }
        return;
    }
});

//液体流动
function LiquidFlowEvents(pos) {
    let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = pLandDataInterface.data[landId];
        if (!landData.events.liquidFlow) {
            return false;
        }
        return true;
    }
    if (!configAPI.data.common.liquidFlow) {
        return true;
    }
    landId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (landId) {
        let landData = OlandDataInterface.data[landId];
        if (!landData.events.liquidFlow) {
            return false;
        }
        return true;
    }
}
mc.listen("onLiquidFlow", (from, to) => {
    let pos = from.pos;
    return LiquidFlowEvents(pos) && LiquidFlowEvents(to);
});

//爆炸（需要判断范围，团队优先）
/**
 *
 * @param {landData} landData
 * @param {pos} pos
 * @returns {boolean}
 */
//可以爆炸，返回true，不能爆炸返回false
function ExplodeHander(landData, pos, range) {
    if (landData.range.dimid !== pos.dimid) {
        //维度不同，可以爆炸
        return true;
    } else if (landData.events.explode) {
        return true;
    }
    //定义距离
    distance = {
        nx: landData.range.min_position[0] - pos.x,
        px: pos.x - landData.range.max_position[0],
        nz: landData.range.min_position[2] - pos.z,
        pz: pos.z - landData.range.max_position[2],
        ny: landData.range.min_position[1] - pos.y,
        py: pos.y - landData.range.max_position[1],
    };
    if (
        landData.range.type2D &&
        (distance.nx > range ||
            distance.px > range ||
            distance.nz > range ||
            distance.pz > range)
    ) {
        //范围之外
        return true;
    } else if (
        !landData.range.type2D &&
        (distance.nx > range ||
            distance.px > range ||
            distance.nz > range ||
            distance.pz > range ||
            distance.ny > range ||
            distance.py > range)
    ) {
        //范围之外
        return true;
    }
    return false;
}
//方块爆炸
mc.listen(
    "onBlockExplode",
    (source, pos, radius, maxResistance, isDestroy, isFire) => {
        if (enableOrg) {
            let OchunksLand = ChunkInterface.getChunksLand(
                pos.x,
                pos.z,
                pos.dimid,
                true
            );
            for (const landId of OchunksLand) {
                let landData = OlandDataInterface.data[landId];
                if (!ExplodeHander(landData, pos, radius)) {
                    return false;
                }
            }
        }
        let PchunksLand = ChunkInterface.getChunksLand(
            pos.x,
            pos.z,
            pos.dimid,
            false
        );
        for (const landId of PchunksLand) {
            let landData = pLandDataInterface.data[landId];
            if (!ExplodeHander(landData, pos, radius)) {
                return false;
            }
        }
    }
);

//实体爆炸
mc.listen(
    "onEntityExplode",
    (source, pos, radius, maxResistance, isDestroy, isFire) => {
        if (enableOrg) {
            let OchunksLand = ChunkInterface.getChunksLand(
                pos.x,
                pos.z,
                pos.dimid,
                true
            );
            for (const landId of OchunksLand) {
                let landData = OlandDataInterface.data[landId];
                if (!ExplodeHander(landData, pos, radius)) {
                    return false;
                }
            }
        }
        let PchunksLand = ChunkInterface.getChunksLand(
            pos.x,
            pos.z,
            pos.dimid,
            false
        );
        for (const landId of PchunksLand) {
            let landData = pLandDataInterface.data[landId];
            if (!ExplodeHander(landData, pos, radius)) {
                return false;
            }
        }
    }
);

//凋零爆炸
mc.listen("onWitherBossDestroy", (witherBoss, AAbb, aaBB) => {
    let pos = witherBoss.pos;
    if (enableOrg) {
        let OchunksLand = ChunkInterface.getChunksLand(
            pos.x,
            pos.z,
            pos.dimid,
            true
        );
        for (const landId of OchunksLand) {
            let landData = OlandDataInterface.data[landId];
            if (!ExplodeHander(landData, pos, 16)) {
                return false;
            }
        }
    }
    let PchunksLand = ChunkInterface.getChunksLand(
        pos.x,
        pos.z,
        pos.dimid,
        false
    );
    for (const landId of PchunksLand) {
        let landData = pLandDataInterface.data[landId];
        if (!ExplodeHander(landData, pos, 16)) {
            return false;
        }
    }
});

/**
 * 回收领地
 * @param {player} player
 * @param {string} landId
 * @param {boolean} isOrg
 */
function recycleLand(player, landId, isOrg) {
    if (!configAPI.data.refund.rate === 0) {
        //不让回收
        let fm = mc
            .newSimpleForm()
            .setTitle(i18n.$t("recycle.gui.title"))
            .setContent(i18n.$t("recycle.noPrem"));
        player.sendForm(fm, (pl, dt) => {
            ManageLand(pl, landId, isOrg);
        });
        return;
    }
    /**
     * @type {landData}
     */
    let landData;
    if (isOrg) {
        landData = OlandDataInterface.data[landId];
    } else {
        landData = pLandDataInterface.data[landId];
    }
    let posInterface = twoPosFormat(
        landData.range.max_position,
        landData.range.min_position
    );
    let price = 0;
    if (landData.range.type2D) {
        // 2D地皮价格
        price =
            posInterface.dx *
            posInterface.dz *
            configAPI.data.sell.type2D.priceSquare;
    } else if (configAPI.data.sell.type3D.priceY) {
        price =
            posInterface.dx *
                posInterface.dz *
                configAPI.data.sell.type3D.priceXZ +
            posInterface.dy * configAPI.data.sell.type3D.priceY;
    } else {
        price =
            posInterface.dx *
            posInterface.dy *
            posInterface.dz *
            configAPI.data.sell.type3D.priceXZ;
    }
    price = parseInt(price * configAPI.data.refund.rate);
    player.sendModalForm(
        i18n.$t("recycle.gui.title"),
        i18n.$t("recycle.gui.desp", [
            landId,
            isOrg
                ? i18n.$t("this.manage.choose.org")
                : i18n.$t("this.manage.choose.pri"),
            landData.settings.name,
            price,
        ]),
        i18n.$t("common.YES"),
        i18n.$t("common.NO"),
        (pl, dt) => {
            if (!dt) {
                ManageLand(pl, landId, isOrg);
            }
            if (dt) {
                //删除领地
                playerState[pl.xuid].inOLand = "";
                playerState[pl.xuid].inPLand = "";
                if (isOrg) {
                    //删除关联信息
                    belongToApi.orgRemoveLand(landData.settings.owner, landId);
                    //删除区块绑定信息
                    ChunkInterface.unlinkOrg(
                        landData.range.min_position[0],
                        landData.range.max_position[0],
                        landData.range.min_position[2],
                        landData.range.max_position[2],
                        landData.range.dimid,
                        landId
                    );
                    //删除领地
                    delete OlandDataInterface.data[landId];
                    //删除缓存
                    cache.clean();
                    //保存信息
                    belongToApi.save();
                    ChunkInterface.save();
                    OlandDataInterface.save();
                    //退钱
                    orgAPI.orgAddMoney(landData.settings.owner, price);
                } else {
                    //删除玩家绑定信息
                    belongToApi.playerRemoveLand(
                        landData.settings.owner,
                        landId
                    );
                    //删除信任玩家关联
                    for (const xuid of landData.share) {
                        belongToApi.playerRemoveShare(xuid, landId);
                    }
                    //删除区块绑定信息
                    ChunkInterface.unlinkPrivate(
                        landData.range.min_position[0],
                        landData.range.max_position[0],
                        landData.range.min_position[2],
                        landData.range.max_position[2],
                        landData.range.dimid,
                        landId
                    );
                    //删除领地
                    delete pLandDataInterface.data[landId];
                    //清除缓存
                    cache.clean();
                    //保存信息
                    belongToApi.save();
                    ChunkInterface.save();
                    pLandDataInterface.save();
                    //退钱
                    moneyUni.addMoney(landData.settings.owner, price);
                }
                //成功提示
                //成功提示
                let fm = mc
                    .newSimpleForm()
                    .setTitle(i18n.$t("recycle.gui.title"))
                    .setContent(i18n.$t("recycle.gui.success"));
                player.sendForm(fm, (pl, dt) => {});
            }
        }
    );
}
function reEnclosingHander(player, landId, isOrg) {
    let landData;
    if (isOrg) {
        landData = OlandDataInterface.data[landId];
    } else {
        landData = pLandDataInterface.data[landId];
    }
    playerState[player.xuid].state = "reEnclosing";
    playerState[player.xuid].editingLand.landId = landId;
    playerState[player.xuid].editingLand.isOrg = isOrg;
    playerState[player.xuid].enclosure.posA = data.parseJson(
        data.toJson(landData.range.max_position)
    );
    playerState[player.xuid].enclosure.posB = data.parseJson(
        data.toJson(landData.range.min_position)
    );
    playerState[player.xuid].enclosure.dim = data.parseJson(
        data.toJson(landData.range.dimid)
    );
}
function ReEnclosingScan(player) {
    let landId = playerState[player.xuid].editingLand.landId;
    let landData;
    if (playerState[player.xuid].editingLand.isOrg) {
        landData = OlandDataInterface.data[landId];
    } else {
        landData = pLandDataInterface.data[landId];
    }
    let posInter = twoPosFormat(
        playerState[player.xuid].enclosure.posA,
        playerState[player.xuid].enclosure.posB
    );
    // 检查坐标
    if (posInter.maxY > 319) {
        posInter.maxY = 319;
    }
    if (posInter.minY < -64) {
        posInter.minY = -64;
    }
    if (playerState[player.xuid].enclosure.type2D) {
        posInter.minY = -64;
        posInter.maxY = 319;
    }
    posInter.dy = posInter.maxY - posInter.minY;
    // 维度限制
    if (
        !configAPI.data.limit.allowDimension.includes(
            playerState[player.xuid].enclosure.dim
        ) &&
        !configAPI.data.operator.includes(player.xuid)
    ) {
        // 玩家不是管理员且圈地位置不在允许范围内
        player.tell(i18n.$t("enclose.confirm.dimensionNotAllow"));
    }
    if (getLand(player.xuid).length >= configAPI.data.limit.maxLands) {
        let fm = mc
            .newSimpleForm()
            .setTitle(i18n.$t("enclose.confirm.countover.title"))
            .setContent(
                i18n.$t("enclose.confirm.countover.info", [
                    configAPI.data.limit.maxLands,
                ])
            );
        player.sendForm(fm, () => {});
    }
    // 大小限制
    if (playerState[player.xuid].enclosure.type2D) {
        let square = posInter.dx * posInter.dz;
        if (
            square > configAPI.data.limit.type2DSquare[1] ||
            square < configAPI.data.limit.type2DSquare[0]
        ) {
            let fm = mc
                .newSimpleForm()
                .setTitle(i18n.$t("enclose.confirm.over"))
                .setContent(
                    i18n.$t("enclose.confirm.2D.over", [
                        square,
                        configAPI.data.limit.type2DSquare[1],
                        configAPI.data.limit.type2DSquare[0],
                    ])
                );
            player.sendForm(fm, () => {});
            return;
        }
    } else {
        let volume = posInter.dx * posInter.dz * posInter.dz;
        if (
            volume > configAPI.data.limit.type3DVolume[1] ||
            volume < configAPI.data.limit.type3DVolume[0]
        ) {
            let fm = mc
                .newSimpleForm()
                .setTitle(i18n.$t("enclose.confirm.over"))
                .setContent(
                    i18n.$t("enclose.confirm.3D.over", [
                        volume,
                        configAPI.data.limit.type3DVolume[1],
                        configAPI.data.limit.type3DVolume[0],
                    ])
                );
            player.sendForm(fm, () => {});
            return;
        }
    }
    //私人领地白名单
    let pWhiteList = playerState[player.xuid].editingLand.isOrg
        ? getPLandinRange(
              twoPosFormat(
                  landData.range.min_position,
                  landData.range.max_position
              ),
              playerState[player.xuid].enclosure.dim,
              playerState[player.xuid].enclosure.type2D
          )
        : [landId];
    let conflictLandId;
    // 团队领地冲突检查：
    if (enableOrg) {
        conflictLandId = getOLandConflict(
            posInter,
            playerState[player.xuid].enclosure.dim,
            playerState[player.xuid].enclosure.type2D,
            [playerState[player.xuid].editingLand.isOrg ? landId : "没有"],
            player,
            playerState[player.xuid].editingLand.isOrg
        );
        if (conflictLandId) {
            // 发现冲突
            let fm = mc
                .newSimpleForm()
                .setTitle(i18n.$t("enclose.conflict.title"))
                .setContent(i18n.$t("enclose.conflict.org", [conflictLandId]));
            player.sendForm(fm, () => {});
            return;
        }
    }
    // 私人领地冲突检查
    conflictLandId = getPLandConflict(
        posInter,
        playerState[player.xuid].enclosure.dim,
        playerState[player.xuid].enclosure.type2D,
        pWhiteList
    );
    if (conflictLandId) {
        // 发现冲突
        let fm = mc
            .newSimpleForm()
            .setTitle(i18n.$t("enclose.conflict.title"))
            .setContent(i18n.$t("enclose.conflict.pri", [conflictLandId]));
        player.sendForm(fm, () => {});
        return;
    }
    //计算价格
    let newPrice = 0;
    if (playerState[player.xuid].enclosure.type2D) {
        // 2D地皮价格
        newPrice =
            posInter.dx * posInter.dz * configAPI.data.sell.type2D.priceSquare;
    } else if (configAPI.data.sell.type3D.priceY) {
        newPrice =
            posInter.dx * posInter.dz * configAPI.data.sell.type3D.priceXZ +
            posInter.dy * configAPI.data.sell.type3D.priceY;
    } else {
        newPrice =
            posInter.dx *
            posInter.dy *
            posInter.dz *
            configAPI.data.sell.type3D.priceXZ;
    }

    let oldIntr = twoPosFormat(
        landData.range.min_position,
        landData.range.max_position
    );
    let oldPrice = 0;
    if (landData.range.type2D) {
        // 2D地皮价格
        oldPrice =
            oldIntr.dx * oldIntr.dz * configAPI.data.sell.type2D.priceSquare;
    } else if (configAPI.data.sell.type3D.priceY) {
        oldPrice =
            oldIntr.dx * oldIntr.dz * configAPI.data.sell.type3D.priceXZ +
            oldIntr.dy * configAPI.data.sell.type3D.priceY;
    } else {
        oldPrice =
            oldIntr.dx *
            oldIntr.dy *
            oldIntr.dz *
            configAPI.data.sell.type3D.priceXZ;
    }
    let price = newPrice - oldPrice;
    if (price < 0) {
        price = price * configAPI.data.refund.rate;
    }
    //生成付款页面
    if (!playerState[player.xuid].editingLand.isOrg) {
        // 直接发送付款页面
        if (moneyUni.get(player) < price) {
            // 钱不够
            let fm = mc
                .newSimpleForm()
                .setTitle(i18n.$t("enclose.payment.title"))
                .setContent(
                    i18n.$t("enclose.payment.moneyNoEnough", [
                        configAPI.data.economy.moneyName,
                        String(price),
                        moneyUni.get(player),
                    ])
                );
            player.sendForm(fm, () => {});
        } else {
            // 钱够
            player.sendModalForm(
                i18n.$t("enclose.payment.title"),
                i18n.$t("enclose.payment.pri", [
                    String(price),
                    moneyUni.get(player),
                ]),
                i18n.$t("common.confirm"),
                i18n.$t("common.cancel"),
                (pl, dt) => {
                    if (dt == null) {
                        return;
                    }
                    if (dt) {
                        if (!moneyUni.pay(player, price)) {
                            player.tell(i18n.$t("enclose.payment.error"));
                            return;
                        }
                        ReEncloseMain(
                            pl,
                            landId,
                            playerState[pl.xuid].editingLand.isOrg,
                            posInter
                        );
                        //encloseMain(pl, posInterface);
                    }
                }
            );
        }
    } else {
        // 是公会，要求其选择自己的钱包还是公会钱包
        if (
            moneyUni.get(player) < price &&
            orgAPI.orgGetMoney(landData.settings.owner) < price
        ) {
            // 完全没钱
            let fm = mc
                .newSimpleForm()
                .setTitle(i18n.$t("enclose.payment.title"))
                .setContent(
                    i18n.$t("enclose.payment.moneyNoEnough", [
                        configAPI.data.economy.moneyName,
                        String(price),
                        moneyUni.get(player),
                    ])
                );
            player.sendForm(fm, (pla, dt) => {
                ManageLand(pla, landId, isOrg);
            });
            return;
        } else if (moneyUni.get(player) < price) {
            // 工会基金钱够
            player.sendModalForm(
                i18n.$t("enclose.payment.title"),
                i18n.$t("enclose.payment.ori", [
                    String(price),
                    orgAPI.orgGetMoney(landData.settings.owner),
                ]),
                i18n.$t("common.confirm"),
                i18n.$t("common.cancel"),
                (pl, dt) => {
                    if (dt == null) {
                        return;
                    }
                    if (dt) {
                        if (
                            !orgAPI.orgAddMoney(landData.settings.owner, -price)
                        ) {
                            pl.tell(i18n.$t("enclose.payment.error"));
                            return;
                        }
                        //encloseMain(pl, posInterface, orgNum);
                        ReEncloseMain(
                            pl,
                            landId,
                            playerState[pl.xuid].editingLand.isOrg,
                            posInter
                        );
                    }
                }
            );
            return;
        } else if (orgAPI.orgGetMoney(landData.settings.owner) < price) {
            // 玩家钱包钱够
            player.sendModalForm(
                i18n.$t("enclose.payment.title"),
                i18n.$t("enclose.payment.pri", [
                    String(price),
                    moneyUni.get(player),
                ]),
                i18n.$t("common.confirm"),
                i18n.$t("common.cancel"),
                (pl, dt) => {
                    if (dt == null) {
                        return;
                    }
                    if (dt) {
                        if (price >= 0) {
                            if (!moneyUni.pay(pl, price)) {
                                pl.tell(i18n.$t("enclose.payment.error"));
                                return;
                            }
                            ReEncloseMain(
                                pl,
                                landId,
                                playerState[pl.xuid].editingLand.isOrg,
                                posInter
                            );
                        } else {
                            if (!moneyUni.addMoney(pl.xuid, -price)) {
                                pl.tell(i18n.$t("enclose.payment.error"));
                                return;
                            }
                            ReEncloseMain(
                                pl,
                                landId,
                                playerState[pl.xuid].editingLand.isOrg,
                                posInter
                            );
                        }
                        //encloseMain(pl, posInterface, orgNum);
                    }
                }
            );
        } else {
            // 钱都够
            player.sendModalForm(
                i18n.$t("enclose.payment.title"),
                i18n.$t("enclose.payment.choose", [
                    String(price),
                    moneyUni.get(player),
                    orgAPI.orgGetMoney(landData.settings.owner),
                ]),
                i18n.$t("enclose.pay.self"),
                i18n.$t("enclose.pay.org"),
                (pl, dt) => {
                    if (dt == null) {
                        return;
                    }
                    if (dt) {
                        if (price >= 0) {
                            if (!moneyUni.pay(pl, price)) {
                                pl.tell(i18n.$t("enclose.payment.error"));
                                return;
                            }
                            ReEncloseMain(
                                pl,
                                landId,
                                playerState[pl.xuid].editingLand.isOrg,
                                posInter
                            );
                        } else {
                            if (!moneyUni.addMoney(pl.xuid, -price)) {
                                pl.tell(i18n.$t("enclose.payment.error"));
                                return;
                            }
                            ReEncloseMain(
                                pl,
                                landId,
                                playerState[pl.xuid].editingLand.isOrg,
                                posInter
                            );
                        }
                    } else {
                        if (
                            !orgAPI.orgAddMoney(landData.settings.owner, -price)
                        ) {
                            pl.tell(i18n.$t("enclose.payment.error"));
                            return;
                        }
                        //encloseMain(pl, posInterface, orgNum);
                        ReEncloseMain(
                            pl,
                            landId,
                            playerState[pl.xuid].editingLand.isOrg,
                            posInter
                        );
                    }
                }
            );
        }
    }
}
/**
 *
 * @param {player} pl
 * @param {string} landId
 * @param {boolean} isOrg
 * @param {posInterface} posInterface
 */
function ReEncloseMain(player, landId, isOrg, posInterface) {
    /**
     * @type {landData}
     */
    let landData;
    if (isOrg) {
        landData = OlandDataInterface.data[landId];
    } else {
        landData = pLandDataInterface.data[landId];
    }
    const range = {
        type2D: playerState[player.xuid].enclosure.type2D,
        dimid: landData.range.dimid,
        min_position: [posInterface.minX, posInterface.minY, posInterface.minZ],
        max_position: [posInterface.maxX, posInterface.maxY, posInterface.maxZ],
    };
    //删除旧的索引
    if (isOrg) {
        ChunkInterface.unlinkOrg(
            landData.range.min_position[0],
            landData.range.max_position[0],
            landData.range.min_position[2],
            landData.range.max_position[2],
            landData.range.dimid,
            landId
        );
        OlandDataInterface.data[landId].range = range;
        ChunkInterface.linkOrg(landId);
        OlandDataInterface.save();
    } else {
        ChunkInterface.unlinkPrivate(
            landData.range.min_position[0],
            landData.range.max_position[0],
            landData.range.min_position[2],
            landData.range.max_position[2],
            landData.range.dimid,
            landId
        );
        pLandDataInterface.data[landId].range = range;
        ChunkInterface.linkPrivate(landId);
        pLandDataInterface.save();
    }
    if (configAPI.data.common.enableCache) {
        ChunkInterface.save();
        cache.clean();
    }
    player.tell(i18n.$t("reEnclosing.success"));
    if (playerState[player.xuid].state === "reEnclosing") {
        playerState[player.xuid].editingLand.landId = "";
    }
    playerState[player.xuid].state = "playing";
}

//含有离线玩家的数据表
const playerDB = {
    /**
     * @type {Object<string,string>};
     */
    data: {},
    save() {
        File.writeTo(
            "./plugins/js_data/landEX/playerDB.json",
            data.toJson(this.data)
        );
    },
    reload() {
        this.data = data.parseJson(
            File.readFrom("./plugins/js_data/landEX/playerDB.json")
        );
    },
};
// 读取已有的配置文件
if (File.exists("./plugins/js_data/landEX/playerDB.json")) {
    configAPI.reload();
} else {
    configAPI.save();
}

/**
 * 玩家选择器
 * @param {player} player 使用选择器的玩家
 * @param {playerSelectorCallback} callback
 * 返回目标玩家
 * @callback playerSelectorCallback
 * @param {player} player
 * @param {string} xuid
 *
 */
function playerSelector(player, callback, playerList = {}, search = "") {
    for (const player of mc.getOnlinePlayers()) {
        playerList[player.xuid] = player.realName;
    }
    let fm = mc
        .newCustomForm()
        .setTitle(i18n.$t("manage.playerSelector.title"))
        .addLabel(i18n.$t("manage.playerSelector.tips"));
    fm.addInput(
        i18n.$t("manage.playerSelector.search"),
        i18n.$t("manage.playerSelector.searchInput"),
        search
    );
    fm.addDropdown(
        i18n.$t("manage.playerSelector.choose"),
        Object.values(playerList)
    );
    player.sendForm(fm, (pl, dt) => {
        if (dt == null) {
            //玩家取消，直接回调
            callback(pl, "");
            return;
        }
        if (dt[1] !== "") {
            //玩家进行搜索，返回搜索结果
            let tempPlayerList = {};
            for (const key in playerDB.data) {
                const element = playerDB.data[key];
                if (element.includes(dt[1])) {
                    tempPlayerList[key] = element;
                }
            }
            if (Object.keys(tempPlayerList).length === 0) {
                //搜索没出东西
                playerSelector(pl, callback, playerList, dt[1]);
                return;
            } else {
                //搜索出来了
                playerSelector(pl, callback, tempPlayerList, "");
                return;
            }
        } else {
            callback(pl, Object.keys(playerList)[dt[2]]);
        }
    });
}

/**
 *
 * @param {player} player
 * @param {string} landId
 * @param {boolean} isOrg
 */
function changeOwnerHander(player, landId, isOrg) {
    playerSelector(player, (pl, xuid) => {
        if (xuid === "") {
            ManageLand(pl, landId, isOrg);
            return;
        }
        player.sendModalForm(
            i18n.$t("changeOwner.title"),
            i18n.$t("changeOwner.confirm", [data.xuid2name(xuid)]),
            i18n.$t("common.YES"),
            i18n.$t("common.NO"),
            (pl, dt) => {
                if (dt) {
                    let oldOwner =
                        pLandDataInterface.data[landId].settings.owner;
                    //先处理旧的，再添加新的
                    belongToApi.playerRemoveLand(oldOwner, landId);
                    belongToApi.playerAddShare(oldOwner, landId);
                    pLandDataInterface.data[landId].settings.owner = xuid;
                    //处理新的
                    if (
                        belongToApi.data.shared[xuid] &&
                        belongToApi.data.shared[xuid].includes(landId)
                    ) {
                        belongToApi.playerRemoveShare(xuid, landId);
                    }
                    belongToApi.playerAddLand(xuid, landId);
                    //保存之
                    belongToApi.save();
                    pLandDataInterface.save();
                    pl.tell(i18n.$t("changeOwner.success"));
                }
            }
        );
    });
}

function sharedManageHander(player, landId, isOrg) {
    /**
     * @type {landData}
     */
    let landData;
    if (isOrg) {
        landData = OlandDataInterface.data[landId];
    } else {
        landData = pLandDataInterface.data[landId];
    }
    let fm = mc.newSimpleForm().setTitle(i18n.$t("shared.title"));
    let sharedPlayer = "";
    for (const item of landData.share) {
        sharedPlayer += data.xuid2name(item) + "\n";
    }
    fm.setContent(i18n.$t("shared.desp", [sharedPlayer]));
    fm.addButton(i18n.$t("shared.add"), "textures/blocks/build_allow");
    if (landData.share.length !== 0) {
        fm.addButton(i18n.$t("shared.remove"), "textures/blocks/build_deny");
    }
    player.sendForm(fm, (pl, dt) => {
        if (dt == null) {
            ManageLand(pl, landId, isOrg);
            return;
        }
        if (dt === 1) {
            //删除
            let fm = mc.newCustomForm().setTitle(i18n.$t("shared.title"));
            let playername = {};
            for (const player of landData.share) {
                if (data.xuid2name(player)) {
                    playername[player] = data.xuid2name(player);
                }
            }
            fm.addDropdown(i18n.$t("shared.remove"), Object.values(playername));
            pl.sendForm(fm, (plar, dt) => {
                if (dt == null) {
                    sharedManageHander(plar, landId, isOrg);
                    return;
                }
                let targetXuid = Object.keys(playername)[dt[0]];
                pLandDataInterface.data[landId].share.splice(
                    landData.share.indexOf(targetXuid),
                    1
                );
                belongToApi.playerRemoveShare(targetXuid, landId);
                pLandDataInterface.save();
                belongToApi.save();
                let fm = mc
                    .newSimpleForm()
                    .setTitle(i18n.$t("shared.title"))
                    .setContent(i18n.$t("shared.deleteSuccess"));
                plar.sendForm(fm, (plar, dt) => {
                    sharedManageHander(plar, landId, isOrg);
                });
            });
        } else if (dt === 0) {
            playerSelector(pl, (pla, xuid) => {
                if (landData.share.includes(xuid)) {
                    let fm = mc
                        .newSimpleForm()
                        .setTitle(i18n.$t("shared.title"))
                        .setContent(i18n.$t("shared.hasInclude"));
                    pla.sendForm(fm, (plar, dt) => {
                        sharedManageHander(plar, landId, isOrg);
                    });
                    return;
                } else {
                    pLandDataInterface.data[landId].share.push(xuid);
                    belongToApi.playerAddShare(xuid, landId);
                    pLandDataInterface.save();
                    belongToApi.save();

                    let fm = mc
                        .newSimpleForm()
                        .setTitle(i18n.$t("shared.title"))
                        .setContent(i18n.$t("shared.success"));
                    pla.sendForm(fm, (plar, dt) => {
                        sharedManageHander(plar, landId, isOrg);
                    });
                }
            });
        }
    });
}

function landResellManager(player, landId, isOrg) {
    let landData = pLandDataInterface.data[landId];
    let fm = mc
        .newCustomForm()
        .setTitle(i18n.$t("resell.title"))
        .addLabel(i18n.$t("resell.desp"));
    fm.addInput(
        i18n.$t("resell.setprice"),
        i18n.$t("resell.setpriceDesp"),
        landData.resell ? String(landData.resell) : ""
    );
    player.sendForm(fm, (pl, dt) => {
        if (dt == null) {
            ManageLand(pl, landId, isOrg);
            return;
        }
        if (dt[1] === "") {
            //删除
            delete pLandDataInterface.data[landId].resell;
            pLandDataInterface.save();
            let fm = mc
                .newSimpleForm()
                .setTitle(i18n.$t("resell.title"))
                .setContent(i18n.$t("resell.success"));
            player.sendForm(fm, (pla, dt) => {
                ManageLand(pla, landId, isOrg);
            });
            return;
        }
        if (isNaN(dt[1])) {
            //不是数字
            let fm = mc
                .newSimpleForm()
                .setTitle(i18n.$t("resell.title"))
                .setContent(i18n.$t("resell.buy.isNaN"));
            player.sendForm(fm, (pla, dt) => {
                landResellManager(pla, landId, isOrg);
            });
            return;
        }
        //设置
        pLandDataInterface.data[landId].resell = parseInt(dt[1]);
        pLandDataInterface.save();
        let fm = mc
            .newSimpleForm()
            .setTitle(i18n.$t("resell.title"))
            .setContent(i18n.$t("resell.success"));
        player.sendForm(fm, (pla, dt) => {
            ManageLand(pla, landId, isOrg);
        });
        return;
    });
}

/**
 *
 * @param {player} player
 */
function landResell(player) {
    let pos = player.blockPos;
    let landId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
    if (!landId) {
        player.tell(i18n.$t("resell.noforsell"));
        return;
    }
    let landData = pLandDataInterface.data[landId];
    if (!landData.resell) {
        player.tell(i18n.$t("resell.noforsell"));
        return;
    }
    if (landData.resell > moneyUni.get(player)) {
        player.tell(i18n.$t("resell.buy.moneyNoEnough"));
        return;
    }
    player.sendModalForm(
        i18n.$t("resell.title"),
        i18n.$t("resell.buy.desp", [landData.resell, landData.settings.name]),
        i18n.$t("common.YES"),
        i18n.$t("common.NO"),
        (pl, dt) => {
            if (dt) {
                moneyUni.pay(pl, landData.resell);
                moneyUni.addMoney(
                    pLandDataInterface.data[landId].settings.owner,
                    landData.resell
                );
                pLandDataInterface.data[landId].settings.owner = pl.xuid;
                delete pLandDataInterface.data[landId].resell;
                pLandDataInterface.save();
                pl.tell(i18n.$t("resell.buy.success"));
            }
        }
    );
}

mc.regConsoleCmd("landex", "公会EX", (args) => {
    if (!args[0]) {
        log(i18n.$t("console.error"));
        return;
    }
    switch (args[0]) {
        case "op":
            {
                if (!args[1]) {
                    log(i18n.$t("console.error"));
                    return;
                }
                let xuid = data.name2xuid(args[1]);
                if (!xuid) {
                    log(i18n.$t("console.opNoPlayer"));
                    return;
                }
                if (!configAPI.data.operator.includes(xuid)) {
                    configAPI.data.operator.push(xuid);
                    configAPI.save();
                    log(i18n.$t("console.opPlayer", [args[1], xuid]));
                    return;
                }
                log(i18n.$t("console.noFinish", [args[1], xuid]));
            }
            break;
        case "deop":
            {
                if (!args[1]) {
                    log(i18n.$t("console.error"));
                    return;
                }
                let xuid = data.name2xuid(args[1]);
                if (!xuid) {
                    log(i18n.$t("console.opNoPlayer"));
                    return;
                }
                if (configAPI.data.operator.includes(xuid)) {
                    configAPI.data.operator.splice(
                        configAPI.data.operator.indexOf(xuid),
                        1
                    );
                    configAPI.save();
                    log(i18n.$t("console.deopPlayer", [args[1], xuid]));
                    return;
                }
                log(i18n.$t("console.noFinish", [args[1], xuid]));
            }
            break;
        default:
            log(i18n.$t("console.error"));
            break;
    }
});

function DashBoardInit(player) {
    if (!configAPI.data.operator.includes(player.xuid)) {
        player.tell(i18n.$t("dashboard.noPrem"));
        //没有权限
        return;
    }
    let fm = mc.newSimpleForm().setTitle(i18n.$t("dashboard.main.title"));
    fm.addButton(
        i18n.$t("dashboard.main.byUUID"),
        "textures/items/amethyst_shard"
    );
    fm.addButton(
        i18n.$t("dashboard.main.byPlayer"),
        "textures/items/netherite_helmet"
    );
    fm.addButton(i18n.$t("dashboard.main.byOrgNum"), "textures/items/name_tag");
    fm.addButton(i18n.$t("dashboard.main.this"), "textures/items/map_filled");
    player.sendForm(fm, (pl, dt) => {
        if (dt == null) {
            return;
        }
        switch (dt) {
            case 0:
                UUIDManage(pl);
                break;
            case 1:
                playerSelector(pl, (pl, xuid) => {
                    if (!xuid) {
                        return;
                    }
                    PlayerNameManage(pl, xuid);
                });
                break;
            case 2:
                let numList = Object.keys(belongToApi.data.org);
                let fm = mc
                    .newSimpleForm()
                    .setTitle(i18n.$t("dashboard.main.title"));
                for (const orgNum of numList) {
                    fm.addButton(
                        i18n.$t("dashboard.org.item", [
                            orgAPI.getOrgName(orgNum),
                            orgNum,
                        ])
                    );
                }
                pl.sendForm(fm, (pl, dt) => {
                    if (dt == null) {
                        DashBoardInit(pl);
                        return;
                    }
                    let orgNum = numList[dt];
                    let landList = [];
                    let tLandList = belongToApi.data.org[orgNum];
                    if (tLandList) {
                        for (const landId of tLandList) {
                            let landData = OlandDataInterface.data[landId];
                            landList.push({
                                landId,
                                name: landData.settings.name,
                            });
                        }
                    }
                    //构建临时表完成，进行渲染。
                    let fm = mc.newSimpleForm();
                    fm.setTitle(i18n.$t("dashboard.main.title"));
                    for (const item of landList) {
                        if (item.isOrg) {
                            fm.addButton(
                                i18n.$t("dashboard.gui.Orgitem", [item.name])
                            );
                        } else {
                            fm.addButton(
                                i18n.$t("dashboard.gui.Priitem", [item.name])
                            );
                        }
                    }
                    pl.sendForm(fm, (pl, dt) => {
                        let landId = landList[dt].landId;
                        ManageLand(pl, landId, true);
                    });
                });
                break;
            case 3:
                let pos = pl.blockPos;
                let pLandId = getPLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
                let oLandId = getOLandIdbyPos(pos.x, pos.y, pos.z, pos.dimid);
                let permisstion = [!!pLandId, !!oLandId];
                if (permisstion[0] && permisstion[1]) {
                    //俩都允许，弹出窗口任选
                    pl.sendModalForm(
                        i18n.$t("this.manage.choose.title"),
                        i18n.$t("this.manage.choose.desp"),
                        i18n.$t("this.manage.choose.org"),
                        i18n.$t("this.manage.choose.pri"),
                        (pl, dt) => {
                            if (dt == null) {
                                return;
                            }
                            if (dt) {
                                ManageLand(pl, oLandId, true);
                            } else {
                                ManageLand(pl, pLandId, false);
                            }
                        }
                    );
                } else if (permisstion[0]) {
                    ManageLand(pl, pLandId, false);
                } else if (permisstion[1]) {
                    ManageLand(pl, oLandId, true);
                } else {
                    //此处无垠三百两，告知
                    pl.tell(i18n.$t("this.manage.noland"));
                }
                break;
            default:
                break;
        }
    });
}

/**
 *
 * @param {player} player
 * @param {string} xuid
 */
function PlayerNameManage(player, xuid) {
    let landList = [];
    let tLandList = belongToApi.data.player[xuid];
    if (tLandList) {
        for (const landId of tLandList) {
            let landData = pLandDataInterface.data[landId];
            landList.push({
                landId,
                name: landData.settings.name,
            });
        }
    }
    //构建临时表完成，进行渲染。
    let fm = mc.newSimpleForm();
    fm.setTitle(i18n.$t("dashboard.main.title"));
    for (const item of landList) {
        if (item.isOrg) {
            fm.addButton(i18n.$t("dashboard.gui.Orgitem", [item.name]));
        } else {
            fm.addButton(i18n.$t("dashboard.gui.Priitem", [item.name]));
        }
    }
    player.sendForm(fm, (pl, dt) => {
        if (dt == null) {
            DashBoardInit(pl);
            return;
        }
        ManageLand(pl, landList[dt].landId, false);
    });
}

function UUIDManage(player) {
    let fm = mc.newCustomForm().setTitle(i18n.$t("dashboard.main.title"));
    fm.addInput(i18n.$t("dashboard.uuid.label"));
    fm.addSwitch(i18n.$t("dashboard.uuid.isOrg"));
    player.sendForm(fm, (pl, dt) => {
        if (dt == null) {
            DashBoardInit(pl);
            return;
        }
        let isOrg = !!dt[1];
        let LandId = dt[0];
        if (
            (isOrg && !OlandDataInterface.data[LandId]) ||
            (!isOrg && !pLandDataInterface.data[LandId])
        ) {
            let fm = mc
                .newSimpleForm()
                .setTitle(i18n.$t("dashboard.main.title"))
                .setContent(i18n.$t("dashboard.uuid.nofound"));
            player.sendForm(fm, (pla, dt) => {
                UUIDManage(pla);
            });
            return;
        }
        ManageLand(pl, LandId, isOrg);
    });
}

//图片文字制作
logger.log(
    "欢迎使用LandEX\n __          ___      .__   __.  _______   __________   ___ \r\n|  |        /   \\     |  \\ |  | |       \\ |   ____\\  \\ /  / \r\n|  |       /  ^  \\    |   \\|  | |  .--.  ||  |__   \\  V  /  \r\n|  |      /  /_\\  \\   |  . `  | |  |  |  ||   __|   >   <   \r\n|  `----./  _____  \\  |  |\\   | |  '--'  ||  |____ /  .  \\  \r\n|_______/__/     \\__\\ |__| \\__| |_______/ |_______/__/ \\__\\ \r\n"
);
