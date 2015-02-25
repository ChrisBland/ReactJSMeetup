var React = require('react');
var PageHeader = require('react-bootstrap').PageHeader;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;
var FormatCurrency = require('../mixins/FormatCurrency');

var LineItem = React.createClass({
  mixins: [FormatCurrency],
  getItemFromRefs: function(){
    return {
      id: this.props.item.id,
      name: this.refs.name.getDOMNode().value,
      quantity: this.refs.quantity.getDOMNode().value,
      price: this.refs.price.getDOMNode().value
    };
  },

  getInitialState: function() {
    return {
      priceIncrease: false
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      priceIncrease: nextProps.item.price > this.props.item.price
    });
  },

  handleChange: function(){
    this.props.updateItem(this.getItemFromRefs());
  },

  getTotal: function(){
    var item = this.props.item;
    var price = item.price || 0;
    var qty = item.quantity || 0;
    return price*qty;
  },

  removeItem: function(){
    var itemId = this.props.item.id;
    this.props.removeItem(itemId);
  },

  shouldComponentUpdate: function(nextProps, nextState){
    return true;
    //return this.props.item !== nextProps.item;
  },

  render: function() {
    console.log('Item '+this.props.item.id+' was called during render');
    var formattedTotal = this.format(this.getTotal());
    var style = {
      backgroundColor: (this.state.priceIncrease) ? 'green':''
    };
    return (
      <li className="list-group-item" style={style}>
        <Row>
          <Col md={2}>
            <Button onClick={this.removeItem} bsStyle="danger"> X </Button>
          </Col>
          <Col md={3}>
            <input ref="name" type="text" value={this.props.item.name} onChange={this.handleChange}/>
          </Col>
          <Col md={2}>
            <input ref="quantity" type="text" value={this.props.item.quantity} onChange={this.handleChange}/>
          </Col>
          <Col md={2}>
            <input ref="price" type="text" value={this.props.item.price} onChange={this.handleChange}/>
          </Col>
          <Col md={3}>
            {formattedTotal}
          </Col>
        </Row>
      </li>
    )
  }
});

module.exports = LineItem;