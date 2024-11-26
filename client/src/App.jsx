import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInpt from "./Auth/PasswordInpt";
import Request from "./utility/Request";
import ValidateCookie from "./utility/ValidateCookie";


function App() {
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formMessage, setFormMessage] = useState({
    color: "text-foreground",
    message: "*All fields are required!",
  });

  ValidateCookie(false, "/dashboard");

  async function handleLoginForm(e) {
    e.preventDefault();

    //? Regex: https://support.boldsign.com/kb/article/15962/how-to-create-regular-expressions-regex-for-email-address-validation
    //! Slight Change: "\." treats the dot as a literal and enforces a valid top-level domain
    const emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    
    if (email == "" || password == "") {
      setFormMessage({
        color: "text-red-500",
        message: "*All fields are required!"
      });
      return;
    }else if(!emailRegex.test(email)){
      setFormMessage({
        color: "text-red-500",
        message: "Oops! That email doesn't seem right. Try again?"
      });
      return;
    }else{
      setFormMessage({
        color: "text-green-500",
        message: "Processing..."
      });

      //? Send the data to the server
      const response = await Request({body: {email, password}, method: "POST", route: "/login"});
      if(response.success){
        setFormMessage({
          color: "text-green-500",
          message: "Successfully logged in!"
        });

        
        // Redirect to the dashboard
        navigator("/dashboard");
      }else{
        if(response.status === 409){
          navigator("/dashboard");
        }else{
          setFormMessage({
            color: "text-red-500",
            message: response.message
          });
        }
      }
    }
  }

  return (
    <div className="w-full lg:grid h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid sm:w-[360px] w-[320px] gap-6">
          <div className="grid gap-2">
            <h1 className="text-3xl text-primary font-bold">Login</h1>
            <p className="font-medium text-muted-foreground">
              Access your workspace to manage it effortlessly.
            </p>
          </div>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                type="email"
                placeholder="joe@example.com"
                autoComplete="username"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="#"
                  className="ml-auto inline-block text-sm underline font-medium"
                >
                  Forgot your password?
                </Link>
              </div>
              <PasswordInpt handleState={setPassword} />
            </div>
            <Button onClick={handleLoginForm} type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 font-medium text-sm">
            <p className={`${formMessage.color}`}>{formMessage.message}</p>
          </div>
        </div>
      </div>
      <div className="hidden relative bg-muted lg:block overflow-hidden">
        <div className="w-max absolute shadow-md -right-[50%] top-[50%] -translate-y-[50%]">
          <img src="/LoginModel.png" width={950} alt="Dashboard" />
        </div>
      </div>
    </div>
  );
}

export default App;
