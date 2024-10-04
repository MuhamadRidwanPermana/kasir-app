import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { Container, Card, Button, Row, Modal, Form, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';


export default function Categories() {
  const [categories, setCategories] = useState([]);
  const fetchDataCategories = async () => {
    try {
      const response = await axios.get(API_URL + "categories");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect((prevState) => {
    if(prevState !== categories) {
      fetchDataCategories();
    }
  }, [ categories ]);


  // Modal Add
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [category, setCategory] = useState([])

  const handleChange = (e) => {
    setCategory(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (category === "") {
      return
    }

    const newData = {
      nama: category
    }

    axios.post(API_URL + "categories", newData).then((response) => {
      console.log(response.data);
      swal({
        title: "Berhasil!",
        text: "Kategori " + category + " Berhasil di tambahkan!",
        icon: "success",
        button: false,
        timer: 2000
      })
    })
    .catch((error) => {
      console.error(error);
    })

    handleClose();
  }

  const deleteCategory = (id) => {
    swal({
      title: "Apakah kamu yakin?",
      text: "Kategori " + categories.filter((category) => category.id === id)[0].nama + " akan di hapus!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if(willDelete) {
        axios.delete(API_URL + "categories/" + id).then((response) => {
          console.log(response.data);
          swal({
            title: "Berhasil!",
            text: "Kategori " + categories.filter((category) => category.id === id)[0].nama + " Berhasil di hapus!",
            icon: "success",
            button: false,
            timer: 2000

          })
        })
        .catch((error) => {
          console.error(error);
        })
      } else {
        swal({
          title: "Kategori Batal di Hapus!",
          text: "Kategori " + categories.filter((category) => category.id === id)[0].nama + " tetap di List Kategori!",
          icon: "error",
          button: false,
          timer: 2000

        })

      }
      
    })
  }

  return (
    <Container>
      <h3 className="text-center fw-bold my-5">Category</h3>
      <Row>

        <div className="mb-4 pb-2 text-end">
          <Button
            variant="warning"
            className="px-4 rounded fw-semibold"
            onClick={handleShow}
          >
            <FontAwesomeIcon icon={faPlus} className="me-3"/>
            Tambah Kategori
          </Button>
        </div>

        {categories.map((category) => (
          <Col className="d-flex justify-content-center" key={category.id}>
            <Card style={{ width: "17rem" }} >
            <Card.Img
              variant="top"
              src={"https://source.unsplash.com/1600x1200/?" + category.nama}  
            />
              <Card.Body>
                <Card.Title className="fs-5 fw-bold my-4">{category.nama}</Card.Title>
                <Button variant="warning" size="sm" className="px-4 rounded">
                  Daftar Menu
                </Button>

                <div className="float-end">
                  <Button
                    variant="warning"
                    size="sm"
                    className="rounded text-light"
                  >
                    {/* <FontAwesomeIcon icon={faPen} /> */}
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="rounded mx-2"
                    onClick={() => deleteCategory(category.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                  
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton/>
        <Modal.Body>

          <Modal.Title className="fs-5 fw-semibold text-center my-4">Tambah Kategori</Modal.Title>

          <Form onSubmit={handleSubmit} method="post">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Nama Kategori"
                autoFocus
                value={category}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="outline-secondary" onClick={handleClose}>
                Batal
              </Button>
              <Button variant="warning" type="submit">
                Simpan
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

    </Container>
  );
}
