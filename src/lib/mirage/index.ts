import {
  createServer,
  Model,
  Factory,
  ActiveModelSerializer,
  Response,
} from 'miragejs'
import { faker } from '@faker-js/faker'

type User = {
  name: string
  email: string
  created_at: string
}

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`
        },
        email() {
          return faker.internet.email().toLowerCase()
        },
        createdAt() {
          return faker.date.anytime()
        },
      }),
    },

    seeds(server) {
      server.createList('user', 100)
    },

    routes() {
      this.namespace = 'api'
      this.timing = 750

      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 5 } = request.queryParams

        const total = schema.all('user').length
        const offset = (Number(page) - 1) * Number(per_page)
        const limit = offset + Number(per_page)

        const users = this.serialize(schema.all('user')).users.slice(
          offset,
          limit
        )

        return new Response(200, { 'x-total-count': String(total) }, { users })
      })

      this.get('/users/:id')
      this.post('/users')

      this.namespace = ''
      this.passthrough()
    },
  })
  return server
}
