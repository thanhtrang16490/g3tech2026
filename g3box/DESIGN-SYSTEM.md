# G3BOX Design System
## Based on UI UX Pro Max Standards v2.0

---

## PATTERN: E-commerce + Contact-Based Sales
- **Conversion**: Direct contact with trust elements
- **CTA**: Above fold, repeated throughout page
- **Sections**:
  1. Hero with contact CTAs
  2. Solutions showcase
  3. Product categories
  4. Featured products
  5. Hot deals
  6. Ecosystem showcase
  7. Testimonials/Social proof
  8. News & guides
  9. Final CTA with showroom info

---

## STYLE: Soft UI Evolution
- **Keywords**: Soft shadows, subtle depth, premium feel, clean, modern
- **Best For**: E-commerce, smart home, premium tech products
- **Performance**: Excellent | **Accessibility**: WCAG AA

---

## COLORS:
- **Primary**: #2563EB (Royal Blue) - Trust, technology
- **Secondary**: #F59E0B (Amber) - CTA, highlights
- **Success**: #10B981 (Emerald) - Phone, positive actions
- **Background**: #FFFFFF (White)
- **Surface**: #F9FAFB (Warm Gray 50)
- **Text Primary**: #111827 (Gray 900) - Contrast ratio: 15.4:1 ✓
- **Text Secondary**: #6B7280 (Gray 500) - Contrast ratio: 4.6:1 ✓
- **Border**: #E5E7EB (Gray 200)
- **Notes**: Professional tech palette with blue dominance

---

## TYPOGRAPHY: Inter / Plus Jakarta Sans
- **Mood**: Modern, professional, tech-focused
- **Best For**: Tech products, e-commerce, B2C
- **Google Fonts**: 
  - Inter: https://fonts.google.com/specimen/Inter
  - Plus Jakarta Sans: https://fonts.google.com/specimen/Plus+Jakarta+Sans
- **Hierarchy**:
  - H1: 3rem (48px) / Bold / Line-height: 1.2
  - H2: 2.25rem (36px) / Bold / Line-height: 1.3
  - H3: 1.5rem (24px) / Semibold / Line-height: 1.4
  - Body: 1rem (16px) / Regular / Line-height: 1.6
  - Small: 0.875rem (14px) / Regular / Line-height: 1.5

---

## KEY EFFECTS:
- Soft shadows: 0 4px 6px rgba(0, 0, 0, 0.1)
- Hover shadows: 0 10px 25px rgba(0, 0, 0, 0.15)
- Smooth transitions: 200-300ms ease
- Gentle hover states: translateY(-4px)
- Rounded corners: 8px-16px
- Card elevation on hover

---

## AVOID (Anti-patterns):
❌ Emojis as icons (use SVG: Heroicons/Lucide)
❌ Bright neon colors
❌ Harsh animations (>500ms)
❌ Low contrast text (<4.5:1)
❌ Missing focus states
❌ No hover effects on buttons
❌ Inconsistent spacing
❌ AI purple/pink gradients

---

## PRE-DELIVERY CHECKLIST:
✅ [ ] No emojis as icons (use SVG: Heroicons/Lucide)
✅ [ ] cursor-pointer on all clickable elements
✅ [ ] Hover states with smooth transitions (150-300ms)
✅ [ ] Light mode: text contrast 4.5:1 minimum
✅ [ ] Focus states visible for keyboard nav
✅ [ ] prefers-reduced-motion respected
✅ [ ] Responsive: 375px, 768px, 1024px, 1440px
✅ [ ] Professional SVG icons throughout
✅ [ ] Consistent spacing (multiples of 4)
✅ [ ] Proper semantic HTML
✅ [ ] Alt text on all images
✅ [ ] Aria labels on icon buttons

---

## SPACING SYSTEM:
- Base unit: 4px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128
- Section padding: 64px (desktop), 48px (tablet), 32px (mobile)
- Card padding: 24px
- Grid gaps: 24px (desktop), 16px (mobile)

---

## BREAKPOINTS:
- Mobile: 375px
- Tablet: 768px
- Desktop: 1024px
- Wide: 1440px

---

## COMPONENTS:

### Buttons
- Primary: bg-blue-600, hover:bg-blue-700, white text
- Secondary: bg-yellow-500, hover:bg-yellow-600, white text
- Success: bg-green-500, hover:bg-green-600, white text
- Outline: border-2, border-blue-600, text-blue-600
- Padding: px-6 py-3 (16px+ height)
- Border radius: rounded-lg (8px)
- Font: font-semibold
- Transition: transition-all duration-200

### Cards
- Background: bg-white
- Border: border border-gray-200
- Shadow: shadow-md, hover:shadow-xl
- Border radius: rounded-xl (12px)
- Padding: p-6
- Hover: -translate-y-1

### Inputs
- Border: border border-gray-300
- Focus: ring-2 ring-blue-500 border-transparent
- Padding: px-4 py-3
- Border radius: rounded-lg
- Height: min-h-[48px]

### Navigation
- Height: 72px
- Sticky: top-0
- Background: bg-white with shadow
- Z-index: z-50

---

## ACCESSIBILITY:
- All interactive elements have focus states
- Keyboard navigation supported
- ARIA labels on icon-only buttons
- Color contrast WCAG AA compliant
- Reduced motion media query respected
- Semantic HTML structure
- Alt text on images

---
