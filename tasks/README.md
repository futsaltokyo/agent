# Tasks

Here, we define a list of tasks that runs in the background, in the perspective of the requesters / clients.

These tasks, while also AWS Lambda functions, are not HTTP-facing and hence are not exposed via the API gateway.

Specifically, these tasks can be to automate the actual reservation of the courts at the scheduled time, or to perform some prepatory work in advance of the reservation, such as obtaining a valid session cookie ahead of reservation.

## Authorization & Security Policy

Once deployed into an AWS environment, these tasks should only be invoked by the scheduler (CloudWatch). Hence the right IAM policy should be set.

### Contingency

In the event that we need to trigger some tasks manually, the right IAM policy has to applied, and you can invoke the functions via `aws-cli` on your terminal, or on the web console.

## Secrets

Since the tasks would require secrets (e.g., user credentials to make web reservation), these can be supplied via environment variables. Due to best practices, it is recommended we separate the env files for these tasks and the HTTP handlers.
> For instance, `env-http-handlers.yml` is meant for HTTP handlers only.
