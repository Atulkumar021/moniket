"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Media = { _id: string; name: string; url: string; resourceType: string; bytes: number; folder: string };
const API = process.env.NEXT_PUBLIC_CMS_API_URL || "/api";

export default function MediaCmsManager({ token, notify }: { token: string; notify: (message: string) => void }) {
  const [items, setItems] = useState<Media[]>([]);
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    try {
      const response = await fetch(`${API}/media`, { headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) throw new Error("Unable to load media");
      setItems(await response.json());
      setError("");
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to load media"); }
  }, [token]);

  useEffect(() => { void load(); }, [load]);

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    const form = new FormData();
    Array.from(files).forEach((file) => form.append("files", file));
    const response = await fetch(`${API}/media`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: form });
    if (!response.ok) { setError((await response.json().catch(() => null))?.message || "Upload failed"); return; }
    await load(); notify("Media uploaded");
  }

  async function remove(item: Media) {
    if (!window.confirm(`Delete ${item.name}?`)) return;
    await fetch(`${API}/media/${item._id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    await load(); notify("Media deleted");
  }

  return (
    <div className="panel">
      <h3>Media library <button className="btn btn-primary btn-sm" onClick={() => input.current?.click()}>+ Upload</button></h3>
      <input ref={input} hidden type="file" multiple accept="image/*,.svg,.pdf" onChange={(e) => upload(e.target.files)} />
      {error && <div className="cms-error">{error}</div>}
      <div className="media-grid">{items.map((item) => (
        <div className="media-item" key={item._id}>
          <div className="thumb">{item.resourceType === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.url} alt={item.name} />
          ) : "FILE"}</div>
          <div className="mn">{item.name}</div>
          <button className="icon-btn del" onClick={() => remove(item)}>×</button>
        </div>
      ))}</div>
    </div>
  );
}
