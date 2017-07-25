import assert from 'assert';

import { Entity } from '../../index';

describe('Entity', function() {
  describe('annotating a class with @Entity', function() {

    @Entity()
    class Post {

       static attrs = {
          title : 'string',
          author : 'string'
       };

    }

    it ('should have an id',function(){
      assert.ok(Object.keys(Post.meta.model.attrs).includes("id"));
    });

  });
});
