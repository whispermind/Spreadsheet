import { ChangeEvent, useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

interface IFilteringModal {
  handleClose: () => void;
  handleConfirm: (filteringSubject: string) => void;
  show: boolean;
}

export const FilteringModal = ({handleClose, handleConfirm, show}: IFilteringModal) => {
  const [filterSubject, setFilterSubject] = useState("");

  const onSubmit = useCallback(() => {
    handleConfirm(filterSubject);
    handleClose();
  }, [handleClose, filterSubject, handleConfirm]);

  const onUserInput = useCallback((e: ChangeEvent<HTMLInputElement>) => setFilterSubject(e.target.value), []);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="modal-form" onSubmit={onSubmit}>
            <Form.Group
              className="mb-3"
              controlId="modalForm-textinput"
            >
              <Form.Label>Enter filtering value</Form.Label>
              <Form.Control as="input" type="text" size="sm" onChange={onUserInput} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" form="modal-form" type="submit" autoFocus>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}