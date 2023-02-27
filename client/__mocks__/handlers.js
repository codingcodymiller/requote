import { rest } from 'msw';
export const handlers = [
  rest.get('/api/books', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.set('Content-Type', 'application/json'),
      ctx.json([
        {
          id: 'test1234',
          title: 'Test Book',
          image: '/images/placeholder-image.jpg',
          authors: ['codingcodymiller'],
          isbn: '1231-123-12313',
          description: 'Don\'t be alarmed, this is just a test'
        },
        {
          id: 'test12345',
          title: 'Test Book: The Sequel',
          image: '/images/placeholder-image.jpg',
          authors: ['codingcodymiller'],
          isbn: '1231-123-12314',
          description: 'This isn\'t your grandpa\'s test.'
        }
      ]));
  }),
  rest.get('/api/quote/:quoteId', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.set('Content-Type', 'application/json'),
      ctx.json({
        page: 1,
        quoteText: 'When you test stuff, you want it to work.',
        isPrivate: false
      }));
  })
];
