export const metadata = {
  title: "Siste-tall-har-sitt-eget-tall-som-posisjon-og-antall-bokstaver",
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
