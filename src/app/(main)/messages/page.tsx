import { Metadata } from "next";
import Chat from "./Chat";

export const metadata: Metadata = {
  title: "المحادثات",
};

export default function Page() {
  return <Chat />;
}
