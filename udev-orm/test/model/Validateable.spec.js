import { expect } from 'chai';

import { Validateable } from '../../src/index';

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
       expect(post.isValid()).to.be.false;
       expect(post.errors).to.have.property('author').with.lengthOf(1);
    });

    it('should have title and author required errors', function() {
       let post = new Post();
       expect(post.errors).to.have.property('title').with.lengthOf(1);
       expect(post.errors).to.have.property('author').with.lengthOf(1);
    });
  });
});
