import { Formik, FormikHelpers, Form, Field } from "formik";
import NavBar from "./NavBar";
import AuthFormValues from "../types/auth-values";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const navigate = useNavigate()
  const [errors, setErrors] = useState<string[]>([])

  const onSubmitHandler = async (
    values: AuthFormValues,
    { setSubmitting }: FormikHelpers<AuthFormValues>
  ) => {
    const apiRootUrl = import.meta.env.VITE_REACT_API_URL
    try {
      const body = JSON.stringify(values)
      console.log("sending body: ", body)
      const signUpRes = await axios.post(`${apiRootUrl}/auth/sign-up`, body, { headers: { "Content-Type": "application/json" } })
      if (signUpRes.status === 201) {
        navigate("/sign-in")
      }
      console.log("signUpRes:", signUpRes)
      setSubmitting(false)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        const responseErrors = error.response?.data.message
        if (responseErrors.length) {
          setErrors([])
          if (Array.isArray(responseErrors)) {
            setErrors([...responseErrors])
          } else {
            setErrors([responseErrors])
          }

        }
      }
      setSubmitting(false)
    }
  }

  return (
    <div>
      <NavBar />
      <Formik initialValues={{
        email: "",
        password: "",
      }}
        onSubmit={onSubmitHandler}>
        <Form className="flex justify-between flex-col py-20 max-w-xl gap-3">
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="example@example.com"
            type="email"
            className="text-center"
          />
          <label htmlFor="password">Password</label>
          <Field id="password" name="password" type="password" placeholder="password" className="text-center" />
          <button type="submit" className=" bg-emerald-400 text-lg font-bold p-1 text-white rounded">Submit</button>
        </Form>
      </Formik>
      {
        errors.length ? <ul>
          {
            errors.map((item, idx) => (
              <li key={idx} className=" text-red-500">{item}</li>
            ))
          }
        </ul>
          : ""
      }
    </div>
  )
}