import assert from 'assert';

import { model as m } from '../../src/index';

describe('Entity', function() {
  describe('#indexOf()', function() {

    @m.Entity
    class MyEntity {

    }

    it('should return -1 when the value is present', function() {
       console.log(m);
    });
  });
});
