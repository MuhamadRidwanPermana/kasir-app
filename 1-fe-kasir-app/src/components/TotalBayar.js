import React, { useState } from "react";
import { Button, Row, Modal, Form } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default function TotalBayar({ keranjangBeli, keranjangDetail }) {

  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => {
  //   setShow(true);
  //   setKeranjangDetail(keranjangBeli.id);
  // }
  // const [keranjangDetail, setKeranjangDetail] = useState([]);
  // const [namaPelanggan, setNamaPelanggan] = useState('');
  // const [noMeja, setNoMeja] = useState(0);

  // const handleSubmitPembayaran = (e) => {
  //   e.preventDefault();

  //   submitTotalBayar(totalBayar);

  //   handleClose();

  //   const data = {
  //     namaPelanggan : namaPelanggan,
  //     noMeja : noMeja,
  //   }
  //   axios.put(API_URL + "pesanans", data).then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  // }

  const submitTotalBayar = (totalBayar) => {

    // handleShow();

    const pesanan = {
      total_bayar: totalBayar,
      menus: keranjangBeli,
    };

    axios.post(API_URL + "pesanans", pesanan).then((response) => {
      console.log(response.data);
      window.location.replace("/sukses");
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const totalBayar = keranjangBeli.reduce((accumulator, item) => {
    return (accumulator += item.total_harga);
  }, 0);

  return (
    <>
      {/* <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton/>
        <Modal.Body className="p-4">
          <h5 className="fw-bold text-center mt-3 mb-5">Masukan Nama Pelanggan dan No meja Pelanggan!</h5>
          <Form onSubmit={handleSubmitPembayaran}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nama Pelanggan</Form.Label>
              <Form.Control type="text" value={namaPelanggan} onChange={(e) => setNamaPelanggan(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>No Meja</Form.Label>
              <Form.Control type="number" value={noMeja} onChange={(e) => setNoMeja(e.target.value)}/>
            </Form.Group>
            <Button className="w-100 fw-bold mt-4 mb-2" size="lg" variant="warning" type="submit">BAYAR</Button>
          </Form>
        </Modal.Body>
      </Modal> */}

      <Row className="row-bayar">
        <div className="py-3">
          <div
            md={{ span: 3, offset: 9 }}
            className="py-3"
            style={{ paddingRight: 15 }}
          >
            <span className="fw-semibold">Total Harga </span>
            <h5 className="fw-bold float-end">
              Rp. {numberWithCommas(totalBayar)}
            </h5>
          </div>
          <div md={{ span: 3, offset: 9 }}>
            {totalBayar === 0}
            <div className="d-grid">
              {totalBayar !== 0 ? (
                <Button
                  variant="warning"
                  size="lg"
                  onClick={() => submitTotalBayar(totalBayar)}
                  // onClick={handleShow}
                >
                  <small className="fw-bold">BAYAR</small>
                </Button>
              ) : (
                <Button variant="warning" size="lg">
                  <small className="fw-bold">BAYAR</small>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Row>
    </>
  );
}
