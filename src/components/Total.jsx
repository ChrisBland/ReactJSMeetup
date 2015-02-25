var React = require('react');
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var FormatCurrency = require('../mixins/FormatCurrency');
var _ = require('lodash');

var Total = React.createClass({
  mixins: [FormatCurrency],
  getTotal: function(){
    return _.reduce(this.props.items, function(sum, el) {
      var qty = el.quantity ? parseInt(el.quantity) : 0;
      var price = el.price ? parseInt(el.price) : 0;
      var total = qty*price;
      return sum + parseInt(total);
    }, 0)
  },
  
  getQty: function(){
    return _.reduce(this.props.items, function(sum, el) {
      var qty = el.quantity ? parseInt(el.quantity) : 0;
      return sum + parseInt(qty);
    }, 0)
  },
  
  render: function() {
    var formattedTotal = this.format(this.getTotal());
    return (
      <Row>
        <Col md={5}></Col>
        <Col md={2}>Total Quantity: {this.getQty()}</Col>
        <Col md={2}> </Col>
        <Col md={3}>Total: {formattedTotal}</Col>
      </Row>
    );
  }
});

module.exports = Total;