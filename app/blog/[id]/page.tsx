import { notFound } from "next/navigation";
import ArticlePageView from "@/components/ArticlePageView";
import { fetchBlogBySlug } from "@/lib/server/blog";

export const dynamic = "force-dynamic";

// The [id] segment carries the post slug for MongoDB-backed blog posts.
export default async function BlogArticlePage({ params }: { params: { id: string } }) {
  const article = await fetchBlogBySlug(params.id);
  if (!article) notFound();
  return <ArticlePageView article={article} backHref="/blog" backLabel="← Back to blog" />;
}
