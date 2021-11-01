import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div>
      <Head>
        <title>Dev Blog</title>
      </Head>

      <h2>Hello</h2>
    </div>
  );
}

export async function getStaticProps() {
  // Get files from the posts dir
  const files = fs.readdirSync(path.join('posts'));

  // Get slug and frontmatter from posts
  const posts = files
    .map((fileName) => {
      const slug = fileName.replace('.md', '');
      const markdownWithMeta = fs.readFileSync(
        path.join('posts', fileName),
        'utf-8'
      );

      const { data: frontmatter } = matter(markdownWithMeta);

      return { slug, frontmatter };
    })
    .sort((a, b) => b.frontmatter.date - a.frontmatter.date);
  return {
    props: {
      posts: posts,
    },
  };
}
