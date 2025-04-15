export const metadata = {
  title: 'Fashion Community',
  description: 'A community for sharing fashion magazines and reviews',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
} 