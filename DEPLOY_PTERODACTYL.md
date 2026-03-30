# Beetle Network — Pterodactyl Deployment Guide

## Software to Select: **Bun**

From the Pterodactyl egg list, select **Bun**. It is the same runtime your project already uses and is faster than NodeJS.

---

## Step 1: Build the Project Locally

Run this on your own machine (not on the panel):

```bash
bun install
bun run db:push
bun run build
```

This creates the `.next/standalone/` folder with the production-ready server.

---

## Step 2: Upload Files to Pterodactyl

Compress and upload ONLY these files/folders:

```
beetle-deploy/
├── .next/standalone/          ← The built server (entire folder)
├── .next/static/              ← Static assets
├── public/                     ← logo.jpg, robots.txt, etc.
├── prisma/
│   └── schema.prisma
└── package.json
```

**Quick pack command** (run in your project root):
```bash
tar -czf beetle-deploy.tar.gz \
  .next/standalone/ \
  .next/static/ \
  public/ \
  prisma/schema.prisma \
  package.json
```

Upload `beetle-deploy.tar.gz` to the Pterodactyl server's file manager.

---

## Step 3: Extract on the Panel

Use the Pterodactyl console or file manager:

```bash
tar -xzf beetle-deploy.tar.gz
```

After extracting, your `/home/container` directory should look like:

```
/home/container/
├── .next/
│   ├── standalone/         ← server.js is inside here
│   └── static/
├── public/
├── prisma/
└── package.json
```

---

## Step 4: Install Dependencies on the Panel

In the Pterodactyl console:

```bash
cd /home/container/.next/standalone
bun install
```

---

## Step 5: Push Database Schema

```bash
cd /home/container
bunx prisma db push
```

---

## Step 6: Set the Startup Command

In Pterodactyl panel go to:

**Server → Startup**

Set the startup command to:

```
bun .next/standalone/server.js
```

Set the port to **9666**.

---

## Step 7: Start the Server

Click **Start** in the Pterodactyl panel.

The site will be available at: `http://YOUR_SERVER_IP:9666`

---

## Important Notes

1. **Port**: The site runs on port 9666. Make sure the port is open in your firewall and allocated in Pterodactyl.

2. **Every time you update the code**: You need to rebuild locally (`bun run build`) and re-upload the `.next/standalone/` and `.next/static/` folders.

3. **Database**: The project uses SQLite (file-based). The database file will be at `/home/container/prisma/dev.db`. It is created automatically on first run. Back it up regularly.

4. **Discord API**: The `/api/discord` route fetches from Discord's public API. No special firewall rules needed — just outbound HTTPS.

5. **No npm needed**: Use `bun` for everything since you selected the Bun egg.

6. **If you get "port already in use"**: Make sure no other process is running on port 9666. Stop the server first, then start again.

7. **Allocation port**: In Pterodactyl, the port mapping should map the allocated port to 9666 internally. Check your nest configuration if needed.
