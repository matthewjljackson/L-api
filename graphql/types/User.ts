import { objectType } from 'nexus';
import { Product } from './Product';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id'),
    t.nonNull.string('name'),
    t.nonNull.string('email'),
    t.list.field('product', {
      type: Product,
      async resolve( parent, _args, ctx ) {
        return await ctx.prisma.user.findUnique({
          where: {
            id: parent.id
          }
        }).product()
      }
    })
  }
})