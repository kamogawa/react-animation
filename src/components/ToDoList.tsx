import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, categoryState, IToDo, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { Card, InputGroup, Form, Button, Modal } from 'react-bootstrap';
import { useForm } from "react-hook-form";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const Title = styled.div`
  text-align: center;
  margin: 25px;
  font-size: 35px;
  font-weight: bolder;
`;

const BootSelect = styled(Form.Select)`
  /* max-width: 50%; */
`
const CategoryModal = styled(Modal)`
  color: black;
`

const InputItems = styled(InputGroup)`
  margin-bottom: 10px;
  /* max-width: 50%; */
`

interface IForm {
  toDo: string;
}

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    console.log(event.currentTarget.value);
    setCategory(event.currentTarget.value as IToDo["category"]);
  }

  const setToDos = useSetRecoilState(toDoState);
  // const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <Title>TODO LIST</Title>
      <form onSubmit={handleSubmit(handleValid)}>
        {/* <InputItems>
          <BootSelect value={category} onInput={onInput}>
            <option value={Categories.TO_DO}>To Do</option>
            <option value={Categories.DOING}>Doing</option>
            <option value={Categories.DONE}>Done</option>
          </BootSelect>
          <Form.Control {...register("toDo", {
              required: "Please write a To Do",
            })}
            placeholder="Write a to do" />
          <Button type="submit" variant="secondary">
            Add
          </Button>
          <Button onClick={handleShow} variant="secondary">
            Category Update
          </Button>
        </InputItems> */}

        <InputItems>
          <BootSelect value={category} onInput={onInput}>
            <option value={Categories.TO_DO}>To Do</option>
            <option value={Categories.DOING}>Doing</option>
            <option value={Categories.DONE}>Done</option>
          </BootSelect>
          <Button onClick={handleShow} variant="secondary">
            Category Update
          </Button>
        </InputItems>
        <InputItems>
          <Form.Control {...register("toDo", {
              required: "Please write a To Do",
            })}
            placeholder="Write a to do" />
          <Button type="submit" variant="secondary">
            Add
          </Button>
        </InputItems>
      </form>
      <hr />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}

      <CategoryModal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </CategoryModal>
    </Container>
  );
}

export default ToDoList;