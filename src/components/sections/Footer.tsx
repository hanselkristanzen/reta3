import { profile } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8">
      <div className="container-page flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-mist">
          © {year} {profile.fullName}
        </p>
        <div className="flex items-center gap-6">
          <p className="type-meta">Cyber Security Student · {profile.university}</p>
          <a href="#home" className="text-mist transition-colors can-hover:text-paper">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
