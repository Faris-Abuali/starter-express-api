export enum UserRoleEnum {
  SUPER_ADMIN = "super admin",
  UNI_TRAINING_OFFICER = "university training officer",
  TRAINER = "trainer",
  STUDENT = "student",
  ADMIN_AND_REGISTRATION = "administration and registration",
  Company = "company",
}
export const mapUserRoleStringToNum = {
  SUPER_ADMIN: 1,
  UNI_TRAINING_OFFICER: 2,
  TRAINER: 3,
  STUDENT: 4,
  ADMIN_AND_REGISTRATION: 5,
  Company: 6,
}
export enum TrainingStatusEnum {
  pending = 'pending',
  rejected = 'rejected',
  running = 'running',
  canceled = 'canceled',
  submitted = 'submitted',
  completed = 'completed',
}

export enum TrainingTypeEnum {
  first = 'first',
  second = 'second',
  compound = 'compound',
}