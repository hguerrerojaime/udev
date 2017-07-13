import assert from 'assert';

import { Entity, PersistenceContext, EntityException, Validateable } from '../../src/index';

describe('PersistenceContext', function() {
  describe('Registering a valid Entity class into the context', function() {

    @Entity()
    class Post {

       static attrs = {
          title : 'string',
          author : 'string'
       };

    }

    let context = new PersistenceContext();

    context.registerEntity(Post);

    it ('should be able to be in the context',function(){
      assert.equal(context.entities[0],Post);
    });

  });

  describe('Registering a non annotated class into the context', function() {

    class NotAnEntity {

       static attrs = {
          title : 'string'
       };

    }

    let context = new PersistenceContext();

    it ('should throw an EntityException',function(){
      assert.throws(function () {
         context.registerEntity(NotAnEntity);
      },EntityException);
    });

  });

  describe('Registering a non-entity annotated class into the context', function() {

    @Validateable()
    class NotAnEntity {

       static attrs = {
          title : 'string'
       };

    }

    let context = new PersistenceContext();

    it ('should throw an EntityException',function(){
      assert.throws(function () {
         context.registerEntity(NotAnEntity);
      },EntityException);
    });

  });
});
