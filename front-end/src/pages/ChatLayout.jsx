import ChatSide from "./ChatSide";
import Contact from "./Contact";

export default function ChatLayout() {
  return (
    <div className="flex flex-row">
        <Contact/>
        <ChatSide/>
    </div>
  )
}
