import fs from 'fs';
import path from 'path';
import process from 'process';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toMarkdown } from 'mdast-util-to-markdown';
import type {
  Code,
  Html,
  Paragraph,
  Text,
  Heading,
} from 'mdast-util-from-markdown/lib';

function getAppRootDir() {
  let currentDir = process.cwd();
  while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
    currentDir = path.join(currentDir, '..');
  }
  return currentDir;
}

const year = process?.argv?.[2];
const month = process?.argv?.[3];
const postName = process?.argv?.[4];

if (!year || !month || !postName) {
  throw new Error(
    'Please pass <year> <month> <post_name> when calling this script!'
  );
}

const doc = fs.readFileSync(
  path.resolve(
    getAppRootDir(),
    'src',
    'content',
    'posts',
    year,
    month,
    postName,
    'index.mdx'
  )
);
const tree = fromMarkdown(doc);
const newChildren = [];
for (const child of tree.children) {
  // Adjust frontmatter
  if (
    child.type === 'heading' &&
    child.children?.[0]?.type === 'text' &&
    child.children?.[0]?.value.startsWith('title:')
  ) {
    const title = child.children[0].value.match(/title: '(.+?)'/)?.[1];
    const publishedAt =
      child.children[0].value.match(/publishedAt: (.+?)\n/)?.[1];
    const tags = child.children[0].value
      .match(/tags: \[(.+?)\]/)?.[1]
      .replaceAll("'", '');

    const newFrontmatter = `title: ${title}\npublished: true\ndate: ${publishedAt} 00:00:00 UTC\ntags: ${tags}\ncanonical_url: https://www.simonporter.co.uk/posts/${postName}`;
    const newHeading = {
      ...child,
      children: [
        {
          ...child.children[0],
          value: newFrontmatter,
        } as Text,
      ],
    } as Heading;

    newChildren.push(newHeading);
    continue;
  }

  // import statements
  if (
    child.type === 'paragraph' &&
    child.children[0].type === 'text' &&
    child.children[0].value.startsWith('import')
  ) {
    continue;
  }

  // Expressive Code
  if (
    (child.type === 'html' && child.value.includes('Code')) ||
    (child.type === 'paragraph' &&
      child.children[0].type === 'text' &&
      child.children[0].value.includes('Code'))
  ) {
    let lang: string | undefined;
    let code: string | undefined;
    if (child.type === 'html') {
      lang = child.value?.match(/lang='(.+?)'/)?.[1];
      code = child.value?.match(/code={(.+?)}/)?.[1];
    } else if (
      child.type === 'paragraph' &&
      child.children[0].type === 'text'
    ) {
      lang = child.children[0].value?.match(/lang='(.+?)'/)?.[1];
      code = child.children[0].value?.match(/code={(.+?)}/)?.[1];
    }

    const newCode = {
      type: 'code',
      lang,
      meta: null,
      value: code,
      position: child.position,
    } as Code;

    newChildren.push(newCode);
    continue;
  }

  if (child.type === 'html' && child.value.includes('InfoBox')) {
    const notice = child.value
      .replaceAll('<p>', '')
      .replaceAll('</p>', '')
      .split('\n');
    notice.splice(-1, 1);
    notice[0] = '> ℹ️  **note**';

    const newHtml = {
      type: 'html',
      value: notice.join('\n'),
      position: child.position,
    } as Html;

    newChildren.push(newHtml);
    continue;
  }

  // PostFooter
  if (child.type === 'html' && child.value.includes('PostFooter')) {
    const newFooter = {
      type: 'paragraph',
      children: [
        {
          type: 'emphasis',
          children: [
            {
              type: 'text',
              value:
                'Thanks for reading! 💜 This article was originally published on ',
              position: {
                start: {
                  line: child.position?.start.line,
                  column: 2,
                  offset: 2313,
                },
                end: {
                  line: child.position?.start.line,
                  column: 43,
                  offset: 2354,
                },
              },
            },
            {
              type: 'link',
              title: null,
              url: `https://simonporter.co.uk/posts/${postName}`,
              children: [
                {
                  type: 'text',
                  value: 'simonporter.co.uk',
                  position: {
                    start: {
                      line: child.position?.start.line,
                      column: 44,
                      offset: 2355,
                    },
                    end: {
                      line: child.position?.start.line,
                      column: 61,
                      offset: 2372,
                    },
                  },
                },
              ],
              position: {
                start: {
                  line: child.position?.start.line,
                  column: 43,
                  offset: 2354,
                },
                end: {
                  line: child.position?.start.line,
                  column: 115,
                  offset: 2426,
                },
              },
            },
          ],
          position: {
            start: {
              line: child.position?.start.line,
              column: 1,
              offset: 2312,
            },
            end: {
              line: child.position?.start.line,
              column: 116,
              offset: 2427,
            },
          },
        },
      ],
      position: {
        start: {
          line: child.position?.start.line,
          column: 1,
          offset: 2312,
        },
        end: {
          line: child.position?.start.line,
          column: 116,
          offset: 2427,
        },
      },
    } as Paragraph;

    newChildren.push(newFooter);
    continue;
  }

  newChildren.push(child);
}

tree.children = newChildren;
console.log(JSON.stringify(tree, null, 2));
fs.writeFileSync(
  path.resolve(getAppRootDir(), 'md', `${postName}.md`),
  toMarkdown(tree)
);
