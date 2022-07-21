export interface Roles {
  jobOffer?: boolean;
  jobSeeker?: boolean;
}

export interface User {
  uid: string;
  email: string;
  roles: Roles;
}
