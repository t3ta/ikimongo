export interface IIGObservation {
  id?: string;
  noteId?: string | null;
  createdAt?: Date;
  updatedAt?: Date | null;
  userId?: string;
  userHost?: string | null;
  fileIds?: string[];
  attachedFileTypes?: string[];
  date?: Date | null;
  decimalLatitude?: number | null;
  decimalLongitude?: number | null;
}

export interface IIGObservationRequest {
  date: Date | null;
  decimalLatitude: number | null;
  decimalLongitude: number | null;
}
