import React, { useState } from "react";
import ModalWrapper from "../../components/Modal";
import Button from "../../components/Button";
import ListItem from "../../components/Invoice/ListItem";
import axios from "axios";
import { Form, InputGroup } from "react-bootstrap";
import OrderService from "../../services/order";

export default function Invoice(props) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [phone, setPhone] = useState()
  const [orderId, setOrderId] = useState()
  const [totalPrice, setTotalPrice] = useState()
  const handleShowModal = () => {
    OrderService.UpdateOrder("paid", orderId)
    setIsOpenModal(!isOpenModal);
  }
  const invoiceItems = props.invoiceItems

  let totalItems = []
  props.invoiceItems.map((item) => {
    for (let index = 0; index < item.quantity; index++) {
      totalItems.push(item.id);
    }
  })

  const handleClick = () => {
    handleShowModal()
    OrderService.CreateOrder(phone, totalItems).then(res => {
      setOrderId(res.id);
      setTotalPrice(res.total_price)
    })
  }

  return (
    <>
      <div className="col-md-3 col-lg-3 col-12 col-sm-3 pt-5 mt-5 text-end border-end border-start px-0">
        <div className="right_section px-2">
          {invoiceItems.map(item => {
            return (
              <ListItem key={item.id} item={item} />
            )
          })}
        </div>
        <div className="row border-top border-bottom px-2 mx-0 total">
          <input type="phone" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
        </div>
        <div className="row py-4 border-bottom px-2 mx-0">
          <Button className={'btn btn-primary dropdown'} onClick={handleClick}>Confirm Order</Button>
        </div>
      </div>

      <ModalWrapper isOpenModal={isOpenModal} handleShowModal={handleShowModal} totalPrice={totalPrice} />
    </>
  );
}
