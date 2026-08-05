# Start Here — Windows + VS Code

## 1. Install the required tools

Install **Node.js 20.9 or newer**. Python is not required for this project.

Confirm the installation in PowerShell:

```powershell
node --version
npm --version
```

## 2. Open the project

1. Extract the downloaded ZIP.
2. Open the extracted `salman-3d-portfolio` folder in Visual Studio Code.
3. Open **Terminal → New Terminal**.

## 3. Install and run

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000` in your browser.

The portfolio works without GitHub or email credentials. GitHub remains in a clearly labelled preview state. If Resend is not configured, the contact form opens a prefilled email instead of displaying a deployment-configuration error.

## 4. Optional integrations

Edit `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=

RESEND_API_KEY=
CONTACT_FROM_EMAIL="Portfolio <hello@your-domain.com>"
CONTACT_TO_EMAIL=its.salmansaeed07@gmail.com
```

A verified Resend sender domain is required before the production contact form can deliver email automatically. Without it, visitors can still continue through the prefilled email fallback or WhatsApp.

## 5. Production check

```powershell
npm run typecheck
npm run lint
npm run build
npm start
```

## Common fixes

### `npm` or `node` is not recognized

Restart VS Code after installing Node.js. If the issue remains, restart Windows and run `node --version` again.

### PowerShell blocks scripts

Run PowerShell as your normal user and use:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Then reopen the VS Code terminal.

### Port 3000 is already in use

```powershell
npm run dev -- --port 3001
```

Open `http://localhost:3001`.

### The 3D scene is slow

Disable browser battery saver, update the graphics driver, and test in a current Chromium-based browser. The website already reduces effects on compact screens and for users who prefer reduced motion. It also keeps a CSS 3D preview visible if WebGL is blocked, slow or unavailable.
