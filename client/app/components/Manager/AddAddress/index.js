/**
 *
 * AddAddress
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Checkbox from '../../Common/Checkbox';
import Input from '../../Common/Input';
import Button from '../../Common/Button';

const AddAddress = props => {
  const { addressFormData, formErrors, addressChange, addAddress } = props;

  const handleSubmit = event => {
    event.preventDefault();
    addAddress();
  };

  return (
    <div className='add-address'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12' md='12'>
            <Input
              type={'text'}
              error={formErrors['address']}
              label={'Dirección'}
              name={'address'}
              placeholder={'Dirección: Calle, Casa Número / Apartamento Número'}
              value={addressFormData.address}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'text'}
              error={formErrors['city']}
              label={'Ciudad'}
              name={'city'}
              placeholder={'Ciudad'}
              value={addressFormData.city}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['state']}
              label={'Departamento'}
              name={'state'}
              placeholder={'Departamento'}
              value={addressFormData.state}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['country']}
              label={'Pais'}
              name={'country'}
              placeholder={'Ingrese su país'}
              value={addressFormData.country}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['zipCode']}
              label={'Código Postal '}
              name={'Código Postal '}
              placeholder={'Por favor ingrese su Código Postal '}
              value={addressFormData.zipCode}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Checkbox
              id={'default'}
              label={'Agregar como principal'}
              name={'isDefault'}
              checked={addressFormData.isDefault}
              onChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
        </Row>
        <hr />
        <div className='add-address-actions'>
          <Button type='submit' text='Añadir dirección' />
        </div>
      </form>
    </div>
  );
};

export default AddAddress;
