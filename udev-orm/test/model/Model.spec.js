import { expect } from 'chai';

import { Model } from '../../src/index';

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
       expect(post.title).to.be.equal("This is a Post");
       expect(post.model.title()).to.be.equal(post.title);
    });
  });
});
