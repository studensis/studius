import React, { useState, useEffect } from "react";
import Home from "./index";
import { useRouter } from "next/router";
import { Button } from "../components/Button";
import Link from "next/link";
import { create } from "domain";

interface FormData {
  name: string;
  surname: string;
  email: string;
  JMBAG: string;
  password: string;
  username: string;
}

function Register() {
  const router = useRouter();
  const [errorOccured, setErrorOccured] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>(
    "Dogodila se greška, pokušajte kasnije."
  );
  const [form, setForm] = useState<FormData>({
    name: "",
    surname: "",
    email: "",
    JMBAG: "",
    password: "",
    username: "",
  });

  useEffect(() => {}, []);

  async function create(data: FormData) {
    try {
      fetch("http://localhost:3000/api/registeruser", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (data: FormData) => {
    data.username =
      data.name.toString().toLowerCase().charAt(0) +
      data.surname.toString().toLowerCase().charAt(0) +
      data.JMBAG.toString().toLowerCase().substring(4, 9);
    try {
      await create(data);
      router.push("/userpage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="bg-light-neutral-weak h-full w-[53%] absolute right-[47%] ">
        <div className="flex justify-center items-center h-full">
          <div>
            <h1 className="display2 mb-7">Create user</h1>
            <p className="body1 mb-3 ">Want to create a user?</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-full w-[47%] absolute left-[53%] ">
        <div className="flex items-center h-full">
          <div className="flex flex-col justify-start items-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(form);
              }}
              className="flex flex-col justify-start items-center"
            >
              {errorOccured ? (
                <p className="w-[480px] flex justify-center border-light-danger title2 border-2 rounded-2xl mb-4 mt-4 p-3 bg-light-danger-weak transition-all ease-in ">
                  {errorMessage}
                </p>
              ) : (
                <p className="w-[480px] flex justify-center border-light-danger title2 border-2 rounded-2xl mb-4 mt-4 p-3 bg-light-danger-weak transition-all ease-in opacity-0">
                  .
                </p>
              )}
              <div className="flex flex-col m-2 relative">
                <label
                  htmlFor="ime"
                  className="absolute caption top-[-0.4rem] left-3 w-10 text-center bg-white  "
                >
                  Name
                </label>
                <input
                  type="text"
                  name="ime"
                  id="ime"
                  className="border-2 border-light-accent-weak rounded-xl lg:w-[480px] sm:w-[250px] hover:border-light-accent-medium focus:border-light-accent-medium transition-all ease-in outline-none px-3 py-4 "
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col m-2 relative">
                <label
                  htmlFor="prezime"
                  className="absolute caption top-[-0.4rem] left-3 w-14 text-center bg-white  "
                >
                  Surname
                </label>
                <input
                  type="text"
                  name="prezime"
                  id="prezime"
                  className="border-2 border-light-accent-weak rounded-xl lg:w-[480px] sm:w-[250px] hover:border-light-accent-medium focus:border-light-accent-medium transition-all ease-in outline-none px-3 py-4 "
                  onChange={(e) =>
                    setForm({
                      ...form,
                      surname: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col m-2 relative">
                <label
                  htmlFor="email"
                  className="absolute caption top-[-0.4rem] left-3 w-10 text-center bg-white  "
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border-2 border-light-accent-weak rounded-xl lg:w-[480px] sm:w-[250px] hover:border-light-accent-medium focus:border-light-accent-medium transition-all ease-in outline-none px-3 py-4 "
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col m-2 relative">
                <label
                  htmlFor="jmbag"
                  className="absolute caption top-[-0.4rem] left-3 w-12 text-center bg-white  "
                >
                  JMBAG
                </label>
                <input
                  type="text"
                  name="jmbag"
                  id="jmbag"
                  className="border-2 border-light-accent-weak rounded-xl lg:w-[480px] sm:w-[250px] hover:border-light-accent-medium focus:border-light-accent-medium transition-all ease-in outline-none px-3 py-4 "
                  onChange={(e) =>
                    setForm({
                      ...form,
                      JMBAG: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col m-2 relative">
                <label
                  htmlFor="surname"
                  className="absolute caption top-[-0.4rem] left-3 w-16 text-center bg-white "
                >
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  id="password"
                  className="border-2 border-light-accent-weak rounded-xl lg:w-[480px] sm:w-[250px] hover:border-light-accent-medium focus:border-light-accent-medium transition-all ease-in outline-none px-3 py-4 "
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                />
                {/* <Link href="/auth/login">
                  <p className="caption m-2 cursor-pointer text-light-accent-strong">
                    Back to Login!
                  </p>
                </Link> */}
              </div>

              <Button
                formType="submit"
                outline={false}
                style={{ padding: "16px", width: "480px" }}
              >
                <p>Create user</p>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
