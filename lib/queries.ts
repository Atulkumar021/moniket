import { readStore } from "./store";
import type { Article, ArticleType, Settings } from "./types";

export function getSettings(): Settings {
  return readStore().settings;
}

export function getPublishedArticles(type?: ArticleType): Article[] {
  const all = readStore().articles.filter((a) => a.status === "published");
  return type ? all.filter((a) => a.type === type) : all;
}

export function getArticle(type: ArticleType, id: number): Article | undefined {
  return readStore().articles.find((a) => a.type === type && a.id === id);
}

export function getDomainCount(domain: string): number {
  return getPublishedArticles().filter((a) => a.domain === domain).length;
}

/** Lightweight article (no body) for list/card rendering.
 *  `slug` is set for MongoDB-backed blog posts, which link by slug instead of id. */
export type ArticleCardData = Omit<Article, "body"> & { slug?: string };
export function toCard(a: Article): ArticleCardData {
  const { body: _body, ...rest } = a;
  void _body;
  return rest;
}
