import createExhibitionsRouter from './exhibitions';
import createArtistsRouter from './artists';

export default function createApiRouter(prefix = '/api') {
  return [
    createArtistsRouter(prefix),
    createExhibitionsRouter(prefix),
  ];
}
