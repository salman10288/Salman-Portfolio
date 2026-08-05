# V3 Reliability and Contact Fixes

This revision keeps the original visual direction and changes only the requested problem areas.

## Contact details

- WhatsApp label: `03302963342`
- WhatsApp international link: `+923302963342`
- LinkedIn: `https://www.linkedin.com/in/salman--saeed/`
- Phone link: `+92 330 2963342`

The values are centralized in `data/portfolio.ts` and are reused by the hero, About section, contact section, floating WhatsApp action, footer and structured data.

## Visible 3D scenes

- Added an immediate CSS 3D workspace below the hero WebGL canvas.
- Added an immediate CSS product-island preview below the Interactive Lab canvas.
- The real Three.js canvas fades in only after its first successful frame.
- Added WebGL capability detection and a React error boundary.
- Mobile and unsupported browsers keep the optimized preview instead of showing an empty panel.
- Canvas backgrounds are explicitly transparent so the preview remains available behind them.
- Reduced pixel ratios and post-processing on compact screens.

## About profile

- Replaced the padded source image with `public/images/salman-portrait.png`.
- Corrected the profile crop and responsive image sizing.
- Added a professional identity-console treatment with orbit details and profile facts.
- Corrected the invalid `FiGraduationCap` import by using `FaGraduationCap`.
- Added direct LinkedIn and WhatsApp actions.

## Loading / refresh screen

- Replaced the simple progress layout with a professional CSS 3D cube, orbit system and progress display.
- Kept the loader lightweight: it does not create another WebGL context.
- Shortened repeat-visit loading and respected reduced-motion preferences.

## Selected work / case studies

- Preserved the original horizontal desktop presentation.
- Moved pinning to the case-study stage instead of pinning the section heading.
- Corrected card height, top spacing, bottom spacing and viewport calculations.
- Added a reliable vertical layout for mobile and reduced-motion users.
- Prevented category badges, project text and visual mockups from clipping at smaller sizes.

## Contact form behavior

- Resend delivery remains supported when the server environment variables are present.
- When Resend is not configured, the form opens a prefilled email instead of displaying a dead-end deployment message.
- Direct email, WhatsApp, LinkedIn and phone actions remain available at all times.

## Local verification commands

```powershell
npm install
Copy-Item .env.example .env.local
npm run typecheck
npm run lint
npm run build
npm run dev
```

## Validation completed in this workspace

- Parsed all 47 TypeScript and TSX files with zero syntax diagnostics.
- Resolved all 80 local project imports.
- Parsed all JSON configuration files successfully.
- Resolved every checked public asset and internal navigation target.
- Compiled 1,873 detected Tailwind candidates with the available Tailwind compiler; the revised arbitrary spacing, sizing and opacity utilities generated successfully.
- Parsed `app/globals.css` with zero CSS syntax errors.
- Verified the corrected Font Awesome graduation-cap import is used instead of the unavailable Feather export.
- Verified the WhatsApp number, international WhatsApp URL and LinkedIn URL in the centralized portfolio configuration.
- Verified that the downloadable CV is unchanged from the uploaded project.

A complete `npm install` and Next.js production build could not be executed in this workspace because its configured package registry does not provide the project dependencies. Run the local verification commands above after installing packages on your computer.
