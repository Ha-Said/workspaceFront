import React from "react";

import { Button } from "./button";
export function Header(){
    return(
        <div className="w-full container mx-auto">
        <div className="w-full flex items-center justify-between">
          <a
            className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
            href="#"
          >
            Rain
            <span className="bg-clip-text text-transparent bg-white" style={{ color: '#ffffff' }}>
              blur
            </span>
          </a>
          <div className="flex w-1/2 justify-end content-center">
            <Button name={"logout"} link={"/login"} />
          </div>
        </div>
      </div>
    )
}