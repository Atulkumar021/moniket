import { notFound } from "next/navigation";
import ArticlePageView from "@/components/ArticlePageView";
import { getArticle } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default function TutorialArticlePage({ params }: { params: { id: string } }) {
  const article = getArticle("tutorial", Number(params.id));
  if (!article) notFound();
  return <ArticlePageView article={article} backHref="/tutorials" backLabel="← Back to tutorials" />;
}
