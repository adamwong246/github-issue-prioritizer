github-issue-prioritizer
========================

- priority
  - lower is better
  - `priority(i) = time_criticality(i) + business_value(i) + technical_value(i) + completion(i) + blocks(i).sum(e, e.priority)`


##### dimensions
- `time_criticality(i) -> (i.due_date - today) * tcScaler`
  - time left to complete task
  
- `business_value(i) -> i.business_value * bvScaler * -1`
  - the value provided by the task
  
- `technical_value(i) -> i.technical_value * tdcScaler * -1`
  - the technical value provided by the task
  - positive is debt: need to fix
  - negative is credit: nice to fix

- `completion(i) -> i.completed * completionScaler`
  - amount of task done so far
  - 0% is 'not done at all'
  - 100% is 'done and finished'

##### example
Insert the following json into a issue description *as YAML frontmatter.* See issues for in this repo for more examples. 
```json
{
    "due_date": "Jan 1st 2015",   // any format you like
    "business_value": 15,         // -100..100, where -100 is bankruptcy and 100 is bought-out-by-google
    "technical_value": 10,        // -100..100, where -100 sets fire to the server and 100 is impossible
    "completion": 75,             // 0..100, where 0 is not-yet-started and 100 is done
    "blockers": [                 // a list of issues which block this issue
        1,
        2,
        3
    ],
    "blockees": [                 // a list of issues which are blocked by this issue
        97,
        98,
        99
    ],
    "points": 0                  // anything, primarily used for testing
}
```
