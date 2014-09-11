github-issue-prioritizer
========================

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

