![](screenshots/logo.jpg)

# LandEX - 新一代的地皮管理插件

LandEX 是一个基于 LLSE 的 MC 地皮管理插件，基于 JavaScript 为玩家带来高效便捷的地皮使用体验。插件原生支持真命令注册，服内大量 GUI 管理，并可与 OrgEX、LandEX 与 DrawLine 插件联动。

### 联系作者

| <img title="" src="https://avatars.githubusercontent.com/u/67225334" alt="https://avatars.githubusercontent.com/u/67225334" width="125"> | https://github.com/VoryWork |
| ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |

## 插件特性

- **非常易用**：即使没有文档，大部分玩家也能自己摸索透。

- **多语言**：对语言进行导出，为多语言提供支持。

- **超多管理项**：精细划分玩家权限，对领地进行集约化管理

- **完全开源**：代码规范，绝无后门，欢迎监督！

- **双经济系统**：支持 LLMoney 与计分板双经济系统

- **多计费模式**：支持按面积\体积\混合模式计费

- **客制化**：支持服主修改各类配置

- **独立权限管理**：独立设置领地管理员，每片领地可单独设置分享的玩家

- **方便迁移**：支持从其他领地插件迁移数据

- **性能优越**：使用索引+缓存机制，极大减少了时间复杂度。

- **领地传送**：允许玩家设置传送点，快速传送到领地

- **领地转卖**：允许玩家自行设置价格转卖领地

## 使用截图

| <img src="screenshots/Landmanage.png" title="领地管理" alt="" width="219"> | <img src="screenshots/LandPerm.png" title="权限管理" alt="权限管理" width="211"> | <img src="screenshots/LandName.png" title="" alt="" width="221"> |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------- |

![边缘显示](screenshots/engeLine.png "边缘显示")

![真命令注册](screenshots/realConnmand.png "真命令注册")

## 安装教程

### 初始化插件

