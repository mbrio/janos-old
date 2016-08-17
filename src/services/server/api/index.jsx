import createExhibitionsApi from './exhibitions';

export default function createApi(app, prefix = '/api') {
  createExhibitionsApi(app, prefix);
}
