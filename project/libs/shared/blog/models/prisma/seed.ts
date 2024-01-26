import { PrismaClient } from '@prisma/client';

const FIRST_POST_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_POST_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';
const THIRD_POST_UUID = '4584f855-cdd2-4a64-8891-d00e6cda909d';
const FOURTH_POST_UUID = 'decff723-35b0-4342-936e-72da864a0615';
const FIFTH_POST_UUID = '3f74022e-4141-43be-ae5f-b40ab6096b15';

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      type: 'video',
      status: 'public',
      userId: FIRST_USER_ID,
      videoBlog: {
        name: 'Mark Riman',
        link: 'https://youtu.be/aY1E8jegel8'
      }
    },
    {
      id: SECOND_POST_UUID,
      type: 'link',
      status: 'public',
      userId: FIRST_USER_ID,
      linkBlog: {
        link: 'https://youtu.be/FZ-9nWbJLqU'
      }
    },
    {
      id: THIRD_POST_UUID,
      type: 'photo',
      status: 'public',
      userId: FIRST_USER_ID,
      photoBlog: {
        photoId: '65afa15e54d0afd4999a3534',
        name: 'Vital Dorn'
      }
    },
    {
      id: FOURTH_POST_UUID,
      type: 'text',
      status: 'public',
      userId: SECOND_USER_ID,
      comments: [
        {
          message: 'Это действительно интересно!',
          userId: FIRST_USER_ID,
        },
        {
          message: 'надо все повторить.Очень интересно',
          userId: SECOND_USER_ID,
        }
    ],
      textBlog: {
        annotation: 'Наверное супер ?',
        name: 'ЛУЧШИЙ?',
        content: 'каждый думает как может',
      }
    },
    {
      id: FIFTH_POST_UUID,
      type: 'quote',
      status: 'public',
      userId: SECOND_USER_ID,
      quoteBlog: {
        quote: 'Без труда не вытянуть и рыбку из пруда',
        author: 'Vital Dorn',
      },
      likes: [
        {userId: FIRST_USER_ID }
      ]
    },
  ]
}
async function seedDb(prismaClient: PrismaClient) {
  const mockPosts = getPosts();
  for (const post of mockPosts) {
    await prismaClient.blog.create({
      data: {
        id: post.id,
        type: post.type,
        status: post.status,
        userId: post.userId,
        videoBlog: post.videoBlog ? {
          create: post.videoBlog
        } : undefined,
        textBlog: post.textBlog ? {
          create: post.textBlog
        } : undefined,
        photoBlog: post.photoBlog ? {
          create: post.photoBlog
        } : undefined,
        quoteBlog: post.quoteBlog ? {
          create: post.quoteBlog
        } : undefined,
        linkBlog: post.linkBlog ? {
          create: post.linkBlog
        } : undefined,
        comments: post.comments ? {
          create: post.comments
        } : undefined,
        likes: post.likes ? {
          create: post.likes
        } : undefined,
      }
    })
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
