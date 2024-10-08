declare module 'scenejs' {
    export interface SceneItem {
      setElement: (element: Element) => void;
      setCSS: (time: number, properties: string[]) => void;
      set: (time: number, property: string, subproperty: string, value: number) => void;
    }
  
    export interface Scene {
      newItem: (name: string) => SceneItem;
      playCSS: () => void;
    }
  
    export default class SceneJS implements Scene {
      constructor(scenes?: any, options?: any);
      newItem(name: string): SceneItem;
      playCSS(): void;
    }
  }