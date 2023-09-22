import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AlarmType } from "../types/alarm"
import Alarm from "./Alarm"
import { NotificationType } from "../types/notification-type"
import Notification from "./Notification"
import NavBar from "./NavBar"
import { Formik, Field, Form, FormikHelpers } from "formik"
import { CreateAlarmValues } from "../types/alarm-create"

export default function Home() {
  const navigate = useNavigate()
  const [errors, setErrors] = useState<string[]>([])
  const [alarms, setAlarms] = useState<AlarmType[]>([])
  const [notifications, setNotifications] = useState<NotificationType[]>([])
  const [shouldRefetch, setShouldRefetch] = useState(false)

  const onSubmitHandler = async (
    values: CreateAlarmValues,
    { setSubmitting }: FormikHelpers<CreateAlarmValues>
  ) => {
    const apiRootUrl = import.meta.env.VITE_REACT_API_URL
    try {
      const body = JSON.stringify(values)
      const createAlarmRes = await axios.post(`${apiRootUrl}/alarms`, body, { headers: { "Content-Type": "application/json", Authentication: localStorage.getItem("token") } })
      if (createAlarmRes.status === 201) {
        setShouldRefetch(true)
      }
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


  useEffect(() => {
    const rootApiUrl = import.meta.env.VITE_REACT_API_URL
    const fethData = async () => {
      try {
        const userRes = await axios.get(`${rootApiUrl}/users`, { headers: { Authentication: localStorage.getItem("token"), "Content-Type": "application/json" } })
        if (userRes.status !== 200) {
          navigate("/sign-in")
        }
      } catch (error) {
        console.error(error)
        navigate("/sign-in")
      }

      // list users alarms
      const listAlarms = async () => {
        try {
          const alarmRes = await axios.get(`${rootApiUrl}/alarms`, { headers: { Authentication: localStorage.getItem("token"), "Content-Type": "application/json" } })
          setAlarms([...alarmRes.data])
          console.log(alarms)
        } catch (error) {
          console.error(error)
          navigate("/sign-in")
        }
      }
      listAlarms()

      const listNotifications = async () => {
        try {
          const notificationRes = await axios.get(`${rootApiUrl}/notifications`, { headers: { Authentication: localStorage.getItem("token"), "Content-Type": "application/json" } })
          setNotifications([...notificationRes.data])
          console.log("notifications: ", notifications)
        } catch (error) {
          console.error(error)
          navigate("/sign-in")
        }
      }
      listNotifications()
    }
    fethData()
  }, [shouldRefetch])

  console.log(alarms)

  return (
    <div>
      <NavBar signedIn={true} />
      <div className="flex justify-between">
        <div>
          Alarms:
          {alarms.map(item => <Alarm key={item.id} id={item.id} currencyName={item.currencyName} rate={item.rate} targetNotificationId={item.targetNotificationId} targetRate={item.targetRate} tenPercentNotificationId={item.tenPercentNotificationId} tenPercentRotationNotificationId={item.tenPercentRotationNotificationId} userId={item.userId} />)}
        </div>
        <div>
          Notifications:
          {notifications.map(item => <Notification key={item.id} id={item.id} title={item.title} content={item.content} createdAt={item.createdAt} userId={item.userId} status={item.status ? "read" : "unread"} />)}
        </div>
      </div>
      <div>
        <Formik initialValues={{
          currencyName: "",
          targetRate: 0,
        }}
          onSubmit={onSubmitHandler}>
          <Form className="flex justify-between flex-col py-20 max-w-xl gap-3">
            <div id="my-radio-group">
              <div role="group" aria-labelledby="my-radio-group">
                <label className="inline-flex items-center">
                  <Field
                    type="radio"
                    name="currencyName"
                    value="G-1"
                    className="form-radio h-5 w-5 text-emerald-400"
                  />
                  <span className="ml-2 text-gray-700">G-1</span>
                </label>
                <label className="inline-flex items-center">
                  <Field
                    type="radio"
                    name="currencyName"
                    value="USD"
                    className="form-radio h-5 w-5 text-emerald-400"
                  />
                  <span className="ml-2 text-gray-700">USD</span>
                </label>
                <label className="inline-flex items-center">
                  <Field
                    type="radio"
                    name="currencyName"
                    value="EUR"
                    className="form-radio h-5 w-5 text-emerald-400"
                  />
                  <span className="ml-2 text-gray-700">EUR</span>
                </label>
              </div>
            </div>
            <Field
              id="targetRate"
              name="targetRate"
              type="number"
              placeholder="Target Rate"
              className="border border-gray-300 rounded p-2 text-center focus:outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              className="bg-emerald-400 text-lg font-bold py-2 px-4 text-white rounded hover:bg-emerald-500"
            >
              Submit
            </button>
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
    </div>
  )
}