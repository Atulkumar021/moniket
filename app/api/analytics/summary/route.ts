import { route, json } from "@/lib/server/http";
import { requireEdit } from "@/lib/server/auth";
import { PageView } from "@/lib/server/models/PageView";
import { BlogPost } from "@/lib/server/models/BlogPost";
import { Lead } from "@/lib/server/models/Lead";
import { Subscriber } from "@/lib/server/models/Subscriber";

export const dynamic = "force-dynamic";

// GET /api/analytics/summary  (edit)
export const GET = route(async (req) => {
  await requireEdit(req);

  const since = new Date();
  since.setDate(since.getDate() - 29);
  since.setHours(0, 0, 0, 0);

  const [daily, topPages, blogViews, leads, subscribers] = await Promise.all([
    PageView.aggregate([
      { $match: { createdAt: { $gte: since } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]),
    PageView.aggregate([{ $group: { _id: "$path", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 10 }]),
    BlogPost.aggregate([{ $group: { _id: null, count: { $sum: "$views" } } }]),
    Lead.countDocuments(),
    Subscriber.countDocuments(),
  ]);

  const visitors = Array.from({ length: 30 }, (_, index) => {
    const date = new Date(since);
    date.setDate(date.getDate() + index);
    const key = date.toISOString().slice(0, 10);
    return daily.find((item) => item._id === key)?.count || 0;
  });

  return json({
    visitors,
    totalVisitors: visitors.reduce((sum, value) => sum + value, 0),
    blogViews: blogViews[0]?.count || 0,
    totalLeads: leads,
    subscribers,
    topPages: topPages.map((item) => [item._id, item.count]),
  });
});
