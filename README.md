# Yahel Cohen — Portfolio

Welcome to my portfolio website! This is the official repository for my personal site, built to showcase my skills, projects, and experience.

---

## Table of Contents

1. [About](#about)
2. [Demo](#demo)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
   - Installation
   - Development
   - Production Build
   - Deployment
5. [Customization](#customization)
6. [Project Structure](#project-structure)
7. [Troubleshooting & Tips](#troubleshooting--tips)
8. [Contact](#contact)
9. [License](#license)
10. [Support](#support)

---

## 1. About

This portfolio is a modern, minimalist, and responsive website built to highlight my professional journey, key projects, and areas of expertise.

---

## 2. Demo

**Live Site**:  
Explore the live version here: [www.yahelcohen.com](https://www.yahelcohen.com)

---

## 3. Tech Stack

- **Framework**: Next.js (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Bundling & Configuration**: ESLint, PostCSS
- **Deployment**: Vercel (leveraging its seamless integration with Next.js)

---

## 4. Getting Started

### Installation

```bash
# Clone the repo
git clone https://github.com/yahelcohen01/portfolio.git
cd portfolio

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
npm run dev
```

The site should now be available at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

### Deployment

Deploy your website via Vercel for production-ready hosting:

1. Push your code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com) and import the project.
3. Vercel auto-detects Next.js; click **Deploy**, and your live site will be up shortly!
4. (Optional) Add a custom domain via Vercel’s project settings.

---

## 5. Customization

- **Site Metadata**: Located under `app/layout.tsx` — modify title, description, Open Graph metadata, and favicon.
- **Main Content**: Found in `app/page.tsx` — customize the hero section, “About Me” area, project showcases, and contact details.
- **Assets**: Swap or update images in the `public` folder as needed (photos, icons, logos).
- **Styling**:
  - Tailwind configurations: `app/globals.css` (colors, themes, fonts, breakpoints)

---

## 6. Project Structure

```
├── app/                  # Next.js app directory
│   ├── layout.tsx        # Layout & global metadata
│   ├── page.tsx          # Main page content
│   └── globals.css       # Global styles
├── public/               # Static assets (images, icons)
├── .gitignore
├── eslintrc.config.mjs   # Linting rules
├── next.config.ts        # Next.js config
├── package.json          # Project scripts & dependencies
├── tsconfig.json         # TypeScript configuration
├── postcss.config.mjs    # PostCSS plugins (Tailwind)
└── README.md             # You're here!
```

---

## 7. Troubleshooting & Tips

| Issue                            | Solution                                                                                                                      |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Build fails**                  | Ensure all dependencies are installed; try clearing `node_modules` and `.next` folders, then reinstall and rebuild.           |
| **Tailwind styles not applying** | Run `npm run build`; check for conflicting CSS in `globals.css`.                                                              |
| **Images not loading**           | Verify they're in the `public` directory, ensure valid formats (JPG, PNG, WebP), and correctly referenced in your components. |

---

## 8. Contact

I’d love to hear from you! Reach out via:

- **Email**: [yahelcohen01@gmail.com](mailto:yahelcohen01@gmail.com)
- **Website**: [www.yahelcohen.com](https://www.yahelcohen.com)
- **[LinkedIn](https://www.linkedin.com/in/yahelcohen/) | [GitHub](https://github.com/yahelcohen01)**

---

## 9. License

Distributed under the [MIT License](LICENSE). Feel free to use, modify, or adapt as needed.

---

## 10. Support

- Starring the repository ⭐
- Sharing with other developers

Built on top of this [template](https://www.devportfoliotemplates.com/portfolio-templates/minimalist-light)

---
