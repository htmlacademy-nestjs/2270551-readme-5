import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

 export class UserRdo {
   @Expose()
   @ApiProperty({
    description: 'The uniq user ID',
    example: '12'
  })
   public id!: string;

   @Expose()
   @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png'
  })
   public avatar!: string;

   @Expose()
   @ApiProperty({
    description: 'User email',
    example: 'user@user.local'
  })
   public email!: string;

   @Expose()
   @ApiProperty({
    description: 'User first name',
    example: 'Keks'
  })
   public firstname!: string;

   @Expose()
   @ApiProperty({
    description: 'User last name',
    example: 'Keks'
  })
   public lastname!: string;
 }
