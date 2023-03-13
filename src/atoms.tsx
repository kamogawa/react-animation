import { atom, selector } from "recoil";
import { recoilPersist } from 'recoil-persist'

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

//localstorage 사용
const { persistAtom } = recoilPersist()

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [ persistAtom ],
});

// 다른 전역값을 가져와서 재구성 할수 있음
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    //현재 선택되어 있는 카테고리
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
