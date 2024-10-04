import "../App.css";
import React, { useState, useEffect } from "react";
import { ListCategoryComponent, HasilComponent, Menus, TotalBayar } from "../components";
import { Row, Col, Container } from "react-bootstrap";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default function Home() {

  const [menus, setMenus] = useState([]);
  const fetchDataProduct = async () => {
    try {
      const response = await axios.get(API_URL + "products?category.nama=" + pilihCategory);
      setMenus(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataProduct();
  }, []);


  const [pilihCategory, setPilihCategory] = useState('Makanan');
  const changeCategory = (value) => {
    setPilihCategory(value);
    
    axios.get(API_URL + "products?category.nama=" + value).then((response) => {
      setMenus(response.data);
    }).catch((error) => {
      console.error(error);
    });
  };


  const [keranjangs, setKeranjangs] = useState([]);

  const tambahKeranjang = (value) => {

    axios.get(API_URL + "keranjangs?product.id=" + value.id).then((response) => {
      if(response.data.length === 0) {
        const keranjang = {
          jumlah: 1,
          total_harga: value.harga,
          product: value
        }
    
        axios.post(API_URL + "keranjangs", keranjang).then((response) => {
          setKeranjangs(response.data);
          swal({
            title: "Berhasil!",
            text: keranjang.product.nama + " Berhasil di tambahkan!",
            icon: "success",
            button: false,
            timer: 2000
          });
        })
        .catch((error) => {
          console.error(error);
        });
      } else {
        const keranjang = {
          jumlah: response.data[0].jumlah + 1,
          total_harga: response.data[0].total_harga + value.harga,
          product: value
        }

        axios.put(API_URL + "keranjangs/" + response.data[0].id, keranjang).then((response) => {
          setKeranjangs(response.data);
          swal({
            title: "Berhasil!",
            text: keranjang.product.nama + " Berhasil di tambahkan!",
            icon: "success",
            button: false,
            timer: 2000
          });
        })
        .catch((error) => {
          console.error(error);
        });
      }
    }).catch((error) => {
      console.error(error);
    });

  };

  const [keranjangBeli , setKeranjangBeli] = useState([]);
  const fetchDataKeranjangBeli = () => {
    axios.get(API_URL + "keranjangs").then((response) => {
      setKeranjangBeli(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  useEffect((prevState) => {
    if(prevState !== keranjangBeli) {
      fetchDataKeranjangBeli();
    }
  }, [keranjangBeli]);

  return (
      <Container fluid>
        <Row>
          <Col md={2} className="mt-3">
            <h4 className="text-center fw-semibold fs-5">Category</h4>
            <hr />
            <ListCategoryComponent
              pilihCategory={pilihCategory} 
              changeCategory={changeCategory}
            />
          </Col>
          <Col md={7} className="mt-3">
            <h4 className="text-center fw-semibold fs-5">Daftar Produk</h4>
            <hr />
            <Row className="overflow-auto menu">
              {menus.map((menu) => (
                <Menus menu={menu} key={menu.id} tambahKeranjang={tambahKeranjang}/>
              ))}
            </Row>
          </Col>
          <Col md={3} className="mt-3">
            <h4 className="text-center fw-semibold fs-5">Hasil</h4>
            <hr />
            <HasilComponent keranjangBeli={keranjangBeli}/>
            <TotalBayar keranjangBeli={keranjangBeli}/>
          </Col>
        </Row>
      </Container>
  );
}
