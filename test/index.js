var assert = require("assert");
var should = require('should');

var gip = require ("./../index.js");

describe('github-issue-prioritizer', function(){
  describe('#prioritizeIssues()', function(){
    
    it('it should have a title', function(){
      gip.prioritizeIssues(require('./fixtures/single.json'))[0].should.have.property('title', 'Gone with the wind');
    });

    it('it should have a number', function(){
      gip.prioritizeIssues(require('./fixtures/single.json'))[0].should.have.property('number', 99);
    });

    it('it should recognize due_date', function(){
      gip.prioritizeIssues(require('./fixtures/single.json'))[0].priority.attributes.should.have.property('due_date', 'Dec 25, 2000');
    });

    it('it should recognize business_value', function(){
      gip.prioritizeIssues(require('./fixtures/single.json'))[0].priority.attributes.should.have.property('business_value', 1);
    });

    it('it should recognize technical_value', function(){
      gip.prioritizeIssues(require('./fixtures/single.json'))[0].priority.attributes.should.have.property('technical_value', 2);
    });

    it('it should recognize completion', function(){
      gip.prioritizeIssues(require('./fixtures/single.json'))[0].priority.attributes.should.have.property('completion', 0);
    });

    it('it should recognize blockers', function(){
      gip.prioritizeIssues(require('./fixtures/single.json'))[0].priority.attributes.should.have.property('blockers', [1,2]);
    });

    it('it should recognize blockees', function(){
      gip.prioritizeIssues(require('./fixtures/single.json'))[0].priority.attributes.should.have.property('blockees', [3]);
    });

    it('it should have a calculated', function(){
      gip.prioritizeIssues(require('./fixtures/single.json'))[0].priority.should.have.property('calculated');
    });

    it('the 0th should have 1 points', function(){
      gip.prioritizeIssues(require('./fixtures/multiple.json'))[0].priority.attributes.should.have.property('points', 1);
    });

    it('the 1st should have 2 points', function(){
      gip.prioritizeIssues(require('./fixtures/multiple.json'))[1].priority.attributes.should.have.property('points', 2);
    });

    it('the 1st should have 3 points', function(){
      gip.prioritizeIssues(require('./fixtures/multiple.json'))[2].priority.attributes.should.have.property('points', 3);
    });

    it('the 0th and 2nd should NOT have blockers or blockees', function(){
      gip.prioritizeIssues(require('./fixtures/multiple.json'))[0].priority.attributes.should.not.have.property('blockers');
      gip.prioritizeIssues(require('./fixtures/multiple.json'))[0].priority.attributes.should.not.have.property('blockees');
      gip.prioritizeIssues(require('./fixtures/multiple.json'))[2].priority.attributes.should.not.have.property('blockers');
      gip.prioritizeIssues(require('./fixtures/multiple.json'))[2].priority.attributes.should.not.have.property('blockees');
    });

    it('the 1st should have blockers: [0]', function(){
      gip.prioritizeIssues(require('./fixtures/multiple.json'))[1].priority.attributes.should.have.property('blockers', [0]);
    });

    it('the 1nd should have blockees: [2]', function(){
      gip.prioritizeIssues(require('./fixtures/multiple.json'))[1].priority.attributes.should.have.property('blockees', [2]);
    });

    it('the 0th should have a calculated', function(){
      gip.prioritizeIssues(require('./fixtures/multiple.json'))[0].priority.should.have.property('calculated', 1);
    });

    it('the 1st should have a calculated', function(){
      gip.prioritizeIssues(require('./fixtures/multiple.json'))[1].priority.should.have.property('calculated', 3);
    });

    it('the 2nd should have a calculated', function(){
      gip.prioritizeIssues(require('./fixtures/multiple.json'))[2].priority.should.have.property('calculated', 6);
    });

  });
});