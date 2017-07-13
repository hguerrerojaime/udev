import assert from 'assert';

import { Entity } from '../../src/index';

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

    it ('should have attribute finders',function(){
      assert.ok(typeof Post.get === "function");
      assert.ok(typeof Post.all === "function");
      assert.ok(typeof Post.count === "function");
      assert.ok(typeof Post.where === "function");
      assert.ok(typeof Post.findById === "function");
      assert.ok(typeof Post.findAllById === "function");
      assert.ok(typeof Post.countById === "function");
      assert.ok(typeof Post.findByTitle === "function");
      assert.ok(typeof Post.findAllByTitle === "function");
      assert.ok(typeof Post.countByTitle === "function");
      assert.ok(typeof Post.findByAuthor === "function");
      assert.ok(typeof Post.findAllByAuthor === "function");
      assert.ok(typeof Post.countByAuthor === "function");
    });


  });
});
