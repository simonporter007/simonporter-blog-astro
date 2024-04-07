import fs from 'fs';
import path from 'path';
import process from 'process';

function getDateForPost() {
  const date = new Date();

  const year = `${date.getFullYear()}`;
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return { year, month, day };
}

function getAppRootDir() {
  let currentDir = process.cwd();
  while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
    currentDir = path.join(currentDir, '..');
  }
  return currentDir;
}
const postName = process?.argv?.[2];

if (!postName) {
  throw new Error('Please pass post_name when calling this script!');
}

const { year, month, day } = getDateForPost();
const frontmatter = `---
title: ''
publishedAt: ${year}-${month}-${day}
description: ''
slug: '${postName}'
tags: ['']
isPublished: false
---
`;
const filePath = path.resolve(
  getAppRootDir(),
  'src',
  'content',
  'posts',
  year,
  month
);

fs.mkdirSync(filePath, { recursive: true });
fs.writeFileSync(path.resolve(filePath, postName, `index.mdx`), frontmatter);
