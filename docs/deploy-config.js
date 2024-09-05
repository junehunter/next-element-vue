import fs from 'fs';
import { execSync } from 'child_process';

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hours = date.getHours();
const minutes = date.getMinutes();
const time = year + '-' + (month > 0 ? month : '0' + month) + '-' + (day > 0 ? day : '0' + day) + ' ' + (hours > 0 ? hours : '0' + hours) + ' ' + (minutes > 0 ? minutes : '0' + minutes);
const githubConfig = {
	repositoryUrl: 'https://github.com/junehunter/next-element-vue',
	branchName: 'gh-pages',
};
const giteeConfig = {
	repositoryUrl: 'https://gitee.com/htengweb/next-element-admin.git',
	branchName: 'doc',
};
// 执行文档构建
execSync('pnpm run build', { stdio: 'inherit' });

// 切换到构建结果目录
process.chdir('.vitepress/dist');

// // 初始化 Git 仓库
execSync('git init', { stdio: 'inherit' });

// 添加所有文件到暂存区
execSync('git add -A', { stdio: 'inherit' });

// 提交构建结果
execSync(`git commit -m "文档自动部署 ${time}"`, { stdio: 'inherit' });

// 强制推送到指定的 GitHub Pages 分支
execSync(`git push -f ${githubConfig.repositoryUrl} master:${githubConfig.branchName}`, { stdio: 'inherit' });
// 强制推送到指定的 gitee doc 分支
execSync(`git push -f ${giteeConfig.repositoryUrl} master:${giteeConfig.branchName}`, { stdio: 'inherit' });

// 切换回原始目录
process.chdir('../..');

// 清理构建结果
execSync('rimraf ./.vitepress/dist', { stdio: 'inherit' });

/**
 *  OpenSSL SSL_read: Connection was reset, errno 10054
 *  .git config 添加下面配置


[http]
 sslverify = false

[https]
 sslverify = false


 */

/**
 * 提交报错： Failed to connect to github.com port 443 after 21096 ms: Couldn't connect to server
 *
 * 处理：
 * $ git config --global --unset http.proxy
 * $ git config --global --unset https.proxy
 */
