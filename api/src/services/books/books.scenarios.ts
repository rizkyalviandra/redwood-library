import type { Prisma, Book } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.BookCreateArgs>({
  book: {
    one: { data: { title: 'String' } },
    two: { data: { title: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Book, 'book'>
