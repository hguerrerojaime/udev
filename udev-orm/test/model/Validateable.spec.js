import assert from 'assert';

import { Validateable } from '../../index';

describe('Validateable', function() {
  describe('annotating a class with @Validateable', function() {

    @Validateable
    class Post {

       static attrs = {
          title : 'string',
          author : 'string',
          body : 'string'
       };

       static constraints = {
         title : { presence:true },
         author : { presence:true, email:true }
       }

    }

    it('should have an invalid email error', function() {
       let post = new Post({ title:"udev-orm for dummies"});
       post.author = "calacohotmail.com";
       assert.ok(Object.keys(post.errors).includes("author"));
    });

    it('should have title and author required errors', function() {
       let post = new Post();
       assert.ok(Object.keys(post.errors).includes("title"));
       assert.ok(Object.keys(post.errors).includes("author"));
    });
  });
});
