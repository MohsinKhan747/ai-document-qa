export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: "1.5rem",
          fontFamily: "Georgia, 'Times New Roman', serif",
          lineHeight: 1.5,
          background:
            "linear-gradient(180deg, #f7f3ea 0%, #efe6d6 45%, #e7ddd0 100%)",
          color: "#1f1a14",
          minHeight: "100vh",
        }}
      >
        {children}
      </body>
    </html>
  );
}
