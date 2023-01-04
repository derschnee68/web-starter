import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { faker } from '@faker-js/faker';
import request from 'supertest-graphql';
import { gql } from 'apollo-server-core';

describe('App e2e tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const registerGql = gql`
    mutation Signup($email: String!, $password: String!) {
      signUp(email: $email, password: $password) {
        ... on Success {
          success
        }
      }
    }
  `;

  it('can register with valid credentials', async () => {
    await request(app.getHttpServer()).mutate(registerGql).variables({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  });
});
