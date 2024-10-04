import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ModalKeranjang({
  show,
  handleClose,
  keranjangDetail,
  jumlah,
  keterangan,
  tambahJumlah,
  kurangJumlah,
  handleSubmit,
  handleChange,
  totalHarga,
  hapusPesanan
}) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5 fw-semibold">Product Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <Form onSubmit={handleSubmit} method="post">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nama Product</Form.Label>
            <div className="fw-bold">
              {keranjangDetail?.product?.nama}
            </div>
          </Form.Group>
          <hr />
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Jumlah</Form.Label>
            <div>
              <Button size="sm" variant="success" className="rounded" onClick={() => kurangJumlah(keranjangDetail)}>
                <FontAwesomeIcon
                  icon={faMinus}
                />
              </Button>
              <span className="mx-3 fw-bold">
                {jumlah}
              </span>
              <Button size="sm" variant="success" className="rounded" onClick={() => tambahJumlah(keranjangDetail)}>
                <FontAwesomeIcon
                  icon={faPlus}
                />
              </Button>
            </div>
          </Form.Group>
          <hr />
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Total Harga</Form.Label>
            <div className="fw-bold">
              Rp. {numberWithCommas(totalHarga)}
            </div>
          </Form.Group>
          <hr />
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Keterangan</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Contoh : Nasi Goreng Pedas/Teh Manis Es nya sedikit" value={keterangan} onChange={(e) => handleChange(e)}/>
          </Form.Group>
          <Button type="submit" variant="success" className="mt-2 px-4">Simpan Pesanan</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Batal
        </Button>
        <Button className="px-4" variant="danger" onClick={() => hapusPesanan(keranjangDetail.id)}>Hapus Pesanan</Button>
      </Modal.Footer>
    </Modal>
  );
}
