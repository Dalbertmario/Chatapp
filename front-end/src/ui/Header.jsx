
export default function Header({username}) {
  return (
    <div className="bg-slate-100 p-4">
        <p className="font-semibold">{username?.name}</p>
    </div>
  )
}
