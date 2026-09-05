/**
 * DTO for physical measurements in imperial and metric units.
 */
export interface DogMeasurementDto {
  imperial?: string;
  metric?: string;
}

/**
 * DTO for dog image metadata from API.
 */
export interface DogImageDto {
  id?: string;
  url?: string;
  width?: number;
  height?: number;
}

/**
 * DTO for dog breed entity received from TheDogAPI.
 */
export interface DogBreedDto {
  id: number | string;
  name: string;
  bred_for?: string | null;
  breed_group?: string | null;
  life_span?: string;
  temperament?: string;
  origin?: string;
  description?: string;
  history?: string;
  reference_image_id?: string;
  weight?: DogMeasurementDto;
  height?: DogMeasurementDto;
  image?: DogImageDto;
}
