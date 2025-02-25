import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Contact from "../pages/Contact";
import ChatSide from "./ChatSide";

export default function ChatLayout() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const id = searchParams.get("id");
  console.log(name,id)

  useEffect(() => {
    if (name && id) {
      const data = { id, name: name };
      localStorage.setItem("user", JSON.stringify(data));
    }
  }, [name, id]); 

  return (
    <div className="flex flex-row">
      <Contact />
      <ChatSide />
    </div>
  );
}
