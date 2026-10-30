import { footerCopy, navLinks, site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="surface-light section !pt-16 !pb-10">
      <div className="container-ecs">
        <div className="flex flex-col gap-10 pb-10 rule-top pt-10 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <span className="t-h4">
              eco<span style={{ color: "var(--color-flare)" }}>tech</span>
            </span>
            <p className="t-body mt-3">{site.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="t-label text-soft mb-3">Site</p>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="t-ui hover-rule">
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#contact" className="t-ui hover-rule">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="t-label text-soft mb-3">Contact</p>
              <ul className="space-y-2">
                <li>
                  <a href={`mailto:${site.email}`} className="t-ui hover-rule">
                    {site.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="t-ui hover-rule">
                    {site.phone}
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="t-label text-soft mb-3">Based in</p>
              <p className="t-body">{site.location}</p>
            </div>
          </div>
        </div>

        <div className="rule-top pt-6">
          <p className="t-mono text-soft max-w-3xl">{footerCopy.disclaimer}</p>
          <p className="t-ui text-soft mt-6">
            &copy; 2026 ECOSTECH. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
