import React, { useState, useEffect } from "react";
import { API_URL } from "../utils/constants";
import axios from "axios";
import { ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugSaucer, faUtensils, faCheese } from '@fortawesome/free-solid-svg-icons';

const Icon = ({nama}) => {
  if (nama === "Makanan") {
    return <FontAwesomeIcon icon={faUtensils} className="me-1"/>;
  }else if(nama === "Minuman"){
    return <FontAwesomeIcon icon={faMugSaucer}/>;
  }else if(nama === "Cemilan"){
    return <FontAwesomeIcon icon={faCheese} className="me-1"/>;
  }else{
    return <FontAwesomeIcon icon={faMugSaucer} />;
  }
}

export default function ListCategoryComponent({ pilihCategory, changeCategory }) {

  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL + "categories");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ListGroup>
      {categories.map((category) => (
        <ListGroup.Item key={category.id} style={{cursor: 'pointer'}} active={pilihCategory === category.nama} onClick={() => changeCategory(category.nama)}>
          <span className="me-3">
            <Icon nama={category.nama}/>
          </span>
          {category.nama}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
