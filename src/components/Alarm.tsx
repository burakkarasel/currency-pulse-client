export default function Alarm(props: any) {
  const { id, currencyName, rate, targetNotificationId, targetRate,
    tenPercentNotificationId, tenPercentRotationNotificationId, userId } = props

  return (
    <div className="bg-white shadow-md rounded p-4 m-2 w-80">
      <div className="text-gray-700">
        <p><span className="font-semibold">Currency Name:</span> {currencyName}</p>
        <p><span className="font-semibold">Current Rate:</span> {rate}</p>
        <p><span className="font-semibold">Target Rate:</span> {targetRate}</p>
      </div>
    </div>
  );

}