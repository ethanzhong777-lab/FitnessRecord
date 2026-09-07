import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('小程序入口页面已注册', async () => {
  const config = JSON.parse(await readFile('miniprogram/app.json', 'utf8'));
  assert.equal(config.pages[0], 'pages/home/index');
});

test('项目使用独立的小程序源码目录', async () => {
  const config = JSON.parse(await readFile('project.config.json', 'utf8'));
  assert.equal(config.miniprogramRoot, 'miniprogram/');
});

test('项目名称已统一为 EthanFitnessRecord', async () => {
  const projectConfig = JSON.parse(await readFile('project.config.json', 'utf8'));
  const appConfig = JSON.parse(await readFile('miniprogram/app.json', 'utf8'));
  assert.equal(projectConfig.projectname, 'EthanFitnessRecord');
  assert.equal(appConfig.window.navigationBarTitleText, 'EthanFitnessRecord');
});

test('MVP 范围已经用户确认并冻结', async () => {
  const scope = await readFile('docs/MVP_SCOPE.md', 'utf8');
  assert.match(scope, /冻结状态：已确认/);
  assert.match(scope, /冻结日期：2026-09-03/);
  assert.match(scope, /用户确认：是/);
});

test('信息架构使用已确认的五个底部入口', async () => {
  const architecture = await readFile('docs/INFORMATION_ARCHITECTURE.md', 'utf8');
  for (const page of ['首页', '趋势', '计划', '动作', '设置']) {
    assert.match(architecture, new RegExp(`\\d\\. ${page}`));
  }
  assert.match(architecture, /所有核心任务最多经过 3 层页面/);
});

test('交互状态覆盖核心边界和危险操作', async () => {
  const states = await readFile('docs/INTERACTION_STATES.md', 'utf8');
  for (const state of ['当天已达 3 条', '2 个组合', '文件损坏', '清空全部确认', '图片或动画缺失']) {
    assert.match(states, new RegExp(state));
  }
  assert.match(states, /用户确认：是（2026-09-03/);
  assert.match(states, /冻结状态：是（2026-09-04）/);
});

test('阶段 3 信息架构与交互原型已经冻结', async () => {
  const architecture = await readFile('docs/INFORMATION_ARCHITECTURE.md', 'utf8');
  const process = await readFile('docs/PROJECT_DEVELOPMENT_PROCESS.md', 'utf8');
  assert.match(architecture, /阶段 3 冻结：是（2026-09-04）/);
  assert.match(process, /4 \| 视觉规范与组件设计 \| 已完成/);
});

test('阶段 4 视觉规范和素材登记表已经冻结', async () => {
  const design = await readFile('docs/VISUAL_DESIGN_SYSTEM.md', 'utf8');
  const assets = await readFile('docs/ASSET_LICENSES.md', 'utf8');
  const review = await readFile('docs/stage-4-visual-review.html', 'utf8');
  assert.match(design, /固定深色主题/);
  assert.match(design, /#61E786/);
  assert.match(design, /最小触控区域/);
  assert.match(design, /阶段 4 冻结：是（2026-09-07）/);
  assert.match(design, /用户确认：是/);
  assert.match(await readFile('docs/PROJECT_DEVELOPMENT_PROCESS.md', 'utf8'), /阶段 4 验收记录/);
  assert.match(assets, /未登记或许可证不明确的素材不得进入正式版本/);
  for (const page of ['home', 'trend', 'plan', 'exercise', 'settings']) {
    assert.match(review, new RegExp(`data-page="${page}"`));
  }
  assert.doesNotMatch(review, /https?:\/\//);
});
