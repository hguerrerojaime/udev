import assert from 'assert';

import { Entity } from '../../src/index';

describe('Entity', function() {
  describe('annotating a class with @Entity', function() {

    @Entity()
    class Post {

       static attrs = {
          title : 'string',
          author : 'string',
          body : 'string'
       };

    }

    it ('should have an id',function(){
      assert.ok(Object.keys(Post.meta.model.attrs).includes("id"));
    });

    it ('should have attribute finders',function(){

    });


  });
});
