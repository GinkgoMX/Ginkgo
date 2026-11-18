// Downloadable documents on region and property pages.
export default function DocumentList({ documents }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {documents.map((doc) => (
        <li key={doc._id}>
          <a
            href={doc.file?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-border bg-paper p-5 text-ink shadow-sm transition-colors hover:border-brand-400 hover:text-brand-600"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-brand-600" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
              <path d="M14 3v5h5M12 12v6M9.5 15.5 12 18l2.5-2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="min-w-0 truncate">{doc.title}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
