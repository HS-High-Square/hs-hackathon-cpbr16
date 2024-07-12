"use client";

import Page from "@/components/Page";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/providers/AuthProvider";
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function Map() {
  const { userdata, setUserdata } = useAuth();

  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: "unity/Build/builds.loader.js",
    dataUrl: "unity/Build/builds.data",
    frameworkUrl: "unity/Build/builds.framework.js",
    codeUrl: "unity/Build/builds.wasm",
  });

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
            width: isLoaded ? "100vw" : "0",
            height: isLoaded ? "100vh" : "0",
          }}
        />
      </>
    );
  } else {
    return <Page></Page>;
  }
}
