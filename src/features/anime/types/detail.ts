// src/features/anime/types/detail.ts

export interface CharacterImage {
  jpg: {
    image_url: string;
    small_image_url: string;
  };
}

export interface VoiceActorPerson {
  mal_id: number;
  url: string;
  images: CharacterImage;
  name: string;
}

export interface VoiceActor {
  person: VoiceActorPerson;
  language: string;
}

export interface AnimeCharacter {
  character: {
    mal_id: number;
    url: string;
    images: CharacterImage;
    name: string;
  };
  role: string;
  favorites: number;
  voice_actors: VoiceActor[];
}

export interface AnimeCharactersResponse {
  data: AnimeCharacter[];
}

// ─── Staff ────────────────────────────────────────────────────────────────────

export interface StaffPerson {
  mal_id: number;
  url: string;
  images: CharacterImage;
  name: string;
}

export interface AnimeStaffEntry {
  person: StaffPerson;
  positions: string[];
}

export interface AnimeStaffResponse {
  data: AnimeStaffEntry[];
}

// ─── Recommendations ──────────────────────────────────────────────────────────

export interface RecommendationEntry {
  mal_id: string;
  entry: {
    mal_id: number;
    url: string;
    images: CharacterImage;
    title: string;
  };
  content: string;
  date: string;
  user: {
    url: string;
    username: string;
  };
  votes: number;
}

export interface AnimeRecommendationsResponse {
  data: RecommendationEntry[];
}
