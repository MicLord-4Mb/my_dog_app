import type {DogBreed} from "@/types/breed.types";
import {useEffect, useRef} from "react";

const STYLES = {
  dialog: "fixed inset-0 m-auto p-4 sm:p-6 bg-transparent max-w-5xl max-h-[90vh] backdrop:bg-black/85 backdrop:backdrop-blur-md border-0 outline-none select-none overflow-hidden",
  wrapper: "relative flex flex-col items-center justify-center max-w-full max-h-full",
  closeBtn: "fixed top-4 right-4 sm:top-6 sm:right-6 z-50 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
  image: "max-h-[75vh] sm:max-h-[78vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain",
  titleArea: "mt-3 text-center text-white",
  title: "font-headline font-bold text-lg sm:text-xl",
  groupText: "text-xs sm:text-sm text-white/70",
};

interface BreedLightboxProps {
  breed: DogBreed;
  isOpen: boolean;
  onClose: () => void;
}

export const BreedLightbox = ({ breed, isOpen, onClose }:BreedLightboxProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else  if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  if (!breed.imageUrl) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className={STYLES.dialog}
    >
      <div className={STYLES.wrapper}>
        <button
          type="button"
          onClick={onClose}
          className={STYLES.closeBtn}
          aria-label="Close lightbox"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>
        <img src={breed.imageUrl} alt={breed.name} className={STYLES.image} />
        <div className={STYLES.titleArea}>
          <h3 className={STYLES.title}>{breed.name}</h3>
          {breed.breedGroup && <p className={STYLES.groupText}>{breed.breedGroup}</p>}
        </div>
      </div>
    </dialog>
  )
};

