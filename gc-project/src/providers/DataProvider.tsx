"use client";

import { Case, Settings, StoryblokDatasourceObjectType } from "@/types";
import React, { createContext, useContext } from "react";
import { ISbStoryData } from "storyblok-js-client";

const DataContext = createContext<{
  datasourceObject: StoryblokDatasourceObjectType;
  settings: Settings;
  cases: ISbStoryData<Case>[];
}>(undefined!);

interface DataProviderProps {
  datasourceObject: StoryblokDatasourceObjectType;
  settings: Settings;
  cases: ISbStoryData<Case>[];
  children: React.ReactNode;
}

export function DataProvider({
  datasourceObject,
  settings,
  cases,
  children,
}: DataProviderProps) {
  return (
    <DataContext.Provider value={{ datasourceObject, settings,cases }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  // TODO: add error handling
  return context;
}
export default DataProvider;
