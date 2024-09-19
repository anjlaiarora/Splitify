import { Footer } from 'antd/es/layout/layout'
import { Container, Row, Col, Stack, Image, Nav,NavLink } from 'react-bootstrap'
import React from 'react'


const footer = () => {
  return (
    <Footer>
    <Container fluid >
      <Row className='bg-primary text-white p-4'>
      <Col className='mx-5'>
      <Stack>
        <Image
        src="images.png"
        alt="logo"
        rounded
        width={150}
        height={150}

        />
        <h2>SPLITIFY</h2>
        <p>Company tag line here</p>
      </Stack>
      </Col>
      
      <Col>
      <nav className='flex-column fs-5'>
        Useful Link
        <NavLink href='#' clsssname="text white">Home</NavLink>
        <NavLink href='#' clsssname="text white">About Us</NavLink>
        <NavLink href='#' clsssname="text white">Explore</NavLink>
        <NavLink href='#' clsssname="text white">Contect</NavLink>
      </nav>
      </Col>

      <Col>
      <h2>Contect Us</h2>
      <p>email@1234.com</p>
      <p>9586715321</p>
      </Col>

      </Row>
    </Container>
    </Footer>
  )
}

export default footer