import { BlogContent } from './blog-content.interface';
import { BlogStatus } from './blog-status.enum';
import { BlogType } from './blog-type.enum';
import { Category } from './category.interface';

export interface Blog {
  type: BlogType;
  categories: Category[];
  createdDate?: Date;
  postedDate?: Date;
  id?: string;
  status?: BlogStatus;
  author: string;
  tags?: string[];
  repost?: boolean;
  repostId?: string;
  content: BlogContent;
}
