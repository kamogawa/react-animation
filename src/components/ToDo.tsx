import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../atoms";
import { PencilFill } from '@styled-icons/bootstrap/PencilFill'
import { ClipboardCheckFill } from '@styled-icons/bootstrap/ClipboardCheckFill'
import { ClipboardXFill } from '@styled-icons/bootstrap/ClipboardXFill'

const Doing = styled(PencilFill)`
  height: 35px;
  color: coral;
  &:hover {
    opacity: 0.5 ;
    cursor: pointer;
  }
`

const Done = styled(ClipboardCheckFill)`
  height: 35px;
  color: greenyellow;
  &:hover {
    opacity: 0.5 ;
    cursor: pointer;
  }
`

const Todo = styled(ClipboardXFill)`
  height: 35px;
  color: gold;
  &:hover {
    opacity: 0.5 ;
    cursor: pointer;
  }
`


const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (name: string) => {
    setToDos((oldToDos: IToDo[]) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as IToDo["category"] };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1, oldToDos.length)
      ];
    });
  };
  return (
    <ListItem>
      <span>{text}</span>
      <span>
        {category !== Categories.DOING && (
          <Doing onClick={() => onClick(Categories.DOING)} />
        )}
        {category !== Categories.TO_DO && (
          <Todo onClick={() => onClick(Categories.TO_DO)} >
            To Do
          </Todo>
        )}
        {category !== Categories.DONE && (
          <Done onClick={() => onClick(Categories.DONE)} >
            Done
          </Done>
        )}
      </span>
    </ListItem>
  );
}

export default ToDo;