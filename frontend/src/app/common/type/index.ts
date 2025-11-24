export type CommonOptions = {
  value: number | string | boolean;
  label: string;
};

export type FilterType = {
  key: string;
  label: string;
  options: CommonOptions[];
};
