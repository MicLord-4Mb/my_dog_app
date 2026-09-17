import type { SyntheticEvent } from 'react';
import type { SearchMode } from '@/types/books.types';
import { SEARCH_MODE } from '@/types/books.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

/**
 * Props for the `BookSearchForm` component.
 */
export interface BookSearchFormProps {
  /** Current text query draft value */
  query: string;
  /** Active search mode (all, title, author) */
  mode: SearchMode;
  /** Whether search request is currently pending */
  isLoading: boolean;
  /** Number of results loaded, or null if no search has been executed */
  resultsCount: number | null;
  /** Callback fired when user edits search text input */
  onQueryChange: (query: string) => void;
  /** Callback fired when user chooses a different search mode */
  onModeChange: (mode: SearchMode) => void;
  /** Callback fired when form is submitted */
  onSubmit: () => void;
  /** Callback fired when reset button is pressed */
  onReset: () => void;
}

const STYLES = {
  card: 'relative overflow-hidden bg-surface-container-lowest border-secondary-fixed/40 shadow-sm',
  accentBar: 'absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary-container via-primary to-primary-fixed',

  cardHeader: 'pb-2',
  titleWrap: 'flex items-center gap-2',
  titleIcon: 'material-symbols-outlined text-primary text-[22px]',
  cardTitle: 'font-headline text-lg font-bold text-on-surface tracking-tight',
  cardDescription: 'text-secondary text-xs',
  cardContent: 'pt-2',

  form: 'flex flex-col gap-4',
  row: 'flex flex-col md:flex-row md:items-end gap-4',

  fieldWrap: 'flex-1 flex flex-col gap-1',
  label: 'font-body text-sm font-semibold text-on-surface flex items-center justify-between',
  labelHint: 'text-secondary text-xs font-medium',
  inputWrap: 'relative flex items-center',
  inputIcon: 'material-symbols-outlined absolute left-3.5 text-secondary pointer-events-none text-[20px] z-10',
  input: 'pl-10 pr-10 bg-surface-container-low',
  clearBtn:
    'absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full text-secondary hover:text-on-surface z-10',
  clearIcon: 'material-symbols-outlined text-[18px]',

  selectWrap: 'w-full md:w-52 flex flex-col gap-1',
  selectLabel: 'font-body text-sm font-semibold text-on-surface',
  selectTrigger: 'bg-surface-container-low',
  selectContent: '',

  actionsRow: 'flex items-center gap-2',
  submitBtn: 'gap-1.5',
  submitIcon: 'material-symbols-outlined text-[18px]',
  resetBtn: 'gap-1.5',
  resetIcon: 'material-symbols-outlined text-[18px]',

  statusRow: 'flex flex-wrap items-center justify-between gap-2 pt-1 text-secondary text-xs font-medium',
  statusLeft: 'flex items-center gap-2',
  statusBadge: 'gap-1 font-semibold',
  statusBadgeIcon: 'material-symbols-outlined text-[14px] text-primary',
  statusDivider: 'text-secondary',
  statusRight: 'flex items-center gap-1.5',
  statusDot: 'inline-block w-2 h-2 rounded-full bg-primary-container animate-pulse',
};

/**
 * Search input form component for querying Open Library:
 * - Text search input with instant clear button.
 * - Mode dropdown selector (Any field, Title, Author).
 * - Submit and reset action controls.
 * - Real-time results count and API connection badge.
 *
 * @param {BookSearchFormProps} props - Component properties.
 * @returns Rendered search form card.
 * @returns Rendered search form card.
 */
export const BookSearchForm = ({
  query,
  mode,
  isLoading,
  resultsCount,
  onQueryChange,
  onModeChange,
  onSubmit,
  onReset,
}: BookSearchFormProps) => {
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit();
    };

    return (
      <Card className={STYLES.card}>
        <div className={STYLES.accentBar} />

        <CardHeader className={STYLES.cardHeader}>
          <div className={STYLES.titleWrap}>
            <span className={STYLES.titleIcon}>travel_explore</span>
            <CardTitle className={STYLES.cardTitle}>Search Books</CardTitle>
          </div>
          <CardDescription className={STYLES.cardDescription}>
            Find books by title, author, or keyword in the Open Library catalog
          </CardDescription>
        </CardHeader>

        <CardContent className={STYLES.cardContent}>
          <form className={STYLES.form} onSubmit={handleSubmit}>
            <div className={STYLES.row}>
              {/* Query Field */}
              <div className={STYLES.fieldWrap}>
                <label className={STYLES.label} htmlFor="book-search-input">
                  <span>Query</span>
                  <span className={STYLES.labelHint}>Supports title, author, ISBN</span>
                </label>
                <div className={STYLES.inputWrap}>
                  <span className={STYLES.inputIcon}>search</span>
                  <Input
                    id="book-search-input"
                    type="text"
                    placeholder="Harry Potter, Tolkien, Alice..."
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    className={STYLES.input}
                  />
                  {query && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className={STYLES.clearBtn}
                      title="Clear input"
                      aria-label="Clear input"
                      onClick={() => onQueryChange('')}
                    >
                      <span className={STYLES.clearIcon}>close</span>
                    </Button>
                  )}
                </div>
              </div>

              {/* Mode Selector (shadcn Select) */}
              <div className={STYLES.selectWrap}>
                <label className={STYLES.selectLabel} htmlFor="book-search-mode">
                  Mode
                </label>
                <Select
                  value={mode}
                  onValueChange={(val) => onModeChange(val as SearchMode)}
                >
                  <SelectTrigger id="book-search-mode" className={STYLES.selectTrigger}>
                    <SelectValue placeholder="Mode" />
                  </SelectTrigger>
                  <SelectContent className={STYLES.selectContent}>
                    <SelectItem value={SEARCH_MODE.ALL}>Any field</SelectItem>
                    <SelectItem value={SEARCH_MODE.TITLE}>Title</SelectItem>
                    <SelectItem value={SEARCH_MODE.AUTHOR}>Author</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className={STYLES.actionsRow}>
                <Button type="submit" disabled={isLoading} className={STYLES.submitBtn}>
                  <span className={STYLES.submitIcon}>travel_explore</span>
                  <span>{isLoading ? 'Searching...' : 'Search'}</span>
                </Button>
                <Button type="button" variant="secondary" onClick={onReset} className={STYLES.resetBtn}>
                  <span className={STYLES.resetIcon}>restart_alt</span>
                  <span>Reset</span>
                </Button>
              </div>
            </div>

            {/* Bottom Status Row */}
            <div className={STYLES.statusRow}>
              <div className={STYLES.statusLeft}>
                {resultsCount !== null && (
                  <>
                    <Badge variant="secondary" className={STYLES.statusBadge}>
                      <span className={STYLES.statusBadgeIcon}>check_circle</span>
                      Found {resultsCount} results
                    </Badge>
                    <span className={STYLES.statusDivider}>•</span>
                  </>
                )}
                <span>Open Library API via Redux Dispatch</span>
              </div>
              <div className={STYLES.statusRight}>
                <span className={STYLES.statusDot} />
                <span>Live Catalog Sync</span>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };
