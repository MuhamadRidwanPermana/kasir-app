import React, { useState, useEffect } from "react";
import { Container, Modal, Form, Button, Table } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { numberWithCommas } from "../utils/utils";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Pesanan() {

  const [pesanan, setPesanan] = useState([]);
  const fetchDataPesanan = async () => {
    try {
      const response = await axios.get(API_URL + "pesanans");
      setPesanan(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(( prevState ) => {
    if(pesanan !== prevState){
      fetchDataPesanan();
    }
  }, [ pesanan ]);

  
  // const [show, setShow] = useState(false);
  // const [pesanans, setPesanans] = useState([]);
  // const [keranjangs, setKeranjangs] = useState([]);

  // const [namaPelanggan, setNamaPelanggan] = useState("");
  // const [noMeja, setNoMeja] = useState(0);

  // const handleClose = () => setShow(false);
  // const handleShow = (pesanan) => {
  //   setShow(true);
  //   setKeranjangs(pesanan);
  //   setNamaPelanggan(pesanan?.namaPelanggan);
  //   setNoMeja(pesanan?.noMeja);
  // };

  // const handleSubmitPembayaran = (e) => {
  //   e.preventDefault();

  //   handleClose();

  //   const data = {
  //     namaPelanggan,
  //     noMeja,
  //   }

  //   axios
  //     .put(API_URL + "pesanans/" + pesanan?.id, data)
  //     .then((response) => {
  //       console.log(response.data);
  //       swal({
  //         title: "Sukses!",
  //         text: "Pesanan Berhasil di Edit!",
  //         icon: "success",
  //         button: false,
  //         timer: 2000
  //       })
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       swal({
  //         title: "Gagal!",
  //         text: "Pesanan Gagal di Edit!",
  //         icon: "error",
  //         button: false,
  //         timer: 2000
  //       })
  //     })
  //     .finally(() => {
  //       fetchDataPesanan();
  //     })
  // }

  let noMeja = 1;

  const deletePesanan = (id) => {
    swal({
      title: "Apakah kamu yakin?",
      text: "Pesanan ini akan di hapus!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(API_URL + "pesanans/" + id)
          .then((response) => {
            console.log(response.data);
            swal({
              title: "Sukses!",
              text: "Pesanan Berhasil di Hapus!",
              icon: "success",
              button: false,
              timer: 2000,
            })
          })
          .catch((error) => {
            console.log(error);
          })
      }
    })
  }

  return (
    <Container>
      {/* {pesanan?.map((pesanans) => (
        <div key={pesanans?.id} 
        onClick={handleShow}
        >
          <hr />
          <h5>{pesanans?.id}</h5>
          <h5>Pesanan {pesanans?.namaPelanggan}</h5>
          <h5>No Meja {pesanans?.noMeja}</h5>
          <ul>
            {pesanans?.menus?.map((menu) => (
              <li key={menu.id}>
                {menu?.jumlah} {menu?.product?.nama} 
                ({menu?.product?.harga * menu?.jumlah}) 
                ({menu?.product?.category?.nama}) 
                ({menu?.keterangan})
              </li>
            ))}
            <span>
              Total Bayar: Rp. {numberWithCommas(pesanans?.total_bayar)}
            </span>
          </ul>
        </div>
      ))} */}

      {/* <div className="p-4 mt-2">
        <h3 className="fw-bold text-center mb-5">Daftar Pesanan</h3>
        {pesanan?.map((pesanan) => (
          <div key={pesanan?.id} className="border-bottom mb-5">
            <h5 className="fw-bold fs-6">No Meja {noMeja++}</h5>
            <ul>
              {pesanan?.menus?.map((menu) => (
                <li key={menu.id}>
                  {menu?.product?.nama} 
                  {" "} {menu?.jumlah}
                  {" "} {menu?.product?.harga}
                  {" "} {menu?.keterangan}
                </li>
              ))}
              <span className="fw-bold pt-5">
                Total Bayar = Rp. {numberWithCommas(pesanan?.total_bayar)}
              </span>
            </ul>
          </div>
        ))}
      </div> */}

      <h3 className="fw-bold text-center my-5">Daftar Pesanan</h3>

      {pesanan.length === 0 ? (
        <h5 className="fw-bold text-center my-5">Tidak ada data Pesanan</h5>
      ) : (        
        <Table className="mt-5 rounded">
          {/* <thead className="text-center">
            <tr>
              <th width="8%">No Meja</th>
              <th>Daftar Menu Pesanan</th>
              <th>Keterangan Tambahan</th>
              <th>Total Bayar</th>
              <th width="10%">Aksi</th>
            </tr> 
          </thead> */}
          <tbody>
            {pesanan?.map((pesanan) => (
              <tr key={pesanan?.id}>
                <td valign="middle" className="text-center no-pesanan">No Meja {noMeja++}</td>
                <td>
                  {pesanan?.menus?.map((menu) => (
                    <li key={menu.id}>
                      {menu?.jumlah} {" "}
                      {menu?.product?.nama}
                    </li>
                  ))}
                </td>
                <td>{pesanan?.menus?.map((menu) => (
                    <li key={menu.id}>
                      {menu?.keterangan}
                    </li>
                  ))}</td>
                <td valign="middle">
                  <strong>
                  Rp. {numberWithCommas(pesanan?.total_bayar)}
                  </strong>
                </td>
                <td valign="middle" className="text-center">
                  <Button
                    variant="danger"
                    size="sm"
                    className="rounded fw-semibold"
                    onClick={() => deletePesanan(pesanan?.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}


      {/* Modal Edit Pesanan */}
      {/* <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton />
        <Modal.Body className="p-4">
          <h5 className="fw-bold text-center mt-3 mb-5">
            Masukan Nama Pelanggan dan No meja Pelanggan!
          </h5>
          <Form onSubmit={handleSubmitPembayaran}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nama Pelanggan</Form.Label>
              <Form.Control
                type="text"
                value={pesanan?.namaPelanggan}
                onChange={(e) => setNamaPelanggan(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>No Meja</Form.Label>
              <Form.Control
                type="number"
                value={noMeja}
                onChange={(e) => setNoMeja(e.target.value)}
              />
            </Form.Group>
            <Button
              className="w-100 fw-bold mt-4 mb-2"
              size="lg"
              variant="warning"
              type="submit"
            >
              Simpan
            </Button>
          </Form>
        </Modal.Body>
      </Modal> */}
    </Container>
  );
}
