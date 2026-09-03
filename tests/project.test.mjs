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
