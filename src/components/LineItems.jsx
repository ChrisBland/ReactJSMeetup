var React = require('react');
var Well = require('react-bootstrap').Well;
var Button = require('react-bootstrap').Button;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var LineItem = require('./LineItem.jsx');

var LineItems = React.createClass({

  getItems: function(){
    var updateItem = this.props.updateItem;
    var removeItem = this.props.removeItem;
    return this.props.items.map(function(item){
      return <LineItem
                key={item.id} 
                removeItem={removeItem} 
                updateItem={updateItem} 
                item={item}
              />
    });
  },

  render: function() {
    return (
      <Well>
        <Button onClick={this.props.addItem}> Add Item </Button>
        <hr/>
        <ul className="list-group">
          <li className="list-group-item">
            <Row>
              <Col md={2}>Remove</Col>
              <Col md={3}>Name</Col>
              <Col md={2}>Quantity</Col>
              <Col md={2}>Price</Col>
              <Col md={3}>Total</Col>
            </Row>
          </li>
          {this.getItems()}
        </ul>
      </Well>
    );
  }
});

module.exports = LineItems;