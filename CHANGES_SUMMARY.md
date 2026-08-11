You are working on my existing Kirombo Foundation website project.

## PRIMARY OBJECTIVE

Refactor the existing project so that it becomes a frontend-only Vite application backed by Supabase.

The current project contains:

* A Vite frontend
* Some backend functionality
* A database connection through the backend
* A Press Room page where articles/stories are currently hardcoded in the frontend

I no longer want to maintain or deploy a custom backend.

Replace the custom backend/database access with Supabase and build a lightweight CMS for the Press Room.

The final architecture must be:

Vite + React
↓
Supabase
┌────┼────┐
↓    ↓    ↓
Database Storage Auth

The frontend should communicate directly with Supabase using the official Supabase JavaScript client.

DO NOT create another custom backend, API server, Express server, Spring Boot server, or server-side database layer.

---

# VERY IMPORTANT — BEFORE MODIFYING ANYTHING

First inspect the entire existing project.

Do NOT immediately delete files.

Analyze:

1. Current folder structure
2. package.json
3. Vite configuration
4. React entry points
5. Existing routes
6. Existing components
7. Existing Press Room implementation
8. Existing backend folder/files
9. Existing API calls
10. Existing environment variables
11. Existing authentication, if any
12. Existing styling system
13. Existing image handling
14. Existing dependencies
15. Existing deployment configuration

Determine exactly which frontend functionality currently depends on the backend.

Then provide me with a concise migration plan BEFORE making destructive changes.

Do not remove anything that is still required by the frontend.

Preserve the existing UI, branding, design system, routes, responsiveness, and functionality unless a change is specifically required for this migration.

---

# PHASE 1 — FRONTEND/BACKEND SEPARATION

After inspection, identify everything that belongs exclusively to the backend.

The goal is to remove the custom backend safely.

Remove only backend functionality that is no longer needed.

Clean up:

* Backend source files
* Backend-specific dependencies
* Backend configuration
* Backend scripts
* Backend environment variables
* API clients that only communicate with the old backend
* Unused database connection code
* Unused backend-related utilities

Do NOT blindly delete folders.

After the cleanup:

The project must remain a valid Vite frontend application.

Run the appropriate checks:

* npm install
* npm run build
* npm run lint if available
* npm run dev verification where appropriate

Fix all resulting errors.

Do not leave broken imports or unused backend references.

---

# PHASE 2 — SUPABASE SETUP

Integrate Supabase into the Vite frontend.

Use the official package:

@supabase/supabase-js

Create a clean Supabase client configuration.

Use environment variables:

VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY

Do NOT hardcode credentials.

Do NOT expose any service-role key in the frontend.

Create an appropriate structure such as:

src/
lib/
supabase.ts

or an equivalent structure consistent with the existing project.

Add/update the appropriate .env.example file.



---

# PHASE 3 — DATABASE DESIGN

Create a proper Supabase PostgreSQL schema for the Press Room CMS.

Create an articles table with at least:

id
title
slug
excerpt
content
cover_image_url
list[] inline-images
status
author_id
published_at
created_at
updated_at

Use appropriate PostgreSQL types.

Recommended status values:

draft(unpublished)
published

Use UUIDs for IDs.

Do NOT use sequential numeric IDs for articles.

Add appropriate indexes, especially for:

* slug
* status
* published_at
* author_id

Add created_at and updated_at handling properly.

The slug must be unique.

Published articles should be efficiently queryable.

---

# PHASE 4 — AUTHENTICATION

Use Supabase Auth.

The CMS must NOT be publicly writable.

Create an authentication flow for authorized writers/admins.

The public website should allow visitors to:

* View published articles
* View individual published articles

Public visitors must NOT be able to:

* Create articles
* Edit articles
* Delete articles
* Change article status

Authenticated authorized users should be able to manage articles.

Use Supabase Row Level Security (RLS).

Do not rely only on frontend route protection.

Security must also exist at the database level.

Create appropriate RLS policies.

Avoid insecure policies such as:

USING (true)

for write operations.

Design the authorization system so it can support multiple writers in the future.

If a profiles/authors table is necessary, implement it cleanly.

For the authentication page provide only the sign in , no sign up 

---

# PHASE 5 — SUPABASE STORAGE

Create/use a Supabase Storage bucket specifically for article images.

Recommended bucket name:

article-images

Do NOT store image binaries directly inside PostgreSQL.

Store images in Supabase Storage.

Store only the image URL/path in the article data.

The system must support:

* Cover image upload
* Images inserted inside article content
* Image replacement where appropriate
* Image deletion/cleanup where appropriate

Validate uploads.

At minimum consider:

* File type
* File size
* Reasonable image formats

Do not allow arbitrary dangerous file types.

Use Supabase Storage policies so unauthorized users cannot upload/delete files.

---

# PHASE 6 — LEXICAL EDITOR

