import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

export default function Menus({ menu, tambahKeranjang }) {
  return (
    <Col md={4} key={menu.id} className="mb-4">
      <Card>
        <Card.Img variant="top" src={"assets/images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar} />
        <Card.Body>
          <Card.Title>{menu.nama}</Card.Title>
          <Card.Text>
           <small>Rp. {numberWithCommas(menu.harga)}</small>
          </Card.Text>
          <div className="d-grid gap-2">
            <Button variant="warning" className="mt-2 rounded" onClick={() => tambahKeranjang(menu)}>
              <span className="m-2 fw-semibold">Pesan</span>
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
