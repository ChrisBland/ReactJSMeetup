var React = require('react');
var _ = require('lodash');

var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var Header = require('./Header.jsx')
var LineItems = require('./LineItems.jsx');
var Total = require('./Total.jsx');

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

var Invoice = React.createClass({

  getInitialState: function(){
    return {
      items: [
        {
          id: '1234',
          name: 'Test',
          quantity: 1,
          price: 5
        }
      ],
      currency: 'US'
    }
  },

  addItem: function(){
    var items = this.state.items;
    var item = {};
    item.id = guid();
    items.push(item);
    this.setState({
      items: items
    });
  },

  updateItem: function(item){
    var items = this.state.items;
    for(var i = 0; i < items.length; i++){
      if(items[i].id === item.id){
        items[i] = item;
      }
    }
    this.setState({
      items: items
    });
  },

  removeItem: function(itemId){
    var items = this.state.items;
    items = _.without(items, _.findWhere(items, {id: itemId}));
    this.setState({
      items: items
    });
  },

  render: function() {
    return (
      <Grid>
        <Header headerText="Invoiceamatic" subtext=" a demo for React.js Chicago"/>
        <Row>
          <Col md={12}>
            <LineItems 
              addItem={this.addItem} 
              updateItem={this.updateItem} 
              items={this.state.items}
              removeItem={this.removeItem}
            />
            <hr/>
            <Total items={this.state.items}/>
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = Invoice;