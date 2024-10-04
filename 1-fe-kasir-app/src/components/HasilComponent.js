import React, { useState } from "react";
import { ListGroup, Badge, Row, Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import ModalKeranjang from "./ModalKeranjang";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';

export default function HasilComoponent({ keranjangBeli }) {

  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  function handleShow(menu) {
    setShow(true);
    setKeranjangDetail(menu);
    setJumlah(menu.jumlah);
    setKeterangan(menu.keterangan);
    setTotalHarga(menu.total_harga);
  }
  
  const [keranjangDetail, setKeranjangDetail] = useState();
  const [jumlah, setJumlah] = useState(0);
  const [keterangan, setKeterangan] = useState('');
  const [totalHarga, setTotalHarga] = useState(0);
  const [data, setData] = useState([]);

  const tambahJumlah = () => {
    setJumlah(jumlah + 1);
    setTotalHarga(totalHarga + keranjangDetail.product.harga);
  }

  const kurangJumlah = () => {
    if (jumlah > 1){
      setJumlah(jumlah - 1);
      setTotalHarga(totalHarga - keranjangDetail.product.harga);
    }
  }
  
  const handleChange = (e) => {
    setKeterangan(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    handleClose();

    const data = {
      jumlah: jumlah,
      total_harga: totalHarga,
      product: keranjangDetail.product,
      keterangan: keterangan
    }

    axios.put(API_URL + "keranjangs/" + keranjangDetail.id, data).then((response) => {
      setKeranjangDetail(response.data);
      swal({
        title: "Berhasil Update Pesanan!",
        text: keranjangDetail.product.nama + " Berhasil di Update!",
        icon: "success",
        button: false,
        timer: 2000
      })
    }) 
    .catch((error) => {
      console.error(error);
    })
  }

  const hapusPesanan = (id) => {

    handleClose();

    swal({
      title: "Apakah kamu yakin?",
      text: "Pesanan " + keranjangDetail.product.nama + " akan di hapus!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.delete(API_URL + "keranjangs/" + id).then((response) => {
          setKeranjangDetail(response.data);
          swal({
            title: "Berhasil di Hapus!",
            text: "Pesanan " + keranjangDetail.product.nama + " berhasil di hapus!",
            icon: "success",
            button: true,
          })
        })
        .catch((error) => {
          console.error(error);
        })
      } else {
        swal({
          title: "Pesanan Batal di Hapus!",
          text: "Pesanan " + keranjangDetail.product.nama + " tetap di Keranjang!",
          icon: "success",
          button: true,
          centered: true
        })
      }
    })

  }

  return (
    <ListGroup variant="flush" className="overflow-auto hasil">

      {keranjangBeli.length === 0 ? (
        <div className="d-flex flex-column text-center justify-content-center align-items-center" style={{height: '100vh'}}>
          <FontAwesomeIcon icon={faBasketShopping} size="3x" className="mb-3 text-dark"/>
          <h5 className="fw-bold fs-5">Keranjang Kosong</h5>
        </div>
      ) : (
        <div>
          {keranjangBeli.map((menu) => (
            <Card className="mb-2 border-0" key={menu.id}>
              <ListGroup.Item style={{cursor: 'pointer'}} onClick={() => handleShow(menu)}>
                <Row>
                  <Col xs={1} md={1}>
                    <Badge pill bg="success" className="me-3">
                      {menu.jumlah}
                    </Badge>
                  </Col>
                  <Col xs={7} md={7}>
                    <div className="fw-bold">{menu.product.nama}</div>
                    <small>Rp. {numberWithCommas(menu.product.harga)}</small>
                  </Col>
                  <Col xs={4} md={4}>
                    <span className="float-end fw-semibold">Rp. {numberWithCommas(menu.product.harga * menu.jumlah)}</span>
                  </Col>
                </Row>
              </ListGroup.Item>
            </Card>
          ))}
        </div>
      )}


      <ModalKeranjang show={show} handleClose={handleClose} handleShow={handleShow} keranjangDetail={keranjangDetail} jumlah={jumlah} keterangan={keterangan} tambahJumlah={tambahJumlah} kurangJumlah={kurangJumlah} handleSubmit={handleSubmit} handleChange={handleChange} totalHarga={totalHarga} hapusPesanan={hapusPesanan}/>

    </ListGroup>
  )
}