I have chosen Lexical because I already like the Lexical Playground experience.

DO NOT replace Lexical with another editor.

Use Lexical as the rich text editor.

The editor should provide a professional WordPress-like writing experience.

Support at minimum:

* Paragraphs
* Headings
* Bold
* Italic
* Underline
* Strikethrough if practical
* Ordered lists
* Unordered lists
* Links
* Blockquotes
* Text alignment
* Undo/redo
* Image insertion
* Image resizing if practical
* Horizontal divider if practical
* Clear formatting
* Keyboard shortcuts
* Good toolbar UX

Follow Lexical's recommended architecture rather than creating one giant editor component.

Separate concerns appropriately:

* Editor configuration
* Toolbar
* Plugins
* Image plugin
* Link plugin
* History
* Rich text
* Serialization/deserialization

copy the entire Lexical Playground application.

Make sure it meets the functionality needed for this CMS.

---

# PHASE 7 — LEXICAL CONTENT STORAGE

Do NOT store raw HTML as the primary article format unless there is a strong technical reason.

Prefer storing serialized Lexical editor state as JSON/JSONB in Supabase.

The article content should preserve:

* Formatting
* Headings
* Lists
* Links
* Images
* Alignment
* Other supported editor nodes

Design the database field appropriately for JSON content.

When editing an existing article:

Supabase
↓
Lexical JSON
↓
Load into editor

When publishing:

Lexical editor state
↓
Serialize
↓
Supabase

The public Press Room should render the saved content safely.

Do NOT use unsafe raw HTML rendering without sanitization.

---

# PHASE 8 — IMAGE INSERTION INSIDE LEXICAL

This is especially important.

The writer must be able to insert an image at any point in the article.

Example:

Text

[IMAGE]

More text

[IMAGE]

More text

The workflow should be:

Writer clicks image button
↓
Selects image
↓
Image uploads to editor
↓
Cloudinary under the hood convert the uploaded image into the url
↓
Supabase stores the image url provided bt cloudinary
↓
Lexical image node is inserted
↓
Article is saved with the image 

Do not convert images into base64 and store them inside article content.

Do not store huge image blobs in PostgreSQL.

Optimize the user experience around image uploading.

Show upload/loading states.

Handle upload errors gracefully.

---

# PHASE 9 — PRESS ROOM CMS

Create an admin CMS.

Suggested routes:

/admin/login
/admin
/admin/articles
/admin/articles/new
/admin/articles/:id/edit

Do not assume these exact routes must be used if the existing router has a better structure, but maintain the same conceptual organization.

The admin dashboard should include:

* Dashboard
* Articles
* Create article
* Edit article
* Drafts
* Published articles
* Logout

The article management screen should show:

Title
Status
Author
Created date
Published date
Actions

Actions:

Edit
Publish
Unpublish
Delete

Use confirmation before destructive actions.

---

# PHASE 10 — CREATE ARTICLE EXPERIENCE

Create a polished article creation screen.

Fields:

Title
Slug
Excerpt
Cover image
Article content
Status

The writer should be able to:

1. Enter a title
2. Automatically generate a slug
3. Manually edit the slug if necessary
4. Add an excerpt
5. Upload a cover image
6. Write the article using Lexical
7. Insert images
8. Save as draft
9. Publish

Do not make the writer interact with database concepts.

The UI should feel like a professional CMS.

Use clear loading states.

Use success/error notifications.

Prevent accidental loss of unsaved content where practical.

---

# PHASE 11 — DRAFTS AND PUBLISHING

Implement two states:

DRAFT
PUBLISHED

Draft articles must not appear on the public Press Room.

Only PUBLISHED articles should appear publicly.

Publishing should set:

status = published
published_at = current timestamp

Unpublishing should return the article to:

status = draft

Do not delete published_at unnecessarily if preserving publication history is useful.

Sort published articles by published_at descending unless the existing design requires another ordering.

---

# PHASE 12 — PUBLIC PRESS ROOM

Replace the existing hardcoded Press Room article data with Supabase data.

The public Press Room should fetch only published articles.

Example conceptual flow:

Supabase
↓
published articles
↓
Press Room cards
↓
Article detail page

The Press Room should retain the existing website's visual identity.

Do not redesign the entire website.

Keep the existing cards, typography, spacing, colors, responsiveness, and animations where possible.

Only replace the hardcoded data source.

---

# PHASE 13 — ARTICLE DETAIL PAGE

Create/update the public article detail page.

It should display:

* Cover image
* Title
* Publication date
* Author where appropriate
* Rich article content
* Images
* Links
* Headings
* Lists
* Quotes
* social platforms aside  and the CTA buttons like(share and like (using their icon)) 

Use a clean reading experience.

Generate/maintain SEO-friendly slugs.

Example:

/press-room/community-outreach-program

Do not use database IDs in public URLs if a slug can be used.

Handle:

