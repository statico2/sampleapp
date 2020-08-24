import { useQuery } from "@apollo/react-hooks"
import { useForm } from "react-hook-form"
import { withApollo } from "../lib/apollo"
import { WHO_AM_I } from "../lib/queries"
import { useLogInMutation } from "../types"

const LoginForm = () => {
  const { register, handleSubmit, errors, setError } = useForm()
  const [login, response] = useLogInMutation()

  const onSubmit = async (input: any) => {
    const { data } = await login({
      variables: { email: input.email, password: input.password },
      refetchQueries: [{ query: WHO_AM_I }]
    })
    if (data.result.success) {
      if (process.browser) {
        localStorage.setItem("authToken", data.result.token)
        location.reload()
      }
    } else {
      setError("password", "invalid", data.result.error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        defaultValue={process.env.DEVELOPMENT ? "test@sampleapp.local" : ""}
        ref={register({ required: true })}
      />
      <br />
      {errors.email && <div>Email is required.</div>}
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        ref={register({ required: true })}
      />
      <br />
      {errors.password && <div>Password is required.</div>}
      <input type="submit" />
    </form>
  )
}

const LogOutButton = () => {
  const logout = () => {
    if (process.browser) {
      localStorage.removeItem("authToken")
      location.reload()
    }
  }
  return <button onClick={logout}>Log Out</button>
}

const IndexPage = () => {
  const { error, data } = useQuery(WHO_AM_I)

  if (error) return <span>Error: {String(error)}</span>
  if (!data) return <span>Loading...</span>

  if (data.me) {
    return (
      <div>
        Hello, {data.me.email}!
        <br />
        <LogOutButton />
      </div>
    )
  } else {
    return <LoginForm />
  }
}

export default withApollo()(IndexPage)
