// src/main.tsx (أو src/index.tsx)
// ================================================================
// استيراد وظائف Firebase التي تحتاجها
// ================================================================
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics"; // أضفنا logEvent أيضاً إذا احتجتها لاحقاً

// ================================================================
// كود تهيئة Firebase الخاص بمشروعك (هذا هو الكود الذي حصلت عليه)
// ================================================================
const firebaseConfig = {
  apiKey: "AIzaSyB3xfPu1m8Gu9WqJt4v9DkSgl2UOQjR4eY",
  authDomain: "webegypt-site.firebaseapp.com",
  projectId: "webegypt-site",
  storageBucket: "webegypt-site.firebasestorage.app",
  messagingSenderId: "544850438618",
  appId: "1:544850438618:web:a7f6c7e1fb7c2fdcb038e3",
  measurementId: "G-BK8XV297Z0" // الـ measurementId الخاص بك
};

// ================================================================
// تهيئة تطبيق Firebase و Google Analytics
// ================================================================
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ================================================================
// الكود الأصلي لتهيئة React الخاص بك
// ================================================================
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import React from "react"; // استيراد React ضروري لـ StrictMode

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ================================================================
// (اختياري) تصدير analytics و logEvent
// يمكنك تصديرهما لاستخدامهما في أي مكونات React أخرى لتسجيل الأحداث المخصصة
// مثال: import { analytics, logEvent } from '../main.tsx';
// ================================================================
export { analytics, logEvent };
