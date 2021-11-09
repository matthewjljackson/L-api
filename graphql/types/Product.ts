import { enumType, objectType } from 'nexus';
import { User } from './User';

export const Product = objectType({
  name: 'Product',
  definition(t) {
    t.nonNull.int('id'),
    t.nonNull.string('productName'),
    t.nonNull.float('price'),
    t.nonNull.boolean('inStock'),
    t.nonNull.int('quantity'),
    t.nonNull.field('seasonalItem', { type: Season }),
    t.nonNull.field('user', {
      type: User,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.link
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .user()
      }
    })
  }
})

const Season = enumType({
  name: 'Season',
  members: ['WINTER','SUMMER']
})