export type ProcessStep = {
  title: string;
  description: string;
  /** Optional photo (options A and B show it). */
  image?: { src: string; alt: string };
  /** Short takeaway taken from the step's own text, e.g. "Magnet sweep included". Never a new claim. */
  note?: string;
};
