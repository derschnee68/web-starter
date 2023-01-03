import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import User from '../entities/User';

export class DatabaseSeeder extends Seeder {
  private readonly team = ['user1', 'user2'];

  async run(em: EntityManager) {
    const existing = (await em.find(User, {}, { fields: ['id'] })).map(
      (u) => u.id,
    );

    for (const uid of this.team) {
      if (!existing.includes(uid)) {
        em.create(User, {
          id: uid,
          email: `${uid}@mywebsite.ai`,
          password:
            '{SSHA}xVgLL9FQklEItPTG3iLL/hjX8S2JvcZcImeRk/DhELSmMyx/AmHRbw==', // 123456 hashed
          verifiedAt: new Date(),
        });
      } else {
        await em.nativeUpdate(User, { id: uid }, { verifiedAt: new Date() });
      }
    }
  }
}
