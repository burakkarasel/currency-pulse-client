export default function Notification(props: any) {
  const { id, userId, createdAt, title, content, status } = props
  return (
    <div className="bg-white shadow-md rounded p-4 m-2 w-80">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-700 mb-2">{content}</p>
      <p className="text-gray-500 text-sm">{createdAt}</p>
    </div>
  );
}