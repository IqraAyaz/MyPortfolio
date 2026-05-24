# Personal Portfolio — React + Vite

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 🛠️ In-App Editor
Press **Ctrl + Shift + E** anywhere on the page.
Default PIN: **1234**

### What you can edit:
- Personal info (name, bio, photo, email, phone, location)
- Typing roles in the Hero section
- Hero background images
- Skills (add/edit/remove, set percentage)
- Projects (add/edit/remove, all fields)
- Education entries
- Stats row
- Testimonials
- Blog posts
- Social links

All changes are saved to **localStorage** and persist on refresh.

## 📁 Structure
```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── Testimonials.jsx
│   ├── Blog.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   └── EditPanel.jsx   ← Ctrl+Shift+E (PIN: 1234)
├── data/
│   └── portfolioData.js
├── hooks/
│   └── useScrollReveal.js
├── styles/
│   └── globals.css
└── App.jsx
```

## 🔑 Changing the PIN
Open `src/components/EditPanel.jsx` and change:
```js
const CORRECT_PIN = "1234";
```

## 🎨 Customizing Colors
Edit CSS variables in `src/styles/globals.css`:
```css
--accent: #e8e0c8;   /* Main accent color */
--black: #080808;    /* Background */
```
