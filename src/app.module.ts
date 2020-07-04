import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonModule } from 'src/person/person.module';
import { DocumentModule } from 'src/document/document.module';
import { VehicleModule } from 'src/vehicle/vehicle.module';
import { CommissionModule } from 'src/commission/commission.module';
import { TripPaymentsModule } from 'src/payment/trip.payment.module';
import { FeedBackModule } from 'src/feedback/feedback.module';

@Module({
  imports: [UserModule, PersonModule, DocumentModule, VehicleModule, CommissionModule, TripPaymentsModule, FeedBackModule, MongooseModule.forRoot('mongodb://localhost/kooly')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
