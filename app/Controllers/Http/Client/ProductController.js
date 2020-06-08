/* eslint-disable camelcase */
'use strict'

const Product = use('App/Models/Product')

class ProductController {
  async index ({ request, response }) {
    const categoryId = request.input('category')

    const query = Product.query()
// Fiz batota para ver se existe esta categorias
    if (categoryId==1 || categoryId==2 || categoryId==3 || categoryId==4 || categoryId==5 || categoryId==6 || categoryId==7 || categoryId==8 || categoryId==9 || categoryId==10 || categoryId==11 || categoryId==12) {
      query.where('category_id', categoryId)
    }
    else if(categoryId) // se nao existir... ele procura, ou seja na pesquisa ele pega o name e pesquisa !!
    {
      query.where('name', categoryId)
    }

    try {
      const products = await query.with('image').fetch()

      return response.status(200).send(products)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao listar produtos' })
    }
  }

  async show ({ params, response }) {
    try {
      const product = await Product.findOrFail(params.id)

      await product.loadMany({
        image: null,
        category: null,
        sizes: size => size.with('size')
      })

      return response.status(200).send(product)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao exibir produto' })
    }
  }
}

module.exports = ProductController
