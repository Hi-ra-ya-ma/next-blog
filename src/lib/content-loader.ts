import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import unified from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import stringify from 'rehype-stringify';

const postsDirectory = path.join(process.cwd(), 'posts');

type MatterResult = {
    content: string;
    data: {
        title: string;
    };
};

export type Post = {
    content: string;
    title: string;
};

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map(fileName => {
        return fileName.replace(/\.md$/, '');
    });
}

export async function getPostData(id: string): Promise<Post> {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContent);
    const matterResultData = matterResult.data as MatterResult['data'];

    const processedContent = await unified()
        .use(markdown)
        .use(remark2rehype)
        .use(stringify)
        .process(matterResult.content);
    const content = processedContent.toString();

    return {
        content,
        ...matterResultData,
    };
}
