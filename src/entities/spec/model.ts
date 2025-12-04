export type Spec = {
  id: string;
  title: string | null;
  spec: object;
  createdAt: Date;
};

export type SpecResponse = {
  id: string;
  title: string | null;
  spec: object;
  createdAt: string;
};
