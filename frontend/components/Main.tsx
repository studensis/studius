import React, { FC, ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Student } from "../typings";

type MainPageProps = {
  children?: ReactNode | ReactNode[];
};

const Main = () => {
  const { status, data } = useSession();
  const [user, setUser] = useState<Student | undefined>(undefined);

  // UZIMANJE IZ SESSION NAME-A

  // useEffect(() => {
  //   if (data) {
  //     setUser(JSON.parse(data.user.name));
  //     console.log(user);
  //   }
  // }, [data]);

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  if (status == "authenticated") {
    return (
      <div className="bg-[#F5F6FA] h-[4000px] w-screen overflow-auto">
        <div className="absolute left-[72px] top-[72px] px-60 p-32 h-[4000px] ">
          <h1 className="display3  ">
            Welcome{user ? " back, " + user.name : ""}!
          </h1>
          <div>
            <h1 className="title1 mt-10 mb-4">Upcoming events</h1>
            <div className="flex gap-2">
              <div className="w-[292px] h-[121px] rounded-2xl bg-white "></div>
              <div className="w-[292px] h-[121px] rounded-2xl bg-white "></div>
              <div className="w-[292px] h-[121px] rounded-2xl bg-white "></div>
              <div className="w-[292px] h-[121px] rounded-2xl bg-white "></div>
            </div>
          </div>
          <div>
            <h1 className="title1 mt-10 mb-4">Subjects</h1>
            <div className="grid grid-cols-3 gap-2 ">
              <div className="w-[392px] h-[227px] rounded-2xl bg-white "></div>
              <div className="w-[392px] h-[227px] rounded-2xl bg-white "></div>
              <div className="w-[392px] h-[227px] rounded-2xl bg-white "></div>
              <div className="w-[392px] h-[227px] rounded-2xl bg-white "></div>
              <div className="w-[392px] h-[227px] rounded-2xl bg-white "></div>
              <div className="w-[392px] h-[227px] rounded-2xl bg-white "></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Main;
