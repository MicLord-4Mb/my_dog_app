import type { Book } from '@/types/books.types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface BookCardProps {
  book: Book;
}

const STYLES = {
  wrapper: 'lg:col-span-7 sticky top-24',
  topBar: 'flex items-center justify-between pb-2',
  topBarLeft: 'flex items-center gap-2',
  keyLabel: 'text-xs text-secondary',

  hero: 'grid grid-cols-1 sm:grid-cols-12 gap-6 items-center',

  coverCol: 'sm:col-span-5 relative group',
  coverAspect: 'w-full aspect-[3/4] rounded-xl overflow-hidden bg-surface-container shadow-md relative',
  coverImg: 'w-full h-full object-cover transition-transform duration-500 group-hover:scale-105',
  coverGradient:
    'absolute inset-0 bg-gradient-to-t from-on-surface/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity',
  coverRibbon:
    'absolute top-2 left-2 px-2 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-sm shadow-sm flex items-center gap-1 text-xs text-on-surface font-semibold',
  coverRibbonIcon: 'material-symbols-outlined text-[14px] text-primary',
  coverPlaceholder:
    'w-full aspect-[3/4] rounded-xl overflow-hidden bg-surface-container shadow-md flex flex-col items-center justify-center gap-2 text-secondary',
  coverPlaceholderIcon: 'material-symbols-outlined text-[48px] text-outline-variant',

  infoCol: 'sm:col-span-7 flex flex-col gap-2',
  yearRow: 'flex items-center gap-2',
  chipRow: 'flex flex-wrap gap-1.5 pt-1',
  titleText: 'font-headline text-3xl font-bold text-on-surface tracking-tight',
  authorRow: 'text-base text-on-surface-variant flex items-center gap-1.5',
  authorHighlight: 'text-primary font-semibold',
  description: 'text-base text-secondary leading-relaxed pt-1',

  metaSection: 'bg-surface-container-low rounded-xl p-4',
  metaHeading:
    'font-headline text-sm text-on-surface font-bold uppercase tracking-wider mb-2 flex items-center gap-1',
  metaHeadingIcon: 'material-symbols-outlined text-[18px] text-primary',
  metaGrid: 'grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs',
  metaItem: 'flex flex-col',
  metaDt: 'text-secondary uppercase tracking-wider',
  metaDdDefault: 'text-on-surface text-sm font-semibold mt-0.5',
  metaDdPrimary: 'text-primary font-mono text-xs font-semibold mt-0.5',

  subjectsSection: 'flex flex-col gap-1',
  subjectsLabel: 'text-xs text-secondary uppercase tracking-wider',
  subjectsRow: 'flex flex-wrap gap-1.5',

  actionsRow: 'flex flex-col sm:flex-row items-center gap-4 pt-2',
};

const MAX_VISIBLE_SUBJECTS = 4;

