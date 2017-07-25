import assert from 'assert';

import { Model } from '../../index';

describe('Model', function() {
  describe('annotating a class with @Model', function() {

    @Model
    class Post {

       static attrs = {
          title : 'string'
       };

    }

    it('should have a title atribute with setter and getter and be the same in the attrubutes property', function() {
       let post = new Post();
       post.title = "This is a Post"
       assert.equal("This is a Post", post.title);
       assert.equal("This is a Post", post.model.title());
    });
  });
});
