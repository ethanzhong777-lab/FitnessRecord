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

