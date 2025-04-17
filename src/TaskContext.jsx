import { createContext, useContext } from "react";

//This creates a new Context object called TaskContent, which acts as a global storage container for shared state or functions across components.
 export const TaskContent = createContext();

 /*
 This defines a custom hook named useTaskContent, which allows any component to easily access the 
 data or functions provided by the TaskContent context without needing to pass them down through props.
 */
 export const useTaskContent = () => useContext(TaskContent);