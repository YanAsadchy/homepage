import { Linkedin, Mail, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-16 py-10">
      <div className="max-w-3xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:yan.asadchy@gmail.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-default"
                >
                  yan.asadchy@gmail.com
                </a>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">+37256270701</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Tallinn, Estonia</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Social</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.linkedin.com/in/yan-asadchy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-default"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:yan.asadchy@gmail.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-default"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/yan-asadchy-cv.pdf"
                  download
                  className="text-sm text-muted-foreground hover:text-foreground transition-default"
                >
                  Download CV (PDF)
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-default"
                >
                  About Me
                </a>
              </li>
              <li>
                <a
                  href="/about/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-default"
                >
                  Get in Touch
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Yan Asadchy. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/yan-asadchy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-default"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:yan.asadchy@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-default"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
