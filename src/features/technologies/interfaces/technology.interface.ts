export interface Technology {
  uuid: string;
  name: string;
  iconUrl: string;
}

export interface CreateTechnologyInput {
  name: string;
  iconUrl: string;
}