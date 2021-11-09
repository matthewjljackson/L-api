import { booleanArg, enumType, extendType, floatArg, inputObjectType, intArg, mutationField, nonNull, objectType, queryField, stringArg } from 'nexus';
import { User } from './User';

export const Product = objectType({
  name: 'Product',
  definition(t) {
    t.nonNull.int('id'),
    t.nonNull.string('productName'),
    t.nonNull.float('price'),
    t.nonNull.boolean('inStock'),
    t.nonNull.int('quantity'),
    // t.nonNull.field('seasonalItem', { type: Season }),
    t.nonNull.int('userId'),
    t.nonNull.field('user', {
      type: User,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.product
          .findUnique({
            where: {
              id: parent.id,
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

export const ProductQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('product', {
      type: 'Product',
      args: {
        id: nonNull(intArg())
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.product.findUnique({
          where: {
            id: args.id
          }
        })
      },
    })
  },
})

export const ProductInputType = inputObjectType({
  name: 'ProductInputType',
  definition(t) {
    t.nonNull.string('productName'),
    t.nonNull.float('price'),
    t.nonNull.boolean('inStock'),
    t.nonNull.int('quantity'),
    t.nonNull.int('userId')
  }
})

export const CreateProductMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createProduct', {
      type: 'Product',
      args: { data: ProductInputType },
      resolve(_root, args, ctx) {
        console.log(args)
        const newProduct = {
          productName: args.data.productName,
          price: args.data.price,
          inStock: args.data.inStock,
          quantity: args.data.quantity,
          userId: args.data.userId
        }
        return ctx.prisma.product.create({
          data: newProduct
        })
      }
    })
  },
})

export const UpdateProductInputType = inputObjectType({
  name: 'UpdateProductInputType',
  definition(t) {
    t.nonNull.int('id'),
    t.string('productName'),
    t.float('price'),
    t.boolean('inStock'),
    t.int('quantity'),
    t.int('userId')
  }
})

export const UpdateProductMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateProduct', {
      type: 'Product',
      args: { data: UpdateProductInputType },
      resolve(_root, args, ctx) {
        console.log(args)
        const newProductInfo = {
          productName: args.data.productName,
            price: args.data.price,
            inStock: args.data.inStock,
            quantity: args.data.quantity,
            userId: args.data.userId
        }
        return ctx.prisma.product.update({
          where: {
            id: args.data.id
          },
          data: newProductInfo
        })
      }
    })
  },
})

export const DeleteProductMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteProduct', {
      type: 'Product',
      args: {
        id: nonNull(intArg())
      },
      resolve(_parent, args, ctx) {
        
      }
    })
  }
})