1. 下载[BDS](https://www.minecraft.net/en-us/download/server/bedrock)并加载[LiteLDev/LiteLoaderBDS](https://github.com/LiteLDev/LiteLoaderBDS)。

2. 下载最新版本的[LLandEX](https://github.com/VoryWork/LLandEX/releases)。

3. 将最新版本的 LandEX 解压至 BDS 根目录的 plugins 文件夹下。

4. 启动**bedrock_server_mod.exe**，等待插件创建配置文件.

5. 关闭服务器。

### 修改配置文件

请参考以下内容修改配置文件

配置文件位置：`plugins/js_data/landEX/config.json`

```json
{
    "economy": {
        //经济选项
        "useLLmoney": false, //使用LLmoney，false则为使用记分板
        "moneyScoreboard": "coin", //货币记分板
        "moneyName": "祭点" //服务器中的货币名称
    },
    "sell": {
        //领地价格
        "type3D": {
            //3D领地价格请看注释1
            "priceXZ": 2,
            "priceY": 0
        },
        "type2D": {
            //2D领地价格
            "priceSquare": 200
        }
    },
    "refund": {
        //领地回收价格
        "enable": true, //允许回收
        "rate": 0.9 //回收损耗，1则原价回收，0则回收无收益
    },
    "common": {
        //普通设置
        "language": "zh-cn", //插件语言
        "allow3D": true, //允许3D圈地
        "allow2D": true, //允许2D圈地
        "useOrgnization": true, //启用orgEX联动
        "allowLandTeleport": true, //允许传送到领地
        "useDrawLine": true, //启用框选例子
        "tickRate": 1000, //领地提示刷新时间，无特殊原因不改
        "enableCache": true, //是否启用缓存，建议启用
        "cacheSize": 512, //缓存区大小，无特殊原因不改
        "defaultSpawn": false //控制非领地区域是否自然生成
    },
    "limit": {
        "allowDimension": [
            //允许圈地的维度
            0, 1, 2
        ],
        "type2DSquare": [
            //2D圈地面积限制
            10, 10000
        ],
        "type3DVolume": [
            //3D圈地面积限制
            100, 384000
        ],
        "maxLands": 16 //领地数量限制
    },
    "operator": [
        //领地管理员的XUID
        "2535443490147382"
    ]
}
```

#### 3D 圈地价格设置

3D 领地有多种计价方式，可以参考以下以下伪代码

```js
if (priceY !== 0) price = dx * dz * priceXZ + dy * priceY;
else price = dx * dy * dz * priceXZ;
```

- 若您想按体积计费，可以将`priceY`设为 0，再将`priceXZ`设为单位体积的价格。

- 若您想要通过高度和面积混合计费，可根据算式`dx * dz * priceXZ + dy * priceY`设置。

- 更多计费方式可以提 issue

## 使用教程

### 常用命令说明

本插件所有命令均为真命令注册，输入`/land`可以获得 Tab 提示。

#### 圈地命令

> **/land enclose show**
> 
> 进入圈地模式并展示上次圈地记录、领地边框，若您已经在圈地模式，则仅会展示领地边框。
> 
> **/land enclose setpos1**
> 
> 设置框选点 1，您需要框选两个点确定圈地的范围。输入此命令自动进入圈地模式。
> 
> **/land enclose setpos2**
> 
> 设置框选点 2，您需要框选两个点确定圈地的范围。输入此命令自动进入圈地模式。
> 
> **/land enclose edit**
> 
> 手动输入具体数字修改圈地范围。
> 
> **/land enclose cancel**
> 
> 退出圈地模式
> 
> **/land enclose confirm**
> 
> 确认圈地范围，进行圈地。

#### 管理命令

> **/land this**
> 
> 管理脚下的领地
> 
> **/land dashboard**
> 
> 管理员领地选择器
> 
> **/land op <玩家名>**
> 
> 添加超级领地管理员

#### 其他命令

> **/land tp**
> 
> 进入领地传送
> 
> **/land buy**
> 
> 购买正在出售的领地
> 
> **/land help**
> 
> 测试命令，没什么用。

### 圈地教程

#### 启动圈地模式

您可以通过以下模式进入圈地模式：

1. 直接通过命令`/land enclose setpos1/2`选择一点，将自动进入圈地模式.

2. 通过命令`/land enclose show`手动进入圈地模式，通过此方法进入，**可以恢复上一次未完成圈地的数据**。

#### 选点

通过命令`/land enclose setpos 1/2`可以选择圈地范围的两个坐标，若您加载了**边缘显示**插件，选择两点后则可看到框选的边框。

![](screenshots/showEnclose.png)

#### 确认范围

若您想放弃圈地，可执行命令`/land enclose cancel`

若您已经确定了圈地范围，可执行命令`/land enclose comfirm`，继续圈地步骤

确认范围后，可选择圈地类型

<img title="" src="screenshots/selectType.png" alt="" width="467">

- 选择**2D/3D**类型的圈地，若您的配置文件中禁用了`allow2D`或`allow3D`则会跳过此选择步骤。

- 若您启用了领地工会联动，并且您是工会工会管理员，则还可能要求您选择圈地的归属，并且在`工会基金`和`个人钱包`资金均足够购买时，还会让您选择付款账户。

<img src="screenshots/buy.png" title="" alt="" width="466">

点击确认付款，即可完成圈地。

### 领地管理面板

可**通过以下方式**打开管理面板：

1. 领地所有者或管理员在领地内执行`/land this`

2. 领地管理员通过`/land dashboard`选择领地进行管理

3. ~~（还没做）领地所有者通过管理面板进行管理。

![](screenshots/Landmanage.png)

#### 领地信息

通过此项可以查看对应领地的基本信息

<img src="screenshots/landInfo.png" title="" alt="" width="469">

#### 标识设置

通过此项可以设置领地的名称等信息，以及其的展示策略。

<img src="screenshots/landID.png" title="" alt="" width="464">

- **领地名称（非常重要）**：本块领地的名称

- **领地描述**：可选，目前没什么用

- **底栏出入提示** ：在玩家进出领地时显示领地名称

- **显示领主**：在对话栏显示领地的主人

- **显示领地边界**：在玩家进出领地时显示领地边界

![](screenshots/engeLineDesp.png)

#### 事件管理

可以管理领地内能发生的事件

<img title="" src="screenshots/events.png" alt="" width="396">

注意：

- 活塞推动方块关闭后，当活塞推动的是空气或实体，活塞仍可伸缩。若想阻止活塞伸缩，请从`权限管理->红石`关闭。

- 耕地退化似乎无法阻止因缺水引起的退化（待求证）？

- **方块改变非常强力！** 请勿随意关闭！需要使用时请先测试效果。

## 等待制作

- [ ] 玩家领地管理面板

- [ ] 基于 Sqlite 的领地索引系统

- [x] 从 iLand 导入领地数据

- [ ] 从 pfes、pfland、land-g7 等其他领地插件导入数据
