import type { DogBreedDto } from '@/api/dto/dogBreed.dto';
import type { DogBreed } from '@/features/breeds/breedSlice';

/**
 * Maps raw API DTO to strongly-typed domain model `DogBreed`.
 * 
 * Mapping logic:
 * - Resolves image URL from direct image object or fallback by `reference_image_id`.
 * - Parses comma-separated temperament string into trimmed array.
 * - Trims whitespace and normalizes optional strings.
 * 
 * @param dto - Raw DTO from TheDogAPI.
 * @returns Domain `DogBreed` entity.
 */
export const mapDogBreedDtoToDomain = (dto: DogBreedDto): DogBreed => {
  // Resolve image URL (using direct image URL or fallback to reference_image_id)
  let imageUrl: string | null = dto.image?.url || null;

  // This information is in the API documentation, but it's a hack.
  if (!imageUrl && dto.reference_image_id) {
    imageUrl = `https://cdn2.thedogapi.com/images/${dto.reference_image_id}.jpg`;
  }

  // Parse comma-separated temperament string into trimmed array
  const temperament = dto.temperament
    ? dto.temperament.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  return {
    id: String(dto.id),
    name: dto.name,
    bredFor: dto.bred_for || undefined,
    breedGroup: dto.breed_group ? dto.breed_group.trim() : undefined,
    lifeSpan: dto.life_span || undefined,
    temperament,
    origin: dto.origin || undefined,
    description: dto.description || undefined,
    history: dto.history || undefined,
    heightMetric: dto.height?.metric,
    heightImperial: dto.height?.imperial,
    weightMetric: dto.weight?.metric,
    weightImperial: dto.weight?.imperial,
    imageUrl,
  };
};
