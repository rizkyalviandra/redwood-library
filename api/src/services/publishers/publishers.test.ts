import type { Publisher } from '@prisma/client'

import {
  publishers,
  publisher,
  createPublisher,
  updatePublisher,
  deletePublisher,
} from './publishers'
import type { StandardScenario } from './publishers.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('publishers', () => {
  scenario('returns all publishers', async (scenario: StandardScenario) => {
    const result = await publishers()

    expect(result.length).toEqual(Object.keys(scenario.publisher).length)
  })

  scenario('returns a single publisher', async (scenario: StandardScenario) => {
    const result = await publisher({ id: scenario.publisher.one.id })

    expect(result).toEqual(scenario.publisher.one)
  })

  scenario('creates a publisher', async () => {
    const result = await createPublisher({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a publisher', async (scenario: StandardScenario) => {
    const original = (await publisher({
      id: scenario.publisher.one.id,
    })) as Publisher
    const result = await updatePublisher({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a publisher', async (scenario: StandardScenario) => {
    const original = (await deletePublisher({
      id: scenario.publisher.one.id,
    })) as Publisher
    const result = await publisher({ id: original.id })

    expect(result).toEqual(null)
  })
})
