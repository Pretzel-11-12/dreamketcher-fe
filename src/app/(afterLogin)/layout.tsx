import {ReactNode} from "react";
import Header from "@/app/_component/Header";
import Footer from "@/app/_component/Footer";

type Props = { children: ReactNode, modal: ReactNode }
export default async function AfterLoginLayout({children, modal}: Props) {
  return (
    <div>
        <Header></Header>
        <main>{children}</main>
        <Footer></Footer>
    </div>
  )
}