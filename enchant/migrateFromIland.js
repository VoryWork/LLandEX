/**
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

if (!file.exists("./plugins/js_data/landEX/")) {
    log("首次运行，创建文件夹");
    file.mkdir("./plugins/js_data/landEX/");
}
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
     * @param {player} player
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
     * @param {player} player
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
            !this.data.shared[xuid].indexOf(landId),
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
            !this.data.player[xuid].indexOf(landId),
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
        this.data.org[orgNum].splice(!this.data.org[orgNum].indexOf(landId), 1);
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
        file.writeTo(
            "./plugins/js_data/landEX/owner.json",
            data.toJson(this.data, 4)
        );
    },
    reload() {
        this.data = data.parseJson(
            File.readFrom("./plugins/js_data/landEX/owner.json")
        );
    },
};

if (file.exists("./plugins/js_data/landEX/owner.json")) {
    belongToApi.reload();
} else {
    belongToApi.save();
}

const pLandDataInterface = {
    /**
     * @type {Object<string,landData>}
     */
    data: {},
    save() {
        file.writeTo(
            "./plugins/js_data/landEX/priviteLandData.json",
            data.toJson(this.data, 4)
        );
    },
    load() {
        this.data = data.parseJson(
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
if (file.exists("./plugins/js_data/landEX/priviteLandData.json")) {
    pLandDataInterface.load();
} else {
    pLandDataInterface.save();
}

const oldLandData = data.parseJson(File.readFrom("./plugins/iland/data.json"));

for (const key in oldLandData["Lands"]) {
    const element = oldLandData["Lands"][key];
    pLandDataInterface.data[key] = {
        range: {
            type2D:
                element.range.end_position[1] === 320 &&
                element.range.start_position[1] === -64,
            min_position: element.range.start_position,
            dimid: element.range.dimid,
            max_position: element.range.end_position,
        },
        settings: {
            notifyItemBar: element.settings.signbuttom,
            notifytoPlayer: element.settings.signtother,
            notifytoOwner: element.settings.signtome,
            drawCube: true,
            describe: element.settings.describe,
            owner: "", //之后再设置
            name: element.settings.nickname,
        },
        share: element.settings.share,
        teleport: element.settings.teleport,
        events: {
            pistonPush: element.settings.ev_piston_push,
            fireSpread: element.settings.ev_fire_spread,
            explode: element.settings.ev_explode,
            redstoneUpdate: element.settings.ev_redstone_update,
            farmlandDecay: element.settings.ev_farmland_decay,
            liquidFlow: true,
            blockChange: true,
        },
        permissions: {
            blocks: {
                blockPlace: element.permissions.allow_place, // 允许放置方块
                itemPickUp: element.permissions.allow_pickupitem, // 允许捡东西
                blockDestory: element.permissions.allow_destroy, // 允许破解方块
                itemDrop: element.permissions.allow_dropitem, // 允许丢弃物品
                openDoor: element.permissions.use_door,
                useFenceGate: element.permissions.use_fence_gate,
                useTrapdoor: element.permissions.use_trapdoor,
            },
            entity: {
                allowRideEntity: true,
                allowEntityDestroy: false,
                allowUseBoat: true,
                allowUseMinecart: true,
                allowShoot: true,
                allowAttackEntity: true,
            },
            container: {
                openShulkerBox: element.permissions.use_shulker_box,
                useFrameBlock: false, // 使用展示框
                openChest: element.permissions.allow_open_chest,
                openBarrel: element.permissions.use_barrel,
                openHopper: element.permissions.use_hopper,
            },
            redStone: {
                pressButton: element.permissions.use_button,
                useLever: element.permissions.use_lever,
                usePressurePlate: element.permissions.use_pressure_plate,
                useDispenser: element.permissions.use_dispenser, // 允许发射器
                useDropper: element.permissions.use_dropper, // 允许投掷器
                useDaylightDetector: element.permissions.use_daylight_detector,
                changeComparator: true,
                changeRepeater: true,
                HopperChange: true, // 漏斗
                pistonPush: element.settings.ev_piston_push,
            },
            tools: {
                useBell: element.permissions.use_bell,
                useLoom: element.permissions.use_loom,
                useJukebox: element.permissions.use_jukebox,
                useBeacon: element.permissions.use_beacon,
                useCraftingTable: element.permissions.use_crafting_table,
                useCartographyTable: element.permissions.use_cartography_table,
                useAnvil: element.permissions.use_anvil,
                useBucket: element.permissions.use_bucket,
                useBed: element.permissions.use_bed,
                useBlastFurnace: element.permissions.use_blast_furnace,
                useComposter: element.permissions.use_composter,
                useFurnace: element.permissions.use_furnace,
                useGrindstone: element.permissions.use_grindstone,
                useRespawnAnchor: element.permissions.use_respawn_anchor,
                useSmithingTable: element.permissions.use_smithing_table,
                useNoteBlock: element.permissions.use_noteblock,
                useArmorStand: element.permissions.use_armor_stand,
                useLectern: element.permissions.use_lectern, // 讲台
                useCampfire: element.permissions.use_campfire,
                useSmoker: element.permissions.use_smoker, // 烟熏炉
                useBrewingStand: element.permissions.use_brewing_stand, // 酿造台
                useEnchantingTable: element.permissions.use_enchanting_table, // 附魔台
                useFlint: element.permissions.use_firegen,
                useCauldron: element.permissions.use_cauldron,
                useStonecutter: element.permissions.use_stonecutter,
            },
            player: {
                eat: element.permissions.eat,
                fishing: element.permissions.use_fishing_hook,
                allowThrowPotion: element.permissions.allow_throw_potion,
                allowUseBoat: true,
                allowUseMinecart: true,
                allowShoot: element.permissions.allow_shoot,
                allowAttackAnimal: element.permissions.allow_attack_animal,
                allowAttackNeutral: element.permissions.allow_attack_animal,
                allowAttackPlayer: element.permissions.allow_attack_player,
                allowAttackMobs: element.permissions.allow_attack_mobs,
            },
        },
    };
    //添加共享玩家
    for (const xuid of element.settings.share) {
        belongToApi.playerAddShare(xuid, key);
    }
}

const oldBelongtoData = data.parseJson(
    File.readFrom("./plugins/iland/relationship.json")
);
for (const key in oldBelongtoData["Owner"]) {
    const landList = oldBelongtoData["Owner"][key];
    for (const landId of landList) {
        if (pLandDataInterface.data[landId]) {
            pLandDataInterface.data[landId].settings.owner = key;
            belongToApi.playerAddLand(key, landId);
        }
    }
}

logger.error("迁移成功！请重启landEX并删除本文件！");
pLandDataInterface.save();
belongToApi.save();
File.delete(".plugins/js_data/landEX/landIndex.json");
