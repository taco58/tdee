import "./globals.css";

export const metadata = {
  title: "Adaptive TDEE",
  description: "Adaptive calorie tracking app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}