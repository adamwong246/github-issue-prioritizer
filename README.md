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
This goes in the description of an issue
```json
{
    "due_date": "Jan 1st 2015",
    "business_value": 15,
    "technical_value": 10,
    "completion": 75,
    "blocks": [
        1,
        2,
        3
    ]
}
```
