import { Migration } from '@mikro-orm/migrations';

export class Migration20221229111442 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table `user` (`id` varchar(36) not null, `email` varchar(255) not null, `password` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `verified_at` datetime null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;',
    );
    this.addSql('alter table `user` add unique `user_email_unique`(`email`);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `user`;');
  }
}
