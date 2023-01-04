import { faker } from '@faker-js/faker';

export default function createCredentials() {
  return {
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
  };
}
