import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Student } from "../typings";
import { Button } from "./Button";
import Link from "next/link";
import Table from "./Table";
import Icon from "./Icon";
import Status from "./Status";

const UserManagment = ({ students }) => {
  const { status, data } = useSession();
  const [user, setUser] = useState<Student | undefined>(undefined);
  const [a, seta] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  return (
    <div className="absolute top-[80px] lg:left-[72px] w-full overflow-x-hidden lg:py-6 pt-0 flex flex-col items-center bg-light-background  ">
      <div className="lg:w-[72%] w-[100%] h-min bg-white  flex flex-col items-start lg:p-20 p-10 gap-6 rounded-3xl overflow-x-hidden  ">
        <div className="flex flex-row items-center gap-1 rounded-xl w-[95%] h-[40px] ">
          <Link
            passHref
            href="/userpage"
            className="object-cover flex flex-row items-center justify-center"
          >
            <a href="">
              <div className="rounded-xl bg-light-background p-3 gap-1 flex flex-row w-full h-full items-center justify-center">
                <Icon icon="back" />
                <p className="caption">Workspace tools</p>
              </div>
            </a>
          </Link>
        </div>
        <div className="lg:flex lg:flex-row justify-between gap-6 w-[95%] items-end  ">
          <div className="flex flex-col justify-between items-start gap-6 w-[493px] mb-6  ">
            <h1 className="display3">User Managment</h1>
            <h1 className="body1">Manage all users in the workspace</h1>
          </div>
          <div className="flex flex-col h-full justify-end ">
            <Link passHref href="/register">
              <a href="">
                <Button>
                  <p className="button-large">Add User</p>
                  <Icon icon="add" className="bg-white" />
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-flow-col grid-flow gap-3 lg:w-[72%] w-[100%] overflow-x-auto mb-2 mt-7 ">
        <div className="bg-white h-[124px]  rounded-3xl p-10 flex gap-4 ">
          <Status className="h-[44px] w-[44px] " color="blue">
            <Icon icon="statusInfo" className="" />
          </Status>
          <div>
            <p className="caption">Number of students</p>
            <p className="title2">{students.length}</p>
          </div>
        </div>
        <div className="bg-white h-[124px] rounded-3xl p-10 flex gap-4 ">
          <Status className="h-[44px] w-[44px] " color="green">
            <Icon icon="statusInfo" />
          </Status>
          <div>
            <p className="caption">Number of subjects</p>
            <p className="title2">0</p>
          </div>
        </div>
        <div className="bg-white h-[124px] rounded-3xl p-10 flex gap-4 ">
          <Status className="h-[44px] w-[44px] " color="red">
            <Icon icon="statusInfo" />
          </Status>
          <div>
            <p className="caption">Title</p>
            <p className="title2">Value</p>
          </div>
        </div>
      </div>
      <div className="h-min lg:w-[72%] w-[100%] bg-white p-10 rounded-3xl ">
        <p className="display2">Ovdje ide table</p>
        <p className="display2">Ovdje ide table</p>
        <p className="display2">Ovdje ide table</p>
        <p className="display2">Ovdje ide table</p>
        <p className="display2">Ovdje ide table</p>
        <p className="display2">Ovdje ide table</p>
      </div>
      <div className="grid grid-cols-4 my-5">
        {/* <Table data={JSON.parse(students)} /> */}
        {/* <ul>
        {students.map((s: Student) => (
          <li
            key={String(s.id)}
            className={
              a
                ? "w-[400px] rounded-xl shadow-xl p-5 mb-2 ml-8"
                : "w-[400px] rounded-xl shadow-xl p-5 mb-2"
            }
          >
            <p>
              <span className="font-bold">ID: </span>
              {String(s.id)}
            </p>
            <p>
              <span className="font-bold">Email: </span>
              {s.email}
            </p>
            <p>
              <span className="font-bold">Puno ime: </span>
              {s.name + " " + s.surname}
            </p>
            <p>
              <span className="font-bold">JMBAG: </span>
              {s.JMBAG}
            </p>
            <p>
              <span className="font-bold">JMBAG: </span>
              {s.JMBAG}
            </p>
          </li>
        ))}
      </ul> */}
      </div>
    </div>
  );
};

export default UserManagment;
