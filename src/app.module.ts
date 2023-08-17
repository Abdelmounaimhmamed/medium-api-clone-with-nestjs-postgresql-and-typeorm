import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TagModule } from './tags/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './ormConfig';
import { UserModule } from './User/User.module';
import { AuthMiddleware } from './User/middlewares/auth.middleware';
import { ArticleModule } from './Articles/article.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig),TagModule,UserModule,ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer : MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL
    });
  }
}
