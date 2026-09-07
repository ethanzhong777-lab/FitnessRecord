# EthanFitnessRecord

一个个人使用、数据本地优先的微信小程序，用于记录体重变化、安排每周增肌训练，并查看健身动作指导。

项目当前处于 **阶段 5：技术设计与数据契约**。环境、MVP 需求、交互原型和视觉规范均已冻结；下一步先完成数据契约，不提前编写业务功能。

## MVP 范围

- 每日体重记录与历史管理
- 目标体重和 7 天／30 天／3 个月／全部趋势折线图
- 系统推荐训练模板
- 自定义每周训练计划
- 动作库、目标肌群、动作步骤和注意事项
- 本地数据备份与恢复

## 技术方向

- 原生微信小程序：JavaScript、WXML、WXSS
- 第一阶段使用微信本地存储，不依赖服务器和登录
- 不直接复制 openGym 源码、图标或动作素材，只参考其信息架构和交互方式
- 后续如需跨设备同步，再单独评估微信云开发

## 本地启动

1. 安装微信开发者工具稳定版。
2. 选择“导入项目”，目录指向本仓库根目录。
3. 首次预览可使用测试号；正式调试时将 `project.config.json` 中的 `appid` 替换为个人小程序 AppID。
4. 点击编译，应看到“开发环境已就绪”页面。

## 基础检查

```bash
npm run check
```

后续开发必须遵循 [完整开发流程（主文档）](docs/PROJECT_DEVELOPMENT_PROCESS.md)。产品范围见 [MVP 需求](docs/PRD.md) 和 [MVP 范围与验收清单](docs/MVP_SCOPE.md)，交互结构见 [信息架构与交互原型](docs/INFORMATION_ARCHITECTURE.md) 和 [页面状态与危险操作清单](docs/INTERACTION_STATES.md)，视觉方向见 [视觉规范与组件设计](docs/VISUAL_DESIGN_SYSTEM.md) 和 [素材许可证登记表](docs/ASSET_LICENSES.md)，技术边界见 [架构说明](docs/ARCHITECTURE.md)，本机准备状态见 [环境基线](docs/ENVIRONMENT.md)。
