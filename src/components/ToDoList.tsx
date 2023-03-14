import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { InputGroup, Form, Button, Modal } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { TrashFill } from '@styled-icons/bootstrap/TrashFill'
import { Categories, categoryState, IToDo, toDoSelector, toDoState } from "../atoms";
import ToDo from "./ToDo";

const Delete = styled(TrashFill)`
  height: 25px;
  color: darkgray;
  margin-left: 5px;
  &:hover {
    opacity: 0.5 ;
    cursor: pointer;
  }
`

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
  margin-bottom: 15px;
  margin-top: 10px;
`

const ListItem = styled.li`
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  margin-left: 8px;
  span {
    margin-top: auto;
  }
`;

const Error = styled.span`
  color: lightcoral;
  font-weight: bolder;
`;

interface IForm {
  toDo: string;
}

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(Categories);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as IToDo["category"]);
  }
  const setToDos = useSetRecoilState(toDoState);
  //react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    if (toDo) {
      setToDos((oldToDos) => [
        { text: toDo, id: Date.now(), category },
        ...oldToDos,
      ]);
    }
    setValue("toDo", "");
  };

  //모달 표시
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //모달 input
  const [modalCategory, setModalCategory] = useState("");
  const [modalError, setModalError] = useState("");

  const onChangeModal = (event: any) => {
    const {
      currentTarget: { value },
    } = event;
    setModalCategory(value);
  };

  //모달 카테고리 추가
  const addCategories = () => {
    if (!modalCategory) {
      setModalError("카테고리를 입력하세요.");
      return;
    }
    const reg = /TODO|DOING|DONE/;
    if (reg.test(modalCategory)) {
      setModalError("TODO, DOING, DONE이 포함된 카테고리는 입력할 수 없습니다.");
      return;
    }
    setModalError("");
    if (modalCategory) {
      setCategories((oldCate) => [
        ...oldCate,
        modalCategory
      ]);
      setModalCategory("");
    }
  };

  //모달 카테고리 삭제
  const deleteCategories = (v: string) => {
    setCategories((oldToDos: string[]) => {
      const newToDos = oldToDos.filter(
        (category) => category !== v
      );
      return newToDos;
    });
  };

  const isIncludes = (target: string) => ["TODO", "DOING", "DONE"].some(el => target.includes(el));

  return (
    <Container>
      <Title>TODO LIST</Title>
      <form onSubmit={handleSubmit(handleValid)}>
        <InputItems>
          <BootSelect value={category} onInput={onInput}>
            {categories.map((v, i) => <option key={i} value={v}>{v}</option>)}
          </BootSelect>
          <Button onClick={handleShow} variant="secondary">
            Add Category
          </Button>
        </InputItems>
        <InputItems>
          <Form.Control {...register("toDo", {
              required: "To Do를 입력하세요.",
            })}
            placeholder="To Do" />
          <Button type="submit" variant="secondary">
            Add
          </Button>
        </InputItems>
        <Error>{errors?.toDo?.message}</Error>
      </form>
      <hr />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}

      <CategoryModal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Categories</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {categories.map((v, i) => 
            <ListItem key={i} value={v}>      
              <span>{v}</span>
              {!isIncludes(v) ? <Delete onClick={() => deleteCategories(v)}/> : ''}
            </ListItem>
          )}
          <InputItems>
            <Form.Control
              onChange={onChangeModal}
              value={modalCategory}
              placeholder="카테고리" />
            <Button onClick={addCategories} variant="secondary">
              Add Category
            </Button>
          </InputItems>
          <Error>{modalError}</Error>
        </Modal.Body>
      </CategoryModal>
    </Container>
  );
}

export default ToDoList;