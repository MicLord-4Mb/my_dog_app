import type { Book } from '@/types/books.types';
import { Badge } from '@/components/ui/badge';

interface BookListProps {
  books: Book[];
  selectedBookKey: string | null;
  onSelect: (bookKey: string) => void;
}

const STYLES = {
  header: 'flex items-center justify-between px-1',
  headerLeft: 'flex items-center gap-2',
  title: 'font-headline text-2xl font-semibold text-on-surface tracking-tight',
  sortLabel: 'text-xs font-medium text-secondary',
  list: 'flex flex-col gap-2',

  itemBase:
    'group p-4 rounded-xl shadow-sm cursor-pointer transition-all duration-200 relative overflow-hidden',
  itemActive: 'bg-primary-fixed/40',
  itemInactive: 'bg-surface-container-lowest hover:bg-surface-container-low border border-secondary-fixed/30',
  activeIndicator: 'absolute left-0 top-0 bottom-0 w-1.5 bg-primary',

  itemContent: 'flex items-start justify-between gap-2',
  itemTextBlock: 'flex flex-col',
  itemTitle:
    'font-headline text-base font-bold text-on-surface group-hover:text-primary transition-colors leading-snug',
  itemActivePl: 'pl-1.5',
  itemAuthor: 'text-sm text-on-surface-variant flex items-center gap-1 mt-0.5',
  itemAuthorIcon: 'material-symbols-outlined text-[16px] text-primary',

  metaRow: 'flex items-center gap-1.5 mt-2 text-xs text-secondary',
  metaIcon: 'material-symbols-outlined text-[14px]',
};

export const BookList = ({ books, selectedBookKey, onSelect }: BookListProps) => {
  return (
    <aside className="lg:col-span-5 flex flex-col gap-4">
      <div className={STYLES.header}>
        <div className={STYLES.headerLeft}>
          <h2 className={STYLES.title}>Results</h2>
          <Badge variant="secondary">{books.length}</Badge>
        </div>
        <span className={STYLES.sortLabel}>Sort: Relevance</span>
      </div>

      <div className={STYLES.list} role="listbox" aria-label="Book search results">
        {books.map((book) => {
          const isSelected = book.key === selectedBookKey;

          return (
            <div
              key={book.key}
              role="option"
              aria-selected={isSelected}
              tabIndex={0}
              className={`${STYLES.itemBase} ${isSelected ? STYLES.itemActive : STYLES.itemInactive}`}
              onClick={() => onSelect(book.key)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(book.key);
                }
              }}
            >
              {isSelected && <div className={STYLES.activeIndicator} />}

              <div className={STYLES.itemContent}>
                <div className={`${STYLES.itemTextBlock} ${isSelected ? STYLES.itemActivePl : ''}`}>
                  <span className={STYLES.itemTitle}>{book.title}</span>
                  <span className={STYLES.itemAuthor}>
                    <span className={STYLES.itemAuthorIcon}>person</span>
                    {book.authors.length > 0 ? book.authors.join(', ') : 'Unknown author'}
                  </span>
                </div>
                <Badge variant={isSelected ? 'default' : 'outline'} className="shrink-0">
                  {book.firstPublishYear ?? '—'}
                </Badge>
              </div>

              <div className={`${STYLES.metaRow} ${isSelected ? STYLES.itemActivePl : ''}`}>
                <span className={STYLES.metaIcon}>auto_stories</span>
                <span>{book.editionCount ? `${book.editionCount} Editions` : 'Open Library'}</span>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
