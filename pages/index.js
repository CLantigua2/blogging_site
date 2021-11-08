import { useState } from 'react';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ScrollContext } from '../context/scroll';
import Layout from '../components/layout';
import Card from '../components/card';
import CardContent from '../components/card-content';

export default function Home({ posts }) {
  const [scrollTo, setScrollTo] = useState(0);
  console.log(posts);
  return (
    <div>
      <Head>
        <title>Dev Blog</title>
      </Head>
      <Layout>
        <div>
          <Card>
            <CardContent>
              <h1 className="header">
                Welcome{' '}
                <span role="img" aria-label="waving hand">
                  👋🏽
                </span>
              </h1>
              <p>
                I'm Full Stack developer who loves adventuring into different
                kinds of technologies. I often do "spikes" or research and build
                quick proof of concept apps using different technologies and
                provide write ups on my thoughts. This helps our teams make a
                quick and informed decision that allows us to move forward with
                confidence. I have a good (or bad) habit of recording a lot of
                the stuff I explore and turning it into blogs for others to
                enjoy. Most of my Articles can be found on Medium or other
                sites. I'll be consolidating it all here to make it easier to
                find.
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
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
