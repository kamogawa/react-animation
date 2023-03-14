import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { PencilFill } from '@styled-icons/bootstrap/PencilFill'
import { ClipboardCheckFill } from '@styled-icons/bootstrap/ClipboardCheckFill'
import { ClipboardXFill } from '@styled-icons/bootstrap/ClipboardXFill'
import { TrashFill } from '@styled-icons/bootstrap/TrashFill'
import { IToDo, toDoState } from "../atoms";

const Doing = styled(PencilFill)`
  height: 30px;
  color: coral;
  margin-left: 5px;
  &:hover {
    opacity: 0.5 ;
    cursor: pointer;
  }
`

const Done = styled(ClipboardCheckFill)`
  height: 30px;
  color: greenyellow;
  margin-left: 5px;

  &:hover {
    opacity: 0.5 ;
    cursor: pointer;
  }
`
const Delete = styled(TrashFill)`
  height: 30px;
  color: darkgray;
  margin-left: 5px;
  &:hover {
    opacity: 0.5 ;
    cursor: pointer;
  }
`

const Todo = styled(ClipboardXFill)`
  height: 30px;
  color: gold;
  margin-left: 5px;

  &:hover {
    opacity: 0.5 ;
    cursor: pointer;
  }
`
const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
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

  const deleteToDo = () => {
    setToDos((oldToDos: IToDo[]) => {
      const newToDos = oldToDos.filter(
        (todo) => todo.id !== id
      );
      return newToDos;
    });
  };

  return (
    <ListItem>
      <span>{text}</span>
      <span>
        {category !== "TODO" && (
          <Todo onClick={() => onClick("TODO")} />
        )}
        {category !== "DOING" && (
          <Doing onClick={() => onClick("DOING")} />
        )}
        {category !== "DONE" && (
          <Done onClick={() => onClick("DONE")} />
        )}
        <Delete onClick={deleteToDo}/>
      </span>
    </ListItem>
  );
}

export default ToDo;