import React from 'react'
import { connect } from 'react-redux'

import { Layout, Icon, Dropdown, Menu, Row, Col } from 'antd'
import { Link } from 'react-router-dom'

import './index.less'


const MainHeader = () => {
  return (
    <Layout.Header className="main-header">
      <Row type="flex" style={{ paddingRight: 20 }}>
        <Col style={{ flex: 1 }}>
          <Icon className="main-header__trigger" type="menu-unfold" />
        </Col>
        <Col>
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default MainHeader
