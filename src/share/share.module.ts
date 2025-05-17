import { Module } from '@nestjs/common';
import { ShareDatabaseModule } from './modules/share-database/share-database.module';

@Module({
  imports: [ShareDatabaseModule],
  controllers: [],
  providers: [],
  exports: [ShareDatabaseModule],
})
export class ShareModule {}
