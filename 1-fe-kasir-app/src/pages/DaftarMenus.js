import React, { useEffect, useState, prevState } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  ModalFooter,
} from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";

export default function DaftarMenus() {
  const [daftarMenus, setDaftarMenus] = useState([]);
  const fetchDataDaftarMenus = async () => {
    try {
      const response = await axios.get(API_URL + "products");
      setDaftarMenus(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(
    (prevState) => {
      if (prevState !== daftarMenus) {
        fetchDataDaftarMenus();
      }
    },
    [daftarMenus]
  );

  // Modal Tambah
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [kode, setKode] = useState("");
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState(0);
  const [category, setCategory] = useState("");

  const submitMenu = (e) => {
    e.preventDefault();

    handleClose();

    const newData = {
      kode: kode,
      nama: nama,
      harga: Number(harga),
      category: {
        id: Math.random(),
        nama: category,
      },
    };

    axios
      .post(API_URL + "products", newData)
      .then((response) => {
        console.log(response.data);

        swal({
          title: "Berhasil!",
          text: "Menu " + nama + " Berhasil di tambahkan!",
          icon: "success",
          button: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        console.error(error);
      });

  };

  const deleteMenu = (id) => {
    swal({
      title: "Apakah kamu yakin?",
      text:
        "Menu " +
        daftarMenus.filter((menu) => menu.id === id)[0].nama +
        " akan di hapus!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setDaftarMenus(daftarMenus.filter((menu) => menu.id !== id));

        axios
          .delete(API_URL + "products/" + id)
          .then((response) => {
            console.log(response.data);
            swal({
              title: "Berhasil!",
              text: "Menu Berhasil di hapus!",
              icon: "success",
              button: false,
              timer: 2000,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        swal({
          title: "Dibatalkan!",
          text:
            "Menu " +
            daftarMenus.filter((menu) => menu.id === id)[0].nama +
            " batal di hapus!",
          icon: "error",
          button: false,
          timer: 2000,
        });
      }
    });
  };

  // Modal Edit
  const [menu, setMenu] = useState();
  const [editKode, setEditKode] = useState("");
  const [editNama, setEditNama] = useState("");
  const [editHarga, setEditHarga] = useState(0);
  const [editCategory, setEditCategory] = useState("");

  const [showModalEdit, setShowModalEdit] = useState(false);
  const handleCloseModalEdit = () => setShowModalEdit(false);
  const handleShowModalEdit = (menu) => {
    setShowModalEdit(true);
    setMenu(menu);
    setEditKode(menu?.kode);
    setEditNama(menu?.nama);
    setEditHarga(menu?.harga);
    setEditCategory(menu?.category?.id);
  };

const submitEditMenu = (e) => {
  e.preventDefault();

  handleCloseModalEdit();

  const newData = {
    kode: menu.kode,
    nama: menu.nama,
    harga: Number(harga),
    category: {
      id: menu.category.id,
      nama: category,
    },
  };

  axios.put(API_URL + "products/1", newData).then((response) => {
    setMenu(response.data);
    swal({
      title: "Berhasil!",
      text: "Menu " + menu?.nama + " Berhasil di edit!",
      icon: "success",
      button: false,
      timer: 2000
    })
  })
  .catch((error) => {
    console.error(error);
  })
};


  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_URL + "categories");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(
    (prevState) => {
      if (prevState !== categories) {
        fetchCategories();
      }
    },
    [categories]
  );

  return (
    <Container>
      <header>
        <h3 className="text-center fw-bold my-5">Daftar Menu</h3>
      </header>
      <Row>
        <div className="mb-3 text-end">
          <Button
            variant="warning"
            className="px-4 mx-2 rounded fw-semibold"
            onClick={handleShow}
          >
            <FontAwesomeIcon icon={faPlus} className="me-3"/>
            Tambah Menu
          </Button>
        </div>
        {daftarMenus.map((menu) => (
          <Col key={menu?.id} className="d-flex justify-content-center">
            <Card style={{ width: "18rem" }} className="my-3">
              <Card.Img
                variant="top"
                src={
                  "assets/images/" + menu?.category?.nama + "/" + menu?.gambar
                }
              />
              <Card.Body>
                <Card.Title>{menu?.nama}</Card.Title>
                <Card.Text>
                  <small>Rp. {numberWithCommas(menu?.harga)}</small>
                </Card.Text>
              </Card.Body>
                
              <div className="d-flex justify-content-end m-3">
                <Button
                  variant="warning"
                  size="sm"
                  className="mx-2 rounded fw-semibold text-light"
                  onClick={() => handleShowModalEdit(menu)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="rounded fw-semibold"
                  onClick={() => deleteMenu(menu?.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </div>

            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal Tambah Menu */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Tambah Menu Baru</Modal.Title> */}
        </Modal.Header>
        <Modal.Body className="p-4">
          <Modal.Title className="text-center fw-semibold mb-3 fs-5">
            Tambah Menu Baru
          </Modal.Title>

          <Form onSubmit={submitMenu}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Kode</Form.Label>
              <Form.Control
                type="text"
                value={kode}
                onChange={(e) => setKode(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nama Menu</Form.Label>
              <Form.Control
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Harga</Form.Label>
              <Form.Control
                type="number"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Kategori</Form.Label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                {categories.map((category) => (
                  <option key={category?.id} value={category?.nama}>
                    {category?.nama}
                  </option>
                ))}
              </select>
            </Form.Group>
            <Modal.Footer className="d-flex justify-content-end mt-4 p-0 pt-3">
              <Button
                variant="outline-secondary"
                onClick={handleClose}
                className="ml-3 px-4 rounded-3"
              >
                Batal
              </Button>
              <Button
                variant="warning"
                type="submit"
                className="px-5 rounded-3"
              >
                Simpan
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal Edit Menu */}
      <Modal show={showModalEdit} onHide={handleCloseModalEdit}>
        <Modal.Header closeButton />
        <Modal.Body className="p-4">
          <Modal.Title className="text-center fw-semibold mb-3 fs-5">
            Edit Menu
          </Modal.Title>

          <Form onSubmit={submitEditMenu}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Kode</Form.Label>
              <Form.Control type="text" value={menu?.kode} onChange={(e) => setMenu(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nama Menu</Form.Label>
              <Form.Control type="text" value={menu?.nama} onChange={(e) => setMenu(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Harga</Form.Label>
              <Form.Control type="number" value={menu?.harga} onChange={(e) => setMenu(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Kategori</Form.Label>
              <select
                className="form-select"
                value={menu?.category}
              >
                <option value="Makanan">Makanan</option>
                <option value="Minuman">Minuman</option>
                <option value="Snack">Snack</option>
              </select>
            </Form.Group>
            <Modal.Footer className="d-flex justify-content-end mt-4 p-0 pt-3">
              <Button
                variant="outline-secondary"
                onClick={handleCloseModalEdit}
                className="ml-3 px-4 rounded-3"
              >
                Batal
              </Button>
              <Button
                variant="warning"
                type="submit"
                className="px-5 rounded-3"
              >
                Simpan
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
