import { DefaultPojoType, Entity } from '@project/libs/shared/core';
import { Token } from '@project/libs/shared/app-types';

export class RefreshTokenEntity implements Token ,Entity<string> {
  public createdAt: Date;
  public expiresIn: Date;
  public id: string;
  public tokenId: string;
  public userId: string;

  constructor(token: Token) {
    this.populate(token);
  }
  toPOJO(): DefaultPojoType {
    throw new Error('Method not implemented.');
  }
  accessToken: string;


  //public toPOJO() {
    //return {
     // id: this.id,
     // userId: this.userId,
     // tokenId: this.tokenId,
     // createdAt: this.createdAt,
     // expiresIn: this.expiresIn,

    //};
  //}

  public populate(data: Token): void {
    this.userId = data.userId;
    this.id = data.id;
    this.tokenId = data.tokenId;
    this.createdAt = data.createdAt;
    this.expiresIn = data.expiresIn;
  }

  static fromObject(data: Token): RefreshTokenEntity {
    return new RefreshTokenEntity(data);
  }
}
