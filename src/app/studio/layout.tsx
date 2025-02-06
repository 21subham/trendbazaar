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
      <title>TrendBazaar</title>
      <body>{children}</body>
    </html>
  );
}
