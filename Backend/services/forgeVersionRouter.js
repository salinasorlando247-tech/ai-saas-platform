import { processForgeV1 } from './versions/forge.v1.js'
import { processForgeV1_1 } from './versions/forge.v1_1.js'

export const routeForgeObject = forgeObject => {
  switch (forgeObject.forge_version) {
    case '1.0':
      return processForgeV1(forgeObject)
    case '1.1':
      return processForgeV1_1(forgeObject)
    default:
      throw new Error('Unsupported Forge version')
  }
}
