"use client";

import { useCallback, useEffect, useState } from "react";

type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  thumbnail: string;
  category: string;
  domain: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  status: "draft" | "published";
  views: number;
  content: { t: string; c: string | string[] }[];
};

const EMPTY: Post = {
  _id: "", title: "", slug: "", excerpt: "", thumbnail: "", category: "General", domain: "DevOps",
  tags: [], seoTitle: "", seoDescription: "", status: "draft", views: 0, content: [],
};
const API = process.env.NEXT_PUBLIC_CMS_API_URL || "/api";

export default function BlogCmsManager({ token, notify }: { token: string; notify: (message: string) => void }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Post | null>(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const request = useCallback(async (path: string, init?: RequestInit) => {
    const response = await fetch(`${API}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...init?.headers },
    });
    if (!response.ok) throw new Error((await response.json().catch(() => null))?.message || "CMS request failed");
    return response.json();
  }, [token]);

  const load = useCallback(async () => {
    try {
      const result = await request("/blog/admin");
      setPosts(result.items || result);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load posts");
    }
  }, [request]);

  useEffect(() => { void load(); }, [load]);

  function open(post = EMPTY) {
    setEditing({ ...post });
    setContent(post.content.map((block) => Array.isArray(block.c) ? block.c.join("\n") : block.c).join("\n\n"));
    setError("");
  }

  async function save(status: "draft" | "published") {
    if (!editing?.title.trim()) { setError("Title is required."); return; }
    const body = {
      ...editing,
      status,
      tags: editing.tags.filter(Boolean),
      content: content.split(/\n\s*\n/).filter(Boolean).map((paragraph) => ({ t: "p", c: paragraph.trim() })),
    };
    try {
      await request(editing._id ? `/blog/${editing._id}` : "/blog", {
        method: editing._id ? "PATCH" : "POST",
        body: JSON.stringify(body),
      });
      setEditing(null);
      await load();
      notify(status === "published" ? "Blog post published" : "Blog draft saved");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save post");
    }
  }

  async function remove(post: Post) {
    if (!window.confirm(`Delete "${post.title}"?`)) return;
    await request(`/blog/${post._id}`, { method: "DELETE" });
    await load();
    notify("Blog post deleted");
  }

  return (
    <>
      <div className="panel">
        <h3>Blog posts <button className="btn btn-primary btn-sm" onClick={() => open()}>+ New post</button></h3>
        {error && <div className="cms-error">{error}</div>}
        <table>
          <thead><tr><th>Title</th><th>Domain</th><th>Status</th><th>Views</th><th>Actions</th></tr></thead>
          <tbody>{posts.map((post) => (
            <tr key={post._id}>
              <td><strong>{post.title}</strong><br /><small>{post.slug}</small></td>
              <td>{post.domain}</td><td><span className={`pill ${post.status}`}>{post.status}</span></td><td>{post.views}</td>
              <td className="act"><button className="btn btn-soft btn-sm" onClick={() => open(post)}>Edit</button><button className="icon-btn del" onClick={() => remove(post)}>×</button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      {editing && (
        <div className="cms-editor-bg" onClick={(event) => event.target === event.currentTarget && setEditing(null)}>
          <aside className="cms-editor">
            <div className="cms-editor-head"><div><small>Blog CMS</small><h2>{editing._id ? "Edit post" : "Create post"}</h2></div><button className="icon-btn" onClick={() => setEditing(null)}>×</button></div>
            <label>Title *</label><input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            <div className="cms-field-grid"><div><label>Slug</label><input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="Generated from title" /></div><div><label>Category</label><input value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} /></div></div>
            <div className="cms-field-grid"><div><label>Domain</label><input value={editing.domain} onChange={(e) => setEditing({ ...editing, domain: e.target.value })} /></div><div><label>Tags</label><input value={editing.tags.join(", ")} onChange={(e) => setEditing({ ...editing, tags: e.target.value.split(",").map((tag) => tag.trim()) })} /></div></div>
            <label>Excerpt</label><textarea rows={3} value={editing.excerpt} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} />
            <label>Featured image URL</label><input value={editing.thumbnail} onChange={(e) => setEditing({ ...editing, thumbnail: e.target.value })} />
            <label>Content</label><textarea className="cms-richtext" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Separate paragraphs with a blank line." />
            <label>SEO title</label><input value={editing.seoTitle} onChange={(e) => setEditing({ ...editing, seoTitle: e.target.value })} />
            <label>SEO description</label><textarea rows={3} value={editing.seoDescription} onChange={(e) => setEditing({ ...editing, seoDescription: e.target.value })} />
            {error && <div className="cms-error">{error}</div>}
            <div className="cms-editor-actions"><button className="btn btn-soft" onClick={() => save("draft")}>Save draft</button><button className="btn btn-primary" onClick={() => save("published")}>Publish</button></div>
          </aside>
        </div>
      )}
    </>
  );
}
