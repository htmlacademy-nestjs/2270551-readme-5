import { BlogType, VideoBlogContent } from '@project/libs/shared/app-types';
import { BlogContent } from './dto/create-blog.dto';

export const isVideoBlogConent = (type: BlogType, content: BlogContent): content is VideoBlogContent => {
  return type === BlogType.Video;
}
