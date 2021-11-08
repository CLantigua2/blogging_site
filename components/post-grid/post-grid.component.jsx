import React, { useState } from 'react';
import * as css from './post-grid.styles.module.css';
import { rhythm } from '../../utils/typography';
import Card from './card';
import Pill from './pill';
import Image from 'next/image';
import Link from 'next/link';

export default function ArticleGrid({ articles }) {
  const [filterBy, setFilterBy] = useState('');
  const listOfTags = new Set(
    articles.flatMap(({ node }) =>
      node.frontmatter.tags.split(',').map((tag) => tag.trim())
    )
  );

  const filteredArticles = !filterBy.length
    ? articles
    : articles.filter((a) =>
        a.node.frontmatter.tags
          .split(',')
          .map((t) => t.trim())
          .some((c) => c.includes(filterBy))
      );

  const handlePillClicked = (text) => {
    setFilterBy((prev) => (prev === text ? '' : text));
  };

  return (
    <div>
      <div className={css.tags}>
        {[...listOfTags].map((tag, i) => (
          <Pill
            key={i}
            text={tag}
            pillHasBeenClicked={handlePillClicked}
            selected={filterBy === tag.trim()}
          />
        ))}
      </div>
      <section className={css.article_grid_layout} id="article">
        {filteredArticles.map(({ node }) => {
          const tags = node.frontmatter?.tags?.split(',') ?? [];
          return (
            <Card key={node.id} maxWidth={435}>
              <Link className={css.card_link} to={node.fields.slug}>
                {node.frontmatter.image ? (
                  <Image
                    src={node.frontmatter.image}
                    className={`${css.image} lazyload`}
                    alt={node.title}
                  />
                ) : (
                  <Image
                    height={150}
                    src="/../../images/placeholder.jpg"
                    alt="placeholder unicorn"
                    layout="fullWidth"
                  />
                )}
                <div className={css.wrapper}>
                  <h5
                    style={{
                      marginBottom: `${rhythm(1 / 4)}`,
                      marginTop: `${rhythm(1 / 3)}`,
                    }}
                  >
                    {node.frontmatter.title}{' '}
                  </h5>
                  <p className={`${css.excerpt} ${css.quote}`}>
                    {node.frontmatter.date}
                  </p>
                  <p className={css.excerpt}>{node.frontmatter.description}</p>
                </div>
                <div className={css.divider}></div>
                <div className={css.tags}>
                  {tags.map((t, i) => {
                    return <Pill key={i} text={t} />;
                  })}
                </div>
              </Link>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
