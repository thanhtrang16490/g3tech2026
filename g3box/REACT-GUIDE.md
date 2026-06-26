# React Components Guide for G3BOX Astro Project

## ✅ React Integration Complete

React has been successfully added to your Astro project! You can now use `.tsx` and `.jsx` files alongside `.astro` components.

---

## 📦 Installed Packages

```json
{
  "@astrojs/react": "^6.0.0",
  "@types/react": "^19.2.17",
  "@types/react-dom": "^19.2.3",
  "react": "^19.2.7",
  "react-dom": "^19.2.7"
}
```

---

## 🔧 Configuration

### astro.config.mjs
```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  experimental: {
    clientPrerender: true
  },
  integrations: [react()]  // ✅ React integration
});
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

---

## 🎯 How to Use React Components

### 1. **Create a React Component** (.tsx)

```tsx
// src/components/MyComponent.tsx
import { useState } from 'react';

interface Props {
  title: string;
  items: string[];
}

export default function MyComponent({ title, items }: Props) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>{title}</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 2. **Import in Astro Files**

```astro
---
// src/pages/index.astro
import MyComponent from '../components/MyComponent.tsx';
---

<!-- Client-side interactive component -->
<MyComponent 
  title="My List" 
  items={['Item 1', 'Item 2', 'Item 3']} 
  client:load 
/>

<!-- Static (server-rendered) -->
<MyComponent 
  title="Static List" 
  items={['Item 1', 'Item 2']} 
/>
```

---

## 🚀 Client Directives

Astro provides different ways to load React components:

### `client:load` - Immediate Load
```astro
<MyComponent client:load />
```
- Hydrates immediately on page load
- Use for components that need to be interactive right away

### `client:idle` - Load When Idle
```astro
<MyComponent client:idle />
```
- Hydrates when browser is idle (uses `requestIdleCallback`)
- Best for most interactive components
- Improves initial page load performance

### `client:visible` - Load When Visible
```astro
<MyComponent client:visible />
```
- Hydrates when component enters viewport (uses IntersectionObserver)
- Perfect for components below the fold
- Great for performance optimization

### `client:media` - Load on Media Query
```astro
<MyComponent client:media="(max-width: 768px)" />
```
- Hydrates only when media query matches
- Use for mobile-specific components

### `client:only` - Client-Side Only
```astro
<MyComponent client:only="react" />
```
- Only renders on client (never server-rendered)
- Use for components that require browser APIs (window, localStorage)
- Specify framework: `client:only="react"`, `client:only="vue"`, etc.

---

## 📝 Example Use Cases

### 1. **Interactive Product Search** (Already Created)

```astro
---
import ProductSearch from '../components/ProductSearch.tsx';
import { products } from '../data/products.js';
---

<ProductSearch 
  products={products} 
  client:idle 
/>
```

### 2. **Image Gallery with Lightbox**

```tsx
// src/components/ImageGallery.tsx
import { useState } from 'react';

interface Props {
  images: string[];
}

export default function ImageGallery({ images }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            onClick={() => setSelected(img)}
            className="cursor-pointer rounded-lg hover:opacity-80 transition-opacity"
          />
        ))}
      </div>
      
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
             onClick={() => setSelected(null)}>
          <img src={selected} className="max-w-full max-h-full" />
        </div>
      )}
    </>
  );
}
```

### 3. **Shopping Cart Counter**

```tsx
// src/components/CartCounter.tsx
import { useState } from 'react';

export default function CartCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="relative">
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        🛒 Giỏ hàng
      </button>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );
}
```

### 4. **Contact Form with Validation**

