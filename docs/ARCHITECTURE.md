# 架构说明

## 1. 技术选型

第一版采用原生微信小程序，不引入跨端框架。项目规模小，原生方案的构建链更短，也更容易在微信开发者工具中定位问题。

## 2. 分层约定

```text
miniprogram/
├── pages/          页面，只处理展示和用户交互
├── components/     可复用界面组件
├── services/       体重、计划、动作和设置等业务服务
├── repositories/   本地存储读写与数据迁移
├── models/         数据结构与校验
├── utils/          日期、单位和计算工具
└── assets/         项目自有或授权明确的静态资源
```

页面不得直接散落调用 `wx.setStorageSync`。所有持久化操作统一通过 repository，再由 service 暴露给页面。

## 3. 初始数据模型

### WeightRecord

```js
{
  id: "uuid",
  date: "2026-09-02",
  weightKg: 78.6,
  note: "",
  createdAt: 1788278400000,
  updatedAt: 1788278400000
}
```

### WeeklyPlan

```js
{
  id: "uuid",
  name: "每周三练",
  goal: "fat_loss_and_muscle_gain",
  days: {
    monday: "routine-id",
    wednesday: "routine-id",
    friday: "routine-id"
  }
}
```

### Routine

```js
{
  id: "uuid",
  name: "上肢推",
  exercises: [
    { exerciseId: "push-up", sets: 4, reps: 12, restSeconds: 60 }
  ]
}
```

## 4. 数据与隐私

- 默认数据仅保存在用户设备内。
- 不采集手机号、位置、通讯录或微信运动数据。
- 导出文件由用户主动触发，不做隐式上传。
- 每次数据结构变化必须增加 schema 版本和迁移函数。

## 5. 健身建议边界

- 推荐结果必须说明生成依据，例如每周天数、经验与器械条件。
- 用户填写伤病或不适时，只给出降低风险的通用提示，不进行诊断。
- 训练计划保存和调整必须由用户确认。
- 动作指导必须包含停止训练并寻求专业帮助的异常信号提示。

## 6. 参考项目使用原则

openGym 用于参考导航结构、卡片层级、体重趋势和周计划交互。项目实现、视觉资源、图标和动作素材均重新制作或选择许可证兼容的来源。