export const BookCard = ({ book }: BookCardProps) => {
  const subjects = book.subjects ?? [];
  const visibleSubjects = subjects.slice(0, MAX_VISIBLE_SUBJECTS);
  const hiddenCount = subjects.length - MAX_VISIBLE_SUBJECTS;
  const openLibraryUrl = `https://openlibrary.org${book.key}`;

  return (
    <article className={STYLES.wrapper}>
      <Card className="p-6 flex flex-col gap-6 relative bg-surface-container-lowest border-secondary-fixed/40">
        {/* Top Bar */}
        <div className={STYLES.topBar}>
          <div className={STYLES.topBarLeft}>
            <Badge variant="amber" className="gap-1 uppercase tracking-wider font-bold text-xs">
              <span className="material-symbols-outlined text-[14px]">bookmark_heart</span>
              Selected Book
            </Badge>
            <span className={STYLES.keyLabel}>OL Work: {book.key}</span>
          </div>
        </div>

        {/* Hero: Cover + Info */}
        <div className={STYLES.hero}>
          {/* Cover */}
          <div className={STYLES.coverCol}>
            {book.coverUrl ? (
              <div className={STYLES.coverAspect}>
                <img
                  src={book.coverUrl}
                  alt={`Cover of ${book.title}`}
                  className={STYLES.coverImg}
                />
                <div className={STYLES.coverGradient} />
                <div className={STYLES.coverRibbon}>
                  <span className={STYLES.coverRibbonIcon}>menu_book</span>
                  <span>Open Library</span>
                </div>
              </div>
            ) : (
              <div className={STYLES.coverPlaceholder}>
                <span className={STYLES.coverPlaceholderIcon}>auto_stories</span>
                <span className="text-sm font-medium">No cover available</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className={STYLES.infoCol}>
            <div className={STYLES.yearRow}>
              {book.firstPublishYear && (
                <Badge variant="default">{book.firstPublishYear} Edition</Badge>
              )}
            </div>

            <h2 className={STYLES.titleText}>{book.title}</h2>

            <p className={STYLES.authorRow}>
              <span className="font-semibold text-on-surface">By</span>
              <span className={STYLES.authorHighlight}>
                {book.authors.length > 0 ? book.authors.join(', ') : 'Unknown author'}
              </span>
            </p>

            {/* Chips */}
            <div className={STYLES.chipRow}>
              {book.rating != null && (
                <Badge variant="secondary" className="gap-1 px-2.5 py-1 text-xs font-medium">
                  <span
                    className="material-symbols-outlined text-primary text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  {book.rating.toFixed(1)} Rating
                </Badge>
              )}
              {book.editionCount != null && (
                <Badge variant="secondary" className="gap-1 px-2.5 py-1 text-xs font-medium">
                  <span className="material-symbols-outlined text-[16px] text-secondary">auto_stories</span>
                  {book.editionCount} Editions
                </Badge>
              )}
            </div>

            {book.description && (
              <p className={STYLES.description}>{book.description}</p>
            )}
          </div>
        </div>

        {/* Metadata Grid */}
        <div className={STYLES.metaSection}>
          <h3 className={STYLES.metaHeading}>
            <span className={STYLES.metaHeadingIcon}>info</span>
            Publication & Archive Schema
          </h3>
          <dl className={STYLES.metaGrid}>
            <div className={STYLES.metaItem}>
              <dt className={STYLES.metaDt}>Primary Author</dt>
              <dd className={STYLES.metaDdDefault}>
                {book.authors.length > 0 ? book.authors.join(', ') : 'Unknown'}
              </dd>
            </div>
            <div className={STYLES.metaItem}>
              <dt className={STYLES.metaDt}>First Publish Year</dt>
              <dd className={STYLES.metaDdDefault}>
                {book.firstPublishYear ?? 'No data'}
              </dd>
            </div>
            <div className={STYLES.metaItem}>
              <dt className={STYLES.metaDt}>Open Library Identifier</dt>
              <dd className={STYLES.metaDdPrimary}>{book.key}</dd>
            </div>
            {subjects.length > 0 && (
              <div className={STYLES.metaItem}>
                <dt className={STYLES.metaDt}>Canonical Subjects</dt>
                <dd className={STYLES.metaDdDefault}>{subjects.join(', ')}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Subject Chips */}
        {visibleSubjects.length > 0 && (
          <div className={STYLES.subjectsSection}>
            <span className={STYLES.subjectsLabel}>Categorization Tags</span>
            <div className={STYLES.subjectsRow}>
              {visibleSubjects.map((s) => (
                <Badge key={s} variant="secondary" className="font-medium">
                  {s}
                </Badge>
              ))}
              {hiddenCount > 0 && (
                <Badge variant="outline">+{hiddenCount} more</Badge>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className={STYLES.actionsRow}>
          <Button asChild className="w-full sm:w-auto flex-1 h-12 gap-1.5">
            <a
              href={openLibraryUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-[20px]">open_in_new</span>
              <span>View on Open Library</span>
            </a>
          </Button>
        </div>
      </Card>
    </article>
  );
};
