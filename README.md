# micro-feature-flags

> Minimalist service for deterministic and state-less feature flags

micro-feature-flags uses deterministic hashing of `feature:id` to enable the safe rollout of features. You might use this to enable a new signup flow for a subset of users.

## API

#### Request Body

- `features` - feature name with enabled percent
- `id` - id used to check for enabled features

``` json
{
  "id": "user-id",
  "features": {
    "feature-one": 20,
    "feature-two": 70,
    "another-feature": 15
  }
}
```

#### Response Body

``` json
{
  "feature-one": false,
  "feature-two": true,
  "another-feature": false
}
```

## Example Request

```
$ curl localhost:3000 -d '{
  "id": "user-id",
  "features": {
    "feature-one": 20,
    "feature-two": 70,
    "another-feature": 15
  }
}'
{"feature-one":false,"feature-two":true,"another-feature":false}
```
