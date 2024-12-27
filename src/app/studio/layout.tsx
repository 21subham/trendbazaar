export const metadata = {
  title: "Next.js",
  description: "Ecommerce app /studio/layout.tsx",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
