"use client";

import Page from "@/components/Page";
import { Progress } from "@/components/ui/progress";
import { User } from "@/dtos/user";
import { useAuth } from "@/providers/AuthProvider";
import React, { useCallback, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function Map() {
  const { userdata, setUserdata } = useAuth();

  const { unityProvider, loadingProgression, isLoaded, sendMessage } =
    useUnityContext({
      loaderUrl: "unity/Build/builds.loader.js",
      dataUrl: "unity/Build/builds.data",
      frameworkUrl: "unity/Build/builds.framework.js",
      codeUrl: "unity/Build/builds.wasm",
    });

  useEffect(() => {
    // @ts-ignore
    if (screen.orientation.lock) {
      // @ts-ignore
      screen.orientation.lock("landscape");
    }
    async function getMapBase() {
      const body: User = JSON.parse(localStorage.getItem("userdata") as string);
      const req = await fetch("/api/stands/unitify", {
        method: "POST",
        body: JSON.stringify(body),
      });
      const json = await req.json();
      sendMessage("MapBase", json);
    }

    getMapBase();
  }, []);

  if (userdata) {
    return (
      <>
        {!isLoaded && (
          <div className="flex items-center w-full h-full justify-center flex-col">
            <Progress value={loadingProgression * 100} className="w-[60%]" />
            <h1 className="font-mono mt-2">
              Carregando... {Math.round(loadingProgression * 100)}%
            </h1>
          </div>
        )}
        <Unity
          unityProvider={unityProvider}
          style={{
            display: isLoaded ? "block" : "hidden",
            width: isLoaded ? "100dvw" : "0",
            height: isLoaded ? "100dvh" : "0",
          }}
        />
      </>
    );
  } else {
    return <Page></Page>;
  }
}