```tsx
// src/components/ContactForm.tsx
import { useState, FormEvent } from 'react';

interface FormData {
  name: string;
  phone: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập tên';
    if (!formData.phone.match(/^[0-9]{10}$/)) newErrors.phone = 'Số điện thoại không hợp lệ';
    if (!formData.message.trim()) newErrors.message = 'Vui lòng nhập tin nhắn';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Submit to API
      setSubmitted(true);
    }
  };

  if (submitted) {
    return <div className="text-green-600 font-semibold">Đã gửi thành công!</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Họ tên"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full px-4 py-3 border rounded-lg"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      
      <div>
        <input
          type="tel"
          placeholder="Số điện thoại"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="w-full px-4 py-3 border rounded-lg"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>
      
      <div>
        <textarea
          placeholder="Tin nhắn"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          className="w-full px-4 py-3 border rounded-lg"
          rows={4}
        />
        {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
      </div>
      
      <button type="submit" className="btn btn-primary w-full">
        Gửi tin nhắn
      </button>
    </form>
  );
}
```

### 5. **Real-time Chat Widget**

```tsx
// src/components/ChatWidget.tsx
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: 'Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm.',
        sender: 'bot',
        timestamp: new Date()
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-20 right-6 z-50">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-80 mb-4">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg">
            <h3 className="font-semibold">Chat với G3BOX</h3>
          </div>
          
          <div className="h-64 overflow-y-auto p-4 space-y-2">
            {messages.map((msg) => (
              <div key={msg.id} 
                   className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] p-2 rounded-lg ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Nhập tin nhắn..."
              className="flex-1 px-3 py-2 border rounded-lg"
            />
            <button onClick={sendMessage} className="btn btn-primary">
              Gửi
            </button>
          </div>
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  );
}
```

---

## 🎨 Best Practices

### 1. **Use Astro for Static Content**
```astro
<!-- ✅ Good: Static content -->
<article>
  <h1>{title}</h1>
  <p>{description}</p>
</article>
```

### 2. **Use React for Interactive Features**
```tsx
// ✅ Good: Interactive component
export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### 3. **Choose the Right Client Directive**
```astro
<!-- ✅ Above fold, needs immediate interaction -->
<SearchBar client:load />

<!-- ✅ Below fold, can wait -->
<Comments client:visible />

<!-- ✅ Non-critical, load when browser idle -->
<SocialShare client:idle />
```

### 4. **Pass Data from Astro to React**
```astro
---
import ReactComponent from '../components/ReactComponent.tsx';
import { getProducts } from '../lib/products';

const products = await getProducts();
---

<ReactComponent 
  products={products} 
  client:idle 
/>
```

---

## 📚 When to Use React vs Astro

| Use Case | Recommended | Why |
|----------|-------------|-----|
| Product listing page | **Astro** | Static content, SEO-friendly |
| Product detail page | **Astro** | Mostly static, fast loading |
| Search with filters | **React** | Interactive, state management |
| Shopping cart | **React** | Real-time updates |
| Contact form | **React** | Validation, user input |
| Image gallery | **React** | Lightbox, interactions |
| Navigation menu | **Astro** | Simple, fast |
| Chat widget | **React** | Real-time, stateful |
| Testimonials carousel | **React** | Interactive slider |
| Blog posts | **Astro** | Content-focused, SEO |

---

## 🚀 Performance Tips

1. **Minimize Client-Side JavaScript**
   - Use Astro components by default
   - Only use React when interactivity is needed

2. **Use Appropriate Directives**
   - `client:idle` for most components
   - `client:visible` for below-the-fold content
   - Avoid `client:load` unless necessary

3. **Code Splitting**
   - Astro automatically code-splits React components
   - Each component loads only when needed

4. **Optimize Re-renders**
   - Use `React.memo`, `useMemo`, `useCallback` in React
   - Keep component state minimal

---

## 📝 Files Created

- ✅ `src/components/ProductSearch.tsx` - Example React search component
- ✅ `REACT-GUIDE.md` - This documentation

---

## 🎯 Next Steps

1. **Try the ProductSearch component:**
   ```astro
   ---
   import ProductSearch from '../components/ProductSearch.tsx';
   import { products } from '../data/products.js';
   ---
   
   <ProductSearch products={products} client:idle />
   ```

2. **Convert existing features to React:**
   - Mobile menu
   - Search functionality
   - Contact forms
   - Image galleries

3. **Add more React components:**
   - Shopping cart
   - User authentication
   - Real-time chat
   - Product reviews

---

**React is now fully integrated and ready to use!** 🎉
