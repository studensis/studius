import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

type SubjectProps = {
  title: string;
  background?: string;
  darkMode?: boolean;
  className?: string;
  href: string;
  sided: boolean;
};

const Subject: FC<SubjectProps> = ({
  title,
  background,
  darkMode,
  className,
  href,
  sided,
}) => {
  return (
    <Link className="cursor-pointer " href={href}>
      <div
        className={
          !sided
            ? "w-[400px] md:w-[300px] h-[200px] md:h-[150px] transition-all cursor-pointer select-none "
            : "w-[100px] h-[50px] transition-all cursor-pointer select-none "
        }
      >
        <p
          className={
            !sided
              ? " title1 text-center p-1 text-light-accent "
              : "border-2 rounded-xl border-light-accent-strong text-center text-light-accent-strong p-2 w-56 shadow-xl hover:bg-gray-800 transition-all active:scale-90 "
          }
        >
          {title}
        </p>
        <div className="relative flex items-center justify-center h-auto w-full shadow-xl rounded-xl group hover:bg-gradient-to-r from-light-accent-strong to-light-accent-medium">
          <img
            className={
              !sided
                ? "rounded-xl group-hover:opacity-20 w-[400px] h-[200px] object-cover transition-all "
                : "hidden"
            }
            src={background}
            alt="/"
          />

          <div className="hidden group-hover:block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <p className="pb-4 pt-2 text-white title1 text-center ">
              Vise o predmetu
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Subject;
