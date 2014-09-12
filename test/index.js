var assert = require("assert");
var should = require('should');

var gip = require ("./../index.js");

describe('github-issue-prioritizer', function(){
  describe('#prioritizeIssues()', function(){
    
    it('it should have a title', function(){
      (
        new gip(require('./fixtures/single.json')).output()
      )[0].should.have.property('title', 'Gone with the wind');
    });

    it('it should have a number', function(){
      new gip(require('./fixtures/single.json')).output()[0].should.have.property('number', 99);
    });

    it('it should recognize due_date', function(){
      new gip(require('./fixtures/single.json')).output()[0].priority.attributes.should.have.property('due_date', 'Dec 25, 2000');
    });

    it('it should recognize business_value', function(){
      new gip(require('./fixtures/single.json')).output()[0].priority.attributes.should.have.property('business_value', 1);
    });

    it('it should recognize technical_value', function(){
      new gip(require('./fixtures/single.json')).output()[0].priority.attributes.should.have.property('technical_value', 2);
    });

    it('it should recognize completion', function(){
      new gip(require('./fixtures/single.json')).output()[0].priority.attributes.should.have.property('completion', 0);
    });

    it('it should recognize blockers', function(){
      new gip(require('./fixtures/single.json')).output()[0].priority.attributes.should.have.property('blockers', [1,2]);
    });

    it('it should have a calculated', function(){
      new gip(require('./fixtures/single.json')).output()[0].priority.should.have.property('calculated');
    });

    it('the 0th should have 1 points', function(){
      new gip(require('./fixtures/multiple.json')).output()[0].priority.attributes.should.have.property('points', 1);
    });

    it('the 1st should have 2 points', function(){
      new gip(require('./fixtures/multiple.json')).output()[1].priority.attributes.should.have.property('points', 2);
    });

    it('the 2nd should have 3 points', function(){
      new gip(require('./fixtures/multiple.json')).output()[2].priority.attributes.should.have.property('points', 3);
    });

    it('the 1st should have blockers: [0]', function(){
      new gip(require('./fixtures/multiple.json')).output()[1].priority.attributes.should.have.property('blockers', [0]);
    });

    it('the 2nd should have blockers: [1]', function(){
      new gip(require('./fixtures/multiple.json')).output()[2].priority.attributes.should.have.property('blockers', [1]);
    });

    it('the 0th should have a calculated', function(){
      new gip(require('./fixtures/multiple.json')).output()[0].priority.should.have.property('calculated', 1);
    });

    it('the 1st should have a calculated', function(){
      new gip(require('./fixtures/multiple.json')).output()[1].priority.should.have.property('calculated', 3);
    });

    it('the 2nd should have a calculated', function(){
      new gip(require('./fixtures/multiple.json')).output()[2].priority.should.have.property('calculated', 6);
    });

  });
});