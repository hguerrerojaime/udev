import assert from 'assert';

import { model as m } from '../../src/index';

describe('Entity', function() {
  describe('annotating a class with Entity', function() {

    @m.Entity()
    class Book {

       static attrs = {
          'name': 'any',
          'author': 'string',
          'body': { type:'string',required:true }
       };

    }

    it('should have a property name same as class but uncapitalized', function() {
       let book = new Book();
       book.name = "beto";
       console.log(book.name);

       assert.equal("Book", Book._entity.name);
    });
  });
});
