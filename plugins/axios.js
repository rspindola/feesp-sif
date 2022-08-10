export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        Authorization:
          'eyJraWQiOiJUbzNwZ1RMb1wvcXp0M1NDZ3NYSElwa3FcL0RVWWExck9iRjhKRDBQanArNXc9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIxYTRkYjUyOC1kMTYyLTQ4ZGQtOTg2ZC0xMjdhZGQxMDYyZjAiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9GQXZIV3RiWlciLCJjb2duaXRvOnVzZXJuYW1lIjoiMWE0ZGI1MjgtZDE2Mi00OGRkLTk4NmQtMTI3YWRkMTA2MmYwIiwib3JpZ2luX2p0aSI6IjQxZjg0NWFhLTE2YWYtNDRmYy05OGVkLTYzZDk5MDBkM2IzMiIsImF1ZCI6IjZqaHNvc2ZzanRrb24zcHJ2dWFrczQ5MTA5IiwiZXZlbnRfaWQiOiIxZmYyYTEwYS1kNjZiLTQ0ZGYtODMwYS04MTViMTk5YTQwYzAiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY0Mjc2NDgwMiwibmFtZSI6IlJlbmF0byBDYXN0cm8iLCJleHAiOjE2NDI3Njg0MDEsImlhdCI6MTY0Mjc2NDgwMiwianRpIjoiZjVhYTYyNGMtYzRiNi00MmU2LWJmZTQtN2QxZDllNTliM2I5IiwiZW1haWwiOiJyc3BpbmRvbGFAbGl2ZS5jb20ifQ.dCBLniYffbIYbC5IWIPRofXgePP2DuC7CMQI1rV4XXCBmMqKXoinHjSnQ03AZgYr8ZyGsfGpIjvLnD6AZEl0a2eUCb5lZPsx5-EijaANwMlMal05vb7oGmxXHOWZzjKH_x1qmWtG3b8LP95lHTyA8rP7V1CD7nRPyIXKkj5-Ry7XHD31yVq3n2MJf0F0aOuWU8yhN1D883SfGbFC7RGUtpqEyYjlVHdoq2BJLakteQrqEQv5mRD0RYgEL33e30S__8RzBaVpvdL60yKrHNs_LKF6XDBbE5ILARz8C8J_iMUy1P3Gb137tUo38NVFjAXKCnEri8DIZexP0NUfncEMEg',
      },
    },
  })

  // Set baseURL to something different
  api.setBaseURL('https://is0bke5zmb.execute-api.us-east-2.amazonaws.com/dev')

  // Inject to context as $api
  inject('api', api)
}
