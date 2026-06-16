import { notFound } from "next/navigation";
import ArticlePageView from "@/components/ArticlePageView";
import { getArticle } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default function BlogArticlePage({ params }: { params: { id: string } }) {
  const article = getArticle("blog", Number(params.id));
  if (!article) notFound();
  return <ArticlePageView article={article} backHref="/blog" backLabel="← Back to blog" />;
}
