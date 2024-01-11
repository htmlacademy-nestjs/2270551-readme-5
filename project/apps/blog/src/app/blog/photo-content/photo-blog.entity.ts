import {PhotoBlogContent} from '@project/libs/shared/app-types'

export class PhotoBlogEntity implements PhotoBlogContent {
  public path: string;
  public id: string;
  public name: string;

  constructor(blog: PhotoBlogContent) {
    this.populate(blog);
  }


  public toPOJO() {
    return {
      path: this.path,
      name: this.name,
      id: this.id,
    };
  }

  public populate(data: PhotoBlogContent): void {
    this.path = data.path;
    this.id = data.id;
    this.name = data.name;
  }
}
