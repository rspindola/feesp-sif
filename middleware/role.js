export default function ({ $auth, route, redirect }) {
  const perms = $auth.user.UserAttributes.Permissions
  const routeName = route.name.replace('-', '')
  // eslint-disable-next-line array-callback-return
  const res = perms.filter((item) => {
    return routeName
      .toLowerCase()
      .split(' ')
      .every((v) => item.name.toLowerCase().includes(v))
  })

  if (res.length === 0) {
    return redirect('/')
  }
}
