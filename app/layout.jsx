import { Cormorant_Garamond, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import RevealObserver from "@/components/RevealObserver";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

// Display face for large public headlines only (font-display). Montserrat
// stays the brand's UI/label face and Poppins the body face; the admin panel
// never uses the display face.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display-face",
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

export const metadata = {
  metadataBase: new URL("https://ginkgomx.com"),
  title: {
    default: "GINKGO — Strategic Land Opportunities in Mexico",
    template: "%s | GINKGO",
  },
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: the inline script below adds the "js" class
    // before React hydrates, which would otherwise be reported as a mismatch.
    <html className={`${cormorant.variable} ${montserrat.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body>
        {/* Scroll-reveal styles only apply under html.js, so if scripts never
            run nothing is left hidden. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {children}
        <RevealObserver />
        <Analytics />
      </body>
    </html>
  );
}
