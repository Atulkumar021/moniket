// Seed the MongoDB CMS with default content so the site renders out-of-the-box.
// Run with: npm run seed
import "dotenv/config";
import mongoose from "mongoose";
import { connectToDatabase } from "../lib/server/db";
import { env } from "../lib/server/env";
import { User } from "../lib/server/models/User";
import { Section } from "../lib/server/models/Section";
import { Theme } from "../lib/server/models/Theme";
import { NavMenu } from "../lib/server/models/NavMenu";
import { Page } from "../lib/server/models/Page";
import { BlogPost } from "../lib/server/models/BlogPost";
import {
  
  defaultSections,
  defaultTheme,
  defaultNav,
  defaultPages,
  samplePosts,
} from "../lib/server/seedDefaults";

async function run() {
  await connectToDatabase();
  console.log("Seeding…");

  // Super admin
  const adminEmail = env.seedAdmin.email.toLowerCase();
  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    admin = await User.create({
      name: env.seedAdmin.name,
      email: adminEmail,
      passwordHash: await User.hashPassword(env.seedAdmin.password),
      role: "superadmin",
    });
    console.log(`  ✓ Super admin created: ${adminEmail} / ${env.seedAdmin.password}`);
  } else {
    console.log(`  • Super admin already exists: ${adminEmail}`);
  }

  // Theme
  await Theme.findOneAndUpdate({ key: "default" }, defaultTheme, { upsert: true });
  console.log("  ✓ Theme");

  // Nav menus
  await NavMenu.findOneAndUpdate({ key: "main" }, { key: "main", items: defaultNav.main }, { upsert: true });
  await NavMenu.findOneAndUpdate({ key: "footer" }, { key: "footer", items: defaultNav.footer }, { upsert: true });
  console.log("  ✓ Navigation (main + footer)");

  // SEO pages
  for (const p of defaultPages) {
    await Page.findOneAndUpdate({ path: p.path }, p, { upsert: true });
  }
  console.log(`  ✓ SEO pages (${defaultPages.length})`);

  // Sections (only seed if empty, to avoid clobbering admin edits)
  const sectionCount = await Section.countDocuments({ page: "home" });
  if (sectionCount === 0) {
    await Section.insertMany(defaultSections.map((s) => ({ ...s, page: "home" })));
    console.log(`  ✓ Sections (${defaultSections.length})`);
  } else {
    console.log(`  • Sections already present (${sectionCount}) — skipped`);
  }

  // Sample blog posts
  for (const post of samplePosts) {
    await BlogPost.findOneAndUpdate(
      { slug: post.slug },
      { ...post, publishedAt: post.status === "published" ? new Date() : undefined },
      { upsert: true }
    );
  }
  console.log(`  ✓ Blog posts (${samplePosts.length})`);

  console.log("Done.");
  await mongoose.connection.close();
  process.exit(0);
}

run().catch(async (err) => {
  console.error("Seed failed:", err);
  try {
    await mongoose.connection.close();
  } catch {
    /* ignore */
  }
  process.exit(1);
});