* Article not found
* Unpublished article
* Loading state
* Database error

appropriately.

---

# PHASE 14 — SECURITY

Treat security as a first-class requirement.

Check:

* Supabase RLS
* Storage policies
* Authentication
* Admin routes
* Authorization
* Environment variables
* Public vs private data
* Image uploads
* Database access

Never expose:

SUPABASE_SERVICE_ROLE_KEY

or any privileged secret to the browser.

Only use the public anon/publishable client key in the Vite frontend.

Do not trust frontend checks as the only authorization mechanism.

---

# PHASE 15 — PERFORMANCE

Keep the application lightweight.

Avoid unnecessary dependencies.

Optimize image handling.

Avoid fetching unnecessary article content on the Press Room listing page if the architecture allows it.

Use lazy loading for article images where appropriate.

Avoid unnecessary Supabase requests.

Do not introduce a state management library unless the existing project actually needs one.

---

# PHASE 16 — ERROR HANDLING

Every Supabase operation should have proper error handling.

Examples:

* Login failed
* Article creation failed
* Article update failed
* Article deletion failed
* Image upload failed
* Image deletion failed
* Network error
* Article not found
* Unauthorized user

Do not silently swallow errors.

Give the writer understandable messages.

Do not expose sensitive backend/database details to end users.

---

# PHASE 17 — PRESERVE EXISTING WEBSITE

This is extremely important.

Do NOT rewrite the whole frontend.

Do NOT replace the existing design.

Do NOT remove existing pages.

Do NOT replace the current styling framework unnecessarily.

Do NOT change unrelated functionality.

The migration should be incremental.

Existing website:

Frontend
+
Existing pages
+
Existing design
+
Existing components

should remain intact and/or improved .

We are mainly replacing:

Old backend/database architecture

with:

Supabase

and replacing:

Hardcoded Press Room content

with:

CMS-managed Press Room content.

---

# PHASE 18 — CLEANUP

After the migration:

Search the entire repository for references to the old backend.

Look for:

API URLs
fetch calls to old endpoints
axios calls
backend imports
old environment variables
database connection strings
unused services
unused types
unused dependencies

Remove only what is truly obsolete.

Then run:

npm install
npm run build

and lint/typecheck/test commands if available.

Fix all errors.

There should be no broken imports.

---

# PHASE 19 — DOCUMENTATION

Create/update README documentation explaining:

1. Project architecture
2. Supabase setup
3. Required environment variables
4. Database schema
5. Storage bucket
6. Authentication
7. RLS policies
8. How to create an admin/writer
9. How to run the frontend locally
10. How to build
11. How to deploy
12. How the Press Room CMS works

Also create/update:

.env.example

with placeholders only.

Example:

VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

Never put real credentials in the repository.

---

# IMPORTANT IMPLEMENTATION RULES

1. Inspect before modifying.
2. Do not destroy existing functionality.
3. Do not rewrite unrelated code.
4. Do not create a custom backend.
5. Use Supabase directly from the Vite frontend.
6. Use Supabase Auth.
7. Use PostgreSQL through Supabase.
8. Use Supabase Storage for images.
9. Use Row Level Security.
10. Use UUIDs.
11. Use Lexical.
12. Store serialized Lexical content appropriately.
13. Never store article images as base64.
14. Never expose service-role credentials.
15. Keep the public Press Room read-only.
16. Keep CMS functionality authenticated and authorized.
17. Preserve the existing visual design.
18. Keep the application responsive.
19. Keep accessibility in mind.
20. Do not install unnecessary libraries.
21. Do not claim something is implemented unless you actually verify it.
22. Run the build and relevant checks after implementation.
23. Fix errors rather than leaving TODOs for core functionality.
24. If an architectural decision is uncertain, inspect the existing code and choose the least disruptive solution.
25. If a destructive change is necessary, explain it before making it.

---

# EXECUTION STRATEGY

Work in phases rather than attempting a blind rewrite.

PHASE A:
Inspect and report the existing architecture.

PHASE B:
Separate/remove obsolete backend functionality.

PHASE C:
Integrate Supabase.

PHASE D:
Create database schema and RLS.

PHASE E:
Configure Supabase Auth.

PHASE F:
Configure Storage.

PHASE G:
Integrate Lexical.

PHASE H:
Build the CMS/admin interface.

PHASE I:
Connect the public Press Room.

PHASE J:
Test, clean up, document, and verify production build.

After each major phase, verify the application before continuing.

If something fails, diagnose the actual cause and fix it rather than working around it with hacks.

At the end, provide a concise summary containing:

* What was changed
* What was removed
* What was added
* Supabase tables created
* Storage buckets created
* Auth/RLS configuration
* New routes
* Environment variables required
* Packages added/removed
* Tests/build checks performed
* Any remaining manual Supabase dashboard steps

Do not finish until the frontend builds successfully and there are no known broken imports or unresolved implementation issues.
