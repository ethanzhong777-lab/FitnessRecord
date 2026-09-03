import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const requiredFiles = [
  'project.config.json',
  'miniprogram/app.js',
  'miniprogram/app.json',
  'miniprogram/app.wxss',
  'miniprogram/sitemap.json',
  'miniprogram/pages/home/index.js',
  'miniprogram/pages/home/index.json',
  'miniprogram/pages/home/index.wxml',
  'miniprogram/pages/home/index.wxss',
  'docs/PROJECT_DEVELOPMENT_PROCESS.md',
  'docs/PRD.md',
  'docs/MVP_SCOPE.md'
];

for (const file of requiredFiles) {
  await access(path.join(root, file));
}

for (const file of ['project.config.json', 'miniprogram/app.json', 'miniprogram/sitemap.json']) {
  JSON.parse(await readFile(path.join(root, file), 'utf8'));
}

const appConfig = JSON.parse(await readFile(path.join(root, 'miniprogram/app.json'), 'utf8'));
if (!appConfig.pages?.includes('pages/home/index')) {
  throw new Error('app.json 必须注册 pages/home/index');
}

console.log(`项目检查通过：${requiredFiles.length} 个必要文件存在，JSON 配置有效。`);
