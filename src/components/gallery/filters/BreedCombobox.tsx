import React, { useState } from 'react';
import type { DogBreed } from '@/features/breeds/breedSlice';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Props for the `BreedCombobox` component.
 */
export interface BreedComboboxProps {
  /** Array of breeds to display and filter in the dropdown. */
  breeds: DogBreed[];
  /** Currently selected breed entity, or null if none. */
  selectedBreed?: DogBreed | null;
  /** ID of the selected breed, used for item active/check state. */
  selectedBreedId?: string | null;
  /** Callback fired when a breed item is chosen from the list. */
  onSelectBreed: (breedId: string) => void;
  /** Placeholder displayed on the trigger button when no breed is selected. */
  placeholder?: string;
  /** Placeholder text for the filter search input. */
  searchPlaceholder?: string;
  /** Optional class names to style the trigger button. */
  className?: string;
}

const STYLES = {
  triggerButton: 'w-full h-11 justify-between rounded-xl bg-surface-container-lowest border-secondary-fixed text-on-surface text-sm font-medium shadow-xs hover:border-primary hover:bg-surface-container-lowest',
  triggerContent: 'flex items-center gap-2.5 truncate',
  petIcon: 'material-symbols-outlined text-primary text-[20px]',
  unfoldIcon: 'material-symbols-outlined text-on-surface-variant text-[20px] shrink-0 ml-2',
  popoverContent: 'p-0',
  itemActive: 'font-semibold',
  itemLabel: 'truncate flex-1',
  checkIcon: 'material-symbols-outlined text-primary text-[16px] shrink-0',
};

/**
 * Reusable searchable combobox dropdown for selecting dog breeds.
 * Manages its own open/close popover state internally to isolate re-renders.
 */
export const BreedCombobox: React.FC<BreedComboboxProps> = ({
  breeds,
  selectedBreed,
  selectedBreedId = selectedBreed?.id,
  onSelectBreed,
  placeholder = 'Select a breed...',
  searchPlaceholder = 'Search breed...',
  className,
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (id: string) => {
    onSelectBreed(id);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(STYLES.triggerButton, className)}
        >
          <div className={STYLES.triggerContent}>
            <span className={STYLES.petIcon}>pets</span>
            <span className="truncate">
              {selectedBreed ? selectedBreed.name : placeholder}
            </span>
          </div>
          <span className={STYLES.unfoldIcon}>
            unfold_more
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={STYLES.popoverContent}>
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>No breeds found.</CommandEmpty>
            <CommandGroup>
              {breeds.map((breed) => {
                const isCurrent = breed.id === selectedBreedId;
                return (
                  <CommandItem
                    key={breed.id}
                    value={breed.name}
                    onSelect={() => handleSelect(breed.id)}
                    className={isCurrent ? STYLES.itemActive : ''}
                  >
                    <span className={STYLES.itemLabel}>{breed.name}</span>
                    {isCurrent && (
                      <span className={STYLES.checkIcon}>
                        check
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
