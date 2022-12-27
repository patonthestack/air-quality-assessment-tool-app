export type OpenAQData = {
  meta: Meta;
  results: MeasurementData[];
};

type Meta = {
  name: string;
  license: string;
  website: string;
  found: number;
  limit: number;
  page: number;
};

type MeasurementData = {
  city: string;
  coordinates: Coordinate;
  country: string;
  location: string;
  measurements: Measurement[];
};

type Coordinate = {
  latitude: number;
  longitude: number;
};

export type Measurement = {
  parameter: string;
  value: number;
  lastUpdated: string;
  unit: string;
};
