import { expect } from 'chai';

import { model } from '../../src/index';

describe('model', function() {
  describe('creating a new meta model', function() {

    let Post = model('Post')
      .attr('title');

    it('the model class should exist', function() {
       expect(Post).to.exist;
    });

    it('the model class should have the title attribute', function() {
       expect(Post.attrs.title).to.exist;
    });

  });

  describe('instanciating a new meta model with no initial attributes',function() {
    let Post = model('Post')
      .attr('title');

    let post = new Post();

    it('the model instance should exist', function() {
      expect(post).to.exist;
    });

    it('should have the title function to set and get',function() {
      expect(post.title).to.be.a('function');
    });

    describe('setting up the title attribute some value', function() {

      post.title('some value');

      it('should have some value as the title attribute',function() {
        expect(post.title()).to.be.equal('some value');
      });

      it('should have the title attribute marked as dirty',function() {
        expect(post.dirty('title')).to.be.true;
      });

    });

  });

  describe('instanciating a new meta model with initial attributes',function() {
    let Post = model('Post')
      .attr('title');

    let post = new Post({ title:"my initial title" });

    it('the model instance should exist', function() {
      expect(post).to.exist;
    });

    it('should have an initial value as title',function() {
      expect(post.title()).to.exist;
    });

    it('should have the attribute with the initial value',function() {
      expect(post.title()).to.be.equal("my initial title");
    });

  });

  describe('creating two simultaneous meta models',function() {
    let Post = model('Post').attr('title');
    let Author = model('Author').attr('name');

    it('should have two different meta models', function() {
      expect(Post).to.be.not.equal(Author);
    });

    it('should have Post model with title attirbute',function() {
      expect(Post.attrs.title).to.exist;
    });

    it('should have Author model with name attirbute',function() {
      expect(Author.attrs.name).to.exist;
    });

    it('should have Post model without name attirbute',function() {
      expect(Post.attrs.name).to.not.exist;
    });

    it('should have Author model without title attirbute',function() {
      expect(Author.attrs.title).to.not.exist;
    });

  });
});
