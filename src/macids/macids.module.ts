import { Module } from '@nestjs/common';
import { MacidsService } from './macids.service';
import { MacidsController } from './macids.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Macid } from './entities/macid.entity';

@Module({
  controllers: [MacidsController],
  providers: [MacidsService],
  imports: [TypeOrmModule.forFeature([Macid])],
})
export class MacidsModule {}
